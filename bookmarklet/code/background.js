console.log('background running~');

/*
    features
*/
//Listen to App, post acknowledgement
function listenToApp (port) {
    port.onMessage.addListener( message => {
        if(!(message.localeCompare("unauthed")))
            alert("Please Login first")
        else    
           console.log("Received " + message)
        return true
    })
    port.postMessage('ACK')
}

//extracts the domain of the current tab
function getDomain (callback) {
    domain = chrome.tabs.query( { active: true, currentWindow: true }, 
        function (tabs) {
            var tab = tabs[0];
            var url = new URL(tab.url)
            domain = url.host
            //console.log(domain)
            callback(domain);
        }
    )
}

/*
    functions
*/

//creates new password for domain and returns it
function newDomain (domain) {
    var port = chrome.runtime.connectNative('hex')
    console.log("Creating new for:")
    console.log(domain)
    port.postMessage("new")
    port.postMessage(domain)
    listenToApp(port)
    port.onDisconnect.addListener (function (error) {
        console.log("last error: " + chrome.runtime.lastError.message)
    })
}

function retrieve (domain) {
    var port = chrome.runtime.connectNative('hex')
    console.log("Retrieving for:")
    console.log(domain)
    port.postMessage("ret")
    port.postMessage(domain)
    listenToApp(port)
    port.onDisconnect.addListener (function (error) {
        console.log("last error: " + chrome.runtime.lastError.message)
    })
}

function changePass (domain) {
    var port = chrome.runtime.connectNative('hex')
    console.log("Changing for:")
    console.log(domain)
    port.postMessage("chg")
    port.postMessage(domain)
    listenToApp(port)
    port.onDisconnect.addListener (function (error) {
        console.log("last error: " + chrome.runtime.lastError.message)
    })
}

function deletePass (domain) {
    var port = chrome.runtime.connectNative('hex')
    console.log("Deleting:")
    console.log(domain)
    port.postMessage("del")
    port.postMessage(domain)
    listenToApp(port)
    port.onDisconnect.addListener (function (error) {
        console.log("last error: " + chrome.runtime.lastError.message)
    })
}

function logOff () {
    var port = chrome.runtime.connectNative('hex')
    console.log("Log off")
    port.postMessage("out")
    listenToApp(port)
    port.onDisconnect.addListener (function (error) {
        console.log("last error: " + chrome.runtime.lastError.message)
    })
}


/*
    extension message interpreter
*/

function receiveMessage(message) {
    //console.log(message)
    switch (message) {
        case "new":
            console.log("New Domain")
            getDomain(newDomain)
            break;
        case "ret":
            console.log("Retrieve Password")
            getDomain(retrieve)
            break;
        case "chg":
            console.log("Change Password")
            getDomain(changePass)
            break;
        case "del":
            console.log("Delete Password")
            getDomain(deletePass)
            break;
        case "out":
            console.log("Logout")
            logOff()
            break;
        default:
            console.log("Error")       
    }
}

//message received, interpret
chrome.runtime.onMessage.addListener(receiveMessage);
