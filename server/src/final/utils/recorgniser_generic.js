var cv = require('opencv4nodejs');

const runPredictions = (img, nameMappings, [eigen, fisher, lbph]) => {
    const predict = (recognizer) => {
        const result = recognizer.predict(img);

        // console.log('predicted: %s, confidence: %s', nameMappings[result.label], result.confidence);
        // cv.imshowWait('face', img);
        // cv.destroyAllWindows();
        return result
    };

    const predictors = {
        // eigen,
        // fisher,
        lbph
    }

    Object.keys(predictors).map((predictor) => {
        const result = predict(predictors[predictor]);

        console.log(`${predictor} predicted: ${nameMappings[result.label]}, confidence: ${result.confidence}`);
        cv.imshow(nameMappings[result.label], img);
    })
}

module.exports = runPredictions