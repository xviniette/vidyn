export default class {
    constructor() {
        this.mediaRecorder = null
        this.recording = false
    }

    record(render, options = {}) {
        return new Promise(resolve => {
            this.recording = true

            options = { fps: 30, ...options }

            const canvasStream = render.canvas.captureStream(options.fps)

            render.audios.forEach(audio => audio.connect(render.audioStream))

            const mimeType = "video/webm; codecs=vp9,opus"

            const combinedStream = new MediaStream([
                ...canvasStream.getTracks(),
                ...(render.audios.length > 0 ? render.audioStream.stream.getTracks() : []),
            ])

            this.mediaRecorder = new MediaRecorder(combinedStream, {
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 8000000,
            })

            const chunks = []
            this.mediaRecorder.ondataavailable = e => chunks.push(e.data)
            this.mediaRecorder.onstop = e => {
                render.audios.forEach(audio => audio.connect(render.audioContext.destination))

                const blob = new Blob(chunks, { type: mimeType })

                resolve(blob)
            }

            this.mediaRecorder.start(1000 / options.fps)
        })
    }

    stop() {
        this.mediaRecorder.stop()
        this.recording = false
    }
}
