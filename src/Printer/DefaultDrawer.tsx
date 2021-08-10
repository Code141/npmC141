import React from "react";
import { Drawer } from "./Types";
import {
  PrintDictionary,
  PrintArray,
  DrawerDebug,
  Pencils,
} from "./Components";
import "./style.scss";
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

const defaultDrawer: Drawer = {
  drawerName: "Built-in",
  pencils: {
    Undefined: {
      filter: (element) => typeof element?.value === "undefined",
      component: () => <span className={"undefined"}>undefined</span>,
    },
    Boolean: {
      filter: (element) => typeof element?.value === "boolean",
      component: (props) => (
        <span className={"boolean"}>{props.value.toString()}</span>
      ),
    },
    Number: {
      filter: (element) => typeof element?.value === "number",
      component: (props) =>
        isNaN(props.value) ? (
          <span className={"nan"}>{props.value}</span>
        ) : (
          <span className={"number"}>{props.value}</span>
        ),
    },
    String: {
      filter: (element) => typeof element?.value === "string",
      component: (props) => <span className={"string"}>{props.value}</span>,
    },
    BigInt: {
      filter: (element) => typeof element?.value === "bigint",
      component: (props) => (
        <span className={"bigint"}>{props.value.toString()}n</span>
      ),
    },
    Object: {
      filter: (element) => typeof element?.value === "object",
      subDrawer: {
        drawerName: "Constructor",
        pencils: {
          Null: {
            filter: (element) => element?.value === null,
            component: () => <span className={"null"}>null</span>,
          },
          Array: {
            filter: (element) => element?.value?.constructor === Array,
            component: (props) => <PrintArray {...props} />,
          },
          Object: {
            filter: (element) => element?.value?.constructor === Object,
            component: (props) => <PrintDictionary {...props} />,
          },
          Buffer: {
            filter: (element) => element?.value?.constructor === Buffer,
            component: () => {
              return <>ArrayBuffer</>;
            },
          },
          Literal: {
            filter: (element) => !element?.value?.constructor, // NEEDED FOR OBJECT LITERAL WITHOUT 'OBJECT CONSTRUCTOR'
            component: (props) => <PrintDictionary {...props} />,
          },
        },
      },
    },
    Function: {
      filter: (element) => typeof element?.value === "function",
      component: () => (
        <span className="function">
          function <span className="grey">∫()</span>
        </span>
      ),
    },
    UNSUPORTED: {
      component: (props) => {
        console.log("PRINTER UNSUPORTED VALUE", props);
        if (!props?.value?.constructor?.name) console.log(props.value);
        return (
          <div className="UNSUPORTED">
            UNSUPORTED VALUE: {typeof props.value}{" "}
            {props?.value?.constructor?.name}
          </div>
        );
      },
    },
  },
};

const debugDrawer: Drawer = {
  drawerName: "Drawer Draw",
  pencils: {
    pencils: {
      filter: (element) =>
        element?.value?.constructor === Object && element.name === "pencils",
      component: (props) => <Pencils {...props} />,
    },
    drawer: {
      filter: (element) => element?.value?.constructor === Object,
      component: (props) => <DrawerDebug {...props} />,
    },
  },
};

export { defaultDrawer, debugDrawer };
