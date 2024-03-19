import transforms from "./transforms.js"

import getAnimationsData from "../getAnimationsData.js"

export default function (
    { canvas, ctx, dTimestamp },
    { text = "", font, fontSize = 10, width = null, anchorX = 0.5, anchorY = 0.5, lineHeight = 1.2, letterSpacing = 0, lineFill },
    animations = []
) {
    transforms({ canvas, ctx }, { ...arguments[1] })

    text = text + ""

    ctx.font = `${fontSize}px ${font && typeof font == "string" ? font.replace(/[0-9.-:\/]*/gm, "") + ", " : ""}serif`
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    ctx.letterSpacing = `${letterSpacing}px`

    let lines = []
    text.split("\n").forEach(t => (lines = [...lines, ...getLines(ctx, t, width)]))

    let nb = { line: 0, word: 0, letter: 0 }

    const fontMeasure = ctx.measureText("A")

    const fontHeight = fontMeasure.actualBoundingBoxDescent

    let positionY = -(fontHeight * lineHeight * lines.length) * anchorY
    lines.forEach(line => {
        const lineMeasure = ctx.measureText(line)

        let positionX = -lineMeasure.width * anchorX

        ctx.save()

        if (lineFill) {
            const padding = 0.3
            ctx.fillStyle = lineFill
            ctx.globalAlpha = 1
            ctx.beginPath()
            const realPadding = fontHeight * padding
            ctx.roundRect(positionX - realPadding, positionY - realPadding, lineMeasure.width + realPadding * 2, fontHeight + realPadding * 2, [10])
            ctx.fill()
        }

        ctx.restore()

        Array.from(line).forEach(letter => {
            const letterMeasure = ctx.measureText(letter)

            ctx.save()

            ctx.translate(positionX, positionY)

            for (let type in nb) {
                const animationstype = animations.filter(a => a.type == type)

                let index = nb[type]

                let data = {}

                for (let animation of animationstype) {
                    let delayArray = Array.isArray(animation.delay) ? animation.delay : [animation.delay]

                    let delay = 0
                    for (let i = 0; i < index; i++) {
                        delay += delayArray[i % delayArray.length]
                    }
                    data = getAnimationsData(dTimestamp - delay, [animation], data, { start: 0, duration: 1000 })
                }

                transforms({ ctx }, { fillStyle: arguments[1].fillStyle, strokeStyle: arguments[1].strokeStyle, ...data })
            }

            ctx.strokeText(letter, 0, 0)
            ctx.fillText(letter, 0, 0)

            positionX += letterMeasure.width + letterSpacing

            ctx.restore()

            if (letter == " ") nb.word++
            nb.letter++
        })

        nb.word++
        nb.letter++

        positionY += fontHeight * lineHeight

        nb.line++
    })
}

const getLines = (ctx, text, maxWidth) => {
    var words = text.split(" ")
    var lines = []
    var currentLine = words[0]

    for (var i = 1; i < words.length; i++) {
        var word = words[i]
        var width = ctx.measureText(currentLine + " " + word).width
        if (maxWidth == null || width < maxWidth) {
            currentLine += " " + word
        } else {
            lines.push(currentLine)
            currentLine = word
        }
    }
    lines.push(currentLine)
    return lines
}
