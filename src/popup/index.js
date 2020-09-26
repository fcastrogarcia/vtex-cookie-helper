import './styles.scss'
;(() => {
  const { chrome } = window || {}
  const btn = document.querySelector('#cookie-parser-btn')

  const sendMessage = () =>
    chrome.runtime.sendMessage({ parseCookies: true }, response => {
      console.log('response from background: ', response)
    })

  const handleBackgroundPage = () => {
    chrome.runtime.getBackgroundPage(backgroundPage => {
      // eslint-disable-next-line no-global-assign
      console = backgroundPage.console
      sendMessage()
    })
  }

  btn.addEventListener('click', handleBackgroundPage)
})()
