# Vidyn

Dynamic video rendering in the browser

# Get started

## Installation

CDN

```html
<script src="https://cdn.smooth.video/video-rendering.j"></script>
```

# Demo

```html
<div id="render"></div>
<script type="module">
    import VideoRendering from "https://cdn.smooth.video/video-rendering.js"

    const video = new VideoRendering()
    video.setElement(document.querySelector("#render"))
    video.playing = true

    video.set({
        settings: {
            width: 400,
            height: 400,
            color: "#ffffff",
        },
        elements: [
            {
                type: "text",
                start: 0,
                duration: 2000,
                data: {
                    text: "Hello world",
                    x: 200,
                    y: 200,
                    fontSize: 30,
                    fillStyle: "#000000",
                },
                animations: [
                    {
                        attribute: "alpha",
                        from: 0,
                        to: 1,
                        start: 0,
                        duration: 1000,
                    },
                ],
            },
        ],
    })
</script>
```

![](./public/helloworld.gif)

# Format

```js
const format = {
    settings: {
        width: 400,
        height: 400,
        color: "#ffffff",
    },
    elements: [], // all
}
```

# Element

```js
const element = {
    start: 1000, // ms
    duration: 1000, // ms
    data: {
        width: 400,
        height: 400,
        color: "#ffffff",
    },
}
```

# Animations

```js
const animations = [
    {
        attribute: "alpha",
        start: 0,
        duration: 1000,
        easing: "linear",
        from: 0,
        to: 1,
    },
]
```

## Download or Export Video

```js
const render = new VideoRendering()

// download MP4
render.exportMP4("video.mp4") /

// or

// export video blob
render.export().then(blob => { ... })
```

## Contributing

Papermark is an open-source project and we welcome contributions from the community.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.
