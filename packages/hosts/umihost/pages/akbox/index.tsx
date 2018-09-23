import React from "react";
import * as event from "akbox/event";

event.App.GetAppEvent().on("xxxx",(a)=>{
   alert(a);
});

const fun = () => {
  event.App.GetAppEvent().emit("xxxx", new Date());
}

export default () => {
  return <div>{new Date().toDateString()}
    <button onClick={fun}>触发事件</button>
  </div>
}



