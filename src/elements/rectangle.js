import transforms from "./transforms.js"

export default function ({ canvas, ctx }, { width = 1, height = 1, anchorX = 0, anchorY = 0, radius = 0 }) {
    transforms({ canvas, ctx }, arguments[1])

    ctx.beginPath()
    ctx.roundRect(-anchorX * width, -anchorY * height, width, height, radius)
    ctx.fill()
    ctx.stroke()
}
