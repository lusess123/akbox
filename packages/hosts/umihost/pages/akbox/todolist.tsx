import * as Todolist from 'akbox-demo/todolist'
import React from 'React'

export default class TodoListDemo extends React.Component {

  private fTodolist = new Todolist.AppDomVm();
  constructor(p) {
    super(p);
    window["xxxx"] = this.fTodolist;
  }
  render() {
    
    return <div>{this.fTodolist.intoDom()}</div>
  }
}