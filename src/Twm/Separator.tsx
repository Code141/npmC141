// @ts-nocheck
import React from "react";

function Separator(props: any) {
  return (
    <div className={props.direction ? "TWM_separator_h" : "TWM_separator_v"}>
      <div onMouseDown={() => props.callback(props.id)}></div>
    </div>
  );
}

export default Separator;
