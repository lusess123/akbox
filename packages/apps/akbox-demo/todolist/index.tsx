import React from 'React'
import { DomReact, DomVm, IDomVmConfig, DomProps ,view} from "akbox/dom";
import * as AddTodo from './AddTodoDom'
import * as Footer from './FooterDom'
import * as Todo from './TodoDom'

export class AppDomReact extends DomReact<AppDomProps> {

    public pSender(): React.ReactElement<any> {
        return <div>
            <button onClick={() => { }}>{this.Vm.btnStatusTitle}</button>
            {this._tDom(this.Vm.AddTodoObj)}
            <ul className="Hz-scroll" style={{ "maxHeight": "20rem", "overflowY": "auto" }}>{
                this.Vm.toList().map(
                        a => {
                            return this._tDom(a);
                        })}</ul>
            {this._tDom(this.Vm.FooterObj)}
        </div>;
    }
   
}

export interface IReactAppDomVm extends DomVm {
    AddTodoObj: AddTodo.AddTodoDomVm;
    FooterObj: Footer.FooterDomVm;
    //TodoObjList: TodoDomFile.TodoDom.TodoDomVm[];
    btnStatusTitle: string;
    toList(): Todo.TodoDomVm[];
}

export interface IAppDomConfig extends IDomVmConfig {

}
@view({com:AppDomReact})
export class AppDomVm extends DomVm implements IReactAppDomVm {
    //public ReactType = AppDomReact;
    public AddTodoObj: AddTodo.AddTodoDomVm;
    public FooterObj: Footer.FooterDomVm;
    public TodoObjList: Todo.TodoDomVm[] = [];
    public btnStatusTitle: string = "SHOW_ALL";

    public constructor(config?: IAppDomConfig) {
        super(config);
        this.AddTodoObj = new AddTodo.AddTodoDomVm({ UniId: this.UniId, Text: "新增" });
        this.FooterObj = new Footer.FooterDomVm({ UniId: this.UniId, Filter: this.btnStatusTitle });
        this.TodoObjList = [1, 2, 3].map((index) => {
            return new Todo.TodoDomVm({ Text: "文本" + index, UniId: this.UniId });
        });

        this.listenAppEvent("AddTodoDomVm-add", this.UniId, (text: string) => {
            this.add(text);
        });
        this.listenAppEvent("complete", this.UniId, () => {
            this.forceUpdate("");
        });

        this.listenAppEvent("Filter-Click", this.UniId, (filter: string) => {
            this.btnStatusTitle = filter;
            this.forceUpdate("");
        });
    }

    public add(text: string) {
        this.TodoObjList.push(new Todo.TodoDomVm({ Text: text, UniId: this.UniId }));
        this.forceUpdate("");
    }

    public toList(): Todo.TodoDomVm[] {
        return this.TodoObjList.filter(item => {
            item.IsChange = true;
            switch (this.btnStatusTitle) {
                case "SHOW_COMPLETED":
                    return item.Completed;
                case "SHOW_ACTIVE":
                    return !item.Completed;
                default:
                    return true;
            }
        });

    }

}
export class AppDomProps extends DomProps<IReactAppDomVm>{
}






