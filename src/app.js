const d3 = require('d3')

const root = d3.select('#sandbox')

function add() {
  root.append('div')
    .datum([500, 500])
    .style('background', 'rgba(0, 0, 255, 0.2)')
    .style('width', ([w, h]) => `${w}px`)
    .style('height', ([w, h]) => `${h}px`)
}

add()
setInterval(add, 2000)
