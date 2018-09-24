import React from 'react'
import * as box from 'akbox/box'


export default ()=>{
  window["cccc"] = new TestDom();
     return <div>{window["cccc"].intoBox()}</div>
}

@box.view({com:(p)=>{return <h1>{p.Vm.Name}</h1>}})
class  TestDom extends box.BoxVm {
     Name = "123";
}