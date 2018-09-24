
import React from 'React'
import { BoxReact, Box, IBoxConfig, BoxProps } from "akbox/box";
import jQuery  from 'jquery'
const $ = jQuery;
export class AddTodoBoxReact extends BoxReact<AddTodoBoxProps>  {


    public pSender(): React.ReactNode {
        return <div>
            <input type='text'
                value={this.props.Vm.Text}
                onChange={(e) => {
                    // props.onChangeText($(e.target).val())
                    this.props.Vm.Text = $(e.target).val() as any;
                    this.forceUpdate();

                }} />
            <button onClick={() => { this.props.Vm.add(); }}>
                Add
        </button>
        </div>;
    }



}

export interface IReactAddTodoBoxVm extends Box {
    Text: string;
    add();
}

export interface IAddTodoBoxConfig extends IBoxConfig {
    Text: string;

}

export class AddTodoBoxVm extends Box implements IReactAddTodoBoxVm {
    public ReactType = AddTodoBoxReact;
    public Text: string;

    public constructor(config?: IAddTodoBoxConfig) {
        super(config);
        if (config) {
            this.Text = config.Text;
        }
    }

    public add() {
        this.emitAppEvent("AddTodoDomVm-add", this.UniId, this.Text);
    }

}


export class AddTodoBoxProps extends BoxProps<IReactAddTodoBoxVm>{
}






