import { w as ln, c as W } from "./path-428ebac9.js";
import { aW as an, aX as $, aY as w, aZ as rn, a_ as y, V as on, a$ as B, b0 as _, b1 as un, b2 as t, b3 as sn, b4 as tn, b5 as fn } from "./mermaid-c2fb2af7.js";
function cn(l) {
  return l.innerRadius;
}
function yn(l) {
  return l.outerRadius;
}
function gn(l) {
  return l.startAngle;
}
function mn(l) {
  return l.endAngle;
}
function pn(l) {
  return l && l.padAngle;
}
function dn(l, h, E, q, v, A, X, a) {
  var I = E - l, i = q - h, n = X - v, m = a - A, r = m * I - n * i;
  if (!(r * r < y))
    return r = (n * (h - A) - m * (l - v)) / r, [l + r * I, h + r * i];
}
function K(l, h, E, q, v, A, X) {
  var a = l - E, I = h - q, i = (X ? A : -A) / B(a * a + I * I), n = i * I, m = -i * a, r = l + n, s = h + m, f = E + n, c = q + m, Y = (r + f) / 2, o = (s + c) / 2, p = f - r, g = c - s, R = p * p + g * g, T = v - A, b = r * c - f * s, O = (g < 0 ? -1 : 1) * B(fn(0, T * T * R - b * b)), S = (b * g - p * O) / R, V = (-b * p - g * O) / R, P = (b * g + p * O) / R, d = (-b * p + g * O) / R, x = S - Y, e = V - o, u = P - Y, Z = d - o;
  return x * x + e * e > u * u + Z * Z && (S = P, V = d), {
    cx: S,
    cy: V,
    x01: -n,
    y01: -m,
    x11: S * (v / T - 1),
    y11: V * (v / T - 1)
  };
}
function vn() {
  var l = cn, h = yn, E = W(0), q = null, v = gn, A = mn, X = pn, a = null, I = ln(i);
  function i() {
    var n, m, r = +l.apply(this, arguments), s = +h.apply(this, arguments), f = v.apply(this, arguments) - rn, c = A.apply(this, arguments) - rn, Y = un(c - f), o = c > f;
    if (a || (a = n = I()), s < r && (m = s, s = r, r = m), !(s > y))
      a.moveTo(0, 0);
    else if (Y > on - y)
      a.moveTo(s * $(f), s * w(f)), a.arc(0, 0, s, f, c, !o), r > y && (a.moveTo(r * $(c), r * w(c)), a.arc(0, 0, r, c, f, o));
    else {
      var p = f, g = c, R = f, T = c, b = Y, O = Y, S = X.apply(this, arguments) / 2, V = S > y && (q ? +q.apply(this, arguments) : B(r * r + s * s)), P = _(un(s - r) / 2, +E.apply(this, arguments)), d = P, x = P, e, u;
      if (V > y) {
        var Z = sn(V / r * w(S)), C = sn(V / s * w(S));
        (b -= Z * 2) > y ? (Z *= o ? 1 : -1, R += Z, T -= Z) : (b = 0, R = T = (f + c) / 2), (O -= C * 2) > y ? (C *= o ? 1 : -1, p += C, g -= C) : (O = 0, p = g = (f + c) / 2);
      }
      var j = s * $(p), z = s * w(p), F = r * $(T), G = r * w(T);
      if (P > y) {
        var H = s * $(g), J = s * w(g), L = r * $(R), M = r * w(R), D;
        if (Y < an)
          if (D = dn(j, z, L, M, H, J, F, G)) {
            var N = j - D[0], Q = z - D[1], U = H - D[0], k = J - D[1], nn = 1 / w(tn((N * U + Q * k) / (B(N * N + Q * Q) * B(U * U + k * k))) / 2), en = B(D[0] * D[0] + D[1] * D[1]);
            d = _(P, (r - en) / (nn - 1)), x = _(P, (s - en) / (nn + 1));
          } else
            d = x = 0;
      }
      O > y ? x > y ? (e = K(L, M, j, z, s, x, o), u = K(H, J, F, G, s, x, o), a.moveTo(e.cx + e.x01, e.cy + e.y01), x < P ? a.arc(e.cx, e.cy, x, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, x, t(e.y01, e.x01), t(e.y11, e.x11), !o), a.arc(0, 0, s, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), !o), a.arc(u.cx, u.cy, x, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : (a.moveTo(j, z), a.arc(0, 0, s, p, g, !o)) : a.moveTo(j, z), !(r > y) || !(b > y) ? a.lineTo(F, G) : d > y ? (e = K(F, G, H, J, r, -d, o), u = K(j, z, L, M, r, -d, o), a.lineTo(e.cx + e.x01, e.cy + e.y01), d < P ? a.arc(e.cx, e.cy, d, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, d, t(e.y01, e.x01), t(e.y11, e.x11), !o), a.arc(0, 0, r, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), o), a.arc(u.cx, u.cy, d, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : a.arc(0, 0, r, T, R, o);
    }
    if (a.closePath(), n)
      return a = null, n + "" || null;
  }
  return i.centroid = function() {
    var n = (+l.apply(this, arguments) + +h.apply(this, arguments)) / 2, m = (+v.apply(this, arguments) + +A.apply(this, arguments)) / 2 - an / 2;
    return [$(m) * n, w(m) * n];
  }, i.innerRadius = function(n) {
    return arguments.length ? (l = typeof n == "function" ? n : W(+n), i) : l;
  }, i.outerRadius = function(n) {
    return arguments.length ? (h = typeof n == "function" ? n : W(+n), i) : h;
  }, i.cornerRadius = function(n) {
    return arguments.length ? (E = typeof n == "function" ? n : W(+n), i) : E;
  }, i.padRadius = function(n) {
    return arguments.length ? (q = n == null ? null : typeof n == "function" ? n : W(+n), i) : q;
  }, i.startAngle = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : W(+n), i) : v;
  }, i.endAngle = function(n) {
    return arguments.length ? (A = typeof n == "function" ? n : W(+n), i) : A;
  }, i.padAngle = function(n) {
    return arguments.length ? (X = typeof n == "function" ? n : W(+n), i) : X;
  }, i.context = function(n) {
    return arguments.length ? (a = n ?? null, i) : a;
  }, i;
}
export {
  vn as d
};
