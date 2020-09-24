import './styles.scss'

const btn = document.querySelector('#cookie-parser-btn')

function handleBackgroundPage() {
  chrome.runtime.getBackgroundPage(backgroundPage => {
    console = backgroundPage.console

    chrome.runtime.sendMessage({ parseCookies: true }, response => {
      console.log('repsonse from background: ', response)
    })
  })
}

btn.addEventListener('click', handleBackgroundPage)
