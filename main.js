import Render from "./src/Render"

const render = new Render({
    corsURL: url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
})

document.querySelector("#download").addEventListener("click", () => {
    render.exportMP4()
})

render.setCanvas(document.querySelector("#canvas"))

render.playing = true

render.set({
    settings: {
        width: 640,
        height: 360,
        color: "#ffffff",
    },
    elements: [
        {
            type: "image",
            start: 0,
            duration: 5000,
            data: {
                scale: 1,
                alpha: 1,
                angle: 0,
                x: 192,
                y: 180,
                width: 160,
                height: 160,
                anchorX: 0.5,
                anchorY: 0.5,
                src: "https://avatars.githubusercontent.com/u/4215051?v=4",
                radius: 180,
                element: {},
            },
            animations: [
                {
                    attribute: "alpha",
                    from: 0,
                    to: 1,
                    duration: 1000,
                    start: 0,
                    easing: "slowdown",
                },
                {
                    attribute: "scale",
                    from: 0.6,
                    to: 1,
                    duration: 1000,
                    start: 0,
                    easing: "slowdown",
                },
            ],
        },
        {
            type: "text",
            start: 0,
            duration: 5000,
            data: {
                text: "Hi xviniette!",
                x: 320,
                y: 180,
                width: 320,
                fontSize: 30,
                fillStyle: "#000000",
                font: "https://fonts.gstatic.com/s/inter/v7/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
                anchorX: 0,
                anchorY: 1,
                alpha: 0,
            },
            animations: [
                {
                    attribute: "alpha",
                    from: 0,
                    to: 1,
                    start: 500,
                    duration: 1000,
                },
                {
                    attribute: "y",
                    from: "-=30",
                    to: "+=0",
                    start: 500,
                    duration: 3000,
                    easing: "elastic",
                },
            ],
        },
        {
            type: "text",
            start: 0,
            duration: 5000,
            data: {
                text: "You have 257 followers.",
                x: 320,
                y: 187.20000000000002,
                width: 320,
                fontSize: 20,
                fillStyle: "#000000",
                font: "https://fonts.gstatic.com/s/inter/v7/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
                anchorX: 0,
                anchorY: 0,
                alpha: 0,
            },
            animations: [
                {
                    attribute: "alpha",
                    from: 0,
                    to: 1,
                    start: 1000,
                    duration: 1000,
                },
                {
                    attribute: "y",
                    from: "+=20",
                    to: "+=0",
                    start: 1000,
                    duration: 1000,
                    easing: "slowdown",
                },
            ],
        },
    ],
})

window.render = render
