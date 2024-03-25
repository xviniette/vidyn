import { resolve } from "path"
import { defineConfig } from "vite"

// import { obfuscator } from "rollup-obfuscator"
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
            options: {
                // your javascript-obfuscator options
                debugProtection: true,
                // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
            },
        }),
    ],
})
