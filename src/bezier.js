export default (points = [], t = 0) => {
    let p = { x: 0, y: 0 }

    points.forEach((point, index) => {
        if (index == 0) {
            p.x += (1 - t) ** 3 * point.x
            p.y += (1 - t) ** 3 * point.y
        } else if (index == 3) {
            p.x += t ** 3 * point.x
            p.y += t ** 3 * point.y
        } else {
            p.x += 3 * (1 - t) ** 2 * t * point.x
            p.y += 3 * (1 - t) ** 2 * t * point.y
        }
    })

    return p.y
}
