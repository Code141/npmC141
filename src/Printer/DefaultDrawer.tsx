import React from "react";
import {
  PrintStringType,
  PrintNumberType,
  PrintBooleanType,
  PrintNamedStringType,
  PrintNamedNumberType,
  PrintNamedBooleanType,
  PrintOther,
  PrintDictionary,
  PrintArray,
} from "./Components";
import "./style.scss";

let defaultDrawer = [
  {
    filter: (element: any) => element.value.constructor === Array,
    Component: (props: any, loop: any) => <PrintArray {...props} loop={loop} />,
  },
  {
    filter: (element: any) => element.value.constructor === Object,
    Component: (props: any, loop: any) => (
      <PrintDictionary {...props} loop={loop} />
    ),
  },
  {
    filter: () => true,
    Component: (props: any, loop: any) => <PrintOther {...props} loop={loop} />,
  },
];

let previewArray = [
  {
    filter: (element: any) => typeof element.value === "string",
    Component: (props: any) => <PrintStringType value={props.value} />,
  },
  {
    filter: (element: any) => typeof element.value === "number",
    Component: (props: any) => <PrintNumberType value={props.value} />,
  },
  {
    filter: (element: any) => typeof element.value === "boolean",
    Component: (props: any) => <PrintBooleanType value={props.value} />,
  },
  {
    filter: (element: any) => typeof element.value === "object",
    Component: () => (
      <div>
        &#123;<span className="grey">&#8230;</span>&#125;
      </div>
    ),
  },
];

let previewObject = [
  {
    filter: (element: any) => typeof element.value === "string",
    Component: (props: any) => (
      <PrintNamedStringType value={props.value} name={props.name} />
    ),
  },
  {
    filter: (element: any) => typeof element.value === "number",
    Component: (props: any) => (
      <PrintNamedNumberType value={props.value} name={props.name} />
    ),
  },
  {
    filter: (element: any) => typeof element.value === "boolean",
    Component: (props: any) => (
      <PrintNamedBooleanType value={props.value} name={props.name} />
    ),
  },
  {
    filter: (element: any) => typeof element.value === "object",
    Component: (props: any) => (
      <div>
        <span className={"name"}>{props.name}</span>
        <span>
          &#123;<span className="grey">&#8230;</span>&#125;
        </span>
      </div>
    ),
  },
];

export { defaultDrawer, previewArray, previewObject };
