const authCookie = { name: 'VtexIdclientAutCookie' }

// chrome.tabs.getAllInWindow(tabs => {
//   const vtexLocalTabs = tabs.filter(
//     tab => tab && tab.url.includes('vtexlocal.com.br')
//   );

//   console.log('vtexLocalTabs', vtexLocalTabs);

//   if (!vtexLocalTabs.length) return;

//   chrome.cookies.getAll(authCookie, cookies => {
//     if (!cookies.length) return;

//     const { value: cookieValue } =
//       cookies.find(({ domain }) => domain.includes('myvtex')) || {};

//     vtexLocalTabs.forEach(tab => {
//       console.log('iterated tab', tab);

//       chrome.cookies.set({
//         ...authCookie,
//         url: tab.url,
//         value: cookieValue,
//         httpOnly: true,
//         secure: true,
//       });
//       // chrome.tabs.reload(tab.id);
//     });
//   });
// });

chrome.cookies.getAll({ ...authCookie }, cookies => {
  console.log('cookies', cookies)
  const { value: cookieValue } =
    cookies.find(({ domain }) => domain.includes('geantun.myvtex')) || {}

  chrome.tabs.getAllInWindow(tabs => {
    console.log(tabs)

    const vtexLocalTabs =
      tabs.filter(tab => tab && tab.url.includes('.vtexlocal')) || []
    console.log('vtexLocalTabs', vtexLocalTabs)

    vtexLocalTabs.forEach(tab => {
      // const { origin } = new URL(tab.url);

      chrome.cookies.set({
        ...authCookie,
        url: tab.url,
        value: cookieValue,
        httpOnly: true,
        secure: true,
      })
    })
  })
})

// Unchecked runtime.lastError: No host permissions for cookies at url: "http://hiperlibertad.vtexlocal.com.br/Admin/Site/Login.aspx?ReturnUrl=%2f".
