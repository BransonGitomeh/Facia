const Hemera = require('nats-hemera')
const nats = require('nats').connect()
var cv = require('opencv4nodejs');
const { verifyTrashImage, verifyBase64Image, verifyImage } = require("./../final/utils/testPictureForFace")
const { prepareSingleBase64Image } = require("./../final/utils/singleImagePrep")
const data_preparation = require("./../final/utils/data-prep")
const train_recorgnisers = require("./../final/utils/train-recorgnisers")
const { nameMappings } = require("../../data/POC/labels.json")

const hemera = new Hemera(nats, {
    logLevel: 'error'
})

const predictors = {
    // assign predictors here. and reloading and assigned to here
}

// load the data and make teh thing ready for preicting and reloading
const retrain = async () => {
    const [
        trainImages,
        labels,
    ] = await data_preparation({
        nameMappings
    })

    console.log('training got', {
        trainImages: trainImages.length,
        labels: labels.length,
    })
    console.log('Now ready to run tests')
    const [eigen, fisher, lbph] = await train_recorgnisers([trainImages, labels])

    predictors.lbph = lbph
}

retrain().catch(console.log)

hemera.ready(() => {
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
                // prepare the image

                // can the predictor

                // match result with user id

                // send that as a detected-user to frontend

                // frontend stops verifying frames when you provide a valid user here

                // then restart if asked to

                // convert image to matrix
                // console.log("Preparing image for processing")
                // const imageMat = await prepareSingleImage(imageName)

                // test picture against models trained created
                console.log("Preparing image for processing")
                const imageMats = await prepareSingleBase64Image(req.image)

                console.log({ faces_found: imageMats.length })
                // test picture against models trained created
                for (var Mat of imageMats) {
                    // console.log({ Mat })
                    // console.log({ predictors })
                    Object.keys(predictors).map((predictor) => {
                        console.log("Running against", predictor)
                        const result = predictors[predictor].predict(Mat);

                        // console.log(`${predictor} predicted: ${nameMappings[result.label]}, confidence: ${result.confidence}`);
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
                console.log("Error testing against the main model", error.message)
            }
        })
})