// @ts-nocheck
import React, { useState, useRef } from "react";
import Window from "./Window";
import Separator from "./Separator";

function apply_resize(id, size, state, setState) {
  setState({
    children: state.children.map((child, i) => {
      if (id === i) return { ...child, ratio: child.ratio + size };
      else if (id + 1 === i) return { ...child, ratio: child.ratio - size };
      else return { ...child };
    }),
  });
}

function print_children(props, state, resize) {
  const { windows, direction } = props;
  const { children } = state;

  return children.map((el, id) => {
    child = el.component ? (
      <Window
        key={id * 2}
        direction={direction}
        ratio={el.ratio}
        component={windows[el.component]}
      />
    ) : (
      <Group
        key={id * 2}
        windows={windows}
        direction={el.direction}
        parentDirection={direction}
        ratio={el.ratio}
        children={el.children}
      />
    );

    let separator = (
      <Separator
        key={id * 2 + 1}
        direction={direction}
        id={id}
        callback={resize}
      />
    );
    return id + 1 < children.length ? [child, separator] : child;
  });
}

class Group extends React.Component {
  constructor(props) {
    super(props);

    const { direction, ratio, children } = this.props;
    this.state = { children };

    this.resize = this.resize.bind(this);
    this.setState = this.setState.bind(this);
    this.ref = React.createRef();
  }

  resize(id) {
    let initialPos = this.props.direction
      ? window.event.clientY
      : window.event.clientX;

    let mouseMoveHandler = function (e) {
      let pos, ratio, size;

      if (this.props.direction) {
        pos = e.y;
        ratio = this.ref.current.clientHeight;
      } else {
        pos = e.x;
        ratio = this.ref.current.clientWidth;
      }

      // WORK DIRECTLY WITH PIXEL GIVE PROBABLY MORE PRECISION
      size = ((pos - initialPos) / ratio) * 100;

      let margin = 10; // PERCENT ??
      let child_a_ratio = this.state.children[id].ratio;
      let child_b_ratio = this.state.children[id + 1].ratio;

      // WORK DIRECTLY WITH PIXEL GIVE PROBABLY MORE PRECISION
      // CHECK CHILDREN IN SELECTED ARBO MIN/MAX SIZE

      if (child_a_ratio + size < margin) size = margin - child_a_ratio;
      else if (child_b_ratio - size < margin) size = child_b_ratio - margin;
      else {
        initialPos = pos;
      }
      apply_resize(id, size, this.state, this.setState);
    };

    mouseMoveHandler = mouseMoveHandler.bind(this);

    let removeMouseListener = function (e) {
      document.removeEventListener("mousemove", mouseMoveHandler, true);
      document.removeEventListener("mouseup", removeMouseListener, true);
      document.body.style["pointer-events"] = "auto";
    };
    document.addEventListener("mousemove", mouseMoveHandler, true);
    document.addEventListener("mouseup", removeMouseListener, true);
    document.body.style["pointer-events"] = "none";
  }

  render() {
    const { ratio, parentDirection, direction } = this.props;
    const { children } = this.state;

    return (
      <div
        ref={this.ref}
        className="TWM_group"
        style={{
          flexDirection: direction ? "column" : "row",
          width: parentDirection ? "100%" : ratio + "%",
          height: parentDirection ? ratio + "%" : "100%",
        }}
      >
        {print_children(this.props, this.state, this.resize)}
      </div>
    );
  }
}

export default Group;
