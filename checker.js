
const fetch = require('node-fetch');

function check(url, invocationParameters,  expectedResultData, expectedResultStatus) {
    let rStatus;
    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    };
    let myurl = url + "?";
    for (let p of Object.keys(invocationParameters)){
        myurl = myurl + p + "=" + invocationParameters[p] + "&";
    }
    console.log("myurl = "+myurl);
    return fetch(myurl,{
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(getResponse => {
        rStatus = getResponse.status;
        console.log("rstatus = "+rStatus);
        return getResponse.body;
    })
    .then(responseBody => {
        if(compareResults(expectedResultData,responseBody)){
            checkResult["urlChecked"] = myurl;
            checkResult["resultData"] = responseBody;
            checkResult["resultStatus"] = rStatus;
            if (expectedResultData == rStatus)
                checkResult["statusTestPassed"] = true;
            else
                checkResult["statusTestPassed"] = false;
            checkResult["resultDataAsExpected"] = true;
        }
        else{
            checkResult["urlChecked"] = myurl;
            checkResult["resultData"] = responseBody;
            checkResult["resultStatus"] = rStatus;
            if (expectedResultData == rStatus)
                checkResult["statusTestPassed"] = true;
            else
                checkResult["statusTestPassed"] = false;
            checkResult["resultDataAsExpected"] = false;
        }
        console.log("checkResult[url]= "+checkResult["urlChecked"]);
        console.log("checkResult[resultData]= "+checkResult["resultData"]);
        console.log("checkResult[resultStatus]= "+checkResult["resultStatus"]);
        console.log("checkResult[resultDataAsExpected]= "+checkResult["resultDataAsExpected"]);
        return checkResult;
    })
    .then(result => {return result;});

}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check