import './index.css'
import tata from '../dist/tata'

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') {
    const loading = document.querySelector('.loading')
    const btns = document.querySelector('.btns')
    const inputs = document.querySelectorAll('input')

    if (loading.remove) {
      loading.remove()
    } else {
      document.body.removeChild(loading)
    }

    btns.addEventListener('click', event => {
      const target = event.target
      const type = target.dataset.type
      if (!type) return

      const opts = document.forms[0]
      console.dir(opts.text)
      const title = document.getElementById('title').value
      const text = document.getElementById('text').value

      const pos = document.querySelectorAll('input[name=position]')


      // tata[type](title = 'Hello', text = 'Nice to meet you.', {
      //   duration: document.getElementById('duration').value,
      //   position: 
      // })
    })
  }
})
