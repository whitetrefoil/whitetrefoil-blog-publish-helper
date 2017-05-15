chrome.runtime.onMessage.addListener((req, sender, response) => {
  if (req == null || req.type !== 'get_flickr_info') {
    return
  }

  const titleElem = document.querySelector('.photo-title')
  const ownerElem = document.querySelector('.owner-name')

  response({
    title    : titleElem == null ? null : titleElem.innerText,
    owner    : ownerElem == null ? null : ownerElem.innerText,
    ownerLink: ownerElem == null ? null : ownerElem.getAttribute('href'),
  })
})
