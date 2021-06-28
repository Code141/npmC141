import React, { useState } from "react";
import { defaultDrawer } from "./DefaultDrawer";
import "./style.scss";
import { selectDrawer } from "./Printer";

let name = (name: string) => <span className={"name"}>{name}</span>;

function Fold(props: any) {
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

function PrintDictionary(props: any) {
  if (props.maxDeepness === -1)
    return (
      <>
        &#123;<span className="grey">&#8230;</span>&#125;
      </>
    );

  let open = () => (
    <>
      {name(props.name)}
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
        <div>
          {typeof entries[i][1] !== "object" && name(entries[i][0])}
          {entries[i][1] === null && name(entries[i][0])}
          {selectDrawer({
            name: entries[i][0],
            value: entries[i][1],
            drawer: defaultDrawer,
            deepness: props.deepness + 1,
            maxDeepness: maxDeepness,
          })}
        </div>
      );
    }

    return (
      <>
        {name(props.name)}
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
      child[i] = (
        <div>
          {typeof entries[i][1] !== "object" && name(entries[i][0])}
          {entries[i][1] === null && name(entries[i][0])}
          {selectDrawer({
            name: entries[i][0],
            value: entries[i][1],
            drawer: defaultDrawer,
            deepness: props.deepness + 1,
            maxDeepness: props.maxDeepness,
          })}
        </div>
      );
    }
    return child;
  };
  return <Fold {...props} open={open} close={close} body={body} />;
}

function PrintArray(props: any) {
  if (props.maxDeepness === -1)
    return (
      <>
        [<span className="grey">&#8230;</span>]
      </>
    );
  let open = () => (
    <>
      {name(props.name)}
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
        <div>
          {selectDrawer({
            name: i.toString(),
            value: props.value[i],
            drawer: defaultDrawer,
            deepness: props.deepness + 1,
            maxDeepness: maxDeepness,
          })}
        </div>
      );
    }

    return (
      <>
        {name(props.name)}
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
      child[i] = (
        <div>
          {typeof props.value[i] !== "object" && name(i.toString())}
          {props.value[i] === null && name(i.toString())}
          {selectDrawer({
            name: i.toString(),
            value: props.value[i],
            drawer: defaultDrawer,
            deepness: props.deepness + 1,
            maxDeepness: props.maxDeepness,
          })}
        </div>
      );
    }
    return child;
  };
  return <Fold {...props} open={open} close={close} body={body} />;
}

export { PrintDictionary, PrintArray };
