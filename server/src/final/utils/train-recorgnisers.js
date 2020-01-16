var cv = require('opencv4nodejs');

const trainRecorgnisers = ([trainImages, labels]) => {
    const eigen = new cv.EigenFaceRecognizer();
    const fisher = new cv.FisherFaceRecognizer();
    const lbph = new cv.LBPHFaceRecognizer();
    eigen.train(trainImages, labels);
    fisher.train(trainImages, labels);
    lbph.train(trainImages, labels);

    return [
        eigen,
        fisher,
        lbph
    ]
}

module.exports = trainRecorgnisers