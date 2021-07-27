import React from "react";
import { Drawer } from "./Types";
import { PrintDictionary, PrintArray } from "./Components";
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

let defaultDrawer: Drawer = [
  {
    filter: (element) => typeof element?.value === "undefined",
    component: () => <span className={"undefined"}>undefined</span>,
  },
  {
    filter: (element) => typeof element?.value === "boolean",
    component: (props) => (
      <span className={"boolean"}>{props.value.toString()}</span>
    ),
  },
  {
    filter: (element) => typeof element?.value === "number",
    subDrawer: [
      {
        filter: (element) => isNaN(element.value),
        component: (props) => <span className={"nan"}>{props.value}</span>,
      },
      {
        component: (props) => <span className={"number"}>{props.value}</span>,
      },
    ],
  },
  {
    filter: (element) => typeof element?.value === "string",
    component: (props) => <span className={"string"}>{props.value}</span>,
  },
  {
    filter: (element) => typeof element?.value === "bigint",
    component: (props) => (
      <span className={"bigint"}>{props.value.toString()}n</span>
    ),
  },
  {
    filter: (element) => typeof element?.value === "object",
    subDrawer: [
      {
        filter: (element) => element?.value === null,
        component: () => <span className={"null"}>null</span>,
      },
      {
        filter: (element) => element?.value?.constructor === Array,
        component: (props) => <PrintArray {...props} />,
      },
      {
        filter: (element) => element?.value?.constructor === Object,
        component: (props) => <PrintDictionary {...props} />,
      },
      {
        filter: (element) => element?.value?.constructor === Buffer,
        component: () => {
          return <>ArrayBuffer</>;
        },
      },
      {
        filter: (element) => !element?.value?.constructor, // NEEDED FOR OBJECT LITERAL WITHOUT 'OBJECT CONSTRUCTOR'
        component: (props) => <PrintDictionary {...props} />,
      },
    ],
  },
  {
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
];

export { defaultDrawer };
