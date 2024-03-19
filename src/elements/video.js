import transforms from "./transforms.js"

const setVideoTime = (video, timestamp) => {
    return new Promise(resolve => {
        // console.time("seek")
        video.addEventListener(
            "seeked",
            () => {
                console.log("timestamp", timestamp)
                // console.timeEnd("seek")
                resolve()
            }
            // { once: true }
        )
        video.currentTime = timestamp
    })
}

const waitForSeeking = video => {
    return new Promise(resolve => {
        const isDone = () => {
            if (video.seeking === false) resolve()
            setTimeout(isDone, 0)
        }

        isDone()
    })
}

export default async function (
    { canvas, ctx, dTimestamp, playing, rendering = false },
    { width, height, anchorX = 0.5, anchorY = 0.5, trim = 0, volume = 1, fit = "cover", radius = 0, element }
) {
    if (!element) return

    transforms({ canvas, ctx }, arguments[1])

    const aspectRatio = width / height
    const elementWidth = element.videoWidth
    const elementHeight = element.videoHeight

    const imageAspectRatio = elementWidth / elementHeight

    const data = { sX: 0, sY: 0, sWidth: elementWidth, sHeight: elementHeight, tWidth: width, tHeight: height }

    switch (fit) {
        case "stretch":
            element.tWidth = width
            element.tHeight = height
            break
        case "fit":
            if (elementHeight / height > elementWidth / width) {
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
                data.sWidth = elementWidth
                data.sHeight = elementWidth / aspectRatio
                data.sY = (elementHeight - data.sHeight) / 2
            } else {
                data.sHeight = elementHeight
                data.sWidth = elementHeight * aspectRatio
                data.sX = (elementWidth - data.sWidth) / 2
            }
    }

    element.volume = volume

    const videoTime = (dTimestamp / 1000 + trim / 1000).toFixed(2) * 1

    if (rendering) {
        element.currentTime = videoTime
        await waitForSeeking(element)
    } else {
        if (Math.abs(element.currentTime - videoTime) > 1) element.currentTime = videoTime

        if (playing) {
            if (window.hasEventDone && element.paused) element.play()
        } else {
            if (!element.paused) element.pause()
        }
    }

    ctx.beginPath()
    ctx.roundRect(-width * anchorX, -height * anchorY, data.tWidth, data.tHeight, radius)
    ctx.stroke()
    ctx.fill()
    ctx.clip()

    ctx.drawImage(element, data.sX, data.sY, data.sWidth, data.sHeight, -width * anchorX, -height * anchorY, data.tWidth, data.tHeight)
}
