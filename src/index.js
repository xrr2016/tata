import './index.css'
import tata from '../dist/tata'

document.addEventListener('readystatechange', () => {
  if (document.readyState === "complete") {
    const loading = document.querySelector('.loading')
    const btns = document.querySelector('.btns')
    
   if (loading.remove) {
     loading.remove()
   } else {
     document.body.removeChild(loading)
   }

    btns.addEventListener('click', (event) => {
      const target = event.target
      const type = target.dataset.type
    
      if (!type) return
    
      tata[type]('hello', 'wow!', {
        duration: 4000,
        animate: 'slide',
        position: 'tr'
      })
    })
  }
})
