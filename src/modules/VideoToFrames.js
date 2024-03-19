export default src => {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video")
        video.src = src
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        const fps = 10
        let started = false

        video.addEventListener("loadeddata", () => {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            function saveFrames() {
                const framesArray = []

                function captureFrame() {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                    const pixels = new Uint8Array(imageData.data)
                    framesArray.push(pixels)
                }

                video.addEventListener("seeked", () => {
                    captureFrame()

                    if (video.currentTime >= video.duration) {
                        resolve(framesArray)
                    } else {
                        video.currentTime += 1 / fps
                    }
                })

                video.currentTime = 0
            }

            if (!started) {
                started = true
                saveFrames()
            }
        })
    })
}
