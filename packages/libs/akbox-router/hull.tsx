import React from 'react';
import { withRouter, Route, Switch } from 'react-router'
import { Card, Modal } from 'antd';
import Web from './web'
import "./codepage";

export default (p) => {
  const { staticContext,routename, ...rest } = p;
  return <div {...rest}>
    {routeGroup(Hull,routename)}
    {routeGroup(WinHull,routename)}
  </div>
}

const routeGroup = (hull,routename="ak") => {
  return <Switch>
    <Route  path={`/${routename}/:page/:ak1/:ak2/:ak3`} component={hull} />
    <Route path={`/${routename}/:page/:ak1/:ak2`} component={hull} />
    <Route path={`/${routename}/:page/:ak1`} component={hull} />
    <Route path={`/${routename}/:page`} component={hull} />
    <Route path={`/${routename}`} component={hull} />
  </Switch>

}

export class Hull extends React.Component<any, any> {

  ShowSign = "";

  renderMain() {
    //debugger;
    const { page, ak1, ak2, ak3 } = this.props.match.params;
    return <Card>
      <Web Page={page} P1={ak1} P2={ak2} P3={ak3} />
    </Card>;
  }
  render() {
    return this.willShow(this.ShowSign) ? this.renderMain() : null;
  }

  willShow(start: string) {
    const { page } = this.props.match.params;
    if (start) {
      if ((page as string).toUpperCase().startsWith(start)) {
        return true;
      } else
        return false;
    }
    else
      return !(this.willShow("WIN") || this.willShow("PANEL"));
  }


  shouldComponentUpdate(p, s, c) {

    const { page } = p.match.params;
    //  alert(page);
    if (page) {
      if ((page as string).toUpperCase().startsWith("WIN")) {
        return false;
      }
      if ((page as string).toUpperCase().startsWith("PANEL")) {
        return false;
      }
    }
    return true;
  }
}

export class ModalWin extends React.Component<any, any> {
  // state = { v: true }
  render() {
    const { page, ak1, ak2, ak3 } = this.props.match.params;
    debugger;
    const pageo = page && (page as string).length > 3 ? (page as string).substring(3) : page;
    return <Modal onCancel={() => { this.props.onCancle() }} visible={this.props.v} footer={null}>
      <Web Page={pageo} P1={ak1} P2={ak2} P3={ak3} />
    </Modal>
  }
}

export class WinHull extends Hull {
  ShowSign = "WIN";

  state = {
    v: true
  }
  renderMain() {
    const { page, ak1, ak2, ak3 } = this.props.match.params;
    return <ModalWin
      onCancle={() => {
        this.state.v = false;
        this.forceUpdate()
      }}
      v={this.state.v}
      ref="xxx" {...this.props} />;
  }

  shouldComponentUpdate(p, s, c) {

    const { page } = p.match.params;
    //  alert(page);
    if (page) {
      if ((page as string).toUpperCase().startsWith("WIN")) {
        this.state.v = true;

        return true;
      }
      if ((page as string).toUpperCase().startsWith("PANEL")) {
        return false;
      }
    }
    return false;
  }
}
