/**
 * Created by nsick on 14-Mar-17.
 */

require('chromedriver');
var fetch = require('node-fetch');
var fs = require('fs');
var webdriver = require('selenium-webdriver')
var chrome = require('selenium-webdriver/chrome')
function parseText(entry) {
    var currentPropertiesText = entry;

    var re = /(\w+): (.+?(?=(?:, \w+:|$)))/mgi;
    var propsArray = re.exec(currentPropertiesText)
    var props = {};

    while (propsArray != null) {

        var propName = propsArray[1];
        var propValue = propsArray[2];

        props[propName] = propValue;

        propsArray = re.exec(currentPropertiesText);
    }
    return props
}


var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


var jsonEntry = fetch('https://spreadsheets.google.com/feeds/list/1N0iAyVIAWBn1kXlMmcfBJQ5qJC9CAWKFW_LEhsbKhUw/default/public/basic?alt=json')
    .then(function (data) {
        return data.json()
    }).then(function (data) {
        return data.feed.entry.map(function (entry) {
            return {
                content:parseText(entry.content.$t),
                title: entry.title.$t
            }
        })
    }).then(function (entries) {


        driver.manage().window().maximize();

        entries.forEach(function (entry) {
            driver.navigate().to(entry.content.websitelink)
            driver.takeScreenshot().then(function (data) {
                var base64Data = data.replace(/^data:image\/png;base64,/, "")
                fs.writeFile("./images/" + entry.title + '.png', base64Data, 'base64', function (err) {
                    if (err) console.log(err);
                });
            });
        })
    }).then(driver.quit);