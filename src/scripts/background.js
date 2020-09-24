const authCookie = { name: 'VtexIdclientAutCookie' }

const cookiesCallback = sendResponse => cookies => {
  try {
    if (!cookies.length) throw new Error('No authentication cookies were found')

    const { value, expirationDate } =
      cookies.find(({ domain }) => domain.includes('.myvtex')) || {}

    if (!value) return

    chrome.tabs.getAllInWindow(tabs => {
      const whitelist = ['.vtexlocal', 'uploader.janisdev']

      const unauthenticatedTabs =
        tabs.filter(
          tab => tab && whitelist.some(domain => tab.url.includes(domain))
        ) || []

      if (!unauthenticatedTabs.length)
        throw new Error('No vtexlocal tabs were found')

      unauthenticatedTabs.forEach(tab => {
        chrome.cookies.set({
          ...authCookie,
          url: tab.url,
          value,
          httpOnly: true,
          secure: true,
          path: '/',
          expirationDate,
        })
        chrome.tabs.reload(tab.id)
      })
    })
  } catch (error) {
    sendResponse({ error, message: 'Unable to set cookie' })
  }
}

const parseCookies = sendResponse =>
  chrome.cookies.getAll({ ...authCookie }, cookiesCallback(sendResponse))

const handleMessage = (message, sender, sendResponse) => {
  if (message && message.parseCookies) parseCookies(sendResponse)
  return true
}

chrome.runtime.onMessage.addListener(handleMessage)
