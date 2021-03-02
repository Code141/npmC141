// @ts-nocheck
import React, { useState, useRef } from "react";

import Window from "./Window";
import Separator from "./Separator";

class Group extends React.Component {
  constructor(props) {
    super(props);

    const { direction, ratio, children } = this.props;
    this.state = { direction, children };

    this.resize = this.resize.bind(this);
    this.ref = React.createRef();
  }

  apply_resize(id, size) {
    this.setState({
      children: this.state.children.map((child, i) => {
        if (id === i) return { ...child, ratio: child.ratio + size };
        else if (id + 1 === i) return { ...child, ratio: child.ratio - size };
        else return { ...child };
      }),
    });
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

      let margin = 10;
      let child_a_ratio = this.state.children[id].ratio;
      let child_b_ratio = this.state.children[id + 1].ratio;

      // WORK DIRECTLY WITH PIXEL GIVE PROBABLY MORE PRECISION
      // CHECK CHILDREN IN SELECTED ARBO MIN/MAX SIZE

      if (child_a_ratio + size < margin)
        this.apply_resize(id, margin - child_a_ratio);
      else if (child_b_ratio - size < margin)
        this.apply_resize(id, child_b_ratio - margin);
      else {
        this.apply_resize(id, size);
        initialPos = pos;
      }
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

  print_children() {
    const { windows } = this.props;
    const { direction, children } = this.state;

    return children.map((el, id) => {
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
          callback={this.resize}
        />
      );

      if (id + 1 < this.props.children.length) return [child, separator];
      else return child;
    });
  }
  render() {
    const { ratio, parentDirection } = this.props;
    const { direction, children } = this.state;

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
        {this.print_children()}
      </div>
    );
  }
}
export default Group;
