

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

___$insertStyle("/* Thin Scrollbar */\n:root {\n  scrollbar-color: #737373 #38383d !important;\n  scrollbar-width: thin !important;\n}");

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

___$insertStyle("@charset \"UTF-8\";\n/* Thin Scrollbar */\n:root {\n  scrollbar-color: #737373 #38383d !important;\n  scrollbar-width: thin !important;\n}\n\n.printer {\n  display: inline-block;\n  width: 100%;\n  font-family: \"Ubuntu Mono\", monospace;\n  text-rendering: optimizespeed;\n  line-height: 14px;\n  font-size: 11px;\n  background: #232327;\n  color: #75bfff;\n  /*\n  //nice selection effect\n  .fold:hover {\n  \t// seems impossible to select firstchildName\n  \tbackground-color: rgba(0, 0, 0, 0.2);\n  \tborder: 1px solid rgba(255, 0, 0, 0.3);\n  \tmargin: -1px;\n  }\n  */\n}\n.printer .gluedPreview > * {\n  display: inline-block;\n}\n.printer .gluedPreview:not(:empty) {\n  margin: 0px 6px;\n}\n.printer .gluedPreview div:not(:last-child):after {\n  color: #FFFFFF;\n  content: \",\";\n  margin-right: 6px;\n}\n.printer .foldHeadLine:hover {\n  background-color: rgba(0, 0, 0, 0.2);\n}\n.printer .printTab {\n  padding-left: 10px;\n  margin-left: 3px;\n  border-left: 1px solid #75bfff;\n  /*\n  & > *:not(.fold) {\n  \tmargin-left: 19px;\n  }\n  */\n}\n.printer .printTab > div > .name {\n  margin-left: 12px;\n}\n.printer .Pointing_Small_Triangle {\n  color: #939395;\n  cursor: pointer;\n  margin-right: 5px;\n}\n.printer .name::after {\n  color: #939395;\n  content: \": \";\n}\n.printer .number {\n  color: #86de74;\n}\n.printer .nan {\n  color: #939395;\n}\n.printer .bigint {\n  color: #86de74;\n}\n.printer .boolean {\n  color: #86de74;\n}\n.printer .undefined {\n  color: #939395;\n}\n.printer .null {\n  color: #939395;\n}\n.printer .string {\n  color: #ff7de9;\n}\n.printer .string::after, .printer .string::before {\n  color: #939395;\n  content: '\"';\n}\n.printer .grey {\n  color: #939395;\n}\n.printer .UNSUPORTED {\n  color: red;\n  font-weight: bolder;\n  padding: 0px 5px;\n  display: inline-block;\n}\n.printer .inline,\n.printer .inline > * {\n  display: inline-block;\n}");

var printName = function (name) { return React__default['default'].createElement("span", { className: "name" }, name); };
function Fold(props) {
    var _a = React.useState(props.deepness < props.maxDeepness), isOpen = _a[0], setIsOpen = _a[1];
    return isOpen ? (React__default['default'].createElement("div", { className: "fold" },
        React__default['default'].createElement("div", { className: "foldHeadLine", onClick: function () { return setIsOpen(false); } },
            React__default['default'].createElement("span", { className: "Pointing_Small_Triangle" }, "\u25BC"),
            props.open()),
        React__default['default'].createElement("div", { className: "printTab" }, props.body()))) : (React__default['default'].createElement("div", { className: "fold" },
        React__default['default'].createElement("div", { className: "foldHeadLine", onClick: function () { return setIsOpen(true); } },
            React__default['default'].createElement("span", { className: "Pointing_Small_Triangle" }, "\u25B6"),
            props.close())));
}
function PrintDictionary(props) {
    if (props.maxDeepness === -1)
        return (React__default['default'].createElement(React__default['default'].Fragment, null,
            "{",
            React__default['default'].createElement("span", { className: "grey" }, "\u2026"),
            "}"));
    var open = function () { return (React__default['default'].createElement(React__default['default'].Fragment, null,
        printName(props.name),
        "{",
        React__default['default'].createElement("span", { className: "grey" }, "\u2026"),
        "}")); };
    var close = function () {
        var maxChild = 3;
        var maxDeepness = -1;
        var entries = Object.entries(props.value);
        var l = maxChild < entries.length ? maxChild : entries.length;
        var child = new Array(l);
        for (var i = 0; i < l; i++) {
            child[i] = (React__default['default'].createElement("div", { key: i },
                typeof entries[i][1] !== "object" && printName(entries[i][0]),
                entries[i][1] === null && printName(entries[i][0]),
                selectDrawer({
                    name: entries[i][0],
                    value: entries[i][1],
                    drawer: defaultDrawer,
                    mainDrawer: props.mainDrawer,
                    deepness: props.deepness + 1,
                    maxDeepness: maxDeepness,
                    selectDrawer: selectDrawer,
                })));
        }
        return (React__default['default'].createElement(React__default['default'].Fragment, null,
            printName(props.name),
            "Object {",
            React__default['default'].createElement("span", { className: "gluedPreview" },
                child,
                Object.entries(props.value).length > 3 ? (React__default['default'].createElement("div", null,
                    React__default['default'].createElement("span", { className: "grey" }, "\u2026"))) : null),
            "}"));
    };
    var body = function () {
        var entries = Object.entries(props.value);
        var l = entries.length;
        var child = new Array(l);
        for (var i = 0; i < l; i++) {
            var name_1 = null;
            var result = selectDrawer({
                name: entries[i][0],
                value: entries[i][1],
                drawer: props.mainDrawer,
                mainDrawer: props.mainDrawer,
                deepness: props.deepness + 1,
                maxDeepness: props.maxDeepness,
                selectDrawer: selectDrawer,
            });
            if (
            //@ts-ignore
            result.type.name !== "PrintArray" &&
                //@ts-ignore
                result.type.name !== "PrintDictionary")
                name_1 = printName(entries[i][0].toString());
            child[i] = (React__default['default'].createElement("div", { key: i },
                name_1,
                result));
        }
        return child;
    };
    return React__default['default'].createElement(Fold, __assign({}, props, { open: open, close: close, body: body }));
}
function PrintArray(props) {
    if (props.maxDeepness === -1)
        return (React__default['default'].createElement(React__default['default'].Fragment, null,
            "[",
            React__default['default'].createElement("span", { className: "grey" }, "\u2026"),
            "]"));
    var open = function () { return (React__default['default'].createElement(React__default['default'].Fragment, null,
        printName(props.name),
        React__default['default'].createElement("span", { className: "grey" },
            "(",
            props.value.length,
            ")"),
        "\u00A0[",
        React__default['default'].createElement("span", { className: "grey" }, "\u2026"),
        "]")); };
    var close = function () {
        var _a, _b;
        var maxChild = 3;
        var maxDeepness = -1;
        var l = maxChild < ((_a = props.value) === null || _a === void 0 ? void 0 : _a.length) ? maxChild : (_b = props.value) === null || _b === void 0 ? void 0 : _b.length;
        var child = new Array(l);
        for (var i = 0; i < l; i++) {
            child[i] = (React__default['default'].createElement("div", { key: i }, selectDrawer({
                name: i.toString(),
                value: props.value[i],
                drawer: defaultDrawer,
                mainDrawer: props.mainDrawer,
                deepness: props.deepness + 1,
                maxDeepness: maxDeepness,
                selectDrawer: selectDrawer,
            })));
        }
        return (React__default['default'].createElement(React__default['default'].Fragment, null,
            printName(props.name),
            "Array",
            React__default['default'].createElement("span", { className: "grey" },
                "(",
                props.value.length,
                ")"),
            "\u00A0[",
            React__default['default'].createElement("span", { className: "gluedPreview" },
                child,
                props.value.length > maxChild ? (React__default['default'].createElement("div", null,
                    React__default['default'].createElement("span", { className: "grey" }, "\u2026"))) : null),
            "]"));
    };
    var body = function () {
        var _a;
        var l = (_a = props.value) === null || _a === void 0 ? void 0 : _a.length;
        var child = new Array(l);
        for (var i = 0; i < l; i++) {
            var name_2 = null;
            var result = selectDrawer({
                name: i.toString(),
                value: props.value[i],
                drawer: props.mainDrawer,
                mainDrawer: props.mainDrawer,
                deepness: props.deepness + 1,
                maxDeepness: props.maxDeepness,
                selectDrawer: selectDrawer,
            });
            if (
            //@ts-ignore
            result.type.name !== "PrintArray" &&
                //@ts-ignore
                result.type.name !== "PrintDictionary")
                name_2 = printName(i.toString());
            child[i] = (React__default['default'].createElement("div", { key: i },
                name_2,
                result));
        }
        return child;
    };
    return React__default['default'].createElement(Fold, __assign({}, props, { open: open, close: close, body: body }));
}

/*
        Data Types :
                undefined
                Boolean
                Number
                String
                BigInt
                Symbol
        Structural Types:
                Object
                        new Object
                        new Array
                        new Map
                        new Set
                        new WeakMap
                        new WeakSet
                        new Date
                        ... and almost everything made with new keyword
                Function
                        a non-data structure, though it also answers for
                        typeof operator: typeof instance === "function".
                        This is merely a special shorthand for Functions,
                        though every Function constructor is derived from
                        Object constructor.
        Structural Root Primitive:
                null
                        WARNING typeof instance === "object".
                        Special primitive type having additional usage for its value:
                        if object is not inherited, then null is shown;
 */
var defaultDrawer = [
    {
        filter: function (element) { return typeof (element === null || element === void 0 ? void 0 : element.value) === "undefined"; },
        component: function () { return React__default['default'].createElement("span", { className: "undefined" }, "undefined"); },
    },
    {
        filter: function (element) { return typeof (element === null || element === void 0 ? void 0 : element.value) === "boolean"; },
        component: function (props) { return (React__default['default'].createElement("span", { className: "boolean" }, props.value.toString())); },
    },
    {
        filter: function (element) { return typeof (element === null || element === void 0 ? void 0 : element.value) === "number"; },
        subDrawer: [
            {
                filter: function (element) { return isNaN(element.value); },
                component: function (props) { return React__default['default'].createElement("span", { className: "nan" }, props.value); },
            },
            {
                component: function (props) { return React__default['default'].createElement("span", { className: "number" }, props.value); },
            },
        ],
    },
    {
        filter: function (element) { return typeof (element === null || element === void 0 ? void 0 : element.value) === "string"; },
        component: function (props) { return React__default['default'].createElement("span", { className: "string" }, props.value); },
    },
    {
        filter: function (element) { return typeof (element === null || element === void 0 ? void 0 : element.value) === "bigint"; },
        component: function (props) { return (React__default['default'].createElement("span", { className: "bigint" },
            props.value.toString(),
            "n")); },
    },
    {
        filter: function (element) { return typeof (element === null || element === void 0 ? void 0 : element.value) === "object"; },
        subDrawer: [
            {
                filter: function (element) { return (element === null || element === void 0 ? void 0 : element.value) === null; },
                component: function () { return React__default['default'].createElement("span", { className: "null" }, "null"); },
            },
            {
                filter: function (element) { var _a; return ((_a = element === null || element === void 0 ? void 0 : element.value) === null || _a === void 0 ? void 0 : _a.constructor) === Array; },
                component: function (props) { return React__default['default'].createElement(PrintArray, __assign({}, props)); },
            },
            {
                filter: function (element) { var _a; return ((_a = element === null || element === void 0 ? void 0 : element.value) === null || _a === void 0 ? void 0 : _a.constructor) === Object; },
                component: function (props) { return React__default['default'].createElement(PrintDictionary, __assign({}, props)); },
            },
            {
                filter: function (element) { var _a; return ((_a = element === null || element === void 0 ? void 0 : element.value) === null || _a === void 0 ? void 0 : _a.constructor) === Buffer; },
                component: function () {
                    return React__default['default'].createElement(React__default['default'].Fragment, null, "ArrayBuffer");
                },
            },
            {
                filter: function (element) { var _a; return !((_a = element === null || element === void 0 ? void 0 : element.value) === null || _a === void 0 ? void 0 : _a.constructor); },
                component: function (props) { return React__default['default'].createElement(PrintDictionary, __assign({}, props)); },
            },
        ],
    },
    {
        component: function (props) {
            var _a, _b, _c, _d;
            console.log("PRINTER UNSUPORTED VALUE", props);
            if (!((_b = (_a = props === null || props === void 0 ? void 0 : props.value) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name))
                console.log(props.value);
            return (React__default['default'].createElement("div", { className: "UNSUPORTED" },
                "UNSUPORTED VALUE: ",
                typeof props.value,
                " ", (_d = (_c = props === null || props === void 0 ? void 0 : props.value) === null || _c === void 0 ? void 0 : _c.constructor) === null || _d === void 0 ? void 0 :
                _d.name));
        },
    },
];

// => LOOP DETECTOR ? (circulary refence, mayby use symbol ?)
// give absolute_path for filters ?
function Print(props) {
    var _a, _b, _c;
    var value = props.value;
    var name = (_a = props.name) !== null && _a !== void 0 ? _a : "";
    var drawer = (_b = props.drawer) !== null && _b !== void 0 ? _b : defaultDrawer;
    var maxDeepness = (_c = props.maxDeepness) !== null && _c !== void 0 ? _c : 0;
    var deepness = 0; // accumulatore
    return (React__default['default'].createElement("div", { className: "printer" }, selectDrawer({
        name: name,
        value: value,
        drawer: drawer,
        deepness: deepness,
        maxDeepness: maxDeepness,
        mainDrawer: drawer,
        selectDrawer: selectDrawer,
    })));
}
function selectDrawer(props) {
    var _loop_1 = function (i, l) {
        var _a = props.drawer[i], filter = _a.filter, component = _a.component, subDrawer = _a.subDrawer;
        if (!filter || filter(props)) {
            var result = null;
            if (subDrawer) {
                result = selectDrawer(__assign(__assign({}, props), { drawer: subDrawer, selectDrawer: selectDrawer }));
            }
            if ((subDrawer && result) || !subDrawer) {
                if (component)
                    result = component(props, function (value) {
                        return selectDrawer(__assign(__assign({}, props), { drawer: subDrawer !== null && subDrawer !== void 0 ? subDrawer : props.mainDrawer, value: value, selectDrawer: selectDrawer }));
                    });
            }
            if (result) {
                return { value: result };
            }
        }
    };
    for (var i = 0, l = props.drawer.length; i < l; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return null;
}

___$insertStyle("/* Thin Scrollbar */\n:root {\n  scrollbar-color: #737373 #38383d !important;\n  scrollbar-width: thin !important;\n}\n\n.log {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  background-color: #232327;\n  font-family: \"Ubuntu Mono\", monospace;\n  text-rendering: optimizespeed;\n  line-height: 14px;\n  font-size: 11px;\n}\n.log .sep {\n  display: inline;\n  margin: 0px 3px;\n  border-left: 1px solid rgba(63, 63, 63, 0.9);\n}\n.log .header {\n  height: 30px;\n  background-color: #1f1f1f;\n  border-bottom: 1px solid #3f3f3f;\n}\n.log .header button {\n  border: none;\n  font-size: 12px;\n  font-weight: lighter;\n  background-color: rgba(255, 255, 255, 0.2);\n  color: white;\n  border-radius: 3px;\n  padding: 0px 6px;\n  margin: 5px 2px;\n}\n.log .header button:hover {\n  cursor: pointer;\n  background-color: rgba(255, 255, 255, 0.3);\n}\n.log .header button.off {\n  background-color: rgba(255, 255, 255, 0);\n  border: 1px dashed rgba(255, 255, 255, 0.1);\n  color: white;\n}\n.log .header button.off:hover {\n  background-color: rgba(255, 255, 255, 0.05);\n  border: 1px dashed rgba(255, 255, 255, 0);\n}\n.log .header .channels_list {\n  margin: 0px 10px;\n  float: left;\n}\n.log .header .types_list {\n  margin: 0px 10px;\n  float: right;\n}\n.log .logList {\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n}\n.log .logList p {\n  padding: 3px;\n}\n.log .logList p + p {\n  border-top: 1px solid rgba(255, 255, 255, 0.08);\n}\n.log .logList .msg {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.log .logList .time {\n  color: rgba(255, 255, 255, 0.8);\n  margin: 0px 0px;\n}\n.log .logList .statusCode {\n  background-color: rgba(255, 255, 255, 0.05);\n  padding: 0px 5px;\n  border-radius: 3px;\n  margin: 0px 0px;\n  float: right;\n}\n.log .logList .debug {\n  color: #939395;\n}\n.log .logList .info {\n  color: #4040ff;\n}\n.log .logList .warn {\n  color: #fce2a1;\n  background-color: #42381f;\n}\n.log .logList .error {\n  color: #ffb3d2;\n  background-color: #4b2f36;\n}");

// @ts-nocheck
function Log(props) {
    var hms = props.hms, ms = props.ms, type = props.type, channel = props.channel, msg = props.msg, statusCode = props.statusCode;
    return (React__default['default'].createElement("p", { className: type },
        React__default['default'].createElement("span", { className: "time" },
            hms,
            ".",
            ms,
            React__default['default'].createElement("strong", null,
                " [",
                channel,
                "] ")),
        React__default['default'].createElement("span", { className: "msg" }, msg),
        React__default['default'].createElement("span", { className: "statusCode" }, statusCode)));
}
function render_header(list, cb) {
    return list.map(function (el, id) { return (React__default['default'].createElement("button", { key: id, className: el.display ? "" : "off", onClick: function () { return cb(el); } },
        el.name,
        " ",
        el.display ? "" : "(" + el.nb + ")")); });
}
function render_channels(channels, types) {
    var cb1 = function (e) {
        console.log("CLICK CHANNELS ", e);
    };
    var cb2 = function (e) {
        console.log("CLICK TYPES ", e);
    };
    var channels = (React__default['default'].createElement("div", { className: "channels_list" },
        "Channels",
        React__default['default'].createElement("div", { className: "sep" }),
        React__default['default'].createElement("button", null, "All"),
        React__default['default'].createElement("button", null, "\u2620\u2622 \uD83D\uDDD1"),
        React__default['default'].createElement("div", { className: "sep" }),
        render_header(channels, cb1)));
    var types = (React__default['default'].createElement("div", { className: "types_list" },
        render_header(types, cb2),
        React__default['default'].createElement("div", { className: "sep" }),
        React__default['default'].createElement("button", { className: "channel" }, "All"),
        "Types"));
    return [channels, types];
}
function render_list(logs) {
    var date = new Date();
    return logs.map(function (log, id) {
        // WARNING  // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // CONVERSION OF TIME IN RENDER KILL PERFORMANCE (take 40/50ms|20/40ms without)
        date.setTime(log.timestamp);
        var hms = date.toLocaleTimeString("fr-FR");
        var ms = date.getUTCMilliseconds().toString().padStart(3, "0");
        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
        return (React__default['default'].createElement(Log, { key: id, hms: hms, ms: ms, type: log.type, channel: log.channel, msg: log.msg, statusCode: log.statusCode }));
    });
}
function Logger(props) {
    return (React__default['default'].createElement("div", { className: "log", style: { width: props.width } },
        React__default['default'].createElement("div", { className: "header" }, render_channels(props.channels, props.types)),
        React__default['default'].createElement("div", { className: "logList" }, render_list(props.logs))));
}

function Window(props) {
    var direction = props.direction, ratio = props.ratio, component = props.component;
    return (React__default['default'].createElement("div", { className: "TWM_window", style: {
            width: direction ? "100%" : ratio + "%",
            height: direction ? ratio + "%" : "100%",
        } }, component));
}

// @ts-nocheck
function Separator(props) {
    return (React__default['default'].createElement("div", { className: props.direction ? "TWM_separator_h" : "TWM_separator_v" },
        React__default['default'].createElement("div", { onMouseDown: function () { return props.callback(props.id); } })));
}

function apply_resize(id, size, state, setState) {
    setState({
        children: state.children.map(function (child, i) {
            if (id === i)
                return __assign(__assign({}, child), { ratio: child.ratio + size });
            else if (id + 1 === i)
                return __assign(__assign({}, child), { ratio: child.ratio - size });
            else
                return __assign({}, child);
        }),
    });
}
function print_children(props, state, resize) {
    var windows = props.windows, direction = props.direction;
    var children = state.children;
    return children.map(function (el, id) {
        child = el.component ? (React__default['default'].createElement(Window, { key: id * 2, direction: direction, ratio: el.ratio, component: windows[el.component] })) : (React__default['default'].createElement(Group, { key: id * 2, windows: windows, direction: el.direction, parentDirection: direction, ratio: el.ratio, children: el.children }));
        var separator = (React__default['default'].createElement(Separator, { key: id * 2 + 1, direction: direction, id: id, callback: resize }));
        return id + 1 < children.length ? [child, separator] : child;
    });
}
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(props) {
        var _this = _super.call(this, props) || this;
        var _a = _this.props; _a.direction; _a.ratio; var children = _a.children;
        _this.state = { children: children };
        _this.resize = _this.resize.bind(_this);
        _this.setState = _this.setState.bind(_this);
        _this.ref = React__default['default'].createRef();
        return _this;
    }
    Group.prototype.resize = function (id) {
        var initialPos = this.props.direction
            ? window.event.clientY
            : window.event.clientX;
        var mouseMoveHandler = function (e) {
            var pos, ratio, size;
            if (this.props.direction) {
                pos = e.y;
                ratio = this.ref.current.clientHeight;
            }
            else {
                pos = e.x;
                ratio = this.ref.current.clientWidth;
            }
            // WORK DIRECTLY WITH PIXEL GIVE PROBABLY MORE PRECISION
            size = ((pos - initialPos) / ratio) * 100;
            var margin = 10; // PERCENT ??
            var child_a_ratio = this.state.children[id].ratio;
            var child_b_ratio = this.state.children[id + 1].ratio;
            // WORK DIRECTLY WITH PIXEL GIVE PROBABLY MORE PRECISION
            // CHECK CHILDREN IN SELECTED ARBO MIN/MAX SIZE
            if (child_a_ratio + size < margin)
                size = margin - child_a_ratio;
            else if (child_b_ratio - size < margin)
                size = child_b_ratio - margin;
            else {
                initialPos = pos;
            }
            apply_resize(id, size, this.state, this.setState);
        };
        mouseMoveHandler = mouseMoveHandler.bind(this);
        var removeMouseListener = function (e) {
            document.removeEventListener("mousemove", mouseMoveHandler, true);
            document.removeEventListener("mouseup", removeMouseListener, true);
            document.body.style["pointer-events"] = "auto";
        };
        document.addEventListener("mousemove", mouseMoveHandler, true);
        document.addEventListener("mouseup", removeMouseListener, true);
        document.body.style["pointer-events"] = "none";
    };
    Group.prototype.render = function () {
        var _a = this.props, ratio = _a.ratio, parentDirection = _a.parentDirection, direction = _a.direction;
        this.state.children;
        return (React__default['default'].createElement("div", { ref: this.ref, className: "TWM_group", style: {
                flexDirection: direction ? "column" : "row",
                width: parentDirection ? "100%" : ratio + "%",
                height: parentDirection ? ratio + "%" : "100%",
            } }, print_children(this.props, this.state, this.resize)));
    };
    return Group;
}(React__default['default'].Component));

// @ts-nocheck
function TilingWindowManager(props) {
    var _a = props.arbo, direction = _a.direction, ratio = _a.ratio, children = _a.children;
    var windows = props.windows, height = props.height, width = props.width, debug = props.debug;
    return (React__default['default'].createElement("div", { className: debug ? "TWM TWM_debug" : "TWM", style: {
            height: height || "100%",
            width: width || "100%",
        } },
        React__default['default'].createElement(Group, { windows: windows, direction: direction, ratio: ratio, children: children })));
}

exports.Fold = Fold;
exports.Log = Logger;
exports.Print = Print;
exports.TilingWindowManager = TilingWindowManager;
exports.defaultDrawer = defaultDrawer;
//# sourceMappingURL=index.js.map
