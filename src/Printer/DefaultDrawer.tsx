import React from "react";
import "./style.scss";

let defaultDrawer = [
  {
    filter: (element: any) => element.value.constructor === Array,
    Component: PrintArray,
  },
  {
    filter: (element: any) => element.value.constructor === Object,
    Component: PrintDictionary,
  },
  {
    filter: () => true,
    Component: PrintOther,
  },
];

function PrintOther(props: any) {
  let type = typeof props.value;
  let jsx: any;

  if (type === "string") {
    jsx = <span className={"string"}>"{props.value}"</span>;
  } else if (type === "number") {
    jsx = <span className={"number"}>{props.value}</span>;
  } else if (type === "boolean") {
    jsx = <span className={"boolean"}>{props.value ? "true" : "false"}</span>;
  } else {
    jsx = <span className={"UNSUPPORTED"}>UNSUPORTED</span>;
    console.error("UNSUPPORTED");
    console.error(props.value);
  }

  // PADD RIGHT TO COMPENS ARROW OF OTHER PROPS
  // AND SPAN HEIGT= 17
  // BUT DIV HEIGT=21

  return (
    <div>
      <div className={"name"}>{props.name}</div>:&nbsp;
      <div className={"inline"}>{jsx}</div>
    </div>
  );
}

function PrintDictionary(props: any) {
  return props.isOpen ? (
    <div>
      <div className={"name"} onClick={() => props.setIsOpen(false)}>
        <span>&#9662;</span>
        &nbsp;{props.name}:
      </div>
      &#123;...&#125;
      <div className={"printTab"}>{props.children}</div>
    </div>
  ) : (
    <div>
      <div className={"name"} onClick={() => props.setIsOpen(true)}>
        <span>&#9656;</span>
        &nbsp;{props.name}: Object&nbsp; &#123; ..hahahahahahah.. &#125;
      </div>
    </div>
  );
}

function PrintArray(props: any) {
  return props.isOpen ? (
    <div>
      <div className={"name"} onClick={() => props.setIsOpen(false)}>
        <span>&#9662;</span>
        &nbsp;{props.name}
      </div>
      ({props.value.length}) [...]
      <div className={"printTab"}>{props.children}</div>
    </div>
  ) : (
    <div>
      <div className={"name"} onClick={() => props.setIsOpen(true)}>
        <span>&#9656;</span>
        {props.name}: Array({props.value.length})&nbsp; [.{props.children}.]
      </div>
    </div>
  );
}

export default defaultDrawer;
