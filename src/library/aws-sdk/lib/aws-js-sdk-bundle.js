/*! For license information please see aws-js-sdk-bundle.js.LICENSE.txt */
var webpacksts;
(()=>{
    var e = {
        260: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        665: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        470: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        969: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        287: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.isMsWindow = void 0;
            var n = ["decrypt", "digest", "encrypt", "exportKey", "generateKey", "importKey", "sign", "verify"];
            t.isMsWindow = function(e) {
                if (function(e) {
                    return "MSInputMethodContext"in e && "msCrypto"in e
                }(e) && void 0 !== e.msCrypto.subtle) {
                    var t = e.msCrypto
                      , r = t.getRandomValues
                      , i = t.subtle;
                    return n.map((function(e) {
                        return i[e]
                    }
                    )).concat(r).every((function(e) {
                        return "function" == typeof e
                    }
                    ))
                }
                return !1
            }
        }
        ,
        87: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(980);
            r.__exportStar(n(260), t),
            r.__exportStar(n(665), t),
            r.__exportStar(n(470), t),
            r.__exportStar(n(969), t),
            r.__exportStar(n(287), t)
        }
        ,
        980: (e,t,n)=>{
            "use strict";
            n.r(t),
            n.d(t, {
                __assign: ()=>o,
                __asyncDelegator: ()=>w,
                __asyncGenerator: ()=>v,
                __asyncValues: ()=>S,
                __await: ()=>b,
                __awaiter: ()=>l,
                __classPrivateFieldGet: ()=>x,
                __classPrivateFieldSet: ()=>_,
                __createBinding: ()=>f,
                __decorate: ()=>a,
                __exportStar: ()=>p,
                __extends: ()=>i,
                __generator: ()=>d,
                __importDefault: ()=>A,
                __importStar: ()=>P,
                __makeTemplateObject: ()=>E,
                __metadata: ()=>c,
                __param: ()=>u,
                __read: ()=>g,
                __rest: ()=>s,
                __spread: ()=>m,
                __spreadArrays: ()=>y,
                __values: ()=>h
            });
            var r = function(e, t) {
                return r = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                ,
                r(e, t)
            };
            function i(e, t) {
                function n() {
                    this.constructor = e
                }
                r(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            var o = function() {
                return o = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var i in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e
                }
                ,
                o.apply(this, arguments)
            };
            function s(e, t) {
                var n = {};
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                    var i = 0;
                    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                        t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
                }
                return n
            }
            function a(e, t, n, r) {
                var i, o = arguments.length, s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    s = Reflect.decorate(e, t, n, r);
                else
                    for (var a = e.length - 1; a >= 0; a--)
                        (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
                return o > 3 && s && Object.defineProperty(t, n, s),
                s
            }
            function u(e, t) {
                return function(n, r) {
                    t(n, r, e)
                }
            }
            function c(e, t) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(e, t)
            }
            function l(e, t, n, r) {
                return new (n || (n = Promise))((function(i, o) {
                    function s(e) {
                        try {
                            u(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function a(e) {
                        try {
                            u(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function u(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function(e) {
                            e(t)
                        }
                        ))).then(s, a)
                    }
                    u((r = r.apply(e, t || [])).next())
                }
                ))
            }
            function d(e, t) {
                var n, r, i, o, s = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0])
                            throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                },
                "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }
                ),
                o;
                function a(o) {
                    return function(a) {
                        return function(o) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s; )
                                try {
                                    if (n = 1,
                                    r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                                    0) : r.next) && !(i = i.call(r, o[1])).done)
                                        return i;
                                    switch (r = 0,
                                    i && (o = [2 & o[0], i.value]),
                                    o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++,
                                        {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = o[1],
                                        o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!((i = (i = s.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1],
                                            i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2],
                                            s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    o = t.call(e, s)
                                } catch (e) {
                                    o = [6, e],
                                    r = 0
                                } finally {
                                    n = i = 0
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            }
            function f(e, t, n, r) {
                void 0 === r && (r = n),
                e[r] = t[n]
            }
            function p(e, t) {
                for (var n in e)
                    "default" === n || t.hasOwnProperty(n) || (t[n] = e[n])
            }
            function h(e) {
                var t = "function" == typeof Symbol && Symbol.iterator
                  , n = t && e[t]
                  , r = 0;
                if (n)
                    return n.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function() {
                            return e && r >= e.length && (e = void 0),
                            {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
            function g(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n)
                    return e;
                var r, i, o = n.call(e), s = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
                        s.push(r.value)
                } catch (e) {
                    i = {
                        error: e
                    }
                } finally {
                    try {
                        r && !r.done && (n = o.return) && n.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return s
            }
            function m() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e = e.concat(g(arguments[t]));
                return e
            }
            function y() {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                    e += arguments[t].length;
                var r = Array(e)
                  , i = 0;
                for (t = 0; t < n; t++)
                    for (var o = arguments[t], s = 0, a = o.length; s < a; s++,
                    i++)
                        r[i] = o[s];
                return r
            }
            function b(e) {
                return this instanceof b ? (this.v = e,
                this) : new b(e)
            }
            function v(e, t, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var r, i = n.apply(e, t || []), o = [];
                return r = {},
                s("next"),
                s("throw"),
                s("return"),
                r[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                r;
                function s(e) {
                    i[e] && (r[e] = function(t) {
                        return new Promise((function(n, r) {
                            o.push([e, t, n, r]) > 1 || a(e, t)
                        }
                        ))
                    }
                    )
                }
                function a(e, t) {
                    try {
                        (n = i[e](t)).value instanceof b ? Promise.resolve(n.value.v).then(u, c) : l(o[0][2], n)
                    } catch (e) {
                        l(o[0][3], e)
                    }
                    var n
                }
                function u(e) {
                    a("next", e)
                }
                function c(e) {
                    a("throw", e)
                }
                function l(e, t) {
                    e(t),
                    o.shift(),
                    o.length && a(o[0][0], o[0][1])
                }
            }
            function w(e) {
                var t, n;
                return t = {},
                r("next"),
                r("throw", (function(e) {
                    throw e
                }
                )),
                r("return"),
                t[Symbol.iterator] = function() {
                    return this
                }
                ,
                t;
                function r(r, i) {
                    t[r] = e[r] ? function(t) {
                        return (n = !n) ? {
                            value: b(e[r](t)),
                            done: "return" === r
                        } : i ? i(t) : t
                    }
                    : i
                }
            }
            function S(e) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var t, n = e[Symbol.asyncIterator];
                return n ? n.call(e) : (e = h(e),
                t = {},
                r("next"),
                r("throw"),
                r("return"),
                t[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                t);
                function r(n) {
                    t[n] = e[n] && function(t) {
                        return new Promise((function(r, i) {
                            !function(e, t, n, r) {
                                Promise.resolve(r).then((function(t) {
                                    e({
                                        value: t,
                                        done: n
                                    })
                                }
                                ), t)
                            }(r, i, (t = e[n](t)).done, t.value)
                        }
                        ))
                    }
                }
            }
            function E(e, t) {
                return Object.defineProperty ? Object.defineProperty(e, "raw", {
                    value: t
                }) : e.raw = t,
                e
            }
            function P(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }
            function A(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function x(e, t) {
                if (!t.has(e))
                    throw new TypeError("attempted to get private field on non-instance");
                return t.get(e)
            }
            function _(e, t, n) {
                if (!t.has(e))
                    throw new TypeError("attempted to set private field on non-instance");
                return t.set(e, n),
                n
            }
        }
        ,
        333: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.EMPTY_DATA_SHA_256 = t.SHA_256_HMAC_ALGO = t.SHA_256_HASH = void 0,
            t.SHA_256_HASH = {
                name: "SHA-256"
            },
            t.SHA_256_HMAC_ALGO = {
                name: "HMAC",
                hash: t.SHA_256_HASH
            },
            t.EMPTY_DATA_SHA_256 = new Uint8Array([227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85])
        }
        ,
        769: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.Sha256 = void 0;
            var r = n(479)
              , i = n(889)
              , o = n(938)
              , s = n(21)
              , a = n(87)
              , u = n(495)
              , c = function() {
                function e(e) {
                    (0,
                    s.supportsWebCrypto)((0,
                    u.locateWindow)()) ? this.hash = new i.Sha256(e) : (0,
                    a.isMsWindow)((0,
                    u.locateWindow)()) ? this.hash = new r.Sha256(e) : this.hash = new o.Sha256(e)
                }
                return e.prototype.update = function(e, t) {
                    this.hash.update(e, t)
                }
                ,
                e.prototype.digest = function() {
                    return this.hash.digest()
                }
                ,
                e
            }();
            t.Sha256 = c
        }
        ,
        479: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.Sha256 = void 0;
            var r = n(36)
              , i = n(333)
              , o = n(84)
              , s = n(495)
              , a = function() {
                function e(e) {
                    e ? (this.operation = function(e) {
                        return new Promise((function(t, n) {
                            var r = (0,
                            s.locateWindow)().msCrypto.subtle.importKey("raw", u(e), i.SHA_256_HMAC_ALGO, !1, ["sign"]);
                            r.oncomplete = function() {
                                r.result && t(r.result),
                                n(new Error("ImportKey completed without importing key."))
                            }
                            ,
                            r.onerror = function() {
                                n(new Error("ImportKey failed to import key."))
                            }
                        }
                        ))
                    }(e).then((function(e) {
                        return (0,
                        s.locateWindow)().msCrypto.subtle.sign(i.SHA_256_HMAC_ALGO, e)
                    }
                    )),
                    this.operation.catch((function() {}
                    ))) : this.operation = Promise.resolve((0,
                    s.locateWindow)().msCrypto.subtle.digest("SHA-256"))
                }
                return e.prototype.update = function(e) {
                    var t = this;
                    (0,
                    r.isEmptyData)(e) || (this.operation = this.operation.then((function(n) {
                        return n.onerror = function() {
                            t.operation = Promise.reject(new Error("Error encountered updating hash"))
                        }
                        ,
                        n.process(u(e)),
                        n
                    }
                    )),
                    this.operation.catch((function() {}
                    )))
                }
                ,
                e.prototype.digest = function() {
                    return this.operation.then((function(e) {
                        return new Promise((function(t, n) {
                            e.onerror = function() {
                                n(new Error("Error encountered finalizing hash"))
                            }
                            ,
                            e.oncomplete = function() {
                                e.result && t(new Uint8Array(e.result)),
                                n(new Error("Error encountered finalizing hash"))
                            }
                            ,
                            e.finish()
                        }
                        ))
                    }
                    ))
                }
                ,
                e
            }();
            function u(e) {
                return "string" == typeof e ? (0,
                o.fromUtf8)(e) : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer,e.byteOffset,e.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(e)
            }
            t.Sha256 = a
        }
        ,
        643: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.WebCryptoSha256 = t.Ie11Sha256 = void 0,
            (0,
            n(789).__exportStar)(n(769), t);
            var r = n(479);
            Object.defineProperty(t, "Ie11Sha256", {
                enumerable: !0,
                get: function() {
                    return r.Sha256
                }
            });
            var i = n(889);
            Object.defineProperty(t, "WebCryptoSha256", {
                enumerable: !0,
                get: function() {
                    return i.Sha256
                }
            })
        }
        ,
        36: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.isEmptyData = void 0,
            t.isEmptyData = function(e) {
                return "string" == typeof e ? 0 === e.length : 0 === e.byteLength
            }
        }
        ,
        889: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.Sha256 = void 0;
            var r = n(658)
              , i = n(333)
              , o = n(495)
              , s = function() {
                function e(e) {
                    this.toHash = new Uint8Array(0),
                    void 0 !== e && (this.key = new Promise((function(t, n) {
                        (0,
                        o.locateWindow)().crypto.subtle.importKey("raw", (0,
                        r.convertToBuffer)(e), i.SHA_256_HMAC_ALGO, !1, ["sign"]).then(t, n)
                    }
                    )),
                    this.key.catch((function() {}
                    )))
                }
                return e.prototype.update = function(e) {
                    if (!(0,
                    r.isEmptyData)(e)) {
                        var t = (0,
                        r.convertToBuffer)(e)
                          , n = new Uint8Array(this.toHash.byteLength + t.byteLength);
                        n.set(this.toHash, 0),
                        n.set(t, this.toHash.byteLength),
                        this.toHash = n
                    }
                }
                ,
                e.prototype.digest = function() {
                    var e = this;
                    return this.key ? this.key.then((function(t) {
                        return (0,
                        o.locateWindow)().crypto.subtle.sign(i.SHA_256_HMAC_ALGO, t, e.toHash).then((function(e) {
                            return new Uint8Array(e)
                        }
                        ))
                    }
                    )) : (0,
                    r.isEmptyData)(this.toHash) ? Promise.resolve(i.EMPTY_DATA_SHA_256) : Promise.resolve().then((function() {
                        return (0,
                        o.locateWindow)().crypto.subtle.digest(i.SHA_256_HASH, e.toHash)
                    }
                    )).then((function(e) {
                        return Promise.resolve(new Uint8Array(e))
                    }
                    ))
                }
                ,
                e
            }();
            t.Sha256 = s
        }
        ,
        789: (e,t,n)=>{
            "use strict";
            n.r(t),
            n.d(t, {
                __assign: ()=>o,
                __asyncDelegator: ()=>w,
                __asyncGenerator: ()=>v,
                __asyncValues: ()=>S,
                __await: ()=>b,
                __awaiter: ()=>l,
                __classPrivateFieldGet: ()=>x,
                __classPrivateFieldSet: ()=>_,
                __createBinding: ()=>f,
                __decorate: ()=>a,
                __exportStar: ()=>p,
                __extends: ()=>i,
                __generator: ()=>d,
                __importDefault: ()=>A,
                __importStar: ()=>P,
                __makeTemplateObject: ()=>E,
                __metadata: ()=>c,
                __param: ()=>u,
                __read: ()=>g,
                __rest: ()=>s,
                __spread: ()=>m,
                __spreadArrays: ()=>y,
                __values: ()=>h
            });
            var r = function(e, t) {
                return r = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                ,
                r(e, t)
            };
            function i(e, t) {
                function n() {
                    this.constructor = e
                }
                r(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            var o = function() {
                return o = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var i in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e
                }
                ,
                o.apply(this, arguments)
            };
            function s(e, t) {
                var n = {};
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                    var i = 0;
                    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                        t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
                }
                return n
            }
            function a(e, t, n, r) {
                var i, o = arguments.length, s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    s = Reflect.decorate(e, t, n, r);
                else
                    for (var a = e.length - 1; a >= 0; a--)
                        (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
                return o > 3 && s && Object.defineProperty(t, n, s),
                s
            }
            function u(e, t) {
                return function(n, r) {
                    t(n, r, e)
                }
            }
            function c(e, t) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(e, t)
            }
            function l(e, t, n, r) {
                return new (n || (n = Promise))((function(i, o) {
                    function s(e) {
                        try {
                            u(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function a(e) {
                        try {
                            u(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function u(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function(e) {
                            e(t)
                        }
                        ))).then(s, a)
                    }
                    u((r = r.apply(e, t || [])).next())
                }
                ))
            }
            function d(e, t) {
                var n, r, i, o, s = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0])
                            throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                },
                "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }
                ),
                o;
                function a(o) {
                    return function(a) {
                        return function(o) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s; )
                                try {
                                    if (n = 1,
                                    r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                                    0) : r.next) && !(i = i.call(r, o[1])).done)
                                        return i;
                                    switch (r = 0,
                                    i && (o = [2 & o[0], i.value]),
                                    o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++,
                                        {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = o[1],
                                        o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!((i = (i = s.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1],
                                            i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2],
                                            s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    o = t.call(e, s)
                                } catch (e) {
                                    o = [6, e],
                                    r = 0
                                } finally {
                                    n = i = 0
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            }
            function f(e, t, n, r) {
                void 0 === r && (r = n),
                e[r] = t[n]
            }
            function p(e, t) {
                for (var n in e)
                    "default" === n || t.hasOwnProperty(n) || (t[n] = e[n])
            }
            function h(e) {
                var t = "function" == typeof Symbol && Symbol.iterator
                  , n = t && e[t]
                  , r = 0;
                if (n)
                    return n.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function() {
                            return e && r >= e.length && (e = void 0),
                            {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
            function g(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n)
                    return e;
                var r, i, o = n.call(e), s = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
                        s.push(r.value)
                } catch (e) {
                    i = {
                        error: e
                    }
                } finally {
                    try {
                        r && !r.done && (n = o.return) && n.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return s
            }
            function m() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e = e.concat(g(arguments[t]));
                return e
            }
            function y() {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                    e += arguments[t].length;
                var r = Array(e)
                  , i = 0;
                for (t = 0; t < n; t++)
                    for (var o = arguments[t], s = 0, a = o.length; s < a; s++,
                    i++)
                        r[i] = o[s];
                return r
            }
            function b(e) {
                return this instanceof b ? (this.v = e,
                this) : new b(e)
            }
            function v(e, t, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var r, i = n.apply(e, t || []), o = [];
                return r = {},
                s("next"),
                s("throw"),
                s("return"),
                r[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                r;
                function s(e) {
                    i[e] && (r[e] = function(t) {
                        return new Promise((function(n, r) {
                            o.push([e, t, n, r]) > 1 || a(e, t)
                        }
                        ))
                    }
                    )
                }
                function a(e, t) {
                    try {
                        (n = i[e](t)).value instanceof b ? Promise.resolve(n.value.v).then(u, c) : l(o[0][2], n)
                    } catch (e) {
                        l(o[0][3], e)
                    }
                    var n
                }
                function u(e) {
                    a("next", e)
                }
                function c(e) {
                    a("throw", e)
                }
                function l(e, t) {
                    e(t),
                    o.shift(),
                    o.length && a(o[0][0], o[0][1])
                }
            }
            function w(e) {
                var t, n;
                return t = {},
                r("next"),
                r("throw", (function(e) {
                    throw e
                }
                )),
                r("return"),
                t[Symbol.iterator] = function() {
                    return this
                }
                ,
                t;
                function r(r, i) {
                    t[r] = e[r] ? function(t) {
                        return (n = !n) ? {
                            value: b(e[r](t)),
                            done: "return" === r
                        } : i ? i(t) : t
                    }
                    : i
                }
            }
            function S(e) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var t, n = e[Symbol.asyncIterator];
                return n ? n.call(e) : (e = h(e),
                t = {},
                r("next"),
                r("throw"),
                r("return"),
                t[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                t);
                function r(n) {
                    t[n] = e[n] && function(t) {
                        return new Promise((function(r, i) {
                            !function(e, t, n, r) {
                                Promise.resolve(r).then((function(t) {
                                    e({
                                        value: t,
                                        done: n
                                    })
                                }
                                ), t)
                            }(r, i, (t = e[n](t)).done, t.value)
                        }
                        ))
                    }
                }
            }
            function E(e, t) {
                return Object.defineProperty ? Object.defineProperty(e, "raw", {
                    value: t
                }) : e.raw = t,
                e
            }
            function P(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }
            function A(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function x(e, t) {
                if (!t.has(e))
                    throw new TypeError("attempted to get private field on non-instance");
                return t.get(e)
            }
            function _(e, t, n) {
                if (!t.has(e))
                    throw new TypeError("attempted to set private field on non-instance");
                return t.set(e, n),
                n
            }
        }
        ,
        914: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.RawSha256 = void 0;
            var r = n(945)
              , i = function() {
                function e() {
                    this.state = Int32Array.from(r.INIT),
                    this.temp = new Int32Array(64),
                    this.buffer = new Uint8Array(64),
                    this.bufferLength = 0,
                    this.bytesHashed = 0,
                    this.finished = !1
                }
                return e.prototype.update = function(e) {
                    if (this.finished)
                        throw new Error("Attempted to update an already finished hash.");
                    var t = 0
                      , n = e.byteLength;
                    if (this.bytesHashed += n,
                    8 * this.bytesHashed > r.MAX_HASHABLE_LENGTH)
                        throw new Error("Cannot hash more than 2^53 - 1 bits");
                    for (; n > 0; )
                        this.buffer[this.bufferLength++] = e[t++],
                        n--,
                        this.bufferLength === r.BLOCK_SIZE && (this.hashBuffer(),
                        this.bufferLength = 0)
                }
                ,
                e.prototype.digest = function() {
                    if (!this.finished) {
                        var e = 8 * this.bytesHashed
                          , t = new DataView(this.buffer.buffer,this.buffer.byteOffset,this.buffer.byteLength)
                          , n = this.bufferLength;
                        if (t.setUint8(this.bufferLength++, 128),
                        n % r.BLOCK_SIZE >= r.BLOCK_SIZE - 8) {
                            for (var i = this.bufferLength; i < r.BLOCK_SIZE; i++)
                                t.setUint8(i, 0);
                            this.hashBuffer(),
                            this.bufferLength = 0
                        }
                        for (i = this.bufferLength; i < r.BLOCK_SIZE - 8; i++)
                            t.setUint8(i, 0);
                        t.setUint32(r.BLOCK_SIZE - 8, Math.floor(e / 4294967296), !0),
                        t.setUint32(r.BLOCK_SIZE - 4, e),
                        this.hashBuffer(),
                        this.finished = !0
                    }
                    var o = new Uint8Array(r.DIGEST_LENGTH);
                    for (i = 0; i < 8; i++)
                        o[4 * i] = this.state[i] >>> 24 & 255,
                        o[4 * i + 1] = this.state[i] >>> 16 & 255,
                        o[4 * i + 2] = this.state[i] >>> 8 & 255,
                        o[4 * i + 3] = this.state[i] >>> 0 & 255;
                    return o
                }
                ,
                e.prototype.hashBuffer = function() {
                    for (var e = this.buffer, t = this.state, n = t[0], i = t[1], o = t[2], s = t[3], a = t[4], u = t[5], c = t[6], l = t[7], d = 0; d < r.BLOCK_SIZE; d++) {
                        if (d < 16)
                            this.temp[d] = (255 & e[4 * d]) << 24 | (255 & e[4 * d + 1]) << 16 | (255 & e[4 * d + 2]) << 8 | 255 & e[4 * d + 3];
                        else {
                            var f = this.temp[d - 2]
                              , p = (f >>> 17 | f << 15) ^ (f >>> 19 | f << 13) ^ f >>> 10
                              , h = ((f = this.temp[d - 15]) >>> 7 | f << 25) ^ (f >>> 18 | f << 14) ^ f >>> 3;
                            this.temp[d] = (p + this.temp[d - 7] | 0) + (h + this.temp[d - 16] | 0)
                        }
                        var g = (((a >>> 6 | a << 26) ^ (a >>> 11 | a << 21) ^ (a >>> 25 | a << 7)) + (a & u ^ ~a & c) | 0) + (l + (r.KEY[d] + this.temp[d] | 0) | 0) | 0
                          , m = ((n >>> 2 | n << 30) ^ (n >>> 13 | n << 19) ^ (n >>> 22 | n << 10)) + (n & i ^ n & o ^ i & o) | 0;
                        l = c,
                        c = u,
                        u = a,
                        a = s + g | 0,
                        s = o,
                        o = i,
                        i = n,
                        n = g + m | 0
                    }
                    t[0] += n,
                    t[1] += i,
                    t[2] += o,
                    t[3] += s,
                    t[4] += a,
                    t[5] += u,
                    t[6] += c,
                    t[7] += l
                }
                ,
                e
            }();
            t.RawSha256 = i
        }
        ,
        945: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.MAX_HASHABLE_LENGTH = t.INIT = t.KEY = t.DIGEST_LENGTH = t.BLOCK_SIZE = void 0,
            t.BLOCK_SIZE = 64,
            t.DIGEST_LENGTH = 32,
            t.KEY = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
            t.INIT = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
            t.MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1
        }
        ,
        938: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            (0,
            n(541).__exportStar)(n(430), t)
        }
        ,
        430: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.Sha256 = void 0;
            var r = n(541)
              , i = n(945)
              , o = n(914)
              , s = n(658)
              , a = function() {
                function e(e) {
                    if (this.hash = new o.RawSha256,
                    e) {
                        this.outer = new o.RawSha256;
                        var t = function(e) {
                            var t = (0,
                            s.convertToBuffer)(e);
                            if (t.byteLength > i.BLOCK_SIZE) {
                                var n = new o.RawSha256;
                                n.update(t),
                                t = n.digest()
                            }
                            var r = new Uint8Array(i.BLOCK_SIZE);
                            return r.set(t),
                            r
                        }(e)
                          , n = new Uint8Array(i.BLOCK_SIZE);
                        n.set(t);
                        for (var r = 0; r < i.BLOCK_SIZE; r++)
                            t[r] ^= 54,
                            n[r] ^= 92;
                        for (this.hash.update(t),
                        this.outer.update(n),
                        r = 0; r < t.byteLength; r++)
                            t[r] = 0
                    }
                }
                return e.prototype.update = function(e) {
                    if (!(0,
                    s.isEmptyData)(e) && !this.error)
                        try {
                            this.hash.update((0,
                            s.convertToBuffer)(e))
                        } catch (e) {
                            this.error = e
                        }
                }
                ,
                e.prototype.digestSync = function() {
                    if (this.error)
                        throw this.error;
                    return this.outer ? (this.outer.finished || this.outer.update(this.hash.digest()),
                    this.outer.digest()) : this.hash.digest()
                }
                ,
                e.prototype.digest = function() {
                    return (0,
                    r.__awaiter)(this, void 0, void 0, (function() {
                        return (0,
                        r.__generator)(this, (function(e) {
                            return [2, this.digestSync()]
                        }
                        ))
                    }
                    ))
                }
                ,
                e
            }();
            t.Sha256 = a
        }
        ,
        541: (e,t,n)=>{
            "use strict";
            n.r(t),
            n.d(t, {
                __assign: ()=>o,
                __asyncDelegator: ()=>w,
                __asyncGenerator: ()=>v,
                __asyncValues: ()=>S,
                __await: ()=>b,
                __awaiter: ()=>l,
                __classPrivateFieldGet: ()=>x,
                __classPrivateFieldSet: ()=>_,
                __createBinding: ()=>f,
                __decorate: ()=>a,
                __exportStar: ()=>p,
                __extends: ()=>i,
                __generator: ()=>d,
                __importDefault: ()=>A,
                __importStar: ()=>P,
                __makeTemplateObject: ()=>E,
                __metadata: ()=>c,
                __param: ()=>u,
                __read: ()=>g,
                __rest: ()=>s,
                __spread: ()=>m,
                __spreadArrays: ()=>y,
                __values: ()=>h
            });
            var r = function(e, t) {
                return r = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                ,
                r(e, t)
            };
            function i(e, t) {
                function n() {
                    this.constructor = e
                }
                r(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            var o = function() {
                return o = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var i in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e
                }
                ,
                o.apply(this, arguments)
            };
            function s(e, t) {
                var n = {};
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                    var i = 0;
                    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                        t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
                }
                return n
            }
            function a(e, t, n, r) {
                var i, o = arguments.length, s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    s = Reflect.decorate(e, t, n, r);
                else
                    for (var a = e.length - 1; a >= 0; a--)
                        (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
                return o > 3 && s && Object.defineProperty(t, n, s),
                s
            }
            function u(e, t) {
                return function(n, r) {
                    t(n, r, e)
                }
            }
            function c(e, t) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(e, t)
            }
            function l(e, t, n, r) {
                return new (n || (n = Promise))((function(i, o) {
                    function s(e) {
                        try {
                            u(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function a(e) {
                        try {
                            u(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function u(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function(e) {
                            e(t)
                        }
                        ))).then(s, a)
                    }
                    u((r = r.apply(e, t || [])).next())
                }
                ))
            }
            function d(e, t) {
                var n, r, i, o, s = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0])
                            throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                },
                "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }
                ),
                o;
                function a(o) {
                    return function(a) {
                        return function(o) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s; )
                                try {
                                    if (n = 1,
                                    r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                                    0) : r.next) && !(i = i.call(r, o[1])).done)
                                        return i;
                                    switch (r = 0,
                                    i && (o = [2 & o[0], i.value]),
                                    o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++,
                                        {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = o[1],
                                        o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!((i = (i = s.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1],
                                            i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2],
                                            s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    o = t.call(e, s)
                                } catch (e) {
                                    o = [6, e],
                                    r = 0
                                } finally {
                                    n = i = 0
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            }
            function f(e, t, n, r) {
                void 0 === r && (r = n),
                e[r] = t[n]
            }
            function p(e, t) {
                for (var n in e)
                    "default" === n || t.hasOwnProperty(n) || (t[n] = e[n])
            }
            function h(e) {
                var t = "function" == typeof Symbol && Symbol.iterator
                  , n = t && e[t]
                  , r = 0;
                if (n)
                    return n.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function() {
                            return e && r >= e.length && (e = void 0),
                            {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
            function g(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n)
                    return e;
                var r, i, o = n.call(e), s = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
                        s.push(r.value)
                } catch (e) {
                    i = {
                        error: e
                    }
                } finally {
                    try {
                        r && !r.done && (n = o.return) && n.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return s
            }
            function m() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e = e.concat(g(arguments[t]));
                return e
            }
            function y() {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                    e += arguments[t].length;
                var r = Array(e)
                  , i = 0;
                for (t = 0; t < n; t++)
                    for (var o = arguments[t], s = 0, a = o.length; s < a; s++,
                    i++)
                        r[i] = o[s];
                return r
            }
            function b(e) {
                return this instanceof b ? (this.v = e,
                this) : new b(e)
            }
            function v(e, t, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var r, i = n.apply(e, t || []), o = [];
                return r = {},
                s("next"),
                s("throw"),
                s("return"),
                r[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                r;
                function s(e) {
                    i[e] && (r[e] = function(t) {
                        return new Promise((function(n, r) {
                            o.push([e, t, n, r]) > 1 || a(e, t)
                        }
                        ))
                    }
                    )
                }
                function a(e, t) {
                    try {
                        (n = i[e](t)).value instanceof b ? Promise.resolve(n.value.v).then(u, c) : l(o[0][2], n)
                    } catch (e) {
                        l(o[0][3], e)
                    }
                    var n
                }
                function u(e) {
                    a("next", e)
                }
                function c(e) {
                    a("throw", e)
                }
                function l(e, t) {
                    e(t),
                    o.shift(),
                    o.length && a(o[0][0], o[0][1])
                }
            }
            function w(e) {
                var t, n;
                return t = {},
                r("next"),
                r("throw", (function(e) {
                    throw e
                }
                )),
                r("return"),
                t[Symbol.iterator] = function() {
                    return this
                }
                ,
                t;
                function r(r, i) {
                    t[r] = e[r] ? function(t) {
                        return (n = !n) ? {
                            value: b(e[r](t)),
                            done: "return" === r
                        } : i ? i(t) : t
                    }
                    : i
                }
            }
            function S(e) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var t, n = e[Symbol.asyncIterator];
                return n ? n.call(e) : (e = h(e),
                t = {},
                r("next"),
                r("throw"),
                r("return"),
                t[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                t);
                function r(n) {
                    t[n] = e[n] && function(t) {
                        return new Promise((function(r, i) {
                            !function(e, t, n, r) {
                                Promise.resolve(r).then((function(t) {
                                    e({
                                        value: t,
                                        done: n
                                    })
                                }
                                ), t)
                            }(r, i, (t = e[n](t)).done, t.value)
                        }
                        ))
                    }
                }
            }
            function E(e, t) {
                return Object.defineProperty ? Object.defineProperty(e, "raw", {
                    value: t
                }) : e.raw = t,
                e
            }
            function P(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }
            function A(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function x(e, t) {
                if (!t.has(e))
                    throw new TypeError("attempted to get private field on non-instance");
                return t.get(e)
            }
            function _(e, t, n) {
                if (!t.has(e))
                    throw new TypeError("attempted to set private field on non-instance");
                return t.set(e, n),
                n
            }
        }
        ,
        21: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            n(840).__exportStar(n(787), t)
        }
        ,
        787: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.supportsZeroByteGCM = t.supportsSubtleCrypto = t.supportsSecureRandom = t.supportsWebCrypto = void 0;
            var r = n(840)
              , i = ["decrypt", "digest", "encrypt", "exportKey", "generateKey", "importKey", "sign", "verify"];
            function o(e) {
                return "object" == typeof e && "object" == typeof e.crypto && "function" == typeof e.crypto.getRandomValues
            }
            function s(e) {
                return e && i.every((function(t) {
                    return "function" == typeof e[t]
                }
                ))
            }
            t.supportsWebCrypto = function(e) {
                return !(!o(e) || "object" != typeof e.crypto.subtle) && s(e.crypto.subtle)
            }
            ,
            t.supportsSecureRandom = o,
            t.supportsSubtleCrypto = s,
            t.supportsZeroByteGCM = function(e) {
                return r.__awaiter(this, void 0, void 0, (function() {
                    var t;
                    return r.__generator(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            if (!s(e))
                                return [2, !1];
                            n.label = 1;
                        case 1:
                            return n.trys.push([1, 4, , 5]),
                            [4, e.generateKey({
                                name: "AES-GCM",
                                length: 128
                            }, !1, ["encrypt"])];
                        case 2:
                            return t = n.sent(),
                            [4, e.encrypt({
                                name: "AES-GCM",
                                iv: new Uint8Array(Array(12)),
                                additionalData: new Uint8Array(Array(16)),
                                tagLength: 128
                            }, t, new Uint8Array(0))];
                        case 3:
                            return [2, 16 === n.sent().byteLength];
                        case 4:
                            return n.sent(),
                            [2, !1];
                        case 5:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
        }
        ,
        840: (e,t,n)=>{
            "use strict";
            n.r(t),
            n.d(t, {
                __assign: ()=>o,
                __asyncDelegator: ()=>w,
                __asyncGenerator: ()=>v,
                __asyncValues: ()=>S,
                __await: ()=>b,
                __awaiter: ()=>l,
                __classPrivateFieldGet: ()=>x,
                __classPrivateFieldSet: ()=>_,
                __createBinding: ()=>f,
                __decorate: ()=>a,
                __exportStar: ()=>p,
                __extends: ()=>i,
                __generator: ()=>d,
                __importDefault: ()=>A,
                __importStar: ()=>P,
                __makeTemplateObject: ()=>E,
                __metadata: ()=>c,
                __param: ()=>u,
                __read: ()=>g,
                __rest: ()=>s,
                __spread: ()=>m,
                __spreadArrays: ()=>y,
                __values: ()=>h
            });
            var r = function(e, t) {
                return r = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                ,
                r(e, t)
            };
            function i(e, t) {
                function n() {
                    this.constructor = e
                }
                r(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                new n)
            }
            var o = function() {
                return o = Object.assign || function(e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                        for (var i in t = arguments[n])
                            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                    return e
                }
                ,
                o.apply(this, arguments)
            };
            function s(e, t) {
                var n = {};
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                    var i = 0;
                    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++)
                        t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]])
                }
                return n
            }
            function a(e, t, n, r) {
                var i, o = arguments.length, s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    s = Reflect.decorate(e, t, n, r);
                else
                    for (var a = e.length - 1; a >= 0; a--)
                        (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
                return o > 3 && s && Object.defineProperty(t, n, s),
                s
            }
            function u(e, t) {
                return function(n, r) {
                    t(n, r, e)
                }
            }
            function c(e, t) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(e, t)
            }
            function l(e, t, n, r) {
                return new (n || (n = Promise))((function(i, o) {
                    function s(e) {
                        try {
                            u(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function a(e) {
                        try {
                            u(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }
                    function u(e) {
                        var t;
                        e.done ? i(e.value) : (t = e.value,
                        t instanceof n ? t : new n((function(e) {
                            e(t)
                        }
                        ))).then(s, a)
                    }
                    u((r = r.apply(e, t || [])).next())
                }
                ))
            }
            function d(e, t) {
                var n, r, i, o, s = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0])
                            throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                },
                "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }
                ),
                o;
                function a(o) {
                    return function(a) {
                        return function(o) {
                            if (n)
                                throw new TypeError("Generator is already executing.");
                            for (; s; )
                                try {
                                    if (n = 1,
                                    r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r),
                                    0) : r.next) && !(i = i.call(r, o[1])).done)
                                        return i;
                                    switch (r = 0,
                                    i && (o = [2 & o[0], i.value]),
                                    o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++,
                                        {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        r = o[1],
                                        o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!((i = (i = s.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1],
                                            i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2],
                                            s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    o = t.call(e, s)
                                } catch (e) {
                                    o = [6, e],
                                    r = 0
                                } finally {
                                    n = i = 0
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            }
            function f(e, t, n, r) {
                void 0 === r && (r = n),
                e[r] = t[n]
            }
            function p(e, t) {
                for (var n in e)
                    "default" === n || t.hasOwnProperty(n) || (t[n] = e[n])
            }
            function h(e) {
                var t = "function" == typeof Symbol && Symbol.iterator
                  , n = t && e[t]
                  , r = 0;
                if (n)
                    return n.call(e);
                if (e && "number" == typeof e.length)
                    return {
                        next: function() {
                            return e && r >= e.length && (e = void 0),
                            {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
            function g(e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n)
                    return e;
                var r, i, o = n.call(e), s = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(r = o.next()).done; )
                        s.push(r.value)
                } catch (e) {
                    i = {
                        error: e
                    }
                } finally {
                    try {
                        r && !r.done && (n = o.return) && n.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return s
            }
            function m() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e = e.concat(g(arguments[t]));
                return e
            }
            function y() {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++)
                    e += arguments[t].length;
                var r = Array(e)
                  , i = 0;
                for (t = 0; t < n; t++)
                    for (var o = arguments[t], s = 0, a = o.length; s < a; s++,
                    i++)
                        r[i] = o[s];
                return r
            }
            function b(e) {
                return this instanceof b ? (this.v = e,
                this) : new b(e)
            }
            function v(e, t, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var r, i = n.apply(e, t || []), o = [];
                return r = {},
                s("next"),
                s("throw"),
                s("return"),
                r[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                r;
                function s(e) {
                    i[e] && (r[e] = function(t) {
                        return new Promise((function(n, r) {
                            o.push([e, t, n, r]) > 1 || a(e, t)
                        }
                        ))
                    }
                    )
                }
                function a(e, t) {
                    try {
                        (n = i[e](t)).value instanceof b ? Promise.resolve(n.value.v).then(u, c) : l(o[0][2], n)
                    } catch (e) {
                        l(o[0][3], e)
                    }
                    var n
                }
                function u(e) {
                    a("next", e)
                }
                function c(e) {
                    a("throw", e)
                }
                function l(e, t) {
                    e(t),
                    o.shift(),
                    o.length && a(o[0][0], o[0][1])
                }
            }
            function w(e) {
                var t, n;
                return t = {},
                r("next"),
                r("throw", (function(e) {
                    throw e
                }
                )),
                r("return"),
                t[Symbol.iterator] = function() {
                    return this
                }
                ,
                t;
                function r(r, i) {
                    t[r] = e[r] ? function(t) {
                        return (n = !n) ? {
                            value: b(e[r](t)),
                            done: "return" === r
                        } : i ? i(t) : t
                    }
                    : i
                }
            }
            function S(e) {
                if (!Symbol.asyncIterator)
                    throw new TypeError("Symbol.asyncIterator is not defined.");
                var t, n = e[Symbol.asyncIterator];
                return n ? n.call(e) : (e = h(e),
                t = {},
                r("next"),
                r("throw"),
                r("return"),
                t[Symbol.asyncIterator] = function() {
                    return this
                }
                ,
                t);
                function r(n) {
                    t[n] = e[n] && function(t) {
                        return new Promise((function(r, i) {
                            !function(e, t, n, r) {
                                Promise.resolve(r).then((function(t) {
                                    e({
                                        value: t,
                                        done: n
                                    })
                                }
                                ), t)
                            }(r, i, (t = e[n](t)).done, t.value)
                        }
                        ))
                    }
                }
            }
            function E(e, t) {
                return Object.defineProperty ? Object.defineProperty(e, "raw", {
                    value: t
                }) : e.raw = t,
                e
            }
            function P(e) {
                if (e && e.__esModule)
                    return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e,
                t
            }
            function A(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function x(e, t) {
                if (!t.has(e))
                    throw new TypeError("attempted to get private field on non-instance");
                return t.get(e)
            }
            function _(e, t, n) {
                if (!t.has(e))
                    throw new TypeError("attempted to set private field on non-instance");
                return t.set(e, n),
                n
            }
        }
        ,
        106: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.convertToBuffer = void 0;
            var r = n(84)
              , i = "undefined" != typeof Buffer && Buffer.from ? function(e) {
                return Buffer.from(e, "utf8")
            }
            : r.fromUtf8;
            t.convertToBuffer = function(e) {
                return e instanceof Uint8Array ? e : "string" == typeof e ? i(e) : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer,e.byteOffset,e.byteLength / Uint8Array.BYTES_PER_ELEMENT) : new Uint8Array(e)
            }
        }
        ,
        658: (e,t,n)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.uint32ArrayFrom = t.numToUint8 = t.isEmptyData = t.convertToBuffer = void 0;
            var r = n(106);
            Object.defineProperty(t, "convertToBuffer", {
                enumerable: !0,
                get: function() {
                    return r.convertToBuffer
                }
            });
            var i = n(304);
            Object.defineProperty(t, "isEmptyData", {
                enumerable: !0,
                get: function() {
                    return i.isEmptyData
                }
            });
            var o = n(174);
            Object.defineProperty(t, "numToUint8", {
                enumerable: !0,
                get: function() {
                    return o.numToUint8
                }
            });
            var s = n(558);
            Object.defineProperty(t, "uint32ArrayFrom", {
                enumerable: !0,
                get: function() {
                    return s.uint32ArrayFrom
                }
            })
        }
        ,
        304: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.isEmptyData = void 0,
            t.isEmptyData = function(e) {
                return "string" == typeof e ? 0 === e.length : 0 === e.byteLength
            }
        }
        ,
        174: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.numToUint8 = void 0,
            t.numToUint8 = function(e) {
                return new Uint8Array([(4278190080 & e) >> 24, (16711680 & e) >> 16, (65280 & e) >> 8, 255 & e])
            }
        }
        ,
        558: (e,t)=>{
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.uint32ArrayFrom = void 0,
            t.uint32ArrayFrom = function(e) {
                if (!Uint32Array.from) {
                    for (var t = new Uint32Array(e.length), n = 0; n < e.length; )
                        t[n] = e[n],
                        n += 1;
                    return t
                }
                return Uint32Array.from(e)
            }
        }
        ,
        352: (e,t,n)=>{
            "use strict";
            n.r(t),
            n.d(t, {
                AssumeRoleCommand: ()=>Vt,
                AssumeRoleRequestFilterSensitiveLog: ()=>He,
                AssumeRoleResponseFilterSensitiveLog: ()=>Ke,
                AssumeRoleWithSAMLCommand: ()=>Kt,
                AssumeRoleWithSAMLRequestFilterSensitiveLog: ()=>Ze,
                AssumeRoleWithSAMLResponseFilterSensitiveLog: ()=>Xe,
                AssumeRoleWithWebIdentityCommand: ()=>Zt,
                AssumeRoleWithWebIdentityRequestFilterSensitiveLog: ()=>Qe,
                AssumeRoleWithWebIdentityResponseFilterSensitiveLog: ()=>Ye,
                AssumedRoleUserFilterSensitiveLog: ()=>qe,
                CredentialsFilterSensitiveLog: ()=>Ve,
                DecodeAuthorizationMessageCommand: ()=>Xt,
                DecodeAuthorizationMessageRequestFilterSensitiveLog: ()=>Je,
                DecodeAuthorizationMessageResponseFilterSensitiveLog: ()=>et,
                ExpiredTokenException: ()=>Fe,
                FederatedUserFilterSensitiveLog: ()=>st,
                GetAccessKeyInfoCommand: ()=>Qt,
                GetAccessKeyInfoRequestFilterSensitiveLog: ()=>tt,
                GetAccessKeyInfoResponseFilterSensitiveLog: ()=>nt,
                GetCallerIdentityCommand: ()=>Yt,
                GetCallerIdentityRequestFilterSensitiveLog: ()=>rt,
                GetCallerIdentityResponseFilterSensitiveLog: ()=>it,
                GetFederationTokenCommand: ()=>Jt,
                GetFederationTokenRequestFilterSensitiveLog: ()=>ot,
                GetFederationTokenResponseFilterSensitiveLog: ()=>at,
                GetSessionTokenCommand: ()=>en,
                GetSessionTokenRequestFilterSensitiveLog: ()=>ut,
                GetSessionTokenResponseFilterSensitiveLog: ()=>ct,
                IDPCommunicationErrorException: ()=>Ue,
                IDPRejectedClaimException: ()=>Le,
                InvalidAuthorizationMessageException: ()=>ze,
                InvalidIdentityTokenException: ()=>Be,
                MalformedPolicyDocumentException: ()=>je,
                PackedPolicyTooLargeException: ()=>De,
                PolicyDescriptorTypeFilterSensitiveLog: ()=>We,
                RegionDisabledException: ()=>$e,
                STS: ()=>Br,
                STSClient: ()=>Lr,
                STSServiceException: ()=>Ne,
                TagFilterSensitiveLog: ()=>Ge,
                decorateDefaultCredentialProvider: ()=>Hr,
                getDefaultRoleAssumer: ()=>Wr,
                getDefaultRoleAssumerWithWebIdentity: ()=>Gr
            });
            var r = {};
            n.r(r),
            n.d(r, {
                isVirtualHostableS3Bucket: ()=>lr,
                parseArn: ()=>dr,
                partition: ()=>nr
            });
            var i = {};
            n.r(i),
            n.d(i, {
                aws: ()=>r,
                booleanEquals: ()=>fr,
                getAttr: ()=>pr,
                isSet: ()=>hr,
                isValidHostLabel: ()=>cr,
                not: ()=>gr,
                parseURL: ()=>br,
                stringEquals: ()=>vr,
                substring: ()=>wr,
                uriEncode: ()=>Sr
            });
            const o = {
                name: "deserializerMiddleware",
                step: "deserialize",
                tags: ["DESERIALIZER"],
                override: !0
            }
              , s = {
                name: "serializerMiddleware",
                step: "serialize",
                tags: ["SERIALIZER"],
                override: !0
            };
            function a(e, t, n) {
                return {
                    applyToStack: r=>{
                        r.add(((e,t)=>(n,r)=>async r=>{
                            const {response: i} = await n(r);
                            try {
                                return {
                                    response: i,
                                    output: await t(i, e)
                                }
                            } catch (e) {
                                throw Object.defineProperty(e, "$response", {
                                    value: i
                                }),
                                e
                            }
                        }
                        )(e, n), o),
                        r.add(((e,t)=>(n,r)=>async i=>{
                            const o = r.endpointV2?.url && e.urlParser ? async()=>e.urlParser(r.endpointV2.url) : e.endpoint;
                            if (!o)
                                throw new Error("No valid endpoint provider available.");
                            const s = await t(i.input, {
                                ...e,
                                endpoint: o
                            });
                            return n({
                                ...i,
                                request: s
                            })
                        }
                        )(e, t), s)
                    }
                }
            }
            const u = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/
              , c = /(\d+\.){3}\d+/
              , l = /\.\./
              , d = (e,t,n)=>{
                const r = async()=>{
                    const r = n[e] ?? n[t];
                    return "function" == typeof r ? r() : r
                }
                ;
                return "endpoint" === e || "endpoint" === t ? async()=>{
                    const e = await r();
                    if (e && "object" == typeof e) {
                        if ("url"in e)
                            return e.url.href;
                        if ("hostname"in e) {
                            const {protocol: t, hostname: n, port: r, path: i} = e;
                            return `${t}//${n}${r ? ":" + r : ""}${i}`
                        }
                    }
                    return e
                }
                : r
            }
              , f = async(e,t,n)=>{
                const r = {}
                  , i = t?.getEndpointParameterInstructions?.() || {};
                for (const [t,o] of Object.entries(i))
                    switch (o.type) {
                    case "staticContextParams":
                        r[t] = o.value;
                        break;
                    case "contextParams":
                        r[t] = e[o.name];
                        break;
                    case "clientContextParams":
                    case "builtInParams":
                        r[t] = await d(o.name, t, n)();
                        break;
                    default:
                        throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(o))
                    }
                return 0 === Object.keys(i).length && Object.assign(r, n),
                "s3" === String(n.serviceId).toLowerCase() && await (async e=>{
                    const t = e?.Bucket || "";
                    if ("string" == typeof e.Bucket && (e.Bucket = t.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"))),
                    (e=>{
                        const [t,n,r,i,o,s] = e.split(":")
                          , a = "arn" === t && e.split(":").length >= 6
                          , u = 5 === [t, n, r, o, s].filter(Boolean).length;
                        if (a && !u)
                            throw new Error(`Invalid ARN: ${e} was an invalid ARN.`);
                        return !!("arn" === t && n && r && o && s)
                    }
                    )(t)) {
                        if (!0 === e.ForcePathStyle)
                            throw new Error("Path-style addressing cannot be used with ARN buckets")
                    } else
                        n = t,
                        (!u.test(n) || c.test(n) || l.test(n) || -1 !== t.indexOf(".") && !String(e.Endpoint).startsWith("http:") || t.toLowerCase() !== t || t.length < 3) && (e.ForcePathStyle = !0);
                    var n;
                    return e.DisableMultiRegionAccessPoints && (e.disableMultiRegionAccessPoints = !0,
                    e.DisableMRAP = !0),
                    e
                }
                )(r),
                r
            }
              , p = {
                step: "serialize",
                tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
                name: "endpointV2Middleware",
                override: !0,
                relation: "before",
                toMiddleware: s.name
            }
              , h = (e,t)=>({
                applyToStack: n=>{
                    n.addRelativeTo((({config: e, instructions: t})=>(n,r)=>async i=>{
                        const o = await (async(e,t,n,r)=>{
                            const i = await f(e, t, n);
                            if ("function" != typeof n.endpointProvider)
                                throw new Error("config.endpointProvider is not set.");
                            return n.endpointProvider(i, r)
                        }
                        )(i.input, {
                            getEndpointParameterInstructions: ()=>t
                        }, {
                            ...e
                        }, r);
                        r.endpointV2 = o,
                        r.authSchemes = o.properties?.authSchemes;
                        const s = r.authSchemes?.[0];
                        return s && (r.signing_region = s.signingRegion,
                        r.signing_service = s.signingName),
                        n({
                            ...i
                        })
                    }
                    )({
                        config: e,
                        instructions: t
                    }), p)
                }
            })
              , g = e=>{
                if ("function" == typeof e)
                    return e;
                const t = Promise.resolve(e);
                return ()=>t
            }
              , m = e=>{
                if ("string" == typeof e)
                    return m(new URL(e));
                const {hostname: t, pathname: n, port: r, protocol: i, search: o} = e;
                let s;
                return o && (s = function(e) {
                    const t = {};
                    if (e = e.replace(/^\?/, ""))
                        for (const n of e.split("&")) {
                            let[e,r=null] = n.split("=");
                            e = decodeURIComponent(e),
                            r && (r = decodeURIComponent(r)),
                            e in t ? Array.isArray(t[e]) ? t[e].push(r) : t[e] = [t[e], r] : t[e] = r
                        }
                    return t
                }(o)),
                {
                    hostname: t,
                    port: r ? parseInt(r) : void 0,
                    protocol: i,
                    path: n,
                    query: s
                }
            }
            ;
            class y extends Error {
                constructor(e, t=!0) {
                    super(e),
                    this.tryNextLink = t,
                    this.name = "ProviderError",
                    Object.setPrototypeOf(this, y.prototype)
                }
                static from(e, t=!0) {
                    return Object.assign(new this(e.message,t), e)
                }
            }
            const b = (e,t,n)=>{
                let r, i, o, s = !1;
                const a = async()=>{
                    i || (i = e());
                    try {
                        r = await i,
                        o = !0,
                        s = !1
                    } finally {
                        i = void 0
                    }
                    return r
                }
                ;
                return void 0 === t ? async e=>(o && !e?.forceRefresh || (r = await a()),
                r) : async e=>(o && !e?.forceRefresh || (r = await a()),
                s ? r : n && !n(r) ? (s = !0,
                r) : t(r) ? (await a(),
                r) : r)
            }
              , v = {}
              , w = {};
            for (let e = 0; e < 256; e++) {
                let t = e.toString(16).toLowerCase();
                1 === t.length && (t = `0 ${t}`),
                v[e] = t,
                w[t] = e
            }
            function S(e) {
                let t = "";
                for (let n = 0; n < e.byteLength; n++)
                    t += v[e[n]];
                return t
            }
            const E = "X-Amz-Security-Token"
              , P = "authorization"
              , A = "X-Amz-Date".toLowerCase()
              , x = [P, A, "date"]
              , _ = "X-Amz-Signature".toLowerCase()
              , R = "x-amz-content-sha256"
              , T = E.toLowerCase()
              , O = {
                authorization: !0,
                "cache-control": !0,
                connection: !0,
                expect: !0,
                from: !0,
                "keep-alive": !0,
                "max-forwards": !0,
                pragma: !0,
                referer: !0,
                te: !0,
                trailer: !0,
                "transfer-encoding": !0,
                upgrade: !0,
                "user-agent": !0,
                "x-amzn-trace-id": !0
            }
              , M = /^proxy-/
              , I = /^sec-/
              , k = "AWS4-HMAC-SHA256-PAYLOAD"
              , C = {}
              , N = []
              , F = (e,t,n)=>`${e}/${t}/${n}/aws4_request`
              , j = (e,t,n)=>{
                const r = new e(t);
                return r.update(n),
                r.digest()
            }
              , D = ({headers: e},t,n)=>{
                const r = {};
                for (const i of Object.keys(e).sort()) {
                    if (null == e[i])
                        continue;
                    const o = i.toLowerCase();
                    (o in O || t?.has(o) || M.test(o) || I.test(o)) && (!n || n && !n.has(o)) || (r[o] = e[i].trim().replace(/\s+/g, " "))
                }
                return r
            }
              , $ = e=>encodeURIComponent(e).replace(/[!'()*]/g, L)
              , L = e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`
              , B = async({headers: e, body: t},n)=>{
                for (const t of Object.keys(e))
                    if (t.toLowerCase() === R)
                        return e[t];
                if (null == t)
                    return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
                if ("string" == typeof t || ArrayBuffer.isView(t) || (r = t,
                "function" == typeof ArrayBuffer && r instanceof ArrayBuffer || "[object ArrayBuffer]" === Object.prototype.toString.call(r))) {
                    const e = new n;
                    return e.update(t),
                    S(await e.digest())
                }
                var r;
                return "UNSIGNED-PAYLOAD"
            }
              , U = ({headers: e, query: t, ...n})=>({
                ...n,
                headers: {
                    ...e
                },
                query: t ? z(t) : void 0
            })
              , z = e=>Object.keys(e).reduce(((t,n)=>{
                const r = e[n];
                return {
                    ...t,
                    [n]: Array.isArray(r) ? [...r] : r
                }
            }
            ), {})
              , q = e=>{
                e = "function" == typeof e.clone ? e.clone() : U(e);
                for (const t of Object.keys(e.headers))
                    x.indexOf(t.toLowerCase()) > -1 && delete e.headers[t];
                return e
            }
            ;
            class W {
                constructor({applyChecksum: e, credentials: t, region: n, service: r, sha256: i, uriEscapePath: o=!0}) {
                    this.service = r,
                    this.sha256 = i,
                    this.uriEscapePath = o,
                    this.applyChecksum = "boolean" != typeof e || e,
                    this.regionProvider = g(n),
                    this.credentialProvider = g(t)
                }
                async presign(e, t={}) {
                    const {signingDate: n=new Date, expiresIn: r=3600, unsignableHeaders: i, unhoistableHeaders: o, signableHeaders: s, signingRegion: a, signingService: u} = t
                      , c = await this.credentialProvider();
                    this.validateResolvedCredentials(c);
                    const l = a ?? await this.regionProvider()
                      , {longDate: d, shortDate: f} = G(n);
                    if (r > 604800)
                        return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
                    const p = F(f, l, u ?? this.service)
                      , h = ((e,t={})=>{
                        const {headers: n, query: r={}} = "function" == typeof e.clone ? e.clone() : U(e);
                        for (const e of Object.keys(n)) {
                            const i = e.toLowerCase();
                            "x-amz-" !== i.slice(0, 6) || t.unhoistableHeaders?.has(i) || (r[e] = n[e],
                            delete n[e])
                        }
                        return {
                            ...e,
                            headers: n,
                            query: r
                        }
                    }
                    )(q(e), {
                        unhoistableHeaders: o
                    });
                    c.sessionToken && (h.query[E] = c.sessionToken),
                    h.query["X-Amz-Algorithm"] = "AWS4-HMAC-SHA256",
                    h.query["X-Amz-Credential"] = `${c.accessKeyId}/${p}`,
                    h.query["X-Amz-Date"] = d,
                    h.query["X-Amz-Expires"] = r.toString(10);
                    const g = D(h, i, s);
                    return h.query["X-Amz-SignedHeaders"] = H(g),
                    h.query["X-Amz-Signature"] = await this.getSignature(d, p, this.getSigningKey(c, l, f, u), this.createCanonicalRequest(h, g, await B(e, this.sha256))),
                    h
                }
                async sign(e, t) {
                    return "string" == typeof e ? this.signString(e, t) : e.headers && e.payload ? this.signEvent(e, t) : this.signRequest(e, t)
                }
                async signEvent({headers: e, payload: t}, {signingDate: n=new Date, priorSignature: r, signingRegion: i, signingService: o}) {
                    const s = i ?? await this.regionProvider()
                      , {shortDate: a, longDate: u} = G(n)
                      , c = F(a, s, o ?? this.service)
                      , l = await B({
                        headers: {},
                        body: t
                    }, this.sha256)
                      , d = new this.sha256;
                    d.update(e);
                    const f = S(await d.digest())
                      , p = [k, u, c, r, f, l].join("\n");
                    return this.signString(p, {
                        signingDate: n,
                        signingRegion: s,
                        signingService: o
                    })
                }
                async signString(e, {signingDate: t=new Date, signingRegion: n, signingService: r}={}) {
                    const i = await this.credentialProvider();
                    this.validateResolvedCredentials(i);
                    const o = n ?? await this.regionProvider()
                      , {shortDate: s} = G(t)
                      , a = new this.sha256(await this.getSigningKey(i, o, s, r));
                    return a.update(e),
                    S(await a.digest())
                }
                async signRequest(e, {signingDate: t=new Date, signableHeaders: n, unsignableHeaders: r, signingRegion: i, signingService: o}={}) {
                    const s = await this.credentialProvider();
                    this.validateResolvedCredentials(s);
                    const a = i ?? await this.regionProvider()
                      , u = q(e)
                      , {longDate: c, shortDate: l} = G(t)
                      , d = F(l, a, o ?? this.service);
                    u.headers[A] = c,
                    s.sessionToken && (u.headers[T] = s.sessionToken);
                    const f = await B(u, this.sha256);
                    !((e,t)=>{
                        e = e.toLowerCase();
                        for (const n of Object.keys(t))
                            if (e === n.toLowerCase())
                                return !0;
                        return !1
                    }
                    )(R, u.headers) && this.applyChecksum && (u.headers[R] = f);
                    const p = D(u, r, n)
                      , h = await this.getSignature(c, d, this.getSigningKey(s, a, l, o), this.createCanonicalRequest(u, p, f));
                    return u.headers[P] = `AWS4-HMAC-SHA256 Credential=${s.accessKeyId}/${d}, SignedHeaders=${H(p)}, Signature=${h}`,
                    u
                }
                createCanonicalRequest(e, t, n) {
                    const r = Object.keys(t).sort();
                    return `${e.method}\n ${this.getCanonicalPath(e)}\n ${(({query: e={}})=>{
                        const t = []
                          , n = {};
                        for (const r of Object.keys(e).sort()) {
                            if (r.toLowerCase() === _)
                                continue;
                            t.push(r);
                            const i = e[r];
                            "string" == typeof i ? n[r] = `${$(r)}=${$(i)}` : Array.isArray(i) && (n[r] = i.slice(0).sort().reduce(((e,t)=>e.concat([`${$(r)}=${$(t)}`])), []).join("&"))
                        }
                        return t.map((e=>n[e])).filter((e=>e)).join("&")
                    }
                    )(e)}\n ${r.map((e=>`${e}:${t[e]}`)).join("\n")}\n\n ${r.join(";")}\n ${n}`
                }
                async createStringToSign(e, t, n) {
                    const r = new this.sha256;
                    return r.update(n),
                    `AWS4-HMAC-SHA256\n ${e}\n ${t}\n ${S(await r.digest())}`
                }
                getCanonicalPath({path: e}) {
                    if (this.uriEscapePath) {
                        const t = [];
                        for (const n of e.split("/"))
                            0 !== n?.length && "." !== n && (".." === n ? t.pop() : t.push(n));
                        const n = `${e?.startsWith("/") ? "/" : ""}${t.join("/")}${t.length > 0 && e?.endsWith("/") ? "/" : ""}`;
                        return encodeURIComponent(n).replace(/%2F/g, "/")
                    }
                    return e
                }
                async getSignature(e, t, n, r) {
                    const i = await this.createStringToSign(e, t, r)
                      , o = new this.sha256(await n);
                    return o.update(i),
                    S(await o.digest())
                }
                getSigningKey(e, t, n, r) {
                    return (async(e,t,n,r,i)=>{
                        const o = `${n}:${r}:${i}:${S(await j(e, t.secretAccessKey, t.accessKeyId))}:${t.sessionToken}`;
                        if (o in C)
                            return C[o];
                        for (N.push(o); N.length > 50; )
                            delete C[N.shift()];
                        let s = `AWS4 ${t.secretAccessKey}`;
                        for (const t of [n, r, i, "aws4_request"])
                            s = await j(e, s, t);
                        return C[o] = s
                    }
                    )(this.sha256, e, n, t, r || this.service)
                }
                validateResolvedCredentials(e) {
                    if ("object" != typeof e || "string" != typeof e.accessKeyId || "string" != typeof e.secretAccessKey)
                        throw new Error("Resolved credential object is not valid")
                }
            }
            const G = e=>{
                const t = (n = e,
                (e=>"number" == typeof e ? new Date(1e3 * e) : "string" == typeof e ? Number(e) ? new Date(1e3 * Number(e)) : new Date(e) : e)(n).toISOString().replace(/\.\d{3}Z$/, "Z")).replace(/[\-:]/g, "");
                var n;
                return {
                    longDate: t,
                    shortDate: t.slice(0, 8)
                }
            }
              , H = e=>Object.keys(e).sort().join(";");
            class V {
                constructor(e) {
                    this.method = e.method || "GET",
                    this.hostname = e.hostname || "localhost",
                    this.port = e.port,
                    this.query = e.query || {},
                    this.headers = e.headers || {},
                    this.body = e.body,
                    this.protocol = e.protocol ? ":" !== e.protocol.slice(-1) ? `${e.protocol}:` : e.protocol : "https:",
                    this.path = e.path ? "/" !== e.path.charAt(0) ? `/${e.path}` : e.path : "/"
                }
                static isInstance(e) {
                    if (!e)
                        return !1;
                    const t = e;
                    return "method"in t && "protocol"in t && "hostname"in t && "path"in t && "object" == typeof t.query && "object" == typeof t.headers
                }
                clone() {
                    const e = new V({
                        ...this,
                        headers: {
                            ...this.headers
                        }
                    });
                    var t;
                    return e.query && (e.query = (t = e.query,
                    Object.keys(t).reduce(((e,n)=>{
                        const r = t[n];
                        return {
                            ...e,
                            [n]: Array.isArray(r) ? [...r] : r
                        }
                    }
                    ), {}))),
                    e
                }
            }
            class K {
                constructor(e) {
                    this.statusCode = e.statusCode,
                    this.headers = e.headers || {},
                    this.body = e.body
                }
                static isInstance(e) {
                    if (!e)
                        return !1;
                    const t = e;
                    return "number" == typeof t.statusCode && "object" == typeof t.headers
                }
            }
            const Z = e=>new Date(Date.now() + e)
              , X = (e,t)=>{
                const n = Date.parse(e);
                return ((e,t)=>Math.abs(Z(t).getTime() - e) >= 3e5)(n, t) ? n - Date.now() : t
            }
              , Q = e=>K.isInstance(e) ? e.headers?.date ?? e.headers?.Date : void 0
              , Y = {
                name: "awsAuthMiddleware",
                tags: ["SIGNATURE", "AWSAUTH"],
                relation: "after",
                toMiddleware: "retryMiddleware",
                override: !0
            }
              , J = e=>({
                applyToStack: t=>{
                    t.addRelativeTo((e=>(t,n)=>async function(r) {
                        if (!V.isInstance(r.request))
                            return t(r);
                        const i = n.endpointV2?.properties?.authSchemes?.[0]
                          , o = "sigv4a" === i?.name ? i?.signingRegionSet?.join(",") : void 0
                          , s = await e.signer(i)
                          , a = await t({
                            ...r,
                            request: await s.sign(r.request, {
                                signingDate: Z(e.systemClockOffset),
                                signingRegion: o || n.signing_region,
                                signingService: n.signing_service
                            })
                        }).catch((t=>{
                            const n = t.ServerTime ?? Q(t.$response);
                            throw n && (e.systemClockOffset = X(n, e.systemClockOffset)),
                            t
                        }
                        ))
                          , u = Q(a.response);
                        return u && (e.systemClockOffset = X(u, e.systemClockOffset)),
                        a
                    }
                    )(e), Y)
                }
            });
            class ee {
                trace() {}
                debug() {}
                info() {}
                warn() {}
                error() {}
            }
            const te = ()=>{
                let e = []
                  , t = [];
                const n = new Set
                  , r = n=>(e.forEach((e=>{
                    n.add(e.middleware, {
                        ...e
                    })
                }
                )),
                t.forEach((e=>{
                    n.addRelativeTo(e.middleware, {
                        ...e
                    })
                }
                )),
                n)
                  , i = e=>{
                    const t = [];
                    return e.before.forEach((e=>{
                        0 === e.before.length && 0 === e.after.length ? t.push(e) : t.push(...i(e))
                    }
                    )),
                    t.push(e),
                    e.after.reverse().forEach((e=>{
                        0 === e.before.length && 0 === e.after.length ? t.push(e) : t.push(...i(e))
                    }
                    )),
                    t
                }
                  , o = (n=!1)=>{
                    const r = []
                      , o = []
                      , s = {};
                    var a;
                    return e.forEach((e=>{
                        const t = {
                            ...e,
                            before: [],
                            after: []
                        };
                        t.name && (s[t.name] = t),
                        r.push(t)
                    }
                    )),
                    t.forEach((e=>{
                        const t = {
                            ...e,
                            before: [],
                            after: []
                        };
                        t.name && (s[t.name] = t),
                        o.push(t)
                    }
                    )),
                    o.forEach((e=>{
                        if (e.toMiddleware) {
                            const t = s[e.toMiddleware];
                            if (void 0 === t) {
                                if (n)
                                    return;
                                throw new Error(`${e.toMiddleware} is not found when adding ${e.name || "anonymous"} middleware ${e.relation} ${e.toMiddleware}`)
                            }
                            "after" === e.relation && t.after.push(e),
                            "before" === e.relation && t.before.push(e)
                        }
                    }
                    )),
                    (a = r,
                    a.sort(((e,t)=>ne[t.step] - ne[e.step] || re[t.priority || "normal"] - re[e.priority || "normal"]))).map(i).reduce(((e,t)=>(e.push(...t),
                    e)), [])
                }
                  , s = {
                    add: (t,r={})=>{
                        const {name: i, override: o} = r
                          , s = {
                            step: "initialize",
                            priority: "normal",
                            middleware: t,
                            ...r
                        };
                        if (i) {
                            if (n.has(i)) {
                                if (!o)
                                    throw new Error(`Duplicate middleware name '${i}'`);
                                const t = e.findIndex((e=>e.name === i))
                                  , n = e[t];
                                if (n.step !== s.step || n.priority !== s.priority)
                                    throw new Error(`"${i}" middleware with ${n.priority} priority in ${n.step} step cannot be overridden by same-name middleware with ${s.priority} priority in ${s.step} step.`);
                                e.splice(t, 1)
                            }
                            n.add(i)
                        }
                        e.push(s)
                    }
                    ,
                    addRelativeTo: (e,r)=>{
                        const {name: i, override: o} = r
                          , s = {
                            middleware: e,
                            ...r
                        };
                        if (i) {
                            if (n.has(i)) {
                                if (!o)
                                    throw new Error(`Duplicate middleware name '${i}'`);
                                const e = t.findIndex((e=>e.name === i))
                                  , n = t[e];
                                if (n.toMiddleware !== s.toMiddleware || n.relation !== s.relation)
                                    throw new Error(`"${i}" middleware ${n.relation} "${n.toMiddleware}" middleware cannot be overridden by same-name middleware ${s.relation} "${s.toMiddleware}" middleware.`);
                                t.splice(e, 1)
                            }
                            n.add(i)
                        }
                        t.push(s)
                    }
                    ,
                    clone: ()=>r(te()),
                    use: e=>{
                        e.applyToStack(s)
                    }
                    ,
                    remove: r=>"string" == typeof r ? (r=>{
                        let i = !1;
                        const o = e=>!e.name || e.name !== r || (i = !0,
                        n.delete(r),
                        !1);
                        return e = e.filter(o),
                        t = t.filter(o),
                        i
                    }
                    )(r) : (r=>{
                        let i = !1;
                        const o = e=>e.middleware !== r || (i = !0,
                        e.name && n.delete(e.name),
                        !1);
                        return e = e.filter(o),
                        t = t.filter(o),
                        i
                    }
                    )(r),
                    removeByTag: r=>{
                        let i = !1;
                        const o = e=>{
                            const {tags: t, name: o} = e;
                            return !t || !t.includes(r) || (o && n.delete(o),
                            i = !0,
                            !1)
                        }
                        ;
                        return e = e.filter(o),
                        t = t.filter(o),
                        i
                    }
                    ,
                    concat: e=>{
                        const t = r(te());
                        return t.use(e),
                        t
                    }
                    ,
                    applyToStack: r,
                    identify: ()=>o(!0).map((e=>e.name + ": " + (e.tags || []).join(","))),
                    resolve: (e,t)=>{
                        for (const n of o().map((e=>e.middleware)).reverse())
                            e = n(e, t);
                        return e
                    }
                };
                return s
            }
              , ne = {
                initialize: 5,
                serialize: 4,
                build: 3,
                finalizeRequest: 2,
                deserialize: 1
            }
              , re = {
                high: 3,
                normal: 2,
                low: 1
            };
            class ie {
                constructor(e) {
                    this.middlewareStack = te(),
                    this.config = e
                }
                send(e, t, n) {
                    const r = "function" != typeof t ? t : void 0
                      , i = "function" == typeof t ? t : n
                      , o = e.resolveMiddleware(this.middlewareStack, this.config, r);
                    if (!i)
                        return o(e).then((e=>e.output));
                    o(e).then((e=>i(null, e.output)), (e=>i(e))).catch((()=>{}
                    ))
                }
                destroy() {
                    this.config.requestHandler.destroy && this.config.requestHandler.destroy()
                }
            }
            class oe {
                constructor() {
                    this.middlewareStack = te()
                }
            }
            const se = Math.ceil(2 ** 127 * (2 - 2 ** -23))
              , ae = e=>{
                const t = (e=>{
                    if (null != e) {
                        if ("string" == typeof e) {
                            const t = parseFloat(e);
                            if (!Number.isNaN(t))
                                return String(t) !== String(e) && ge.warn(he(`Expected number but observed string: ${e}`)),
                                t
                        }
                        if ("number" == typeof e)
                            return e;
                        throw new TypeError(`Expected number, got ${typeof e}: ${e}`)
                    }
                }
                )(e);
                if (void 0 !== t && !Number.isNaN(t) && t !== 1 / 0 && t !== -1 / 0 && Math.abs(t) > se)
                    throw new TypeError(`Expected 32-bit float, got ${e}`);
                return t
            }
              , ue = (e,t)=>{
                const n = (e=>{
                    if (null != e) {
                        if (Number.isInteger(e) && !Number.isNaN(e))
                            return e;
                        throw new TypeError(`Expected integer, got ${typeof e}: ${e}`)
                    }
                }
                )(e);
                if (void 0 !== n && ce(n, t) !== n)
                    throw new TypeError(`Expected ${t}-bit integer, got ${e}`);
                return n
            }
              , ce = (e,t)=>{
                switch (t) {
                case 32:
                    return Int32Array.of(e)[0];
                case 16:
                    return Int16Array.of(e)[0];
                case 8:
                    return Int8Array.of(e)[0]
                }
            }
              , le = e=>{
                if (null != e) {
                    if ("string" == typeof e)
                        return e;
                    if (["boolean", "number", "bigint"].includes(typeof e))
                        return ge.warn(he(`Expected string, got ${typeof e}: ${e}`)),
                        String(e);
                    throw new TypeError(`Expected string, got ${typeof e}: ${e}`)
                }
            }
              , de = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g
              , fe = e=>{
                const t = e.match(de);
                if (null === t || t[0].length !== e.length)
                    throw new TypeError("Expected real number, got implicit NaN");
                return parseFloat(e)
            }
              , pe = e=>(e=>ue(e, 32))("string" == typeof e ? fe(e) : e)
              , he = e=>String(new TypeError(e).stack || e).split("\n").slice(0, 5).filter((e=>!e.includes("stackTraceWarning"))).join("\n")
              , ge = {
                warn: console.warn
            }
              , me = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
              , ye = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/)
              , be = e=>{
                if (null == e)
                    return;
                if ("string" != typeof e)
                    throw new TypeError("RFC-3339 date-times must be expressed as strings");
                const t = ye.exec(e);
                if (!t)
                    throw new TypeError("Invalid RFC-3339 date-time value");
                const [n,r,i,o,s,a,u,c] = t
                  , l = (e=>(e=>ue(e, 16))("string" == typeof e ? fe(e) : e))(xe(r))
                  , d = Pe(i, "month", 1, 12)
                  , f = Pe(o, "day", 1, 31);
                return ve(l, d, f, {
                    hours: s,
                    minutes: a,
                    seconds: u,
                    fractionalMilliseconds: c
                })
            }
              , ve = (e,t,n,r)=>{
                const i = t - 1;
                return Se(e, i, n),
                new Date(Date.UTC(e, i, n, Pe(r.hours, "hour", 0, 23), Pe(r.minutes, "minute", 0, 59), Pe(r.seconds, "seconds", 0, 60), Ae(r.fractionalMilliseconds)))
            }
              , we = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
              , Se = (e,t,n)=>{
                let r = we[t];
                if (1 === t && Ee(e) && (r = 29),
                n > r)
                    throw new TypeError(`Invalid day for ${me[t]} in ${e}: ${n}`)
            }
              , Ee = e=>e % 4 == 0 && (e % 100 != 0 || e % 400 == 0)
              , Pe = (e,t,n,r)=>{
                const i = (e=>(e=>ue(e, 8))("string" == typeof e ? fe(e) : e))(xe(e));
                if (i < n || i > r)
                    throw new TypeError(`${t} must be between ${n} and ${r}, inclusive`);
                return i
            }
              , Ae = e=>null == e ? 0 : 1e3 * (e=>ae("string" == typeof e ? fe(e) : e))("0." + e)
              , xe = e=>{
                let t = 0;
                for (; t < e.length - 1 && "0" === e.charAt(t); )
                    t++;
                return 0 === t ? e : e.slice(t)
            }
            ;
            class _e extends Error {
                constructor(e) {
                    super(e.message),
                    Object.setPrototypeOf(this, _e.prototype),
                    this.name = e.name,
                    this.$fault = e.$fault,
                    this.$metadata = e.$metadata
                }
            }
            const Re = (e,t={})=>{
                Object.entries(t).filter((([,e])=>void 0 !== e)).forEach((([t,n])=>{
                    null != e[t] && "" !== e[t] || (e[t] = n)
                }
                ));
                const n = e.message || e.Message || "UnknownError";
                return e.message = n,
                delete e.Message,
                e
            }
              , Te = ({output: e, parsedBody: t, exceptionCtor: n, errorCode: r})=>{
                const i = Oe(e)
                  , o = i.httpStatusCode ? i.httpStatusCode + "" : void 0
                  , s = new n({
                    name: t.code || t.Code || r || o || "UnknownError",
                    $fault: "client",
                    $metadata: i
                });
                throw Re(s, t)
            }
              , Oe = e=>({
                httpStatusCode: e.statusCode,
                requestId: e.headers["x-amzn-requestid"] ?? e.headers["x-amzn-request-id"],
                extendedRequestId: e.headers["x-amz-id-2"],
                cfId: e.headers["x-amz-cf-id"]
            })
              , Me = e=>{
                switch (e) {
                case "standard":
                case "cross-region":
                    return {
                        retryMode: "standard",
                        connectionTimeout: 3100
                    };
                case "in-region":
                    return {
                        retryMode: "standard",
                        connectionTimeout: 1100
                    };
                case "mobile":
                    return {
                        retryMode: "standard",
                        connectionTimeout: 3e4
                    };
                default:
                    return {}
                }
            }
            ;
            function Ie(e) {
                return encodeURIComponent(e).replace(/[!'()*]/g, (function(e) {
                    return "%" + e.charCodeAt(0).toString(16).toUpperCase()
                }
                ))
            }
            const ke = e=>{
                for (const t in e)
                    e.hasOwnProperty(t) && void 0 !== e[t]["#text"] ? e[t] = e[t]["#text"] : "object" == typeof e[t] && null !== e[t] && (e[t] = ke(e[t]));
                return e
            }
              , Ce = function() {
                const e = Object.getPrototypeOf(this).constructor
                  , t = Function.bind.apply(String, [null, ...arguments])
                  , n = new t;
                return Object.setPrototypeOf(n, e.prototype),
                n
            };
            Ce.prototype = Object.create(String.prototype, {
                constructor: {
                    value: Ce,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            Object.setPrototypeOf(Ce, String);
            class Ne extends _e {
                constructor(e) {
                    super(e),
                    Object.setPrototypeOf(this, Ne.prototype)
                }
            }
            class Fe extends Ne {
                constructor(e) {
                    super({
                        name: "ExpiredTokenException",
                        $fault: "client",
                        ...e
                    }),
                    this.name = "ExpiredTokenException",
                    this.$fault = "client",
                    Object.setPrototypeOf(this, Fe.prototype)
                }
            }
            class je extends Ne {
                constructor(e) {
                    super({
                        name: "MalformedPolicyDocumentException",
                        $fault: "client",
                        ...e
                    }),
                    this.name = "MalformedPolicyDocumentException",
                    this.$fault = "client",
                    Object.setPrototypeOf(this, je.prototype)
                }
            }
            class De extends Ne {
                constructor(e) {
                    super({
                        name: "PackedPolicyTooLargeException",
                        $fault: "client",
                        ...e
                    }),
                    this.name = "PackedPolicyTooLargeException",
                    this.$fault = "client",
                    Object.setPrototypeOf(this, De.prototype)
                }
            }
            class $e extends Ne {
                constructor(e) {
                    super({
                        name: "RegionDisabledException",
                        $fault: "client",
                        ...e
                    }),
                    this.name = "RegionDisabledException",
                    this.$fault = "client",
                    Object.setPrototypeOf(this, $e.prototype)
                }
            }
            class Le extends Ne {
                constructor(e) {
                    super({
                        name: "IDPRejectedClaimException",
                        $fault: "client",
                        ...e
                    }),
                    this.name = "IDPRejectedClaimException",
                    this.$fault = "client",
                    Object.setPrototypeOf(this, Le.prototype)
                }
            }
            class Be extends Ne {
                constructor(e) {
                    super({
                        name: "InvalidIdentityTokenException",
                        $fault: "client",
                        ...e
                    }),
                    this.name = "InvalidIdentityTokenException",
                    this.$fault = "client",
                    Object.setPrototypeOf(this, Be.prototype)
                }
            }
            class Ue extends Ne {
                constructor(e) {
                    super({
                        name: "IDPCommunicationErrorException",
                        $fault: "client",
                        ...e
                    }),
                    this.name = "IDPCommunicationErrorException",
                    this.$fault = "client",
                    Object.setPrototypeOf(this, Ue.prototype)
                }
            }
            class ze extends Ne {
                constructor(e) {
                    super({
                        name: "InvalidAuthorizationMessageException",
                        $fault: "client",
                        ...e
                    }),
                    this.name = "InvalidAuthorizationMessageException",
                    this.$fault = "client",
                    Object.setPrototypeOf(this, ze.prototype)
                }
            }
            const qe = e=>({
                ...e
            })
              , We = e=>({
                ...e
            })
              , Ge = e=>({
                ...e
            })
              , He = e=>({
                ...e
            })
              , Ve = e=>({
                ...e
            })
              , Ke = e=>({
                ...e
            })
              , Ze = e=>({
                ...e
            })
              , Xe = e=>({
                ...e
            })
              , Qe = e=>({
                ...e
            })
              , Ye = e=>({
                ...e
            })
              , Je = e=>({
                ...e
            })
              , et = e=>({
                ...e
            })
              , tt = e=>({
                ...e
            })
              , nt = e=>({
                ...e
            })
              , rt = e=>({
                ...e
            })
              , it = e=>({
                ...e
            })
              , ot = e=>({
                ...e
            })
              , st = e=>({
                ...e
            })
              , at = e=>({
                ...e
            })
              , ut = e=>({
                ...e
            })
              , ct = e=>({
                ...e
            });
            var lt = n(932);
            const dt = async(e,t)=>{
                const n = e.body
                  , r = Ct(n.Error, t)
                  , i = new Fe({
                    $metadata: Ut(e),
                    ...r
                });
                return Re(i, n)
            }
              , ft = async(e,t)=>{
                const n = e.body
                  , r = Nt(n.Error, t)
                  , i = new Ue({
                    $metadata: Ut(e),
                    ...r
                });
                return Re(i, n)
            }
              , pt = async(e,t)=>{
                const n = e.body
                  , r = Ft(n.Error, t)
                  , i = new Le({
                    $metadata: Ut(e),
                    ...r
                });
                return Re(i, n)
            }
              , ht = async(e,t)=>{
                const n = e.body
                  , r = jt(n.Error, t)
                  , i = new ze({
                    $metadata: Ut(e),
                    ...r
                });
                return Re(i, n)
            }
              , gt = async(e,t)=>{
                const n = e.body
                  , r = Dt(n.Error, t)
                  , i = new Be({
                    $metadata: Ut(e),
                    ...r
                });
                return Re(i, n)
            }
              , mt = async(e,t)=>{
                const n = e.body
                  , r = $t(n.Error, t)
                  , i = new je({
                    $metadata: Ut(e),
                    ...r
                });
                return Re(i, n)
            }
              , yt = async(e,t)=>{
                const n = e.body
                  , r = Lt(n.Error, t)
                  , i = new De({
                    $metadata: Ut(e),
                    ...r
                });
                return Re(i, n)
            }
              , bt = async(e,t)=>{
                const n = e.body
                  , r = Bt(n.Error, t)
                  , i = new $e({
                    $metadata: Ut(e),
                    ...r
                });
                return Re(i, n)
            }
              , vt = (e,t)=>{
                const n = {};
                if (null != e.RoleArn && (n.RoleArn = e.RoleArn),
                null != e.RoleSessionName && (n.RoleSessionName = e.RoleSessionName),
                null != e.PolicyArns) {
                    const r = _t(e.PolicyArns, t);
                    0 === e.PolicyArns?.length && (n.PolicyArns = []),
                    Object.entries(r).forEach((([e,t])=>{
                        n[`PolicyArns.${e}`] = t
                    }
                    ))
                }
                if (null != e.Policy && (n.Policy = e.Policy),
                null != e.DurationSeconds && (n.DurationSeconds = e.DurationSeconds),
                null != e.Tags) {
                    const r = Mt(e.Tags, t);
                    0 === e.Tags?.length && (n.Tags = []),
                    Object.entries(r).forEach((([e,t])=>{
                        n[`Tags.${e}`] = t
                    }
                    ))
                }
                if (null != e.TransitiveTagKeys) {
                    const r = Ot(e.TransitiveTagKeys, t);
                    0 === e.TransitiveTagKeys?.length && (n.TransitiveTagKeys = []),
                    Object.entries(r).forEach((([e,t])=>{
                        n[`TransitiveTagKeys.${e}`] = t
                    }
                    ))
                }
                return null != e.ExternalId && (n.ExternalId = e.ExternalId),
                null != e.SerialNumber && (n.SerialNumber = e.SerialNumber),
                null != e.TokenCode && (n.TokenCode = e.TokenCode),
                null != e.SourceIdentity && (n.SourceIdentity = e.SourceIdentity),
                n
            }
              , wt = (e,t)=>{
                const n = {};
                if (null != e.RoleArn && (n.RoleArn = e.RoleArn),
                null != e.PrincipalArn && (n.PrincipalArn = e.PrincipalArn),
                null != e.SAMLAssertion && (n.SAMLAssertion = e.SAMLAssertion),
                null != e.PolicyArns) {
                    const r = _t(e.PolicyArns, t);
                    0 === e.PolicyArns?.length && (n.PolicyArns = []),
                    Object.entries(r).forEach((([e,t])=>{
                        n[`PolicyArns.${e}`] = t
                    }
                    ))
                }
                return null != e.Policy && (n.Policy = e.Policy),
                null != e.DurationSeconds && (n.DurationSeconds = e.DurationSeconds),
                n
            }
              , St = (e,t)=>{
                const n = {};
                if (null != e.RoleArn && (n.RoleArn = e.RoleArn),
                null != e.RoleSessionName && (n.RoleSessionName = e.RoleSessionName),
                null != e.WebIdentityToken && (n.WebIdentityToken = e.WebIdentityToken),
                null != e.ProviderId && (n.ProviderId = e.ProviderId),
                null != e.PolicyArns) {
                    const r = _t(e.PolicyArns, t);
                    0 === e.PolicyArns?.length && (n.PolicyArns = []),
                    Object.entries(r).forEach((([e,t])=>{
                        n[`PolicyArns.${e}`] = t
                    }
                    ))
                }
                return null != e.Policy && (n.Policy = e.Policy),
                null != e.DurationSeconds && (n.DurationSeconds = e.DurationSeconds),
                n
            }
              , Et = (e,t)=>{
                const n = {};
                return null != e.EncodedMessage && (n.EncodedMessage = e.EncodedMessage),
                n
            }
              , Pt = (e,t)=>{
                const n = {};
                return null != e.AccessKeyId && (n.AccessKeyId = e.AccessKeyId),
                n
            }
              , At = (e,t)=>{
                const n = {};
                if (null != e.Name && (n.Name = e.Name),
                null != e.Policy && (n.Policy = e.Policy),
                null != e.PolicyArns) {
                    const r = _t(e.PolicyArns, t);
                    0 === e.PolicyArns?.length && (n.PolicyArns = []),
                    Object.entries(r).forEach((([e,t])=>{
                        n[`PolicyArns.${e}`] = t
                    }
                    ))
                }
                if (null != e.DurationSeconds && (n.DurationSeconds = e.DurationSeconds),
                null != e.Tags) {
                    const r = Mt(e.Tags, t);
                    0 === e.Tags?.length && (n.Tags = []),
                    Object.entries(r).forEach((([e,t])=>{
                        n[`Tags.${e}`] = t
                    }
                    ))
                }
                return n
            }
              , xt = (e,t)=>{
                const n = {};
                return null != e.DurationSeconds && (n.DurationSeconds = e.DurationSeconds),
                null != e.SerialNumber && (n.SerialNumber = e.SerialNumber),
                null != e.TokenCode && (n.TokenCode = e.TokenCode),
                n
            }
              , _t = (e,t)=>{
                const n = {};
                let r = 1;
                for (const i of e) {
                    if (null === i)
                        continue;
                    const e = Rt(i, t);
                    Object.entries(e).forEach((([e,t])=>{
                        n[`member.${r}.${e}`] = t
                    }
                    )),
                    r++
                }
                return n
            }
              , Rt = (e,t)=>{
                const n = {};
                return null != e.arn && (n.arn = e.arn),
                n
            }
              , Tt = (e,t)=>{
                const n = {};
                return null != e.Key && (n.Key = e.Key),
                null != e.Value && (n.Value = e.Value),
                n
            }
              , Ot = (e,t)=>{
                const n = {};
                let r = 1;
                for (const t of e)
                    null !== t && (n[`member.${r}`] = t,
                    r++);
                return n
            }
              , Mt = (e,t)=>{
                const n = {};
                let r = 1;
                for (const t of e) {
                    if (null === t)
                        continue;
                    const e = Tt(t);
                    Object.entries(e).forEach((([e,t])=>{
                        n[`member.${r}.${e}`] = t
                    }
                    )),
                    r++
                }
                return n
            }
              , It = (e,t)=>{
                const n = {
                    AssumedRoleId: void 0,
                    Arn: void 0
                };
                return void 0 !== e.AssumedRoleId && (n.AssumedRoleId = le(e.AssumedRoleId)),
                void 0 !== e.Arn && (n.Arn = le(e.Arn)),
                n
            }
              , kt = (e,t)=>{
                const n = {
                    AccessKeyId: void 0,
                    SecretAccessKey: void 0,
                    SessionToken: void 0,
                    Expiration: void 0
                };
                return void 0 !== e.AccessKeyId && (n.AccessKeyId = le(e.AccessKeyId)),
                void 0 !== e.SecretAccessKey && (n.SecretAccessKey = le(e.SecretAccessKey)),
                void 0 !== e.SessionToken && (n.SessionToken = le(e.SessionToken)),
                void 0 !== e.Expiration && (n.Expiration = ((e,t)=>{
                    if (null == e)
                        throw new TypeError("Expected a non-null value");
                    return e
                }
                )(be(e.Expiration))),
                n
            }
              , Ct = (e,t)=>{
                const n = {
                    message: void 0
                };
                return void 0 !== e.message && (n.message = le(e.message)),
                n
            }
              , Nt = (e,t)=>{
                const n = {
                    message: void 0
                };
                return void 0 !== e.message && (n.message = le(e.message)),
                n
            }
              , Ft = (e,t)=>{
                const n = {
                    message: void 0
                };
                return void 0 !== e.message && (n.message = le(e.message)),
                n
            }
              , jt = (e,t)=>{
                const n = {
                    message: void 0
                };
                return void 0 !== e.message && (n.message = le(e.message)),
                n
            }
              , Dt = (e,t)=>{
                const n = {
                    message: void 0
                };
                return void 0 !== e.message && (n.message = le(e.message)),
                n
            }
              , $t = (e,t)=>{
                const n = {
                    message: void 0
                };
                return void 0 !== e.message && (n.message = le(e.message)),
                n
            }
              , Lt = (e,t)=>{
                const n = {
                    message: void 0
                };
                return void 0 !== e.message && (n.message = le(e.message)),
                n
            }
              , Bt = (e,t)=>{
                const n = {
                    message: void 0
                };
                return void 0 !== e.message && (n.message = le(e.message)),
                n
            }
              , Ut = e=>({
                httpStatusCode: e.statusCode,
                requestId: e.headers["x-amzn-requestid"] ?? e.headers["x-amzn-request-id"] ?? e.headers["x-amz-request-id"],
                extendedRequestId: e.headers["x-amz-id-2"],
                cfId: e.headers["x-amz-cf-id"]
            })
              , zt = async(e,t,n,r,i)=>{
                const {hostname: o, protocol: s="https", port: a, path: u} = await e.endpoint()
                  , c = {
                    protocol: s,
                    hostname: o,
                    port: a,
                    method: "POST",
                    path: u.endsWith("/") ? u.slice(0, -1) + n : u + n,
                    headers: t
                };
                return void 0 !== r && (c.hostname = r),
                void 0 !== i && (c.body = i),
                new V(c)
            }
              , qt = (e,t)=>((e,t)=>((e=new Uint8Array,t)=>e instanceof Uint8Array ? Promise.resolve(e) : t.streamCollector(e) || Promise.resolve(new Uint8Array))(e, t).then((e=>t.utf8Encoder(e))))(e, t).then((e=>{
                if (e.length) {
                    const t = new lt.XMLParser({
                        attributeNamePrefix: "",
                        htmlEntities: !0,
                        ignoreAttributes: !1,
                        ignoreDeclaration: !0,
                        parseTagValue: !1,
                        trimValues: !1,
                        tagValueProcessor: (e,t)=>"" === t.trim() && t.includes("\n") ? "" : void 0
                    });
                    t.addEntity("#xD", "\r"),
                    t.addEntity("#10", "\n");
                    const n = t.parse(e)
                      , r = "#text"
                      , i = Object.keys(n)[0]
                      , o = n[i];
                    return o[r] && (o[i] = o[r],
                    delete o[r]),
                    ke(o)
                }
                return {}
            }
            ))
              , Wt = async(e,t)=>{
                const n = await qt(e, t);
                return n.Error && (n.Error.message = n.Error.message ?? n.Error.Message),
                n
            }
              , Gt = e=>Object.entries(e).map((([e,t])=>Ie(e) + "=" + Ie(t))).join("&")
              , Ht = (e,t)=>void 0 !== t.Error.Code ? t.Error.Code : 404 == e.statusCode ? "NotFound" : void 0;
            class Vt extends oe {
                constructor(e) {
                    super(),
                    this.input = e
                }
                static getEndpointParameterInstructions() {
                    return {
                        UseGlobalEndpoint: {
                            type: "builtInParams",
                            name: "useGlobalEndpoint"
                        },
                        UseFIPS: {
                            type: "builtInParams",
                            name: "useFipsEndpoint"
                        },
                        Endpoint: {
                            type: "builtInParams",
                            name: "endpoint"
                        },
                        Region: {
                            type: "builtInParams",
                            name: "region"
                        },
                        UseDualStack: {
                            type: "builtInParams",
                            name: "useDualstackEndpoint"
                        }
                    }
                }
                resolveMiddleware(e, t, n) {
                    this.middlewareStack.use(a(t, this.serialize, this.deserialize)),
                    this.middlewareStack.use(h(t, Vt.getEndpointParameterInstructions())),
                    this.middlewareStack.use(J(t));
                    const r = e.concat(this.middlewareStack)
                      , {logger: i} = t
                      , o = {
                        logger: i,
                        clientName: "STSClient",
                        commandName: "AssumeRoleCommand",
                        inputFilterSensitiveLog: He,
                        outputFilterSensitiveLog: Ke
                    }
                      , {requestHandler: s} = t;
                    return r.resolve((e=>s.handle(e.request, n || {})), o)
                }
                serialize(e, t) {
                    return (async(e,t)=>{
                        let n;
                        return n = Gt({
                            ...vt(e, t),
                            Action: "AssumeRole",
                            Version: "2011-06-15"
                        }),
                        zt(t, {
                            "content-type": "application/x-www-form-urlencoded"
                        }, "/", void 0, n)
                    }
                    )(e, t)
                }
                deserialize(e, t) {
                    return (async(e,t)=>{
                        if (e.statusCode >= 300)
                            return (async(e,t)=>{
                                const n = {
                                    ...e,
                                    body: await Wt(e.body, t)
                                }
                                  , r = Ht(e, n.body);
                                switch (r) {
                                case "ExpiredTokenException":
                                case "com.amazonaws.sts#ExpiredTokenException":
                                    throw await dt(n, t);
                                case "MalformedPolicyDocument":
                                case "com.amazonaws.sts#MalformedPolicyDocumentException":
                                    throw await mt(n, t);
                                case "PackedPolicyTooLarge":
                                case "com.amazonaws.sts#PackedPolicyTooLargeException":
                                    throw await yt(n, t);
                                case "RegionDisabledException":
                                case "com.amazonaws.sts#RegionDisabledException":
                                    throw await bt(n, t);
                                default:
                                    const i = n.body;
                                    Te({
                                        output: e,
                                        parsedBody: i.Error,
                                        exceptionCtor: Ne,
                                        errorCode: r
                                    })
                                }
                            }
                            )(e, t);
                        let n = {};
                        n = ((e,t)=>{
                            const n = {
                                Credentials: void 0,
                                AssumedRoleUser: void 0,
                                PackedPolicySize: void 0,
                                SourceIdentity: void 0
                            };
                            return void 0 !== e.Credentials && (n.Credentials = kt(e.Credentials, t)),
                            void 0 !== e.AssumedRoleUser && (n.AssumedRoleUser = It(e.AssumedRoleUser)),
                            void 0 !== e.PackedPolicySize && (n.PackedPolicySize = pe(e.PackedPolicySize)),
                            void 0 !== e.SourceIdentity && (n.SourceIdentity = le(e.SourceIdentity)),
                            n
                        }
                        )((await qt(e.body, t)).AssumeRoleResult, t);
                        const r = {
                            $metadata: Ut(e),
                            ...n
                        };
                        return Promise.resolve(r)
                    }
                    )(e, t)
                }
            }
            class Kt extends oe {
                constructor(e) {
                    super(),
                    this.input = e
                }
                static getEndpointParameterInstructions() {
                    return {
                        UseGlobalEndpoint: {
                            type: "builtInParams",
                            name: "useGlobalEndpoint"
                        },
                        UseFIPS: {
                            type: "builtInParams",
                            name: "useFipsEndpoint"
                        },
                        Endpoint: {
                            type: "builtInParams",
                            name: "endpoint"
                        },
                        Region: {
                            type: "builtInParams",
                            name: "region"
                        },
                        UseDualStack: {
                            type: "builtInParams",
                            name: "useDualstackEndpoint"
                        }
                    }
                }
                resolveMiddleware(e, t, n) {
                    this.middlewareStack.use(a(t, this.serialize, this.deserialize)),
                    this.middlewareStack.use(h(t, Kt.getEndpointParameterInstructions()));
                    const r = e.concat(this.middlewareStack)
                      , {logger: i} = t
                      , o = {
                        logger: i,
                        clientName: "STSClient",
                        commandName: "AssumeRoleWithSAMLCommand",
                        inputFilterSensitiveLog: Ze,
                        outputFilterSensitiveLog: Xe
                    }
                      , {requestHandler: s} = t;
                    return r.resolve((e=>s.handle(e.request, n || {})), o)
                }
                serialize(e, t) {
                    return (async(e,t)=>{
                        let n;
                        return n = Gt({
                            ...wt(e, t),
                            Action: "AssumeRoleWithSAML",
                            Version: "2011-06-15"
                        }),
                        zt(t, {
                            "content-type": "application/x-www-form-urlencoded"
                        }, "/", void 0, n)
                    }
                    )(e, t)
                }
                deserialize(e, t) {
                    return (async(e,t)=>{
                        if (e.statusCode >= 300)
                            return (async(e,t)=>{
                                const n = {
                                    ...e,
                                    body: await Wt(e.body, t)
                                }
                                  , r = Ht(e, n.body);
                                switch (r) {
                                case "ExpiredTokenException":
                                case "com.amazonaws.sts#ExpiredTokenException":
                                    throw await dt(n, t);
                                case "IDPRejectedClaim":
                                case "com.amazonaws.sts#IDPRejectedClaimException":
                                    throw await pt(n, t);
                                case "InvalidIdentityToken":
                                case "com.amazonaws.sts#InvalidIdentityTokenException":
                                    throw await gt(n, t);
                                case "MalformedPolicyDocument":
                                case "com.amazonaws.sts#MalformedPolicyDocumentException":
                                    throw await mt(n, t);
                                case "PackedPolicyTooLarge":
                                case "com.amazonaws.sts#PackedPolicyTooLargeException":
                                    throw await yt(n, t);
                                case "RegionDisabledException":
                                case "com.amazonaws.sts#RegionDisabledException":
                                    throw await bt(n, t);
                                default:
                                    const i = n.body;
                                    Te({
                                        output: e,
                                        parsedBody: i.Error,
                                        exceptionCtor: Ne,
                                        errorCode: r
                                    })
                                }
                            }
                            )(e, t);
                        let n = {};
                        n = ((e,t)=>{
                            const n = {
                                Credentials: void 0,
                                AssumedRoleUser: void 0,
                                PackedPolicySize: void 0,
                                Subject: void 0,
                                SubjectType: void 0,
                                Issuer: void 0,
                                Audience: void 0,
                                NameQualifier: void 0,
                                SourceIdentity: void 0
                            };
                            return void 0 !== e.Credentials && (n.Credentials = kt(e.Credentials, t)),
                            void 0 !== e.AssumedRoleUser && (n.AssumedRoleUser = It(e.AssumedRoleUser)),
                            void 0 !== e.PackedPolicySize && (n.PackedPolicySize = pe(e.PackedPolicySize)),
                            void 0 !== e.Subject && (n.Subject = le(e.Subject)),
                            void 0 !== e.SubjectType && (n.SubjectType = le(e.SubjectType)),
                            void 0 !== e.Issuer && (n.Issuer = le(e.Issuer)),
                            void 0 !== e.Audience && (n.Audience = le(e.Audience)),
                            void 0 !== e.NameQualifier && (n.NameQualifier = le(e.NameQualifier)),
                            void 0 !== e.SourceIdentity && (n.SourceIdentity = le(e.SourceIdentity)),
                            n
                        }
                        )((await qt(e.body, t)).AssumeRoleWithSAMLResult, t);
                        const r = {
                            $metadata: Ut(e),
                            ...n
                        };
                        return Promise.resolve(r)
                    }
                    )(e, t)
                }
            }
            class Zt extends oe {
                constructor(e) {
                    super(),
                    this.input = e
                }
                static getEndpointParameterInstructions() {
                    return {
                        UseGlobalEndpoint: {
                            type: "builtInParams",
                            name: "useGlobalEndpoint"
                        },
                        UseFIPS: {
                            type: "builtInParams",
                            name: "useFipsEndpoint"
                        },
                        Endpoint: {
                            type: "builtInParams",
                            name: "endpoint"
                        },
                        Region: {
                            type: "builtInParams",
                            name: "region"
                        },
                        UseDualStack: {
                            type: "builtInParams",
                            name: "useDualstackEndpoint"
                        }
                    }
                }
                resolveMiddleware(e, t, n) {
                    this.middlewareStack.use(a(t, this.serialize, this.deserialize)),
                    this.middlewareStack.use(h(t, Zt.getEndpointParameterInstructions()));
                    const r = e.concat(this.middlewareStack)
                      , {logger: i} = t
                      , o = {
                        logger: i,
                        clientName: "STSClient",
                        commandName: "AssumeRoleWithWebIdentityCommand",
                        inputFilterSensitiveLog: Qe,
                        outputFilterSensitiveLog: Ye
                    }
                      , {requestHandler: s} = t;
                    return r.resolve((e=>s.handle(e.request, n || {})), o)
                }
                serialize(e, t) {
                    return (async(e,t)=>{
                        let n;
                        return n = Gt({
                            ...St(e, t),
                            Action: "AssumeRoleWithWebIdentity",
                            Version: "2011-06-15"
                        }),
                        zt(t, {
                            "content-type": "application/x-www-form-urlencoded"
                        }, "/", void 0, n)
                    }
                    )(e, t)
                }
                deserialize(e, t) {
                    return (async(e,t)=>{
                        if (e.statusCode >= 300)
                            return (async(e,t)=>{
                                const n = {
                                    ...e,
                                    body: await Wt(e.body, t)
                                }
                                  , r = Ht(e, n.body);
                                switch (r) {
                                case "ExpiredTokenException":
                                case "com.amazonaws.sts#ExpiredTokenException":
                                    throw await dt(n, t);
                                case "IDPCommunicationError":
                                case "com.amazonaws.sts#IDPCommunicationErrorException":
                                    throw await ft(n, t);
                                case "IDPRejectedClaim":
                                case "com.amazonaws.sts#IDPRejectedClaimException":
                                    throw await pt(n, t);
                                case "InvalidIdentityToken":
                                case "com.amazonaws.sts#InvalidIdentityTokenException":
                                    throw await gt(n, t);
                                case "MalformedPolicyDocument":
                                case "com.amazonaws.sts#MalformedPolicyDocumentException":
                                    throw await mt(n, t);
                                case "PackedPolicyTooLarge":
                                case "com.amazonaws.sts#PackedPolicyTooLargeException":
                                    throw await yt(n, t);
                                case "RegionDisabledException":
                                case "com.amazonaws.sts#RegionDisabledException":
                                    throw await bt(n, t);
                                default:
                                    const i = n.body;
                                    Te({
                                        output: e,
                                        parsedBody: i.Error,
                                        exceptionCtor: Ne,
                                        errorCode: r
                                    })
                                }
                            }
                            )(e, t);
                        let n = {};
                        n = ((e,t)=>{
                            const n = {
                                Credentials: void 0,
                                SubjectFromWebIdentityToken: void 0,
                                AssumedRoleUser: void 0,
                                PackedPolicySize: void 0,
                                Provider: void 0,
                                Audience: void 0,
                                SourceIdentity: void 0
                            };
                            return void 0 !== e.Credentials && (n.Credentials = kt(e.Credentials, t)),
                            void 0 !== e.SubjectFromWebIdentityToken && (n.SubjectFromWebIdentityToken = le(e.SubjectFromWebIdentityToken)),
                            void 0 !== e.AssumedRoleUser && (n.AssumedRoleUser = It(e.AssumedRoleUser)),
                            void 0 !== e.PackedPolicySize && (n.PackedPolicySize = pe(e.PackedPolicySize)),
                            void 0 !== e.Provider && (n.Provider = le(e.Provider)),
                            void 0 !== e.Audience && (n.Audience = le(e.Audience)),
                            void 0 !== e.SourceIdentity && (n.SourceIdentity = le(e.SourceIdentity)),
                            n
                        }
                        )((await qt(e.body, t)).AssumeRoleWithWebIdentityResult, t);
                        const r = {
                            $metadata: Ut(e),
                            ...n
                        };
                        return Promise.resolve(r)
                    }
                    )(e, t)
                }
            }
            class Xt extends oe {
                constructor(e) {
                    super(),
                    this.input = e
                }
                static getEndpointParameterInstructions() {
                    return {
                        UseGlobalEndpoint: {
                            type: "builtInParams",
                            name: "useGlobalEndpoint"
                        },
                        UseFIPS: {
                            type: "builtInParams",
                            name: "useFipsEndpoint"
                        },
                        Endpoint: {
                            type: "builtInParams",
                            name: "endpoint"
                        },
                        Region: {
                            type: "builtInParams",
                            name: "region"
                        },
                        UseDualStack: {
                            type: "builtInParams",
                            name: "useDualstackEndpoint"
                        }
                    }
                }
                resolveMiddleware(e, t, n) {
                    this.middlewareStack.use(a(t, this.serialize, this.deserialize)),
                    this.middlewareStack.use(h(t, Xt.getEndpointParameterInstructions())),
                    this.middlewareStack.use(J(t));
                    const r = e.concat(this.middlewareStack)
                      , {logger: i} = t
                      , o = {
                        logger: i,
                        clientName: "STSClient",
                        commandName: "DecodeAuthorizationMessageCommand",
                        inputFilterSensitiveLog: Je,
                        outputFilterSensitiveLog: et
                    }
                      , {requestHandler: s} = t;
                    return r.resolve((e=>s.handle(e.request, n || {})), o)
                }
                serialize(e, t) {
                    return (async(e,t)=>{
                        let n;
                        return n = Gt({
                            ...Et(e),
                            Action: "DecodeAuthorizationMessage",
                            Version: "2011-06-15"
                        }),
                        zt(t, {
                            "content-type": "application/x-www-form-urlencoded"
                        }, "/", void 0, n)
                    }
                    )(e, t)
                }
                deserialize(e, t) {
                    return (async(e,t)=>{
                        if (e.statusCode >= 300)
                            return (async(e,t)=>{
                                const n = {
                                    ...e,
                                    body: await Wt(e.body, t)
                                }
                                  , r = Ht(e, n.body);
                                switch (r) {
                                case "InvalidAuthorizationMessageException":
                                case "com.amazonaws.sts#InvalidAuthorizationMessageException":
                                    throw await ht(n, t);
                                default:
                                    const i = n.body;
                                    Te({
                                        output: e,
                                        parsedBody: i.Error,
                                        exceptionCtor: Ne,
                                        errorCode: r
                                    })
                                }
                            }
                            )(e, t);
                        let n = {};
                        n = ((e,t)=>{
                            const n = {
                                DecodedMessage: void 0
                            };
                            return void 0 !== e.DecodedMessage && (n.DecodedMessage = le(e.DecodedMessage)),
                            n
                        }
                        )((await qt(e.body, t)).DecodeAuthorizationMessageResult);
                        const r = {
                            $metadata: Ut(e),
                            ...n
                        };
                        return Promise.resolve(r)
                    }
                    )(e, t)
                }
            }
            class Qt extends oe {
                constructor(e) {
                    super(),
                    this.input = e
                }
                static getEndpointParameterInstructions() {
                    return {
                        UseGlobalEndpoint: {
                            type: "builtInParams",
                            name: "useGlobalEndpoint"
                        },
                        UseFIPS: {
                            type: "builtInParams",
                            name: "useFipsEndpoint"
                        },
                        Endpoint: {
                            type: "builtInParams",
                            name: "endpoint"
                        },
                        Region: {
                            type: "builtInParams",
                            name: "region"
                        },
                        UseDualStack: {
                            type: "builtInParams",
                            name: "useDualstackEndpoint"
                        }
                    }
                }
                resolveMiddleware(e, t, n) {
                    this.middlewareStack.use(a(t, this.serialize, this.deserialize)),
                    this.middlewareStack.use(h(t, Qt.getEndpointParameterInstructions())),
                    this.middlewareStack.use(J(t));
                    const r = e.concat(this.middlewareStack)
                      , {logger: i} = t
                      , o = {
                        logger: i,
                        clientName: "STSClient",
                        commandName: "GetAccessKeyInfoCommand",
                        inputFilterSensitiveLog: tt,
                        outputFilterSensitiveLog: nt
                    }
                      , {requestHandler: s} = t;
                    return r.resolve((e=>s.handle(e.request, n || {})), o)
                }
                serialize(e, t) {
                    return (async(e,t)=>{
                        let n;
                        return n = Gt({
                            ...Pt(e),
                            Action: "GetAccessKeyInfo",
                            Version: "2011-06-15"
                        }),
                        zt(t, {
                            "content-type": "application/x-www-form-urlencoded"
                        }, "/", void 0, n)
                    }
                    )(e, t)
                }
                deserialize(e, t) {
                    return (async(e,t)=>{
                        if (e.statusCode >= 300)
                            return (async(e,t)=>{
                                const n = {
                                    ...e,
                                    body: await Wt(e.body, t)
                                }
                                  , r = Ht(e, n.body)
                                  , i = n.body;
                                Te({
                                    output: e,
                                    parsedBody: i.Error,
                                    exceptionCtor: Ne,
                                    errorCode: r
                                })
                            }
                            )(e, t);
                        let n = {};
                        n = ((e,t)=>{
                            const n = {
                                Account: void 0
                            };
                            return void 0 !== e.Account && (n.Account = le(e.Account)),
                            n
                        }
                        )((await qt(e.body, t)).GetAccessKeyInfoResult);
                        const r = {
                            $metadata: Ut(e),
                            ...n
                        };
                        return Promise.resolve(r)
                    }
                    )(e, t)
                }
            }
            class Yt extends oe {
                constructor(e) {
                    super(),
                    this.input = e
                }
                static getEndpointParameterInstructions() {
                    return {
                        UseGlobalEndpoint: {
                            type: "builtInParams",
                            name: "useGlobalEndpoint"
                        },
                        UseFIPS: {
                            type: "builtInParams",
                            name: "useFipsEndpoint"
                        },
                        Endpoint: {
                            type: "builtInParams",
                            name: "endpoint"
                        },
                        Region: {
                            type: "builtInParams",
                            name: "region"
                        },
                        UseDualStack: {
                            type: "builtInParams",
                            name: "useDualstackEndpoint"
                        }
                    }
                }
                resolveMiddleware(e, t, n) {
                    this.middlewareStack.use(a(t, this.serialize, this.deserialize)),
                    this.middlewareStack.use(h(t, Yt.getEndpointParameterInstructions())),
                    this.middlewareStack.use(J(t));
                    const r = e.concat(this.middlewareStack)
                      , {logger: i} = t
                      , o = {
                        logger: i,
                        clientName: "STSClient",
                        commandName: "GetCallerIdentityCommand",
                        inputFilterSensitiveLog: rt,
                        outputFilterSensitiveLog: it
                    }
                      , {requestHandler: s} = t;
                    return r.resolve((e=>s.handle(e.request, n || {})), o)
                }
                serialize(e, t) {
                    return (async(e,t)=>{
                        let n;
                        return n = Gt({
                            Action: "GetCallerIdentity",
                            Version: "2011-06-15"
                        }),
                        zt(t, {
                            "content-type": "application/x-www-form-urlencoded"
                        }, "/", void 0, n)
                    }
                    )(0, t)
                }
                deserialize(e, t) {
                    return (async(e,t)=>{
                        if (e.statusCode >= 300)
                            return (async(e,t)=>{
                                const n = {
                                    ...e,
                                    body: await Wt(e.body, t)
                                }
                                  , r = Ht(e, n.body)
                                  , i = n.body;
                                Te({
                                    output: e,
                                    parsedBody: i.Error,
                                    exceptionCtor: Ne,
                                    errorCode: r
                                })
                            }
                            )(e, t);
                        let n = {};
                        n = ((e,t)=>{
                            const n = {
                                UserId: void 0,
                                Account: void 0,
                                Arn: void 0
                            };
                            return void 0 !== e.UserId && (n.UserId = le(e.UserId)),
                            void 0 !== e.Account && (n.Account = le(e.Account)),
                            void 0 !== e.Arn && (n.Arn = le(e.Arn)),
                            n
                        }
                        )((await qt(e.body, t)).GetCallerIdentityResult);
                        const r = {
                            $metadata: Ut(e),
                            ...n
                        };
                        return Promise.resolve(r)
                    }
                    )(e, t)
                }
            }
            class Jt extends oe {
                constructor(e) {
                    super(),
                    this.input = e
                }
                static getEndpointParameterInstructions() {
                    return {
                        UseGlobalEndpoint: {
                            type: "builtInParams",
                            name: "useGlobalEndpoint"
                        },
                        UseFIPS: {
                            type: "builtInParams",
                            name: "useFipsEndpoint"
                        },
                        Endpoint: {
                            type: "builtInParams",
                            name: "endpoint"
                        },
                        Region: {
                            type: "builtInParams",
                            name: "region"
                        },
                        UseDualStack: {
                            type: "builtInParams",
                            name: "useDualstackEndpoint"
                        }
                    }
                }
                resolveMiddleware(e, t, n) {
                    this.middlewareStack.use(a(t, this.serialize, this.deserialize)),
                    this.middlewareStack.use(h(t, Jt.getEndpointParameterInstructions())),
                    this.middlewareStack.use(J(t));
                    const r = e.concat(this.middlewareStack)
                      , {logger: i} = t
                      , o = {
                        logger: i,
                        clientName: "STSClient",
                        commandName: "GetFederationTokenCommand",
                        inputFilterSensitiveLog: ot,
                        outputFilterSensitiveLog: at
                    }
                      , {requestHandler: s} = t;
                    return r.resolve((e=>s.handle(e.request, n || {})), o)
                }
                serialize(e, t) {
                    return (async(e,t)=>{
                        let n;
                        return n = Gt({
                            ...At(e, t),
                            Action: "GetFederationToken",
                            Version: "2011-06-15"
                        }),
                        zt(t, {
                            "content-type": "application/x-www-form-urlencoded"
                        }, "/", void 0, n)
                    }
                    )(e, t)
                }
                deserialize(e, t) {
                    return (async(e,t)=>{
                        if (e.statusCode >= 300)
                            return (async(e,t)=>{
                                const n = {
                                    ...e,
                                    body: await Wt(e.body, t)
                                }
                                  , r = Ht(e, n.body);
                                switch (r) {
                                case "MalformedPolicyDocument":
                                case "com.amazonaws.sts#MalformedPolicyDocumentException":
                                    throw await mt(n, t);
                                case "PackedPolicyTooLarge":
                                case "com.amazonaws.sts#PackedPolicyTooLargeException":
                                    throw await yt(n, t);
                                case "RegionDisabledException":
                                case "com.amazonaws.sts#RegionDisabledException":
                                    throw await bt(n, t);
                                default:
                                    const i = n.body;
                                    Te({
                                        output: e,
                                        parsedBody: i.Error,
                                        exceptionCtor: Ne,
                                        errorCode: r
                                    })
                                }
                            }
                            )(e, t);
                        let n = {};
                        n = ((e,t)=>{
                            const n = {
                                Credentials: void 0,
                                FederatedUser: void 0,
                                PackedPolicySize: void 0
                            };
                            return void 0 !== e.Credentials && (n.Credentials = kt(e.Credentials, t)),
                            void 0 !== e.FederatedUser && (n.FederatedUser = ((e,t)=>{
                                const n = {
                                    FederatedUserId: void 0,
                                    Arn: void 0
                                };
                                return void 0 !== e.FederatedUserId && (n.FederatedUserId = le(e.FederatedUserId)),
                                void 0 !== e.Arn && (n.Arn = le(e.Arn)),
                                n
                            }
                            )(e.FederatedUser)),
                            void 0 !== e.PackedPolicySize && (n.PackedPolicySize = pe(e.PackedPolicySize)),
                            n
                        }
                        )((await qt(e.body, t)).GetFederationTokenResult, t);
                        const r = {
                            $metadata: Ut(e),
                            ...n
                        };
                        return Promise.resolve(r)
                    }
                    )(e, t)
                }
            }
            class en extends oe {
                constructor(e) {
                    super(),
                    this.input = e
                }
                static getEndpointParameterInstructions() {
                    return {
                        UseGlobalEndpoint: {
                            type: "builtInParams",
                            name: "useGlobalEndpoint"
                        },
                        UseFIPS: {
                            type: "builtInParams",
                            name: "useFipsEndpoint"
                        },
                        Endpoint: {
                            type: "builtInParams",
                            name: "endpoint"
                        },
                        Region: {
                            type: "builtInParams",
                            name: "region"
                        },
                        UseDualStack: {
                            type: "builtInParams",
                            name: "useDualstackEndpoint"
                        }
                    }
                }
                resolveMiddleware(e, t, n) {
                    this.middlewareStack.use(a(t, this.serialize, this.deserialize)),
                    this.middlewareStack.use(h(t, en.getEndpointParameterInstructions())),
                    this.middlewareStack.use(J(t));
                    const r = e.concat(this.middlewareStack)
                      , {logger: i} = t
                      , o = {
                        logger: i,
                        clientName: "STSClient",
                        commandName: "GetSessionTokenCommand",
                        inputFilterSensitiveLog: ut,
                        outputFilterSensitiveLog: ct
                    }
                      , {requestHandler: s} = t;
                    return r.resolve((e=>s.handle(e.request, n || {})), o)
                }
                serialize(e, t) {
                    return (async(e,t)=>{
                        let n;
                        return n = Gt({
                            ...xt(e),
                            Action: "GetSessionToken",
                            Version: "2011-06-15"
                        }),
                        zt(t, {
                            "content-type": "application/x-www-form-urlencoded"
                        }, "/", void 0, n)
                    }
                    )(e, t)
                }
                deserialize(e, t) {
                    return (async(e,t)=>{
                        if (e.statusCode >= 300)
                            return (async(e,t)=>{
                                const n = {
                                    ...e,
                                    body: await Wt(e.body, t)
                                }
                                  , r = Ht(e, n.body);
                                switch (r) {
                                case "RegionDisabledException":
                                case "com.amazonaws.sts#RegionDisabledException":
                                    throw await bt(n, t);
                                default:
                                    const i = n.body;
                                    Te({
                                        output: e,
                                        parsedBody: i.Error,
                                        exceptionCtor: Ne,
                                        errorCode: r
                                    })
                                }
                            }
                            )(e, t);
                        let n = {};
                        n = ((e,t)=>{
                            const n = {
                                Credentials: void 0
                            };
                            return void 0 !== e.Credentials && (n.Credentials = kt(e.Credentials, t)),
                            n
                        }
                        )((await qt(e.body, t)).GetSessionTokenResult, t);
                        const r = {
                            $metadata: Ut(e),
                            ...n
                        };
                        return Promise.resolve(r)
                    }
                    )(e, t)
                }
            }
            var tn;
            !function(e) {
                e.ENV = "env",
                e.CONFIG = "shared config entry"
            }(tn || (tn = {}));
            const nn = e=>"string" == typeof e && (e.startsWith("fips-") || e.endsWith("-fips"))
              , rn = e=>nn(e) ? ["fips-aws-global", "aws-fips"].includes(e) ? "us-east-1" : e.replace(/fips-(dkr-|prod-)?|-fips/, "") : e
              , on = "content-length"
              , sn = {
                step: "build",
                tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
                name: "contentLengthMiddleware",
                override: !0
            }
              , an = {
                name: "hostHeaderMiddleware",
                step: "build",
                priority: "low",
                tags: ["HOST"],
                override: !0
            }
              , un = {
                name: "loggerMiddleware",
                tags: ["LOGGER"],
                step: "initialize",
                override: !0
            }
              , cn = {
                step: "build",
                tags: ["RECURSION_DETECTION"],
                name: "recursionDetectionMiddleware",
                override: !0,
                priority: "low"
            };
            var ln;
            !function(e) {
                e.STANDARD = "standard",
                e.ADAPTIVE = "adaptive"
            }(ln || (ln = {}));
            const dn = ln.STANDARD
              , fn = ["AuthFailure", "InvalidSignatureException", "RequestExpired", "RequestInTheFuture", "RequestTimeTooSkewed", "SignatureDoesNotMatch"]
              , pn = ["BandwidthLimitExceeded", "EC2ThrottledException", "LimitExceededException", "PriorRequestNotComplete", "ProvisionedThroughputExceededException", "RequestLimitExceeded", "RequestThrottled", "RequestThrottledException", "SlowDown", "ThrottledException", "Throttling", "ThrottlingException", "TooManyRequestsException", "TransactionInProgressException"]
              , hn = ["AbortError", "TimeoutError", "RequestTimeout", "RequestTimeoutException"]
              , gn = [500, 502, 503, 504]
              , mn = ["ECONNRESET", "EPIPE", "ETIMEDOUT"]
              , yn = e=>429 === e.$metadata?.httpStatusCode || pn.includes(e.name) || 1 == e.$retryable?.throttling;
            class bn {
                constructor(e) {
                    this.currentCapacity = 0,
                    this.enabled = !1,
                    this.lastMaxRate = 0,
                    this.measuredTxRate = 0,
                    this.requestCount = 0,
                    this.lastTimestamp = 0,
                    this.timeWindow = 0,
                    this.beta = e?.beta ?? .7,
                    this.minCapacity = e?.minCapacity ?? 1,
                    this.minFillRate = e?.minFillRate ?? .5,
                    this.scaleConstant = e?.scaleConstant ?? .4,
                    this.smooth = e?.smooth ?? .8;
                    const t = this.getCurrentTimeInSeconds();
                    this.lastThrottleTime = t,
                    this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds()),
                    this.fillRate = this.minFillRate,
                    this.maxCapacity = this.minCapacity
                }
                getCurrentTimeInSeconds() {
                    return Date.now() / 1e3
                }
                async getSendToken() {
                    return this.acquireTokenBucket(1)
                }
                async acquireTokenBucket(e) {
                    if (this.enabled) {
                        if (this.refillTokenBucket(),
                        e > this.currentCapacity) {
                            const t = (e - this.currentCapacity) / this.fillRate * 1e3;
                            await new Promise((e=>setTimeout(e, t)))
                        }
                        this.currentCapacity = this.currentCapacity - e
                    }
                }
                refillTokenBucket() {
                    const e = this.getCurrentTimeInSeconds();
                    if (!this.lastTimestamp)
                        return void (this.lastTimestamp = e);
                    const t = (e - this.lastTimestamp) * this.fillRate;
                    this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + t),
                    this.lastTimestamp = e
                }
                updateClientSendingRate(e) {
                    let t;
                    if (this.updateMeasuredRate(),
                    yn(e)) {
                        const e = this.enabled ? Math.min(this.measuredTxRate, this.fillRate) : this.measuredTxRate;
                        this.lastMaxRate = e,
                        this.calculateTimeWindow(),
                        this.lastThrottleTime = this.getCurrentTimeInSeconds(),
                        t = this.cubicThrottle(e),
                        this.enableTokenBucket()
                    } else
                        this.calculateTimeWindow(),
                        t = this.cubicSuccess(this.getCurrentTimeInSeconds());
                    const n = Math.min(t, 2 * this.measuredTxRate);
                    this.updateTokenBucketRate(n)
                }
                calculateTimeWindow() {
                    this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3))
                }
                cubicThrottle(e) {
                    return this.getPrecise(e * this.beta)
                }
                cubicSuccess(e) {
                    return this.getPrecise(this.scaleConstant * Math.pow(e - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate)
                }
                enableTokenBucket() {
                    this.enabled = !0
                }
                updateTokenBucketRate(e) {
                    this.refillTokenBucket(),
                    this.fillRate = Math.max(e, this.minFillRate),
                    this.maxCapacity = Math.max(e, this.minCapacity),
                    this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity)
                }
                updateMeasuredRate() {
                    const e = this.getCurrentTimeInSeconds()
                      , t = Math.floor(2 * e) / 2;
                    if (this.requestCount++,
                    t > this.lastTxRateBucket) {
                        const e = this.requestCount / (t - this.lastTxRateBucket);
                        this.measuredTxRate = this.getPrecise(e * this.smooth + this.measuredTxRate * (1 - this.smooth)),
                        this.requestCount = 0,
                        this.lastTxRateBucket = t
                    }
                }
                getPrecise(e) {
                    return parseFloat(e.toFixed(8))
                }
            }
            var vn, wn = new Uint8Array(16);
            function Sn() {
                if (!vn && !(vn = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto)))
                    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                return vn(wn)
            }
            const En = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i
              , Pn = function(e) {
                return "string" == typeof e && En.test(e)
            };
            for (var An = [], xn = 0; xn < 256; ++xn)
                An.push((xn + 256).toString(16).substr(1));
            const _n = function(e, t, n) {
                var r = (e = e || {}).random || (e.rng || Sn)();
                if (r[6] = 15 & r[6] | 64,
                r[8] = 63 & r[8] | 128,
                t) {
                    n = n || 0;
                    for (var i = 0; i < 16; ++i)
                        t[n + i] = r[i];
                    return t
                }
                return function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0
                      , n = (An[e[t + 0]] + An[e[t + 1]] + An[e[t + 2]] + An[e[t + 3]] + "-" + An[e[t + 4]] + An[e[t + 5]] + "-" + An[e[t + 6]] + An[e[t + 7]] + "-" + An[e[t + 8]] + An[e[t + 9]] + "-" + An[e[t + 10]] + An[e[t + 11]] + An[e[t + 12]] + An[e[t + 13]] + An[e[t + 14]] + An[e[t + 15]]).toLowerCase();
                    if (!Pn(n))
                        throw TypeError("Stringified UUID is invalid");
                    return n
                }(r)
            }
              , Rn = (e,t)=>Math.floor(Math.min(2e4, Math.random() * 2 ** t * e))
              , Tn = e=>!!e && ((e=>void 0 !== e.$retryable)(e) || (e=>fn.includes(e.name))(e) || yn(e) || (e=>hn.includes(e.name) || mn.includes(e?.code || "") || gn.includes(e.$metadata?.httpStatusCode || 0))(e));
            class On {
                constructor(e, t) {
                    this.maxAttemptsProvider = e,
                    this.mode = ln.STANDARD,
                    this.retryDecider = t?.retryDecider ?? Tn,
                    this.delayDecider = t?.delayDecider ?? Rn,
                    this.retryQuota = t?.retryQuota ?? ((e,t)=>{
                        let n = 500;
                        const r = e=>"TimeoutError" === e.name ? 10 : 5
                          , i = e=>r(e) <= n;
                        return Object.freeze({
                            hasRetryTokens: i,
                            retrieveRetryTokens: e=>{
                                if (!i(e))
                                    throw new Error("No retry token available");
                                const t = r(e);
                                return n -= t,
                                t
                            }
                            ,
                            releaseRetryTokens: e=>{
                                n += e ?? 1,
                                n = Math.min(n, 500)
                            }
                        })
                    }
                    )()
                }
                shouldRetry(e, t, n) {
                    return t < n && this.retryDecider(e) && this.retryQuota.hasRetryTokens(e)
                }
                async getMaxAttempts() {
                    let e;
                    try {
                        e = await this.maxAttemptsProvider()
                    } catch (t) {
                        e = 3
                    }
                    return e
                }
                async retry(e, t, n) {
                    let r, i = 0, o = 0;
                    const s = await this.getMaxAttempts()
                      , {request: a} = t;
                    for (V.isInstance(a) && (a.headers["amz-sdk-invocation-id"] = _n()); ; )
                        try {
                            V.isInstance(a) && (a.headers["amz-sdk-request"] = `attempt=${i + 1}; max=${s}`),
                            n?.beforeRequest && await n.beforeRequest();
                            const {response: u, output: c} = await e(t);
                            return n?.afterRequest && n.afterRequest(u),
                            this.retryQuota.releaseRetryTokens(r),
                            c.$metadata.attempts = i + 1,
                            c.$metadata.totalRetryDelay = o,
                            {
                                response: u,
                                output: c
                            }
                        } catch (e) {
                            const t = In(e);
                            if (i++,
                            this.shouldRetry(t, i, s)) {
                                r = this.retryQuota.retrieveRetryTokens(t);
                                const e = this.delayDecider(yn(t) ? 500 : 100, i)
                                  , n = Mn(t.$response)
                                  , s = Math.max(n || 0, e);
                                o += s,
                                await new Promise((e=>setTimeout(e, s)));
                                continue
                            }
                            throw t.$metadata || (t.$metadata = {}),
                            t.$metadata.attempts = i,
                            t.$metadata.totalRetryDelay = o,
                            t
                        }
                }
            }
            const Mn = e=>{
                if (!K.isInstance(e))
                    return;
                const t = Object.keys(e.headers).find((e=>"retry-after" === e.toLowerCase()));
                if (!t)
                    return;
                const n = e.headers[t]
                  , r = Number(n);
                return Number.isNaN(r) ? new Date(n).getTime() - Date.now() : 1e3 * r
            }
              , In = e=>e instanceof Error ? e : e instanceof Object ? Object.assign(new Error, e) : "string" == typeof e ? new Error(e) : new Error(`AWS SDK error wrapper for ${e}`);
            class kn extends On {
                constructor(e, t) {
                    const {rateLimiter: n, ...r} = t ?? {};
                    super(e, r),
                    this.rateLimiter = n ?? new bn,
                    this.mode = ln.ADAPTIVE
                }
                async retry(e, t) {
                    return super.retry(e, t, {
                        beforeRequest: async()=>this.rateLimiter.getSendToken(),
                        afterRequest: e=>{
                            this.rateLimiter.updateClientSendingRate(e)
                        }
                    })
                }
            }
            const Cn = {
                name: "retryMiddleware",
                tags: ["RETRY"],
                step: "finalizeRequest",
                priority: "high",
                override: !0
            }
              , Nn = (e,{stsClientCtor: t})=>(e=>{
                const t = e.credentials ? "function" == typeof (o = e.credentials) ? b(o, (e=>void 0 !== e.expiration && e.expiration.getTime() - Date.now() < 3e5), (e=>void 0 !== e.expiration)) : g(o) : e.credentialDefaultProvider(e)
                  , {signingEscapePath: n=!0, systemClockOffset: r=e.systemClockOffset || 0, sha256: i} = e;
                var o;
                let s;
                return s = e.signer ? g(e.signer) : e.regionInfoProvider ? ()=>g(e.region)().then((async t=>[await e.regionInfoProvider(t, {
                    useFipsEndpoint: await e.useFipsEndpoint(),
                    useDualstackEndpoint: await e.useDualstackEndpoint()
                }) || {}, t])).then((([r,o])=>{
                    const {signingRegion: s, signingService: a} = r;
                    e.signingRegion = e.signingRegion || s || o,
                    e.signingName = e.signingName || a || e.serviceId;
                    const u = {
                        ...e,
                        credentials: t,
                        region: e.signingRegion,
                        service: e.signingName,
                        sha256: i,
                        uriEscapePath: n
                    };
                    return new (e.signerConstructor || W)(u)
                }
                )) : async r=>{
                    const o = (r = Object.assign({}, {
                        name: "sigv4",
                        signingName: e.signingName || e.defaultSigningName,
                        signingRegion: await g(e.region)(),
                        properties: {}
                    }, r)).signingRegion
                      , s = r.signingName;
                    e.signingRegion = e.signingRegion || o,
                    e.signingName = e.signingName || s || e.serviceId;
                    const a = {
                        ...e,
                        credentials: t,
                        region: e.signingRegion,
                        service: e.signingName,
                        sha256: i,
                        uriEscapePath: n
                    };
                    return new (e.signerConstructor || W)(a)
                }
                ,
                {
                    ...e,
                    systemClockOffset: r,
                    signingEscapePath: n,
                    credentials: t,
                    signer: s
                }
            }
            )({
                ...e,
                stsClientCtor: t
            })
              , Fn = "user-agent"
              , jn = "x-amz-user-agent"
              , Dn = /[^\!\#\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g
              , $n = ([e,t])=>{
                const n = e.indexOf("/")
                  , r = e.substring(0, n);
                let i = e.substring(n + 1);
                return "api" === r && (i = i.toLowerCase()),
                [r, i, t].filter((e=>e && e.length > 0)).map((e=>e?.replace(Dn, "_"))).join("/")
            }
              , Ln = {
                name: "getUserAgentMiddleware",
                step: "build",
                priority: "low",
                tags: ["SET_USER_AGENT", "USER_AGENT"],
                override: !0
            };
            var Bn = n(643);
            function Un(e=0) {
                return new Promise(((t,n)=>{
                    e && setTimeout((()=>{
                        const t = new Error(`Request did not complete within ${e} ms`);
                        t.name = "TimeoutError",
                        n(t)
                    }
                    ), e)
                }
                ))
            }
            class zn {
                constructor(e) {
                    "function" == typeof e ? this.configProvider = e().then((e=>e || {})) : (this.config = e ?? {},
                    this.configProvider = Promise.resolve(this.config))
                }
                destroy() {}
                async handle(e, {abortSignal: t}={}) {
                    this.config || (this.config = await this.configProvider);
                    const n = this.config.requestTimeout;
                    if (t?.aborted) {
                        const e = new Error("Request aborted");
                        return e.name = "AbortError",
                        Promise.reject(e)
                    }
                    let r = e.path;
                    if (e.query) {
                        const t = function(e) {
                            const t = [];
                            for (let n of Object.keys(e).sort()) {
                                const r = e[n];
                                if (n = $(n),
                                Array.isArray(r))
                                    for (let e = 0, i = r.length; e < i; e++)
                                        t.push(`${n}=${$(r[e])}`);
                                else {
                                    let e = n;
                                    (r || "string" == typeof r) && (e += `=${$(r)}`),
                                    t.push(e)
                                }
                            }
                            return t.join("&")
                        }(e.query);
                        t && (r += `?${t}`)
                    }
                    const {port: i, method: o} = e
                      , s = `${e.protocol}//${e.hostname}${i ? `:${i}` : ""}${r}`
                      , a = {
                        body: "GET" === o || "HEAD" === o ? void 0 : e.body,
                        headers: new Headers(e.headers),
                        method: o
                    };
                    "undefined" != typeof AbortController && (a.signal = t);
                    const u = new Request(s,a)
                      , c = [fetch(u).then((e=>{
                        const t = e.headers
                          , n = {};
                        for (const e of t.entries())
                            n[e[0]] = e[1];
                        return void 0 !== e.body ? {
                            response: new K({
                                headers: n,
                                statusCode: e.status,
                                body: e.body
                            })
                        } : e.blob().then((t=>({
                            response: new K({
                                headers: n,
                                statusCode: e.status,
                                body: t
                            })
                        })))
                    }
                    )), Un(n)];
                    return t && c.push(new Promise(((e,n)=>{
                        t.onabort = ()=>{
                            const e = new Error("Request aborted");
                            e.name = "AbortError",
                            n(e)
                        }
                    }
                    ))),
                    Promise.race(c)
                }
            }
            const qn = {}
              , Wn = new Array(64);
            for (let e = 0, t = "A".charCodeAt(0), n = "Z".charCodeAt(0); e + t <= n; e++) {
                const n = String.fromCharCode(e + t);
                qn[n] = e,
                Wn[e] = n
            }
            for (let e = 0, t = "a".charCodeAt(0), n = "z".charCodeAt(0); e + t <= n; e++) {
                const n = String.fromCharCode(e + t)
                  , r = e + 26;
                qn[n] = r,
                Wn[r] = n
            }
            for (let e = 0; e < 10; e++) {
                qn[e.toString(10)] = e + 52;
                const t = e.toString(10)
                  , n = e + 52;
                qn[t] = n,
                Wn[n] = t
            }
            qn["+"] = 62,
            Wn[62] = "+",
            qn["/"] = 63,
            Wn[63] = "/";
            const Gn = e=>{
                let t = e.length / 4 * 3;
                "==" === e.slice(-2) ? t -= 2 : "=" === e.slice(-1) && t--;
                const n = new ArrayBuffer(t)
                  , r = new DataView(n);
                for (let t = 0; t < e.length; t += 4) {
                    let n = 0
                      , i = 0;
                    for (let r = t, o = t + 3; r <= o; r++)
                        if ("=" !== e[r]) {
                            if (!(e[r]in qn))
                                throw new TypeError(`Invalid character ${e[r]} in base64 string.`);
                            n |= qn[e[r]] << 6 * (o - r),
                            i += 6
                        } else
                            n >>= 6;
                    const o = t / 4 * 3;
                    n >>= i % 8;
                    const s = Math.floor(i / 8);
                    for (let e = 0; e < s; e++) {
                        const t = 8 * (s - e - 1);
                        r.setUint8(o + e, (n & 255 << t) >> t)
                    }
                }
                return new Uint8Array(n)
            }
            ;
            function Hn(e) {
                let t = "";
                for (let n = 0; n < e.length; n += 3) {
                    let r = 0
                      , i = 0;
                    for (let t = n, o = Math.min(n + 3, e.length); t < o; t++)
                        r |= e[t] << 8 * (o - t - 1),
                        i += 8;
                    const o = Math.ceil(i / 6);
                    r <<= 6 * o - i;
                    for (let e = 1; e <= o; e++) {
                        const n = 6 * (o - e);
                        t += Wn[(r & 63 << n) >> n]
                    }
                    t += "==".slice(0, 4 - o)
                }
                return t
            }
            const Vn = e=>"function" == typeof Blob && e instanceof Blob ? async function(e) {
                const t = await function(e) {
                    return new Promise(((t,n)=>{
                        const r = new FileReader;
                        r.onloadend = ()=>{
                            if (2 !== r.readyState)
                                return n(new Error("Reader aborted too early"));
                            const e = r.result ?? ""
                              , i = e.indexOf(",")
                              , o = i > -1 ? i + 1 : e.length;
                            t(e.substring(o))
                        }
                        ,
                        r.onabort = ()=>n(new Error("Read aborted")),
                        r.onerror = ()=>n(r.error),
                        r.readAsDataURL(e)
                    }
                    ))
                }(e)
                  , n = Gn(t);
                return new Uint8Array(n)
            }(e) : async function(e) {
                let t = new Uint8Array(0);
                const n = e.getReader();
                let r = !1;
                for (; !r; ) {
                    const {done: e, value: i} = await n.read();
                    if (i) {
                        const e = t;
                        t = new Uint8Array(e.length + i.length),
                        t.set(e),
                        t.set(i, e.length)
                    }
                    r = e
                }
                return t
            }(e)
              , Kn = e=>{
                if ("string" == typeof e) {
                    let t = e.length;
                    for (let n = t - 1; n >= 0; n--) {
                        const r = e.charCodeAt(n);
                        r > 127 && r <= 2047 ? t++ : r > 2047 && r <= 65535 && (t += 2),
                        r >= 56320 && r <= 57343 && n--
                    }
                    return t
                }
                if ("number" == typeof e.byteLength)
                    return e.byteLength;
                if ("number" == typeof e.size)
                    return e.size;
                throw new Error(`Body Length computation failed for ${e}`)
            }
            ;
            var Zn = n(206)
              , Xn = n.n(Zn);
            const Qn = ({serviceId: e, clientVersion: t})=>async()=>{
                const n = "undefined" != typeof window && window?.navigator?.userAgent ? Xn().parse(window.navigator.userAgent) : void 0
                  , r = [["aws-sdk-js", t], [`os/${n?.os?.name || "other"}`, n?.os?.version], ["lang/js"], ["md/browser", `${n?.browser?.name ?? "unknown"}_ ${n?.browser?.version ?? "unknown"}`]];
                return e && r.push([`api/${e}`, t]),
                r
            }
            ;
            var Yn = n(84);
            const Jn = JSON.parse('{"version":"1.1","partitions":[{"id":"aws","regionRegex":"^(us|eu|ap|sa|ca|me|af)-\\\\w+-\\\\d+$","regions":{"af-south-1":{},"ap-east-1":{},"ap-northeast-1":{},"ap-northeast-2":{},"ap-northeast-3":{},"ap-south-1":{},"ap-southeast-1":{},"ap-southeast-2":{},"ap-southeast-3":{},"ca-central-1":{},"eu-central-1":{},"eu-north-1":{},"eu-south-1":{},"eu-west-1":{},"eu-west-2":{},"eu-west-3":{},"me-central-1":{},"me-south-1":{},"sa-east-1":{},"us-east-1":{},"us-east-2":{},"us-west-1":{},"us-west-2":{},"aws-global":{}},"outputs":{"name":"aws","dnsSuffix":"amazonaws.com","dualStackDnsSuffix":"api.aws","supportsFIPS":true,"supportsDualStack":true}},{"id":"aws-us-gov","regionRegex":"^us\\\\-gov\\\\-\\\\w+\\\\-\\\\d+$","regions":{"us-gov-west-1":{},"us-gov-east-1":{},"aws-us-gov-global":{}},"outputs":{"name":"aws-us-gov","dnsSuffix":"amazonaws.com","dualStackDnsSuffix":"api.aws","supportsFIPS":true,"supportsDualStack":true}},{"id":"aws-cn","regionRegex":"^cn\\\\-\\\\w+\\\\-\\\\d+$","regions":{"cn-north-1":{},"cn-northwest-1":{},"aws-cn-global":{}},"outputs":{"name":"aws-cn","dnsSuffix":"amazonaws.com.cn","dualStackDnsSuffix":"api.amazonwebservices.com.cn","supportsFIPS":true,"supportsDualStack":true}},{"id":"aws-iso","regionRegex":"^us\\\\-iso\\\\-\\\\w+\\\\-\\\\d+$","outputs":{"name":"aws-iso","dnsSuffix":"c2s.ic.gov","supportsFIPS":true,"supportsDualStack":false,"dualStackDnsSuffix":"c2s.ic.gov"},"regions":{"us-iso-east-1":{},"us-iso-west-1":{},"aws-iso-global":{}}},{"id":"aws-iso-b","regionRegex":"^us\\\\-isob\\\\-\\\\w+\\\\-\\\\d+$","outputs":{"name":"aws-iso-b","dnsSuffix":"sc2s.sgov.gov","supportsFIPS":true,"supportsDualStack":false,"dualStackDnsSuffix":"sc2s.sgov.gov"},"regions":{"us-isob-east-1":{},"aws-iso-b-global":{}}}]}')
              , {partitions: er} = Jn
              , tr = er.find((e=>"aws" === e.id))
              , nr = e=>{
                for (const t of er) {
                    const {regions: n, outputs: r} = t;
                    for (const [t,i] of Object.entries(n))
                        if (t === e)
                            return {
                                ...r,
                                ...i
                            }
                }
                for (const t of er) {
                    const {regionRegex: n, outputs: r} = t;
                    if (new RegExp(n).test(e))
                        return {
                            ...r
                        }
                }
                if (!tr)
                    throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
                return {
                    ...tr.outputs
                }
            }
              , rr = "endpoints";
            function ir(e) {
                return "object" != typeof e || null == e ? e : "ref"in e ? `$ ${ir(e.ref)}` : "fn"in e ? `${e.fn}(${(e.argv || []).map(ir).join(", ")})` : JSON.stringify(e, null, 2)
            }
            class or extends Error {
                constructor(e) {
                    super(e),
                    this.name = "EndpointError"
                }
            }
            const sr = new RegExp("^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$")
              , ar = e=>sr.test(e) || e.startsWith("[") && e.endsWith("]")
              , ur = new RegExp("^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$")
              , cr = (e,t=!1)=>{
                if (!t)
                    return ur.test(e);
                const n = e.split(".");
                for (const e of n)
                    if (!cr(e))
                        return !1;
                return !0
            }
              , lr = (e,t=!1)=>{
                if (t) {
                    for (const t of e.split("."))
                        if (!lr(t))
                            return !1;
                    return !0
                }
                return !(!cr(e) || e.length < 3 || e.length > 63 || e !== e.toLowerCase() || ar(e))
            }
              , dr = e=>{
                const t = e.split(":");
                if (t.length < 6)
                    return null;
                const [n,r,i,o,s,...a] = t;
                return "arn" !== n || "" === r || "" === i || "" === a[0] ? null : {
                    partition: r,
                    service: i,
                    region: o,
                    accountId: s,
                    resourceId: a[0].includes("/") ? a[0].split("/") : a
                }
            }
              , fr = (e,t)=>e === t
              , pr = (e,t)=>(e=>{
                const t = e.split(".")
                  , n = [];
                for (const r of t) {
                    const t = r.indexOf("[");
                    if (-1 !== t) {
                        if (r.indexOf("]") !== r.length - 1)
                            throw new or(`Path: '${e}' does not end with ']'`);
                        const i = r.slice(t + 1, -1);
                        if (Number.isNaN(parseInt(i)))
                            throw new or(`Invalid array index: '${i}' in path: '${e}'`);
                        0 !== t && n.push(r.slice(0, t)),
                        n.push(i)
                    } else
                        n.push(r)
                }
                return n
            }
            )(t).reduce(((n,r)=>{
                if ("object" != typeof n)
                    throw new or(`Index '${r}' in '${t}' not found in '${JSON.stringify(e)}'`);
                return Array.isArray(n) ? n[parseInt(r)] : n[r]
            }
            ), e)
              , hr = e=>null != e
              , gr = e=>!e;
            var mr;
            !function(e) {
                e.HTTP = "http",
                e.HTTPS = "https"
            }(mr || (mr = {}));
            const yr = {
                [mr.HTTP]: 80,
                [mr.HTTPS]: 443
            }
              , br = e=>{
                const t = (()=>{
                    try {
                        if (e instanceof URL)
                            return e;
                        if ("object" == typeof e && "hostname"in e) {
                            const {hostname: t, port: n, protocol: r="", path: i="", query: o={}} = e
                              , s = new URL(`${r}//${t}${n ? `:${n}` : ""}${i}`);
                            return s.search = Object.entries(o).map((([e,t])=>`${e}=${t}`)).join("&"),
                            s
                        }
                        return new URL(e)
                    } catch (e) {
                        return null
                    }
                }
                )();
                if (!t)
                    return console.error(`Unable to parse ${JSON.stringify(e)} as a whatwg URL.`),
                    null;
                const n = t.href
                  , {host: r, hostname: i, pathname: o, protocol: s, search: a} = t;
                if (a)
                    return null;
                const u = s.slice(0, -1);
                if (!Object.values(mr).includes(u))
                    return null;
                const c = ar(i);
                return {
                    scheme: u,
                    authority: `${r}${n.includes(`${r}:${yr[u]}`) || "string" == typeof e && e.includes(`${r}:${yr[u]}`) ? `:${yr[u]}` : ""}`,
                    path: o,
                    normalizedPath: o.endsWith("/") ? o : `${o}/`,
                    isIp: c
                }
            }
              , vr = (e,t)=>e === t
              , wr = (e,t,n,r)=>t >= n || e.length < n ? null : r ? e.substring(e.length - n, e.length - t) : e.substring(t, n)
              , Sr = e=>encodeURIComponent(e).replace(/[!*'()]/g, (e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`))
              , Er = (e,t)=>{
                const n = []
                  , r = {
                    ...t.endpointParams,
                    ...t.referenceRecord
                };
                let i = 0;
                for (; i < e.length; ) {
                    const t = e.indexOf("{", i);
                    if (-1 === t) {
                        n.push(e.slice(i));
                        break
                    }
                    n.push(e.slice(i, t));
                    const o = e.indexOf("}", t);
                    if (-1 === o) {
                        n.push(e.slice(t));
                        break
                    }
                    "{" === e[t + 1] && "}" === e[o + 1] && (n.push(e.slice(t + 1, o)),
                    i = o + 2);
                    const s = e.substring(t + 1, o);
                    if (s.includes("#")) {
                        const [e,t] = s.split("#");
                        n.push(pr(r[e], t))
                    } else
                        n.push(r[s]);
                    i = o + 1
                }
                return n.join("")
            }
              , Pr = (e,t,n)=>{
                if ("string" == typeof e)
                    return Er(e, n);
                if (e.fn)
                    return Ar(e, n);
                if (e.ref)
                    return (({ref: e},t)=>({
                        ...t.endpointParams,
                        ...t.referenceRecord
                    }[e]))(e, n);
                throw new or(`'${t}': ${String(e)} is not a string, function or reference.`)
            }
              , Ar = ({fn: e, argv: t},n)=>{
                const r = t.map((e=>["boolean", "number"].includes(typeof e) ? e : Pr(e, "arg", n)));
                return e.split(".").reduce(((e,t)=>e[t]), i)(...r)
            }
              , xr = ({assign: e, ...t},n)=>{
                if (e && e in n.referenceRecord)
                    throw new or(`'${e}' is already defined in Reference Record.`);
                const r = Ar(t, n);
                return n.logger?.debug?.(rr, `evaluateCondition: ${ir(t)} = ${ir(r)}`),
                {
                    result: "" === r || !!r,
                    ...null != e && {
                        toAssign: {
                            name: e,
                            value: r
                        }
                    }
                }
            }
              , _r = (e=[],t)=>{
                const n = {};
                for (const r of e) {
                    const {result: e, toAssign: i} = xr(r, {
                        ...t,
                        referenceRecord: {
                            ...t.referenceRecord,
                            ...n
                        }
                    });
                    if (!e)
                        return {
                            result: e
                        };
                    i && (n[i.name] = i.value,
                    t.logger?.debug?.(rr, `assign: ${i.name} := ${ir(i.value)}`))
                }
                return {
                    result: !0,
                    referenceRecord: n
                }
            }
              , Rr = (e,t)=>Object.entries(e).reduce(((e,[n,r])=>({
                ...e,
                [n]: r.map((e=>{
                    const r = Pr(e, "Header value entry", t);
                    if ("string" != typeof r)
                        throw new or(`Header '${n}' value '${r}' is not a string`);
                    return r
                }
                ))
            })), {})
              , Tr = (e,t)=>{
                if (Array.isArray(e))
                    return e.map((e=>Tr(e, t)));
                switch (typeof e) {
                case "string":
                    return Er(e, t);
                case "object":
                    if (null === e)
                        throw new or(`Unexpected endpoint property: ${e}`);
                    return Or(e, t);
                case "boolean":
                    return e;
                default:
                    throw new or("Unexpected endpoint property type: " + typeof e)
                }
            }
              , Or = (e,t)=>Object.entries(e).reduce(((e,[n,r])=>({
                ...e,
                [n]: Tr(r, t)
            })), {})
              , Mr = (e,t)=>{
                const n = Pr(e, "Endpoint URL", t);
                if ("string" == typeof n)
                    try {
                        return new URL(n)
                    } catch (e) {
                        throw console.error(`Failed to construct URL with ${n}`, e),
                        e
                    }
                throw new or("Endpoint URL must be a string, got " + typeof n)
            }
              , Ir = (e,t)=>{
                const {conditions: n, endpoint: r} = e
                  , {result: i, referenceRecord: o} = _r(n, t);
                if (!i)
                    return;
                const s = {
                    ...t,
                    referenceRecord: {
                        ...t.referenceRecord,
                        ...o
                    }
                }
                  , {url: a, properties: u, headers: c} = r;
                return t.logger?.debug?.(rr, `Resolving endpoint from template: ${ir(r)}`),
                {
                    ...null != c && {
                        headers: Rr(c, s)
                    },
                    ...null != u && {
                        properties: Or(u, s)
                    },
                    url: Mr(a, s)
                }
            }
              , kr = (e,t)=>{
                const {conditions: n, error: r} = e
                  , {result: i, referenceRecord: o} = _r(n, t);
                if (i)
                    throw new or(Pr(r, "Error", {
                        ...t,
                        referenceRecord: {
                            ...t.referenceRecord,
                            ...o
                        }
                    }))
            }
              , Cr = (e,t)=>{
                const {conditions: n, rules: r} = e
                  , {result: i, referenceRecord: o} = _r(n, t);
                if (i)
                    return Nr(r, {
                        ...t,
                        referenceRecord: {
                            ...t.referenceRecord,
                            ...o
                        }
                    })
            }
              , Nr = (e,t)=>{
                for (const n of e)
                    if ("endpoint" === n.type) {
                        const e = Ir(n, t);
                        if (e)
                            return e
                    } else if ("error" === n.type)
                        kr(n, t);
                    else {
                        if ("tree" !== n.type)
                            throw new or(`Unknown endpoint rule: ${n}`);
                        {
                            const e = Cr(n, t);
                            if (e)
                                return e
                        }
                    }
                throw new or("Rules evaluation failed")
            }
              , Fr = {
                version: "1.0",
                parameters: {
                    Region: {
                        builtIn: "AWS::Region",
                        required: !1,
                        documentation: "The AWS region used to dispatch the request.",
                        type: "String"
                    },
                    UseDualStack: {
                        builtIn: "AWS::UseDualStack",
                        required: !0,
                        default: !1,
                        documentation: "When true, use the dual-stack endpoint. If the configured endpoint does not support dual-stack, dispatching the request MAY return an error.",
                        type: "Boolean"
                    },
                    UseFIPS: {
                        builtIn: "AWS::UseFIPS",
                        required: !0,
                        default: !1,
                        documentation: "When true, send this request to the FIPS-compliant regional endpoint. If the configured endpoint does not have a FIPS compliant endpoint, dispatching the request will return an error.",
                        type: "Boolean"
                    },
                    Endpoint: {
                        builtIn: "SDK::Endpoint",
                        required: !1,
                        documentation: "Override the endpoint used to send this request",
                        type: "String"
                    },
                    UseGlobalEndpoint: {
                        builtIn: "AWS::STS::UseGlobalEndpoint",
                        required: !0,
                        default: !1,
                        documentation: "Whether the global endpoint should be used, rather then the regional endpoint for us-east-1.",
                        type: "Boolean"
                    }
                },
                rules: [{
                    conditions: [{
                        fn: "aws.partition",
                        argv: [{
                            ref: "Region"
                        }],
                        assign: "PartitionResult"
                    }],
                    type: "tree",
                    rules: [{
                        conditions: [{
                            fn: "booleanEquals",
                            argv: [{
                                ref: "UseGlobalEndpoint"
                            }, !0]
                        }, {
                            fn: "booleanEquals",
                            argv: [{
                                ref: "UseFIPS"
                            }, !1]
                        }, {
                            fn: "booleanEquals",
                            argv: [{
                                ref: "UseDualStack"
                            }, !1]
                        }, {
                            fn: "not",
                            argv: [{
                                fn: "isSet",
                                argv: [{
                                    ref: "Endpoint"
                                }]
                            }]
                        }],
                        type: "tree",
                        rules: [{
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "ap-northeast-1"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "ap-south-1"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "ap-southeast-1"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "ap-southeast-2"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "aws-global"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "ca-central-1"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "eu-central-1"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "eu-north-1"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "eu-west-1"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "eu-west-2"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "eu-west-3"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "sa-east-1"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "us-east-1"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "us-east-2"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "us-west-1"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "us-west-2"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [],
                            endpoint: {
                                url: "https://sts.{Region}.{PartitionResult#dnsSuffix}",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "{Region}"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }]
                    }, {
                        conditions: [{
                            fn: "isSet",
                            argv: [{
                                ref: "Endpoint"
                            }]
                        }, {
                            fn: "parseURL",
                            argv: [{
                                ref: "Endpoint"
                            }],
                            assign: "url"
                        }],
                        type: "tree",
                        rules: [{
                            conditions: [{
                                fn: "booleanEquals",
                                argv: [{
                                    ref: "UseFIPS"
                                }, !0]
                            }],
                            error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                            type: "error"
                        }, {
                            conditions: [],
                            type: "tree",
                            rules: [{
                                conditions: [{
                                    fn: "booleanEquals",
                                    argv: [{
                                        ref: "UseDualStack"
                                    }, !0]
                                }],
                                error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                                type: "error"
                            }, {
                                conditions: [],
                                endpoint: {
                                    url: {
                                        ref: "Endpoint"
                                    },
                                    properties: {},
                                    headers: {}
                                },
                                type: "endpoint"
                            }]
                        }]
                    }, {
                        conditions: [{
                            fn: "booleanEquals",
                            argv: [{
                                ref: "UseFIPS"
                            }, !0]
                        }, {
                            fn: "booleanEquals",
                            argv: [{
                                ref: "UseDualStack"
                            }, !0]
                        }],
                        type: "tree",
                        rules: [{
                            conditions: [{
                                fn: "booleanEquals",
                                argv: [!0, {
                                    fn: "getAttr",
                                    argv: [{
                                        ref: "PartitionResult"
                                    }, "supportsFIPS"]
                                }]
                            }, {
                                fn: "booleanEquals",
                                argv: [!0, {
                                    fn: "getAttr",
                                    argv: [{
                                        ref: "PartitionResult"
                                    }, "supportsDualStack"]
                                }]
                            }],
                            type: "tree",
                            rules: [{
                                conditions: [],
                                endpoint: {
                                    url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: {},
                                    headers: {}
                                },
                                type: "endpoint"
                            }]
                        }, {
                            conditions: [],
                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                            type: "error"
                        }]
                    }, {
                        conditions: [{
                            fn: "booleanEquals",
                            argv: [{
                                ref: "UseFIPS"
                            }, !0]
                        }],
                        type: "tree",
                        rules: [{
                            conditions: [{
                                fn: "booleanEquals",
                                argv: [!0, {
                                    fn: "getAttr",
                                    argv: [{
                                        ref: "PartitionResult"
                                    }, "supportsFIPS"]
                                }]
                            }],
                            type: "tree",
                            rules: [{
                                conditions: [],
                                type: "tree",
                                rules: [{
                                    conditions: [{
                                        fn: "stringEquals",
                                        argv: ["aws-us-gov", {
                                            fn: "getAttr",
                                            argv: [{
                                                ref: "PartitionResult"
                                            }, "name"]
                                        }]
                                    }],
                                    endpoint: {
                                        url: "https://sts.{Region}.{PartitionResult#dnsSuffix}",
                                        properties: {},
                                        headers: {}
                                    },
                                    type: "endpoint"
                                }, {
                                    conditions: [],
                                    endpoint: {
                                        url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                                        properties: {},
                                        headers: {}
                                    },
                                    type: "endpoint"
                                }]
                            }]
                        }, {
                            conditions: [],
                            error: "FIPS is enabled but this partition does not support FIPS",
                            type: "error"
                        }]
                    }, {
                        conditions: [{
                            fn: "booleanEquals",
                            argv: [{
                                ref: "UseDualStack"
                            }, !0]
                        }],
                        type: "tree",
                        rules: [{
                            conditions: [{
                                fn: "booleanEquals",
                                argv: [!0, {
                                    fn: "getAttr",
                                    argv: [{
                                        ref: "PartitionResult"
                                    }, "supportsDualStack"]
                                }]
                            }],
                            type: "tree",
                            rules: [{
                                conditions: [],
                                endpoint: {
                                    url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                    properties: {},
                                    headers: {}
                                },
                                type: "endpoint"
                            }]
                        }, {
                            conditions: [],
                            error: "DualStack is enabled but this partition does not support DualStack",
                            type: "error"
                        }]
                    }, {
                        conditions: [],
                        type: "tree",
                        rules: [{
                            conditions: [{
                                fn: "stringEquals",
                                argv: [{
                                    ref: "Region"
                                }, "aws-global"]
                            }],
                            endpoint: {
                                url: "https://sts.amazonaws.com",
                                properties: {
                                    authSchemes: [{
                                        name: "sigv4",
                                        signingName: "sts",
                                        signingRegion: "us-east-1"
                                    }]
                                },
                                headers: {}
                            },
                            type: "endpoint"
                        }, {
                            conditions: [],
                            endpoint: {
                                url: "https://sts.{Region}.{PartitionResult#dnsSuffix}",
                                properties: {},
                                headers: {}
                            },
                            type: "endpoint"
                        }]
                    }]
                }]
            }
              , jr = (e,t={})=>((e,t)=>{
                const {endpointParams: n, logger: r} = t
                  , {parameters: i, rules: o} = e;
                t.logger?.debug?.(rr, `Initial EndpointParams: ${ir(n)}`);
                const s = Object.entries(i).filter((([,e])=>null != e.default)).map((([e,t])=>[e, t.default]));
                if (s.length > 0)
                    for (const [e,t] of s)
                        n[e] = n[e] ?? t;
                const a = Object.entries(i).filter((([,e])=>e.required)).map((([e])=>e));
                for (const e of a)
                    if (null == n[e])
                        throw new or(`Missing required parameter: '${e}'`);
                const u = Nr(o, {
                    endpointParams: n,
                    logger: r,
                    referenceRecord: {}
                });
                if (t.endpointParams?.Endpoint)
                    try {
                        const e = new URL(t.endpointParams.Endpoint)
                          , {protocol: n, port: r} = e;
                        u.url.protocol = n,
                        u.url.port = r
                    } catch (e) {}
                return t.logger?.debug?.(rr, `Resolved endpoint: ${ir(u)}`),
                u
            }
            )(Fr, {
                endpointParams: e,
                logger: t.logger
            })
              , Dr = ["in-region", "cross-region", "mobile", "standard", "legacy"]
              , $r = e=>{
                const t = (({defaultsMode: e}={})=>b((async()=>{
                    const t = "function" == typeof e ? await e() : e;
                    switch (t?.toLowerCase()) {
                    case "auto":
                        return Promise.resolve((()=>{
                            const e = ("undefined" != typeof window && window?.navigator?.userAgent ? Xn().parse(window.navigator.userAgent) : void 0)?.platform?.type;
                            return "tablet" === e || "mobile" === e
                        }
                        )() ? "mobile" : "standard");
                    case "mobile":
                    case "in-region":
                    case "cross-region":
                    case "standard":
                    case "legacy":
                        return Promise.resolve(t?.toLocaleLowerCase());
                    case void 0:
                        return Promise.resolve("legacy");
                    default:
                        throw new Error(`Invalid parameter for "defaultsMode", expect ${Dr.join(", ")}, got ${t}`)
                    }
                }
                )))(e)
                  , n = ()=>t().then(Me)
                  , r = (e=>({
                    apiVersion: "2011-06-15",
                    base64Decoder: e?.base64Decoder ?? Gn,
                    base64Encoder: e?.base64Encoder ?? Hn,
                    disableHostPrefix: e?.disableHostPrefix ?? !1,
                    endpointProvider: e?.endpointProvider ?? jr,
                    logger: e?.logger ?? new ee,
                    serviceId: e?.serviceId ?? "STS",
                    urlParser: e?.urlParser ?? m
                }))(e);
                return {
                    ...r,
                    ...e,
                    runtime: "browser",
                    defaultsMode: t,
                    bodyLengthChecker: e?.bodyLengthChecker ?? Kn,
                    credentialDefaultProvider: e?.credentialDefaultProvider ?? (e=>()=>Promise.reject(new Error("Credential is missing"))),
                    defaultUserAgentProvider: e?.defaultUserAgentProvider ?? Qn({
                        serviceId: r.serviceId,
                        clientVersion: "3.209.0"
                    }),
                    maxAttempts: e?.maxAttempts ?? 3,
                    region: e?.region ?? ("Region is missing",
                    ()=>Promise.reject("Region is missing")),
                    requestHandler: e?.requestHandler ?? new zn(n),
                    retryMode: e?.retryMode ?? (async()=>(await n()).retryMode || dn),
                    sha256: e?.sha256 ?? Bn.Sha256,
                    streamCollector: e?.streamCollector ?? Vn,
                    useDualstackEndpoint: e?.useDualstackEndpoint ?? (()=>Promise.resolve(!1)),
                    useFipsEndpoint: e?.useFipsEndpoint ?? (()=>Promise.resolve(!1)),
                    utf8Decoder: e?.utf8Decoder ?? Yn.fromUtf8,
                    utf8Encoder: e?.utf8Encoder ?? Yn.toUtf8
                }
            }
            ;
            class Lr extends ie {
                constructor(e) {
                    var t;
                    const n = (e=>{
                        const {region: t, useFipsEndpoint: n} = e;
                        if (!t)
                            throw new Error("Region is missing");
                        return {
                            ...e,
                            region: async()=>{
                                if ("string" == typeof t)
                                    return rn(t);
                                const e = await t();
                                return rn(e)
                            }
                            ,
                            useFipsEndpoint: async()=>{
                                const e = "string" == typeof t ? t : await t();
                                return !!nn(e) || ("boolean" == typeof n ? Promise.resolve(n) : n())
                            }
                        }
                    }
                    )((t = $r(e),
                    {
                        ...t,
                        useDualstackEndpoint: t.useDualstackEndpoint ?? !1,
                        useFipsEndpoint: t.useFipsEndpoint ?? !1,
                        useGlobalEndpoint: t.useGlobalEndpoint ?? !1,
                        defaultSigningName: "sts"
                    }))
                      , r = (e=>{
                        const t = g(e.maxAttempts ?? 3);
                        return {
                            ...e,
                            maxAttempts: t,
                            retryStrategy: async()=>e.retryStrategy ? e.retryStrategy : await g(e.retryMode)() === ln.ADAPTIVE ? new kn(t) : new On(t)
                        }
                    }
                    )((e=>{
                        const t = e.tls ?? !0
                          , {endpoint: n} = e
                          , r = null != n ? async()=>(e=>"object" == typeof e ? "url"in e ? m(e.url) : e : m(e))(await g(n)()) : void 0
                          , i = !!n;
                        return {
                            ...e,
                            endpoint: r,
                            tls: t,
                            isCustomEndpoint: i,
                            useDualstackEndpoint: g(e.useDualstackEndpoint ?? !1),
                            useFipsEndpoint: g(e.useFipsEndpoint ?? !1)
                        }
                    }
                    )(n))
                      , i = (o = Nn(r, {
                        stsClientCtor: Lr
                    }),
                    {
                        ...o,
                        customUserAgent: "string" == typeof o.customUserAgent ? [[o.customUserAgent]] : o.customUserAgent
                    });
                    var o, s;
                    super(i),
                    this.config = i,
                    this.middlewareStack.use((e=>({
                        applyToStack: t=>{
                            t.add((e=>(t,n)=>async r=>{
                                const i = await e.retryStrategy();
                                return i?.mode && (n.userAgent = [...n.userAgent || [], ["cfg/retry-mode", i.mode]]),
                                i.retry(t, r)
                            }
                            )(e), Cn)
                        }
                    }))(this.config)),
                    this.middlewareStack.use((e=>({
                        applyToStack: t=>{
                            var n;
                            t.add((n = e.bodyLengthChecker,
                            e=>async t=>{
                                const r = t.request;
                                if (V.isInstance(r)) {
                                    const {body: e, headers: t} = r;
                                    if (e && -1 === Object.keys(t).map((e=>e.toLowerCase())).indexOf(on))
                                        try {
                                            const t = n(e);
                                            r.headers = {
                                                ...r.headers,
                                                [on]: String(t)
                                            }
                                        } catch (e) {}
                                }
                                return e({
                                    ...t,
                                    request: r
                                })
                            }
                            ), sn)
                        }
                    }))(this.config)),
                    this.middlewareStack.use((e=>({
                        applyToStack: t=>{
                            t.add((e=>t=>async n=>{
                                if (!V.isInstance(n.request))
                                    return t(n);
                                const {request: r} = n
                                  , {handlerProtocol: i=""} = e.requestHandler.metadata || {};
                                return i.indexOf("h2") >= 0 && !r.headers[":authority"] ? (delete r.headers.host,
                                r.headers[":authority"] = "") : r.headers.host || (r.headers.host = r.hostname),
                                t(n)
                            }
                            )(e), an)
                        }
                    }))(this.config)),
                    this.middlewareStack.use((this.config,
                    {
                        applyToStack: e=>{
                            e.add(((e,t)=>async n=>{
                                const {clientName: r, commandName: i, inputFilterSensitiveLog: o, logger: s, outputFilterSensitiveLog: a} = t
                                  , u = await e(n);
                                if (!s)
                                    return u;
                                if ("function" == typeof s.info) {
                                    const {$metadata: e, ...t} = u.output;
                                    s.info({
                                        clientName: r,
                                        commandName: i,
                                        input: o(n.input),
                                        output: a(t),
                                        metadata: e
                                    })
                                }
                                return u
                            }
                            ), un)
                        }
                    })),
                    this.middlewareStack.use((e=>({
                        applyToStack: t=>{
                            t.add((e=>t=>async n=>{
                                const {request: r} = n;
                                if (!V.isInstance(r) || "node" !== e.runtime || r.headers.hasOwnProperty("X-Amzn-Trace-Id"))
                                    return t(n);
                                const i = process.env.AWS_LAMBDA_FUNCTION_NAME
                                  , o = process.env._X_AMZN_TRACE_ID
                                  , s = e=>"string" == typeof e && e.length > 0;
                                return s(i) && s(o) && (r.headers["X-Amzn-Trace-Id"] = o),
                                t({
                                    ...n,
                                    request: r
                                })
                            }
                            )(e), cn)
                        }
                    }))(this.config)),
                    this.middlewareStack.use((s = this.config,
                    {
                        applyToStack: e=>{
                            var t;
                            e.add((t = s,
                            (e,n)=>async r=>{
                                const {request: i} = r;
                                if (!V.isInstance(i))
                                    return e(r);
                                const {headers: o} = i
                                  , s = n?.userAgent?.map($n) || []
                                  , a = (await t.defaultUserAgentProvider()).map($n)
                                  , u = t?.customUserAgent?.map($n) || []
                                  , c = [...a, ...s, ...u].join(" ")
                                  , l = [...a.filter((e=>e.startsWith("aws-sdk-"))), ...u].join(" ");
                                return "browser" !== t.runtime ? (l && (o[jn] = o[jn] ? `${o[Fn]} ${l}` : l),
                                o[Fn] = c) : o[jn] = c,
                                e({
                                    ...r,
                                    request: i
                                })
                            }
                            ), Ln)
                        }
                    }))
                }
                destroy() {
                    super.destroy()
                }
            }
            class Br extends Lr {
                assumeRole(e, t, n) {
                    const r = new Vt(e);
                    if ("function" == typeof t)
                        this.send(r, t);
                    else {
                        if ("function" != typeof n)
                            return this.send(r, t);
                        if ("object" != typeof t)
                            throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }
                assumeRoleWithSAML(e, t, n) {
                    const r = new Kt(e);
                    if ("function" == typeof t)
                        this.send(r, t);
                    else {
                        if ("function" != typeof n)
                            return this.send(r, t);
                        if ("object" != typeof t)
                            throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }
                assumeRoleWithWebIdentity(e, t, n) {
                    const r = new Zt(e);
                    if ("function" == typeof t)
                        this.send(r, t);
                    else {
                        if ("function" != typeof n)
                            return this.send(r, t);
                        if ("object" != typeof t)
                            throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }
                decodeAuthorizationMessage(e, t, n) {
                    const r = new Xt(e);
                    if ("function" == typeof t)
                        this.send(r, t);
                    else {
                        if ("function" != typeof n)
                            return this.send(r, t);
                        if ("object" != typeof t)
                            throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }
                getAccessKeyInfo(e, t, n) {
                    const r = new Qt(e);
                    if ("function" == typeof t)
                        this.send(r, t);
                    else {
                        if ("function" != typeof n)
                            return this.send(r, t);
                        if ("object" != typeof t)
                            throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }
                getCallerIdentity(e, t, n) {
                    const r = new Yt(e);
                    if ("function" == typeof t)
                        this.send(r, t);
                    else {
                        if ("function" != typeof n)
                            return this.send(r, t);
                        if ("object" != typeof t)
                            throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }
                getFederationToken(e, t, n) {
                    const r = new Jt(e);
                    if ("function" == typeof t)
                        this.send(r, t);
                    else {
                        if ("function" != typeof n)
                            return this.send(r, t);
                        if ("object" != typeof t)
                            throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }
                getSessionToken(e, t, n) {
                    const r = new en(e);
                    if ("function" == typeof t)
                        this.send(r, t);
                    else {
                        if ("function" != typeof n)
                            return this.send(r, t);
                        if ("object" != typeof t)
                            throw new Error("Expect http options but get " + typeof t);
                        this.send(r, t || {}, n)
                    }
                }
            }
            const Ur = "us-east-1"
              , zr = e=>"function" != typeof e ? void 0 === e ? Ur : e : async()=>{
                try {
                    return await e()
                } catch (e) {
                    return Ur
                }
            }
              , qr = (e,t)=>t ? class extends e {
                constructor(e) {
                    super(e);
                    for (const e of t)
                        this.middlewareStack.use(e)
                }
            }
            : e
              , Wr = (e={},t)=>((e,t)=>{
                let n, r;
                return async(i,o)=>{
                    if (r = i,
                    !n) {
                        const {logger: i, region: o, requestHandler: s} = e;
                        n = new t({
                            logger: i,
                            credentialDefaultProvider: ()=>async()=>r,
                            region: zr(o || e.region),
                            ...s ? {
                                requestHandler: s
                            } : {}
                        })
                    }
                    const {Credentials: s} = await n.send(new Vt(o));
                    if (!s || !s.AccessKeyId || !s.SecretAccessKey)
                        throw new Error(`Invalid response from STS.assumeRole call with role ${o.RoleArn}`);
                    return {
                        accessKeyId: s.AccessKeyId,
                        secretAccessKey: s.SecretAccessKey,
                        sessionToken: s.SessionToken,
                        expiration: s.Expiration
                    }
                }
            }
            )(e, qr(Lr, t))
              , Gr = (e={},t)=>((e,t)=>{
                let n;
                return async r=>{
                    if (!n) {
                        const {logger: r, region: i, requestHandler: o} = e;
                        n = new t({
                            logger: r,
                            region: zr(i || e.region),
                            ...o ? {
                                requestHandler: o
                            } : {}
                        })
                    }
                    const {Credentials: i} = await n.send(new Zt(r));
                    if (!i || !i.AccessKeyId || !i.SecretAccessKey)
                        throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${r.RoleArn}`);
                    return {
                        accessKeyId: i.AccessKeyId,
                        secretAccessKey: i.SecretAccessKey,
                        sessionToken: i.SessionToken,
                        expiration: i.Expiration
                    }
                }
            }
            )(e, qr(Lr, t))
              , Hr = e=>t=>e({
                roleAssumer: Wr(t),
                roleAssumerWithWebIdentity: Gr(t),
                ...t
            })
        }
        ,
        495: (e,t,n)=>{
            "use strict";
            n.r(t),
            n.d(t, {
                locateWindow: ()=>i
            });
            const r = {};
            function i() {
                return "undefined" != typeof window ? window : "undefined" != typeof self ? self : r
            }
        }
        ,
        84: (e,t,n)=>{
            "use strict";
            n.r(t),
            n.d(t, {
                fromUtf8: ()=>r,
                toUtf8: ()=>i
            });
            const r = e=>"function" == typeof TextEncoder ? function(e) {
                return (new TextEncoder).encode(e)
            }(e) : (e=>{
                const t = [];
                for (let n = 0, r = e.length; n < r; n++) {
                    const r = e.charCodeAt(n);
                    if (r < 128)
                        t.push(r);
                    else if (r < 2048)
                        t.push(r >> 6 | 192, 63 & r | 128);
                    else if (n + 1 < e.length && 55296 == (64512 & r) && 56320 == (64512 & e.charCodeAt(n + 1))) {
                        const i = 65536 + ((1023 & r) << 10) + (1023 & e.charCodeAt(++n));
                        t.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                    } else
                        t.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                }
                return Uint8Array.from(t)
            }
            )(e)
              , i = e=>"function" == typeof TextDecoder ? function(e) {
                return new TextDecoder("utf-8").decode(e)
            }(e) : (e=>{
                let t = "";
                for (let n = 0, r = e.length; n < r; n++) {
                    const r = e[n];
                    if (r < 128)
                        t += String.fromCharCode(r);
                    else if (192 <= r && r < 224) {
                        const i = e[++n];
                        t += String.fromCharCode((31 & r) << 6 | 63 & i)
                    } else if (240 <= r && r < 365) {
                        const i = "%" + [r, e[++n], e[++n], e[++n]].map((e=>e.toString(16))).join("%");
                        t += decodeURIComponent(i)
                    } else
                        t += String.fromCharCode((15 & r) << 12 | (63 & e[++n]) << 6 | 63 & e[++n])
                }
                return t
            }
            )(e)
        }
        ,
        206: function(e) {
            e.exports = function(e) {
                var t = {};
                function n(r) {
                    if (t[r])
                        return t[r].exports;
                    var i = t[r] = {
                        i: r,
                        l: !1,
                        exports: {}
                    };
                    return e[r].call(i.exports, i, i.exports, n),
                    i.l = !0,
                    i.exports
                }
                return n.m = e,
                n.c = t,
                n.d = function(e, t, r) {
                    n.o(e, t) || Object.defineProperty(e, t, {
                        enumerable: !0,
                        get: r
                    })
                }
                ,
                n.r = function(e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }),
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    })
                }
                ,
                n.t = function(e, t) {
                    if (1 & t && (e = n(e)),
                    8 & t)
                        return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule)
                        return e;
                    var r = Object.create(null);
                    if (n.r(r),
                    Object.defineProperty(r, "default", {
                        enumerable: !0,
                        value: e
                    }),
                    2 & t && "string" != typeof e)
                        for (var i in e)
                            n.d(r, i, function(t) {
                                return e[t]
                            }
                            .bind(null, i));
                    return r
                }
                ,
                n.n = function(e) {
                    var t = e && e.__esModule ? function() {
                        return e.default
                    }
                    : function() {
                        return e
                    }
                    ;
                    return n.d(t, "a", t),
                    t
                }
                ,
                n.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                ,
                n.p = "",
                n(n.s = 90)
            }({
                17: function(e, t, n) {
                    "use strict";
                    t.__esModule = !0,
                    t.default = void 0;
                    var r = n(18)
                      , i = function() {
                        function e() {}
                        return e.getFirstMatch = function(e, t) {
                            var n = t.match(e);
                            return n && n.length > 0 && n[1] || ""
                        }
                        ,
                        e.getSecondMatch = function(e, t) {
                            var n = t.match(e);
                            return n && n.length > 1 && n[2] || ""
                        }
                        ,
                        e.matchAndReturnConst = function(e, t, n) {
                            if (e.test(t))
                                return n
                        }
                        ,
                        e.getWindowsVersionName = function(e) {
                            switch (e) {
                            case "NT":
                                return "NT";
                            case "XP":
                            case "NT 5.1":
                                return "XP";
                            case "NT 5.0":
                                return "2000";
                            case "NT 5.2":
                                return "2003";
                            case "NT 6.0":
                                return "Vista";
                            case "NT 6.1":
                                return "7";
                            case "NT 6.2":
                                return "8";
                            case "NT 6.3":
                                return "8.1";
                            case "NT 10.0":
                                return "10";
                            default:
                                return
                            }
                        }
                        ,
                        e.getMacOSVersionName = function(e) {
                            var t = e.split(".").splice(0, 2).map((function(e) {
                                return parseInt(e, 10) || 0
                            }
                            ));
                            if (t.push(0),
                            10 === t[0])
                                switch (t[1]) {
                                case 5:
                                    return "Leopard";
                                case 6:
                                    return "Snow Leopard";
                                case 7:
                                    return "Lion";
                                case 8:
                                    return "Mountain Lion";
                                case 9:
                                    return "Mavericks";
                                case 10:
                                    return "Yosemite";
                                case 11:
                                    return "El Capitan";
                                case 12:
                                    return "Sierra";
                                case 13:
                                    return "High Sierra";
                                case 14:
                                    return "Mojave";
                                case 15:
                                    return "Catalina";
                                default:
                                    return
                                }
                        }
                        ,
                        e.getAndroidVersionName = function(e) {
                            var t = e.split(".").splice(0, 2).map((function(e) {
                                return parseInt(e, 10) || 0
                            }
                            ));
                            if (t.push(0),
                            !(1 === t[0] && t[1] < 5))
                                return 1 === t[0] && t[1] < 6 ? "Cupcake" : 1 === t[0] && t[1] >= 6 ? "Donut" : 2 === t[0] && t[1] < 2 ? "Eclair" : 2 === t[0] && 2 === t[1] ? "Froyo" : 2 === t[0] && t[1] > 2 ? "Gingerbread" : 3 === t[0] ? "Honeycomb" : 4 === t[0] && t[1] < 1 ? "Ice Cream Sandwich" : 4 === t[0] && t[1] < 4 ? "Jelly Bean" : 4 === t[0] && t[1] >= 4 ? "KitKat" : 5 === t[0] ? "Lollipop" : 6 === t[0] ? "Marshmallow" : 7 === t[0] ? "Nougat" : 8 === t[0] ? "Oreo" : 9 === t[0] ? "Pie" : void 0
                        }
                        ,
                        e.getVersionPrecision = function(e) {
                            return e.split(".").length
                        }
                        ,
                        e.compareVersions = function(t, n, r) {
                            void 0 === r && (r = !1);
                            var i = e.getVersionPrecision(t)
                              , o = e.getVersionPrecision(n)
                              , s = Math.max(i, o)
                              , a = 0
                              , u = e.map([t, n], (function(t) {
                                var n = s - e.getVersionPrecision(t)
                                  , r = t + new Array(n + 1).join(".0");
                                return e.map(r.split("."), (function(e) {
                                    return new Array(20 - e.length).join("0") + e
                                }
                                )).reverse()
                            }
                            ));
                            for (r && (a = s - Math.min(i, o)),
                            s -= 1; s >= a; ) {
                                if (u[0][s] > u[1][s])
                                    return 1;
                                if (u[0][s] === u[1][s]) {
                                    if (s === a)
                                        return 0;
                                    s -= 1
                                } else if (u[0][s] < u[1][s])
                                    return -1
                            }
                        }
                        ,
                        e.map = function(e, t) {
                            var n, r = [];
                            if (Array.prototype.map)
                                return Array.prototype.map.call(e, t);
                            for (n = 0; n < e.length; n += 1)
                                r.push(t(e[n]));
                            return r
                        }
                        ,
                        e.find = function(e, t) {
                            var n, r;
                            if (Array.prototype.find)
                                return Array.prototype.find.call(e, t);
                            for (n = 0,
                            r = e.length; n < r; n += 1) {
                                var i = e[n];
                                if (t(i, n))
                                    return i
                            }
                        }
                        ,
                        e.assign = function(e) {
                            for (var t, n, r = e, i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++)
                                o[s - 1] = arguments[s];
                            if (Object.assign)
                                return Object.assign.apply(Object, [e].concat(o));
                            var a = function() {
                                var e = o[t];
                                "object" == typeof e && null !== e && Object.keys(e).forEach((function(t) {
                                    r[t] = e[t]
                                }
                                ))
                            };
                            for (t = 0,
                            n = o.length; t < n; t += 1)
                                a();
                            return e
                        }
                        ,
                        e.getBrowserAlias = function(e) {
                            return r.BROWSER_ALIASES_MAP[e]
                        }
                        ,
                        e.getBrowserTypeByAlias = function(e) {
                            return r.BROWSER_MAP[e] || ""
                        }
                        ,
                        e
                    }();
                    t.default = i,
                    e.exports = t.default
                },
                18: function(e, t, n) {
                    "use strict";
                    t.__esModule = !0,
                    t.ENGINE_MAP = t.OS_MAP = t.PLATFORMS_MAP = t.BROWSER_MAP = t.BROWSER_ALIASES_MAP = void 0,
                    t.BROWSER_ALIASES_MAP = {
                        "Amazon Silk": "amazon_silk",
                        "Android Browser": "android",
                        Bada: "bada",
                        BlackBerry: "blackberry",
                        Chrome: "chrome",
                        Chromium: "chromium",
                        Electron: "electron",
                        Epiphany: "epiphany",
                        Firefox: "firefox",
                        Focus: "focus",
                        Generic: "generic",
                        "Google Search": "google_search",
                        Googlebot: "googlebot",
                        "Internet Explorer": "ie",
                        "K-Meleon": "k_meleon",
                        Maxthon: "maxthon",
                        "Microsoft Edge": "edge",
                        "MZ Browser": "mz",
                        "NAVER Whale Browser": "naver",
                        Opera: "opera",
                        "Opera Coast": "opera_coast",
                        PhantomJS: "phantomjs",
                        Puffin: "puffin",
                        QupZilla: "qupzilla",
                        QQ: "qq",
                        QQLite: "qqlite",
                        Safari: "safari",
                        Sailfish: "sailfish",
                        "Samsung Internet for Android": "samsung_internet",
                        SeaMonkey: "seamonkey",
                        Sleipnir: "sleipnir",
                        Swing: "swing",
                        Tizen: "tizen",
                        "UC Browser": "uc",
                        Vivaldi: "vivaldi",
                        "WebOS Browser": "webos",
                        WeChat: "wechat",
                        "Yandex Browser": "yandex",
                        Roku: "roku"
                    },
                    t.BROWSER_MAP = {
                        amazon_silk: "Amazon Silk",
                        android: "Android Browser",
                        bada: "Bada",
                        blackberry: "BlackBerry",
                        chrome: "Chrome",
                        chromium: "Chromium",
                        electron: "Electron",
                        epiphany: "Epiphany",
                        firefox: "Firefox",
                        focus: "Focus",
                        generic: "Generic",
                        googlebot: "Googlebot",
                        google_search: "Google Search",
                        ie: "Internet Explorer",
                        k_meleon: "K-Meleon",
                        maxthon: "Maxthon",
                        edge: "Microsoft Edge",
                        mz: "MZ Browser",
                        naver: "NAVER Whale Browser",
                        opera: "Opera",
                        opera_coast: "Opera Coast",
                        phantomjs: "PhantomJS",
                        puffin: "Puffin",
                        qupzilla: "QupZilla",
                        qq: "QQ Browser",
                        qqlite: "QQ Browser Lite",
                        safari: "Safari",
                        sailfish: "Sailfish",
                        samsung_internet: "Samsung Internet for Android",
                        seamonkey: "SeaMonkey",
                        sleipnir: "Sleipnir",
                        swing: "Swing",
                        tizen: "Tizen",
                        uc: "UC Browser",
                        vivaldi: "Vivaldi",
                        webos: "WebOS Browser",
                        wechat: "WeChat",
                        yandex: "Yandex Browser"
                    },
                    t.PLATFORMS_MAP = {
                        tablet: "tablet",
                        mobile: "mobile",
                        desktop: "desktop",
                        tv: "tv"
                    },
                    t.OS_MAP = {
                        WindowsPhone: "Windows Phone",
                        Windows: "Windows",
                        MacOS: "macOS",
                        iOS: "iOS",
                        Android: "Android",
                        WebOS: "WebOS",
                        BlackBerry: "BlackBerry",
                        Bada: "Bada",
                        Tizen: "Tizen",
                        Linux: "Linux",
                        ChromeOS: "Chrome OS",
                        PlayStation4: "PlayStation 4",
                        Roku: "Roku"
                    },
                    t.ENGINE_MAP = {
                        EdgeHTML: "EdgeHTML",
                        Blink: "Blink",
                        Trident: "Trident",
                        Presto: "Presto",
                        Gecko: "Gecko",
                        WebKit: "WebKit"
                    }
                },
                90: function(e, t, n) {
                    "use strict";
                    t.__esModule = !0,
                    t.default = void 0;
                    var r, i = (r = n(91)) && r.__esModule ? r : {
                        default: r
                    }, o = n(18);
                    function s(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1,
                            r.configurable = !0,
                            "value"in r && (r.writable = !0),
                            Object.defineProperty(e, r.key, r)
                        }
                    }
                    var a = function() {
                        function e() {}
                        var t, n;
                        return e.getParser = function(e, t) {
                            if (void 0 === t && (t = !1),
                            "string" != typeof e)
                                throw new Error("UserAgent should be a string");
                            return new i.default(e,t)
                        }
                        ,
                        e.parse = function(e) {
                            return new i.default(e).getResult()
                        }
                        ,
                        t = e,
                        n = [{
                            key: "BROWSER_MAP",
                            get: function() {
                                return o.BROWSER_MAP
                            }
                        }, {
                            key: "ENGINE_MAP",
                            get: function() {
                                return o.ENGINE_MAP
                            }
                        }, {
                            key: "OS_MAP",
                            get: function() {
                                return o.OS_MAP
                            }
                        }, {
                            key: "PLATFORMS_MAP",
                            get: function() {
                                return o.PLATFORMS_MAP
                            }
                        }],
                        null && s(t.prototype, null),
                        n && s(t, n),
                        e
                    }();
                    t.default = a,
                    e.exports = t.default
                },
                91: function(e, t, n) {
                    "use strict";
                    t.__esModule = !0,
                    t.default = void 0;
                    var r = u(n(92))
                      , i = u(n(93))
                      , o = u(n(94))
                      , s = u(n(95))
                      , a = u(n(17));
                    function u(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }
                    var c = function() {
                        function e(e, t) {
                            if (void 0 === t && (t = !1),
                            null == e || "" === e)
                                throw new Error("UserAgent parameter can't be empty");
                            this._ua = e,
                            this.parsedResult = {},
                            !0 !== t && this.parse()
                        }
                        var t = e.prototype;
                        return t.getUA = function() {
                            return this._ua
                        }
                        ,
                        t.test = function(e) {
                            return e.test(this._ua)
                        }
                        ,
                        t.parseBrowser = function() {
                            var e = this;
                            this.parsedResult.browser = {};
                            var t = a.default.find(r.default, (function(t) {
                                if ("function" == typeof t.test)
                                    return t.test(e);
                                if (t.test instanceof Array)
                                    return t.test.some((function(t) {
                                        return e.test(t)
                                    }
                                    ));
                                throw new Error("Browser's test function is not valid")
                            }
                            ));
                            return t && (this.parsedResult.browser = t.describe(this.getUA())),
                            this.parsedResult.browser
                        }
                        ,
                        t.getBrowser = function() {
                            return this.parsedResult.browser ? this.parsedResult.browser : this.parseBrowser()
                        }
                        ,
                        t.getBrowserName = function(e) {
                            return e ? String(this.getBrowser().name).toLowerCase() || "" : this.getBrowser().name || ""
                        }
                        ,
                        t.getBrowserVersion = function() {
                            return this.getBrowser().version
                        }
                        ,
                        t.getOS = function() {
                            return this.parsedResult.os ? this.parsedResult.os : this.parseOS()
                        }
                        ,
                        t.parseOS = function() {
                            var e = this;
                            this.parsedResult.os = {};
                            var t = a.default.find(i.default, (function(t) {
                                if ("function" == typeof t.test)
                                    return t.test(e);
                                if (t.test instanceof Array)
                                    return t.test.some((function(t) {
                                        return e.test(t)
                                    }
                                    ));
                                throw new Error("Browser's test function is not valid")
                            }
                            ));
                            return t && (this.parsedResult.os = t.describe(this.getUA())),
                            this.parsedResult.os
                        }
                        ,
                        t.getOSName = function(e) {
                            var t = this.getOS().name;
                            return e ? String(t).toLowerCase() || "" : t || ""
                        }
                        ,
                        t.getOSVersion = function() {
                            return this.getOS().version
                        }
                        ,
                        t.getPlatform = function() {
                            return this.parsedResult.platform ? this.parsedResult.platform : this.parsePlatform()
                        }
                        ,
                        t.getPlatformType = function(e) {
                            void 0 === e && (e = !1);
                            var t = this.getPlatform().type;
                            return e ? String(t).toLowerCase() || "" : t || ""
                        }
                        ,
                        t.parsePlatform = function() {
                            var e = this;
                            this.parsedResult.platform = {};
                            var t = a.default.find(o.default, (function(t) {
                                if ("function" == typeof t.test)
                                    return t.test(e);
                                if (t.test instanceof Array)
                                    return t.test.some((function(t) {
                                        return e.test(t)
                                    }
                                    ));
                                throw new Error("Browser's test function is not valid")
                            }
                            ));
                            return t && (this.parsedResult.platform = t.describe(this.getUA())),
                            this.parsedResult.platform
                        }
                        ,
                        t.getEngine = function() {
                            return this.parsedResult.engine ? this.parsedResult.engine : this.parseEngine()
                        }
                        ,
                        t.getEngineName = function(e) {
                            return e ? String(this.getEngine().name).toLowerCase() || "" : this.getEngine().name || ""
                        }
                        ,
                        t.parseEngine = function() {
                            var e = this;
                            this.parsedResult.engine = {};
                            var t = a.default.find(s.default, (function(t) {
                                if ("function" == typeof t.test)
                                    return t.test(e);
                                if (t.test instanceof Array)
                                    return t.test.some((function(t) {
                                        return e.test(t)
                                    }
                                    ));
                                throw new Error("Browser's test function is not valid")
                            }
                            ));
                            return t && (this.parsedResult.engine = t.describe(this.getUA())),
                            this.parsedResult.engine
                        }
                        ,
                        t.parse = function() {
                            return this.parseBrowser(),
                            this.parseOS(),
                            this.parsePlatform(),
                            this.parseEngine(),
                            this
                        }
                        ,
                        t.getResult = function() {
                            return a.default.assign({}, this.parsedResult)
                        }
                        ,
                        t.satisfies = function(e) {
                            var t = this
                              , n = {}
                              , r = 0
                              , i = {}
                              , o = 0;
                            if (Object.keys(e).forEach((function(t) {
                                var s = e[t];
                                "string" == typeof s ? (i[t] = s,
                                o += 1) : "object" == typeof s && (n[t] = s,
                                r += 1)
                            }
                            )),
                            r > 0) {
                                var s = Object.keys(n)
                                  , u = a.default.find(s, (function(e) {
                                    return t.isOS(e)
                                }
                                ));
                                if (u) {
                                    var c = this.satisfies(n[u]);
                                    if (void 0 !== c)
                                        return c
                                }
                                var l = a.default.find(s, (function(e) {
                                    return t.isPlatform(e)
                                }
                                ));
                                if (l) {
                                    var d = this.satisfies(n[l]);
                                    if (void 0 !== d)
                                        return d
                                }
                            }
                            if (o > 0) {
                                var f = Object.keys(i)
                                  , p = a.default.find(f, (function(e) {
                                    return t.isBrowser(e, !0)
                                }
                                ));
                                if (void 0 !== p)
                                    return this.compareVersion(i[p])
                            }
                        }
                        ,
                        t.isBrowser = function(e, t) {
                            void 0 === t && (t = !1);
                            var n = this.getBrowserName().toLowerCase()
                              , r = e.toLowerCase()
                              , i = a.default.getBrowserTypeByAlias(r);
                            return t && i && (r = i.toLowerCase()),
                            r === n
                        }
                        ,
                        t.compareVersion = function(e) {
                            var t = [0]
                              , n = e
                              , r = !1
                              , i = this.getBrowserVersion();
                            if ("string" == typeof i)
                                return ">" === e[0] || "<" === e[0] ? (n = e.substr(1),
                                "=" === e[1] ? (r = !0,
                                n = e.substr(2)) : t = [],
                                ">" === e[0] ? t.push(1) : t.push(-1)) : "=" === e[0] ? n = e.substr(1) : "~" === e[0] && (r = !0,
                                n = e.substr(1)),
                                t.indexOf(a.default.compareVersions(i, n, r)) > -1
                        }
                        ,
                        t.isOS = function(e) {
                            return this.getOSName(!0) === String(e).toLowerCase()
                        }
                        ,
                        t.isPlatform = function(e) {
                            return this.getPlatformType(!0) === String(e).toLowerCase()
                        }
                        ,
                        t.isEngine = function(e) {
                            return this.getEngineName(!0) === String(e).toLowerCase()
                        }
                        ,
                        t.is = function(e, t) {
                            return void 0 === t && (t = !1),
                            this.isBrowser(e, t) || this.isOS(e) || this.isPlatform(e)
                        }
                        ,
                        t.some = function(e) {
                            var t = this;
                            return void 0 === e && (e = []),
                            e.some((function(e) {
                                return t.is(e)
                            }
                            ))
                        }
                        ,
                        e
                    }();
                    t.default = c,
                    e.exports = t.default
                },
                92: function(e, t, n) {
                    "use strict";
                    t.__esModule = !0,
                    t.default = void 0;
                    var r, i = (r = n(17)) && r.__esModule ? r : {
                        default: r
                    }, o = /version\/(\d+(\.?_?\d+)+)/i, s = [{
                        test: [/googlebot/i],
                        describe: function(e) {
                            var t = {
                                name: "Googlebot"
                            }
                              , n = i.default.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/opera/i],
                        describe: function(e) {
                            var t = {
                                name: "Opera"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/opr\/|opios/i],
                        describe: function(e) {
                            var t = {
                                name: "Opera"
                            }
                              , n = i.default.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/SamsungBrowser/i],
                        describe: function(e) {
                            var t = {
                                name: "Samsung Internet for Android"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/Whale/i],
                        describe: function(e) {
                            var t = {
                                name: "NAVER Whale Browser"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/MZBrowser/i],
                        describe: function(e) {
                            var t = {
                                name: "MZ Browser"
                            }
                              , n = i.default.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/focus/i],
                        describe: function(e) {
                            var t = {
                                name: "Focus"
                            }
                              , n = i.default.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/swing/i],
                        describe: function(e) {
                            var t = {
                                name: "Swing"
                            }
                              , n = i.default.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/coast/i],
                        describe: function(e) {
                            var t = {
                                name: "Opera Coast"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/opt\/\d+(?:.?_?\d+)+/i],
                        describe: function(e) {
                            var t = {
                                name: "Opera Touch"
                            }
                              , n = i.default.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/yabrowser/i],
                        describe: function(e) {
                            var t = {
                                name: "Yandex Browser"
                            }
                              , n = i.default.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/ucbrowser/i],
                        describe: function(e) {
                            var t = {
                                name: "UC Browser"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/Maxthon|mxios/i],
                        describe: function(e) {
                            var t = {
                                name: "Maxthon"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/epiphany/i],
                        describe: function(e) {
                            var t = {
                                name: "Epiphany"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/puffin/i],
                        describe: function(e) {
                            var t = {
                                name: "Puffin"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/sleipnir/i],
                        describe: function(e) {
                            var t = {
                                name: "Sleipnir"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/k-meleon/i],
                        describe: function(e) {
                            var t = {
                                name: "K-Meleon"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/micromessenger/i],
                        describe: function(e) {
                            var t = {
                                name: "WeChat"
                            }
                              , n = i.default.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/qqbrowser/i],
                        describe: function(e) {
                            var t = {
                                name: /qqbrowserlite/i.test(e) ? "QQ Browser Lite" : "QQ Browser"
                            }
                              , n = i.default.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/msie|trident/i],
                        describe: function(e) {
                            var t = {
                                name: "Internet Explorer"
                            }
                              , n = i.default.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/\sedg\//i],
                        describe: function(e) {
                            var t = {
                                name: "Microsoft Edge"
                            }
                              , n = i.default.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/edg([ea]|ios)/i],
                        describe: function(e) {
                            var t = {
                                name: "Microsoft Edge"
                            }
                              , n = i.default.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/vivaldi/i],
                        describe: function(e) {
                            var t = {
                                name: "Vivaldi"
                            }
                              , n = i.default.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/seamonkey/i],
                        describe: function(e) {
                            var t = {
                                name: "SeaMonkey"
                            }
                              , n = i.default.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/sailfish/i],
                        describe: function(e) {
                            var t = {
                                name: "Sailfish"
                            }
                              , n = i.default.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/silk/i],
                        describe: function(e) {
                            var t = {
                                name: "Amazon Silk"
                            }
                              , n = i.default.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/phantom/i],
                        describe: function(e) {
                            var t = {
                                name: "PhantomJS"
                            }
                              , n = i.default.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/slimerjs/i],
                        describe: function(e) {
                            var t = {
                                name: "SlimerJS"
                            }
                              , n = i.default.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                        describe: function(e) {
                            var t = {
                                name: "BlackBerry"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/(web|hpw)[o0]s/i],
                        describe: function(e) {
                            var t = {
                                name: "WebOS Browser"
                            }
                              , n = i.default.getFirstMatch(o, e) || i.default.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/bada/i],
                        describe: function(e) {
                            var t = {
                                name: "Bada"
                            }
                              , n = i.default.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/tizen/i],
                        describe: function(e) {
                            var t = {
                                name: "Tizen"
                            }
                              , n = i.default.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/qupzilla/i],
                        describe: function(e) {
                            var t = {
                                name: "QupZilla"
                            }
                              , n = i.default.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/firefox|iceweasel|fxios/i],
                        describe: function(e) {
                            var t = {
                                name: "Firefox"
                            }
                              , n = i.default.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/electron/i],
                        describe: function(e) {
                            var t = {
                                name: "Electron"
                            }
                              , n = i.default.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/MiuiBrowser/i],
                        describe: function(e) {
                            var t = {
                                name: "Miui"
                            }
                              , n = i.default.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/chromium/i],
                        describe: function(e) {
                            var t = {
                                name: "Chromium"
                            }
                              , n = i.default.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, e) || i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/chrome|crios|crmo/i],
                        describe: function(e) {
                            var t = {
                                name: "Chrome"
                            }
                              , n = i.default.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/GSA/i],
                        describe: function(e) {
                            var t = {
                                name: "Google Search"
                            }
                              , n = i.default.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: function(e) {
                            var t = !e.test(/like android/i)
                              , n = e.test(/android/i);
                            return t && n
                        },
                        describe: function(e) {
                            var t = {
                                name: "Android Browser"
                            }
                              , n = i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/playstation 4/i],
                        describe: function(e) {
                            var t = {
                                name: "PlayStation 4"
                            }
                              , n = i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/safari|applewebkit/i],
                        describe: function(e) {
                            var t = {
                                name: "Safari"
                            }
                              , n = i.default.getFirstMatch(o, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/.*/i],
                        describe: function(e) {
                            var t = -1 !== e.search("\\(") ? /^(.*)\/(.*)[ \t]\((.*)/ : /^(.*)\/(.*) /;
                            return {
                                name: i.default.getFirstMatch(t, e),
                                version: i.default.getSecondMatch(t, e)
                            }
                        }
                    }];
                    t.default = s,
                    e.exports = t.default
                },
                93: function(e, t, n) {
                    "use strict";
                    t.__esModule = !0,
                    t.default = void 0;
                    var r, i = (r = n(17)) && r.__esModule ? r : {
                        default: r
                    }, o = n(18), s = [{
                        test: [/Roku\/DVP/],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, e);
                            return {
                                name: o.OS_MAP.Roku,
                                version: t
                            }
                        }
                    }, {
                        test: [/windows phone/i],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, e);
                            return {
                                name: o.OS_MAP.WindowsPhone,
                                version: t
                            }
                        }
                    }, {
                        test: [/windows /i],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, e)
                              , n = i.default.getWindowsVersionName(t);
                            return {
                                name: o.OS_MAP.Windows,
                                version: t,
                                versionName: n
                            }
                        }
                    }, {
                        test: [/Macintosh(.*?) FxiOS(.*?)\//],
                        describe: function(e) {
                            var t = {
                                name: o.OS_MAP.iOS
                            }
                              , n = i.default.getSecondMatch(/(Version\/)(\d[\d.]+)/, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/macintosh/i],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, e).replace(/[_\s]/g, ".")
                              , n = i.default.getMacOSVersionName(t)
                              , r = {
                                name: o.OS_MAP.MacOS,
                                version: t
                            };
                            return n && (r.versionName = n),
                            r
                        }
                    }, {
                        test: [/(ipod|iphone|ipad)/i],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, e).replace(/[_\s]/g, ".");
                            return {
                                name: o.OS_MAP.iOS,
                                version: t
                            }
                        }
                    }, {
                        test: function(e) {
                            var t = !e.test(/like android/i)
                              , n = e.test(/android/i);
                            return t && n
                        },
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, e)
                              , n = i.default.getAndroidVersionName(t)
                              , r = {
                                name: o.OS_MAP.Android,
                                version: t
                            };
                            return n && (r.versionName = n),
                            r
                        }
                    }, {
                        test: [/(web|hpw)[o0]s/i],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, e)
                              , n = {
                                name: o.OS_MAP.WebOS
                            };
                            return t && t.length && (n.version = t),
                            n
                        }
                    }, {
                        test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, e) || i.default.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, e) || i.default.getFirstMatch(/\bbb(\d+)/i, e);
                            return {
                                name: o.OS_MAP.BlackBerry,
                                version: t
                            }
                        }
                    }, {
                        test: [/bada/i],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, e);
                            return {
                                name: o.OS_MAP.Bada,
                                version: t
                            }
                        }
                    }, {
                        test: [/tizen/i],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, e);
                            return {
                                name: o.OS_MAP.Tizen,
                                version: t
                            }
                        }
                    }, {
                        test: [/linux/i],
                        describe: function() {
                            return {
                                name: o.OS_MAP.Linux
                            }
                        }
                    }, {
                        test: [/CrOS/],
                        describe: function() {
                            return {
                                name: o.OS_MAP.ChromeOS
                            }
                        }
                    }, {
                        test: [/PlayStation 4/],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, e);
                            return {
                                name: o.OS_MAP.PlayStation4,
                                version: t
                            }
                        }
                    }];
                    t.default = s,
                    e.exports = t.default
                },
                94: function(e, t, n) {
                    "use strict";
                    t.__esModule = !0,
                    t.default = void 0;
                    var r, i = (r = n(17)) && r.__esModule ? r : {
                        default: r
                    }, o = n(18), s = [{
                        test: [/googlebot/i],
                        describe: function() {
                            return {
                                type: "bot",
                                vendor: "Google"
                            }
                        }
                    }, {
                        test: [/huawei/i],
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/(can-l01)/i, e) && "Nova"
                              , n = {
                                type: o.PLATFORMS_MAP.mobile,
                                vendor: "Huawei"
                            };
                            return t && (n.model = t),
                            n
                        }
                    }, {
                        test: [/nexus\s*(?:7|8|9|10).*/i],
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.tablet,
                                vendor: "Nexus"
                            }
                        }
                    }, {
                        test: [/ipad/i],
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.tablet,
                                vendor: "Apple",
                                model: "iPad"
                            }
                        }
                    }, {
                        test: [/Macintosh(.*?) FxiOS(.*?)\//],
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.tablet,
                                vendor: "Apple",
                                model: "iPad"
                            }
                        }
                    }, {
                        test: [/kftt build/i],
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.tablet,
                                vendor: "Amazon",
                                model: "Kindle Fire HD 7"
                            }
                        }
                    }, {
                        test: [/silk/i],
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.tablet,
                                vendor: "Amazon"
                            }
                        }
                    }, {
                        test: [/tablet(?! pc)/i],
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.tablet
                            }
                        }
                    }, {
                        test: function(e) {
                            var t = e.test(/ipod|iphone/i)
                              , n = e.test(/like (ipod|iphone)/i);
                            return t && !n
                        },
                        describe: function(e) {
                            var t = i.default.getFirstMatch(/(ipod|iphone)/i, e);
                            return {
                                type: o.PLATFORMS_MAP.mobile,
                                vendor: "Apple",
                                model: t
                            }
                        }
                    }, {
                        test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.mobile,
                                vendor: "Nexus"
                            }
                        }
                    }, {
                        test: [/[^-]mobi/i],
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.mobile
                            }
                        }
                    }, {
                        test: function(e) {
                            return "blackberry" === e.getBrowserName(!0)
                        },
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.mobile,
                                vendor: "BlackBerry"
                            }
                        }
                    }, {
                        test: function(e) {
                            return "bada" === e.getBrowserName(!0)
                        },
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.mobile
                            }
                        }
                    }, {
                        test: function(e) {
                            return "windows phone" === e.getBrowserName()
                        },
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.mobile,
                                vendor: "Microsoft"
                            }
                        }
                    }, {
                        test: function(e) {
                            var t = Number(String(e.getOSVersion()).split(".")[0]);
                            return "android" === e.getOSName(!0) && t >= 3
                        },
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.tablet
                            }
                        }
                    }, {
                        test: function(e) {
                            return "android" === e.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.mobile
                            }
                        }
                    }, {
                        test: function(e) {
                            return "macos" === e.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.desktop,
                                vendor: "Apple"
                            }
                        }
                    }, {
                        test: function(e) {
                            return "windows" === e.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.desktop
                            }
                        }
                    }, {
                        test: function(e) {
                            return "linux" === e.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.desktop
                            }
                        }
                    }, {
                        test: function(e) {
                            return "playstation 4" === e.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.tv
                            }
                        }
                    }, {
                        test: function(e) {
                            return "roku" === e.getOSName(!0)
                        },
                        describe: function() {
                            return {
                                type: o.PLATFORMS_MAP.tv
                            }
                        }
                    }];
                    t.default = s,
                    e.exports = t.default
                },
                95: function(e, t, n) {
                    "use strict";
                    t.__esModule = !0,
                    t.default = void 0;
                    var r, i = (r = n(17)) && r.__esModule ? r : {
                        default: r
                    }, o = n(18), s = [{
                        test: function(e) {
                            return "microsoft edge" === e.getBrowserName(!0)
                        },
                        describe: function(e) {
                            if (/\sedg\//i.test(e))
                                return {
                                    name: o.ENGINE_MAP.Blink
                                };
                            var t = i.default.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, e);
                            return {
                                name: o.ENGINE_MAP.EdgeHTML,
                                version: t
                            }
                        }
                    }, {
                        test: [/trident/i],
                        describe: function(e) {
                            var t = {
                                name: o.ENGINE_MAP.Trident
                            }
                              , n = i.default.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: function(e) {
                            return e.test(/presto/i)
                        },
                        describe: function(e) {
                            var t = {
                                name: o.ENGINE_MAP.Presto
                            }
                              , n = i.default.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: function(e) {
                            var t = e.test(/gecko/i)
                              , n = e.test(/like gecko/i);
                            return t && !n
                        },
                        describe: function(e) {
                            var t = {
                                name: o.ENGINE_MAP.Gecko
                            }
                              , n = i.default.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }, {
                        test: [/(apple)?webkit\/537\.36/i],
                        describe: function() {
                            return {
                                name: o.ENGINE_MAP.Blink
                            }
                        }
                    }, {
                        test: [/(apple)?webkit/i],
                        describe: function(e) {
                            var t = {
                                name: o.ENGINE_MAP.WebKit
                            }
                              , n = i.default.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, e);
                            return n && (t.version = n),
                            t
                        }
                    }];
                    t.default = s,
                    e.exports = t.default
                }
            })
        },
        932: (e,t,n)=>{
            "use strict";
            const r = n(501)
              , i = n(844)
              , o = n(192);
            e.exports = {
                XMLParser: i,
                XMLValidator: r,
                XMLBuilder: o
            }
        }
        ,
        849: (e,t)=>{
            "use strict";
            const n = "[:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*"
              , r = new RegExp("^" + n + "$");
            t.isExist = function(e) {
                return void 0 !== e
            }
            ,
            t.isEmptyObject = function(e) {
                return 0 === Object.keys(e).length
            }
            ,
            t.merge = function(e, t, n) {
                if (t) {
                    const r = Object.keys(t)
                      , i = r.length;
                    for (let o = 0; o < i; o++)
                        e[r[o]] = "strict" === n ? [t[r[o]]] : t[r[o]]
                }
            }
            ,
            t.getValue = function(e) {
                return t.isExist(e) ? e : ""
            }
            ,
            t.isName = function(e) {
                return !(null == r.exec(e))
            }
            ,
            t.getAllMatches = function(e, t) {
                const n = [];
                let r = t.exec(e);
                for (; r; ) {
                    const i = [];
                    i.startIndex = t.lastIndex - r[0].length;
                    const o = r.length;
                    for (let e = 0; e < o; e++)
                        i.push(r[e]);
                    n.push(i),
                    r = t.exec(e)
                }
                return n
            }
            ,
            t.nameRegexp = n
        }
        ,
        501: (e,t,n)=>{
            "use strict";
            const r = n(849)
              , i = {
                allowBooleanAttributes: !1,
                unpairedTags: []
            };
            function o(e) {
                return " " === e || "\t" === e || "\n" === e || "\r" === e
            }
            function s(e, t) {
                const n = t;
                for (; t < e.length; t++)
                    if ("?" != e[t] && " " != e[t])
                        ;
                    else {
                        const r = e.substr(n, t - n);
                        if (t > 5 && "xml" === r)
                            return f("InvalidXml", "XML declaration allowed only at the start of the document.", h(e, t));
                        if ("?" == e[t] && ">" == e[t + 1]) {
                            t++;
                            break
                        }
                    }
                return t
            }
            function a(e, t) {
                if (e.length > t + 5 && "-" === e[t + 1] && "-" === e[t + 2]) {
                    for (t += 3; t < e.length; t++)
                        if ("-" === e[t] && "-" === e[t + 1] && ">" === e[t + 2]) {
                            t += 2;
                            break
                        }
                } else if (e.length > t + 8 && "D" === e[t + 1] && "O" === e[t + 2] && "C" === e[t + 3] && "T" === e[t + 4] && "Y" === e[t + 5] && "P" === e[t + 6] && "E" === e[t + 7]) {
                    let n = 1;
                    for (t += 8; t < e.length; t++)
                        if ("<" === e[t])
                            n++;
                        else if (">" === e[t] && (n--,
                        0 === n))
                            break
                } else if (e.length > t + 9 && "[" === e[t + 1] && "C" === e[t + 2] && "D" === e[t + 3] && "A" === e[t + 4] && "T" === e[t + 5] && "A" === e[t + 6] && "[" === e[t + 7])
                    for (t += 8; t < e.length; t++)
                        if ("]" === e[t] && "]" === e[t + 1] && ">" === e[t + 2]) {
                            t += 2;
                            break
                        }
                return t
            }
            function u(e, t) {
                let n = ""
                  , r = ""
                  , i = !1;
                for (; t < e.length; t++) {
                    if ('"' === e[t] || "'" === e[t])
                        "" === r ? r = e[t] : r !== e[t] || (r = "");
                    else if (">" === e[t] && "" === r) {
                        i = !0;
                        break
                    }
                    n += e[t]
                }
                return "" === r && {
                    value: n,
                    index: t,
                    tagClosed: i
                }
            }
            t.validate = function(e, t) {
                t = Object.assign({}, i, t);
                const n = [];
                let c = !1
                  , p = !1;
                "\ufeff" === e[0] && (e = e.substr(1));
                for (let i = 0; i < e.length; i++)
                    if ("<" === e[i] && "?" === e[i + 1]) {
                        if (i += 2,
                        i = s(e, i),
                        i.err)
                            return i
                    } else {
                        if ("<" !== e[i]) {
                            if (o(e[i]))
                                continue;
                            return f("InvalidChar", "char '" + e[i] + "' is not expected.", h(e, i))
                        }
                        {
                            let m = i;
                            if (i++,
                            "!" === e[i]) {
                                i = a(e, i);
                                continue
                            }
                            {
                                let y = !1;
                                "/" === e[i] && (y = !0,
                                i++);
                                let b = "";
                                for (; i < e.length && ">" !== e[i] && " " !== e[i] && "\t" !== e[i] && "\n" !== e[i] && "\r" !== e[i]; i++)
                                    b += e[i];
                                if (b = b.trim(),
                                "/" === b[b.length - 1] && (b = b.substring(0, b.length - 1),
                                i--),
                                g = b,
                                !r.isName(g)) {
                                    let t;
                                    return t = 0 === b.trim().length ? "Invalid space after '<'." : "Tag '" + b + "' is an invalid name.",
                                    f("InvalidTag", t, h(e, i))
                                }
                                const v = u(e, i);
                                if (!1 === v)
                                    return f("InvalidAttr", "Attributes for '" + b + "' have open quote.", h(e, i));
                                let w = v.value;
                                if (i = v.index,
                                "/" === w[w.length - 1]) {
                                    const n = i - w.length;
                                    w = w.substring(0, w.length - 1);
                                    const r = l(w, t);
                                    if (!0 !== r)
                                        return f(r.err.code, r.err.msg, h(e, n + r.err.line));
                                    c = !0
                                } else if (y) {
                                    if (!v.tagClosed)
                                        return f("InvalidTag", "Closing tag '" + b + "' doesn't have proper closing.", h(e, i));
                                    if (w.trim().length > 0)
                                        return f("InvalidTag", "Closing tag '" + b + "' can't have attributes or invalid starting.", h(e, m));
                                    {
                                        const t = n.pop();
                                        if (b !== t.tagName) {
                                            let n = h(e, t.tagStartPos);
                                            return f("InvalidTag", "Expected closing tag '" + t.tagName + "' (opened in line " + n.line + ", col " + n.col + ") instead of closing tag '" + b + "'.", h(e, m))
                                        }
                                        0 == n.length && (p = !0)
                                    }
                                } else {
                                    const r = l(w, t);
                                    if (!0 !== r)
                                        return f(r.err.code, r.err.msg, h(e, i - w.length + r.err.line));
                                    if (!0 === p)
                                        return f("InvalidXml", "Multiple possible root nodes found.", h(e, i));
                                    -1 !== t.unpairedTags.indexOf(b) || n.push({
                                        tagName: b,
                                        tagStartPos: m
                                    }),
                                    c = !0
                                }
                                for (i++; i < e.length; i++)
                                    if ("<" === e[i]) {
                                        if ("!" === e[i + 1]) {
                                            i++,
                                            i = a(e, i);
                                            continue
                                        }
                                        if ("?" !== e[i + 1])
                                            break;
                                        if (i = s(e, ++i),
                                        i.err)
                                            return i
                                    } else if ("&" === e[i]) {
                                        const t = d(e, i);
                                        if (-1 == t)
                                            return f("InvalidChar", "char '&' is not expected.", h(e, i));
                                        i = t
                                    } else if (!0 === p && !o(e[i]))
                                        return f("InvalidXml", "Extra text at the end", h(e, i));
                                "<" === e[i] && i--
                            }
                        }
                    }
                var g;
                return c ? 1 == n.length ? f("InvalidTag", "Unclosed tag '" + n[0].tagName + "'.", h(e, n[0].tagStartPos)) : !(n.length > 0) || f("InvalidXml", "Invalid '" + JSON.stringify(n.map((e=>e.tagName)), null, 4).replace(/\r?\n/g, "") + "' found.", {
                    line: 1,
                    col: 1
                }) : f("InvalidXml", "Start tag expected.", 1)
            }
            ;
            const c = new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");
            function l(e, t) {
                const n = r.getAllMatches(e, c)
                  , i = {};
                for (let e = 0; e < n.length; e++) {
                    if (0 === n[e][1].length)
                        return f("InvalidAttr", "Attribute '" + n[e][2] + "' has no space in starting.", g(n[e]));
                    if (void 0 !== n[e][3] && void 0 === n[e][4])
                        return f("InvalidAttr", "Attribute '" + n[e][2] + "' is without value.", g(n[e]));
                    if (void 0 === n[e][3] && !t.allowBooleanAttributes)
                        return f("InvalidAttr", "boolean attribute '" + n[e][2] + "' is not allowed.", g(n[e]));
                    const r = n[e][2];
                    if (!p(r))
                        return f("InvalidAttr", "Attribute '" + r + "' is an invalid name.", g(n[e]));
                    if (i.hasOwnProperty(r))
                        return f("InvalidAttr", "Attribute '" + r + "' is repeated.", g(n[e]));
                    i[r] = 1
                }
                return !0
            }
            function d(e, t) {
                if (";" === e[++t])
                    return -1;
                if ("#" === e[t])
                    return function(e, t) {
                        let n = /\d/;
                        for ("x" === e[t] && (t++,
                        n = /[\da-fA-F]/); t < e.length; t++) {
                            if (";" === e[t])
                                return t;
                            if (!e[t].match(n))
                                break
                        }
                        return -1
                    }(e, ++t);
                let n = 0;
                for (; t < e.length; t++,
                n++)
                    if (!(e[t].match(/\w/) && n < 20)) {
                        if (";" === e[t])
                            break;
                        return -1
                    }
                return t
            }
            function f(e, t, n) {
                return {
                    err: {
                        code: e,
                        msg: t,
                        line: n.line || n,
                        col: n.col
                    }
                }
            }
            function p(e) {
                return r.isName(e)
            }
            function h(e, t) {
                const n = e.substring(0, t).split(/\r?\n/);
                return {
                    line: n.length,
                    col: n[n.length - 1].length + 1
                }
            }
            function g(e) {
                return e.startIndex + e[1].length
            }
        }
        ,
        192: (e,t,n)=>{
            "use strict";
            const r = n(592)
              , i = {
                attributeNamePrefix: "@_",
                attributesGroupName: !1,
                textNodeName: "#text",
                ignoreAttributes: !0,
                cdataPropName: !1,
                format: !1,
                indentBy: "  ",
                suppressEmptyNode: !1,
                suppressUnpairedNode: !0,
                suppressBooleanAttributes: !0,
                tagValueProcessor: function(e, t) {
                    return t
                },
                attributeValueProcessor: function(e, t) {
                    return t
                },
                preserveOrder: !1,
                commentPropName: !1,
                unpairedTags: [],
                entities: [{
                    regex: new RegExp("&","g"),
                    val: "&amp;"
                }, {
                    regex: new RegExp(">","g"),
                    val: "&gt;"
                }, {
                    regex: new RegExp("<","g"),
                    val: "&lt;"
                }, {
                    regex: new RegExp("'","g"),
                    val: "&apos;"
                }, {
                    regex: new RegExp('"',"g"),
                    val: "&quot;"
                }],
                processEntities: !0,
                stopNodes: [],
                transformTagName: !1
            };
            function o(e) {
                this.options = Object.assign({}, i, e),
                this.options.ignoreAttributes || this.options.attributesGroupName ? this.isAttribute = function() {
                    return !1
                }
                : (this.attrPrefixLen = this.options.attributeNamePrefix.length,
                this.isAttribute = h),
                this.processTextOrObjNode = a,
                this.options.format ? (this.indentate = p,
                this.tagEndChar = ">\n",
                this.newLine = "\n") : (this.indentate = function() {
                    return ""
                }
                ,
                this.tagEndChar = ">",
                this.newLine = ""),
                this.options.suppressEmptyNode ? (this.buildTextNode = f,
                this.buildObjNode = c) : (this.buildTextNode = l,
                this.buildObjNode = u),
                this.buildTextValNode = l,
                this.buildObjectNode = u,
                this.replaceEntitiesValue = d,
                this.buildAttrPairStr = s
            }
            function s(e, t) {
                return t = this.options.attributeValueProcessor(e, "" + t),
                t = this.replaceEntitiesValue(t),
                this.options.suppressBooleanAttributes && "true" === t ? " " + e : " " + e + '="' + t + '"'
            }
            function a(e, t, n) {
                const r = this.j2x(e, n + 1);
                return void 0 !== e[this.options.textNodeName] && 1 === Object.keys(e).length ? this.buildTextNode(e[this.options.textNodeName], t, r.attrStr, n) : this.buildObjNode(r.val, t, r.attrStr, n)
            }
            function u(e, t, n, r) {
                let i = "</" + t + this.tagEndChar
                  , o = "";
                return "?" === t[0] && (o = "?",
                i = ""),
                n && -1 === e.indexOf("<") ? this.indentate(r) + "<" + t + n + o + ">" + e + i : !1 !== this.options.commentPropName && t === this.options.commentPropName && 0 === o.length ? this.indentate(r) + `\x3c!--${e}--\x3e` + this.newLine : this.indentate(r) + "<" + t + n + o + this.tagEndChar + e + this.indentate(r) + i
            }
            function c(e, t, n, r) {
                return "" !== e ? this.buildObjectNode(e, t, n, r) : "?" === t[0] ? this.indentate(r) + "<" + t + n + "?" + this.tagEndChar : this.indentate(r) + "<" + t + n + "/" + this.tagEndChar
            }
            function l(e, t, n, r) {
                if (!1 !== this.options.cdataPropName && t === this.options.cdataPropName)
                    return this.indentate(r) + `<![CDATA[${e}]]>` + this.newLine;
                if (!1 !== this.options.commentPropName && t === this.options.commentPropName)
                    return this.indentate(r) + `\x3c!--${e}--\x3e` + this.newLine;
                {
                    let i = this.options.tagValueProcessor(t, e);
                    return i = this.replaceEntitiesValue(i),
                    "" === i && -1 !== this.options.unpairedTags.indexOf(t) ? this.options.suppressUnpairedNode ? this.indentate(r) + "<" + t + this.tagEndChar : this.indentate(r) + "<" + t + "/" + this.tagEndChar : this.indentate(r) + "<" + t + n + ">" + i + "</" + t + this.tagEndChar
                }
            }
            function d(e) {
                if (e && e.length > 0 && this.options.processEntities)
                    for (let t = 0; t < this.options.entities.length; t++) {
                        const n = this.options.entities[t];
                        e = e.replace(n.regex, n.val)
                    }
                return e
            }
            function f(e, t, n, r) {
                return "" === e && -1 !== this.options.unpairedTags.indexOf(t) ? this.options.suppressUnpairedNode ? this.indentate(r) + "<" + t + this.tagEndChar : this.indentate(r) + "<" + t + "/" + this.tagEndChar : "" !== e ? this.buildTextValNode(e, t, n, r) : "?" === t[0] ? this.indentate(r) + "<" + t + n + "?" + this.tagEndChar : this.indentate(r) + "<" + t + n + "/" + this.tagEndChar
            }
            function p(e) {
                return this.options.indentBy.repeat(e)
            }
            function h(e) {
                return !!e.startsWith(this.options.attributeNamePrefix) && e.substr(this.attrPrefixLen)
            }
            o.prototype.build = function(e) {
                return this.options.preserveOrder ? r(e, this.options) : (Array.isArray(e) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (e = {
                    [this.options.arrayNodeName]: e
                }),
                this.j2x(e, 0).val)
            }
            ,
            o.prototype.j2x = function(e, t) {
                let n = ""
                  , r = "";
                for (let i in e)
                    if (void 0 === e[i])
                        ;
                    else if (null === e[i])
                        "?" === i[0] ? r += this.indentate(t) + "<" + i + "?" + this.tagEndChar : r += this.indentate(t) + "<" + i + "/" + this.tagEndChar;
                    else if (e[i]instanceof Date)
                        r += this.buildTextNode(e[i], i, "", t);
                    else if ("object" != typeof e[i]) {
                        const o = this.isAttribute(i);
                        if (o)
                            n += this.buildAttrPairStr(o, "" + e[i]);
                        else if (i === this.options.textNodeName) {
                            let t = this.options.tagValueProcessor(i, "" + e[i]);
                            r += this.replaceEntitiesValue(t)
                        } else
                            r += this.buildTextNode(e[i], i, "", t)
                    } else if (Array.isArray(e[i])) {
                        const n = e[i].length;
                        for (let o = 0; o < n; o++) {
                            const n = e[i][o];
                            void 0 === n || (null === n ? "?" === i[0] ? r += this.indentate(t) + "<" + i + "?" + this.tagEndChar : r += this.indentate(t) + "<" + i + "/" + this.tagEndChar : r += "object" == typeof n ? this.processTextOrObjNode(n, i, t) : this.buildTextNode(n, i, "", t))
                        }
                    } else if (this.options.attributesGroupName && i === this.options.attributesGroupName) {
                        const t = Object.keys(e[i])
                          , r = t.length;
                        for (let o = 0; o < r; o++)
                            n += this.buildAttrPairStr(t[o], "" + e[i][t[o]])
                    } else
                        r += this.processTextOrObjNode(e[i], i, t);
                return {
                    attrStr: n,
                    val: r
                }
            }
            ,
            e.exports = o
        }
        ,
        592: e=>{
            function t(e, s, a, u) {
                let c = ""
                  , l = "";
                s.format && s.indentBy.length > 0 && (l = "\n" + s.indentBy.repeat(u));
                for (let d = 0; d < e.length; d++) {
                    const f = e[d]
                      , p = n(f);
                    let h = "";
                    if (h = 0 === a.length ? p : `${a}.${p}`,
                    p === s.textNodeName) {
                        let e = f[p];
                        i(h, s) || (e = s.tagValueProcessor(p, e),
                        e = o(e, s)),
                        c += l + e;
                        continue
                    }
                    if (p === s.cdataPropName) {
                        c += l + `<![CDATA[${f[p][0][s.textNodeName]}]]>`;
                        continue
                    }
                    if (p === s.commentPropName) {
                        c += l + `\x3c!--${f[p][0][s.textNodeName]}--\x3e`;
                        continue
                    }
                    if ("?" === p[0]) {
                        const e = r(f[":@"], s)
                          , t = "?xml" === p ? "" : l;
                        let n = f[p][0][s.textNodeName];
                        n = 0 !== n.length ? " " + n : "",
                        c += t + `<${p}${n}${e}?>`;
                        continue
                    }
                    let g = l + `<${p}${r(f[":@"], s)}`
                      , m = t(f[p], s, h, u + 1);
                    -1 !== s.unpairedTags.indexOf(p) ? s.suppressUnpairedNode ? c += g + ">" : c += g + "/>" : m && 0 !== m.length || !s.suppressEmptyNode ? c += g + `>${m}${l}</${p}>` : c += g + "/>"
                }
                return c
            }
            function n(e) {
                const t = Object.keys(e);
                for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (":@" !== n)
                        return n
                }
            }
            function r(e, t) {
                let n = "";
                if (e && !t.ignoreAttributes)
                    for (let r in e) {
                        let i = t.attributeValueProcessor(r, e[r]);
                        i = o(i, t),
                        !0 === i && t.suppressBooleanAttributes ? n += ` ${r.substr(t.attributeNamePrefix.length)}` : n += ` ${r.substr(t.attributeNamePrefix.length)}="${i}"`
                    }
                return n
            }
            function i(e, t) {
                let n = (e = e.substr(0, e.length - t.textNodeName.length - 1)).substr(e.lastIndexOf(".") + 1);
                for (let r in t.stopNodes)
                    if (t.stopNodes[r] === e || t.stopNodes[r] === "*." + n)
                        return !0;
                return !1
            }
            function o(e, t) {
                if (e && e.length > 0 && t.processEntities)
                    for (let n = 0; n < t.entities.length; n++) {
                        const r = t.entities[n];
                        e = e.replace(r.regex, r.val)
                    }
                return e
            }
            e.exports = function(e, n) {
                return t(e, n, "", 0)
            }
        }
        ,
        780: e=>{
            const t = RegExp("^\\s([a-zA-z0-0]+)[ \t](['\"])([^&]+)\\2");
            function n(e, n) {
                const r = t.exec(e);
                r && (n[r[1]] = {
                    regx: RegExp(`&${r[1]};`, "g"),
                    val: r[3]
                })
            }
            e.exports = function(e, t) {
                const r = {};
                if ("O" !== e[t + 3] || "C" !== e[t + 4] || "T" !== e[t + 5] || "Y" !== e[t + 6] || "P" !== e[t + 7] || "E" !== e[t + 8])
                    throw new Error("Invalid Tag instead of DOCTYPE");
                {
                    t += 9;
                    let i = 1
                      , o = !1
                      , s = !1
                      , a = !1
                      , u = "";
                    for (; t < e.length; t++)
                        if ("<" === e[t]) {
                            if (o && "!" === e[t + 1] && "E" === e[t + 2] && "N" === e[t + 3] && "T" === e[t + 4] && "I" === e[t + 5] && "T" === e[t + 6] && "Y" === e[t + 7])
                                t += 7,
                                s = !0;
                            else if (o && "!" === e[t + 1] && "E" === e[t + 2] && "L" === e[t + 3] && "E" === e[t + 4] && "M" === e[t + 5] && "E" === e[t + 6] && "N" === e[t + 7] && "T" === e[t + 8])
                                t += 8;
                            else if (o && "!" === e[t + 1] && "A" === e[t + 2] && "T" === e[t + 3] && "T" === e[t + 4] && "L" === e[t + 5] && "I" === e[t + 6] && "S" === e[t + 7] && "T" === e[t + 8])
                                t += 8;
                            else if (o && "!" === e[t + 1] && "N" === e[t + 2] && "O" === e[t + 3] && "T" === e[t + 4] && "A" === e[t + 5] && "T" === e[t + 6] && "I" === e[t + 7] && "O" === e[t + 8] && "N" === e[t + 9])
                                t += 9;
                            else {
                                if ("!" !== e[t + 1] || "-" !== e[t + 2] || "-" !== e[t + 3])
                                    throw new Error("Invalid DOCTYPE");
                                a = !0
                            }
                            i++,
                            u = ""
                        } else if (">" === e[t]) {
                            if (a) {
                                if ("-" !== e[t - 1] || "-" !== e[t - 2])
                                    throw new Error("Invalid XML comment in DOCTYPE");
                                a = !1
                            } else
                                s && (n(u, r),
                                s = !1);
                            if (i--,
                            0 === i)
                                break
                        } else
                            "[" === e[t] ? o = !0 : u += e[t];
                    if (0 !== i)
                        throw new Error("Unclosed DOCTYPE")
                }
                return {
                    entities: r,
                    i: t
                }
            }
        }
        ,
        745: (e,t)=>{
            const n = {
                preserveOrder: !1,
                attributeNamePrefix: "@_",
                attributesGroupName: !1,
                textNodeName: "#text",
                ignoreAttributes: !0,
                removeNSPrefix: !1,
                allowBooleanAttributes: !1,
                parseTagValue: !0,
                parseAttributeValue: !1,
                trimValues: !0,
                cdataPropName: !1,
                numberParseOptions: {
                    hex: !0,
                    leadingZeros: !0
                },
                tagValueProcessor: function(e, t) {
                    return t
                },
                attributeValueProcessor: function(e, t) {
                    return t
                },
                stopNodes: [],
                alwaysCreateTextNode: !1,
                isArray: ()=>!1,
                commentPropName: !1,
                unpairedTags: [],
                processEntities: !0,
                htmlEntities: !1,
                ignoreDeclaration: !1,
                ignorePiTags: !1,
                transformTagName: !1
            };
            t.buildOptions = function(e) {
                return Object.assign({}, n, e)
            }
            ,
            t.defaultOptions = n
        }
        ,
        78: (e,t,n)=>{
            "use strict";
            const r = n(849)
              , i = n(311)
              , o = n(780)
              , s = n(153);
            function a(e) {
                const t = Object.keys(e);
                for (let n = 0; n < t.length; n++) {
                    const r = t[n];
                    this.lastEntities[r] = {
                        regex: new RegExp("&" + r + ";","g"),
                        val: e[r]
                    }
                }
            }
            function u(e, t, n, r, i, o, s) {
                if (void 0 !== e && (this.options.trimValues && !r && (e = e.trim()),
                e.length > 0)) {
                    s || (e = this.replaceEntitiesValue(e));
                    const r = this.options.tagValueProcessor(t, e, n, i, o);
                    return null == r ? e : typeof r != typeof e || r !== e ? r : this.options.trimValues || e.trim() === e ? v(e, this.options.parseTagValue, this.options.numberParseOptions) : e
                }
            }
            function c(e) {
                if (this.options.removeNSPrefix) {
                    const t = e.split(":")
                      , n = "/" === e.charAt(0) ? "/" : "";
                    if ("xmlns" === t[0])
                        return "";
                    2 === t.length && (e = n + t[1])
                }
                return e
            }
            "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, r.nameRegexp);
            const l = new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");
            function d(e, t) {
                if (!this.options.ignoreAttributes && "string" == typeof e) {
                    const n = r.getAllMatches(e, l)
                      , i = n.length
                      , o = {};
                    for (let e = 0; e < i; e++) {
                        const r = this.resolveNameSpace(n[e][1]);
                        let i = n[e][4];
                        const s = this.options.attributeNamePrefix + r;
                        if (r.length)
                            if (void 0 !== i) {
                                this.options.trimValues && (i = i.trim()),
                                i = this.replaceEntitiesValue(i);
                                const e = this.options.attributeValueProcessor(r, i, t);
                                o[s] = null == e ? i : typeof e != typeof i || e !== i ? e : v(i, this.options.parseAttributeValue, this.options.numberParseOptions)
                            } else
                                this.options.allowBooleanAttributes && (o[s] = !0)
                    }
                    if (!Object.keys(o).length)
                        return;
                    if (this.options.attributesGroupName) {
                        const e = {};
                        return e[this.options.attributesGroupName] = o,
                        e
                    }
                    return o
                }
            }
            const f = function(e) {
                e = e.replace(/\r\n?/g, "\n");
                const t = new i("!xml");
                let n = t
                  , r = ""
                  , s = "";
                for (let a = 0; a < e.length; a++)
                    if ("<" === e[a])
                        if ("/" === e[a + 1]) {
                            const t = m(e, ">", a, "Closing Tag is not closed.");
                            let i = e.substring(a + 2, t).trim();
                            if (this.options.removeNSPrefix) {
                                const e = i.indexOf(":");
                                -1 !== e && (i = i.substr(e + 1))
                            }
                            this.options.transformTagName && (i = this.options.transformTagName(i)),
                            n && (r = this.saveTextToParentTag(r, n, s)),
                            s = s.substr(0, s.lastIndexOf(".")),
                            n = this.tagsNodeStack.pop(),
                            r = "",
                            a = t
                        } else if ("?" === e[a + 1]) {
                            let t = y(e, a, !1, "?>");
                            if (!t)
                                throw new Error("Pi Tag is not closed.");
                            if (r = this.saveTextToParentTag(r, n, s),
                            this.options.ignoreDeclaration && "?xml" === t.tagName || this.options.ignorePiTags)
                                ;
                            else {
                                const e = new i(t.tagName);
                                e.add(this.options.textNodeName, ""),
                                t.tagName !== t.tagExp && t.attrExpPresent && (e[":@"] = this.buildAttributesMap(t.tagExp, s)),
                                n.addChild(e)
                            }
                            a = t.closeIndex + 1
                        } else if ("!--" === e.substr(a + 1, 3)) {
                            const t = m(e, "--\x3e", a + 4, "Comment is not closed.");
                            if (this.options.commentPropName) {
                                const i = e.substring(a + 4, t - 2);
                                r = this.saveTextToParentTag(r, n, s),
                                n.add(this.options.commentPropName, [{
                                    [this.options.textNodeName]: i
                                }])
                            }
                            a = t
                        } else if ("!D" === e.substr(a + 1, 2)) {
                            const t = o(e, a);
                            this.docTypeEntities = t.entities,
                            a = t.i
                        } else if ("![" === e.substr(a + 1, 2)) {
                            const t = m(e, "]]>", a, "CDATA is not closed.") - 2
                              , i = e.substring(a + 9, t);
                            if (r = this.saveTextToParentTag(r, n, s),
                            this.options.cdataPropName)
                                n.add(this.options.cdataPropName, [{
                                    [this.options.textNodeName]: i
                                }]);
                            else {
                                let e = this.parseTextData(i, n.tagname, s, !0, !1, !0);
                                null == e && (e = ""),
                                n.add(this.options.textNodeName, e)
                            }
                            a = t + 2
                        } else {
                            let o = y(e, a, this.options.removeNSPrefix)
                              , u = o.tagName
                              , c = o.tagExp
                              , l = o.attrExpPresent
                              , d = o.closeIndex;
                            this.options.transformTagName && (u = this.options.transformTagName(u)),
                            n && r && "!xml" !== n.tagname && (r = this.saveTextToParentTag(r, n, s, !1)),
                            u !== t.tagname && (s += s ? "." + u : u);
                            const f = n;
                            if (f && -1 !== this.options.unpairedTags.indexOf(f.tagname) && (n = this.tagsNodeStack.pop()),
                            this.isItStopNode(this.options.stopNodes, s, u)) {
                                let t = "";
                                if (c.length > 0 && c.lastIndexOf("/") === c.length - 1)
                                    a = o.closeIndex;
                                else if (-1 !== this.options.unpairedTags.indexOf(u))
                                    a = o.closeIndex;
                                else {
                                    const n = this.readStopNodeData(e, u, d + 1);
                                    if (!n)
                                        throw new Error(`Unexpected end of ${u}`);
                                    a = n.i,
                                    t = n.tagContent
                                }
                                const r = new i(u);
                                u !== c && l && (r[":@"] = this.buildAttributesMap(c, s)),
                                t && (t = this.parseTextData(t, u, s, !0, l, !0, !0)),
                                s = s.substr(0, s.lastIndexOf(".")),
                                r.add(this.options.textNodeName, t),
                                n.addChild(r)
                            } else {
                                if (c.length > 0 && c.lastIndexOf("/") === c.length - 1) {
                                    "/" === u[u.length - 1] ? (u = u.substr(0, u.length - 1),
                                    c = u) : c = c.substr(0, c.length - 1),
                                    this.options.transformTagName && (u = this.options.transformTagName(u));
                                    const e = new i(u);
                                    u !== c && l && (e[":@"] = this.buildAttributesMap(c, s)),
                                    s = s.substr(0, s.lastIndexOf(".")),
                                    n.addChild(e)
                                } else {
                                    const e = new i(u);
                                    this.tagsNodeStack.push(n),
                                    u !== c && l && (e[":@"] = this.buildAttributesMap(c, s)),
                                    n.addChild(e),
                                    n = e
                                }
                                r = "",
                                a = d
                            }
                        }
                    else
                        r += e[a];
                return t.child
            }
              , p = function(e) {
                if (this.options.processEntities) {
                    for (let t in this.docTypeEntities) {
                        const n = this.docTypeEntities[t];
                        e = e.replace(n.regx, n.val)
                    }
                    for (let t in this.lastEntities) {
                        const n = this.lastEntities[t];
                        e = e.replace(n.regex, n.val)
                    }
                    if (this.options.htmlEntities)
                        for (let t in this.htmlEntities) {
                            const n = this.htmlEntities[t];
                            e = e.replace(n.regex, n.val)
                        }
                    e = e.replace(this.ampEntity.regex, this.ampEntity.val)
                }
                return e
            };
            function h(e, t, n, r) {
                return e && (void 0 === r && (r = 0 === Object.keys(t.child).length),
                void 0 !== (e = this.parseTextData(e, t.tagname, n, !1, !!t[":@"] && 0 !== Object.keys(t[":@"]).length, r)) && "" !== e && t.add(this.options.textNodeName, e),
                e = ""),
                e
            }
            function g(e, t, n) {
                const r = "*." + n;
                for (const n in e) {
                    const i = e[n];
                    if (r === i || t === i)
                        return !0
                }
                return !1
            }
            function m(e, t, n, r) {
                const i = e.indexOf(t, n);
                if (-1 === i)
                    throw new Error(r);
                return i + t.length - 1
            }
            function y(e, t, n, r=">") {
                const i = function(e, t, n=">") {
                    let r, i = "";
                    for (let o = t; o < e.length; o++) {
                        let t = e[o];
                        if (r)
                            t === r && (r = "");
                        else if ('"' === t || "'" === t)
                            r = t;
                        else if (t === n[0]) {
                            if (!n[1])
                                return {
                                    data: i,
                                    index: o
                                };
                            if (e[o + 1] === n[1])
                                return {
                                    data: i,
                                    index: o
                                }
                        } else
                            "\t" === t && (t = " ");
                        i += t
                    }
                }(e, t + 1, r);
                if (!i)
                    return;
                let o = i.data;
                const s = i.index
                  , a = o.search(/\s/);
                let u = o
                  , c = !0;
                if (-1 !== a && (u = o.substr(0, a).replace(/\s\s*$/, ""),
                o = o.substr(a + 1)),
                n) {
                    const e = u.indexOf(":");
                    -1 !== e && (u = u.substr(e + 1),
                    c = u !== i.data.substr(e + 1))
                }
                return {
                    tagName: u,
                    tagExp: o,
                    closeIndex: s,
                    attrExpPresent: c
                }
            }
            function b(e, t, n) {
                const r = n;
                let i = 1;
                for (; n < e.length; n++)
                    if ("<" === e[n])
                        if ("/" === e[n + 1]) {
                            const o = m(e, ">", n, `${t} is not closed`);
                            if (e.substring(n + 2, o).trim() === t && (i--,
                            0 === i))
                                return {
                                    tagContent: e.substring(r, n),
                                    i: o
                                };
                            n = o
                        } else if ("?" === e[n + 1])
                            n = m(e, "?>", n + 1, "StopNode is not closed.");
                        else if ("!--" === e.substr(n + 1, 3))
                            n = m(e, "--\x3e", n + 3, "StopNode is not closed.");
                        else if ("![" === e.substr(n + 1, 2))
                            n = m(e, "]]>", n, "StopNode is not closed.") - 2;
                        else {
                            const r = y(e, n, ">");
                            r && ((r && r.tagName) === t && "/" !== r.tagExp[r.tagExp.length - 1] && i++,
                            n = r.closeIndex)
                        }
            }
            function v(e, t, n) {
                if (t && "string" == typeof e) {
                    const t = e.trim();
                    return "true" === t || "false" !== t && s(e, n)
                }
                return r.isExist(e) ? e : ""
            }
            e.exports = class {
                constructor(e) {
                    this.options = e,
                    this.currentNode = null,
                    this.tagsNodeStack = [],
                    this.docTypeEntities = {},
                    this.lastEntities = {
                        apos: {
                            regex: /&(apos|#39|#x27);/g,
                            val: "'"
                        },
                        gt: {
                            regex: /&(gt|#62|#x3E);/g,
                            val: ">"
                        },
                        lt: {
                            regex: /&(lt|#60|#x3C);/g,
                            val: "<"
                        },
                        quot: {
                            regex: /&(quot|#34|#x22);/g,
                            val: '"'
                        }
                    },
                    this.ampEntity = {
                        regex: /&(amp|#38|#x26);/g,
                        val: "&"
                    },
                    this.htmlEntities = {
                        space: {
                            regex: /&(nbsp|#160);/g,
                            val: " "
                        },
                        cent: {
                            regex: /&(cent|#162);/g,
                            val: "¢"
                        },
                        pound: {
                            regex: /&(pound|#163);/g,
                            val: "£"
                        },
                        yen: {
                            regex: /&(yen|#165);/g,
                            val: "¥"
                        },
                        euro: {
                            regex: /&(euro|#8364);/g,
                            val: "€"
                        },
                        copyright: {
                            regex: /&(copy|#169);/g,
                            val: "©"
                        },
                        reg: {
                            regex: /&(reg|#174);/g,
                            val: "®"
                        },
                        inr: {
                            regex: /&(inr|#8377);/g,
                            val: "₹"
                        }
                    },
                    this.addExternalEntities = a,
                    this.parseXml = f,
                    this.parseTextData = u,
                    this.resolveNameSpace = c,
                    this.buildAttributesMap = d,
                    this.isItStopNode = g,
                    this.replaceEntitiesValue = p,
                    this.readStopNodeData = b,
                    this.saveTextToParentTag = h
                }
            }
        }
        ,
        844: (e,t,n)=>{
            const {buildOptions: r} = n(745)
              , i = n(78)
              , {prettify: o} = n(997)
              , s = n(501);
            e.exports = class {
                constructor(e) {
                    this.externalEntities = {},
                    this.options = r(e)
                }
                parse(e, t) {
                    if ("string" == typeof e)
                        ;
                    else {
                        if (!e.toString)
                            throw new Error("XML data is accepted in String or Bytes[] form.");
                        e = e.toString()
                    }
                    if (t) {
                        !0 === t && (t = {});
                        const n = s.validate(e, t);
                        if (!0 !== n)
                            throw Error(`${n.err.msg}:${n.err.line}:${n.err.col}`)
                    }
                    const n = new i(this.options);
                    n.addExternalEntities(this.externalEntities);
                    const r = n.parseXml(e);
                    return this.options.preserveOrder || void 0 === r ? r : o(r, this.options)
                }
                addEntity(e, t) {
                    if (-1 !== t.indexOf("&"))
                        throw new Error("Entity value can't have '&'");
                    if (-1 !== e.indexOf("&") || -1 !== e.indexOf(";"))
                        throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
                    if ("&" === t)
                        throw new Error("An entity with value '&' is not permitted");
                    this.externalEntities[e] = t
                }
            }
        }
        ,
        997: (e,t)=>{
            "use strict";
            function n(e, t, s) {
                let a;
                const u = {};
                for (let c = 0; c < e.length; c++) {
                    const l = e[c]
                      , d = r(l);
                    let f = "";
                    if (f = void 0 === s ? d : s + "." + d,
                    d === t.textNodeName)
                        void 0 === a ? a = l[d] : a += "" + l[d];
                    else {
                        if (void 0 === d)
                            continue;
                        if (l[d]) {
                            let e = n(l[d], t, f);
                            const r = o(e, t);
                            l[":@"] ? i(e, l[":@"], f, t) : 1 !== Object.keys(e).length || void 0 === e[t.textNodeName] || t.alwaysCreateTextNode ? 0 === Object.keys(e).length && (t.alwaysCreateTextNode ? e[t.textNodeName] = "" : e = "") : e = e[t.textNodeName],
                            void 0 !== u[d] && u.hasOwnProperty(d) ? (Array.isArray(u[d]) || (u[d] = [u[d]]),
                            u[d].push(e)) : t.isArray(d, f, r) ? u[d] = [e] : u[d] = e
                        }
                    }
                }
                return "string" == typeof a ? a.length > 0 && (u[t.textNodeName] = a) : void 0 !== a && (u[t.textNodeName] = a),
                u
            }
            function r(e) {
                const t = Object.keys(e);
                for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (":@" !== n)
                        return n
                }
            }
            function i(e, t, n, r) {
                if (t) {
                    const i = Object.keys(t)
                      , o = i.length;
                    for (let s = 0; s < o; s++) {
                        const o = i[s];
                        r.isArray(o, n + "." + o, !0, !0) ? e[o] = [t[o]] : e[o] = t[o]
                    }
                }
            }
            function o(e, t) {
                const n = Object.keys(e).length;
                return !!(0 === n || 1 === n && e[t.textNodeName])
            }
            t.prettify = function(e, t) {
                return n(e, t)
            }
        }
        ,
        311: e=>{
            "use strict";
            e.exports = class {
                constructor(e) {
                    this.tagname = e,
                    this.child = [],
                    this[":@"] = {}
                }
                add(e, t) {
                    this.child.push({
                        [e]: t
                    })
                }
                addChild(e) {
                    e[":@"] && Object.keys(e[":@"]).length > 0 ? this.child.push({
                        [e.tagname]: e.child,
                        ":@": e[":@"]
                    }) : this.child.push({
                        [e.tagname]: e.child
                    })
                }
            }
        }
        ,
        153: e=>{
            const t = /^[-+]?0x[a-fA-F0-9]+$/
              , n = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
            !Number.parseInt && window.parseInt && (Number.parseInt = window.parseInt),
            !Number.parseFloat && window.parseFloat && (Number.parseFloat = window.parseFloat);
            const r = {
                hex: !0,
                leadingZeros: !0,
                decimalPoint: ".",
                eNotation: !0
            };
            e.exports = function(e, i={}) {
                if (i = Object.assign({}, r, i),
                !e || "string" != typeof e)
                    return e;
                let o = e.trim();
                if (void 0 !== i.skipLike && i.skipLike.test(o))
                    return e;
                if (i.hex && t.test(o))
                    return Number.parseInt(o, 16);
                {
                    const t = n.exec(o);
                    if (t) {
                        const n = t[1]
                          , r = t[2];
                        let a = (s = t[3]) && -1 !== s.indexOf(".") ? ("." === (s = s.replace(/0+$/, "")) ? s = "0" : "." === s[0] ? s = "0" + s : "." === s[s.length - 1] && (s = s.substr(0, s.length - 1)),
                        s) : s;
                        const u = t[4] || t[6];
                        if (!i.leadingZeros && r.length > 0 && n && "." !== o[2])
                            return e;
                        if (!i.leadingZeros && r.length > 0 && !n && "." !== o[1])
                            return e;
                        {
                            const t = Number(o)
                              , s = "" + t;
                            return -1 !== s.search(/[eE]/) || u ? i.eNotation ? t : e : -1 !== o.indexOf(".") ? "0" === s && "" === a || s === a || n && s === "-" + a ? t : e : r ? a === s || n + a === s ? t : e : o === s || o === n + s ? t : e
                        }
                    }
                    return e
                }
                var s
            }
        }
    }
      , t = {};
    function n(r) {
        var i = t[r];
        if (void 0 !== i)
            return i.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n),
        o.exports
    }
    n.n = e=>{
        var t = e && e.__esModule ? ()=>e.default : ()=>e;
        return n.d(t, {
            a: t
        }),
        t
    }
    ,
    n.d = (e,t)=>{
        for (var r in t)
            n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            })
    }
    ,
    n.o = (e,t)=>Object.prototype.hasOwnProperty.call(e, t),
    n.r = e=>{
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ;
    var r = {};
    (()=>{
        "use strict";
        n.r(r),
        n.d(r, {
            AWSAssumeRoleCommand: ()=>s,
            AWSAssumeRoleWithSAMLCommand: ()=>a,
            AWSSTSClient: ()=>o
        });
        const {STSClient: e, AssumeRoleCommand: t, AssumeRoleWithSAMLCommand: i} = n(352)
          , o = e
          , s = t
          , a = i
    }
    )(),
    webpacksts = r
}
)();
