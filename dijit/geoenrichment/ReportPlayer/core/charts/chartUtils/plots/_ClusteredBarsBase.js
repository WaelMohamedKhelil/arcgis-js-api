// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","dojo/has","dojox/charting/plot2d/CartesianBase","dojox/charting/plot2d/_PlotEvents","dojox/charting/plot2d/common","dojox/lang/utils","dojox/lang/functional","dojox/lang/functional/reversed","./labelsRendering/_BarsLabelRenderingFix","./animation/_ClusteredBarsAnimation","./_MinVisibleBar"],function(e,t,i,r,a,s,n,o,h,l,u,c,d){var m=l.lambda("item.purgeGroup()");return i("dojox.charting.plot2d.Bars",[a,s,u,c,d],{_mainShapes:null,_animationInfos:null,defaultParams:{gap:0,animate:null,enableCache:!1},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},filter:{},styleFunc:null,font:"",fontColor:"",labelHorizontalAlign:null},constructor:function(t,i){this.opt=e.clone(e.mixin(this.opt,this.defaultParams)),o.updateWithObject(this.opt,i),o.updateWithPattern(this.opt,i,this.optionalParams),this.animate=this.opt.animate,this.renderingOptions={"shape-rendering":"crispEdges"}},getSeriesStats:function(){var e,t=n.collectSimpleStats(this.series,function(e){return null==e});return t.hmin-=.5,t.hmax+=.5,e=t.hmin,t.hmin=t.vmin,t.vmin=e,e=t.hmax,t.hmax=t.vmax,t.vmax=e,t},render:function(e,i){if(!this.chart.isPreRenderMode){if(this.zoom&&!this.isDataDirty())return this.performZoom(e,i);this.dirty=this.isDirty(),this.resetEvents();var a;this.dirty&&(t.forEach(this.series,m),this._eventSeries={},this.cleanGroup(),a=this.getGroup(),h.forEachRev(this.series,function(e){e.cleanGroup(a)}));var s=this.chart.theme,n=this._hScaler.scaler.getTransformerFromModel(this._hScaler),o=this._vScaler.scaler.getTransformerFromModel(this._vScaler),l=Math.max(s.series.baseLineValue||0,this._hScaler.bounds.lower),u=n(l),c=this.events(),d=this.getBarProperties();this._mainShapes=[],this._animationInfos=[];var f=this.extractValues(this._vScaler);f=this.rearrangeValues(f,n,u);for(var p=this.series.length-1;p>=0;--p){var g=this.series[p];if(this.dirty||g.dirty){g.cleanGroup(),this.opt.enableCache&&(g._rectFreePool=(g._rectFreePool?g._rectFreePool:[]).concat(g._rectUsePool?g._rectUsePool:[]),g._rectUsePool=[]);var v=s.next("bar",[this.opt,g]);if(g.hidden)g.dyn.fill=v.series.fill,g.dyn.stroke=v.series.stroke;else{var _=new Array(g.data.length);a=g.group;for(var y=t.some(g.data,function(e){return"number"==typeof e||e&&!e.hasOwnProperty("x")}),x=y?Math.max(0,Math.floor(this._vScaler.bounds.from-1)):0,b=y?Math.min(g.data.length,Math.ceil(this._vScaler.bounds.to)):g.data.length,S=x;S<b;++S){var M=g.data[S];if(null!=M){var P,B=this.getValue(M,S,p,y),j=(n(B.y),f[p][S]);if(this.opt.styleFunc||"number"!=typeof M){var z="number"!=typeof M?[M]:[];this.opt.styleFunc&&z.push(this.opt.styleFunc(M)),P=s.addMixin(v,"bar",z,!0)}else P=s.post(v,"bar");if(d.height>=1){var F={x:i.l+u+Math.min(j,0),y:e.height-i.b-o(B.x+1.5)+d.gap+d.thickness*this._getYShift(p,s),width:Math.abs(j),height:d.height},V=this._drawBar(a,M,F,P,e,i,g,u),C=V.shape;if(this._mainShapes.push(C),F=V.rect,c){var w={element:"bar",index:S,run:g,shape:C,cx:B.y,cy:B.x+1.5,x:y?S:g.data[S].x,y:y?g.data[S]:g.data[S].y};this._connectEvents(w),_[S]=w}if(this.createLabel(a,M,F,P,e,i),this.animate){var E={shape:C,hoffset:i.l+u,hsize:-j};this._animationInfos.push(E),this._animateBar(E)}}}}this._eventSeries[g.name]=_,g.dirty=!1}}else s.skip(),this._reconnectEvents(g.name)}return this._renderLabels(P,e,i,a),this.dirty=!1,r("dojo-bidi")&&this._checkOrientation(this.group,e,i),this}},getMainShapes:function(){return this._mainShapes},_drawBar:function(e,t,i,r,a,s,n,o){},_getYShift:function(e,t){return t.series.renderColumnBarsInOppositeDirections&&e>=this.series.length/2?e-this.series.length/2:e},getValue:function(e,t,i,r){var a,s;return r?(a="number"==typeof e?e:e.y,s=t):(a=e.y,s=e.x-1),{y:a,x:s}},extractValues:function(e){for(var i=[],r=this.series.length-1;r>=0;--r){var a=this.series[r];if(this.dirty||a.dirty){var s=t.some(a.data,function(e){return"number"==typeof e||e&&!e.hasOwnProperty("x")}),n=s?Math.max(0,Math.floor(e.bounds.from-1)):0,o=s?Math.min(a.data.length,Math.ceil(e.bounds.to)):a.data.length,h=i[r]=[];h.min=n,h.max=o;for(var l=n;l<o;++l){var u=a.data[l];h[l]=this.isNullValue(u)?0:"number"==typeof u?u:u.y}}}return i},rearrangeValues:function(e,t,i){for(var r=0,a=e.length;r<a;++r){var s=e[r];if(s)for(var n=s.min,o=s.max;n<o;++n){var h=s[n];s[n]=this.isNullValue(h)?0:t(h)-i}}return e},getBarProperties:function(){var e=n.calculateBarSize(this._vScaler.bounds.scale,this.opt,this._getClusterSize());return{gap:e.gap,height:e.size,thickness:e.size}},_getClusterSize:function(){var e=this.series.length;return t.forEach(this.series,function(t){t.hidden&&e--}),this.chart.theme.series.renderColumnBarsInOppositeDirections?Math.round(e/2):e}})});