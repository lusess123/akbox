
import React from 'React'
import { BoxReact, BoxVm, IBoxVmConfig, BoxProps } from "akbox/box";

export class TodoBoxReact extends BoxReact<TodoDomProps> {

        public pSender(): React.ReactNode {
            return <li
                onClick={() => { this.props.Vm.onClick(); }}
                style={{
                    textDecoration: this.props.Vm.Completed ? 'line-through' : 'none',
                    cursor: this.props.Vm.Completed ? 'default' : 'pointer'
                }}>
                {this.props.Vm.Text}
            </li>;
        }
        
    }

    export interface IReactTodoBoxVm extends BoxVm {
        onClick();
        Text: string;
        Completed: boolean;
    }

    export interface ITodoBoxConfig extends IBoxVmConfig {
         Text: string;
         Completed?: boolean;
    }

    export class TodoBoxVm extends BoxVm implements IReactTodoBoxVm {
        public ReactType = TodoBoxReact;
        public Text: string;
        public Completed: boolean;

        public constructor(config?: ITodoBoxConfig) {
            super(config);
            if (config) {
                this.Text = config.Text;
                this.Completed = config.Completed;
            }

        }
        public onClick()
        {
            this.Completed = !this.Completed;
            this.IsChange = true;
            this.emitAppEvent("complete", this.UniId);
        }

    }
    
    export class TodoDomProps extends BoxProps<IReactTodoBoxVm>{
    }






