// @ts-nocheck
import React from "react";

import "./style.scss";

function Log(props) {
  const { hms, ms, type, channel, msg, statusCode } = props;
  return (
    <p className={type}>
      <span className="time">
        {hms}.{ms}
        <strong> [{channel}] </strong>
      </span>
      <span className={"msg"}>{msg}</span>
      <span className={"statusCode"}>{statusCode}</span>
    </p>
  );
}

function render_header(list, cb) {
  return list.map((el, id) => (
    <button key={id} className={el.display ? "" : "off"} onClick={() => cb(el)}>
      {el.name} {el.display ? "" : `(${el.nb})`}
    </button>
  ));
}

function render_channels(channels, types) {
  let cb1 = (e) => {
    console.log("CLICK CHANNELS ", e);
  };
  let cb2 = (e) => {
    console.log("CLICK TYPES ", e);
  };

  let channels = (
    <div className="channels_list">
      Channels
      <div className="sep"></div>
      <button>All</button>
      <button>☠☢ 🗑</button>
      <div className="sep"></div>
      {render_header(channels, cb1)}
    </div>
  );

  let types = (
    <div className="types_list">
      {render_header(types, cb2)}
      <div className="sep"></div>
      <button className="channel">All</button>
      Types
    </div>
  );
  return [channels, types];
}

function render_list(logs) {
  let date = new Date();

  return logs.map((log, id) => {
    // WARNING  // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    // CONVERSION OF TIME IN RENDER KILL PERFORMANCE (take 40/50ms|20/40ms without)
    date.setTime(log.timestamp);
    let hms = date.toLocaleTimeString("fr-FR");
    let ms = date.getUTCMilliseconds().toString().padStart(3, "0");
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
    return (
      <Log
        key={id}
        hms={hms}
        ms={ms}
        type={log.type}
        channel={log.channel}
        msg={log.msg}
        statusCode={log.statusCode}
      />
    );
  });
}

function Logger(props) {
  return (
    <div className="log" style={{ width: props.width }}>
      <div className="header">
        {render_channels(props.channels, props.types)}
      </div>
      <div className="logList">{render_list(props.logs)}</div>
    </div>
  );
}

export default Logger as Log;
