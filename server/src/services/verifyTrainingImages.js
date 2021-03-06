const Hemera = require('nats-hemera')
const { NATS_URL, NATS_USER, NATS_PASSWORD, LOG_LEVEL } = process.env
const nats = require('nats').connect({
    url: NATS_URL,
    user: NATS_USER,
    pass: NATS_PASSWORD
})
var cv = require('opencv4nodejs');
const { verifyTrashImage, verifyBase64Image, verifyImage } = require("./../final/utils/testPictureForFace")

const hemera = new Hemera(nats, {
    logLevel: LOG_LEVEL
})

hemera.ready(() => {
    hemera.add(
        {
            topic: 'pacman',
            pubsub$: true,
            cmd: 'verify-and-store-image'
        }, async (req) => {
            try {
                await verifyBase64Image(req.image, req.label, (thumb) => {

                    // fetch users images from facebook - service call
                    const thumbnail = "https://picsum.photos/200"
                    hemera.log.info(`Completed verification of the image`)

                    hemera.act({
                        topic: 'main',
                        pubsub$: true,
                        cmd: 'send_face_to_client',
                        client: req.client,
                        image: thumbnail
                    })
                })
            } catch (error) {
                hemera.log.error(error)
            }
        })
})