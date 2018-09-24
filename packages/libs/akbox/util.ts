import * as dom from "./box"
import ReactDOM from "react-dom";


    export function Cast<T>(obj: any): T {

        var _t: T = obj;
        return _t;
    }

    

    export function GetClassName(obj: any): string {
        if(obj.name){
            return "【"+obj.name+"】";
        }
        if (obj["constructor"]) {
            var s: any = obj["constructor"];
            var _s = s.toString();
            var m = _s.match(/function\s+([^(]+)/);
            if (m)
                return m[1];
            else
                return "";
        }
        else
            return (typeof obj).toString();
    }

    export const isTouch = function() {   ////判断设备是否支持touch事件
        return ('ontouchstart' in window) || window["DocumentTouch"] && document instanceof window["DocumentTouch"];
    }


    export function Noty(msg: string, sign?: string) {
        var _p = "info";//warning success error
        if (sign) {
            _p = sign;
        }
        //var _cal = $.fn.calendar;

        AsyncJs(
            [
                "/AtawStatic/lib/03Extend/toastr/toastr.min.js",
                "/AtawStatic/lib/03Extend/toastr/toastr.min.css"
            ]
            , (toastr) => {
                //  $.sticky("123");
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": true,
                    "progressBar": true,
                    "positionClass": "toast-bottom-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                // console.log(msg);
                toastr[_p](msg);
                // if (_cal) {
                //  $.fn.calendar = _cal;
                // }
                // alert(msg);
            })
    }

    export function ToggleLoading(isS: boolean, fun?: Function) {
        // alert(isS);
        if (isS) {

            //if (window["Ataw"] && window["Ataw"]["msgbox"] && window["Ataw"]["msgbox"]["show"]){
            //    window["Ataw"]["msgbox"]["show"](" 正在努力加载数据，请稍后..." + "<i class='icon-refresh icon-spin icon-large'></i>", 6);
            //}
            if (!fun) {
                // $("#ACT-Loading").addClass("hide");
                if ($("#ACT-BootPage").is(":hidden")) {
                    $("#ACT-Loading").show();
                }
            }
            else {

                if ($("#ACT-BootPage").is(":hidden")) {
                    const _fun: any = fun;
                    $("#ACT-Loading").show(0, _fun);
                }

            }
            //  $("#ACT-BootPage").show();
            // $("#ACT-Loading").removeClass("hide");
        }
        else {
            //if (window["Ataw"] && window["Ataw"]["msgbox"] && window["Ataw"]["msgbox"]["hide"]) {
            //    window["Ataw"]["msgbox"]["hide"](0);
            //}
            $("#ACT-Loading").hide();
            // $("#ACT-BootPage").hide();
        }
    }

    export function ReactByOpt(opt: dom.Box) {
        const _reactType = (opt as any).ReactType?(opt as any).ReactType:opt.constructor["ReactType"];
        return _reactType ;
    }


    export async function AsyncJsPromise(strs: Array<string>) {

        return new Promise((relover, reject) => {

            AsyncJs(strs,
                function () {
                    // arguments
                    relover(arguments)
                }, reject);
        });
    }

    export function AsyncJs(strs: Array<string>, fun: Function, errorFun?: Function): void {
        if (window["AsyJsBaseUrl"]) {
            strs.forEach((str) => {
                str = window["AsybcBaseUrl"] + str;
            })
        }
        strs.forEach((url, i) => {
            var _len = url.length;
            if (_len > 3) {
                var _css = url.substring(_len - 3);
                if (_css == "css") {
                    strs[i] = url = "css!" + url;
                }
            }

        })

        window["require"](strs, fun, errorFun);
    }

    export function HexToString(str: string): string {

        // var str = this;
        var val = "";
        var arr: string[] = str.split(",");
        for (var i = 0; i < arr.length; i++) {
            val += String.fromCharCode(parseInt(arr[i]));
        }
        return val;

    }

    export function StringToHex(str: string): string {
        // var str = this;
        var val: string | number = "";
        for (var i = 0; i < str.length; i++) {
            if (val == "")
                val = str.charCodeAt(i);
            else
                val += "," + str.charCodeAt(i);
        }
        return val.toString();
    }

    //'hexToString': function () {

    //},

    export function isDate(str: string): boolean {
        if (str) {
            var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (r == null) return false;
            var year = parseInt(r[1]);
            var month = parseInt(r[3]);
            var date = parseInt(r[4]);
            var d = new Date(year, month - 1, date);
            return (d.getFullYear() == year && (d.getMonth() + 1) == month && d.getDate() == date);
        }
        return false;
    }

    export function isDateTime(str: string): boolean {
        if (!str) return false;
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        var r = str.match(reg);
        if (r == null) return false;
        var year = parseInt(r[1]);
        var month = parseInt(r[3]);
        var date = parseInt(r[4]);
        var hours = parseInt(r[5]);
        var minutes = parseInt(r[6]);
        var seconds = parseInt(r[7]);
        var d = new Date(year, month - 1, date, hours, minutes, seconds);
        return (d.getFullYear() == year && (d.getMonth() + 1) == month && d.getDate() == date && d.getHours() == hours && d.getMinutes() == minutes && d.getSeconds() == seconds);
    }

    export function parse(time): Date {
        if (typeof (time) == 'string') {
            if (time.indexOf('GMT') > 0 || time.indexOf('gmt') > 0 || !isNaN(Date.parse(time))) {
                return this.parseGMT(time);
            } else if (time.indexOf('UTC') > 0 || time.indexOf('utc') > 0 || time.indexOf(',') > 0) {
                return this.parseUTC(time);
            } else {
                return this.parseCommon(time);
            }
        }
        return new Date();
    }

    export function parseGMT(time) {
        return new Date(Date.parse(time));
    }

    export function parseUTC(time): Date {
        return (new Date(time));
    }

    export function parseCommon(time): Date {
        var d = time.split(/ |T/), d1 = d.length > 1 ? d[1].split(/[^\d]/) : [0, 0, 0], d0 = d[0].split(/[^\d]/);
        return new Date(d0[0] - 0, d0[1] - 1, d0[2] - 0, d1[0] - 0, d1[1] - 0, d1[2] - 0);
    }
    export function isString(val) {
        return (typeof (val)) == "string";
    }

    //-------------------设置http文件名
    export const AddUrlFileName = function (url, wh) {
        var _index = url.lastIndexOf(".");
        var _path = url.substring(0, _index);
        var _ext = url.substring(_index, url.length);
        var _f = _path + "_" + wh + _ext;
        return _f + "?f=" + new Date().getTime();
    }

    //------------------名字截取字符串显示点点点
    //str：字符串
    //num：从开始位置保留几个字符
    export const InterceptStringDisplay = function (str, num) {
        var end = str.length - 1;
        //看是否带扩展名，带了就保留扩展名
        var endExtension = str.lastIndexOf(".");
        end = endExtension == -1 ? end : endExtension;
        //需要被替换成点点点的字符串
        var rStr = str.substring(num, end);
        //返回新的字符串
        return str.replace(rStr, "...");
    }
  import CircularJSON from 'circular-json'
    export const circularJson = (obj)=>{
          return CircularJSON.stringify(obj,null,2);
    }

    export const json = (obj,replacer?: (key: string, value: any) => any , space?: string | number ) => {
        replacer =replacer?replacer:null;
        space = space ?space:2;
        return JSON.stringify(obj,replacer,space);
    }

    export const parseJson = (str) => {
        return JSON.parse(str);
    }

    export function intersection(a: string[], b: string[]): string[] { // 交集
        var result = [];
        for (var i = 0; i < b.length; i++) {
            var temp = b[i];
            for (var j = 0; j < a.length; j++) {
                if (temp === a[j]) {
                    result.push(temp);
                    break;
                }
            }
        }
        return qc(result);
    }

    function qc(a: string[]) { // 去重
        var r = [];
        for (var i = 0; i < a.length; i++) {
            var flag = true;
            var temp = a[i];
            for (var j = 0; j < r.length; j++) {
                if (temp === r[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                r.push(temp);
            }
        }
        return r;
    }

    export function DateFormat(date: Date, fmt: string) { //author: meizz   
        var o = {
            "M+": date.getMonth() + 1,                 //月份   
            "d+": date.getDate(),                    //日   
            "h+": date.getHours(),                   //小时   
            "m+": date.getMinutes(),                 //分   
            "s+": date.getSeconds(),                 //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
            "S": date.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    export function IsPure(value): boolean {
        return Object.keys(value).length === 0;
    }

    export function CopyString(str: string) {
        if (window["clipboardData"] && window["clipboardData"].setData) {
            // 解决 IE 下的问题
            return window["clipboardData"].setData("Text", str);

        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            let htmlArea = document.createElement("textarea");
            htmlArea.style.position = 'fixed';
            htmlArea.style.top = '0px';
            htmlArea.style.left = '0px';
            htmlArea.style.width = '2em';
            htmlArea.style.left = '2em';
            htmlArea.style.padding = '0px';
            htmlArea.style.border = '0px';
            htmlArea.style.outline = '0px';
            htmlArea.style.boxShadow = 'none';
            htmlArea.style.background = 'transparent';

            htmlArea.value = str;
            document.body.appendChild(htmlArea);
            htmlArea.select();
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? '成功' : '失败';
                alert(`拷贝html${msg}，请复制到编辑器查看`);
            } catch (e) {
                alert(`拷贝${msg}，尝试其他浏览器`);
            } finally {
                document.body.removeChild(htmlArea);
            }
        }
    }










export const reqCss = function (strs: Array<string>, fun?: Function) {
    if (!fun) fun = () => { };
    AsyncJs(strs, fun);

}

export interface IParseJsonResult {
    Result?: any;
    IsSucess: boolean;
    SourceString: string;
}

export const parseJSON = function (strings: string): IParseJsonResult {
    try {
        let _res = $.parseJSON(strings);
        return {
            Result: _res,
            IsSucess: true,
            SourceString: strings
        }
    }
    catch (ex) {
        console.log("... json 转换异常 ...");
        console.log(ex);
        return {
            IsSucess: false,
            SourceString: strings
        };
    }
}

export const unmountDom = function (dom: Element) {
    // $(dom).find("[data-reactroot]").each()

    $(dom).find("[data-reactroot]").each((index, colDom) => {
        let _$dom = $(colDom).parent();
        let _res = ReactDOM.unmountComponentAtNode(_$dom[0]);
        // alert(_res);
    });
    if (!(typeof ($(dom).attr("data-reactroot")) == "undefined")) {

        let _res = ReactDOM.unmountComponentAtNode($(dom).parent()[0]);
        // alert(_res);
    }


}

export const checkHtml = function (htmlStr: string) {
    var reg = /<[^>]+>/g;
    return reg.test(htmlStr);
}

export const getHtmlText = function (htmlStr: string) {
    try {
        if (checkHtml(htmlStr)) {
            return $(htmlStr).text();
        }
        else {
            return htmlStr;
        }
    }
    catch (htmlEx) {
        return htmlStr;
    }
}