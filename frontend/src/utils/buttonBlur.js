export default function blur(e) {
  let target = e.target
  if (target.nodeName === 'SPAN') {
    target = e.target.parentNode
  }
  target.blur()
}
