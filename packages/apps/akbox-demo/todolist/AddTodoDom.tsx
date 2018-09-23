
import React from 'React'
import { DomReact, DomVm, IDomVmConfig, DomProps } from "akbox/dom";
import jQuery  from 'jquery'
const $ = jQuery;
export class AddTodoDomReact extends DomReact<AddTodoDomProps>  {


    public pSender(): React.ReactElement<any> {
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

export interface IReactAddTodoDomVm extends DomVm {
    Text: string;
    add();
}

export interface IAddTodoDomConfig extends IDomVmConfig {
    Text: string;

}

export class AddTodoDomVm extends DomVm implements IReactAddTodoDomVm {
    public ReactType = AddTodoDomReact;
    public Text: string;

    public constructor(config?: IAddTodoDomConfig) {
        super(config);
        if (config) {
            this.Text = config.Text;
        }
    }

    public add() {
        this.emitAppEvent("AddTodoDomVm-add", this.UniId, this.Text);
    }

}


export class AddTodoDomProps extends DomProps<IReactAddTodoDomVm>{
}






