import  rxjs from 'rxjs'
import {filter} from 'rxjs/operators';
import JQuery  from "jquery";

export class App {
    private static fAppEvent: IEvent = null;
    private static fUniId: number = 0;

    public static getUniId():number
    {
        this.fUniId++;
        return this.fUniId;
    }

    public static initAppEvent(event: IEvent) {
        this.fAppEvent = event;
    }

    public static GetAppEvent(): IEvent {
        if (!this.fAppEvent) {
            this.fAppEvent = new EventBus().HookEvent;
        }
        return this.fAppEvent;
    }
}


    export class EventBus {
        private fEmit: JQuery = null;
        public FetchEmit()
        {
            if (!this.fEmit) {
                this.fEmit = JQuery({}) as any;
                //this.fEmit.setMaxListeners(0);
               // this.fEmit.
            }
            return this.fEmit;
        }

        public showAllEvent(): IEventInfo[] {
            var _res: IEventInfo[] = [];
            var _emit = this.fEmit;
            if (_emit) {
                var _rr = _emit[0];
                var _objs = [];
                for (var gg in _rr) {
                    _objs.push(gg);
                }
                if (_objs.length > 0) {
                   
                    var _vv: any = _rr[_objs[0]];
                    var _eve = _vv.events;
                   
                    for (var _e in _eve) {
                        _res.push({ EventName: _e, FunLength: _eve[_e].length, EventObj: _eve[_e] });
                    }
                }
                return _res;
            }
            
            return _res;
        }



        public constructor() {
            this.ReactEvent = new BaseEvent(this,"React");
            this.VmEvent = new BaseEvent(this, "Vm");
            this.HookEvent = new BaseEvent(this, "Hook");
            this.CustomEvent = new BaseEvent(this, "Custom");
        }

        public ReactEvent: IEvent;
        public VmEvent: IEvent;
        public HookEvent: IEvent;
        public CustomEvent: IEvent;

        public RemoveReactEvent()
        {

        }
    }



    export interface IEvent {
        emit(event: string, ...args: any[]): boolean;
        removeAllListeners(event?: string): IEvent;
        listeners(event: string): Function[];
        removeListener(event: string, listener: Function): IEvent;
        addListener(event: string, listener: Function): Function;
        showAllEvent(): IEventInfo[];
        removeAllBusListeners(): void;
        on(event: string, listener: Function): Function;
        off(event: string, listener: Function): IEvent;
        getSubjectByName(name: string): any;
    }

    export interface IEventInfo
    {
        EventName: string;
        FunLength: number;
        EventObj: any;
    }

    export interface ISubiectOb
    {
        Name: string;
        ArgList: any[];
    }

    export class BaseEvent implements IEvent {


        private fSubject: rxjs.Subject<ISubiectOb>;

        private fEventBus: EventBus;

        public constructor(eventBus: EventBus,name:string) {
            this.fEventBus = eventBus;
            this.fName = name;
        }

        protected fName: string;

        private createName(name: string): string {
            if (name) {
                return this.fName + "_" + name;
            }
            else
                return name;
        }

        public showAllEvent(): IEventInfo[]
        {
           return this.fEventBus.showAllEvent();
        }
        public removeAllBusListeners() {
            this.fEventBus.FetchEmit().unbind();
        }

        public getSubjectByName(name: string):any {
            let event = this.createName(name);
            if (!this.fSubject) {
                this.fSubject = new rxjs.Subject<any>();

            }
           return this.fSubject.pipe(filter(a => { return a.Name == event } ));
           
        }

        public emit(event: string, ...args: any[]): boolean {
            event = this.createName(event);
            console.log("事件调用： " + event);
            console.log(args);
            if (this.fSubject) {
               // this.fSubject = new rxjs.Subject<ISubiectOb>();
                this.fSubject.next({ Name: event, ArgList: args });
            }
            
            this.fEventBus.FetchEmit().trigger(event, args);
            return true;
        };
        public removeAllListeners(event?: string): IEvent {
            if (event) {
                event = this.createName(event);
                this.fEventBus.FetchEmit().unbind(event);
                return null;

            }
            else {

             

                var _events = this.fEventBus.showAllEvent();
                _events.forEach((n) => {
                    if (n.EventName.length > this.fName.length) {
                        if (n.EventName.substr(0, this.fName.length) == this.fName) {
                            this.fEventBus.FetchEmit().unbind(n.EventName);
                        }
                    }
                });
                return this;
            }
        };
        //removeAllListeners(events: string[]): IEvent {
        //    return null;
        //};
        public listeners(event: string): Function[] {
            event = this.createName(event);
           // return this.fEventBus.FetchEmit().
            alert("该接口未实现");
            return [];
        };
        public removeListener(event: string, listener: Function): IEvent {
            event = this.createName(event);
            var gg: any = listener;
            //var f: (eventObject: JQueryEventObject) => any = gg;
            this.fEventBus.FetchEmit().unbind(event, gg);
            return this;
        };
        public addListener(event: string, listener: Function): Function {
            console.log("时间注册： " + event);
            event = this.createName(event);
            var gg: any = listener;
            var f:any = (eventObject:   JQueryEventObject, ...args: any[]) => {
                listener(...args);
            };
            this.fEventBus.FetchEmit().bind(event, f);
            return f;
        }
        public off(event: string, listener: Function): IEvent {

            return this.removeListener(event, listener);
        };
        public on(event: string, listener: Function): Function {
            return this.addListener(event, listener);
        }
    }



