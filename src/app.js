const d3 = require('d3')

const MAX_ELEMENTS = 20
const root = d3.select('#sandbox')

const choices = [
  [400, 300],  // 4:3
  [300, 400],  // 4:3
  [460, 260],  // 16:9
  [260, 460],  // 16:9
]

function add() {
  // Trim extra elements
  const existing = root.selectAll('div')
  const count = existing.data().length  // TODO what's the real way to do this?
  console.log(count)
  if (count > MAX_ELEMENTS) {
    console.log('delteme', existing.filter((d, i) => i < count - MAX_ELEMENTS).remove())
  }

  const vw = window.innerWidth
  const vh = window.innerHeight

  root.append('div')
    .datum(choices[0 | Math.random() * choices.length])
    .style('background', 'rgba(0, 0, 255, 0.2)')
    .style('width', ([w, h]) => `${w}px`)
    .style('height', ([w, h]) => `${h}px`)
    .style('left', ([w, h]) => `${0 | Math.random() * (vw - w)}px`)
    .style('top', ([w, h]) => `${0 | Math.random() * (vh - h)}px`)
}

add()
setInterval(add, 1000)
