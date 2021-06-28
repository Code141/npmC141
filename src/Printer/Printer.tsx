import React from "react";
import { defaultDrawer } from "./DefaultDrawer";
import { Print, Drawer, Element } from "./Types";
import "./style.scss";

// => LOOP DETECTOR ? (circulary refence, mayby use symbol ?)
// give absolute_path for filters ?

function Print(props: Print) {
  let value: any = props.value;
  let name: string = props.name ?? "";
  let drawer: Drawer = props.drawer ? props.drawer : defaultDrawer;
  let maxDeepness: number = props.maxDeepness ? props.maxDeepness : 0;
  let deepness: number = 0; // accumulatore
  return (
    <div className="printer">
      {selectDrawer({ name, value, drawer, deepness, maxDeepness })}
    </div>
  );
}

export function selectDrawer(props: Element): JSX.Element {
  for (let i = 0, l = props.drawer.length; i < l; i++) {
    let { filter, Component, subDrawer } = props.drawer[i];
    if (filter(props)) {
      let result: JSX.Element | null = null;
      if (Component) result = Component(props);
      else if (subDrawer)
        result = selectDrawer({ ...props, drawer: subDrawer });
      if (result) return result;
    }
  }
  console.error("PRINTER UNSUPORTED VALUE", props);
  return (
    <div className="UNSUPORTED">
      UNSUPORTED VALUE: {typeof props.value} {props.value.constructor.name}
    </div>
  );
}

export default Print;
