import { h, render } from 'vue'
import XtxConfirm from './confirm.vue'
type Props = {
  text: string
  title?: string
}

const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)
export default function Confirm({ text, title }: Props) {
  return new Promise((resolve, reject) => {
    const cancelCallback = function () {
      render(null, div)
      reject()
    }
    const confirmCallback = function () {
      render(null, div)
      resolve(null)
    }
    const vNode = h(XtxConfirm, {
      text,
      title,
      cancelCallback,
      confirmCallback,
    })
    render(vNode, div)
  })
}
