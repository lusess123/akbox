
import React from 'React'
import { BoxReact, Box, IBoxConfig, BoxProps } from "akbox/box";
export class FooterBoxReact extends BoxReact<FooterBoxProps>  {
    public pSender(): React.ReactNode {
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

export interface IReactFooterBoxVm extends Box {

    onFilterChange(filter: string);
    Filter?: string;
}

export interface IFooterBoxConfig extends IBoxConfig {
    Filter?: string;

}

export class FooterBoxVm extends Box implements IReactFooterBoxVm {
    public ReactType = FooterBoxReact;
    public Filter: string = "SHOW_ALL";

    public onFilterChange(filter: string) {
        this.Filter = filter;
        this.IsChange = true;
        this.emitAppEvent("Filter-Click", this.UniId, filter);
    }

    public constructor(config?: IFooterBoxConfig) {
        super(config);
        if (config) {
            if (config.Filter) {
                this.Filter = config.Filter;
            }
        }
    }

}
export class FooterBoxProps extends BoxProps<IReactFooterBoxVm>{
}






