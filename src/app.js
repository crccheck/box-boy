const d3 = require('d3')
window.d3 = d3  // DEBUG

const MAX_ELEMENTS = 20
const VORONOI_LIMIT = 6
const COLOR_ANGLE = 360 / MAX_ELEMENTS

const choices = [
  [400, 300],  // 4:3
  [300, 400],  // 4:3
  [460, 260],  // 16:9
  [260, 460],  // 16:9
]
// const choices = [
//   [10, 10],
// ]

let colorGlobal = 0

function add(root) {
  // Trim extra elements
  const existing = root.selectAll('rect')
  const count = existing.size()
  if (count > MAX_ELEMENTS) {
    existing.filter((d, i) => i < count - MAX_ELEMENTS).remove()
  }

  const vw = window.innerWidth
  const vh = window.innerHeight

  root.append('rect')
    .datum(choices[0 | Math.random() * choices.length])
    .attr('fill', d3.cubehelix(colorGlobal += COLOR_ANGLE, 0.9, 0.7))
    .attr('stroke', d3.cubehelix(colorGlobal, 0.9, 0.7))
    .attr('width', ([w, h]) => w)
    .attr('height', ([w, h]) => h)
    .attr('transform', ([w, h]) => `translate(${0 | Math.random() * (vw - w)} ${0 | Math.random() * (vh - h)})`)

  colorGlobal = colorGlobal % 360
  const targetRects = root.selectAll('rect').filter(`:nth-last-child(-n + ${VORONOI_LIMIT})`)
  const targetBBoxes = []
  targetRects.each(function(d, i) {
    targetBBoxes.push(this.getBoundingClientRect())
  })
  const targetData = targetBBoxes.map((x) => [(x.left + x.right)/2, (x.top + x.bottom) / 2])
  const voronoi = d3.voronoi().extent([[-1, -1], [vw + 1, vh + 1]])

  const polygons = vRoot.selectAll('path')
    .data(voronoi.polygons(targetData))
  polygons
    .enter()
      .append('path')
  polygons
    .attr('d', (d) => d ? `M${d.join('L')}Z` : null);
  polygons.exit().remove()

  const triangles = tRoot.selectAll('path')
    .data(voronoi.triangles(targetData))
  triangles
    .enter()
      .append('path')
  triangles
    .attr('d', (d) => d ? `M${d.join('L')}Z` : null);
  triangles.exit().remove()
}


const root = d3.select('#sandbox')
  .append('g')
  .attr('class', 'rectangles')

const vRoot = d3.select('#sandbox')
  .append('g')
  .attr('class', 'voronoi')

const tRoot = d3.select('#sandbox')
  .append('g')
  .attr('class', 'triangles')

add(root)

let masterTimer = setInterval(() => add(root), 2000)
document.onkeyup = (e) => {
  if (masterTimer && e.keyCode === 27) {
    clearTimeout(masterTimer)
    masterTimer = false
  }
}
