chrome.runtime.onMessage.addListener((req, sender, response) => {
  if (req == null || req.type !== 'fill_blog') {
    return
  }

  const titleElem       = document.querySelector('label.setting[data-setting=title] > input')
  const captionElem     = document.querySelector('label.setting[data-setting=caption] > textarea')
  const descriptionElem = document.querySelector('label.setting[data-setting=description] > textarea')
  const contentElem     = document.getElementById('content')

  if (titleElem != null && captionElem != null && descriptionElem != null) {
    descriptionElem.value = captionElem.value
    captionElem.value     = req.caption
    titleElem.value       = req.title
    const changeEvent     = new Event('change', { bubbles: true })
    captionElem.dispatchEvent(changeEvent)
    return
  }

  if (contentElem != null) {
    let content     = contentElem.value
    const idMatch   = content.match(/id="attachment_(\d+)"/)
    const linkMatch = content.match(/<a href="https?:\/\/www\.whitetrefoil\.com\/blog\/.*?">/)
    if (idMatch == null || linkMatch == null) {
      alert('Failed to recognize the content of post.')
      return
    }

    const id = idMatch[1]
    if (linkMatch[0].indexOf(`title="[exif id=${id}]"`) < 0) {
      content = content.replace(linkMatch[0], `${linkMatch[0].slice(0, -1)} title="[exif id=${id}]">`)
    }

    if (content.indexOf(`<sub>[exif id="${id}"]</sub>`) < 0) {
      content += `\n\n<sub>[exif id="${id}"]</sub>`
    }

    contentElem.value = content

    const changeEvent = new Event('change', { bubbles: true })
    contentElem.dispatchEvent(changeEvent)
    return
  }

  alert('Please open the attachment / media detail page in blog to update the caption, or open the post edit page to edit the post.  If you\'ve already done that, maybe Wordpress has updated their page so this extension has already been outdated.')
})
