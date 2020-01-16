var NodeWebcam = require("node-webcam");
var inquirer = require('inquirer');

const data_preparation = require("./utils/data-prep")
const train_recorgnisers = require("./utils/train-recorgnisers")
const run_predictions = require('./utils/recorgnisers')

const { nameMappings } = require("../data/POC/imgs/labels.json")

const main = async () => {
    // --------------------------- MACHINES LEARNING, BEWARE ---------------------------------------------
    const [
        trainImages,
        // testImages,
        labels,
        // nameMappings
    ] = await data_preparation({
        nameMappings
    })

    console.log({
        trainImages: trainImages.length, labels: labels.length
    })
    const [eigen, fisher, lbph] = await train_recorgnisers([trainImages, labels])

    // test picture against db created
    // await run_predictions(testImages, nameMappings, [eigen, fisher, lbph])
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
    main().catch(console.error)
})