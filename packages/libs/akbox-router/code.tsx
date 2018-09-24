export const boxCode = (XXX:string)=>{
  return `
  import React from "React";
  import { BoxReact, Box, IBoxConfig, BoxProps, view } from "akbox/box";

  export class ${XXX}React<T extends ${XXX}Props<IReact${XXX}Box>> extends BoxReact<T> {
    pSender() {
      return <div>${XXX}Box</div>
    }
  }
  
  export interface IReact${XXX}Box extends Box {

  }
  
  export interface I${XXX}Config extends IBoxConfig {

  }
  
  @view({ com: ${XXX}React })
  export class ${XXX}Box extends Box implements IReact${XXX}Box {
    public constructor(config?: I${XXX}Config) {
      super(config);
    }
  }
  
  export class ${XXX}Props<T extends IReact${XXX}Box> extends BoxProps<T> {

  }
  

  `;
}

export const pageCode = (XXX:string) =>{
  return `
  import React from "react";
  import { IPageConfig, IReactPage, PageProps, PageReact, Page } from "./page";
  import { view } from "akbox/box";
  import { PlugIn } from "akbox/ioc";
  
  export class ${XXX}PageReact extends PageReact<${XXX}PageProps> {
    pSender() {
      return <div>${XXX}Page</div>;
    }
  }
  
  export interface I${XXX}Page extends Page {

  }
  
  export interface IReact${XXX}Page extends IReactPage {

  }
  
  export interface I${XXX}PageConfig extends IPageConfig {

  }
  
  @view({ com: ${XXX}PageReact })
  @PlugIn({ BaseType: "Page", RegName: "${XXX}Page" })
  export class ${XXX}Page extends Page implements IReact${XXX}Page {
    protected Title = "${XXX}Page";
    public constructor(config?: I${XXX}PageConfig) {
      super(config);
    }
  
    protected loadData() {
      super.loadData();
    }
  }
  export class ${XXX}PageProps extends PageProps<IReact${XXX}Page> {
    
  }
  
  `;
}

export const colCode = (XXX:string)=>{
  return  "未完待续...";
}