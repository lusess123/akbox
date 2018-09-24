import React from 'react';

import * as ioc from 'akbox/ioc'
import { Page } from './page'

export interface IWeb {
  Page: string;
  P1?: string;
  P2?: string;
  P3?: string;
}

export default class PageContainer extends React.Component<IWeb, any> {
  constructor(p, s) {
    super(p, s);
    debugger;
    this.state = {
      PageBox: ioc.Ioc.Current().FetchInstance<Page>(p.Page, "Page", {
        Args: [p]
      }),
      PageName:p.Page
    };
    
  }
render() {
    if (this.state.PageBox) {
      return <div>{this.state.PageBox.intoBox()}</div>;
    }
    else {
      return <div><h1>页面{this.state.PageName}未注册</h1></div>
    }
  }

  componentDidMount(){
   // alert("完成" + this.props.Page);
   if (this.state.PageBox) {
    this.state.PageBox.sysLoadPage();
  }
  }
   
 }


