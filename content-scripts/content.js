chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Create an <script> tag to run jQuery
  var jq = document.createElement("script");
  jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
  document.getElementsByTagName("head")[0].appendChild(jq);

  // Set a fake timeout to get the highest timeout id
  var highestTimeoutId = setTimeout(";");
  for (var i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }

  //Get all element to hide
  var tags = message[0].value;
  var ids = message[1].value;
  var classes = message[2].value;

  function hideElement() {
    try {
      tags.forEach(function (tag) {
        console.log("Hide " + tag);
        $(tag).remove();
      });
      ids.forEach(function (id) {
        console.log('Hide *[id*="' + id + '"]');
        $('*[id*="' + id + '"]').hide();
      });
      classes.forEach(function (clas) {
        console.log('Hide *[class*="' + clas + '"]');
        $('*[class*="' + clas + '"]').hide();
      });
    } catch {}
  }

  //Get all element to remove
  var tagsR = message[3].value;
  var idsR = message[4].value;
  var classesR = message[5].value;

  function removeElement() {
    try {
      tagsR.forEach(function (tag) {
        console.log("Remove " + tag);
        $(tag).remove();
      });
      idsR.forEach(function (id) {
        console.log('Remove *[id*="' + id + '"]');
        $('*[id*="' + id + '"]').remove();
      });
      classesR.forEach(function (clas) {
        console.log('Remove *[class*="' + clas + '"]');
        $('*[class*="' + clas + '"]').remove();
      });
    } catch {}
  }

  //Disable scrolling restriction
  function setOverflow() {
    var allElement = $("*")
      .filter(function () {
        return $(this).css("overflow").toLowerCase() == "hidden";
      })
      .toArray();

    allElement.forEach(function clearClassList(x) {
      x.classList = "";
    });
  }

  //Wait for jQuery to be available before run
  setTimeout(function () {
    hideElement();
    removeElement();
    setOverflow();
  }, 1000);

  //Clear event listener so that the element(s) is not regenerated
  setTimeout(function () {
    document.body.outerHTML = document.body.outerHTML;
    console.log("Done execute");
  }, 1500);

  sendResponse({ fromcontent: "Operation succeeded from content.js" });
});
