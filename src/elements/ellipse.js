import transforms from "./transforms.js"

export default function (
    { canvas, ctx },
    { width = 1, height = 1, anchorX = 0.5, anchorY = 0.5, startAngle = 0, endAngle = Math.PI * 2, counterclockwise = false }
) {
    transforms({ canvas, ctx }, arguments[1])

    const radiusX = width / 2
    const radiusY = height / 2

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.ellipse((-anchorX + 0.5) * radiusX * 2, (-anchorY + 0.5) * radiusY * 2, radiusX, radiusY, 0, startAngle, endAngle, counterclockwise)
    ctx.fill()
    ctx.stroke()
}
