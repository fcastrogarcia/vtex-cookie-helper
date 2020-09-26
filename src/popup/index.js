import './styles.scss'
;(() => {
  const btn = document.querySelector('#cookie-parser-btn')

  const sendMessage = () =>
    chrome.runtime.sendMessage({ parseCookies: true }, response => {
      console.log('response from background: ', response)
    })

  const handleBackgroundPage = () => {
    chrome.runtime.getBackgroundPage(backgroundPage => {
      console = backgroundPage.console
      sendMessage()
    })
  }

  btn.addEventListener('click', handleBackgroundPage)
})()
