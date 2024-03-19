import transforms from "./transforms.js"

export default function ({ canvas, ctx }, { points = [], closePath }) {
    transforms({ canvas, ctx }, arguments[1])

    ctx.beginPath()

    points.forEach((point, index) => {
        if (index == 0) {
            ctx.moveTo(point.x, point.y)
        } else {
            ctx.lineTo(point.x, point.y)
        }
    })

    if (closePath) ctx.closePath()

    ctx.stroke()
}
