export default ({ dTimestamp, playing }, { trim = 0, volume = 1, loop = true, element }) => {
    if (!element) return

    element.volume = volume

    const audioTime = dTimestamp / 1000 + trim / 1000

    if (Math.abs(element.currentTime - audioTime) > 0.5) element.currentTime = audioTime

    if (playing) {
        if (window.hasEventDone && element.paused) element.play()
    } else {
        if (!element.paused) element.pause()
    }
}
