//@ts-nocheck
import React, { useState } from "react";
import "./style.scss";
import { Element } from "./Types";

let printName = (name: string) => <span className={"name"}>{name}</span>;

interface FoldProps extends Element {
  open: () => JSX.Element;
  close: () => JSX.Element;
  body: () => JSX.Element;
}

export function Fold(props: FoldProps) {
  const [isOpen, setIsOpen] = useState(props.deepness < props.maxDeepness);
  return isOpen ? (
    <div className={"fold"}>
      <div className={"foldHeadLine"} onClick={() => setIsOpen(false)}>
        <span className="Pointing_Small_Triangle">&#9660;</span>
        {props.open()}
      </div>
      <div className={"printTab"}>{props.body()}</div>
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

function PrintDictionary(props: Element) {
  if (props.maxDeepness === -1)
    return (
      <>
        &#123;<span className="grey">&#8230;</span>&#125;
      </>
    );

  let open = () => (
    <>
      {printName(props.name)}
      &#123;<span className="grey">&#8230;</span>&#125;
    </>
  );

  let close = () => {
    let maxChild = 3;
    let maxDeepness = -1;
    let entries = Object.entries(props.value);
    let l: number = maxChild < entries.length ? maxChild : entries.length;
    let child: JSX.Element[] = new Array(l);

    for (let i = 0; i < l; i++) {
      child[i] = (
        <div key={i}>
          {typeof entries[i][1] !== "object" && printName(entries[i][0])}
          {entries[i][1] === null && printName(entries[i][0])}
          {props.selectDrawer({
            ...props,
            name: entries[i][0],
            value: entries[i][1],
            drawer: props.mainDrawer,
            deepness: props.deepness + 1,
            maxDeepness: maxDeepness,
          } as Element)}
        </div>
      );
    }

    return (
      <>
        {printName(props.name)}
        Object &#123;
        <span className="gluedPreview">
          {child}
          {Object.entries(props.value).length > 3 ? (
            <div>
              <span className={"grey"}>&#8230;</span>
            </div>
          ) : null}
        </span>
        &#125;
      </>
    );
  };

  let body = () => {
    let entries = Object.entries(props.value);
    let l: number = entries.length;
    let child = new Array(l);
    for (let i = 0; i < l; i++) {
      let name = null;

      let result = props.selectDrawer({
        ...props,
        name: entries[i][0],
        value: entries[i][1],
        drawer: props.mainDrawer,
        deepness: props.deepness + 1,
        maxDeepness: props.maxDeepness,
      });

      if (
        //@ts-ignore
        result.type.name !== "PrintArray" &&
        //@ts-ignore
        result.type.name !== "PrintDictionary"
      )
        name = printName(entries[i][0].toString());

      child[i] = (
        <div key={i}>
          {name}
          {result}
        </div>
      );
    }
    return child;
  };
  return <Fold {...props} open={open} close={close} body={body} />;
}

function PrintArray(props: Element) {
  if (props.maxDeepness === -1)
    return (
      <>
        [<span className="grey">&#8230;</span>]
      </>
    );
  let open = () => (
    <>
      {printName(props.name)}
      <span className="grey">({props.value.length})</span>&nbsp;[
      <span className="grey">&#8230;</span>]
    </>
  );

  let close = () => {
    let maxChild = 3;
    let maxDeepness = -1;
    let l: number =
      maxChild < props.value?.length ? maxChild : props.value?.length;
    let child: JSX.Element[] = new Array(l);
    for (let i = 0; i < l; i++) {
      child[i] = (
        <div key={i}>
          {props.selectDrawer({
            ...props,
            name: i.toString(),
            value: props.value[i],

            drawer: props.mainDrawer,
            deepness: props.deepness + 1,
            maxDeepness: maxDeepness,
          })}
        </div>
      );
    }

    return (
      <>
        {printName(props.name)}
        Array
        <span className={"grey"}>({props.value.length})</span>&nbsp;[
        <span className={"gluedPreview"}>
          {child}
          {props.value.length > maxChild ? (
            <div>
              <span className={"grey"}>&#8230;</span>
            </div>
          ) : null}
        </span>
        ]
      </>
    );
  };

  let body = () => {
    let l: number = props.value?.length;
    let child = new Array(l);

    for (let i = 0; i < l; i++) {
      let name = null;
      let result = props.selectDrawer({
        ...props,
        name: i.toString(),
        value: props.value[i],
        drawer: props.mainDrawer,

        deepness: props.deepness + 1,
        maxDeepness: props.maxDeepness,
      });

      if (
        //@ts-ignore
        result.type.name !== "PrintArray" &&
        //@ts-ignore
        result.type.name !== "PrintDictionary"
      )
        name = printName(i.toString());

      child[i] = (
        <div key={i}>
          {name}
          {result}
        </div>
      );
    }
    return child;
  };
  return <Fold {...props} open={open} close={close} body={body} />;
}

export const DrawerDebug = (props: any) => {
  let entries = Object.entries(props.value);
  let l: number = entries.length;
  let child = new Array(l);
  for (let i = 0; i < l; i++) {
    let name = null;
    let result = props.selectDrawer({
      ...props,
      name: entries[i][0],
      value: entries[i][1],
      drawer: props.mainDrawer,
      mainDrawer: props.mainDrawer,
      deepness: props.deepness + 1,
      maxDeepness: props.maxDeepness,
    });
    child[i] = (
      <div key={i}>
        <h3 style={{ width: "none", display: "inline-block", margin: "0px" }}>
          <span className={"name"}>{entries[i][0].toString()}</span>
        </h3>
        {result}
      </div>
    );
  }
  return (
    <div
      style={{
        paddingLeft: "10px",
      }}
    >
      <h2 style={{ margin: "5px 0px", color: "#b98eff" }}>
        {props.value.drawerName}
      </h2>
      {props.selectDrawer({
        ...props,
        name: "pencils",
        value: props.value.pencils,
        drawer: props.mainDrawer,
        mainDrawer: props.mainDrawer,
        deepness: props.deepness + 1,
        maxDeepness: props.maxDeepness,
      })}
    </div>
  );
};
export const Pencils = (props: any) => {
  let entries = Object.entries(props.value);
  let l: number = entries.length;
  let child = new Array(l);
  for (let i = 0; i < l; i++) {
    let pencil = entries[i][1];
    let name = null;
    child[i] = (
      <div key={i} style={{ width: "300px" }}>
        <h3
          style={{
            display: "inline-block",
            margin: "0px 2px",
          }}
        >
          {entries[i][0].toString()}
        </h3>
        {
          //@ts-ignore
          !pencil.subDrawer && !pencil.component && (
            <div
              className="badge"
              style={{ fontSize: "9px", padding: "0px 4px", margin: "0px 2px" }}
            >
              <span style={{ color: "red" }}>NO COMPONENT</span>
            </div>
          )
        }

        {
          //@ts-ignore
          pencil.subDrawer && !pencil.component && (
            <div
              className="badge"
              style={{ fontSize: "9px", padding: "0px 4px", margin: "0px 2px" }}
            >
              <span>Group</span>
            </div>
          )
        }
        {
          //@ts-ignore
          pencil.subDrawer && pencil.component && (
            <div
              className="badge"
              style={{ fontSize: "9px", padding: "0px 4px", margin: "0px 2px" }}
            >
              <span style={{ color: "chocolate" }}>Wrapper</span>
            </div>
          )
        }

        {
          //@ts-ignore
          !pencil.filter && (
            <div
              className="badge"
              style={{ fontSize: "9px", padding: "0px 4px", margin: "0px 2px" }}
            >
              <span style={{ color: "red" }}>DEAD-END</span>
            </div>
          )
        }
        {
          //@ts-ignore
          pencil.subDrawer ? (
            <div style={{ paddingLeft: "10px", borderLeftStyle: "solid" }}>
              {props.selectDrawer({
                ...props,
                name: entries[i][0],
                //@ts-ignore
                value: entries[i][1].subDrawer,
                deepness: props.deepness + 1,
                maxDeepness: props.maxDeepness,
              })}
            </div>
          ) : null
        }
      </div>
    );
  }
  return <div>{child}</div>;
};
export { PrintDictionary, PrintArray };
