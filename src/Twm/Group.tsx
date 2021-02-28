import React, { useState } from "react";

import Window from "./Window";
import Separator from "./Separator";

function Group(props: any) {
  const { direction, ratio, children } = props;
  const firstState: any = { direction, children };

  const [state, setState] = useState(firstState);

  let ref: any = React.createRef();
  //??<HTMLInputElement>

  function apply_resize(id: any, size: any) {
    setState({
      children: state.children.map((child: any, i: any) => {
        if (id === i) return { ...child, ratio: child.ratio + size };
        else if (id + 1 === i) return { ...child, ratio: child.ratio - size };
        else return { ...child };
      }),
    });
  }

  function resize(id: any) {
    let initialPos = props.direction
      ? // @ts-ignore
        window.event.clientY
      : // @ts-ignore
        window.event.clientX;

    let mouseMoveHandler = function (e: any) {
      console.log(ref);
      let pos, ratio, size;

      if (props.direction) {
        pos = e.y;
        ratio = ref.current?.clientHeight;
      } else {
        pos = e.x;
        ratio = ref.current?.clientWidth;
      }

      // WORK DIRECTLY WITH PIXEL GIVE PROBABLY MORE PRECISION
      size = ((pos - initialPos) / ratio) * 100;

      let margin = 10;
      let child_a_ratio = state.children[id].ratio;
      let child_b_ratio = state.children[id + 1].ratio;

      // WORK DIRECTLY WITH PIXEL GIVE PROBABLY MORE PRECISION
      // CHECK CHILDREN IN SELECTED ARBO MIN/MAX SIZE

      if (child_a_ratio + size < margin)
        apply_resize(id, margin - child_a_ratio);
      else if (child_b_ratio - size < margin)
        apply_resize(id, child_b_ratio - margin);
      else {
        apply_resize(id, size);
        initialPos = pos;
      }
    };

    let removeMouseListener = function () {
      document.removeEventListener("mousemove", mouseMoveHandler, true);
      document.removeEventListener("mouseup", removeMouseListener, true);
      document.body.style["pointer-events"] = "auto";
    };
    document.addEventListener("mousemove", mouseMoveHandler, true);
    document.addEventListener("mouseup", removeMouseListener, true);
    document.body.style["pointer-events"] = "none";
  }

  function print_children() {
    const { windows } = props;
    const { direction, children } = state;

    return children.map((el: any, id: any) => {
      let child = null;

      if (el.component) {
        child = (
          <Window
            key={id * 2}
            direction={direction}
            ratio={el.ratio}
            component={windows[el.component]}
          />
        );
      } else {
        child = (
          <Group
            key={id * 2}
            windows={windows}
            direction={el.direction}
            parentDirection={direction}
            ratio={el.ratio}
            children={el.children}
          />
        );
      }

      let separator = (
        <Separator
          key={id * 2 + 1}
          direction={direction}
          id={id}
          callback={resize}
        />
      );

      if (id + 1 < props.children.length) return [child, separator];
      else return child;
    });
  }

  return (
    <div
      ref={ref}
      className="TWM_group"
      style={{
        flexDirection: direction ? "column" : "row",
        width: props.parentDirection ? "100%" : ratio + "%",
        height: props.parentDirection ? ratio + "%" : "100%",
      }}
    >
      {print_children()}
    </div>
  );
}
export default Group;
