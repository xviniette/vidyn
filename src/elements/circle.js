import transforms from "./transforms.js"

export default function ({ canvas, ctx }, { width = 1, anchorX = 0, anchorY = 0, startAngle = 0, endAngle = Math.PI * 2, counterclockwise = false }) {
    transforms({ canvas, ctx }, arguments[1])

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(-anchorX * width, -anchorY * width, width, startAngle, endAngle, counterclockwise)
    ctx.fill()
    ctx.stroke()
}
