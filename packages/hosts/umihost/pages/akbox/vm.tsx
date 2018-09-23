import React from 'react'
import * as dom from 'akbox/dom'


export default ()=>{
  window["cccc"] = new TestDom();
     return <div>{window["cccc"].intoDom()}</div>
}

@dom.view({com:(p)=>{return <h1>{p.Vm.Name}</h1>}})
class  TestDom extends dom.DomVm {
     Name = "123";
}