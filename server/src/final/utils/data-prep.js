const path = require('path')
const fs = require('fs')
var cv = require('opencv4nodejs');

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
const getFaceImage = (grayImg) => {
    const faceRects = classifier.detectMultiScale(grayImg).objects;
    if (!faceRects.length) {
        throw new Error('failed to detect faces');
    }
    return grayImg.getRegion(faceRects[0]);
};

const saveFace = (face, name) => new Promise(async (resolve, reject) => {
    try {
        cv.imwrite(`data/POC/faces/${name}.jpg`, face);
        resolve()
    } catch (error) {
        reject(error)
    }
})

const prepareData = ({
    nameMappings = []
}) => new Promise((resolve, reject) => {
    const imagesBasePath = `${process.cwd()}/data/imgs`

    var globalLabels = []
    var globalTrainingImages = []

    for (var n of nameMappings) {
            
        const imgsPath = path.resolve(imagesBasePath, n);

        const imgFiles = fs.readdirSync(imgsPath);

        try {
            const images = imgFiles
                .map(file => path.resolve(imgsPath, file))
                .map(filePath => cv.imread(filePath))
                .map(img => img.bgrToGray())
                .map(getFaceImage)
                .map(faceImg => faceImg.resize(80, 80));

            images.map((face, i) => saveFace(face, nameMappings[i]))

            // make labels
            const labels = imgFiles
                .map(file => nameMappings.findIndex(name => n.includes(name)));

            globalLabels = [...globalLabels, ...labels]
            globalTrainingImages = [...globalTrainingImages, ...images]
        } catch (err) {
            reject(err)
        }
    }

    resolve([
        globalTrainingImages,
        globalLabels
    ])
})

module.exports = prepareData;