var tabPriority = false

browser.runtime.onMessage.addListener(function(data) {
  if(data.tabPriority)
    updateData();

  if(data.mediaKeys)
    handleMediaKeys(data)

  if(!tabPriority) {
    tabPriority = true
    priorityMessage();
  }

  if(!data.tabPriority) {
    tabPriority = false;
  }
})

function priorityMessage() {
  browser.storage.sync.get(['options'], async function(result) {
    if(result.options.darkTheme) {
      $(('<div id="premid-connectinfo" class="dark"><img draggable="false" src="' + browser.runtime.getURL('icon.png') + '"><h1>' + browser.runtime.getManifest().name + '</h1><h2>' + await getString("tabPriority.prioritized") + '</h2></div>')).appendTo('body')
    } else {
      $(('<div id="premid-connectinfo"><img draggable="false" src="' + browser.runtime.getURL('icon.png') + '"><h1>' + browser.runtime.getManifest().name + '</h1><h2>' + await getString("tabPriority.prioritized") + '</h2></div>')).appendTo('body')
    }

    $('#premid-connectinfo h2').width($('#premid-connectinfo h2').textWidth()+60)
    setTimeout(() => {
      $('#premid-connectinfo').remove()
    }, 5*1000)
  })
}

/**
 * Calculate textWidth in PX
 * @returns Number
 */
$.fn.textWidth = function(){
  var html_org = $(this).html();
  var html_calc = '<span>' + html_org + '</span>';
  $(this).html(html_calc);
  var width = $(this).find('span:first').width();
  $(this).html(html_org);
  return width;
};

/**
 * Get Timestamps
 * @param {Number} videoTime Song Time seconds
 * @param {Number} videoDuration Song Duration seconds
 */
function getTimestamps(videoTime, videoDuration) {
  var startTime = Date.now();
  var endTime =
    Math.floor(startTime / 1000) -
    videoTime +
    videoDuration;
    return [Math.floor(startTime/1000), endTime]
}