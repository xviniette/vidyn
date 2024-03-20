import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/Render.js"),
            name: "VideoRendering",
            fileName: "video-rendering",
        },
    },
})
