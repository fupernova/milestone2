function newDomain() {
    chrome.runtime.sendMessage("new")
    console.log("new")
}
function retrieve() {
    chrome.runtime.sendMessage("ret")
    console.log("ret")
}
function changePass() {
    chrome.runtime.sendMessage("chg")
    console.log("chg")
}
function deletePass() {
    chrome.runtime.sendMessage("del")
    console.log("del")
}
function logOut() {
    chrome.runtime.sendMessage("out")
    console.log("out")
}


document.addEventListener('DOMContentLoaded', 
    function () {
        document.getElementById('new').addEventListener("click", newDomain)
        document.getElementById('ret').addEventListener("click", retrieve)
        document.getElementById('chg').addEventListener("click", changePass)
        document.getElementById('del').addEventListener("click", deletePass)
        document.getElementById('out').addEventListener("click", logOut)
    }
)