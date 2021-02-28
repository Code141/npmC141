import React from "react";
import Group from "./Group";
//import "./twm.css";

function TilingWindowManager(props: any) {
  const { direction, ratio, children } = props.arbo;
  const { windows, height, width, debug } = props;
  return (
    <div
      className={debug ? "TWM TWM_debug" : "TWM"}
      style={{
        height: height || "100%",
        width: width || "100%",
      }}
    >
      <Group
        windows={windows}
        direction={direction}
        ratio={ratio}
        children={children}
      />
    </div>
  );
}

export default TilingWindowManager;
