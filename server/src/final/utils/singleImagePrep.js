const path = require('path')
const fs = require('fs')
var cv = require('opencv4nodejs');

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
const getFaceImage = (grayImg) => {
    const faceRects = classifier.detectMultiScale(grayImg).objects;
    if (!faceRects.length) {
        throw new Error('failed to detect faces');
    }

    const images = []
    for (var x of faceRects) {
        images.push(grayImg.getRegion(faceRects[0]).resize(80, 80))
    }
    return images;
};

const prepareSingleImage = (user,name) => new Promise(async (resolve, reject) => {
    try {
        const imgMat = cv.imread(`${process.cwd()}/data/imgs/${user}/${name}.jpg`)
        const imgBgrToGray = imgMat.bgrToGray()
        const faceImgs = getFaceImage(imgBgrToGray)
        resolve(faceImgs)
    } catch (error) {
        reject(error)
    }
})

const prepareSingleBase64Image = (image) => new Promise(async (resolve, reject) => {
    console.log("preparing SingleBase64Image")
    try {
        // load base64 encoded image
        const base64text = image;//Base64 encoded string
        const base64data = base64text.replace('data:image/jpeg;base64', '')
            .replace('data:image/png;base64', '');//Strip image type prefix
        const buffer = Buffer.from(base64data, 'base64');
        const imgMat = cv.imdecode(buffer); //Image is now represented as Mat

        const imgBgrToGray = imgMat.bgrToGray()
        const faceImgs = getFaceImage(imgBgrToGray)
        resolve(faceImgs)
    } catch (error) {
        reject(error)
    }
})

module.exports = prepareSingleImage
module.exports.prepareSingleBase64Image = prepareSingleBase64Image