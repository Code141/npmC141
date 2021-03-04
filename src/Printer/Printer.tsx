import React, { useState } from "react";
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

function Print(props: any) {
  // init here
  // => LOOP DETECTOR (circulary refence, mayby use symbol ?)
  // give absolute_path for filters ?
  // recursive drawer will be more efficient and beautiful to write

  let name = props.name;
  let value = props.value;
  let drawer = props.drawer ? props.drawer : DefaultDrawer;
  let deepness = 0;
  let maxDeepness = 40;

  return (
    <div className="printer">
      {
        <Loop
          name={name}
          value={value}
          drawer={drawer}
          deepness={deepness}
          maxDeepness={maxDeepness}
        />
      }
    </div>
  );
}

function Loop(props: any): any {
  const [isOpen, setIsOpen] = useState(props.deepness < props.maxDeepness);
  let child = null;

  // transformer Loop en FONCTION NON REACT
  // could return info from child
  // could return total nblines

  let l: number;
  let maxDeepness = isOpen ? props.maxDeepness : 0;
  if (props.value.constructor === Array) {
    l = props.value.length;
    if (!isOpen && l >= 3) l = 3;
    child = new Array(l);
    for (let i = 0; i < l; i++) {
      child[i] = (
        <Loop
          name={i}
          value={props.value[i]}
          drawer={props.drawer}
          deepness={props.deepness + 1}
          maxDeepness={maxDeepness}
        />
      );
    }
  } else if (props.value.constructor === Object) {
    let entries = Object.entries(props.value);
    l = entries.length;
    if (!isOpen && l >= 3) l = 3;
    child = new Array(l);
    for (let i = 0; i < l; i++) {
      child[i] = (
        <Loop
          name={entries[i][0]}
          value={entries[i][1]}
          drawer={props.drawer}
          deepness={props.deepness + 1}
          maxDeepness={maxDeepness}
        />
      );
    }
  }

  for (let i = 0, l = props.drawer.length; i < l; i++) {
    let e = props.drawer[i];
    if (e.filter(props)) {
      let Component = e.Component;
      return (
        <Component
          name={props.name}
          value={props.value}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          {child}
        </Component>
      );
    }
  }
  // NO FILTER FOR THIS
  // MUST RETURN SOMETHING
  // OR AT LEST, LOG
}

export default Print;
