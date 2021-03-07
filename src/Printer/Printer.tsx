import React from "react";
import DefaultDrawer from "./DefaultDrawer";
import "./style.scss";

/*
	undefined : typeof instance === "undefined"
	Boolean : typeof instance === "boolean"
	Number : typeof instance === "number"
	String : typeof instance === "string"
	BigInt : typeof instance === "bigint"
	Symbol : typeof instance === "symbol"
	*/

// create usual filters like
// shadow (don't draw the element himself but draw children)
// don't draw

// REFLECHIRE A UNE ARBORESCENCE DE DRAWER (CASCADING)

// Deporter l'appel de la LOOP dans les components

function Print(props: any) {
  // init here
  // => LOOP DETECTOR (circulary refence, mayby use symbol ?)
  // give absolute_path for filters ?
  // recursive drawer will be more efficient and beautiful to write

  let name = props.name;
  let value = props.value;
  let drawer = props.drawer ? props.drawer : DefaultDrawer;
  let deepness = 0; // accumulatore
  let maxDeepness = props.maxDeepness ? props.maxDeepness : 0;
  return (
    <div className="printer">
      {selectDrawer({ name, value, drawer, deepness, maxDeepness })}
    </div>
  );
}

function selectDrawer(props: any) {
  for (let i = 0, l = props.drawer.length; i < l; i++) {
    let e = props.drawer[i];
    if (e.filter(props)) {
      return e.Component(props, loop);
    }
  }
  // NO DRAWER FINDED. DRAW DRAWER NOT SUPPORTER OR DRAW DEFAULT DRAWER ?
}

function loop(props: any): any {
  let child = null;

  // transformer Loop en FONCTION NON REACT
  // could return info from child
  // could return total nblines

  let l: number;

  if (props.value.constructor === Array) {
    l = props.value.length;
    child = new Array(l);
    for (let i = 0; i < l; i++) {
      child[i] = selectDrawer({
        name: i,
        value: props.value[i],
        drawer: props.drawer,
        deepness: props.deepness + 1,
        maxDeepness: props.maxDeepness,
      });
    }
  } else if (props.value.constructor === Object) {
    let entries = Object.entries(props.value);
    l = entries.length;
    child = new Array(l);
    for (let i = 0; i < l; i++) {
      child[i] = selectDrawer({
        name: entries[i][0],
        value: entries[i][1],
        drawer: props.drawer,
        deepness: props.deepness + 1,
        maxDeepness: props.maxDeepness,
      });
    }
  }
  return child;
  // NO FILTER FOR THIS
  // MUST RETURN SOMETHING
  // OR AT LEST, LOG
}

export default Print;
