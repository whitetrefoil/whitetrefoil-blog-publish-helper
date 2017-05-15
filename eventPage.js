function generateDescription(owner, ownerLink, title, flickrUrl, _500pxUrl) {
  return `"${title}" by <a href="https://www.flickr.com${ownerLink}" target="_blank">${owner}</a>, on <a href="${flickrUrl}" target="_blank">Flickr</a>, on <a href="${_500pxUrl}" target="_blank">500px</a>`
}

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({ url: ['https://www.flickr.com/photos/*', 'https://500px.com/photo/*'] }, (tabs) => {
    const flickrUrls = []
    const _500pxUrls = []

    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i] == null || tabs[i].url == null) { break; }
      const url = tabs[i].url

      const flickrMatch = url.match(/https:\/\/www.flickr.com\/photos\/.*?\/\d+/)
      if (flickrMatch != null) { flickrUrls.push(flickrMatch[0]) }

      const _500pxMatch = url.match(/https:\/\/500px.com\/photo\/\d+/)
      if (_500pxMatch != null) { _500pxUrls.push(_500pxMatch[0]) }
    }

    let message = ''

    if (flickrUrls.length > 1) { message += 'Please open only one Flickr photo tab in current window.\n'}
    else if (flickrUrls.length < 1) { message += 'Please open one Flickr photo tab in current window.\n'}

    if (_500pxUrls.length > 1) { message += 'Please open only one 500px photo tab in current window.\n'}
    else if (_500pxUrls.length < 1) { message += 'Please open one 500px photo tab in current window.\n'}

    if (message.length > 0) {
      alert(message)
      return
    }

    chrome.tabs.sendMessage('get_flickr_info', (res) => {
      const caption = generateDescription(res.owner, res.ownerLink, res.title, flickrUrls[0], _500pxUrls[0])
      chrome.tabs.sendMessage('fill_form', {
        title: res.title,
        caption,
      })
    })
  })
})

