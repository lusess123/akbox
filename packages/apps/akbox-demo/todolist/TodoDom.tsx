
import React from 'React'
import { DomReact, DomVm, IDomVmConfig, DomProps } from "akbox/dom";

export class TodoDomReact extends DomReact<TodoDomProps> {

        public pSender(): React.ReactElement<any> {
            return <li
                onClick={() => { this.props.Vm.onClick(); }}
                style={{
                    textDecoration: this.props.Vm.Completed ? 'line-through' : 'none',
                    cursor: this.props.Vm.Completed ? 'default' : 'pointer'
                }}>
                {this.props.Vm.Text}
            </li>;
        }
        protected pComponentDidMount() {
            super.pComponentDidMount();

        }
    }

    export interface IReactTodoDomVm extends DomVm {
        onClick();
        Text: string;
        Completed: boolean;
    }

    export interface ITodoDomConfig extends IDomVmConfig {
         Text: string;
         Completed?: boolean;
    }

    export class TodoDomVm extends DomVm implements IReactTodoDomVm {
        public ReactType = TodoDomReact;
        public Text: string;
        public Completed: boolean;

        public constructor(config?: ITodoDomConfig) {
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
    
    export class TodoDomProps extends DomProps<IReactTodoDomVm>{
    }






