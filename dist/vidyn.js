const St = ({ dTimestamp: e, playing: t }, { trim: s = 0, volume: i = 1, loop: n = !0, element: r }) => {
  if (!r)
    return;
  r.volume = i;
  const o = e / 1e3 + s / 1e3;
  Math.abs(r.currentTime - o) > 0.5 && (r.currentTime = o), t ? window.hasEventDone && r.paused && r.play() : r.paused || r.pause();
}, Tt = (e) => e * (Math.PI / 180), tt = (e) => e, N = ({ ctx: e }, t = {}) => {
  if (!t)
    return;
  t.x !== void 0 && e.translate(t.x * 1, 0), t.y !== void 0 && e.translate(0, t.y * 1), t.scale !== void 0 && e.scale(t.scale, t.scale), t.scaleX !== void 0 && e.scale(t.scaleX, 1), t.scaleY !== void 0 && e.scale(1, t.scaleY), t.angle !== void 0 && e.rotate(Tt(t.angle)), t.alpha !== void 0 && (e.globalAlpha = t.alpha);
  let s = [];
  if (Math.round(t.blur) && s.push(`blur(${Math.round(t.blur)}px)`), t.brightness !== void 0 && s.push(`brightness(${t.brightness})`), t.contrast !== void 0 && s.push(`contrast(${t.contrast})`), t.grayscale !== void 0 && s.push(`grayscale(${t.grayscale})`), t.hueRotate !== void 0 && s.push(`hue-rotate(${t.hueRotate || 0}deg)`), t.saturate !== void 0 && s.push(`saturate(${t.saturate})`), t.sepia !== void 0 && s.push(`sepia(${t.sepia})`), s.length > 0 && (e.filter = s.join(" ")), t.lineWidth !== void 0 && (e.lineWidth = t.lineWidth), t.lineCap !== void 0 && (e.lineCap = t.lineCap), t.lineDashOffset !== void 0 && (e.lineDashOffset = t.lineDashOffset), t.lineJoin !== void 0 && (e.lineJoin = t.lineJoin), t.lineDash !== void 0 && e.setLineDash(t.lineDash), t.shadowBlur !== void 0 && (e.shadowBlur = t.shadowBlur), t.shadowColor !== void 0 && (e.shadowColor = t.shadowColor), t.shadowOffsetX !== void 0 && (e.shadowOffsetX = t.shadowOffsetX), t.shadowOffsetY !== void 0 && (e.shadowOffsetY = t.shadowOffsetY), e.fillStyle = "rgba(0,0,0,0)", t.fillStyle && (e.fillStyle = tt(t.fillStyle)), e.strokeStyle = "rgba(0,0,0,0)", t.strokeStyle && (e.strokeStyle = tt(t.strokeStyle)), t.clip) {
    switch (e.beginPath(), t.clip) {
      case "rectangle":
        e.roundRect(t.clipX ?? 0, t.clipY ?? 0, t.clipWidth ?? 0, t.clipHeight ?? 0, t.clipRadius ?? 0);
        break;
      case "circle":
        e.moveTo(0, 0), e.arc(t.clipX ?? 0, t.clipY ?? 0, t.clipRadius ?? 0, 0, t.clipEnd ?? Math.PI * 2);
        break;
    }
    e.clip();
  }
};
function bt({ canvas: e, ctx: t }, { width: s, height: i, fit: n = "cover", anchorX: r = 0, anchorY: o = 0, radius: l = 0, element: h }) {
  if (!(h != null && h.src))
    return;
  N({ canvas: e, ctx: t }, arguments[1]);
  const f = s / i, v = h.width / h.height, d = { sX: 0, sY: 0, sWidth: h.width, sHeight: h.height, tWidth: s, tHeight: i };
  switch (n) {
    case "stretch":
      h.tWidth = s, h.tHeight = i;
      break;
    case "fit":
      h.height / i > h.width / s ? (d.tHeight = i, d.tWidth = d.tHeight * v) : (d.tWidth = s, d.tHeight = d.tWidth / v), h.tWidth = s, h.tHeight = i;
      break;
    case "cover":
    default:
      f > v ? (d.sWidth = h.width, d.sHeight = h.width / f, d.sY = (h.height - d.sHeight) / 2) : (d.sHeight = h.height, d.sWidth = h.height * f, d.sX = (h.width - d.sWidth) / 2);
  }
  t.beginPath(), t.roundRect(-s * r, -i * o, d.tWidth, d.tHeight, l), t.stroke(), t.fill(), t.clip(), t.drawImage(h, d.sX, d.sY, d.sWidth, d.sHeight, -s * r, -i * o, d.tWidth, d.tHeight);
}
const Mt = (e) => new Promise((t) => {
  const s = () => {
    e.seeking === !1 && t(), setTimeout(s, 0);
  };
  s();
});
async function kt({ canvas: e, ctx: t, dTimestamp: s, playing: i, rendering: n = !1 }, { width: r, height: o, anchorX: l = 0.5, anchorY: h = 0.5, trim: f = 0, volume: v = 1, fit: d = "cover", radius: b = 0, element: m }) {
  if (!m)
    return;
  N({ canvas: e, ctx: t }, arguments[1]);
  const y = r / o, O = m.videoWidth, S = m.videoHeight, _ = O / S, C = { sX: 0, sY: 0, sWidth: O, sHeight: S, tWidth: r, tHeight: o };
  switch (d) {
    case "stretch":
      m.tWidth = r, m.tHeight = o;
      break;
    case "fit":
      S / o > O / r ? (C.tHeight = o, C.tWidth = C.tHeight * _) : (C.tWidth = r, C.tHeight = C.tWidth / _), m.tWidth = r, m.tHeight = o;
      break;
    case "cover":
    default:
      y > _ ? (C.sWidth = O, C.sHeight = O / y, C.sY = (S - C.sHeight) / 2) : (C.sHeight = S, C.sWidth = S * y, C.sX = (O - C.sWidth) / 2);
  }
  m.volume = v;
  const E = (s / 1e3 + f / 1e3).toFixed(2) * 1;
  n ? (m.currentTime = E, await Mt(m)) : (Math.abs(m.currentTime - E) > 1 && (m.currentTime = E), i ? window.hasEventDone && m.paused && m.play() : m.paused || m.pause()), t.beginPath(), t.roundRect(-r * l, -o * h, C.tWidth, C.tHeight, b), t.stroke(), t.fill(), t.clip(), t.drawImage(m, C.sX, C.sY, C.sWidth, C.sHeight, -r * l, -o * h, C.tWidth, C.tHeight);
}
const Et = (e = [], t = 0) => {
  let s = { x: 0, y: 0 };
  return e.forEach((i, n) => {
    n == 0 ? (s.x += (1 - t) ** 3 * i.x, s.y += (1 - t) ** 3 * i.y) : n == 3 ? (s.x += t ** 3 * i.x, s.y += t ** 3 * i.y) : (s.x += 3 * (1 - t) ** 2 * t * i.x, s.y += 3 * (1 - t) ** 2 * t * i.y);
  }), s.y;
}, U = {
  clampLeft(e) {
    return 1;
  },
  clampRight(e) {
    return 0;
  },
  linear(e) {
    return e;
  },
  // Slight acceleration from zero to full speed
  easeInSine(e) {
    return -1 * Math.cos(e * (Math.PI / 2)) + 1;
  },
  // Slight deceleration at the end
  easeOutSine(e) {
    return Math.sin(e * (Math.PI / 2));
  },
  // Slight acceleration at beginning and slight deceleration at end
  easeInOutSine(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  },
  // Accelerating from zero velocity
  easeInQuad(e) {
    return e * e;
  },
  // Decelerating to zero velocity
  easeOutQuad(e) {
    return e * (2 - e);
  },
  // Acceleration until halfway, then deceleration
  easeInOutQuad(e) {
    return e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e;
  },
  // Accelerating from zero velocity
  easeInCubic(e) {
    return e * e * e;
  },
  // Decelerating to zero velocity
  easeOutCubic(e) {
    const t = e - 1;
    return t * t * t + 1;
  },
  // Acceleration until halfway, then deceleration
  easeInOutCubic(e) {
    return e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1;
  },
  // Accelerating from zero velocity
  easeInQuart(e) {
    return e * e * e * e;
  },
  // Decelerating to zero velocity
  easeOutQuart(e) {
    const t = e - 1;
    return 1 - t * t * t * t;
  },
  // Acceleration until halfway, then deceleration
  easeInOutQuart(e) {
    const t = e - 1;
    return e < 0.5 ? 8 * e * e * e * e : 1 - 8 * t * t * t * t;
  },
  // Accelerating from zero velocity
  easeInQuint(e) {
    return e * e * e * e * e;
  },
  // Decelerating to zero velocity
  easeOutQuint(e) {
    const t = e - 1;
    return 1 + t * t * t * t * t;
  },
  // Acceleration until halfway, then deceleration
  easeInOutQuint(e) {
    const t = e - 1;
    return e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * t * t * t * t * t;
  },
  // Accelerate exponentially until finish
  easeInExpo(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  },
  // Initial exponential acceleration slowing to stop
  easeOutExpo(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  },
  // Exponential acceleration and deceleration
  easeInOutExpo(e) {
    if (e === 0 || e === 1)
      return e;
    const t = e * 2, s = t - 1;
    return t < 1 ? 0.5 * Math.pow(2, 10 * s) : 0.5 * (-Math.pow(2, -10 * s) + 2);
  },
  // Increasing velocity until stop
  easeInCirc(e) {
    const t = e / 1;
    return -1 * (Math.sqrt(1 - t * e) - 1);
  },
  // Start fast, decreasing velocity until stop
  easeOutCirc(e) {
    const t = e - 1;
    return Math.sqrt(1 - t * t);
  },
  // Fast increase in velocity, fast decrease in velocity
  easeInOutCirc(e) {
    const t = e * 2, s = t - 2;
    return t < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - s * s) + 1);
  },
  // Slow movement backwards then fast snap to finish
  easeInBack(e, t = 1.70158) {
    return e * e * ((t + 1) * e - t);
  },
  // Fast snap to backwards point then slow resolve to finish
  easeOutBack(e, t = 1.70158) {
    const s = e / 1 - 1;
    return s * s * ((t + 1) * s + t) + 1;
  },
  // Slow movement backwards, fast snap to past finish, slow resolve to finish
  easeInOutBack(e, t = 1.70158) {
    const s = e * 2, i = s - 2, n = t * 1.525;
    return s < 1 ? 0.5 * s * s * ((n + 1) * s - n) : 0.5 * (i * i * ((n + 1) * i + n) + 2);
  },
  // Bounces slowly then quickly to finish
  easeInElastic(e, t = 0.7) {
    if (e === 0 || e === 1)
      return e;
    const i = e / 1 - 1, n = 1 - t, r = n / (2 * Math.PI) * Math.asin(1);
    return -(Math.pow(2, 10 * i) * Math.sin((i - r) * (2 * Math.PI) / n));
  },
  // Fast acceleration, bounces to zero
  easeOutElastic(e, t = 0.6) {
    const s = 1 - t, i = e * 2;
    if (e === 0 || e === 1)
      return e;
    const n = s / (2 * Math.PI) * Math.asin(1);
    return Math.pow(2, -10 * i) * Math.sin((i - n) * (2 * Math.PI) / s) + 1;
  },
  // Slow start and end, two bounces sandwich a fast motion
  easeInOutElastic(e, t = 0.65) {
    const s = 1 - t;
    if (e === 0 || e === 1)
      return e;
    const i = e * 2, n = i - 1, r = s / (2 * Math.PI) * Math.asin(1);
    return i < 1 ? -0.5 * (Math.pow(2, 10 * n) * Math.sin((n - r) * (2 * Math.PI) / s)) : Math.pow(2, -10 * n) * Math.sin((n - r) * (2 * Math.PI) / s) * 0.5 + 1;
  },
  // Bounce to completion
  easeOutBounce(e) {
    const t = e / 1;
    if (t < 1 / 2.75)
      return 7.5625 * t * t;
    if (t < 2 / 2.75) {
      const s = t - 0.5454545454545454;
      return 7.5625 * s * s + 0.75;
    } else if (t < 2.5 / 2.75) {
      const s = t - 0.8181818181818182;
      return 7.5625 * s * s + 0.9375;
    } else {
      const s = t - 0.9545454545454546;
      return 7.5625 * s * s + 0.984375;
    }
  },
  // Bounce increasing in velocity until completion
  easeInBounce(e) {
    return 1 - easeOutBounce(1 - e);
  },
  // Bounce in and bounce out
  easeInOutBounce(e) {
    return e < 0.5 ? easeInBounce(e * 2) * 0.5 : easeOutBounce(e * 2 - 1) * 0.5 + 0.5;
  }
};
U.slowdown = U.easeOutExpo;
U.accelerate = U.easeInExpo;
U.natural = U.easeInOutSine;
U.back = U.easeOutBack;
U.bounce = U.easeOutBounce;
U.elastic = U.easeOutElastic;
const _t = (e) => {
  switch (e) {
    case "floor":
      return (t) => Math.floor(t);
    case "ceil":
      return (t) => Math.ceil(t);
    case "round":
      return (t) => Math.round(t);
    default:
      return (t) => t;
  }
}, $e = (e, t = [], s = {}, i) => {
  e -= i.start, e < 0 && (e = 0);
  let n = { x: 0, y: 0, scale: 1, angle: 0, alpha: 1, ...s };
  for (let r of t) {
    let { start: o = 0, duration: l = 1e3, attribute: h, from: f, to: v, easing: d = "natural", transform: b, startDelay: m = 0 } = r;
    o < 0 && i && (o = i.duration - l);
    let y = { from: f, to: v };
    for (let I in y)
      typeof y[I] == "string" && (y[I].startsWith("+=") ? y[I] = s[h] + y[I].substring(2) * 1 : y[I].startsWith("-=") && (y[I] = s[h] - y[I].substring(2) * 1));
    let O = e - m;
    if (O < 0 && (O = 0), O < o)
      continue;
    if (O - m >= o + l) {
      n = { ...n, [h]: y.to };
      continue;
    }
    let S = Math.min(1, Math.max(0, 1 - (l - (O - o)) / l));
    d && (Array.isArray(d) && (S = Et(d, S)), d instanceof Function && (S = d(S)), typeof d == "string" && U[d] && (S = U[d](S)));
    const _ = y.to, C = y.from != null ? y.from : n[h];
    let E = _ - C;
    n[h] = b ? _t(b)(E * S + C) : E * S + C;
  }
  return n;
};
function It({ canvas: e, ctx: t, dTimestamp: s }, { text: i = "", font: n, fontSize: r = 10, width: o = null, anchorX: l = 0.5, anchorY: h = 0.5, lineHeight: f = 1.2, letterSpacing: v = 0, lineFill: d }, b = []) {
  N({ canvas: e, ctx: t }, { ...arguments[1] }), i = i + "", t.font = `${r}px ${n && typeof n == "string" ? n.replace(/[0-9.-:\/]*/gm, "") + ", " : ""}serif`, t.textAlign = "left", t.textBaseline = "top", t.letterSpacing = `${v}px`;
  let m = [];
  i.split(`
`).forEach((C) => m = [...m, ...Bt(t, C, o)]);
  let y = { line: 0, word: 0, letter: 0 };
  const S = t.measureText("A").actualBoundingBoxDescent;
  let _ = -(S * f * m.length) * h;
  m.forEach((C) => {
    const E = t.measureText(C);
    let I = -E.width * l;
    if (t.save(), d) {
      t.fillStyle = d, t.globalAlpha = 1, t.beginPath();
      const P = S * 0.3;
      t.roundRect(I - P, _ - P, E.width + P * 2, S + P * 2, [10]), t.fill();
    }
    t.restore(), Array.from(C).forEach((R) => {
      const P = t.measureText(R);
      t.save(), t.translate(I, _);
      for (let G in y) {
        const ae = b.filter((q) => q.type == G);
        let ve = y[G], Y = {};
        for (let q of ae) {
          let ze = Array.isArray(q.delay) ? q.delay : [q.delay], et = 0;
          for (let Ae = 0; Ae < ve; Ae++)
            et += ze[Ae % ze.length];
          Y = $e(s - et, [q], Y, { start: 0, duration: 1e3 });
        }
        N({ ctx: t }, { fillStyle: arguments[1].fillStyle, strokeStyle: arguments[1].strokeStyle, ...Y });
      }
      t.strokeText(R, 0, 0), t.fillText(R, 0, 0), I += P.width + v, t.restore(), R == " " && y.word++, y.letter++;
    }), y.word++, y.letter++, _ += S * f, y.line++;
  });
}
const Bt = (e, t, s) => {
  for (var i = t.split(" "), n = [], r = i[0], o = 1; o < i.length; o++) {
    var l = i[o], h = e.measureText(r + " " + l).width;
    s == null || h < s ? r += " " + l : (n.push(r), r = l);
  }
  return n.push(r), n;
};
function Ot({ canvas: e, ctx: t }, { width: s = 1, height: i = 1, anchorX: n = 0, anchorY: r = 0, radius: o = 0 }) {
  N({ canvas: e, ctx: t }, arguments[1]), t.beginPath(), t.roundRect(-n * s, -r * i, s, i, o), t.fill(), t.stroke();
}
function zt({ canvas: e, ctx: t }, { width: s = 1, anchorX: i = 0, anchorY: n = 0, startAngle: r = 0, endAngle: o = Math.PI * 2, counterclockwise: l = !1 }) {
  N({ canvas: e, ctx: t }, arguments[1]), t.beginPath(), t.moveTo(0, 0), t.arc(-i * s, -n * s, s, r, o, l), t.fill(), t.stroke();
}
function At({ canvas: e, ctx: t }, { width: s = 1, height: i = 1, anchorX: n = 0.5, anchorY: r = 0.5, startAngle: o = 0, endAngle: l = Math.PI * 2, counterclockwise: h = !1 }) {
  N({ canvas: e, ctx: t }, arguments[1]);
  const f = s / 2, v = i / 2;
  t.beginPath(), t.moveTo(0, 0), t.ellipse((-n + 0.5) * f * 2, (-r + 0.5) * v * 2, f, v, 0, o, l, h), t.fill(), t.stroke();
}
function Wt({ canvas: e, ctx: t, timestamp: s, playing: i, dTimestamp: n }, { elements: r = [], alpha: o }) {
  N({ canvas: e, ctx: t }, arguments[1]), r.filter((l) => l.start <= n && l.start + l.duration > n).forEach((l) => {
    if (!Me[l.type])
      return;
    const h = $e(n, l.animations, l.data, l);
    h.alpha !== void 0 && o !== void 0 && (h.alpha *= o), t.save(), Me[l.type](
      {
        canvas: e,
        ctx: t,
        timestamp: s,
        dTimestamp: n - l.start,
        playing: i
      },
      h,
      l.animations
    ), t.restore();
  });
}
function Pt({ canvas: e, ctx: t }, { dx: s = 0, dy: i = 0 }) {
  N({ canvas: e, ctx: t }, arguments[1]), t.beginPath(), t.moveTo(0, 0), t.lineTo(s - arguments[1].x, i - arguments[1].y), t.stroke();
}
function Ut({ canvas: e, ctx: t }, { points: s = [], closePath: i }) {
  N({ canvas: e, ctx: t }, arguments[1]), t.beginPath(), s.forEach((n, r) => {
    r == 0 ? t.moveTo(n.x, n.y) : t.lineTo(n.x, n.y);
  }), i && t.closePath(), t.stroke();
}
const Me = { audio: St, image: bt, video: kt, text: It, rectangle: Ot, circle: zt, ellipse: At, group: Wt, line: Pt, path: Ut };
var Ne = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
}, a = (e, t, s) => (Ne(e, t, "read from private field"), s ? s.call(e) : t.get(e)), g = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, z = (e, t, s, i) => (Ne(e, t, "write to private field"), i ? i.call(e, s) : t.set(e, s), s), Dt = (e, t, s, i) => ({
  set _(n) {
    z(e, t, n, s);
  },
  get _() {
    return a(e, t, i);
  }
}), w = (e, t, s) => (Ne(e, t, "access private method"), s), T = new Uint8Array(8), j = new DataView(T.buffer), x = (e) => [(e % 256 + 256) % 256], M = (e) => (j.setUint16(0, e, !1), [T[0], T[1]]), Lt = (e) => (j.setInt16(0, e, !1), [T[0], T[1]]), nt = (e) => (j.setUint32(0, e, !1), [T[1], T[2], T[3]]), u = (e) => (j.setUint32(0, e, !1), [T[0], T[1], T[2], T[3]]), se = (e) => (j.setUint32(0, Math.floor(e / 2 ** 32), !1), j.setUint32(4, e, !1), [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7]]), Xe = (e) => (j.setInt16(0, 2 ** 8 * e, !1), [T[0], T[1]]), $ = (e) => (j.setInt32(0, 2 ** 16 * e, !1), [T[0], T[1], T[2], T[3]]), We = (e) => (j.setInt32(0, 2 ** 30 * e, !1), [T[0], T[1], T[2], T[3]]), F = (e, t = !1) => {
  let s = Array(e.length).fill(null).map((i, n) => e.charCodeAt(n));
  return t && s.push(0), s;
}, ie = (e) => e && e[e.length - 1], Q = (e, t, s = !0) => {
  let i = e * t;
  return s ? Math.round(i) : i;
}, rt = (e) => {
  let t = e * (Math.PI / 180), s = Math.cos(t), i = Math.sin(t);
  return [
    s,
    i,
    0,
    -i,
    s,
    0,
    0,
    0,
    1
  ];
}, xt = rt(0), ot = (e) => [
  $(e[0]),
  $(e[1]),
  We(e[2]),
  $(e[3]),
  $(e[4]),
  We(e[5]),
  $(e[6]),
  $(e[7]),
  We(e[8])
], de = (e) => !e || typeof e != "object" ? e : Array.isArray(e) ? e.map(de) : Object.fromEntries(Object.entries(e).map(([t, s]) => [t, de(s)])), le = (e) => e >= 0 && e < 2 ** 32, B = (e, t, s) => ({
  type: e,
  contents: t && new Uint8Array(t.flat(10)),
  children: s
}), k = (e, t, s, i, n) => B(
  e,
  [x(t), nt(s), i ?? []],
  n
), Rt = (e) => {
  let t = 512;
  return e.fragmented ? B("ftyp", [
    F("iso5"),
    // Major brand
    u(t),
    // Minor version
    // Compatible brands
    F("iso5"),
    F("iso6"),
    F("mp41")
  ]) : B("ftyp", [
    F("isom"),
    // Major brand
    u(t),
    // Minor version
    // Compatible brands
    F("isom"),
    e.holdsAvc ? F("avc1") : [],
    F("mp41")
  ]);
}, Pe = (e) => ({ type: "mdat", largeSize: e }), Ft = (e) => ({ type: "free", size: e }), ye = (e, t, s = !1) => B("moov", null, [
  Ht(t, e),
  ...e.map((i) => Vt(i, t)),
  s ? ps(e) : null
]), Ht = (e, t) => {
  let s = Q(Math.max(
    0,
    ...t.filter((o) => o.samples.length > 0).map((o) => ie(o.samples).timestamp + ie(o.samples).duration)
  ), Le), i = Math.max(...t.map((o) => o.id)) + 1, n = !le(e) || !le(s), r = n ? se : u;
  return k("mvhd", +n, 0, [
    r(e),
    // Creation time
    r(e),
    // Modification time
    u(Le),
    // Timescale
    r(s),
    // Duration
    $(1),
    // Preferred rate
    Xe(1),
    // Preferred volume
    Array(10).fill(0),
    // Reserved
    ot(xt),
    // Matrix
    Array(24).fill(0),
    // Pre-defined
    u(i)
    // Next track ID
  ]);
}, Vt = (e, t) => B("trak", null, [
  $t(e, t),
  Nt(e, t)
]), $t = (e, t) => {
  let s = ie(e.samples), i = Q(
    s ? s.timestamp + s.duration : 0,
    Le
  ), n = !le(t) || !le(i), r = n ? se : u;
  return k("tkhd", +n, 3, [
    r(t),
    // Creation time
    r(t),
    // Modification time
    u(e.id),
    // Track ID
    u(0),
    // Reserved
    r(i),
    // Duration
    Array(8).fill(0),
    // Reserved
    M(0),
    // Layer
    M(0),
    // Alternate group
    Xe(e.info.type === "audio" ? 1 : 0),
    // Volume
    M(0),
    // Reserved
    ot(rt(e.info.type === "video" ? e.info.rotation : 0)),
    // Matrix
    $(e.info.type === "video" ? e.info.width : 0),
    // Track width
    $(e.info.type === "video" ? e.info.height : 0)
    // Track height
  ]);
}, Nt = (e, t) => B("mdia", null, [
  Xt(e, t),
  jt(e.info.type === "video" ? "vide" : "soun"),
  Yt(e)
]), Xt = (e, t) => {
  let s = ie(e.samples), i = Q(
    s ? s.timestamp + s.duration : 0,
    e.timescale
  ), n = !le(t) || !le(i), r = n ? se : u;
  return k("mdhd", +n, 0, [
    r(t),
    // Creation time
    r(t),
    // Modification time
    u(e.timescale),
    // Timescale
    r(i),
    // Duration
    M(21956),
    // Language ("und", undetermined)
    M(0)
    // Quality
  ]);
}, jt = (e) => k("hdlr", 0, 0, [
  F("mhlr"),
  // Component type
  F(e),
  // Component subtype
  u(0),
  // Component manufacturer
  u(0),
  // Component flags
  u(0),
  // Component flags mask
  F("mp4-muxer-hdlr", !0)
  // Component name
]), Yt = (e) => B("minf", null, [
  e.info.type === "video" ? qt() : Qt(),
  Gt(),
  Kt(e)
]), qt = () => k("vmhd", 0, 1, [
  M(0),
  // Graphics mode
  M(0),
  // Opcolor R
  M(0),
  // Opcolor G
  M(0)
  // Opcolor B
]), Qt = () => k("smhd", 0, 0, [
  M(0),
  // Balance
  M(0)
  // Reserved
]), Gt = () => B("dinf", null, [
  Zt()
]), Zt = () => k("dref", 0, 0, [
  u(1)
  // Entry count
], [
  Jt()
]), Jt = () => k("url ", 0, 1), Kt = (e) => B("stbl", null, [
  es(e),
  hs(e),
  us(e),
  ds(e),
  fs(e),
  cs(e)
]), es = (e) => k("stsd", 0, 0, [
  u(1)
  // Entry count
], [
  e.info.type === "video" ? ts(
    Ms[e.info.codec],
    e
  ) : rs(
    Es[e.info.codec],
    e
  )
]), ts = (e, t) => B(e, [
  Array(6).fill(0),
  // Reserved
  M(1),
  // Data reference index
  M(0),
  // Pre-defined
  M(0),
  // Reserved
  Array(12).fill(0),
  // Pre-defined
  M(t.info.width),
  // Width
  M(t.info.height),
  // Height
  u(4718592),
  // Horizontal resolution
  u(4718592),
  // Vertical resolution
  u(0),
  // Reserved
  M(1),
  // Frame count
  Array(32).fill(0),
  // Compressor name
  M(24),
  // Depth
  Lt(65535)
  // Pre-defined
], [
  ks[t.info.codec](t)
]), ss = (e) => e.codecPrivate && B("avcC", [...e.codecPrivate]), is = (e) => e.codecPrivate && B("hvcC", [...e.codecPrivate]), as = (e) => e.codecPrivate && B("vpcC", [...e.codecPrivate]), ns = (e) => e.codecPrivate && B("av1C", [...e.codecPrivate]), rs = (e, t) => B(e, [
  Array(6).fill(0),
  // Reserved
  M(1),
  // Data reference index
  M(0),
  // Version
  M(0),
  // Revision level
  u(0),
  // Vendor
  M(t.info.numberOfChannels),
  // Number of channels
  M(16),
  // Sample size (bits)
  M(0),
  // Compression ID
  M(0),
  // Packet size
  $(t.info.sampleRate)
  // Sample rate
], [
  _s[t.info.codec](t)
]), os = (e) => k("esds", 0, 0, [
  // https://stackoverflow.com/a/54803118
  u(58753152),
  // TAG(3) = Object Descriptor ([2])
  x(32 + e.codecPrivate.byteLength),
  // length of this OD (which includes the next 2 tags)
  M(1),
  // ES_ID = 1
  x(0),
  // flags etc = 0
  u(75530368),
  // TAG(4) = ES Descriptor ([2]) embedded in above OD
  x(18 + e.codecPrivate.byteLength),
  // length of this ESD
  x(64),
  // MPEG-4 Audio
  x(21),
  // stream type(6bits)=5 audio, flags(2bits)=1
  nt(0),
  // 24bit buffer size
  u(130071),
  // max bitrate
  u(130071),
  // avg bitrate
  u(92307584),
  // TAG(5) = ASC ([2],[3]) embedded in above OD
  x(e.codecPrivate.byteLength),
  // length
  ...e.codecPrivate,
  u(109084800),
  // TAG(6)
  x(1),
  // length
  x(2)
  // data
]), ls = (e) => B("dOps", [
  x(0),
  // Version
  x(e.info.numberOfChannels),
  // OutputChannelCount
  M(3840),
  // PreSkip, should be at least 80 milliseconds worth of playback, measured in 48000 Hz samples
  u(e.info.sampleRate),
  // InputSampleRate
  Xe(0),
  // OutputGain
  x(0)
  // ChannelMappingFamily
]), hs = (e) => k("stts", 0, 0, [
  u(e.timeToSampleTable.length),
  // Number of entries
  e.timeToSampleTable.map((t) => [
    // Time-to-sample table
    u(t.sampleCount),
    // Sample count
    u(t.sampleDelta)
    // Sample duration
  ])
]), us = (e) => {
  if (e.samples.every((s) => s.type === "key"))
    return null;
  let t = [...e.samples.entries()].filter(([, s]) => s.type === "key");
  return k("stss", 0, 0, [
    u(t.length),
    // Number of entries
    t.map(([s]) => u(s + 1))
    // Sync sample table
  ]);
}, ds = (e) => k("stsc", 0, 0, [
  u(e.compactlyCodedChunkTable.length),
  // Number of entries
  e.compactlyCodedChunkTable.map((t) => [
    // Sample-to-chunk table
    u(t.firstChunk),
    // First chunk
    u(t.samplesPerChunk),
    // Samples per chunk
    u(1)
    // Sample description index
  ])
]), fs = (e) => k("stsz", 0, 0, [
  u(0),
  // Sample size (0 means non-constant size)
  u(e.samples.length),
  // Number of entries
  e.samples.map((t) => u(t.size))
  // Sample size table
]), cs = (e) => e.finalizedChunks.length > 0 && ie(e.finalizedChunks).offset >= 2 ** 32 ? k("co64", 0, 0, [
  u(e.finalizedChunks.length),
  // Number of entries
  e.finalizedChunks.map((t) => se(t.offset))
  // Chunk offset table
]) : k("stco", 0, 0, [
  u(e.finalizedChunks.length),
  // Number of entries
  e.finalizedChunks.map((t) => u(t.offset))
  // Chunk offset table
]), ps = (e) => B("mvex", null, e.map(ms)), ms = (e) => k("trex", 0, 0, [
  u(e.id),
  // Track ID
  u(1),
  // Default sample description index
  u(0),
  // Default sample duration
  u(0),
  // Default sample size
  u(0)
  // Default sample flags
]), st = (e, t) => B("moof", null, [
  gs(e),
  ...t.map(vs)
]), gs = (e) => k("mfhd", 0, 0, [
  u(e)
  // Sequence number
]), lt = (e) => {
  let t = 0, s = 0, i = 0, n = 0, r = e.type === "delta";
  return s |= +r, r ? t |= 1 : t |= 2, t << 24 | s << 16 | i << 8 | n;
}, vs = (e) => B("traf", null, [
  ys(e),
  ws(e),
  Cs(e)
]), ys = (e) => {
  let t = 0;
  t |= 8, t |= 16, t |= 32, t |= 131072;
  let s = e.currentChunk.samples[1] ?? e.currentChunk.samples[0], i = {
    duration: s.timescaleUnitsToNextSample,
    size: s.size,
    flags: lt(s)
  };
  return k("tfhd", 0, t, [
    u(e.id),
    // Track ID
    u(i.duration),
    // Default sample duration
    u(i.size),
    // Default sample size
    u(i.flags)
    // Default sample flags
  ]);
}, ws = (e) => k("tfdt", 1, 0, [
  se(Q(e.currentChunk.startTimestamp, e.timescale))
  // Base Media Decode Time
]), Cs = (e) => {
  let t = e.currentChunk.samples.map((b) => b.timescaleUnitsToNextSample), s = e.currentChunk.samples.map((b) => b.size), i = e.currentChunk.samples.map(lt), n = new Set(t), r = new Set(s), o = new Set(i), l = o.size === 2 && i[0] !== i[1], h = n.size > 1, f = r.size > 1, v = !l && o.size > 1, d = 0;
  return d |= 1, d |= 4 * +l, d |= 256 * +h, d |= 512 * +f, d |= 1024 * +v, k("trun", 0, d, [
    u(e.currentChunk.samples.length),
    // Sample count
    u(e.currentChunk.offset - e.currentChunk.moofOffset || 0),
    // Data offset
    l ? u(i[0]) : [],
    e.currentChunk.samples.map((b, m) => [
      h ? u(t[m]) : [],
      // Sample duration
      f ? u(s[m]) : [],
      // Sample size
      v ? u(i[m]) : []
      // Sample flags
    ])
  ]);
}, Ss = (e) => B("mfra", null, [
  ...e.map(Ts),
  bs()
]), Ts = (e, t) => k("tfra", 1, 0, [
  u(e.id),
  // Track ID
  u(63),
  // This specifies that traf number, trun number and sample number are 32-bit ints
  u(e.finalizedChunks.length),
  // Number of entries
  e.finalizedChunks.map((i) => [
    se(Q(i.startTimestamp, e.timescale)),
    // Time
    se(i.moofOffset),
    // moof offset
    u(t + 1),
    // traf number
    u(1),
    // trun number
    u(1)
    // Sample number
  ])
]), bs = () => k("mfro", 0, 0, [
  // This value needs to be overwritten manually from the outside, where the actual size of the enclosing mfra box
  // is known
  u(0)
  // Size
]), Ms = {
  avc: "avc1",
  hevc: "hvc1",
  vp9: "vp09",
  av1: "av01"
}, ks = {
  avc: ss,
  hevc: is,
  vp9: as,
  av1: ns
}, Es = {
  aac: "mp4a",
  opus: "Opus"
}, _s = {
  aac: os,
  opus: ls
}, ht = class {
  constructor() {
    this.buffer = null;
  }
}, ut = class {
  constructor(e) {
    this.options = e;
  }
}, Is = class {
  constructor(e, t) {
    this.stream = e, this.options = t;
  }
}, Z, ne, je = class {
  constructor() {
    this.pos = 0, g(this, Z, new Uint8Array(8)), g(this, ne, new DataView(a(this, Z).buffer)), this.offsets = /* @__PURE__ */ new WeakMap();
  }
  /** Sets the current position for future writes to a new one. */
  seek(e) {
    this.pos = e;
  }
  writeU32(e) {
    a(this, ne).setUint32(0, e, !1), this.write(a(this, Z).subarray(0, 4));
  }
  writeU64(e) {
    a(this, ne).setUint32(0, Math.floor(e / 2 ** 32), !1), a(this, ne).setUint32(4, e, !1), this.write(a(this, Z).subarray(0, 8));
  }
  writeAscii(e) {
    for (let t = 0; t < e.length; t++)
      a(this, ne).setUint8(t % 8, e.charCodeAt(t)), t % 8 === 7 && this.write(a(this, Z));
    e.length % 8 !== 0 && this.write(a(this, Z).subarray(0, e.length % 8));
  }
  writeBox(e) {
    if (this.offsets.set(e, this.pos), e.contents && !e.children)
      this.writeBoxHeader(e, e.size ?? e.contents.byteLength + 8), this.write(e.contents);
    else {
      let t = this.pos;
      if (this.writeBoxHeader(e, 0), e.contents && this.write(e.contents), e.children)
        for (let n of e.children)
          n && this.writeBox(n);
      let s = this.pos, i = e.size ?? s - t;
      this.seek(t), this.writeBoxHeader(e, i), this.seek(s);
    }
  }
  writeBoxHeader(e, t) {
    this.writeU32(e.largeSize ? 1 : t), this.writeAscii(e.type), e.largeSize && this.writeU64(t);
  }
  measureBoxHeader(e) {
    return 8 + (e.largeSize ? 8 : 0);
  }
  patchBox(e) {
    let t = this.pos;
    this.seek(this.offsets.get(e)), this.writeBox(e), this.seek(t);
  }
  measureBox(e) {
    if (e.contents && !e.children)
      return this.measureBoxHeader(e) + e.contents.byteLength;
    {
      let t = this.measureBoxHeader(e);
      if (e.contents && (t += e.contents.byteLength), e.children)
        for (let s of e.children)
          s && (t += this.measureBox(s));
      return t;
    }
  }
};
Z = /* @__PURE__ */ new WeakMap();
ne = /* @__PURE__ */ new WeakMap();
var we, te, me, ue, Ce, Ue, Bs = class extends je {
  constructor(e) {
    super(), g(this, Ce), g(this, we, void 0), g(this, te, new ArrayBuffer(2 ** 16)), g(this, me, new Uint8Array(a(this, te))), g(this, ue, 0), z(this, we, e);
  }
  write(e) {
    w(this, Ce, Ue).call(this, this.pos + e.byteLength), a(this, me).set(e, this.pos), this.pos += e.byteLength, z(this, ue, Math.max(a(this, ue), this.pos));
  }
  finalize() {
    w(this, Ce, Ue).call(this, this.pos), a(this, we).buffer = a(this, te).slice(0, Math.max(a(this, ue), this.pos));
  }
};
we = /* @__PURE__ */ new WeakMap();
te = /* @__PURE__ */ new WeakMap();
me = /* @__PURE__ */ new WeakMap();
ue = /* @__PURE__ */ new WeakMap();
Ce = /* @__PURE__ */ new WeakSet();
Ue = function(e) {
  let t = a(this, te).byteLength;
  for (; t < e; )
    t *= 2;
  if (t === a(this, te).byteLength)
    return;
  let s = new ArrayBuffer(t), i = new Uint8Array(s);
  i.set(a(this, me), 0), z(this, te, s), z(this, me, i);
};
var Se, J, dt = class extends je {
  constructor(e) {
    super(), g(this, Se, void 0), g(this, J, []), z(this, Se, e);
  }
  write(e) {
    a(this, J).push({
      data: e.slice(),
      start: this.pos
    }), this.pos += e.byteLength;
  }
  flush() {
    var s, i;
    if (a(this, J).length === 0)
      return;
    let e = [], t = [...a(this, J)].sort((n, r) => n.start - r.start);
    e.push({
      start: t[0].start,
      size: t[0].data.byteLength
    });
    for (let n = 1; n < t.length; n++) {
      let r = e[e.length - 1], o = t[n];
      o.start <= r.start + r.size ? r.size = Math.max(r.size, o.start + o.data.byteLength - r.start) : e.push({
        start: o.start,
        size: o.data.byteLength
      });
    }
    for (let n of e) {
      n.data = new Uint8Array(n.size);
      for (let r of a(this, J))
        n.start <= r.start && r.start < n.start + n.size && n.data.set(r.data, r.start - n.start);
      (i = (s = a(this, Se).options).onData) == null || i.call(s, n.data, n.start);
    }
    a(this, J).length = 0;
  }
  finalize() {
  }
};
Se = /* @__PURE__ */ new WeakMap();
J = /* @__PURE__ */ new WeakMap();
var Os = 2 ** 24, zs = 2, ke, H, L, Ee, De, Ye, ft, qe, ct, fe, _e, pt = class extends je {
  constructor(e) {
    var t;
    if (super(), g(this, Ee), g(this, Ye), g(this, qe), g(this, fe), g(this, ke, void 0), g(this, H, void 0), g(this, L, []), z(this, ke, e), z(this, H, ((t = e.options) == null ? void 0 : t.chunkSize) ?? Os), !Number.isInteger(a(this, H)) || a(this, H) < 2 ** 10)
      throw new Error("Invalid StreamTarget options: chunkSize must be an integer not smaller than 1024.");
  }
  write(e) {
    w(this, Ee, De).call(this, e, this.pos), w(this, fe, _e).call(this), this.pos += e.byteLength;
  }
  finalize() {
    w(this, fe, _e).call(this, !0);
  }
};
ke = /* @__PURE__ */ new WeakMap();
H = /* @__PURE__ */ new WeakMap();
L = /* @__PURE__ */ new WeakMap();
Ee = /* @__PURE__ */ new WeakSet();
De = function(e, t) {
  let s = a(this, L).findIndex((l) => l.start <= t && t < l.start + a(this, H));
  s === -1 && (s = w(this, qe, ct).call(this, t));
  let i = a(this, L)[s], n = t - i.start, r = e.subarray(0, Math.min(a(this, H) - n, e.byteLength));
  i.data.set(r, n);
  let o = {
    start: n,
    end: n + r.byteLength
  };
  if (w(this, Ye, ft).call(this, i, o), i.written[0].start === 0 && i.written[0].end === a(this, H) && (i.shouldFlush = !0), a(this, L).length > zs) {
    for (let l = 0; l < a(this, L).length - 1; l++)
      a(this, L)[l].shouldFlush = !0;
    w(this, fe, _e).call(this);
  }
  r.byteLength < e.byteLength && w(this, Ee, De).call(this, e.subarray(r.byteLength), t + r.byteLength);
};
Ye = /* @__PURE__ */ new WeakSet();
ft = function(e, t) {
  let s = 0, i = e.written.length - 1, n = -1;
  for (; s <= i; ) {
    let r = Math.floor(s + (i - s + 1) / 2);
    e.written[r].start <= t.start ? (s = r + 1, n = r) : i = r - 1;
  }
  for (e.written.splice(n + 1, 0, t), (n === -1 || e.written[n].end < t.start) && n++; n < e.written.length - 1 && e.written[n].end >= e.written[n + 1].start; )
    e.written[n].end = Math.max(e.written[n].end, e.written[n + 1].end), e.written.splice(n + 1, 1);
};
qe = /* @__PURE__ */ new WeakSet();
ct = function(e) {
  let s = {
    start: Math.floor(e / a(this, H)) * a(this, H),
    data: new Uint8Array(a(this, H)),
    written: [],
    shouldFlush: !1
  };
  return a(this, L).push(s), a(this, L).sort((i, n) => i.start - n.start), a(this, L).indexOf(s);
};
fe = /* @__PURE__ */ new WeakSet();
_e = function(e = !1) {
  var t, s;
  for (let i = 0; i < a(this, L).length; i++) {
    let n = a(this, L)[i];
    if (!(!n.shouldFlush && !e)) {
      for (let r of n.written)
        (s = (t = a(this, ke).options).onData) == null || s.call(
          t,
          n.data.subarray(r.start, r.end),
          n.start + r.start
        );
      a(this, L).splice(i--, 1);
    }
  }
};
var As = class extends pt {
  constructor(e) {
    var t;
    super(new ut({
      onData: (s, i) => e.stream.write({
        type: "write",
        data: s,
        position: i
      }),
      chunkSize: (t = e.options) == null ? void 0 : t.chunkSize
    }));
  }
}, Le = 1e3, Ws = ["avc", "hevc", "vp9", "av1"], Ps = ["aac", "opus"], Us = 2082844800, Ds = ["strict", "offset"], p, c, Ie, D, A, W, re, oe, Qe, K, ee, ce, xe, mt, Re, gt, Ge, vt, Fe, yt, Ze, wt, Te, He, V, X, Je, Ct, pe, Be, Oe, Ke, he, ge, be, Ve, Ls = class {
  constructor(e) {
    var t;
    if (g(this, xe), g(this, Re), g(this, Ge), g(this, Fe), g(this, Ze), g(this, Te), g(this, V), g(this, Je), g(this, pe), g(this, Oe), g(this, he), g(this, be), g(this, p, void 0), g(this, c, void 0), g(this, Ie, void 0), g(this, D, void 0), g(this, A, null), g(this, W, null), g(this, re, Math.floor(Date.now() / 1e3) + Us), g(this, oe, []), g(this, Qe, 1), g(this, K, []), g(this, ee, []), g(this, ce, !1), w(this, xe, mt).call(this, e), e.video = de(e.video), e.audio = de(e.audio), e.fastStart = de(e.fastStart), this.target = e.target, z(this, p, {
      firstTimestampBehavior: "strict",
      ...e
    }), e.target instanceof ht)
      z(this, c, new Bs(e.target));
    else if (e.target instanceof ut)
      z(this, c, (t = e.target.options) != null && t.chunked ? new pt(e.target) : new dt(e.target));
    else if (e.target instanceof Is)
      z(this, c, new As(e.target));
    else
      throw new Error(`Invalid target: ${e.target}`);
    w(this, Fe, yt).call(this), w(this, Re, gt).call(this);
  }
  addVideoChunk(e, t, s) {
    let i = new Uint8Array(e.byteLength);
    e.copyTo(i), this.addVideoChunkRaw(i, e.type, s ?? e.timestamp, e.duration, t);
  }
  addVideoChunkRaw(e, t, s, i, n) {
    if (w(this, be, Ve).call(this), !a(this, p).video)
      throw new Error("No video track declared.");
    if (typeof a(this, p).fastStart == "object" && a(this, A).samples.length === a(this, p).fastStart.expectedVideoChunks)
      throw new Error(`Cannot add more video chunks than specified in 'fastStart' (${a(this, p).fastStart.expectedVideoChunks}).`);
    let r = w(this, Te, He).call(this, a(this, A), e, t, s, i, n);
    if (a(this, p).fastStart === "fragmented" && a(this, W)) {
      for (; a(this, ee).length > 0 && a(this, ee)[0].timestamp <= r.timestamp; ) {
        let o = a(this, ee).shift();
        w(this, V, X).call(this, a(this, W), o);
      }
      r.timestamp <= a(this, W).lastTimestamp ? w(this, V, X).call(this, a(this, A), r) : a(this, K).push(r);
    } else
      w(this, V, X).call(this, a(this, A), r);
  }
  addAudioChunk(e, t, s) {
    let i = new Uint8Array(e.byteLength);
    e.copyTo(i), this.addAudioChunkRaw(i, e.type, s ?? e.timestamp, e.duration, t);
  }
  addAudioChunkRaw(e, t, s, i, n) {
    if (w(this, be, Ve).call(this), !a(this, p).audio)
      throw new Error("No audio track declared.");
    if (typeof a(this, p).fastStart == "object" && a(this, W).samples.length === a(this, p).fastStart.expectedAudioChunks)
      throw new Error(`Cannot add more audio chunks than specified in 'fastStart' (${a(this, p).fastStart.expectedAudioChunks}).`);
    let r = w(this, Te, He).call(this, a(this, W), e, t, s, i, n);
    if (a(this, p).fastStart === "fragmented" && a(this, A)) {
      for (; a(this, K).length > 0 && a(this, K)[0].timestamp <= r.timestamp; ) {
        let o = a(this, K).shift();
        w(this, V, X).call(this, a(this, A), o);
      }
      r.timestamp <= a(this, A).lastTimestamp ? w(this, V, X).call(this, a(this, W), r) : a(this, ee).push(r);
    } else
      w(this, V, X).call(this, a(this, W), r);
  }
  /** Finalizes the file, making it ready for use. Must be called after all video and audio chunks have been added. */
  finalize() {
    if (a(this, ce))
      throw new Error("Cannot finalize a muxer more than once.");
    if (a(this, p).fastStart === "fragmented") {
      for (let t of a(this, K))
        w(this, V, X).call(this, a(this, A), t);
      for (let t of a(this, ee))
        w(this, V, X).call(this, a(this, W), t);
      w(this, Oe, Ke).call(this, !1);
    } else
      a(this, A) && w(this, pe, Be).call(this, a(this, A)), a(this, W) && w(this, pe, Be).call(this, a(this, W));
    let e = [a(this, A), a(this, W)].filter(Boolean);
    if (a(this, p).fastStart === "in-memory") {
      let t;
      for (let i = 0; i < 2; i++) {
        let n = ye(e, a(this, re)), r = a(this, c).measureBox(n);
        t = a(this, c).measureBox(a(this, D));
        let o = a(this, c).pos + r + t;
        for (let l of a(this, oe)) {
          l.offset = o;
          for (let { data: h } of l.samples)
            o += h.byteLength, t += h.byteLength;
        }
        if (o < 2 ** 32)
          break;
        t >= 2 ** 32 && (a(this, D).largeSize = !0);
      }
      let s = ye(e, a(this, re));
      a(this, c).writeBox(s), a(this, D).size = t, a(this, c).writeBox(a(this, D));
      for (let i of a(this, oe))
        for (let n of i.samples)
          a(this, c).write(n.data), n.data = null;
    } else if (a(this, p).fastStart === "fragmented") {
      let t = a(this, c).pos, s = Ss(e);
      a(this, c).writeBox(s);
      let i = a(this, c).pos - t;
      a(this, c).seek(a(this, c).pos - 4), a(this, c).writeU32(i);
    } else {
      let t = a(this, c).offsets.get(a(this, D)), s = a(this, c).pos - t;
      a(this, D).size = s, a(this, D).largeSize = s >= 2 ** 32, a(this, c).patchBox(a(this, D));
      let i = ye(e, a(this, re));
      if (typeof a(this, p).fastStart == "object") {
        a(this, c).seek(a(this, Ie)), a(this, c).writeBox(i);
        let n = t - a(this, c).pos;
        a(this, c).writeBox(Ft(n));
      } else
        a(this, c).writeBox(i);
    }
    w(this, he, ge).call(this), a(this, c).finalize(), z(this, ce, !0);
  }
};
p = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
Ie = /* @__PURE__ */ new WeakMap();
D = /* @__PURE__ */ new WeakMap();
A = /* @__PURE__ */ new WeakMap();
W = /* @__PURE__ */ new WeakMap();
re = /* @__PURE__ */ new WeakMap();
oe = /* @__PURE__ */ new WeakMap();
Qe = /* @__PURE__ */ new WeakMap();
K = /* @__PURE__ */ new WeakMap();
ee = /* @__PURE__ */ new WeakMap();
ce = /* @__PURE__ */ new WeakMap();
xe = /* @__PURE__ */ new WeakSet();
mt = function(e) {
  if (e.video) {
    if (!Ws.includes(e.video.codec))
      throw new Error(`Unsupported video codec: ${e.video.codec}`);
    if (e.video.rotation !== void 0 && ![0, 90, 180, 270].includes(e.video.rotation))
      throw new Error(`Invalid video rotation: ${e.video.rotation}. Has to be 0, 90, 180 or 270.`);
  }
  if (e.audio && !Ps.includes(e.audio.codec))
    throw new Error(`Unsupported audio codec: ${e.audio.codec}`);
  if (e.firstTimestampBehavior && !Ds.includes(e.firstTimestampBehavior))
    throw new Error(`Invalid first timestamp behavior: ${e.firstTimestampBehavior}`);
  if (typeof e.fastStart == "object") {
    if (e.video && e.fastStart.expectedVideoChunks === void 0)
      throw new Error("'fastStart' is an object but is missing property 'expectedVideoChunks'.");
    if (e.audio && e.fastStart.expectedAudioChunks === void 0)
      throw new Error("'fastStart' is an object but is missing property 'expectedAudioChunks'.");
  } else if (![!1, "in-memory", "fragmented"].includes(e.fastStart))
    throw new Error("'fastStart' option must be false, 'in-memory', 'fragmented' or an object.");
};
Re = /* @__PURE__ */ new WeakSet();
gt = function() {
  var e;
  if (a(this, c).writeBox(Rt({
    holdsAvc: ((e = a(this, p).video) == null ? void 0 : e.codec) === "avc",
    fragmented: a(this, p).fastStart === "fragmented"
  })), z(this, Ie, a(this, c).pos), a(this, p).fastStart === "in-memory")
    z(this, D, Pe(!1));
  else if (a(this, p).fastStart !== "fragmented") {
    if (typeof a(this, p).fastStart == "object") {
      let t = w(this, Ge, vt).call(this);
      a(this, c).seek(a(this, c).pos + t);
    }
    z(this, D, Pe(!0)), a(this, c).writeBox(a(this, D));
  }
  w(this, he, ge).call(this);
};
Ge = /* @__PURE__ */ new WeakSet();
vt = function() {
  if (typeof a(this, p).fastStart != "object")
    return;
  let e = 0, t = [
    a(this, p).fastStart.expectedVideoChunks,
    a(this, p).fastStart.expectedAudioChunks
  ];
  for (let s of t)
    s && (e += 8 * Math.ceil(2 / 3 * s), e += 4 * s, e += 12 * Math.ceil(2 / 3 * s), e += 4 * s, e += 8 * s);
  return e += 4096, e;
};
Fe = /* @__PURE__ */ new WeakSet();
yt = function() {
  if (a(this, p).video && z(this, A, {
    id: 1,
    info: {
      type: "video",
      codec: a(this, p).video.codec,
      width: a(this, p).video.width,
      height: a(this, p).video.height,
      rotation: a(this, p).video.rotation ?? 0
    },
    timescale: 11520,
    // Timescale used by FFmpeg, contains many common frame rates as factors
    codecPrivate: new Uint8Array(0),
    samples: [],
    finalizedChunks: [],
    currentChunk: null,
    firstTimestamp: void 0,
    lastTimestamp: -1,
    timeToSampleTable: [],
    lastTimescaleUnits: null,
    lastSample: null,
    compactlyCodedChunkTable: []
  }), a(this, p).audio) {
    let e = w(this, Ze, wt).call(
      this,
      2,
      // Object type for AAC-LC, since it's the most common
      a(this, p).audio.sampleRate,
      a(this, p).audio.numberOfChannels
    );
    z(this, W, {
      id: a(this, p).video ? 2 : 1,
      info: {
        type: "audio",
        codec: a(this, p).audio.codec,
        numberOfChannels: a(this, p).audio.numberOfChannels,
        sampleRate: a(this, p).audio.sampleRate
      },
      timescale: a(this, p).audio.sampleRate,
      codecPrivate: e,
      samples: [],
      finalizedChunks: [],
      currentChunk: null,
      firstTimestamp: void 0,
      lastTimestamp: -1,
      timeToSampleTable: [],
      lastTimescaleUnits: null,
      lastSample: null,
      compactlyCodedChunkTable: []
    });
  }
};
Ze = /* @__PURE__ */ new WeakSet();
wt = function(e, t, s) {
  let n = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350].indexOf(t), r = s, o = "";
  o += e.toString(2).padStart(5, "0"), o += n.toString(2).padStart(4, "0"), n === 15 && (o += t.toString(2).padStart(24, "0")), o += r.toString(2).padStart(4, "0");
  let l = Math.ceil(o.length / 8) * 8;
  o = o.padEnd(l, "0");
  let h = new Uint8Array(o.length / 8);
  for (let f = 0; f < o.length; f += 8)
    h[f / 8] = parseInt(o.slice(f, f + 8), 2);
  return h;
};
Te = /* @__PURE__ */ new WeakSet();
He = function(e, t, s, i, n, r) {
  var f;
  let o = i / 1e6, l = n / 1e6;
  return o = w(this, Je, Ct).call(this, o, e), (f = r == null ? void 0 : r.decoderConfig) != null && f.description && (e.codecPrivate = new Uint8Array(r.decoderConfig.description)), {
    timestamp: o,
    duration: l,
    data: t,
    size: t.byteLength,
    type: s,
    // Will be refined once the next sample comes in
    timescaleUnitsToNextSample: Q(l, e.timescale)
  };
};
V = /* @__PURE__ */ new WeakSet();
X = function(e, t) {
  if (a(this, p).fastStart !== "fragmented" && e.samples.push(t), e.lastTimescaleUnits !== null) {
    let i = Q(t.timestamp, e.timescale, !1), n = Math.round(i - e.lastTimescaleUnits);
    if (e.lastTimescaleUnits += n, e.lastSample.timescaleUnitsToNextSample = n, a(this, p).fastStart !== "fragmented") {
      let r = ie(e.timeToSampleTable);
      r.sampleCount === 1 ? (r.sampleDelta = n, r.sampleCount++) : r.sampleDelta === n ? r.sampleCount++ : (r.sampleCount--, e.timeToSampleTable.push({
        sampleCount: 2,
        sampleDelta: n
      }));
    }
  } else
    e.lastTimescaleUnits = 0, a(this, p).fastStart !== "fragmented" && e.timeToSampleTable.push({
      sampleCount: 1,
      sampleDelta: Q(t.duration, e.timescale)
    });
  e.lastSample = t;
  let s = !1;
  if (!e.currentChunk)
    s = !0;
  else {
    let i = t.timestamp - e.currentChunk.startTimestamp;
    if (a(this, p).fastStart === "fragmented") {
      let n = a(this, A) ?? a(this, W);
      e === n && t.type === "key" && i >= 1 && (s = !0, w(this, Oe, Ke).call(this));
    } else
      s = i >= 0.5;
  }
  s && (e.currentChunk && w(this, pe, Be).call(this, e), e.currentChunk = {
    startTimestamp: t.timestamp,
    samples: []
  }), e.currentChunk.samples.push(t);
};
Je = /* @__PURE__ */ new WeakSet();
Ct = function(e, t) {
  if (a(this, p).firstTimestampBehavior === "strict" && t.lastTimestamp === -1 && e !== 0)
    throw new Error(
      `The first chunk for your media track must have a timestamp of 0 (received ${e}). Non-zero first timestamps are often caused by directly piping frames or audio data from a MediaStreamTrack into the encoder. Their timestamps are typically relative to the age of the document, which is probably what you want.

If you want to offset all timestamps of a track such that the first one is zero, set firstTimestampBehavior: 'offset' in the options.
`
    );
  if (a(this, p).firstTimestampBehavior === "offset" && (t.firstTimestamp === void 0 && (t.firstTimestamp = e), e -= t.firstTimestamp), e < t.lastTimestamp)
    throw new Error(
      `Timestamps must be monotonically increasing (went from ${t.lastTimestamp * 1e6} to ${e * 1e6}).`
    );
  return t.lastTimestamp = e, e;
};
pe = /* @__PURE__ */ new WeakSet();
Be = function(e) {
  if (a(this, p).fastStart === "fragmented")
    throw new Error("Can't finalize individual chunks 'fastStart' is set to 'fragmented'.");
  if (e.currentChunk) {
    if (e.finalizedChunks.push(e.currentChunk), a(this, oe).push(e.currentChunk), (e.compactlyCodedChunkTable.length === 0 || ie(e.compactlyCodedChunkTable).samplesPerChunk !== e.currentChunk.samples.length) && e.compactlyCodedChunkTable.push({
      firstChunk: e.finalizedChunks.length,
      // 1-indexed
      samplesPerChunk: e.currentChunk.samples.length
    }), a(this, p).fastStart === "in-memory") {
      e.currentChunk.offset = 0;
      return;
    }
    e.currentChunk.offset = a(this, c).pos;
    for (let t of e.currentChunk.samples)
      a(this, c).write(t.data), t.data = null;
    w(this, he, ge).call(this);
  }
};
Oe = /* @__PURE__ */ new WeakSet();
Ke = function(e = !0) {
  if (a(this, p).fastStart !== "fragmented")
    throw new Error("Can't finalize a fragment unless 'fastStart' is set to 'fragmented'.");
  let t = [a(this, A), a(this, W)].filter((l) => l && l.currentChunk);
  if (t.length === 0)
    return;
  let s = Dt(this, Qe)._++;
  if (s === 1) {
    let l = ye(t, a(this, re), !0);
    a(this, c).writeBox(l);
  }
  let i = a(this, c).pos, n = st(s, t);
  a(this, c).writeBox(n);
  {
    let l = Pe(!1), h = 0;
    for (let v of t)
      for (let d of v.currentChunk.samples)
        h += d.size;
    let f = a(this, c).measureBox(l) + h;
    f >= 2 ** 32 && (l.largeSize = !0, f = a(this, c).measureBox(l) + h), l.size = f, a(this, c).writeBox(l);
  }
  for (let l of t) {
    l.currentChunk.offset = a(this, c).pos, l.currentChunk.moofOffset = i;
    for (let h of l.currentChunk.samples)
      a(this, c).write(h.data), h.data = null;
  }
  let r = a(this, c).pos;
  a(this, c).seek(a(this, c).offsets.get(n));
  let o = st(s, t);
  a(this, c).writeBox(o), a(this, c).seek(r);
  for (let l of t)
    l.finalizedChunks.push(l.currentChunk), a(this, oe).push(l.currentChunk), l.currentChunk = null;
  e && w(this, he, ge).call(this);
};
he = /* @__PURE__ */ new WeakSet();
ge = function() {
  a(this, c) instanceof dt && a(this, c).flush();
};
be = /* @__PURE__ */ new WeakSet();
Ve = function() {
  if (a(this, ce))
    throw new Error("Cannot add new video or audio chunks after the file has been finalized.");
};
const it = [], at = (e) => {
  e <= 0 && (e = 0), e = Math.round(e / 1e3);
  const t = Math.floor(e / 60), s = e - t * 60;
  return `${t}:${s > 9 ? "" : "0"}${s}`;
};
class xs {
  constructor(t) {
    this.canvas = null, this.ctx = null, this.data = null, this.timestamp = 0, this.playing = !0, this.loop = !0, this.events = [], this.saves = {}, this.audioContext = new AudioContext(), this.audioStream = this.audioContext.createMediaStreamDestination(), this.audios = [], this.corsURL = (s) => s, this.update(), Object.assign(this, t), window.render = this;
  }
  setElement(t) {
    this.setCanvas(), t && (t.appendChild(this.canvas), this.setControls(t));
  }
  setCanvas(t) {
    this.canvas = t || document.createElement("canvas"), this.ctx = this.canvas.getContext("2d", { desynchronized: !0 }), this.canvas.style.width = "100%", this.canvas.style.height = "100%";
  }
  setControls(t) {
    t.style.position = "relative";
    const s = document.createElement("div");
    s.style.position = "absolute", s.style.display = "flex", s.style.justifyContent = "flex-end", s.style.flexDirection = "column", s.style.gap = "5px", s.style.width = "100%", s.style.height = "100%", s.style.bottom = 0, s.style.left = 0, s.style.color = "white", s.style.padding = "10px", s.style.boxSizing = "border-box", s.style.background = "linear-gradient(180deg, rgba(0,0,0,0) 80%, rgba(0,0,0,1) 100%)", s.addEventListener("click", (b) => this.playing = !this.playing), s.style.transition = "opacity 200ms ease-in-out 0ms", s.style.opacity = 0, s.addEventListener("mouseover", () => s.style.opacity = 100), s.addEventListener("mouseout", () => s.style.opacity = 0), t.style.fontFamily = 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', t.appendChild(s);
    const i = document.createElement("div");
    i.style.display = "flex", i.style.justifyContent = "space-between", s.appendChild(i);
    const n = document.createElement("div");
    n.style.display = "flex", n.style.alignItems = "center", n.style.gap = "5px", i.appendChild(n);
    const r = document.createElement("div");
    r.style.display = "flex", i.appendChild(r);
    const o = document.createElement("div");
    o.style.padding = "10px", o.style.marginLeft = "-5px", o.style.marginBottom = "-10px", o.style.cursor = "pointer", o.appendChild(document.createElement("svg")), o.addEventListener("click", () => this.playing = !this.playing), n.appendChild(o);
    const l = document.createElement("div");
    l.style.userSelect = "none", l.style.marginBottom = "-10px", l.style.fontSize = "15px", n.appendChild(l);
    const h = document.createElement("div");
    h.style.padding = "10px", h.style.marginRight = "-5px", h.style.marginBottom = "-10px", h.innerHTML = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15 9h4l-7 7-7-7h4V3h6v6ZM5 20v-2h14v2H5Z" clip-rule="evenodd"></path></svg>', h.style.cursor = "pointer", h.addEventListener("click", () => this.exportMP4()), r.appendChild(h);
    const f = document.createElement("div");
    f.style.height = "5px", f.style.width = "100%", f.style.backgroundColor = "rgb(150, 150, 150)", f.style.borderRadius = "10px", f.style.overflow = "hidden";
    const v = (b) => {
      const m = b.currentTarget.getBoundingClientRect(), y = b.clientX - m.left;
      this.setTimestamp(y / b.currentTarget.offsetWidth * this.duration);
    };
    f.addEventListener("pointerdown", (b) => {
      b.preventDefault(), f.pointerisdown = !0, f.playing = this.playing, this.playing = !1, v(b);
    }), document.addEventListener("pointerup", (b) => {
      f.pointerisdown && (f.pointerisdown = !1, this.playing = f.playing);
    }), f.addEventListener("pointermove", (b) => {
      b.preventDefault(), f.pointerisdown && v(b);
    });
    const d = document.createElement("div");
    d.style.height = "100%", d.style.width = "50%", d.style.backgroundColor = "rgb(255, 255, 255)", d.style.pointerEvents = "none", f.appendChild(d), s.appendChild(f), this.UI = { play: o, timer: l, download: h, controls: s, parent: t, progress: f, progressBar: d };
  }
  updateUI() {
    this.UI && this.data && (this.UI.timer.innerText = `${at(this.timestamp)} / ${at(this.duration)}`, this.UI.progressBar.style.width = `${this.timestamp / this.duration * 100}%`, this.rendering ? this.UI.parent.style.filter = "grayscale() blur(5px)" : this.UI.parent.style.filter = "", this.playing ? this.UI.play.firstChild.innerHTML = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7L8 5Z"></path></svg>' : this.UI.play.firstChild.innerHTML = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 19H6V5h4v14Zm4 0V5h4v14h-4Z" clip-rule="evenodd"></path></svg>');
  }
  export() {
    return new Promise(async (t, s) => {
      let i = this.playing;
      this.playing = !1;
      try {
        const n = this.getFlattenElements(this.data).filter((v) => ["audio", "video"].includes(v.type)), r = n.length > 0;
        let o = new Ls({
          target: new ht(),
          video: {
            codec: "avc",
            width: this.canvas.width,
            height: this.canvas.height
          },
          audio: r ? {
            codec: "opus",
            numberOfChannels: 2,
            sampleRate: 44100
          } : null,
          firstTimestampBehavior: "offset",
          fastStart: "in-memory"
        });
        if (r)
          try {
            let v = new AudioEncoder({
              output: (m, y) => o.addAudioChunk(m, y),
              error: (m) => console.error(m)
            });
            v.configure({
              codec: "opus",
              sampleRate: 44100,
              numberOfChannels: 2,
              bitrate: 128e3
            });
            const d = [], b = new AudioContext();
            for (let m of n)
              try {
                const O = await (await fetch(m.data.src)).arrayBuffer(), S = new AudioContext(), _ = await S.decodeAudioData(O), C = (m.start || 0) / 1e3, E = (m.duration || 0) / 1e3, I = (m.data.trim || 0) / 1e3, R = Math.round(C * _.sampleRate), P = Math.round(E * _.sampleRate), G = Math.round(I * _.sampleRate), ae = Math.min(G, P), ve = S.createBuffer(
                  _.numberOfChannels,
                  R + P - ae,
                  _.sampleRate
                );
                for (let Y = 0; Y < _.numberOfChannels; Y++) {
                  const q = _.getChannelData(Y);
                  ve.getChannelData(Y).set(q.slice(ae, ae + P - ae), R);
                }
                d.push(ve);
              } catch {
              }
            if (d.length > 0) {
              const m = d[0].sampleRate, y = d[0].numberOfChannels, O = Math.round(this.duration / 1e3 * m), S = b.createBuffer(y, O, m);
              for (let E = 0; E < O; E++)
                for (let I = 0; I < y; I++) {
                  let R = 0;
                  for (let P = 0; P < d.length; P++) {
                    const G = d[P];
                    E < G.length && (R += G.getChannelData(I)[E]);
                  }
                  S.getChannelData(I)[E] = R;
                }
              const _ = new Float32Array(S.length * y);
              for (let E = 0; E < y; E++) {
                const I = S.getChannelData(E);
                _.set(I, E * S.length);
              }
              const C = new AudioData({
                format: "f32-planar",
                sampleRate: S.sampleRate,
                numberOfFrames: S.length,
                numberOfChannels: y,
                timestamp: 0,
                data: _
              });
              v.encode(C), await v.flush();
            }
          } catch {
          }
        let l = new VideoEncoder({
          output: (v, d) => o.addVideoChunk(v, d),
          error: (v) => console.error(v)
        });
        l.configure({
          avc: { format: "avc" },
          codec: "avc1.640034",
          width: this.canvas.width,
          height: this.canvas.height,
          bitrate: 5e6
        });
        const h = 1e3 / this.data.settings.fps * 1 || 30;
        this.rendering = !0;
        for (let v = 0; v <= Math.floor(this.duration / h); v++) {
          v % 10 == 0 && await new Promise((b) => setTimeout(b, 0)), this.emit("rendering", { progress: v * h / this.duration }), await this.setTimestamp(v * h);
          const d = new VideoFrame(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data.buffer, {
            format: "RGBA",
            codedWidth: this.canvas.width,
            codedHeight: this.canvas.height,
            timestamp: v * h * 1e3,
            duration: h
          });
          l.encode(d);
        }
        this.rendering = !1, await l.flush(), o.finalize();
        let { buffer: f } = o.target;
        t(new Blob([f], { type: "video/mp4" }));
      } catch (n) {
        s(n);
      }
      this.playing = i;
    });
  }
  exportPNG(t = "image/png", s = "1") {
    return new Promise((i) => this.canvas.toBlob((n) => i(n), t, s));
  }
  exportMP4(t = "smooth-video.mp4") {
    this.export().then((s) => {
      const i = document.createElement("a");
      i.href = URL.createObjectURL(s), i.download = t, i.click();
    });
  }
  stop() {
    this.stopMedia(), this.playing = !1, this.stopped = !0;
  }
  get duration() {
    return !this.data || !this.data.elements || this.data.elements.length == 0 ? 0 : Math.max(...this.data.elements.map((t) => t.start + t.duration)) || 0;
  }
  on(t) {
    this.events.push(t);
  }
  emit(t, s) {
    this.events.forEach((i) => i(t, s));
  }
  async setTimestamp(t) {
    this.timestamp = t, await this.render();
  }
  resetMedia() {
    this.getFlattenElements(this.data).filter((t) => ["video", "audio"].includes(t.type)).filter((t) => t.start > this.timestamp || t.start + t.duration < this.timestamp).forEach((t) => {
      t.data.element && (t.data.element.volume = 0);
    });
  }
  stopMedia() {
    this.getFlattenElements(this.data).filter((t) => ["video", "audio"].includes(t.type)).forEach((t) => {
      var s, i;
      return (i = (s = t.data) == null ? void 0 : s.element) == null ? void 0 : i.pause();
    });
  }
  set(t) {
    return new Promise(async (s, i) => {
      if (!t)
        return i();
      const n = t;
      if (!n)
        return i();
      try {
        await this.load(n), this.data = n, this.render(), s();
      } catch {
        i();
      }
    });
  }
  load(t) {
    return new Promise((s) => Promise.allSettled(this.getFlattenElements(t).map((i) => this.loadElement(i))).then(s));
  }
  getFlattenElements(t) {
    if (!t || !t.elements)
      return [];
    let s = [...t.elements], i = [];
    for (; s.length > 0; ) {
      const n = s[0];
      i.push(n), s.shift(), n.data.elements && (s = [
        ...s,
        ...n.data.elements.map((r) => ({
          ...r,
          start: r.start + n.start
        }))
      ]);
    }
    return i;
  }
  loadElement(t) {
    return new Promise((s, i) => {
      if (this.saves[t.data.src])
        return t.data.element = this.saves[t.data.src], s();
      switch (t.type) {
        case "text":
          this.loadFont(t.data.font).then(() => s());
          break;
        case "image":
          this.loadImage(t.data.src).then((n) => {
            t.data.element = n, this.saves[t.data.src] = n;
          }).finally(s);
          break;
        case "video":
          if (t.data.element)
            return s();
          this.loadVideo(t.data.src).then((n) => {
            t.data.element = n, this.saves[t.data.src] = n;
            const r = this.audioContext.createMediaElementSource(n);
            r.connect(this.audioContext.destination), this.audios.push(r);
          }).finally(s);
          break;
        case "audio":
          this.loadAudio(t.data.src).then((n) => {
            t.data.element = n, this.saves[t.data.src] = n;
            const r = this.audioContext.createMediaElementSource(n);
            r.connect(this.audioContext.destination), this.audios.push(r);
          }).finally(s);
          break;
        default:
          s();
      }
    });
  }
  loadFont(t) {
    return new Promise((s) => {
      if (!t || typeof t != "string")
        return s();
      const i = t.replace(/[0-9.-:\/]*/gm, "");
      if (!it.includes(i))
        new FontFace(i, `url(${t})`).load().then((n) => {
          document.fonts.add(n), it.push(i);
        }).finally(s);
      else
        return s();
    });
  }
  loadImage(t, s) {
    return new Promise((i, n) => {
      const r = new Image();
      r.src = t, r.crossOrigin = "anonymous", r.addEventListener("load", () => i(r)), r.addEventListener("error", () => {
        s ? n() : this.loadImage(this.corsURL(t), !0).then(i).catch(n);
      });
    });
  }
  loadVideo(t, s) {
    return new Promise((i, n) => {
      const r = document.createElement("video");
      r.src = t, r.crossOrigin = "anonymous", r.addEventListener("loadeddata", () => i(r)), r.addEventListener("error", () => {
        s ? n() : this.loadVideo(this.corsURL(t), !0).then(i).catch(n);
      });
    });
  }
  loadAudio(t, s) {
    return new Promise((i, n) => {
      const r = document.createElement("audio");
      r.src = t, r.crossOrigin = "anonymous", r.addEventListener("loadeddata", () => i(r)), s || r.addEventListener("error", () => this.loadAudio(this.corsURL(t), !0).then((o) => i(o)));
    });
  }
  update() {
    if (this.stopped || (requestAnimationFrame(() => this.update()), this.rendering))
      return;
    this.audioContext.state == "suspended" && window.hasEventDone && this.audioContext.resume();
    const t = Date.now();
    this.tick || (this.tick = t), this.playing && (this.timestamp += t - this.tick), this.timestamp > this.duration && (this.loop ? this.setTimestamp(0) : (this.playing = !1, this.setTimestamp(this.duration))), this.resetMedia(), this.render(), this.tick = t;
  }
  resize() {
    this.canvas.height = Math.ceil(this.data.settings.height * 1), this.canvas.width = Math.ceil(this.data.settings.width * 1);
  }
  async render() {
    if (!this.canvas || !this.ctx || !this.data)
      return;
    this.updateUI(), this.emit("render", { progress: this.timestamp / this.duration, timestamp: this.timestamp, duration: this.duration }), this.resize(), this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.save(), this.ctx.fillStyle = this.data.settings.color || "#ffffff", this.ctx.fillRect(0, 0, this.data.settings.width, this.data.settings.height);
    const t = this.data.elements.filter((s) => s.start <= this.timestamp && s.start + s.duration > this.timestamp);
    for (let s of t)
      await this.renderElement(s);
    this.ctx.restore();
  }
  async renderElement(t) {
    if (!Me[t.type])
      return;
    const s = this.getElementData(t);
    this.ctx.save(), await Me[t.type](
      {
        canvas: this.canvas,
        ctx: this.ctx,
        timestamp: this.timestamp,
        dTimestamp: this.timestamp - t.start,
        playing: this.playing,
        rendering: this.rendering
      },
      s,
      t.animations
    ), this.ctx.restore();
  }
  getElementData(t) {
    var s;
    return $e(
      this.timestamp,
      (s = t.animations) == null ? void 0 : s.filter((i) => !i.type),
      t.data,
      t
    );
  }
}
export {
  xs as default
};
