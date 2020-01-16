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
    const imagesBasePath = "./data/POC/imgs"
    const facesBasePath = "./data/POC/faces"

    var globalLabels = []
    var globalTrainingImages = []

    for (var n of nameMappings) {
            
        const imgsPath = path.resolve(imagesBasePath, n);
        console.log('Training models with', n ,imgsPath)
        const imgFiles = fs.readdirSync(imgsPath);
        const detectedImagesPath = path.resolve(facesBasePath, n);

        try {
            const images = imgFiles
                .map(file => path.resolve(imgsPath, file))
                .map(filePath => cv.imread(filePath))
                .map(img => img.bgrToGray())
                .map(getFaceImage)
                .map(faceImg => faceImg.resize(80, 80));

            images.map((face, i) => saveFace(face, nameMappings[i]))

            const isImageFour = (_, i) => imgFiles[i].includes('9');
            const isNotImageFour = (_, i) => !isImageFour(_, i);
            // use images 1 - 3 for training
            //let trainImages = images.filter(isNotImageFour);
            // use images 4 for testing
            // const testImages = images.filter(isImageFour);
            // make labels
            const labels = imgFiles
                // .filter(isNotImageFour)
                .map(file => nameMappings.findIndex(name => n.includes(name)));

            // console.log({ labels })
            globalLabels = [...globalLabels, ...labels]
            globalTrainingImages = [...globalTrainingImages, ...images]
        } catch (err) {
            console.log(err.message)
        }
    }

    // console.log(globalTrainingImages)
    resolve([
        globalTrainingImages,
        // testImages,
        globalLabels
    ])
})

module.exports = prepareData;