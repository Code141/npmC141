import React from "react";
import { defaultDrawer } from "./DefaultDrawer";
import "./style.scss";

interface Print {
  value: any;
  name?: string;
  drawer?: any;
  maxDeepness?: number;
}

function Print(props: Print) {
  // init here
  // => LOOP DETECTOR (circulary refence, mayby use symbol ?)
  // give absolute_path for filters ?
  // recursive drawer will be more efficient and beautiful to write

  let value = props.value;
  let name = props.name ?? "";
  let drawer = props.drawer ? props.drawer : defaultDrawer;
  let maxDeepness = props.maxDeepness ? props.maxDeepness : 0;

  let deepness = 0; // accumulatore
  return (
    <div className="printer">
      {selectDrawer({ name, value, drawer, deepness, maxDeepness })}
    </div>
  );
}

// Mozilla sort A-Z objects Keys when foldOPEN
// create usual filters like
// shadow (don't draw the element himself but draw children)
// don't draw

// REFLECHIRE A UNE ARBORESCENCE DE DRAWER (CASCADING)

// Deporter l'appel de la LOOP dans les components
// at the end, rename in PRINT and set default value inside
function selectDrawer(props: any) {
  for (let i = 0, l = props.drawer.length; i < l; i++) {
    let { filter, Component } = props.drawer[i];
    if (filter(props)) {
      // SUBDRAWER

      return Component(props, (maxChild: any, drawerOverride: any) =>
        loop(props, maxChild, drawerOverride)
      );
    }
  }

  for (let i = 0, l = defaultDrawer.length; i < l; i++) {
    let { filter, Component } = defaultDrawer[i];
    if (filter(props)) {
      // SUBDRAWER

      return Component(props, (maxChild: any, drawerOverride: any) =>
        loop(props, maxChild, drawerOverride)
      );
    }
  }

  // NO DRAWER FINDED. IF DEBUG ON
  // TRY WITH DEFAULT DRAWER WRAPPED IN RED DIV ALERT
}

function loop(props: any, maxChild: any, drawerOverride: any): any {
  let maxDeepness = props.maxDeepness;
  let drawer: any = drawerOverride ? drawerOverride : props.drawer;
  let child = null;
  let l: number;

  if (props.value?.constructor === Array) {
    l = props.value?.length;
    if (maxChild) {
      l = maxChild < l ? maxChild : l;
      maxDeepness = 0;
    }

    child = new Array(l);
    for (let i = 0; i < l; i++) {
      child[i] = selectDrawer({
        name: i,
        value: props.value[i],
        drawer: drawer,
        deepness: props.deepness + 1,
        maxDeepness: maxDeepness,
      });
    }
  } else if (props.value?.constructor === Object) {
    let entries = Object.entries(props.value);
    l = entries.length;

    if (maxChild) {
      l = maxChild < l ? maxChild : l;
      maxDeepness = 0;
    }
    child = new Array(l);
    l = maxChild ? (maxChild < l ? maxChild : l) : l;
    for (let i = 0; i < l; i++) {
      child[i] = selectDrawer({
        name: entries[i][0],
        value: entries[i][1],
        drawer: drawer,
        deepness: props.deepness + 1,
        maxDeepness: maxDeepness,
      });
    }
  }
  return child;
  // NO FILTER FOR THIS
  // MUST RETURN SOMETHING
  // OR AT LEST, LOG
}

export default Print;
