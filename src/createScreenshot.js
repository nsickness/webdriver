/**
 * Created by Nikita on 3/15/17.
 */

'use strict';

const fs = require('fs');

function createScreenshot(entry, driver) {
    return new Promise((resolve, reject) => {

        var imageName = './images/' + entry.Client + '.png';

        fs.exists(imageName, function (exists) {
            if (!exists) {
                console.warn('! File ' + entry.Client + '.png not exists. Entering ' + entry['Website Link']);
                driver.navigate().to(entry['Website Link']);

                driver.takeScreenshot().then(function (data) {
                    var base64Data = data.replace(/^data:image\/png;base64,/, "");
                    fs.writeFile(imageName, base64Data, 'base64', function (err) {
                        if (err) {
                            throw new Error(err);
                        }
                        else {
                            console.info('+ ' + entry.Client + '.png saved');
                            resolve(true)
                        }
                    });
                });
            } else {
                console.info('- File ' + entry.Client + '.png already exists. Skipping...');
                resolve(true)
            }
        })

    })
}

module.exports = createScreenshot;