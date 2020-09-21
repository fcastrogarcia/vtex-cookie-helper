chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const isMyVtex = tab.url.includes("myvtex.com");

  const { hostname } = new URL(tab.url);

  if (isMyVtex) {
    chrome.cookies.getAll({ name: "VtexIdclientAutCookie" }, cookies => {
      console.log(tab.url, cookies);
      chrome.cookies.set({
        url: "https://tamboqa.myvtex.com/",
        name: "VtexIdclientAutCookie",
        value: cookies[0].value,
      });
    });

    // chrome.tabs.getAllInWindow(tabs => {
    //   const myVTEXTab = tabs.find(tab => tab.url.includes("https://tamboqa.myvtex.com/"));

    //   // const { id } = myVTEXTab || {};
    //   // chrome.tabs.reload(id);
    // });
  }
});

// chrome.cookies.get(
//   {
//     url: "https://tambo.myvtex.com/",
//     name: "VtexIdclientAutCookie",
//   },
//   cookie => {
//     if (cookie) {
//       chrome.cookies.set({
//         url: "https://tamboqa.myvtex.com/",
//         name: "VtexIdclientAutCookie",
//         value: cookie.value,
//       });

//       chrome.tabs.getAllInWindow(tabs => {
//         const myVTEXTab = tabs.find(tab => tab.url.includes("https://tamboqa.myvtex.com/"));
//         const { id } = myVTEXTab || {};
//         chrome.tabs.reload(id);
//       });
//     }
//   }
// );
