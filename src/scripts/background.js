const authCookie = { name: 'VtexIdclientAutCookie' }

chrome.cookies.getAll({ ...authCookie }, cookies => {
  if (!cookies.length) return

  const { value: cookieValue, expirationDate } =
    cookies.find(({ domain }) => domain.includes('.myvtex')) || {}

  chrome.tabs.getAllInWindow(tabs => {
    const whitelist = ['.vtexlocal', 'uploader.janisdev']

    const unauthenticatedTabs =
      tabs.filter(
        tab => tab && whitelist.some(domain => tab.url.includes(domain))
      ) || []

    if (!unauthenticatedTabs.length) return

    unauthenticatedTabs.forEach(tab => {
      chrome.cookies.set({
        ...authCookie,
        url: tab.url,
        value: cookieValue,
        httpOnly: true,
        secure: true,
        path: '/',
        expirationDate,
      })
      chrome.tabs.reload(tab.id)
    })
  })
})
