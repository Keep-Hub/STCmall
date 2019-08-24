import '../style/loading.less'
const doc = window.document
const $body = doc.body || doc.head
const $loading = doc.createElement('div')
$loading.classList.add('loader')
$loading.innerHTML = `<div class="loader_main">
                          <div class="loading_logo">
                            <div class="loading_circle"></div>
                          </div>
                         <p class="loader_tips">加载中...</p>
                      </div>`

const Loading = {
  show () {
    try {
      $body.appendChild($loading)
    } catch (e) {
    }
  },
  hide () {
    try {
      if ($loading.parentNode === $body) {
        $body.removeChild($loading)
      }
    } catch (e) {
    }
  }
}

export default Loading
