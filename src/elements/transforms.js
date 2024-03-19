const degToRad = deg => deg * (Math.PI / 180)

const getColor = color => {
    return color
    // if (typeof color == "string") return color

    // if(!data) return color

    // if (data.radius) {
    //     data.width = data.radius
    //     data.height = data.radius
    // }

    // const { angle = 0, colors = [] } = color
    // const gradient = ctx.createLinearGradient(0, 0, data.width || 0, data.height || 0)

    // colors.forEach((color, colorIndex) => {
    //     if (typeof color == "string") {
    //         gradient.addColorStop(colorIndex / colors.length, color)
    //     } else {
    //         gradient.addColorStop(color.x, color.color)
    //     }
    // })

    // return gradient
}

export default ({ ctx }, data = {}) => {
    if (!data) return

    //POSITION
    if (data.x !== undefined) ctx.translate(data.x * 1, 0)
    if (data.y !== undefined) ctx.translate(0, data.y * 1)

    //SCALE
    if (data.scale !== undefined) ctx.scale(data.scale, data.scale)
    if (data.scaleX !== undefined) ctx.scale(data.scaleX, 1)
    if (data.scaleY !== undefined) ctx.scale(1, data.scaleY)

    //ANGLE
    if (data.angle !== undefined) ctx.rotate(degToRad(data.angle))

    //ALPHA
    if (data.alpha !== undefined) ctx.globalAlpha = data.alpha

    let filters = []
    if (Math.round(data.blur)) filters.push(`blur(${Math.round(data.blur)}px)`)
    if (data.brightness !== undefined) filters.push(`brightness(${data.brightness})`)
    if (data.contrast !== undefined) filters.push(`contrast(${data.contrast})`)
    if (data.grayscale !== undefined) filters.push(`grayscale(${data.grayscale})`)
    if (data.hueRotate !== undefined) filters.push(`hue-rotate(${data.hueRotate || 0}deg)`)
    if (data.saturate !== undefined) filters.push(`saturate(${data.saturate})`)
    if (data.sepia !== undefined) filters.push(`sepia(${data.sepia})`)
    if (filters.length > 0) ctx.filter = filters.join(" ")

    //LINE
    if (data.lineWidth !== undefined) ctx.lineWidth = data.lineWidth
    if (data.lineCap !== undefined) ctx.lineCap = data.lineCap
    if (data.lineDashOffset !== undefined) ctx.lineDashOffset = data.lineDashOffset
    if (data.lineJoin !== undefined) ctx.lineJoin = data.lineJoin
    if (data.lineDash !== undefined) ctx.setLineDash(data.lineDash)

    //SHADOW
    if (data.shadowBlur !== undefined) ctx.shadowBlur = data.shadowBlur
    if (data.shadowColor !== undefined) ctx.shadowColor = data.shadowColor
    if (data.shadowOffsetX !== undefined) ctx.shadowOffsetX = data.shadowOffsetX
    if (data.shadowOffsetY !== undefined) ctx.shadowOffsetY = data.shadowOffsetY

    //COLOR
    ctx.fillStyle = "rgba(0,0,0,0)"
    if (data.fillStyle) ctx.fillStyle = getColor(data.fillStyle)

    ctx.strokeStyle = "rgba(0,0,0,0)"
    if (data.strokeStyle) ctx.strokeStyle = getColor(data.strokeStyle)

    if (data.clip) {
        ctx.beginPath()
        switch (data.clip) {
            case "rectangle":
                ctx.roundRect(data.clipX ?? 0, data.clipY ?? 0, data.clipWidth ?? 0, data.clipHeight ?? 0, data.clipRadius ?? 0)
                break
            case "circle":
                ctx.moveTo(0, 0)
                ctx.arc(data.clipX ?? 0, data.clipY ?? 0, data.clipRadius ?? 0, 0, data.clipEnd ?? Math.PI * 2)
                break
        }

        ctx.clip()
    }
}
