const Hemera = require('nats-hemera')

const { NATS_URL, NATS_USER, NATS_PASSWORD, LOG_LEVEL } = process.env
const nats = require('nats').connect({
    url: NATS_URL,
    user: NATS_USER,
    pass: NATS_PASSWORD
})

var cv = require('opencv4nodejs');
const { verifyTrashImage, verifyBase64Image, verifyImage } = require("./../final/utils/testPictureForFace")
const { prepareSingleBase64Image } = require("./../final/utils/singleImagePrep")
const data_preparation = require("./../final/utils/data-prep")
const train_recorgnisers = require("./../final/utils/train-recorgnisers")

const hemera = new Hemera(nats, {
    logLevel: LOG_LEVEL
})



hemera.ready(async () => {
    const predictors = {
        // assign predictors here. and reloading and assigned to here
    }

    // load the data and make teh thing ready for preicting and reloading
    const retrain = async () => {
        const { data: clients } = await hemera.act({
            topic: 'main',
            cmd: 'getUserList'
        })

        hemera.log.info('Preparing data for training')

        const [
            trainImages,
            labels,
        ] = await data_preparation({
            nameMappings: clients.map(client => client.number)
        })

        hemera.log.info('ML trainer got', {
            trainImages: trainImages.length,
            labels: labels.length,
        })

        hemera.log.info('Preparing training')

        const [eigen, fisher, lbph] = await train_recorgnisers([trainImages, labels])

        hemera.log.info('Now ready to run matches')

        Object.assign(predictors, {
            lbph,
            eigen,
            fisher
        })
    }

    setInterval(() => {
        retrain().catch(console.log)
    }, 2000);

    hemera.add(
        {
            pubsub$: true,
            topic: 'ML',
            cmd: 'retrain'
        }, async (req) => {
            retrain()
        })

    hemera.add(
        {
            pubsub$: true,
            topic: 'ML',
            cmd: 'check-for-users'
        }, async (req) => {
            try {
                // test picture against models trained created
                hemera.log.info("Preparing image for processing")
                const imageMats = await prepareSingleBase64Image(req.image)

                hemera.log.info("Faces found in image", { faces_found: imageMats.length })
                // test picture against models trained created
                for (var Mat of imageMats) {

                    Object.keys(predictors).map((predictor) => {
                        hemera.log.info("Running against", predictor)
                        const result = predictors[predictor].predict(Mat);

                        hemera.log.info(`${predictor} predicted: ${nameMappings[result.label]}, confidence: ${result.confidence}`);
                        // cv.imshow(nameMappings[result.label], img);

                        hemera.act(
                            {
                                topic: 'main',
                                cmd: 'new-face-prediction',
                                pubsub$: true,
                                client: req.client,
                                // send in base64
                                image: cv.imencode('.jpg', Mat).toString('base64'),
                                user: nameMappings[result.label],
                                confidence: result.confidence
                            },
                            function (err, resp) {
                                // this.log.info(resp, 'Result')
                            }
                        )
                    })
                }
            } catch (error) {
                hemera.log.info("Error testing against the main model", error.message)
            }
        })
})