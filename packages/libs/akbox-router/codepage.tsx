import React from 'react';
import { IPageConfig, IReactPage, PageProps, PageReact, Page } from './page'
import { view } from "akbox/box";
import { PlugIn } from "akbox/ioc"

import { Radio, Card, Input, Row, Col } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
import * as code from './code'

const CodeTypeDict = {
  "box": ["组件", code.boxCode],
  "page": ["页面",code.pageCode],
  "col": ["控件",code.colCode],

};

export class CodePageReact extends PageReact<CodePageProps> {

  constructor(p){
     super(p);
     this._radioChange = this._radioChange.bind(this);
     this._nameChange = this._nameChange.bind(this);
  }

  _radioChange(e) {
    this.Vm.changeCodeKind(e.target.value);
  }

  _nameChange(e){ 
       this.Vm.changeCodeName(e.target.value);
  }
  pSender() {
    return <Card>
      <div>
        <Row type="flex">
          <Col span={8}>
            <RadioGroup defaultValue={this.Vm.CodeKind} onChange={this._radioChange}>
              {
                Object.keys(CodeTypeDict).map((key) => {
                 return <RadioButton value={key}>{CodeTypeDict[key][0]}</RadioButton>
                })
              }
            </RadioGroup></Col>
          <Col span={1} ></Col>
          <Col span={15} ><Input 
          placeholder={"请输入" + CodeTypeDict[this.Vm.CodeKind][0] + "名称"} 
          onChange={this._nameChange}
           value={this.Vm.XXX} /></Col>
        </Row>
      </div>


      <br />
      <pre><code>{this.Vm.CodeText}</code></pre>
      
    </Card>
  }
}

export interface ICodePageBoxVm extends Page {
}

export interface IReactCodePageVm extends IReactPage {
  CodeKind: string;
  changeCodeKind(val);
  XXX:string ;
  changeCodeName(val);
  CodeText:string ;
}

export interface ICodePageConfig extends IPageConfig {
}

@view({ com: CodePageReact })
@PlugIn({ BaseType: "Page", RegName: "CodePage" })
export class CodePageVm extends Page implements IReactCodePageVm {

  protected Title = "CodePage";
  CodeKind = "box";
  XXX = "XXX";
  CodeText = "";
  public constructor(config?: ICodePageConfig) {
    super(config);
    this.CodeKind = CodeTypeDict[this.P1] ? this.P1 : "box";
    this.XXX = this.P2?this.P2:"XXX";
    this.CodeText = CodeTypeDict[this.CodeKind][1](this.XXX);
  }

  changeCodeKind(val) {
    this.CodeKind = val;
    this.genCode();
  }

  changeCodeName(val){
    this.XXX = val;
    this.genCode()
  }

  private genCode()
  {
    this.CodeText = CodeTypeDict[this.CodeKind][1](this.XXX);
    this.forceUpdate();

  }

  protected loadData() {
    super.loadData();
  }


}
export class CodePageProps extends PageProps<IReactCodePageVm>{

}







