**Generate video** in the **browser**, exportable to **MP4**

# Get started

## Installation

**NPM** package

```bash
npm install vidyn
```

**CDN**

```html
<script src="https://cdn.smooth.video/video-rendering.j"></script>
```

## Demo

```html
<div id="render"></div>
<script type="module">
    import Vidyn from "vidyn"

    const video = new Vidyn()
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

![](./docs/helloworld.gif)

## Download or Export Video

```js
const video = new Vidyn()

// download MP4
video.exportMP4("video.mp4") /

// or

// export video blob
video.export().then(blob => { ... })
```

# JSON video format

```json
{
    "settings": {
        "width": 400, // px
        "height": 400, // px
        "color": "#ffffff"
    },
    "elements": []
}
```

## Element

```json
{
    "type": "text", // image, video, audio, rectangle, ellipse, group
    "start": 1000, // ms
    "duration": 1000, // ms
    "data": {
        // all attributes are optionnals
        "text": "Hello",
        "font": "FontName or URL",
        "fontSize": 10,
        "src": "URL",
        "volume": 1,
        "trim": 0,
        "loop": false,
        "x": 0,
        "y": 0,
        "width": 0,
        "height": 0,
        "radius": 0,
        "scale": 1,
        "scaleX": 1,
        "scaleY": 1,
        "alpha": 1,
        "angle": 0,
        "fillStyle": "#000000",
        "strokeStyle": "#000000",
        "lineWidth": 1,
        "blur": 1,
        "brightness": 1,
        "contrast": 1,
        "grayscale": 1,
        "hueRotate": 1,
        "saturate": 1,
        "sepia": 1,
        "shadowColor": 1,
        "shadowBlur": 1,
        "shadowOffsetX": 1,
        "shadowOffsetY": 1,
        "anchorX": 0,
        "anchorY": 0,
        "fit": "cover", // stretch, fit
        "elements": [] // Only for group
    },
    "animations": []
}
```

## Animation

```json
{
    "attribute": "alpha",
    "start": 0,
    "duration": 1000,
    "easing": "linear",
    "from": 0,
    "to": 1
}
```

## Contributing

Vidyn is an open-source project and we welcome contributions from the community.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## Licencing

[BUY LICENCE : 9.99$/year](https://vidyn.lemonsqueezy.com/buy/69f21a7e-09fa-46bf-9adb-6b7726e8736d)
