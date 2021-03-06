

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

___$insertStyle(".printer {\n  font-size: 11px;\n  background: #232327;\n  color: #75bfff;\n  font-family: \"Ubuntu Mono\", monospace;\n  text-rendering: optimizespeed;\n  line-height: 14px;\n}\n.printer button {\n  cursor: pointer;\n}\n.printer div.inline {\n  display: inline-block;\n}\n.printer div.name {\n  display: inline-block;\n}\n.printer div.dirname {\n  width: 100%;\n}\n.printer div.dirname:hover {\n  background-color: rgba(0, 0, 0, 0.2);\n}\n.printer div.caler {\n  display: inline-block;\n}\n.printer .printTab {\n  padding-left: 11px;\n  margin-left: 3px;\n  border-left: 1px solid #75bfff;\n}\n.printer span.object {\n  color: red;\n}\n.printer span.number,\n.printer span.boolean {\n  color: #86de74;\n}\n.printer span.string {\n  color: #ff7de9;\n}\n.printer span.grey {\n  color: #939395;\n}\n.printer span.Pointing_Small_Triangle {\n  color: #939395;\n}");

var defaultDrawer = [
    {
        filter: function (element) { return element.value.constructor === Array; },
        Component: PrintArray,
    },
    {
        filter: function (element) { return element.value.constructor === Object; },
        Component: PrintDictionary,
    },
    {
        filter: function () { return true; },
        Component: PrintOther,
    },
];
function PrintOther(props) {
    var type = typeof props.value;
    var jsx;
    if (type === "string") {
        jsx = React__default['default'].createElement("span", { className: "string" },
            "\"",
            props.value,
            "\"");
    }
    else if (type === "number") {
        jsx = React__default['default'].createElement("span", { className: "number" }, props.value);
    }
    else if (type === "boolean") {
        jsx = React__default['default'].createElement("span", { className: "boolean" }, props.value ? "true" : "false");
    }
    else {
        jsx = React__default['default'].createElement("span", { className: "UNSUPPORTED" }, "UNSUPORTED");
        console.error("UNSUPPORTED");
        console.error(props.value);
    }
    // PADD RIGHT TO COMPENS ARROW OF OTHER PROPS
    // AND SPAN HEIGT= 17
    // BUT DIV HEIGT=21
    return (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "name" }, props.name),
        React__default['default'].createElement("span", { className: "grey" }, ":\u00A0"),
        React__default['default'].createElement("div", { className: "inline" }, jsx)));
}
function PrintDictionary(props) {
    return props.isOpen ? (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "dirname", onClick: function () { return props.setIsOpen(false); } },
            React__default['default'].createElement("span", { className: "Pointing_Small_Triangle" }, "\u25BC"),
            "\u00A0",
            props.name,
            React__default['default'].createElement("span", { className: "grey" }, ":\u00A0"),
            "{",
            React__default['default'].createElement("span", { className: "grey" }, "\u2026"),
            "}"),
        React__default['default'].createElement("div", { className: "printTab" }, props.children))) : (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "dirname", onClick: function () { return props.setIsOpen(true); } },
            React__default['default'].createElement("span", { className: "Pointing_Small_Triangle" }, "\u25B6"),
            "\u00A0",
            props.name,
            React__default['default'].createElement("span", { className: "grey" }, ":"),
            "\u00A0Object {",
            React__default['default'].createElement("span", { className: "grey" }, "\u2026"),
            "}")));
}
function PrintArray(props) {
    return props.isOpen ? (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "dirname", onClick: function () { return props.setIsOpen(false); } },
            React__default['default'].createElement("span", { className: "Pointing_Small_Triangle" }, "\u25BC"),
            "\u00A0",
            props.name,
            React__default['default'].createElement("span", { className: "grey" },
                ": (",
                props.value.length,
                ")"),
            "\u00A0[",
            React__default['default'].createElement("span", { className: "grey" }, "\u2026"),
            "]"),
        React__default['default'].createElement("div", { className: "printTab" }, props.children))) : (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "dirname", onClick: function () { return props.setIsOpen(true); } },
            React__default['default'].createElement("span", { className: "Pointing_Small_Triangle" }, "\u25B6"),
            "\u00A0",
            props.name,
            React__default['default'].createElement("span", { className: "grey" }, ":"),
            "\u00A0Array",
            React__default['default'].createElement("span", { className: "grey" },
                "(",
                props.value.length,
                ")"),
            "\u00A0[",
            React__default['default'].createElement("span", { className: "grey" }, "\u2026"),
            "]")));
}

/*
    undefined : typeof instance === "undefined"
    Boolean : typeof instance === "boolean"
    Number : typeof instance === "number"
    String : typeof instance === "string"
    BigInt : typeof instance === "bigint"
    Symbol : typeof instance === "symbol"
    */
// create usual filters like
// shadow (don't draw the element himself but draw children)
// don't draw
// REFLECHIRE A UNE ARBORESCENCE DE DRAWER (CASCADING)
function Print(props) {
    // init here
    // => LOOP DETECTOR (circulary refence, mayby use symbol ?)
    // give absolute_path for filters ?
    // recursive drawer will be more efficient and beautiful to write
    var name = props.name;
    var value = props.value;
    var drawer = props.drawer ? props.drawer : defaultDrawer;
    var deepness = props.deepness;
    var maxDeepness = props.maxDeepness;
    return (React__default['default'].createElement("div", { className: "printer" }, React__default['default'].createElement(Loop, { name: name, value: value, drawer: drawer, deepness: deepness, maxDeepness: maxDeepness })));
}
function Loop(props) {
    var _a = React.useState(props.deepness < props.maxDeepness), isOpen = _a[0], setIsOpen = _a[1];
    var child = null;
    // transformer Loop en FONCTION NON REACT
    // could return info from child
    // could return total nblines
    var l;
    var maxDeepness = isOpen ? props.maxDeepness : 0;
    if (props.value.constructor === Array) {
        l = props.value.length;
        if (!isOpen && l >= 3)
            l = 3;
        child = new Array(l);
        for (var i = 0; i < l; i++) {
            child[i] = (React__default['default'].createElement(Loop, { name: i, value: props.value[i], drawer: props.drawer, deepness: props.deepness + 1, maxDeepness: maxDeepness }));
        }
    }
    else if (props.value.constructor === Object) {
        var entries = Object.entries(props.value);
        l = entries.length;
        if (!isOpen && l >= 3)
            l = 3;
        child = new Array(l);
        for (var i = 0; i < l; i++) {
            child[i] = (React__default['default'].createElement(Loop, { name: entries[i][0], value: entries[i][1], drawer: props.drawer, deepness: props.deepness + 1, maxDeepness: maxDeepness }));
        }
    }
    for (var i = 0, l_1 = props.drawer.length; i < l_1; i++) {
        var e = props.drawer[i];
        if (e.filter(props)) {
            var Component = e.Component;
            return (React__default['default'].createElement(Component, { name: props.name, value: props.value, isOpen: isOpen, setIsOpen: setIsOpen }, child));
        }
    }
    // NO FILTER FOR THIS
    // MUST RETURN SOMETHING
    // OR AT LEST, LOG
}

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

exports.DefaultDrawer = defaultDrawer;
exports.Print = Print;
exports.TilingWindowManager = TilingWindowManager;
//# sourceMappingURL=index.js.map
