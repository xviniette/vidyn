import transforms from "./transforms.js"

export default function ({ canvas, ctx }, { width, height, fit = "cover", anchorX = 0, anchorY = 0, radius = 0, element }) {
    if (!element?.src) return

    transforms({ canvas, ctx }, arguments[1])

    const aspectRatio = width / height
    const imageAspectRatio = element.width / element.height

    const data = { sX: 0, sY: 0, sWidth: element.width, sHeight: element.height, tWidth: width, tHeight: height }

    switch (fit) {
        case "stretch":
            element.tWidth = width
            element.tHeight = height
            break
        case "fit":
            if (element.height / height > element.width / width) {
                data.tHeight = height
                data.tWidth = data.tHeight * imageAspectRatio
            } else {
                data.tWidth = width
                data.tHeight = data.tWidth / imageAspectRatio
            }

            element.tWidth = width
            element.tHeight = height
            break
        case "cover":
        default:
            if (aspectRatio > imageAspectRatio) {
                data.sWidth = element.width
                data.sHeight = element.width / aspectRatio
                data.sY = (element.height - data.sHeight) / 2
            } else {
                data.sHeight = element.height
                data.sWidth = element.height * aspectRatio
                data.sX = (element.width - data.sWidth) / 2
            }
    }

    ctx.beginPath()
    ctx.roundRect(-width * anchorX, -height * anchorY, data.tWidth, data.tHeight, radius)
    ctx.stroke()
    ctx.fill()
    ctx.clip()

    ctx.drawImage(element, data.sX, data.sY, data.sWidth, data.sHeight, -width * anchorX, -height * anchorY, data.tWidth, data.tHeight)
}
