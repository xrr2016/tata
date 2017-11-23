import './index.css'
import tata from '../dist/tata'

const footer = document.querySelector('footer')

footer.addEventListener('click', (event) => {
  const target = event.target
  const type = target.dataset.type

  if (!type) return

  tata[type]()
})