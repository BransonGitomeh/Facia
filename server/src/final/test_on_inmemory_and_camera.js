var NodeWebcam = require("node-webcam");
var inquirer = require('inquirer');
var cv = require('opencv4nodejs');
const path = require('path')
const fs = require('fs')

const data_preparation = require("./utils/data-prep")
const train_recorgnisers = require("./utils/train-recorgnisers")
const prediction = require('./utils/recorgniser_generic')
const prepareSingleImage = require("./utils/singleImagePrep")
const { verifyTrashImage, verifyImage } = require("./utils/testPictureForFace")

var Webcam;
var trashImagesPath = './data/trash/imgs'
var testSingleImage = true
var SingleImageInTest = 'photo-1507003211169-0a1dd7228f2d'

var NodeWebcam = require("node-webcam");

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

const captureImage = async (imageName, trashImagesPath) => new Promise((resolve, reject) => {
    const trashDir = "./data/POC/trash"
    if (!fs.existsSync(trashDir)) {
        fs.mkdirSync(trashDir);
    }

    Webcam.list(function (list) {
        var cam2 = NodeWebcam.create({ device: list[2] });
        cam2.capture(`./data/POC/trash/${imageName}.jpg`, function (err, data) {
            if (err) throw err;
            resolve()
        });
    })
})

const { nameMappings } = require("../../data/POC/labels.json")
const main = async () => {
    // --------------------------- MACHINES LEARNING, BEWARE ---------------------------------------------
    // Train with existing dataset
    console.log('Training with existing dataset')
    const [
        trainImages,
        labels,
    ] = await data_preparation({
        nameMappings
    })

    console.log('Now ready to run tests')
    const [eigen, fisher, lbph] = await train_recorgnisers([trainImages, labels])

    if (!testSingleImage) {
        // capture an image to take the model from
        const captureSingleImage = async (name) => {
            // Take one last picture but now for testing only to get a score and probably an image with square on it
            var questions = [{
                type: 'confirm',
                name: `picture`,
                message: `Can we final image to test if the model trained properly on your face?`,
            }]

            await inquirer.prompt(questions)

            await captureImage(imageName)

            try {
                console.warn(`Verifying Image , please wait`)
                await verifyTrashImage(imageName)
                console.warn(`Successfully Verified Image , please proceed`)
            } catch (error) {
                console.warn(`Bad quality picture,${error.message} face not detected. please try centralize your face or check the camera for better quality`)
                await captureSingleImage(name)
            }
        }

        const imageName = Math.random().toString().split(".")[1]

        await captureSingleImage(imageName)

        // convert image to matrix
        console.log("Preparing image for processing")
        // const imageMat = await prepareSingleImage(imageName)

        // test picture against models trained created
        console.log("Running matrix against recorgnition model")
        const imageMats = await prepareSingleImage(imageName)

        // test picture against models trained created
        for (var Mat of imageMats) {
            await prediction(Mat, nameMappings, [eigen, fisher, lbph])
        }
        // --------------------------- END OF MACHINES LEARNING --------------------------------------------------
    } else {
        // convert image to matrix
        const imageMats = await prepareSingleImage(SingleImageInTest)

        // test picture against models trained created
        for (var Mat of imageMats) {
            await prediction(Mat, nameMappings, [eigen, fisher, lbph])
        }

    }
}

main().catch(console.error)