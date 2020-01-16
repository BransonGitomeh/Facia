var NodeWebcam = require("node-webcam");
var inquirer = require('inquirer');

const data_preparation = require("./utils/data-prep")
const train_recorgnisers = require("./utils/train-recorgnisers")
const run_predictions = require('./utils/recorgnisers')
const { verifyImage } = require("./utils/testPictureForFace")

var fs = require('fs');

var opts = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location",
    verbose: false
};

var Webcam = NodeWebcam.create(opts);

const captureImage = async (name, index) => new Promise((resolve, reject) => {
    Webcam.list(function (list) {
        var cam2 = NodeWebcam.create({ device: list[2] });
        cam2.capture(`./data/POC/imgs/${name}/${index}.jpg`, function (err, data) {
            if (err) throw err;
            resolve()
        });
    })
})

const usersData = []

// Save name and take three pictures each with a stop
const captureSingleImage = async (name, i) => {
    var faceDir = `./data/POC/faces/${name}`;
    var imgDir = `./data/POC/imgs/${name}`;

    if (!fs.existsSync(faceDir)) {
        fs.mkdirSync(faceDir);
    }

    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir);
    }

    var questions = [{
        type: 'confirm',
        name: 'picture ' + i,
        message: `Can we take picture number ${i + 1}?`,
    }]

    await inquirer.prompt(questions)

    await captureImage(name, i)

    try {
        console.warn(`Verifying Image ${i}, please wait`)
        await verifyImage(name, i)
        console.warn(`Successfully Verified Image ${i}, please proceed`)
        usersData.push(name)
    } catch (error) {
        console.warn(`Bad quality picture, ${error.message}. please try centralize your face or check the camera for better quality`)
        await captureSingleImage(name, i)
    }
}

const main = async () => {


    // ask for information about two people
    const userCounts = [1, 2]

    const askForUserData = async (userIndex) => {
        // Ask for name
        var questions = [{
            type: 'input',
            name: 'name',
            message: `Whats the name of user ${userIndex}?`,
        }]

        const answer = await inquirer.prompt(questions)
        return answer;
    }

    for (var i of userCounts) {
        const answer = await askForUserData(i)

        const pictureIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        for (var i of pictureIndexes) {
            await captureSingleImage(answer.name, i)
        }
    }

    // --------------------------- MACHINES LEARNING, BEWARE ---------------------------------------------
    const [
        trainImages,
        testImages,
        labels,
        nameMappings
    ] = await data_preparation({
        nameMappings: usersData
    })

    const [eigen, fisher, lbph] = await train_recorgnisers([trainImages, labels])

    // test picture against db created
    await run_predictions(testImages, nameMappings, [eigen, fisher, lbph])
    // --------------------------- END OF MACHINES LEARNING --------------------------------------------------


    // Take one last picture but now for testing only to get a score and probably an image with square on it
    // var questions = [{
    //     type: 'confirm',
    //     name: `picture ${i}`,
    //     message: `Can we final image to test if the model trained properly on your face?`,
    // }]

    // await inquirer.prompt(questions)
    // captureImage(answer, i)


}

Webcam.list(function (list) {
    // console.log('\n webcam list', { list })
    // cam2 = NodeWebcam.create({ device: list[0] });

    main().catch(console.error)
});

