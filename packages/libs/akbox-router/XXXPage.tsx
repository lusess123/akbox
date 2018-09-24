import React from "react";
import { IPageConfig, IReactPage, PageProps, PageReact, Page } from "./page";
import { view } from "akbox/box";
import { PlugIn } from "akbox/ioc";

export class XXXPageReact extends PageReact<XXXPageProps> {
  pSender() {
    return <div>XXXPage</div>;
  }
}

export interface IXXXPage extends Page {}

export interface IReactXXXPage extends IReactPage {}

export interface IXXXPageConfig extends IPageConfig {}

@view({ com: XXXPageReact })
@PlugIn({ BaseType: "Page", RegName: "CodePage" })
export class XXXPage extends Page implements IReactXXXPage {
  protected Title = "CodePage";
  public constructor(config?: IXXXPageConfig) {
    super(config);
  }

  protected loadData() {
    super.loadData();
  }
}
export class XXXPageProps extends PageProps<IReactXXXPage> {}
