

import React from "react"
import ReactDOM from "react-dom";
import * as event from "./event";
import * as ioc from "./ioc";
import * as util from './util'
import jQuery  from 'jquery'
const $ = jQuery;


/**
 * 呈现react视图的接口
 * 
 * @export
 * @interface IReact React Virtual Dom元素
 */
export interface IReact {
    pSender(): React.ReactNode;
}
export interface IVm {
    
    ReactType: any;

}
export interface IMetaShow {
    Name?: string;
    Content?: string;
    List?: string[];
}

export interface IFunDic {
    [name: string]: Function;
}

export interface ITBoxFun {
    (dom: Box): JSX.Element;
}
export interface ITBoxConfig {
    fun?: ITBoxFun;
    nullNode?: React.ReactNode;
}

export interface IFunctionDict {
    [index: string]: Function[];
}


const EmptyVm = {
    "IsChange": undefined,
    "fNoFirst": undefined,
    "fOriValue": undefined,
    "NoNeedUpdate": undefined,
    "IsDisposeAll": undefined,
    "ffHasDispose": undefined,
    "IsListItem": undefined,
    "IsTabHide": undefined,
    fEventBus:undefined,
    AppEventFunDic:undefined,
    Error:undefined,
    pDataValue:undefined
}
/**
 * 
 * 
 * @export
 * @class DomReact
 * @extends {React.Component<P, S>}
 * @template P 
 * @template S 
 * @template A 
 */
export class BoxReact<P extends BoxProps<Box>, S=any> extends React.Component<P,
    S> {

    private fIsNoChangeSign = false;

    // private fDomDispatcher: Flux.Dispatcher<A>;
    private fEventFun: Function;

    protected pNoNeedUpdate: boolean = false;
    protected IsNoFirst: boolean = false;

    protected pIsSetScreenHeight: boolean = false;
    protected pIsSetScreenMaxHeight: boolean = false;
    protected ScreenDomName: string = "";
    protected IsDisposeAll: boolean;
    public IsListItem: boolean = false;

    //  public setIsLis

    public get Vm() {
        return this.props.Vm;
    }

    public vM(): Box {
        return this.props.Vm;
    }

    protected pReactEventDict: IFunctionDict = {};

    public listenEvent(event: string, fun: Function) {
        var _fun = this
            .props
            .Vm
            .getEmit("React")
            .addListener(event, fun);
        if (this.pReactEventDict[event]) {
            this
                .pReactEventDict[event]
                .push(_fun);
        } else {
            this.pReactEventDict[event] = [_fun];
        }
    }

    public removeEvent(event?: string, vm?: Box) {
        if (!vm) {
            vm = this.props.Vm;
        }
        if (event) {
            if (this.pReactEventDict[event] && this.pReactEventDict[event].length > 0) {
                this
                    .pReactEventDict[event]
                    .forEach((f) => {
                        vm
                            .getEmit("React")
                            .removeListener(event, f);

                    });
                this.pReactEventDict[event] = null;
            }
        } else {
            for (let name in this.pReactEventDict) {
                if (this.pReactEventDict[name]) {
                    var _events: Function[] = this.pReactEventDict[name];
                    _events.forEach((f) => {
                        vm
                            .getEmit("React")
                            .removeListener(name, f);
                    });
                }
                this.pReactEventDict[name] = null;

            }

            this.pReactEventDict = {};
        }
    }

    public _T_(a, tplName?: string): React.ReactNode {
        if (tplName && tplName != "") {
            if (this.props.Vm.TplFunDic && this.props.Vm.TplFunDic[tplName]) {
                return this.props.Vm.TplFunDic[tplName](a, this.props.Vm);
            }
        } else {

            return a;
        }
    }

    protected _tDom(dom: Box, config?: ITBoxConfig): React.ReactNode {
        if (config && config.fun) {
            return config.fun(dom);
        } else {
            if (dom) {
                return dom.intoBox();
            } else {
                if (config) {
                    if (config.nullNode) {
                        return config.nullNode;
                    } else {
                        return null;
                    }
                }
            }
        }
    }

    public setNoNeedUpdate(isNo: boolean) {
        this.pNoNeedUpdate = isNo;
    }

    public componentWillMount(): void {
        this.pComponentWillMount();
    };
    public componentWillUnmount(): void {
        this.pComponentWillUnmount();
    };
    public componentDidMount(): void {
        this.pComponentDidMount();
        this.IsNoFirst = true;

    };

    protected pAfterForeUpdate(val: string) { }

    protected pInstall(): void {
        //   if (this.props.Vm.getRegName() == "pick") debugger; 洗白
        // this.removeEvent(null, this.props.Vm);
        this
            .props
            .Vm
            .getEmit("React")
            .removeAllListeners();
        this.fEventFun = this
            .props
            .Vm
            .onChangeHandle((val, callback) => {
                this.pFunForceUpdate(() => {

                    this.pAfterForeUpdate(val);
                    if (callback)
                        callback();
                }
                );
                return true;
            });
        this.listenEvent("setChange", (a: boolean) => {
            //  this.props.Vm.IsChange = a;
            this.fIsNoChangeSign = !a;
        });
    };
    protected pUnInstall(vm?: Box): void {
        // this.removeEvent();
        if (vm) {
            // 这样是不行的 没准这个对象还有用呢 vm.getEmit("React").removeAllListeners(); alert("删除所有的事件");
            this.removeEvent(null, vm);
            // if (!vm.IsChange) {  vm.getEmit("React").removeAllListeners();
            vm
                .getEmit("React")
                .removeListener(Box.fEVENT_CHANGE, this.fEventFun);
            //  vm.getEmit("React").removeAllListeners(); } if (!vm.IsListItem) {
            // vm.dispose(); }
        } else {
            // this.props.Vm.getEmit("React").removeAllListeners(); this.props.Vm.dispose();
        }
    };

    public componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
        this.pComponentWillUpdate(nextProps, nextState, nextContext);
    }
    public pComponentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void { }

    public componentDidUpdate(prevProps: P, prevState: S, prevContext: any): void {
        this.pComponentDidUpdate(prevProps, prevState, prevContext);
    }
    protected pComponentDidUpdate(prevProps: P, prevState: S, prevContext: any): void {
        //更新后的
        if (!(prevProps.Vm === this.props.Vm)) {
            this.pInstall();
            this.pDomLoad();

            console.log(this.props.Vm.getRegName() + "重新注册");
        }
    }

    protected pFunForceUpdate(callback?: () => any) {
        console.log(this.props.Vm.getRegName() + "调用update");
        this.forceUpdate(callback);
    };

    protected pBeforRender(nextProps: P, nextState: S, nextContext: any): void { }

    public shouldComponentUpdate(nextProps: P, nextState: S, nextContext: any) {
        // if (nextProps.Vm["Text"] == "郑瑜琨") debugger;
        console.log(this.props.Vm.getRegName() + "  判断是否更新" + this.props.Vm.IsChange);

        if (!(nextProps.Vm === this.props.Vm)) {
            this.pUnInstall(this.props.Vm);

        }

        this.pBeforRender(nextProps, nextState, nextContext);

        if (!nextProps.Vm.IsMulit) {

            if (!nextProps.Vm.NoNeedUpdate && !this.pNoNeedUpdate && nextProps.Vm.IsChange) {
                nextProps.Vm.IsChange = false;
                return true;
            } else
                return false;
        }
        else {
            return true;
        }
        // return true;
    }

    protected pDomLoad(): void { }



    protected pComponentWillMount(): void {

        //  var __this = this;

        console.log(this.props.Vm.getRegName() + "注册");
    };
    protected pComponentWillUnmount(): void {
        // this.props.Vm.offEvent_ChangeEmit(this.fEventFun);
        this.pUnInstall();
    };
    protected pComponentDidMount(): void {
        //this.props.Vm.offEvent_ChangeEmit(this.fEventFun);
        this.pInstall();
        this.pDomLoad();
        var _msd = this.props.Vm.MetaShowData;
        // if (!_msd) _msd = {Name : this.props.Vm.getRegName()};
        if (_msd) {
            var _dom = this.pGetDom();
            if (_dom) {
                var _$dom = $(_dom);
                if (_$dom) {
                    _$dom
                        .on("mousedown", function (event) {
                            if (event["which"] == 3) {
                                event.stopPropagation();
                                var _$t = $(this);
                                if (!_$t.hasClass("acs-module-warning")) {
                                    $(this).addClass("acs-module-warning");
                                    var _lis = "";
                                    if (_msd.List) {
                                        _msd
                                            .List
                                            .forEach((l) => {
                                                _lis += ("<li>" + l + "</li>");
                                            });
                                    }

                                    var _$p = $("<div class='acs-module-warninHg-content'><h5>" + _msd.Name + "</h5><div>" + (_msd.Content
                                        ? _msd.Content
                                        : "未知组件") + "</div><ul class='list'>" + _lis + "</ul></div>");

                                    $("body").append(_$p);
                                    _$p.css({ top: event.clientY, left: event.clientX });
                                    _$t.data("div", _$p);
                                } else {
                                    _$t.removeClass("acs-module-warning");
                                    _$t
                                        .data("div")
                                        .remove();
                                }

                                return false;
                            }
                        });

                }
            }
        }
        if (this.props.Vm.Height == 0) {
            if (this.pIsSetScreenHeight) {
                var _dom = ReactDOM.findDOMNode(this);
                if (_dom) {
                    var _$dom = $(_dom);
                    if (this.ScreenDomName && this.ScreenDomName != "") {
                        var _$dom = _$dom.find(this.ScreenDomName);
                    }

                    _$dom.height($(window).height() - 60 - 30 - 30 - 47);
                }
            }
            if (this.pIsSetScreenMaxHeight) {
                var _dom = ReactDOM.findDOMNode(this);
                if (_dom) {
                    var _$dom = $(_dom);
                    if (this.ScreenDomName && this.ScreenDomName != "") {
                        var _$dom = _$dom.find(this.ScreenDomName);
                    }
                    _$dom.css("max-height", $(window).height() - 60 - 30 - 30 - 47);
                }
            }
        } else {
            var _dom = ReactDOM.findDOMNode(this);
            if (_dom) {
                var _$dom = $(_dom);
                if (this.ScreenDomName && this.ScreenDomName != "") {
                    var _$dom = _$dom.find(this.ScreenDomName);
                }

                _$dom.height(this.props.Vm.Height);
            }
        }

    };
    protected pSender(): React.ReactNode {
        return <span><pre>{util.circularJson({ ...{}, ...this.vM(), ...{ReactType: util.GetClassName( util.ReactByOpt(this.Vm))},...EmptyVm })}</pre></span>
    };

    protected pGetErrorName() {
        return "【dom】 【" + this
            .props
            .Vm
            .getRegName() + "】 【" + this.props.Vm.Id + "】";
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.pComponentDidCatch(error, errorInfo);
    }

    public pComponentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        //  alert(errorInfo);
    }
    protected pGetDom(): Element {
        try {
            var _dom = ReactDOM.findDOMNode(this);
            return _dom;
        } catch (exxx) {
            return null;
        }
    }

    protected renderErrorObj: any;
    /**
     * react组件自带的呈现函数
     * 
     * @returns {React.ReactNode} react元素
     * @memberof DomReact
     */
    public render(): React.ReactNode {
        //$["r"]["pasend"] = this.props;   AkDispatcher.SendCount++;
        //
        console.log("【dom】：" + this.props.Vm.getRegName() + "  更新" + new Date().toLocaleTimeString());
        try {

            if (this.renderErrorObj) {
                const _err = this.renderErrorObj;
                this.renderErrorObj = null;
                throw _err;
            }

            if (this.props.Vm.Error != "") {
                var _str = this.props.Vm.Error;
                this.props.Vm.Error = "";
                throw _str;
            }
            if (this.props.Vm.CustomRenderFun) {
                return this
                    .props
                    .Vm
                    .CustomRenderFun(this.props.Vm);
            } else {
                var res = this.pSender();

                return res;
            }

        } catch (ee) {
            console.warn("组件异常：");
            // console.warn(this); console.info(this);  alert();
            var str = this.pGetErrorName() + "   " + ee.toString();
            // console.warn(str);

            if (ee && ee.stack) {
                const _str: string = ee.stack;
                ee.StackList = _str.split("\n");
            }
            console.warn({ obj: this, Str: str, ex: ee, Stack: ee.StackList });
            // throw "123";
            return <span className="fa fa-exclamation-triangle Hs-red" title={str + "\n" + ee.stack}>☹</span>;
            // return React.DOM.span({ title: str, className: " fa fa-exclamation-triangle
            // Hs-red " });
        }
    }
}

export interface IChangeEventFun {
    (val: string, col: Box): boolean;
}

export interface IBoxVmChangeHandle {
    (val: string, callback?: () => any): boolean;
}

export interface ICustomRenderFun {
    (vm: Box): React.ReactElement<any>;
}

export interface ITplReactFun<T> {
    (val: any, tplName: string, vm: T): JSX.Element;
}

export interface IRegEvent {
    Name: string;
    //  UniId: string;
    Fun: Function;

}

export interface IRegEventBox extends IRegEvent {
    BoxObj: Box;
}

export interface IBoxConfig {
    UniId?: string;
    IsMulit?: boolean;
    Height?: number;
    IsListItem?: boolean;
    DataValue?: string;
    PxWidth?: number;
    PxHeight?: number;
}

export const view = ({com}:{com:any})=>(constructor: Function)=>{
    if(com){
       (constructor as any ).ReactType = com ;
    }
}


@view({com:BoxReact})
export class Box {

    public static fEVENT_CHANGE: string = "event_change";
   // public ReactType: any = DomReact;
    public IsChange: boolean = true;
    public IsMulit: boolean;

    public TempDataValue: string;
    private fNoFirst: boolean = false;
    private fOriValue: string = "";
    public Id: string = "";
    public Error: string = "";
    public NoNeedUpdate: boolean = false;

    public MetaShowData: IMetaShow;
    protected AppEventFunDic: IFunDic = {};

    public CustomRenderFun: ICustomRenderFun;

    public TplFunDic: any;
    public UniId: string;
    public key: number;
    protected IsDisposeAll: boolean = true;
    private ffHasDispose: boolean = false;
    //是否是集合元素
    public IsListItem: boolean = false;

    //hdz
    public IsTabHide: boolean = false;
    public Tag: any;
    private fEmit: event.IEvent;
    private fEventBus: event.EventBus;
    public Height: number = 0;
    public PxWidth: number;
    public PxHeight: number;
    // public $DomList: Array<React.Component<any, any>>; /组件只读调用
    protected pDataValue: string = "";

    ///注册名支持重载
    protected pRegName: string;
    // protected pDataValue: string;
    public ChangeEventFun: IChangeEventFun;

    public getOriValue(): string { return this.fOriValue; }

    public constructor(config?: IBoxConfig) {
        if(!config || !config.UniId){
            this.UniId = "-BoxVm-"+ event.App.getUniId();
        }
        if (config) {
            if(config.UniId){
              this.UniId = config.UniId;
            }
            this.IsMulit = config.IsMulit;
            this.Height = config.Height;
            this.IsListItem = config.IsListItem;

            this.fOriValue = this.pDataValue = config.DataValue;
            this.PxWidth = config.PxWidth;
            this.PxHeight = config.PxHeight;

            this.initDataValue(config.DataValue);

        }
        this.fEventBus = new event.EventBus();
    }

    public toChange() {
        this.IsChange = true;
    }

    public RegistAppEvent(regData: IRegEvent) {
        this.listenAppEvent(regData.Name, this.UniId, regData.Fun);
    }

    protected pRegistAppEventByDom(regData: IRegEventBox) {
        // this.RegistAppEvent(regData);
        if (regData.BoxObj.UniId == this.UniId) {
            regData
                .BoxObj
                .RegistAppEvent(regData);
        } else {
            alert("由于组件的unid不一致 ，导致无法注册 " + regData.Name + "  事件 ");
        }
    }

    public onCustomEvent(fun: Function, sender: Box) {
        this.pRegistAppEventByDom({ BoxObj: sender, Fun: fun, Name: "123" });
    }

    protected listenAppEvent(name: string, uniId: string, fun: Function) {

        var _fun = event
            .App
            .GetAppEvent()
            .addListener(name + uniId, fun);
        this.AppEventFunDic[name + uniId] = _fun;
        //eventFile.App.GetAppEvent().removeListener(name + uniId, fun);
    }
    protected emitAppEvent(name: string, sign: string, ...args: any[]) {
        event
            .App
            .GetAppEvent()
            .emit(name + sign, ...args);
    }

    public getCache<T>(key: string, setFun: () => T): T {
        if (!this["__vmCache_" + key]) {
            this["__vmCache_" + key] = setFun();
        }
        var _t: T = this["__vmCache_" + key];
        return _t;
    }

    protected pGetEmit(name?: string): event.IEvent {
        // if (this.fEmit == null) {
        if (this.fEventBus == null) {
            this.fEventBus = new event
                .EventBus();
        }
        switch (name) {
            case "Custom":
                this.fEmit = this.fEventBus.CustomEvent;
                break;
            case "Hook":
                this.fEmit = this.fEventBus.HookEvent;
                break;
            case "React":
                this.fEmit = this.fEventBus.ReactEvent;
                break;
            case "Vm":

            default:
                this.fEmit = this.fEventBus.VmEvent;
        }

        //  }
        return this.fEmit;
    }

    public getEmit(name?: string): event.IEvent {
        return this.pGetEmit(name);
    }

    public offEvent_ChangeEmit(fun: Function) {
        //if (this.fEmit == null)    this.fEmit = new EventEmitter2();
        this
            .pGetEmit("React")
            .removeAllListeners(Box.fEVENT_CHANGE);
    }

    public onChangeHandle(fun: IBoxVmChangeHandle): Function {
        //if (this.fEmit == null)    this.fEmit = new EventEmitter2();
        var __this = this;
        var _fun = function () {
            fun.apply(__this, arguments)
        };
        return this
            .pGetEmit("React")
            .addListener(Box.fEVENT_CHANGE, _fun);
        //  return _fun;
    }

    public intoBox(key?: number, ...children: React.ReactNode[]): React.ReactNode {
        if (this) {
            const _reactType = (this as any).ReactType?(this as any).ReactType:this.constructor["ReactType"];
            if (key || key === 0) {
                this.key = key;
                return React.createElement(_reactType, {
                    Vm: this,
                    key: key
                }, children);
            } else {
                return React.createElement(_reactType, {
                    Vm: this
                }, children);
            }
        } else {
            return <span className="fa fa-exclamation-triangle">（空的元素）</span>;

        }
    }
    public intoBoxR(reactType: any, key?: number, childrenNode?: React.ReactNode[]): React.ReactNode {
        if (key) {
            this.key = key;
        }
        return React.createElement(reactType, {
            Vm: this
        }, childrenNode)
    }

    public initDataValue(val: string) {
        this.fOriValue = val;
        this.TempDataValue = val;
        this.pDataValue = val;
    }

    protected pDataValueSet(val: string): boolean {
        return this.fDataValueSet(val);
    }

    public forceUpdate(val?: string, callback?: () => any) {
        this.IsChange = true;
        this
            .pGetEmit("React")
            .emit(Box.fEVENT_CHANGE, val, callback);
    }

    public async asyncForceUpdate(val: string, ) {
        return new Promise((resolve) => {
            this.forceUpdate(val, resolve);
        });
    }

    //公共接口
    protected pDataValueGet() {
        return this.pDataValue;
    }

    protected pdataValue(val?: string): string | void {
        if (val === undefined) {
            return this.pDataValueGet();
        } else {
            this.pDataValueSet(val);
            //return val;
        }
    }

    public dataValue(val?: string): string | void {
        if (val === undefined) {
            return this.dataValueGet();
        } else {
            return this.dataValueSet(val);
            //return val;
        }
    }

    public getRegName = function () {
        //$["r"]["pgetregname"] = this;
        return this.pRegName;
    }

    public setOriValue(val: string) {
        this.fOriValue = val;
        this.fDataValueSet(val);
    }

    public changeNoForceUpdate(val: string) {
        if (val != this.pDataValue) {
            var _isCheck = this.pOnchange(val);
            if (_isCheck) {
                //广播事件
                this.pDataValue = val;

                //  this.pGetEmit("React").emit(DomVm.fEVENT_CHANGE, val, callback);

            }
            return _isCheck;
        }
        return false;
    }

    private fDataValueSet(val: string, callback?: () => any) {
        //if (!this.fNoFirst) {    this.fOriValue = val;    this.fNoFirst = true; }

        if (val != this.pDataValue) {
            var _isCheck = this.pOnchange(val);
            if (_isCheck) {
                //广播事件
                this.pDataValue = val;

                this
                    .pGetEmit("React")
                    .emit(Box.fEVENT_CHANGE, val, callback);

            }
            return _isCheck;
        }
        return false;
    }

    private fDataValueGet() {
        return this.pDataValueGet();
    }
    public vmdataValue(val?: string): string | void {
        if (val === undefined) {
            return this.vmDataValueGet();
        } else {
            return this.vmDataValueSet(val);
            //return val;
        }
    }
    public vmDataValueGet() {
        return this.fDataValueGet();
    }

    public vmDataValueSet(val: string, callback?: () => any) {
        this.fDataValueSet(val, callback);
    }

    public dataValueGet() {
        return this.fDataValueGet();
    }

    public dataValueSet(val: string) {

        this.fDataValueSet(val);
    }

    public reactDataValueGet() {
        return this.fDataValueGet();
    }

    protected pOnchange(val: string): boolean {
        //$["r"]["ppros"] = this;
        this.TempDataValue = val;
        var _isCheck = true;

        if (this.ChangeEventFun != null) {
            _isCheck = this.ChangeEventFun(val, this);
        }
        return _isCheck;
    }

    //react 组件调用接口
    public reactDataValueSet(val: string): boolean {
        return this.fDataValueSet(val);
    }

    protected pDispose() {
        if (!this.ffHasDispose) {
            this.ffHasDispose = true;
            if (this.IsDisposeAll) {
                for (var ns in this) {
                    var _p: any = this[ns];
                    if (_p && _p["dispose"] && $.isFunction(_p["dispose"])) {
                        _p["dispose"]();
                    } else {
                        if ($.isArray(_p)) {
                            var _gg: any[] = _p;
                            _gg.forEach((a) => {
                                if (a && a["dispose"] && $.isFunction(a["dispose"])) {
                                    a["dispose"]();
                                }
                            });
                        }
                    }
                }
            }
            if (this.fEmit) {
                this
                    .fEmit
                    .removeAllListeners();
            }
            if (this.AppEventFunDic) {
                for (var n in this.AppEventFunDic) {
                    if (this.AppEventFunDic[n]) {
                        event
                            .App
                            .GetAppEvent()
                            .removeListener(n, this.AppEventFunDic[n]);
                    }
                }
                this.AppEventFunDic = {};
            }
        }
    }

    public dispose() {
        this.pDispose();
    }

}

export class BoxProps<T extends Box> {
    public Vm: T;
    public children?: any;
}

export function _reg(name: string, path: string, src?: string) {
    if (!src) {

        if (window["Hull_Config"] && window["Hull_Config"].IsPackage) {
            src = "";
        } else {
            src = "./../";
        }
    }
    ioc.Ioc
        .Current()
        .RegisterTypeSrc(name, Box, path);
}


