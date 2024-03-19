import elementList from "./elements.js"
import getAnimationsData from "./getAnimationsData.js"

import { ArrayBufferTarget, Muxer } from "mp4-muxer"

const loadedFonts = []

const getColor = (ctx, color, width, height) => {
    if (typeof color == "string") return color

    const { angle, colors } = color
    const gradient = ctx.createLinearGradient(0, 0, width || 0, height || 0)

    colors.forEach((color, colorIndex) => {
        if (typeof color == "string") {
            gradient.addColorStop(colorIndex / colors.length, color)
        } else {
            gradient.addColorStop(color.x, color.color)
        }
    })

    return gradient
}

export default class {
    constructor(json) {
        this.canvas = null
        this.ctx = null

        this.data = null

        this.timestamp = 0
        this.playing = false
        this.loop = true

        this.events = []

        this.saves = {}

        this.audioContext = new AudioContext()
        this.audioStream = this.audioContext.createMediaStreamDestination()

        this.audios = []

        this.corsURL = url => url

        this.update()

        Object.assign(this, json)

        window.render = this
    }

    setCanvas(canvas) {
        this.canvas = canvas || document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d", { desynchronized: true })
    }

    export() {
        return new Promise(async (resolve, reject) => {
            this.playing = false
            try {
                const audioElements = this.getFlattenElements(this.data).filter(e => ["audio", "video"].includes(e.type))
                const hasAudio = audioElements.length > 0

                let muxer = new Muxer({
                    target: new ArrayBufferTarget(),
                    video: {
                        codec: "avc",
                        width: this.canvas.width,
                        height: this.canvas.height,
                    },
                    audio: hasAudio
                        ? {
                              codec: "opus",
                              numberOfChannels: 2,
                              sampleRate: 44100,
                          }
                        : null,
                    firstTimestampBehavior: "offset",
                    fastStart: "in-memory",
                })

                if (hasAudio) {
                    try {
                        let audioEncoder = new AudioEncoder({
                            output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
                            error: e => console.error(e),
                        })

                        audioEncoder.configure({
                            codec: "opus",
                            sampleRate: 44100,
                            numberOfChannels: 2,
                            bitrate: 128000,
                        })

                        const audioBuffers = []

                        const audioContext = new AudioContext()

                        for (let element of audioElements) {
                            try {
                                const response = await fetch(element.data.src)
                                const audioBuffer = await response.arrayBuffer()

                                const audioContext = new AudioContext()
                                const audioData = await audioContext.decodeAudioData(audioBuffer)

                                const delayInSeconds = (element.start || 0) / 1000
                                const durationInSeconds = (element.duration || 0) / 1000
                                const trimStartInSeconds = (element.data.trim || 0) / 1000

                                const delayFrames = Math.round(delayInSeconds * audioData.sampleRate)
                                const durationFrames = Math.round(durationInSeconds * audioData.sampleRate)
                                const trimStartFrames = Math.round(trimStartInSeconds * audioData.sampleRate)

                                const trimFrames = Math.min(trimStartFrames, durationFrames)

                                const adjustedBuffer = audioContext.createBuffer(
                                    audioData.numberOfChannels,
                                    delayFrames + durationFrames - trimFrames,
                                    audioData.sampleRate
                                )

                                for (let channel = 0; channel < audioData.numberOfChannels; channel++) {
                                    const channelData = audioData.getChannelData(channel)
                                    const adjustedChannelData = adjustedBuffer.getChannelData(channel)

                                    adjustedChannelData.set(channelData.slice(trimFrames, trimFrames + durationFrames - trimFrames), delayFrames)
                                }

                                audioBuffers.push(adjustedBuffer)
                            } catch (error) {}
                        }

                        if (audioBuffers.length > 0) {
                            const sampleRate = audioBuffers[0].sampleRate
                            const numChannels = audioBuffers[0].numberOfChannels

                            const newNumberOfFrames = Math.round((this.duration / 1000) * sampleRate)
                            const mixedAudioBuffer = audioContext.createBuffer(numChannels, newNumberOfFrames, sampleRate)

                            for (let i = 0; i < newNumberOfFrames; i++) {
                                for (let channel = 0; channel < numChannels; channel++) {
                                    let mixedSample = 0

                                    for (let j = 0; j < audioBuffers.length; j++) {
                                        const buffer = audioBuffers[j]

                                        if (i < buffer.length) {
                                            mixedSample += buffer.getChannelData(channel)[i]
                                        }
                                    }

                                    mixedAudioBuffer.getChannelData(channel)[i] = mixedSample
                                }
                            }

                            const mixedPlanarData = new Float32Array(mixedAudioBuffer.length * numChannels)
                            for (let channel = 0; channel < numChannels; channel++) {
                                const channelData = mixedAudioBuffer.getChannelData(channel)
                                mixedPlanarData.set(channelData, channel * mixedAudioBuffer.length)
                            }

                            const mixedAudioData = new AudioData({
                                format: "f32-planar",
                                sampleRate: mixedAudioBuffer.sampleRate,
                                numberOfFrames: mixedAudioBuffer.length,
                                numberOfChannels: numChannels,
                                timestamp: 0,
                                data: mixedPlanarData,
                            })

                            audioEncoder.encode(mixedAudioData)
                            await audioEncoder.flush()
                        }
                    } catch (error) {}
                }

                let videoEncoder = new VideoEncoder({
                    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
                    error: e => console.error(e),
                })

                videoEncoder.configure({
                    avc: { format: "avc" },
                    codec: "avc1.640034",
                    width: this.canvas.width,
                    height: this.canvas.height,
                    bitrate: 5000000,
                })

                const frameDuration = (1000 / this.data.settings.fps) * 1 || 30

                this.rendering = true // Pour "bloquer le rendering des videos"

                for (let i = 0; i <= Math.floor(this.duration / frameDuration); i++) {
                    if (i % 10 == 0) await new Promise(resolve => setTimeout(resolve, 0))
                    this.emit("rendering", { progress: (i * frameDuration) / this.duration })
                    await this.setTimestamp(i * frameDuration)
                    const frame = new VideoFrame(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data.buffer, {
                        format: "RGBA",
                        codedWidth: this.canvas.width,
                        codedHeight: this.canvas.height,
                        timestamp: i * frameDuration * 1000,
                        duration: frameDuration,
                    })
                    videoEncoder.encode(frame)
                }

                this.rendering = false

                await videoEncoder.flush()
                muxer.finalize()

                let { buffer } = muxer.target
                resolve(new Blob([buffer], { type: "video/mp4" }))
            } catch (error) {
                reject(error)
            }
        })
    }

    exportPNG(type = "image/png", quality = "1") {
        return new Promise(resolve => this.canvas.toBlob(blob => resolve(blob), type, quality))
    }

    exportMP4(name = "video.mp4") {
        this.export().then(blob => {
            const a = document.createElement("a")
            a.href = URL.createObjectURL(blob)
            a.download = name
            a.click()
        })
    }

    stop() {
        this.stopMedia()

        this.playing = false
        this.stopped = true
    }

    get duration() {
        if (!this.data || !this.data.elements || this.data.elements.length == 0) return 0
        return Math.max(...this.data.elements.map(e => e.start + e.duration)) || 0
    }

    on(fn) {
        this.events.push(fn)
    }

    emit(name, data) {
        this.events.forEach(event => event(name, data))
    }

    async setTimestamp(timestamp) {
        this.timestamp = timestamp
        await this.render()
    }

    resetMedia() {
        this.getFlattenElements(this.data)
            .filter(element => ["video", "audio"].includes(element.type))
            .filter(element => element.start > this.timestamp || element.start + element.duration < this.timestamp)
            .forEach(element => {
                if (element.data.element) element.data.element.volume = 0
            })
    }

    stopMedia() {
        this.getFlattenElements(this.data)
            .filter(element => ["video", "audio"].includes(element.type))
            .forEach(element => element.data?.element?.pause())
    }

    set(d) {
        return new Promise(async (resolve, reject) => {
            if (!d) return reject()

            const data = d

            if (!data) return reject()

            try {
                await this.load(data)
                this.data = data
                this.render()
                resolve()
            } catch (error) {
                reject()
            }
        })
    }

    load(data) {
        return new Promise(resolve => Promise.allSettled(this.getFlattenElements(data).map(element => this.loadElement(element))).then(resolve))
    }

    getFlattenElements(data) {
        if (!data || !data.elements) return []
        let toWork = [...data.elements]
        let allElements = []

        while (toWork.length > 0) {
            const el = toWork[0]
            allElements.push(el)
            toWork.shift()

            if (el.data.elements)
                toWork = [
                    ...toWork,
                    ...el.data.elements.map(e => ({
                        ...e,
                        start: e.start + el.start,
                    })),
                ]
        }

        return allElements
    }

    loadElement(element) {
        return new Promise((resolve, reject) => {
            if (this.saves[element.data.src]) {
                element.data.element = this.saves[element.data.src]
                return resolve()
            }

            switch (element.type) {
                case "text":
                    this.loadFont(element.data.font).then(() => resolve())
                    break
                case "image":
                    this.loadImage(element.data.src)
                        .then(image => {
                            element.data.element = image
                            this.saves[element.data.src] = image
                        })
                        .finally(resolve)

                    break

                case "video":
                    if (element.data.element) return resolve()
                    this.loadVideo(element.data.src)
                        .then(video => {
                            element.data.element = video
                            this.saves[element.data.src] = video
                            const audioSource = this.audioContext.createMediaElementSource(video)
                            audioSource.connect(this.audioContext.destination)
                            this.audios.push(audioSource)
                        })
                        .finally(resolve)
                    break

                case "audio":
                    this.loadAudio(element.data.src)
                        .then(audio => {
                            element.data.element = audio
                            this.saves[element.data.src] = audio

                            const audioSource = this.audioContext.createMediaElementSource(audio)
                            audioSource.connect(this.audioContext.destination)
                            this.audios.push(audioSource)
                        })
                        .finally(resolve)

                    break
                default:
                    resolve()
            }
        })
    }

    loadFont(font) {
        return new Promise(resolve => {
            if (!font || typeof font != "string") return resolve()
            const fontName = font.replace(/[0-9.-:\/]*/gm, "")
            if (!loadedFonts.includes(fontName)) {
                new FontFace(fontName, `url(${font})`)
                    .load()
                    .then(loaded_face => {
                        document.fonts.add(loaded_face)
                        loadedFonts.push(fontName)
                    })
                    .finally(resolve)
            } else {
                return resolve()
            }
        })
    }

    loadImage(src, retry) {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.src = src
            image.crossOrigin = "anonymous"
            image.addEventListener("load", () => resolve(image))

            image.addEventListener("error", () => {
                if (!retry) {
                    this.loadImage(this.corsURL(src), true).then(resolve).catch(reject)
                } else {
                    reject()
                }
            })
        })
    }

    loadVideo(src, retry) {
        return new Promise((resolve, reject) => {
            const video = document.createElement("video")
            video.src = src
            video.crossOrigin = "anonymous"
            video.addEventListener("loadeddata", () => resolve(video))

            video.addEventListener("error", () => {
                if (!retry) {
                    this.loadVideo(this.corsURL(src), true).then(resolve).catch(reject)
                } else {
                    reject()
                }
            })
        })
    }

    loadAudio(src, retry) {
        return new Promise((resolve, reject) => {
            const audio = document.createElement("audio")
            audio.src = src
            audio.crossOrigin = "anonymous"
            audio.addEventListener("loadeddata", () => resolve(audio))

            if (!retry) audio.addEventListener("error", () => this.loadAudio(this.corsURL(src), true).then(data => resolve(data)))
        })
    }

    update() {
        if (this.stopped) return

        requestAnimationFrame(() => this.update())

        if (this.rendering) return

        if (this.audioContext.state == "suspended" && window.hasEventDone) this.audioContext.resume()

        const now = Date.now()

        if (!this.tick) this.tick = now

        if (this.playing) this.timestamp += now - this.tick

        if (this.timestamp > this.duration) {
            if (this.loop) {
                this.setTimestamp(0)
            } else {
                this.playing = false
                this.setTimestamp(this.duration)
            }
        }

        this.resetMedia()

        this.render()

        this.tick = now
    }

    resize() {
        this.canvas.height = Math.ceil(this.data.settings.height * 1)
        this.canvas.width = Math.ceil(this.data.settings.width * 1)
    }

    async render() {
        if (!this.canvas) return
        if (!this.ctx) return
        if (!this.data) return

        this.emit("render", { progress: this.timestamp / this.duration, timestamp: this.timestamp, duration: this.duration })

        this.resize()

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.save()

        this.ctx.fillStyle = getColor(this.ctx, this.data.settings.color, this.canvas.width, this.canvas.height) || "#ffffff"

        this.ctx.fillRect(0, 0, this.data.settings.width, this.data.settings.height)

        const elements = this.data.elements.filter(e => e.start <= this.timestamp && e.start + e.duration > this.timestamp)

        for (let element of elements) await this.renderElement(element)

        this.ctx.restore()
    }

    async renderElement(element) {
        if (!elementList[element.type]) return

        const data = this.getElementData(element)

        this.ctx.save()

        await elementList[element.type](
            {
                canvas: this.canvas,
                ctx: this.ctx,
                timestamp: this.timestamp,
                dTimestamp: this.timestamp - element.start,
                playing: this.playing,
                rendering: this.rendering,
            },
            data,
            element.animations
        )

        this.ctx.restore()
    }

    getElementData(element) {
        return getAnimationsData(
            this.timestamp,
            element.animations?.filter(a => !a.type),
            element.data,
            element
        )
    }
}
