import transforms from "./transforms.js"

import elementList from "../elements"
import getAnimationsData from "../getAnimationsData.js"

export default function ({ canvas, ctx, timestamp, playing, dTimestamp }, { elements = [], alpha }) {
    transforms({ canvas, ctx }, arguments[1])

    elements
        .filter(e => e.start <= dTimestamp && e.start + e.duration > dTimestamp)
        .forEach(element => {
            if (!elementList[element.type]) return

            const data = getAnimationsData(dTimestamp, element.animations, element.data, element)

            if (data.alpha !== undefined && alpha !== undefined) data.alpha *= alpha

            ctx.save()

            elementList[element.type](
                {
                    canvas: canvas,
                    ctx: ctx,
                    timestamp: timestamp,
                    dTimestamp: dTimestamp - element.start,
                    playing: playing,
                },
                data,
                element.animations
            )

            ctx.restore()
        })
}
