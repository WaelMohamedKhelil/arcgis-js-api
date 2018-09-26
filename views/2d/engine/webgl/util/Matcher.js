// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../../../../../core/Logger","../Utils","./vvFlagUtils"],function(e,t,r,i,a,n){Object.defineProperty(t,"__esModule",{value:!0});var l=i.getLogger("esri/views/2d/engine/webgl/util/Matcher"),o=function(){function e(){this._defaultResult=null}return e.fromSimpleRenderer=function(t,r,i){var a=t.getSymbols(),l=t.visualVariables,o=n.getVVFlags(l),u=new e;if(a.length){var s=i.createTemplateGroup(a[0],null,r,o);u.setDefault(s)}return u},e.prototype.size=function(){return 1},e.prototype.getDefault=function(){return this._defaultResult},e.prototype.setDefault=function(e){this._defaultResult=e},e.prototype.match=function(e,t){return this.getDefault()},e}();t.default=o;var u=function(e){function t(t,r,i,n){var l=e.call(this)||this;return l._intervals=[],l._isMaxInclusive=r,i?l._getValue=a.createArcadeFunction(i):t&&t.length?"function"==typeof t?(l._field=null,l._getValue=t):(l._field=t,l._normalizationInfo=n,l._getValue=l._getValueFromField.bind(l)):l._field=null,l}return r(t,e),t.fromCBRenderer=function(e,r,i,a,l){for(var o=e.isMaxInclusive,u=e.visualVariables,s=e.valueExpression,f=e.normalizationField,p=e.normalizationTotal,d=e.normalizationType,c=n.getVVFlags(u),h=e.field,v=s?{valueExpression:s,spatialReference:a,layer:{fields:l}}:null,m={normalizationField:f,normalizationTotal:p,normalizationType:d},g=new t(h,o,v,m),_=e.backgroundFillSymbol,y=0,V=e.classBreakInfos;y<V.length;y++){var z=V[y],b=z.symbol,F=i.createTemplateGroup(b,_,r,c),M={min:z.minValue,max:z.maxValue};g.add(M,F)}var x=e.defaultSymbol;if(x){var D=i.createTemplateGroup(x,_,r,c);g.setDefault(D)}return g},t.prototype.add=function(e,t){this._intervals.push({interval:e,result:t}),this._intervals.sort(function(e,t){return e.interval.min-t.interval.min})},t.prototype.size=function(){return e.prototype.size.call(this)+this._intervals.length},t.prototype.match=function(e,t){if(!this._getValue)return this.getDefault();var r=this._getValue(e,t);if(!r&&(null===r||void 0===r||isNaN(r)))return this.getDefault();for(var i=0;i<this._intervals.length;i++){var a=this._intervals[i],n=a.interval,l=a.result,o=r>=n.min,u=this._isMaxInclusive?r<=n.max:r<n.max;if(o&&u)return l}return this.getDefault()},t.prototype._needsNormalization=function(){var e=this._normalizationInfo;return e&&(e.normalizationField||e.normalizationTotal||e.normalizationType)},t.prototype._getValueFromField=function(e){var t=e.attributes[this._field];if(!this._needsNormalization())return t;var r=this._normalizationInfo,i=r.normalizationField,a=r.normalizationTotal,n=r.normalizationType,o=!!i&&e.attributes[i];if(!n)return void l.error("Normalization is required, but no type was set!");switch(n){case"field":return(o||void 0)&&t/o;case"log":return Math.log(t)*Math.LOG10E;case"percent-of-total":return t/a*100;default:return void l.error("Found unknown normalization type: "+n)}},t}(o);t.IntervalMatcher=u;var s=function(e){function t(t,r,i){var n=e.call(this)||this;return n._resultsMap=new Map,i?n._getValue=a.createArcadeFunction(i):t&&t.length?"function"==typeof t[0]?(n._fields=null,n._getValue=t[0]):(n._fields=t,n._seperator=r||"",n._getValue=n._getValueFromFields.bind(n)):n._fields=null,n}return r(t,e),t.fromUVRenderer=function(e,r,i,a,l){var o=e.uniqueValueInfos,u=e.visualVariables,s=n.getVVFlags(u),f=[e.field];e.field2&&f.push(e.field2),e.field3&&f.push(e.field3);for(var p=e.valueExpression,d=p?{valueExpression:p,spatialReference:a,layer:{fields:l}}:null,c=e.backgroundFillSymbol,h=new t(f,e.fieldDelimiter,d),v=0,m=o;v<m.length;v++){var g=m[v],_=i.createTemplateGroup(g.symbol,c,r,s);h.add(g.value,_)}if(e.defaultSymbol){var y=i.createTemplateGroup(e.defaultSymbol,c,r,s);h.setDefault(y)}return h},t.prototype.add=function(e,t){this._resultsMap.set(e.toString(),t)},t.prototype.size=function(){return e.prototype.size.call(this)+this._resultsMap.size},t.prototype.match=function(e,t){if(!this._getValue)return this.getDefault();var r=this._getValue(e,t);if(!r&&(null===r||void 0===r))return this.getDefault();var i=r.toString();return this._resultsMap.has(i)?this._resultsMap.get(i):this.getDefault()},t.prototype._getValueFromFields=function(e){for(var t=[],r=0,i=this._fields;r<i.length;r++){var a=i[r],n=e.attributes[a];t.push(n)}return t.join(this._seperator)},t}(o);t.MapMatcher=s});