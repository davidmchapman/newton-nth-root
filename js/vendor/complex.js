/*
Complex.js v2.0.1 11/02/2016
Copyright (c) 2016, Robert Eisele (robert@xarg.org)
Dual licensed under the MIT or GPL Version 2 licenses.
*/
'use strict';(function(p){function l(a,b){if(void 0===a||null===a)e.re=e.im=0;else if(void 0!==b)e.re=a,e.im=b;else switch(typeof a){case "object":"im"in a&&"re"in a?(e.re=a.re,e.im=a.im):"abs"in a&&"arg"in a?(e.re=a.abs*Math.cos(a.arg),e.im=a.abs*Math.sin(a.arg)):"r"in a&&"phi"in a?(e.re=a.r*Math.cos(a.phi),e.im=a.r*Math.sin(a.phi)):m();break;case "string":e.im=e.re=0;var c=a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),d=1,f=0;null===c&&m();for(var g=0;g<c.length;g++){var k=c[g];" "!==k&&"\t"!==
k&&"\n"!==k&&("+"===k?d++:"-"===k?f++:("i"===k||"I"===k?(0===d+f&&m()," "===c[g+1]||isNaN(c[g+1])?e.im+=parseFloat((f%2?"-":"")+"1"):(e.im+=parseFloat((f%2?"-":"")+c[g+1]),g++)):((0===d+f||isNaN(k))&&m(),"i"===c[g+1]||"I"===c[g+1]?(e.im+=parseFloat((f%2?"-":"")+k),g++):e.re+=parseFloat((f%2?"-":"")+k)),d=f=0))}0<d+f&&m();break;case "number":e.im=0;e.re=a;break;default:m()}}function m(){throw SyntaxError("Invalid Param");}function n(a,b){var c=Math.abs(a),d=Math.abs(b);return 0===a?Math.log(d):0===
b?Math.log(c):3E3>c&&3E3>d?.5*Math.log(a*a+b*b):Math.log(a/Math.cos(Math.atan2(b,a)))}function d(a,b){if(!(this instanceof d))return new d(a,b);l(a,b);this.re=e.re;this.im=e.im}var e={re:0,im:0};Math.cosh=Math.cosh||function(a){return.5*(Math.exp(a)+Math.exp(-a))};Math.sinh=Math.sinh||function(a){return.5*(Math.exp(a)-Math.exp(-a))};Math.hypot=Math.hypot||function(a,b){var c=Math.abs(a),d=Math.abs(b);if(3E3>c&&3E3>d)return Math.sqrt(c*c+d*d);c<d?(c=d,d=a/b):d=b/a;return c*Math.sqrt(1+d*d)};d.prototype=
{re:0,im:0,sign:function(){var a=this.abs();return new d(this.re/a,this.im/a)},add:function(a,b){l(a,b);return new d(this.re+e.re,this.im+e.im)},sub:function(a,b){l(a,b);return new d(this.re-e.re,this.im-e.im)},mul:function(a,b){l(a,b);return 0===e.im&&0===this.im?new d(this.re*e.re,0):new d(this.re*e.re-this.im*e.im,this.re*e.im+this.im*e.re)},div:function(a,b){l(a,b);a=this.re;b=this.im;var c=e.re,h=e.im,f;if(0===c&&0===h)return new d(0!==a?a/0:0,0!==b?b/0:0);if(0===h)return new d(a/c,b/c);if(Math.abs(c)<
Math.abs(h))return f=c/h,c=c*f+h,new d((a*f+b)/c,(b*f-a)/c);f=h/c;c=h*f+c;return new d((a+b*f)/c,(b-a*f)/c)},pow:function(a,b){l(a,b);a=this.re;b=this.im;if(0===a&&0===b)return new d(0,0);var c=Math.atan2(b,a),h=n(a,b);if(0===e.im){if(0===b&&0<=a)return new d(Math.pow(a,e.re),0);if(0===a)switch(e.re%4){case 0:return new d(Math.pow(b,e.re),0);case 1:return new d(0,Math.pow(b,e.re));case 2:return new d(-Math.pow(b,e.re),0);case 3:return new d(0,-Math.pow(b,e.re))}}a=Math.exp(e.re*h-e.im*c);b=e.im*h+
e.re*c;return new d(a*Math.cos(b),a*Math.sin(b))},sqrt:function(){var a=this.re,b=this.im,c=this.abs(),e;if(0<=a&&0===b)return new d(Math.sqrt(a),0);e=0<=a?.5*Math.sqrt(2*(c+a)):Math.abs(b)/Math.sqrt(2*(c-a));a=0>=a?.5*Math.sqrt(2*(c-a)):Math.abs(b)/Math.sqrt(2*(c+a));return new d(e,0>b?-a:a)},exp:function(){var a=Math.exp(this.re);return new d(a*Math.cos(this.im),a*Math.sin(this.im))},log:function(){var a=this.re,b=this.im;return new d(n(a,b),Math.atan2(b,a))},abs:function(){return Math.hypot(this.re,
this.im)},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){var a=this.re,b=this.im;return new d(Math.sin(a)*Math.cosh(b),Math.cos(a)*Math.sinh(b))},cos:function(){var a=this.re,b=this.im;return new d(Math.cos(a)*Math.cosh(b),-Math.sin(a)*Math.sinh(b))},tan:function(){var a=2*this.re,b=2*this.im,c=Math.cos(a)+Math.cosh(b);return new d(Math.sin(a)/c,Math.sinh(b)/c)},cot:function(){var a=2*this.re,b=2*this.im,c=Math.cos(a)-Math.cosh(b);return new d(-Math.sin(a)/c,Math.sinh(b)/c)},sec:function(){var a=
this.re,b=this.im,c=.5*Math.cosh(2*b)+.5*Math.cos(2*a);return new d(Math.cos(a)*Math.cosh(b)/c,Math.sin(a)*Math.sinh(b)/c)},csc:function(){var a=this.re,b=this.im,c=.5*Math.cosh(2*b)-.5*Math.cos(2*a);return new d(Math.sin(a)*Math.cosh(b)/c,-Math.cos(a)*Math.sinh(b)/c)},asin:function(){var a=this.re,b=this.im,c=(new d(b*b-a*a+1,-2*a*b)).sqrt(),a=(new d(c.re-b,c.im+a)).log();return new d(a.im,-a.re)},acos:function(){var a=this.re,b=this.im,c=(new d(b*b-a*a+1,-2*a*b)).sqrt(),a=(new d(c.re-b,c.im+a)).log();
return new d(Math.PI/2-a.im,a.re)},atan:function(){var a=this.re,b=this.im;if(0===a){if(1===b)return new d(0,Infinity);if(-1===b)return new d(0,-Infinity)}var c=a*a+(1-b)*(1-b),a=(new d((1-b*b-a*a)/c,-2*a/c)).log();return new d(-.5*a.im,.5*a.re)},acot:function(){var a=this.re,b=this.im;if(0===b)return new d(Math.atan2(1,a),0);var c=a*a+b*b;return 0!==c?(new d(a/c,-b/c)).atan():(new d(0!==a?a/0:0,0!==b?-b/0:0)).atan()},asec:function(){var a=this.re,b=this.im;if(0===a&&0===b)return new d(0,Infinity);
var c=a*a+b*b;return 0!==c?(new d(a/c,-b/c)).acos():(new d(0!==a?a/0:0,0!==b?-b/0:0)).acos()},acsc:function(){var a=this.re,b=this.im;if(0===a&&0===b)return new d(Math.PI/2,Infinity);var c=a*a+b*b;return 0!==c?(new d(a/c,-b/c)).asin():(new d(0!==a?a/0:0,0!==b?-b/0:0)).asin()},sinh:function(){var a=this.re,b=this.im;return new d(Math.sinh(a)*Math.cos(b),Math.cosh(a)*Math.sin(b))},cosh:function(){var a=this.re,b=this.im;return new d(Math.cosh(a)*Math.cos(b),Math.sinh(a)*Math.sin(b))},tanh:function(){var a=
2*this.re,b=2*this.im,c=Math.cosh(a)+Math.cos(b);return new d(Math.sinh(a)/c,Math.sin(b)/c)},coth:function(){var a=2*this.re,b=2*this.im,c=Math.cosh(a)-Math.cos(b);return new d(Math.sinh(a)/c,-Math.sin(b)/c)},csch:function(){var a=this.re,b=this.im,c=Math.cos(2*b)-Math.cosh(2*a);return new d(-2*Math.sinh(a)*Math.cos(b)/c,2*Math.cosh(a)*Math.sin(b)/c)},sech:function(){var a=this.re,b=this.im,c=Math.cos(2*b)+Math.cosh(2*a);return new d(2*Math.cosh(a)*Math.cos(b)/c,-2*Math.sinh(a)*Math.sin(b)/c)},asinh:function(){var a=
this.im;this.im=-this.re;this.re=a;var b=this.asin();this.re=-this.im;this.im=a;a=b.re;b.re=-b.im;b.im=a;return b},acosh:function(){var a,b=this.acos();0>=b.im?(a=b.re,b.re=-b.im,b.im=a):(a=b.im,b.im=-b.re,b.re=a);return b},atanh:function(){var a=this.re,b=this.im,c=1<a&&0===b,e=1-a,f=1+a,g=e*e+b*b,a=0!==g?new d((f*e-b*b)/g,(b*e+f*b)/g):new d(-1!==a?a/0:0,0!==b?b/0:0),b=a.re;a.re=n(a.re,a.im)/2;a.im=Math.atan2(a.im,b)/2;c&&(a.im=-a.im);return a},acoth:function(){var a=this.re,b=this.im;if(0===a&&
0===b)return new d(0,Math.PI/2);var c=a*a+b*b;return 0!==c?(new d(a/c,-b/c)).atanh():(new d(0!==a?a/0:0,0!==b?-b/0:0)).atanh()},acsch:function(){var a=this.re,b=this.im;if(0===b)return new d(0!==a?Math.log(a+Math.sqrt(a*a+1)):Infinity,0);var c=a*a+b*b;return 0!==c?(new d(a/c,-b/c)).asinh():(new d(0!==a?a/0:0,0!==b?-b/0:0)).asinh()},asech:function(){var a=this.re,b=this.im;if(0===a&&0===b)return new d(Infinity,0);var c=a*a+b*b;return 0!==c?(new d(a/c,-b/c)).acosh():(new d(0!==a?a/0:0,0!==b?-b/0:0)).acosh()},
inverse:function(){var a=this.re,b=this.im,c=a*a+b*b;return new d(0!==a?a/c:0,0!==b?-b/c:0)},conjugate:function(){return new d(this.re,-this.im)},neg:function(){return new d(-this.re,-this.im)},ceil:function(a){a=Math.pow(10,a||0);return new d(Math.ceil(this.re*a)/a,Math.ceil(this.im*a)/a)},floor:function(a){a=Math.pow(10,a||0);return new d(Math.floor(this.re*a)/a,Math.floor(this.im*a)/a)},round:function(a){a=Math.pow(10,a||0);return new d(Math.round(this.re*a)/a,Math.round(this.im*a)/a)},equals:function(a,
b){l(a,b);return Math.abs(e.re-this.re)<=d.EPSILON&&Math.abs(e.im-this.im)<=d.EPSILON},clone:function(){return new d(this.re,this.im)},toString:function(){var a=this.re,b=this.im,c="";if(isNaN(a)||isNaN(b))return"NaN";0!==a&&(c+=a);0!==b&&(0!==a?c+=0>b?" - ":" + ":0>b&&(c+="-"),b=Math.abs(b),1!==b&&(c+=b),c+="i");return c?c:"0"},toVector:function(){return[this.re,this.im]},valueOf:function(){return 0===this.im?this.re:null}};d.ZERO=new d(0,0);d.ONE=new d(1,0);d.I=new d(0,1);d.PI=new d(Math.PI,0);
d.E=new d(Math.E,0);d.EPSILON=1E-16;"function"===typeof define&&define.amd?define([],function(){return d}):"object"===typeof exports?module.exports=d:p.Complex=d})(this);