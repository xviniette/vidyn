import { resolve } from "path"
import { defineConfig } from "vite"

import obfuscatorPlugin from "vite-plugin-javascript-obfuscator"

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/Render.js"),
            name: "VideoRendering",
            fileName: "video-rendering",
        },
    },
    plugins: [
        obfuscatorPlugin({
            options: {},
        }),
    ],
})
