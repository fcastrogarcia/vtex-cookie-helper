const authCookie = { name: 'VtexIdclientAutCookie' }

chrome.cookies.getAll({ ...authCookie }, cookies => {
  console.log('cookies', cookies)

  const { value: cookieValue, expirationDate } =
    cookies.find(({ domain }) => domain.includes('.myvtex')) || {}

  chrome.tabs.getAllInWindow(tabs => {
    console.log('all tabs: ', tabs)

    const whitelist = ['.vtexlocal', 'uploader.janisdev']

    const unauthenticatedTabs =
      tabs.filter(
        tab => tab && whitelist.some(domain => tab.includes(domain))
      ) || []

    console.log('unauthenticatedTabs', unauthenticatedTabs)

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
