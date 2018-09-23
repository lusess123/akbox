import React from "react";
import * as event from "akbox/event";

event.App.GetAppEvent().on("xxxx", (a) => {
  alert(a);
});


event.App.GetAppEvent().on("demo", (b) => {
  // alert(a);
  b.forceUpdate(() => {
    alert(new Date().getMilliseconds());
  });
  b.forceUpdate(() => {
    alert(new Date().getMilliseconds());
  });
});

class Demo extends React.Component {
  render() {
    return <div>ddddd123{new Date().getMilliseconds()}
      <button onClick={() => {
        event.App.GetAppEvent().emit("demo", this);
      }}  >fff</button></div>
  }

  componentDidUpdate() {
    alert("更新了");
  }

}

const fun = () => {
  event.App.GetAppEvent().emit("xxxx", new Date());
}

export default () => {
  return <div>{new Date().toDateString()}
    <Demo></Demo>
    <button onClick={fun}>jsxx触发事件</button>
  </div>
}





