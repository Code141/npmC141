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
  //@ts-ignore
  let path = [];
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
        //@ts-ignore
        currentPencil: [],
        //@ts-ignore
        path: path,
      })}
    </div>
  );
}

//INJECT KEY SOMEWHERE

export function selectDrawer(props: Element): JSX.Element | null {
  for (const key in props.drawer.pencils) {
    let { filter, component, subDrawer } = props.drawer.pencils[key];
    if (!filter || filter(props)) {
      let result: JSX.Element | null = null;

      let SUBDRAW = (newProps: any) => {
        return selectDrawer({
          ...props,
          //@ts-ignore
          currentPencil: [...props.currentPencil, key],
          drawer: subDrawer ?? props.drawer ?? props.mainDrawer,
          deepness: props.deepness + 1,
          ...newProps,
        });
      };

      if (component)
        result = component({
          ...props,
          selectDrawer: SUBDRAW,
          //@ts-ignore
          currentPencil: [...props.currentPencil, key],
        });
      else {
        if (subDrawer) {
          result = selectDrawer({
            ...props,
            //@ts-ignore
            currentPencil: [...props.currentPencil, key],
            drawer: subDrawer,
            selectDrawer: SUBDRAW,
            deepness: props.deepness + 1,
            //@ts-ignore
            path: [...props.path, `PRINT_SUB:${props.name}`],
          });
        }
      }

      //@ts-ignore

      if (result) {
        return result;
      }
    }
  }
  return null;
}
export { Drawer };
export default Print;
