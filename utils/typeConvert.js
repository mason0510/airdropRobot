var num1=parseFloat("1234blue");    //1234

var num2=parseFloat("0xA");         //0

var num3=parseFloat("0908.5");      //908.5

var num4=parseFloat("3.125e7");     //31250000

var num5=parseFloat("123.45.67")    //123.45

var num6=parseFloat("")             //NaN

var num7=parseFloat("num123")       //NaN

var num8=parseFloat("0.5000 EOS")       //NaN
var num9=parseFloat("1.0000 EOS")       //NaN
var num10=parseFloat("5.0000 EOS")       //NaN
var num11=parseFloat("50.0000 EOS")       //NaN
// console.log(num8*10000);
// console.log(num9*10000);
// console.log(num10*10000);
let test=num11*10000
console.log(typeof test.toString());

