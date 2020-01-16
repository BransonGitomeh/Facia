const path = require('path')
const fs = require('fs')
var cv = require('opencv4nodejs');
const { uuid } = require('uuidv4');
var ba64 = require("ba64")

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
const getFaceImage = (grayImg) => {
    const faceRects = classifier.detectMultiScale(grayImg).objects;
    if (!faceRects.length) {
        throw new Error('failed to detect faces');
    }

    return grayImg.getRegion(faceRects[0]);
};

const checkForFace = (name, index) => new Promise(async (resolve, reject) => {
    try {
        const imgMat = cv.imread(`data/POC/imgs/${name}/${index}.jpg`)
        const imgBgrToGray = imgMat.bgrToGray()
        const face = getFaceImage(imgBgrToGray)
        cv.imwrite(`data/POC/faces/${name}/${index}.jpg`, face);
        resolve()
    } catch (error) {
        reject(error.message)
    }
})

const verifyTrashImage = (name) => new Promise(async (resolve, reject) => {
    try {
        const imgMat = cv.imread(`./data/POC/trash/${name}.jpg`)
        const imgBgrToGray = imgMat.bgrToGray()
        const face = getFaceImage(imgBgrToGray)
        cv.imwrite(`./data/POC/trash/${name}_face.jpg`, face);
        resolve()
    } catch (error) {
        reject(error.message)
    }
})

const imagesBasePath = "../src/data/POC/imgs"

const verifyBase64Image = (image, label = "new", thumbCb) => new Promise(async (resolve, reject) => {
    console.log("verifying base64 image")
    if (!image) {
        return reject(new Error('Please provide an image'))
    }

    try {
        const base64text = image;
        const base64data = base64text.replace('data:image/jpeg;base64', '')
            .replace('data:image/png;base64', '');
        const buffer = Buffer.from(base64data, 'base64');
        const imgMat = cv.imdecode(buffer);

        const imgBgrToGray = imgMat.bgrToGray()
        const face = getFaceImage(imgBgrToGray)

        // send face to the frontend
        thumbCb(cv.imencode('.jpg', face).toString('base64'))

        // var dir = `./src/data/POC/imgs/${label}`;

        const dir = path.resolve(imagesBasePath, label);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        ba64.writeImage(`${dir}/${uuid()}`, image, function (err) {
            if (err) throw err;
            resolve()
        });
    } catch (error) {
        reject(error.message)
    }
})

module.exports.verifyImage = checkForFace
module.exports.verifyTrashImage = verifyTrashImage
module.exports.verifyBase64Image = verifyBase64Image