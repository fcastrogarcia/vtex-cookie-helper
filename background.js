chrome.cookies.get(
  {
    url: "https://tambo.myvtex.com/",
    name: "VtexIdclientAutCookie",
  },
  (cookie) => {
    if (cookie)
      chrome.cookies.set({
        url: "https://tamboqa.myvtex.com/",
        name: "VtexIdclientAutCookie",
        value: cookie.value,
      });

    chrome.tabs.getAllInWindow((tabs) => {
      const myVTEXTab = tabs.find((tab) =>
        tab.url.includes("https://tamboqa.myvtex.com/")
      );
      const { id } = myVTEXTab || {};
      chrome.tabs.reload(id);
    });
  }
);
