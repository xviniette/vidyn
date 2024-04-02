import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/Vidyn.js"),
            name: "Vidyn",
            fileName: "vidyn",
        },
    },
})
