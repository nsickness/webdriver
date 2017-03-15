/**
 * Created by nsick on 14-Mar-17.
 */

//Big Drop Website Database.xlsx
const fetch = require('node-fetch');
const xlsxj = require("xlsx-to-json");
const parseText = require('./src/util/parseText');
const chromedriver = require('chromedriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const createScreenshot = require('./src/createScreenshot');

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const FILE_NAME = 'name';

xlsxj({
    input: FILE_NAME,
    output: "output.json"
}, function(err, result) {
    if(err) {
        console.error(err);
    }else {
        // driver.manage().window().maximize(); // for Windows
        try{
            driver.manage().window().setSize(1920, 1080); // for OS X
            result.reduce((previous, current, index, array) => {
                return previous
                    .then(()=> {
                        return createScreenshot(array[index], driver)
                    })
            }, Promise.resolve())
        } catch(error){
            driver.quit();
            throw new Error(error);
        }
    }
    
});