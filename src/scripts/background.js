;(() => {
  const { chrome } = window || {}

  const whitelist = ['.vtexlocal', 'uploader.janisdev']

  const authCookie = { name: 'VtexIdclientAutCookie' }

  const cookieTemplate = {
    httpOnly: true,
    secure: true,
    path: '/',
    ...authCookie,
  }

  const getUnauthenticatedTabs = tabs =>
    tabs.filter(
      tab => tab && whitelist.some(domain => tab.url.includes(domain))
    ) || []

  const cookiesCallback = sendResponse => cookies => {
    try {
      if (!cookies.length)
        throw new Error('No authentication cookies were found')

      const { value, expirationDate } =
        cookies.find(({ domain }) => domain.includes('.myvtex')) || {}

      if (!value) return

      chrome.tabs.getAllInWindow(tabs => {
        const unauthenticatedTabs = getUnauthenticatedTabs(tabs)

        if (!unauthenticatedTabs.length)
          throw new Error('No vtexlocal tabs were found')

        unauthenticatedTabs.forEach(tab => {
          chrome.cookies.get({ ...authCookie, url: tab.url }, cookie => {
            if (!cookie) {
              chrome.cookies.set({
                ...cookieTemplate,
                url: tab.url,
                value,
                expirationDate,
              })
              chrome.tabs.reload(tab.id)
            }
          })
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
})()
