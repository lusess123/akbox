
import React from 'React'
import { BoxReact, Box, IBoxConfig, BoxProps, view } from "akbox/box";
export class PageReact<T extends PageProps<IReactPage>> extends BoxReact<T> {
}

export interface IReactPage extends Box {
}

export interface IPageConfig extends IBoxConfig {
  P1: string;
  P2: string;
  P3: string;
}
@view({ com: PageReact })
export class Page extends Box implements IReactPage {

  protected Title: string = "PageVm";
  protected Icon: string;
  protected P1: string;
  protected P2: string;
  protected P3: string;
  public constructor(config?: IPageConfig) {
    super(config);
    debugger;
    if (config) {
      this.P1 = config.P1;
      this.P2 = config.P2;
      this.P3 = config.P3;
    }
  }

  
  protected loadData() { }

  public sysLoadPage() {
    if (this.Title)
      document.title = this.Title;

    // if(this.Icon) document.re
    this.loadData();
  }



}
export class PageProps<T extends IReactPage> extends BoxProps<T>{

}






