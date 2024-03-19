import transforms from "./transforms.js"

export default function ({ canvas, ctx }, { dx = 0, dy = 0 }) {
    transforms({ canvas, ctx }, arguments[1])

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(dx - arguments[1].x, dy - arguments[1].y)
    ctx.stroke()
}
