/**
 * 自定义 Math 方法
 * addition 加法
 * subtraction 减法
 * multiplication 乘法
 * division 除法
 */
var iMath = /** @class */ (function () {
    function iMath() {
    }
    //问题比如：7*0.8 JavaScript算出来就是：5.6000000000000005
    //加法函数，用来得到精确的加法结果
    //说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
    //调用：accAdd(arg1,arg2)
    //返回值：arg1加上arg2的精确结果
    iMath.prototype.accAdd = function (arg1, arg2) {
        var _a = arg1.toString().split('.'), intNum1 = _a[0], _b = _a[1], decNum1 = _b === void 0 ? '' : _b;
        var _c = arg2.toString().split('.'), intNum2 = _c[0], _d = _c[1], decNum2 = _d === void 0 ? '' : _d;
        var mul = Math.pow(10, Math.max(decNum1.length, decNum2.length));
        return (arg1 * mul + arg2 * mul) / mul;
    };
    //减法函数，用来得到精确的减法结果
    iMath.prototype.accSub = function (arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        //last modify by deeka
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    };
    //乘法函数，用来得到精确的乘法结果
    //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
    //调用：accMul(arg1,arg2)
    //返回值：arg1乘以arg2的精确结果
    iMath.prototype.accMul = function (arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) { }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    };
    //除法函数，用来得到精确的除法结果
    //说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
    //调用：accDiv(arg1,arg2)
    //返回值：arg1除以arg2的精确结果
    iMath.prototype.accDiv = function (arg1, arg2) {
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) { }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) { }
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    };
    return iMath;
}());
//用法：
//给Number类型增加一个add方法，调用起来更加方便。
// Number.prototype.add = function (arg) {
//     return accAdd(arg, this);
// }
//用法：
//给Number类型增加一个mul方法，调用起来更加方便。
// Number.prototype.mul = function (arg) {
//     return accMul(arg, this);
// }