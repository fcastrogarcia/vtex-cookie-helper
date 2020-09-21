const authCookie = { name: 'VtexIdclientAutCookie' };

chrome.cookies.getAll(authCookie, cookies => {
  console.log(cookies);

  if (!cookies) return;

  const { value: cookieValue } =
    cookies.find(({ domain }) => domain.includes('myvtex')) || {};

  chrome.tabs.getAllInWindow(tabs => {
    const vtexLocalTabs = tabs.filter(
      tab => tab && tab.url.includes('vtexlocal.com.br')
    );

    console.log('vtexLocalTabs', vtexLocalTabs);

    vtexLocalTabs.forEach(tab => {
      console.log('iterated tab', tab);

      chrome.cookies.set({
        ...authCookie,
        url: tab.url,
        value: cookieValue,
      });
      chrome.tabs.reload(tab.id);
    });
  });
});
