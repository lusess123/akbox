import React from 'React'
import { BoxReact, BoxVm, IBoxVmConfig, BoxProps ,view} from "akbox/dom";
import * as AddTodo from './AddTodoDom'
import * as Footer from './FooterDom'
import * as Todo from './TodoDom'



export class AppBoxReact extends BoxReact<AppBoxProps> {

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

export interface IReactAppBoxVm extends BoxVm {
    AddTodoObj: AddTodo.AddTodoBoxVm;
    FooterObj: Footer.FooterBoxVm;
    //TodoObjList: TodoDomFile.TodoDom.TodoDomVm[];
    btnStatusTitle: string;
    toList(): Todo.TodoBoxVm[];
}

export interface IAppBoxConfig extends IBoxVmConfig {

}
@view({com:AppBoxReact})
export class AppBoxVm extends BoxVm implements IReactAppBoxVm {
    //public ReactType = AppDomReact;
    public AddTodoObj: AddTodo.AddTodoBoxVm;
    public FooterObj: Footer.FooterBoxVm;
    public TodoObjList: Todo.TodoBoxVm[] = [];
    public btnStatusTitle: string = "SHOW_ALL";

    public constructor(config?: IAppBoxConfig) {
        super(config);
        this.AddTodoObj = new AddTodo.AddTodoBoxVm({ UniId: this.UniId, Text: "新增" });
        this.FooterObj = new Footer.FooterBoxVm({ UniId: this.UniId, Filter: this.btnStatusTitle });
        this.TodoObjList = [1, 2, 3].map((index) => {
            return new Todo.TodoBoxVm({ Text: "文本" + index, UniId: this.UniId });
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
        this.TodoObjList.push(new Todo.TodoBoxVm({ Text: text, UniId: this.UniId }));
        this.forceUpdate("");
    }

    public toList(): Todo.TodoBoxVm[] {
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
export class AppBoxProps extends BoxProps<IReactAppBoxVm>{
}






