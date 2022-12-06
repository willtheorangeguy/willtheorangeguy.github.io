! function s(o, c, l) {
    function r(t, e) {
        if (!c[t]) {
            if (!o[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (m) return m(t, !0);
                var a = new Error("Cannot find module '" + t + "'");
                throw a.code = "MODULE_NOT_FOUND", a
            }
            var i = c[t] = {
                exports: {}
            };
            o[t][0].call(i.exports, function(e) {
                return r(o[t][1][e] || e)
            }, i, i.exports, s, o, c, l)
        }
        return c[t].exports
    }
    for (var m = "function" == typeof require && require, e = 0; e < l.length; e++) r(l[e]);
    return r
}({
    1: [function(e, t, n) {
        "use strict";
        var a = s(e("../helpers/navigation-large-submenu")),
            i = s(e("../helpers/elementInViewport"));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var o, c = !1;

        function l() {
            c || (m(), document.removeEventListener("mousemove", l), window.removeEventListener("scroll", l), document.documentElement.classList.add("user-started"), function() {
                if (!document.querySelectorAll("script#main-script").length) {
                    var e, t = document.querySelectorAll("script[data-cache]");
                    (e = document.createElement("script")).id = "main-script", e.src = "/build/scripts/main.min.js?v=" + t[0].dataset.cache, document.head.appendChild(e)
                }
            }(), c = !0)
        }

        function r(e) {
            m(), document.removeEventListener("mousemove", r), document.removeEventListener("touchstart touchend", r)
        }

        function m() {
            if (window.gtmDidInit) return !1;
            window.gtmDidInit = !0, document.removeEventListener("mousemove", r), document.removeEventListener("touchstart touchend", r),
                function() {
                    var e = new FontFace("written", "url(https://static.saltinourhair.com/build/fonts/SaltWritten.woff2) format('woff2'), url(https://static.saltinourhair.com/build/fonts/SaltWritten.woff) format('woff')"),
                        t = new FontFace("Montserrat", "url('https://static.saltinourhair.com/build/fonts/montserrat-reg.woff2') format('woff2'), url('https://static.saltinourhair.com/build/fonts/montserrat-reg.woff') format('woff')"),
                        n = new FontFace("Merriweather", "url('https://static.saltinourhair.com/build/fonts/merriweather.woff2') format('woff2'), url('https://static.saltinourhair.com/build/fonts/merriweather.woff') format('woff')"),
                        a = new FontFace("Merriweather", "url('https://static.saltinourhair.com/build/fonts/merriweather-900.woff2') format('woff2'), url('https://static.saltinourhair.com/build/fonts/merriweather-900.woff') format('woff')", {
                            weight: 900
                        }),
                        i = document.body.classList.contains("home"),
                        s = document.body.classList.contains("category"),
                        o = document.body.classList.contains("tag");
                    document.body.classList.contains("post-template-default");
                    i ? (u(t), u(e)) : s ? (u(n), u(a)) : (o ? u(t) : (u(t), u(a)), u(e))
                }(),
                function() {
                    if (!document.querySelectorAll("script#mv-script").length) {
                        var e;
                        (e = document.createElement("script")).type = "text/javascript", e.async = !0, e.setAttribute("data-noptimize", 1), e.setAttribute("data-cfasync", !1), e.src = "https://scripts.mediavine.com/tags/salt-in-our-hair.js", e.id = "mv-script", document.head.appendChild(e)
                    }
                }()
        }

        function u(e) {
            e.load().then(function(e) {
                return document.fonts.add(e), !0
            })
        }
        window.addEventListener("scroll", l), document.addEventListener("mousemove", r), document.addEventListener("touchstart touchend", r), (0 < window.pageYOffset || document.documentElement.scrollHeight <= window.innerHeight || document.body.classList.contains("search-results")) && l(), "function" == typeof(o = function() {
            setTimeout(m, 3250), setTimeout(l, 3350), document.documentElement.classList.remove("no-js"), document.documentElement.classList.add("page-head--loaded"), a.default.navigationEvents();
            var e = document.querySelectorAll("img[tempsrc]");
            void 0 !== e && Array.prototype.forEach.call(e, function(e, t) {
                if ((0, i.default)(e)) {
                    var n = e.getAttribute("tempsrc");
                    e.removeAttribute("tempsrc"), e.setAttribute("src", n)
                }
            });
            var t = document.getElementsByClassName("page-nav__link--tips")[0],
                n = document.querySelector(".page-nav__link--tips.page-nav__item--topic");
            t.addEventListener("mouseenter", l), t.addEventListener("click", l), n.addEventListener("click", l), n.addEventListener("click", l), document.addEventListener("mousemove", l)
        }) && ((document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? o() : document.addEventListener("DOMContentLoaded", o, !1))
    }, {
        "../helpers/elementInViewport": 2,
        "../helpers/navigation-large-submenu": 3
    }],
    2: [function(e, t, n) {
        "use strict";

        function a(e) {
            return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;

        function i(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
            if (null != a(e) && null != e) {
                var n = e.getBoundingClientRect();
                return n.newTop = t ? n.top - 2 * (window.innerHeight || document.documentElement.clientHeight) : n.top, 0 < n.bottom && 0 < n.right && n.left < (window.innerWidth || document.documentElement.clientWidth) && n.newTop < (window.innerHeight || document.documentElement.clientHeight)
            }
        }
        n.default = i
    }, {}],
    3: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var a = {
            navigationEvents: function() {
                var n = {
                    items: document.querySelectorAll(".page-nav__list--menu > .page-nav__item, .page-nav__item--search > .page-nav__item"),
                    hasSubmenu: document.getElementsByClassName("page-nav__link--has-submenu"),
                    subMouseover: !1,
                    itemWithSubmenu: !1,
                    lastScrollY: !1,
                    mobileSubmenu: !1,
                    backgroundActive: !1,
                    init: function() {
                        n.burgerNav(), n.subNav()
                    },
                    burgerNav: function() {
                        document.getElementsByClassName("nav-burger")[0].addEventListener("click", function() {
                            document.getElementsByTagName("html")[0].classList.add("page-nav--hasbeenopen"), document.getElementsByTagName("html")[0].classList.toggle("page-nav--active"), document.getElementsByClassName("page-nav__container")[0].scrollLeft = 0, document.getElementsByClassName("page-nav__subcontainer")[0].scrollTop = 0, document.getElementsByClassName("page-nav__list--menu")[0].classList.remove("is-active"), n.lastScrollY ? (document.getElementsByTagName("html")[0].classList.toggle("page-locked"), window.scrollTo(0, n.lastScrollY), n.lastScrollY = !1) : (n.lastScrollY = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop, document.getElementsByTagName("html")[0].classList.toggle("page-locked")), 0 < document.getElementsByClassName("page-nav__item active").length && document.getElementsByClassName("page-nav__item active")[0].classList.remove("active")
                        })
                    },
                    subNav: function() {
                        [].forEach.call(n.items, function(e) {
                            e.addEventListener("mouseover", function(e) {
                                var t = this.getElementsByClassName("page-nav__link");
                                t.length && (this.classList.contains("page-nav__item--home") || this.parentNode.classList.contains("page-nav__item--search") || n.backgroundActive || (document.documentElement.classList.add("page-nav--bg-active"), n.backgroundActive = !0), t[0].classList.contains("page-nav__link--largesubmenu") ? (t[0].classList.contains("page-nav__link--destinations") && (e.preventDefault(), n.largeSubmenuNav("destinations")), t[0].classList.contains("page-nav__link--tips") && (e.preventDefault(), n.largeSubmenuNav("tips")), t[0].classList.contains("page-nav__link--planning") && (e.preventDefault(), n.largeSubmenuNav("planning"))) : n.itemWithSubmenu && (n.closeLargeSubmenuNav(), n.itemWithSubmenu = !1))
                            }), e.addEventListener("mouseleave", function(e) {
                                document.documentElement.classList.remove("page-nav--bg-active"), n.backgroundActive = !1, (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) && n.closeLargeSubmenuNav()
                            }), e.addEventListener("click", function(e) {
                                this.getElementsByClassName("page-nav__link")[0].classList.contains("page-nav__link--largesubmenu") && e.preventDefault();
                                var t = document.querySelector(".page-nav__item.active");
                                t && t != this && null !== t && (document.querySelector(".page-nav__item.active").classList.remove("active"), this.classList.remove("active"), n.mobileSubmenu = !1), e.target.closest(".page-nav__item-subcontainer") || (this.classList.contains("active") ? (document.getElementsByClassName("page-nav__list--menu")[0].classList.remove("active"), this.classList.remove("active"), n.mobileSubmenu = !1) : (document.getElementsByClassName("page-nav__list--menu")[0].classList.add("active"), this.classList.add("active"), n.mobileSubmenu = !0))
                            })
                        }), [].forEach.call(document.querySelectorAll(".page-nav__list--maintopic .page-nav__link"), function(e) {
                            e.addEventListener("click", function(e) {
                                if (this.classList.contains("page-nav__link--largesubmenu") && e.preventDefault(), this.classList.contains("page-nav__item--topic")) {
                                    if (this.classList.contains("topic-active")) return;
                                    var t = document.getElementsByClassName("page-nav__item--topic");
                                    return t[0].classList.remove("topic-active"), t[1].classList.remove("topic-active"), t[2].classList.remove("topic-active"), this.classList.add("topic-active"), void(this.classList.contains("page-nav__link--destinations") ? (document.getElementsByTagName("html")[0].classList.remove("page-nav--topic-tips"), document.getElementsByTagName("html")[0].classList.remove("page-nav--topic-planning")) : this.classList.contains("page-nav__link--tips") ? (document.getElementsByTagName("html")[0].classList.remove("page-nav--topic-planning"), document.getElementsByTagName("html")[0].classList.add("page-nav--topic-tips")) : this.classList.contains("page-nav__link--planning") && (document.getElementsByTagName("html")[0].classList.remove("page-nav--topic-tips"), document.getElementsByTagName("html")[0].classList.add("page-nav--topic-planning")))
                                }
                            })
                        }), [].forEach.call(document.getElementsByClassName("page-nav__subcontainer"), function(e) {
                            e.addEventListener("mouseover", function() {
                                n.subMouseover = !0, n.backgroundActive || (document.documentElement.classList.add("page-nav--bg-active"), n.backgroundActive = !0)
                            }), e.addEventListener("mouseleave", function(e) {
                                n.closeLargeSubmenuNav(), document.documentElement.classList.remove("page-nav--bg-active"), n.backgroundActive = !1
                            })
                        }), [].forEach.call(n.hasSubmenu, function(e) {
                            e.addEventListener("click", function(e) {
                                if (window.innerWidth < 980) return e.preventDefault(), !1
                            })
                        })
                    },
                    largeSubmenuNav: function(e) {
                        n.itemWithSubmenu != e && n.closeLargeSubmenuNav(), n.itemWithSubmenu = e, document.documentElement.classList.contains("page-nav__" + e + "--active") || document.documentElement.classList.add("page-nav__" + e + "--active")
                    },
                    closeLargeSubmenuNav: function() {
                        document.documentElement.classList.remove("page-nav__destinations--active", "page-nav__tips--active", "page-nav__planning--active"), n.subMouseover = !1, document.getElementsByClassName("page-nav")[0].classList.contains("page-nav--sticked--active") || document.getElementsByClassName("page-nav")[0].classList.remove("page-nav--small", "page-nav--sticked", "page-nav--sticked--visible")
                    }
                };
                document.addEventListener("click", function(e) {
                    if (!e.target.closest(".page-nav__item-sublist") && n.mobileSubmenu) {
                        if (e.target.classList.contains("page-nav__link") && e.target.classList.contains("active")) return;
                        document.getElementsByClassName("page-nav__list--menu")[0].classList.remove("active");
                        var t = document.querySelectorAll(".page-nav__link--has-submenu.active");
                        return t.length && t[0].classList.remove("active"), void(n.mobileSubmenu = !1)
                    }
                }), n.init()
            }
        };
        n.default = a
    }, {}]
}, {}, [1]);
