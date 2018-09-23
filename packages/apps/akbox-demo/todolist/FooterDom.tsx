
import React from 'React'
import { DomReact, DomVm, IDomVmConfig, DomProps } from "akbox/dom";
export class FooterDomReact extends DomReact<FooterDomProps>  {
    public pSender(): React.ReactElement<any> {
        return (
            <p>
                Show:
                {' '}
                {this.renderFilter('SHOW_ALL', 'All')}
                {', '}
                {this.renderFilter('SHOW_COMPLETED', 'Completed')}
                {', '}
                {this.renderFilter('SHOW_ACTIVE', 'Active')}
                .
           </p>
        )
    }
    private renderFilter(filter, name) {
        if (filter === this.props.Vm.Filter) {
            return name
        }

        return (
            <a href='#' onClick={e => {
                e.preventDefault()
                this.props.Vm.onFilterChange(filter)
            }}>
                {name}
            </a>
        )
    }

}

export interface IReactFooterDomVm extends DomVm {

    onFilterChange(filter: string);
    Filter?: string;
}

export interface IFooterDomConfig extends IDomVmConfig {
    Filter?: string;

}

export class FooterDomVm extends DomVm implements IReactFooterDomVm {
    public ReactType = FooterDomReact;
    public Filter: string = "SHOW_ALL";

    public onFilterChange(filter: string) {
        this.Filter = filter;
        this.IsChange = true;
        this.emitAppEvent("Filter-Click", this.UniId, filter);
    }

    public constructor(config?: IFooterDomConfig) {
        super(config);
        if (config) {
            if (config.Filter) {
                this.Filter = config.Filter;
            }
        }
    }

}
export class FooterDomProps extends DomProps<IReactFooterDomVm>{
}






