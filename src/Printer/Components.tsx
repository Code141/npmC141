import React, { useState } from "react";
import { previewArray, previewObject } from "./DefaultDrawer";
import "./style.scss";

/*EXPORT TO ANOTHER PLACE THE FOLDER*/

function Fold(props: any) {
  const [isOpen, setIsOpen] = useState(props.deepness < props.maxDeepness);

  return isOpen ? (
    <div className={"fold"}>
      <div className={"foldHeadLine"} onClick={() => setIsOpen(false)}>
        <span className="Pointing_Small_Triangle">&#9660;</span>
        {props.open()}
      </div>
      <div className={"printTab"}>{props.loop()}</div>
    </div>
  ) : (
    <div className={"fold"}>
      <div className={"foldHeadLine"} onClick={() => setIsOpen(true)}>
        <span className="Pointing_Small_Triangle">&#9654;</span>
        {props.close()}
      </div>
    </div>
  );
}

let name = (name: any) => <span className={"name"}>{name}</span>;

function PrintStringType(props: any) {
  return (
    <div>
      <span className={"string"}>{props.value}</span>
    </div>
  );
}

function PrintNamedStringType(props: any) {
  return (
    <div>
      {name(props.name)}
      <span className={"string"}>{props.value}</span>
    </div>
  );
}

function PrintUndefinedType() {
  return (
    <div>
      <span className={"undefined"}>undefined</span>
    </div>
  );
}

function PrintNamedUndefinedType(props: any) {
  return (
    <div>
      {name(props.name)}
      <span className={"undefined"}>undefined</span>
    </div>
  );
}

function PrintNumberType(props: any) {
  return (
    <div>
      <span className={"number"}>{props.value}</span>
    </div>
  );
}

function PrintNamedNumberType(props: any) {
  return (
    <div>
      {name(props.name)}
      <span className={"number"}>{props.value}</span>
    </div>
  );
}

function PrintBigIntType(props: any) {
  return (
    <div>
      <span className={"bigint"}>{props.value.toString()}n</span>
    </div>
  );
}

function PrintNamedBigIntType(props: any) {
  return (
    <div>
      {name(props.name)}
      <span className={"bigint"}>{props.value.toString()}n</span>
    </div>
  );
}

function PrintBooleanType(props: any) {
  return (
    <div>
      <span className={"boolean"}>{props.value ? "true" : "false"}</span>
    </div>
  );
}
function PrintNamedBooleanType(props: any) {
  return (
    <div>
      {name(props.name)}
      <span className={"boolean"}>{props.value ? "true" : "false"}</span>
    </div>
  );
}

function PrintObjectType(props: any) {
  return (
    <div>
      <span className={"object"}>{props.value}</span>
    </div>
  );
}

function PrintNamedObjectType(props: any) {
  return (
    <div>
      {name(props.name)}
      <span className={"object"}>{props.value}</span>
    </div>
  );
}

function PrintOther(props: any) {
  let type = typeof props.value;
  let jsx: any;

  if (type === "string") {
    jsx = <span className={"string"}>{props.value}</span>;
  } else if (type === "undefined") {
    jsx = <span className={"undefined"}>undefined</span>;
  } else if (type === "number") {
    jsx = <span className={"number"}>{props.value}</span>;
  } else if (type === "bigint") {
    jsx = <span className={"bigint"}>{props.value.toString()}n</span>;
  } else if (type === "boolean") {
    jsx = <span className={"boolean"}>{props.value ? "true" : "false"}</span>;
  } else if (type === "object" && props.value === null) {
    jsx = <span className={"number"}>null</span>;
  } else {
    jsx = <span className={"UNSUPORTED"}>UNSUPPORTED TYPE: {type}</span>;
  }

  return (
    <div>
      {name(props.name)}
      <div className={"inline"}>{jsx}</div>
    </div>
  );
}

function PrintDictionary(props: any) {
  let open = () => (
    <>
      {name(props.name)}
      &#123;<span className="grey">&#8230;</span>&#125;
    </>
  );

  //find way to inject MAXDEPTH = 0 HERE

  let close = () => (
    <>
      {name(props.name)}
      Object &#123;
      <span className="gluedPreview">
        {props.loop(3, previewObject)}

        {Object.entries(props.value).length > 3 ? (
          <div>
            <span className={"grey"}>&#8230;</span>
          </div>
        ) : null}
      </span>
      &#125;
    </>
  );
  return <Fold {...props} open={open} close={close} />;
}

function PrintArray(props: any) {
  let open = () => (
    <>
      {name(props.name)}
      <span className="grey">({props.value.length})</span>&nbsp;[
      <span className="grey">&#8230;</span>]
    </>
  );
  let close = () => (
    <>
      {name(props.name)}
      Array
      <span className={"grey"}>({props.value.length})</span>&nbsp;[
      <span className={"gluedPreview"}>
        {props.loop(10, previewArray)}
        {props.value.length > 10 ? (
          <div>
            <span className={"grey"}>&#8230;</span>
          </div>
        ) : null}
      </span>
      ]
    </>
  );
  return <Fold {...props} open={open} close={close} />;
}

export {
  PrintStringType,
  PrintUndefinedType,
  PrintNumberType,
  PrintBigIntType,
  PrintBooleanType,
  PrintObjectType,
  PrintNamedStringType,
  PrintNamedUndefinedType,
  PrintNamedNumberType,
  PrintNamedBigIntType,
  PrintNamedBooleanType,
  PrintNamedObjectType,
  PrintOther,
  PrintDictionary,
  PrintArray,
};
