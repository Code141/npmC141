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
      <div className={"name"}>{props.name}</div>
      <span className={"grey"}>:&nbsp;</span>
      <div className={"inline"}>{jsx}</div>
    </div>
  );
}

function PrintDictionary(props: any) {
  return props.isOpen ? (
    <div>
      <div className={"dirname"} onClick={() => props.setIsOpen(false)}>
        <span className="Pointing_Small_Triangle">&#9660;</span>
        &nbsp;{props.name}
        <span className={"grey"}>:&nbsp;</span>
        &#123;<span className="grey">&#8230;</span>&#125;
      </div>
      <div className={"printTab"}>{props.children}</div>
    </div>
  ) : (
    <div>
      <div className={"dirname"} onClick={() => props.setIsOpen(true)}>
        <span className="Pointing_Small_Triangle">&#9654;</span>
        &nbsp;{props.name}
        <span className="grey">:</span>
        &nbsp;Object &#123;
        <span className="grey">&#8230;</span>&#125;
      </div>
    </div>
  );
}

function PrintArray(props: any) {
  return props.isOpen ? (
    <div>
      <div className={"dirname"} onClick={() => props.setIsOpen(false)}>
        <span className="Pointing_Small_Triangle">&#9660;</span>
        &nbsp;{props.name}
        <span className="grey">: ({props.value.length})</span>&nbsp;[
        <span className="grey">&#8230;</span>]
      </div>
      <div className={"printTab"}>{props.children}</div>
    </div>
  ) : (
    <div>
      <div className={"dirname"} onClick={() => props.setIsOpen(true)}>
        <span className="Pointing_Small_Triangle">&#9654;</span>
        &nbsp;{props.name}
        <span className={"grey"}>:</span>&nbsp;Array
        <span className="grey">({props.value.length})</span>&nbsp;[
        <span className="grey">&#8230;</span>]
      </div>
    </div>
  );
}

export default defaultDrawer;
