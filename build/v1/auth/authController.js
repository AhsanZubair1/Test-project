"use strict";
exports.__esModule = true;
exports.register = function (req, res) {
    console.log(" vbnm,");
    var check = "this is a request";
    var returnPromise = new Promise(function (resolve) { return resolve(check); });
    return returnPromise;
};
