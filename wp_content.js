chrome.runtime.onMessage.addListener((req, sender, response) => {
  if (req == null || req.type !== 'fill_blog') {
    return
  }

  const titleElem = document.querySelector('label.setting[data-setting=title] > input')
  const captionElem = document.querySelector('label.setting[data-setting=caption] > textarea')
  const descriptionElem = document.querySelector('label.setting[data-setting=description] > textarea')

  if (titleElem == null || captionElem == null || descriptionElem == null) {
    alert(`Please open the attachment / media detail page in blog.  Or maybe Wordpress has updated their page so this extension has already been outdated.\nYou can copy the generated caption manually:\ntitle: ${req.title}\ncaption: ${req.caption}`)
    return
  }

  descriptionElem.value = captionElem.value
  captionElem.value = req.caption
  titleElem.value = req.title
})
