import React from "react";
import { defaultDrawer } from "./DefaultDrawer";
import { Print, Drawer, Element } from "./Types";
import "./style.scss";

// => LOOP DETECTOR ? (circulary refence, mayby use symbol ?)
// give absolute_path for filters ?

function Print(props: Print) {
  let value: any = props.value;
  let name: string = props.name ?? "";
  let drawer: Drawer = props.drawer ?? defaultDrawer;
  let maxDeepness: number = props.maxDeepness ?? 0;
  let deepness: number = 0; // accumulatore
  return (
    <div className="printer">
      {selectDrawer({
        name,
        value,
        drawer,
        deepness,
        maxDeepness,
        mainDrawer: drawer,
        selectDrawer: selectDrawer,
      })}
    </div>
  );
}

export function selectDrawer(props: Element): JSX.Element | null {
  for (let i = 0, l = props.drawer.length; i < l; i++) {
    let { filter, component, subDrawer } = props.drawer[i];

    if (!filter || filter(props)) {
      let result: JSX.Element | null = null;
      if (subDrawer) {
        result = selectDrawer({
          ...props,
          drawer: subDrawer,

          selectDrawer: selectDrawer,
        });
      }
      if ((subDrawer && result) || !subDrawer) {
        if (component)
          result = component(props, (value) =>
            selectDrawer({
              ...props,
              drawer: subDrawer ?? props.mainDrawer,
              value: value,
              selectDrawer: selectDrawer,
            })
          );
      }

      if (result) {
        return result;
      }
    }
  }
  return null;
}
export { Drawer };
export default Print;
