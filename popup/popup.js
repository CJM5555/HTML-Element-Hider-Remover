const sendMessageId = document.getElementById("sendmessageid");
const msg = document.getElementById("msg");

var input = [];

/*Get data from previous storage*/
var inputEle = Array.prototype.slice.call($("input"));
inputEle.forEach(function (ele) {
  if (localStorage.getItem(ele.id)) {
    ele.value = localStorage.getItem(ele.id);
  }
});

/*Send message to content.js to execute scripts on the page*/
if (sendMessageId) {
  sendMessageId.onclick = function () {
    inputEle.forEach(function (ele) {
      input.push({
        key: ele.id,
        value: ele.value.split("|"),
      });
      localStorage.setItem(ele.id, ele.value);
    });

    debugger;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, input, function (response) {
        msg.innerText = response.fromcontent;
      });
    });
  };
}
