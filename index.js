

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

___$insertStyle(".printer {\n  font-size: 13px;\n  font-weight: lighter;\n  background: #282828;\n  color: #7878ff;\n}\n\nbutton {\n  cursor: pointer;\n}\n\ndiv.inline {\n  display: inline-block;\n}\n\ndiv.name {\n  display: inline-block;\n}\n\ndiv.name:hover {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\ndiv.caler {\n  display: inline-block;\n}\n\n.printTab {\n  padding-left: 15px;\n  margin-left: 3px;\n  border-left: 1px solid blue;\n}\n\nspan.object {\n  color: red;\n}\n\nspan.boolean {\n  color: green;\n}\n\nspan.number {\n  color: blue;\n}\n\nspan.string {\n  color: cyan;\n}");

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
        ":\u00A0",
        React__default['default'].createElement("div", { className: "inline" }, jsx)));
}
function PrintDictionary(props) {
    return props.isOpen ? (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "name", onClick: function () { return props.setIsOpen(false); } },
            React__default['default'].createElement("span", null, "\u25BE"),
            "\u00A0",
            props.name,
            ":"),
        "{...}",
        React__default['default'].createElement("div", { className: "printTab" }, props.children))) : (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "name", onClick: function () { return props.setIsOpen(true); } },
            React__default['default'].createElement("span", null, "\u25B8"),
            "\u00A0",
            props.name,
            ": Object\u00A0 { ..hahahahahahah.. }")));
}
function PrintArray(props) {
    return props.isOpen ? (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "name", onClick: function () { return props.setIsOpen(false); } },
            React__default['default'].createElement("span", null, "\u25BE"),
            "\u00A0",
            props.name),
        "(",
        props.value.length,
        ") [...]",
        React__default['default'].createElement("div", { className: "printTab" }, props.children))) : (React__default['default'].createElement("div", null,
        React__default['default'].createElement("div", { className: "name", onClick: function () { return props.setIsOpen(true); } },
            React__default['default'].createElement("span", null, "\u25B8"),
            props.name,
            ": Array(",
            props.value.length,
            ")\u00A0 [.",
            props.children,
            ".]")));
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
    var deepness = 0;
    var maxDeepness = 40;
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

function Group(props) {
    var direction = props.direction, ratio = props.ratio, children = props.children;
    var firstState = { direction: direction, children: children };
    var _a = React.useState(firstState), state = _a[0], setState = _a[1];
    var ref = React__default['default'].createRef();
    //??<HTMLInputElement>
    function apply_resize(id, size) {
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
    function resize(id) {
        var initialPos = props.direction
            ? // @ts-ignore
                window.event.clientY
            : // @ts-ignore
                window.event.clientX;
        var mouseMoveHandler = function (e) {
            var _a, _b;
            console.log(ref);
            var pos, ratio, size;
            if (props.direction) {
                pos = e.y;
                ratio = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.clientHeight;
            }
            else {
                pos = e.x;
                ratio = (_b = ref.current) === null || _b === void 0 ? void 0 : _b.clientWidth;
            }
            // WORK DIRECTLY WITH PIXEL GIVE PROBABLY MORE PRECISION
            size = ((pos - initialPos) / ratio) * 100;
            var margin = 10;
            var child_a_ratio = state.children[id].ratio;
            var child_b_ratio = state.children[id + 1].ratio;
            // WORK DIRECTLY WITH PIXEL GIVE PROBABLY MORE PRECISION
            // CHECK CHILDREN IN SELECTED ARBO MIN/MAX SIZE
            if (child_a_ratio + size < margin)
                apply_resize(id, margin - child_a_ratio);
            else if (child_b_ratio - size < margin)
                apply_resize(id, child_b_ratio - margin);
            else {
                apply_resize(id, size);
                initialPos = pos;
            }
        };
        var removeMouseListener = function () {
            document.removeEventListener("mousemove", mouseMoveHandler, true);
            document.removeEventListener("mouseup", removeMouseListener, true);
            document.body.style["pointer-events"] = "auto";
        };
        document.addEventListener("mousemove", mouseMoveHandler, true);
        document.addEventListener("mouseup", removeMouseListener, true);
        document.body.style["pointer-events"] = "none";
    }
    function print_children() {
        var windows = props.windows;
        var direction = state.direction, children = state.children;
        return children.map(function (el, id) {
            var child = null;
            if (el.component) {
                child = (React__default['default'].createElement(Window, { key: id * 2, direction: direction, ratio: el.ratio, component: windows[el.component] }));
            }
            else {
                child = (React__default['default'].createElement(Group, { key: id * 2, windows: windows, direction: el.direction, parentDirection: direction, ratio: el.ratio, children: el.children }));
            }
            var separator = (React__default['default'].createElement(Separator, { key: id * 2 + 1, direction: direction, id: id, callback: resize }));
            if (id + 1 < props.children.length)
                return [child, separator];
            else
                return child;
        });
    }
    return (React__default['default'].createElement("div", { ref: ref, className: "TWM_group", style: {
            flexDirection: direction ? "column" : "row",
            width: props.parentDirection ? "100%" : ratio + "%",
            height: props.parentDirection ? ratio + "%" : "100%",
        } }, print_children()));
}

//import "./twm.css";
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
