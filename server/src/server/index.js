var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cv = require('opencv4nodejs');
var fs = require("fs")
var os = require('os');
var cors = require('cors')
import morgan from 'morgan'
import path from 'path'
var bodyParser = require('body-parser')
var uuid = require('uuidv4')

var ifaces = os.networkInterfaces();
const { mongoMiddleware } = require('mongo-express-middleware');
const _ = require("lodash")
const pino = require('pino')

const { prepareSingleBase64Image } = require("../final/utils/singleImagePrep")
const train_recorgnisers = require('../final/utils/train-recorgnisers')

const { NATS_URL, MONGO_URL, NATS_USER, NATS_PASSWORD, LOG_LEVEL } = process.env

const { MongoClient, ObjectId } = require('mongodb');

app.use(cors())

const expressPino = require('express-pino-logger')({
    logger: pino({
        prettyPrint: true,
        level: LOG_LEVEL
    })
})

app.use(expressPino)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

const Hemera = require('nats-hemera')

const nats = require('nats').connect({
    url: NATS_URL,
    user: NATS_USER,
    pass: NATS_PASSWORD
})

const hemera = new Hemera(nats, {
    logLevel: LOG_LEVEL,
    prettyLog: true
})

// keep track of the clients that are currently connected to the server
var clients = []

// Use connect method to connect to the db server
MongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, function (err, client) {
    hemera.log.info("Connected successfully to server");
    // Database Name
    const dbName = 'myproject';

    const db = client.db(dbName);

    // storage
    var usersAccess = db.collection('users-access');
    var userScreens = db.collection('user-screens');
    var employees = db.collection('employees');

    // get the local IP
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                hemera.log.info(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                hemera.log.info(ifname, iface.address);
            }
            ++alias;
        });
    });

    const hostname = '0.0.0.0';
    const port = 4333;

    server.listen(port, hostname, () => {
        hemera.log.info(`Server running at http://${hostname}:${port}/`)
    });



    // WARNING: app.listen(80) will NOT work here!

    app.locals.db = db
    app.get('/health', (req, res) => res.send("OK"));

    const imagesBasePath = `${process.cwd()}/data/imgs`

    app.get('/employees', (req, res) => {
        employees.find({}).toArray((err, data) => {
            res.send(data)
        })
    })

    app.get('/employees/:number', (req, res) => {
        employees.findOne({ number: req.params.number }, (err, data) => {
            if (err) hemera.log.error(err)
            res.send(data)
        })
    })

    app.delete('/employees/:id', (req, res) => {
        employees.remove({ _id: new ObjectId(req.params.id) }, () => {
            res.send()
        })
    })

    app.post('/employees/add', (req, res) => {
        const id = new ObjectId()
        req.body._id = id

        employees.insertMany([
            req.body
        ], function (err, result) {
            if (err)
                hemera.log.info(err)

            res.send({ id })
        })
    })

    app.delete('/analysis/:user_id/main/:image_id', (req, res) => {
        const imgsPath = path.resolve(imagesBasePath, req.params.user_id);
        fs.unlinkSync(path.resolve(imgsPath, req.params.image_id))
        res.status(200)
        res.send()
    })

    app.get('/analysis/:user_id/main/:image_id', (req, res) => {
        res.sendFile(`${process.cwd()}/data/imgs/${req.params.user_id}/${req.params.image_id}`)
    })

    app.get('/analysis/:user_id/faces/:image_id', (req, res) => {
        const createTmpAndRespond = () => {
            const imgsPath = path.resolve(imagesBasePath, req.params.user_id);
            const imageMat = cv.imread(path.resolve(imgsPath, req.params.image_id))
            const greyImage = imageMat.bgrToGray()
            const faceRects = classifier.detectMultiScale(greyImage).objects;
            const face = greyImage.getRegion(faceRects[0])
            let base64Image = cv.imencode('.jpg', face).toString('base64')

            base64Image += base64Image.replace('+', ' ');
            const binary = new Buffer(base64Image, 'base64').toString('binary');

            fs.writeFile(`${process.cwd()}/data/tmp/${req.params.image_id}`, binary, "binary", function (err) {
                res.sendFile(`${process.cwd()}/data/tmp/${req.params.image_id}`);
            })
        }
        try {
            if (fs.existsSync(`${process.cwd()}/data/tmp/${req.params.image_id}`)) {
                //file exists
                res.sendFile(`${process.cwd()}/data/tmp/${req.params.image_id}`);
            } else {
                createTmpAndRespond()
            }
        } catch (err) {
            createTmpAndRespond()
        }
    })

    app.get('/analysis/:user_id', (req, res) => {
        try {
            const imagesBasePath = `${process.cwd()}/data/imgs`
            const imgsPath = path.resolve(imagesBasePath, req.params.user_id);
            const images = fs.readdirSync(imgsPath);
            res.send({ images })
        } catch (error) {
            res.send({ images: [] })
        }
    })

    hemera.ready(() => {
        let availableClients = [];
        let registeringClients = {};

        hemera.add({
            topic: 'main',
            pubsub$: true,
            cmd: 'getUserList'
        }, () => {
            return employees.find({}).toArray()
        })


        io.on('connection', async function (socket) {
            hemera.log.info('Client connected!')
            socket.emit('connection');

            socket.join('main');

            io.of("/").in("main").clients(function (error, clients) {
                if (error) { throw error; }
                // availableClients = cl
            });

            socket.on('auth', (data) => {
                const id = data.id || new ObjectId().toString()
                hemera.log.info(`Client ${id} authenticated!`)
                socket.metaData = { id }
                usersAccess.insertMany([
                    data
                ], function (err, result) {
                    socket.emit('auth-success', { id });

                    // "id already already exists"
                    const existingCopy = [...availableClients].filter(client => client.id === id)

                    if (existingCopy.length == 0) {
                        availableClients = [...availableClients, {
                            clientId: socket.id,
                            id
                        }]

                        clients = availableClients;

                        return io.sockets.emit('broadcast', { clients: availableClients });
                    }

                    io.sockets.emit('broadcast', { clients: availableClients });
                })
            });

            socket.on('screen', (data) => {
                if (socket.metaData)
                    data.user = socket.metaData.id

                userScreens.insertMany([
                    data
                ], function (err, result) {
                    if (err)
                        hemera.log.info(err)
                })
            });

            socket.on('disconnect', function (data) {
                for (var x of availableClients) {
                    availableClients = availableClients.filter(c => c.clientId != socket.id)
                }
            });


            hemera.add(
                {
                    topic: 'main',
                    cmd: 'send_face_to_client',
                    pubsub$: true,
                    client: socket.id
                }, (thumb) => socket.emit('new-face', { img: 'data:image/jpeg;base64,' + thumb.image }))


            hemera.add(
                {
                    topic: 'main',
                    cmd: 'new-face-prediction',
                    pubsub$: true,
                    client: socket.id
                }, (thumb) => {
                    hemera.log.info("Sending new thumb to frontend", socket.id)
                    // socket.emit('new-detection', {
                    //     img: 'data:image/jpeg;base64,' + thumb.image,
                    //     user: thumb.user,
                    //     confidence: thunb.confidence
                    // })
                    // hemera.log.info(Object.keys(thumb))
                    socket.emit('new-detection', {
                        user: thumb.user,
                        img: 'data:image/jpeg;base64,' + thumb.image,
                        confidence: thumb.confidence
                    })
                })

            socket.on('new-registration', async function (data) {
                const {
                    label,
                    image
                } = data

                if (!image && label)
                    return;

                hemera.log.info({ label }, "processing image")

                hemera.act(
                    {
                        topic: 'pacman',
                        cmd: 'verify-and-store-image',
                        client: socket.id,
                        pubsub$: true,
                        image,
                        label
                    },
                    function (err, resp) {
                        try {
                            hemera.log.info('Verified and stored images for ', label)
                        } catch (error) {
                            hemera.log.error(error.message)
                        }
                    }
                )
            });


            socket.on('liveFeed', async function (data) {
                const {
                    image
                } = data
                hemera.act({
                    topic: 'ML',
                    cmd: 'check-for-users',
                    client: socket.id,
                    pubsub$: true,
                    image
                })
            });

            // setInterval(() => {
            //     socket.emit('new-detection', { user: "1234", img: "https://picsum.photos/200/300" })
            // }, 1000);

        });
    })
});