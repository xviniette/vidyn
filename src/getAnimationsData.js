import bezierFunction from "./bezier"

import easingFunctions from "./easing"

const transformsTypes = type => {
    switch (type) {
        case "floor":
            return v => Math.floor(v)
        case "ceil":
            return v => Math.ceil(v)
        case "round":
            return v => Math.round(v)
        default:
            return e => e
    }
}

export default (elementTimestamp, animations = [], defaultData = {}, element) => {
    elementTimestamp -= element.start
    if (elementTimestamp < 0) elementTimestamp = 0

    let data = { x: 0, y: 0, scale: 1, angle: 0, alpha: 1, ...defaultData }

    for (let animation of animations) {
        let { start = 0, duration = 1000, attribute, from, to, easing = "natural", transform, startDelay = 0 } = animation

        if (start < 0 && element) start = element.duration - duration

        let values = { from, to }

        for (let attr in values) {
            if (typeof values[attr] === "string") {
                if (values[attr].startsWith("+=")) {
                    values[attr] = defaultData[attribute] + values[attr].substring(2) * 1
                } else if (values[attr].startsWith("-=")) {
                    values[attr] = defaultData[attribute] - values[attr].substring(2) * 1
                }
            }
        }

        let time = elementTimestamp - startDelay
        if (time < 0) time = 0

        if (time < start) continue

        if (time - startDelay >= start + duration) {
            data = { ...data, [attribute]: values.to }
            continue
        }

        let delta = Math.min(1, Math.max(0, 1 - (duration - (time - start)) / duration))

        if (easing) {
            if (Array.isArray(easing)) delta = bezierFunction(easing, delta)
            if (easing instanceof Function) delta = easing(delta)
            if (typeof easing == "string" && easingFunctions[easing]) delta = easingFunctions[easing](delta)
        }

        const toValue = values.to
        const fromValue = values.from != null ? values.from : data[attribute]

        let deltaValue = toValue - fromValue

        data[attribute] = transform ? transformsTypes(transform)(deltaValue * delta + fromValue) : deltaValue * delta + fromValue
    }

    return data
}
