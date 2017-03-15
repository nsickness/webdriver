/**
 * Created by Nikita on 3/15/17.
 */

'use strict';

function parseText(entry) {

    var regExp = /(\w+): (.+?(?=(?:, \w+:|$)))/mgi;
    var propsArray = regExp.exec(entry);
    var props = {};

    while (propsArray != null) {
        var propName = propsArray[1];
        props[propName] =  propsArray[2];
        propsArray = regExp.exec(entry);
    }
    return props
}

module.exports = parseText;