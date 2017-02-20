const d3 = require('d3')
window.d3 = d3  // DEBUG

const MAX_ELEMENTS = 50

const choices = [
  [400, 300],  // 4:3
  [300, 400],  // 4:3
  [460, 260],  // 16:9
  [260, 460],  // 16:9
]

let colorGlobal = 0

function add(root) {
  // Trim extra elements
  const existing = root.selectAll('rect')
  const count = existing.data().length  // TODO what's the real way to do this?
  if (count > MAX_ELEMENTS) {
    existing.filter((d, i) => i < count - MAX_ELEMENTS).remove()
  }

  const vw = window.innerWidth
  const vh = window.innerHeight

  root.append('rect')
    .datum(choices[0 | Math.random() * choices.length])
    .attr('fill', d3.cubehelix(colorGlobal += 10, 0.9, 0.7))
    .attr('fill-opacity', 0.2)
    .attr('stroke', d3.cubehelix(colorGlobal, 0.9, 0.7))
    .attr('stroke-opacity', 0.7)
    .attr('width', ([w, h]) => w)
    .attr('height', ([w, h]) => h)
    .attr('transform', ([w, h]) => `translate(${0 | Math.random() * (vw - w)} ${0 | Math.random() * (vh - h)})`)

  colorGlobal = colorGlobal % 360
}


const root = d3.select('#sandbox')
  .append('g')
  .attr('class', 'rectangles')
add(root)
setInterval(() => add(root), 50)
