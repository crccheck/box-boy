const d3 = require('d3')
window.d3 = d3  // DEBUG

const MAX_ELEMENTS = 50
const root = d3.select('#sandbox')

const choices = [
  [400, 300],  // 4:3
  [300, 400],  // 4:3
  [460, 260],  // 16:9
  [260, 460],  // 16:9
]

let colorGlobal = 0

function add() {
  // Trim extra elements
  const existing = root.selectAll('div')
  const count = existing.data().length  // TODO what's the real way to do this?
  if (count > MAX_ELEMENTS) {
    existing.filter((d, i) => i < count - MAX_ELEMENTS).remove()
  }

  const vw = window.innerWidth
  const vh = window.innerHeight

  root.append('div')
    .datum(choices[0 | Math.random() * choices.length])
    .style('background', d3.cubehelix(colorGlobal += 10, 0.9, 0.7, 0.3))
    .style('outline', `1px solid ${d3.cubehelix(colorGlobal, 0.9, 0.7, 0.7)}`)
    .style('width', ([w, h]) => `${w}px`)
    .style('height', ([w, h]) => `${h}px`)
    .style('left', ([w, h]) => `${0 | Math.random() * (vw - w)}px`)
    .style('top', ([w, h]) => `${0 | Math.random() * (vh - h)}px`)

  colorGlobal = colorGlobal % 360
}

add()
setInterval(add, 50)
