import React from "react";

function Window(props: any) {
  const { direction, ratio, component } = props;
  return (
    <div
      className={"TWM_window"}
      style={{
        width: direction ? "100%" : ratio + "%",
        height: direction ? ratio + "%" : "100%",
      }}
    >
      {component}
    </div>
  );
}
export default Window;
