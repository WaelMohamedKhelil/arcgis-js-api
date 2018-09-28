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

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/ObjectPool","../../core/libs/gl-matrix/mat4","../../core/libs/gl-matrix/vec2","../../geometry/support/spatialReferenceUtils","../2d/engine/DisplayObject","../2d/tiling/enums","../2d/tiling/TileKey","./RenderBucket","../webgl/BufferObject"],function(e,t,r,a,i,s,n,f,l,u,o,c){var h=["fillVertexBuffer","fillDDVertexBuffer","fillIndexBuffer","outlineVertexBuffer","outlineDDVertexBuffer","outlineIndexBuffer","lineVertexBuffer","lineDDVertexBuffer","lineIndexBuffer","iconVertexBuffer","iconDDVertexBuffer","iconIndexBuffer","textVertexBuffer","textDDVertexBuffer","textIndexBuffer","circleVertexBuffer","circleIndexBuffer"];return function(e){function t(){for(var t,r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];var n=e.call(this)||this;return n._renderBuckets=[],n._vectorTileData=null,n._symbolUpdateData=null,n.status=l.TileStatus.INITIALIZED,n.coords=[0,0],n.bounds=[0,0,0,0],n.tileTransform={transform:Float32Array[16],displayCoord:Float32Array[2]},n.stencilData={mask:0,reference:0},n.status=l.TileStatus.INITIALIZED,n.tileTransform.transform=i.create(),n.tileTransform.displayCoord=s.create(),r.length>0&&(t=n.acquire).call.apply(t,[n].concat(r)),n}return r(t,e),t.prototype.reset=function(){u.pool.release(this.key),this.key=null,this.refKey=null,this.coords[0]=0,this.coords[1]=0,this.bounds[0]=0,this.bounds[1]=0,this.bounds[2]=0,this.bounds[3]=0,this.width=0,this.height=0,this.resolution=null,this.rotation=0,this._vectorTileData=null,this.styleLayers=null,this.client=null,this.id=null,this.tileTransform.transform.fill(0),this.tileTransform.displayCoord.fill(0),this.stencilData.mask=0,this.stencilData.reference=0,this._renderBuckets.length=0,this._symbolUpdateData=null,this.status=l.TileStatus.INITIALIZED},t.prototype.acquire=function(e,t,r,a,i){this.key=e,this.refKey=t;var s=r.lodAt(e.level),f=null!==s?s.resolution:0,l=r.size[0]*f,u=r.origin,o=e.col*l,c=e.row*l,h=r.spatialReference,d=h&&(h._isWrappable?h._isWrappable():h.isWrappable),x=0;if(d){var D=n.getInfo(h);x=D.valid[1]-D.valid[0]}var B=e.world*x,y=u.x+o+B,p=u.y-c,b=y+l,v=p-l;this.coords[0]=y,this.coords[1]=p,this.bounds[0]=y,this.bounds[1]=p,this.bounds[2]=b,this.bounds[3]=v,this.widthInPixels=r.size[1],this.coordRange=4096,this.resolution=f,this.rotation=i,this.styleLayers=a,this.id=e.id},t.prototype.setData=function(e,t){this._vectorTileData=e,this.client=t,e&&e.bufferDataInfo||(this.status=l.TileStatus.NO_DATA)},t.prototype.updateSymbolData=function(e){e&&(this._symbolUpdateData=e,this.requestRender())},t.prototype.dispose=function(){for(var e=["fillVertexArrayObject","fillDDVertexArrayObject","outlineVertexArrayObject","lineVertexArrayObject","lineDDVertexArrayObject","iconVertexArrayObject","iconDDVertexArrayObject","textVertexArrayObject","textDDVertexArrayObject","circleVertexArrayObject","fillVertexBuffer","fillDDVertexBuffer","fillIndexBuffer","outlineVertexBuffer","outlineDDVertexBuffer","outlineIndexBuffer","lineVertexBuffer","lineDDVertexBuffer","lineIndexBuffer","iconVertexBuffer","iconDDVertexBuffer","iconIndexBuffer","textVertexBuffer","textDDVertexBuffer","textIndexBuffer","circleVertexBuffer","circleIndexBuffer","texture"],t=0;t<e.length;++t){var r=e[t];this[r]&&(this[r].dispose(),this[r]=null)}this._renderBuckets.length=0,this.status=l.TileStatus.INITIALIZED},t.prototype.getCpuMemoryUsage=function(){return null!=this._vectorTileData&&this._vectorTileData.bufferData?this._vectorTileData.bufferData.reduce(function(e,t){return e+t.byteLength},0)+this._vectorTileData.bufferDataInfo.byteLength+this._vectorTileData.bucketDataInfo.byteLength:0},t.prototype.getGpuMemoryUsage=function(){var e=this,t=h.reduce(function(t,r){return e[r]?t+e[r].size:t},0);return this.texture&&(t+=this.texture.descriptor.width*this.texture.descriptor.height*4),t},t.prototype.attach=function(e){return this.status!==l.TileStatus.INITIALIZED||(this._createRenderBuckets(),this._createBufferObjects(e),this._vectorTileData=null,this.status=l.TileStatus.READY,!0)},t.prototype._createRenderBuckets=function(){if(0===this._renderBuckets.length)for(var e=new Uint32Array(this._vectorTileData.bucketDataInfo),t=e.length,r=0;r<t;){var a=e[r],i=e[r+1];switch(i){case 0:var s=new o.BackgroundRenderBucket;s.layerID=a,this._renderBuckets.push(s),r+=2;break;case 1:var n=new o.FillRenderBucket;n.layerID=a,n.triangleElementStart=e[r+2],n.triangleElementCount=e[r+3],n.outlineElementStart=e[r+4],n.outlineElementCount=e[r+5],this._renderBuckets.push(n),r+=6;break;case 2:var f=new o.LineRenderBucket;f.layerID=a,f.triangleElementStart=e[r+2],f.triangleElementCount=e[r+3],this._renderBuckets.push(f),r+=4;break;case 3:var l=new o.SymbolRenderBucket;l.layerID=a,l.isSDF=0!==e[r+2];var u=r+3,c=e[u];if(u++,c>0)for(var h=void 0,d=void 0,x=void 0,D=0;D<c;D++)h=e[u],d=e[u+1],x=e[u+2],l.markerPerPageElementsMap.set(h,[d,x]),u+=3;var B=u,y=e[B];if(B++,y>0)for(var h=void 0,d=void 0,x=void 0,D=0;D<y;D++)h=e[B],d=e[B+1],x=e[B+2],l.glyphPerPageElementsMap.set(h,[d,x]),B+=3;this._renderBuckets.push(l),r+=5+3*c+3*y;break;case 4:var p=new o.CircleRenderBucket;p.layerID=a,p.triangleElementStart=e[r+2],p.triangleElementCount=e[r+3],this._renderBuckets.push(p),r+=4;break;default:console.error("Bad bucket type!"),r+=2}}},t._createBufferToObject=function(){var e=[];return e[1]={create:c.createVertex,var:"fillVertexBuffer"},e[2]={create:c.createVertex,var:"fillDDVertexBuffer"},e[3]={create:c.createIndex,var:"fillIndexBuffer"},e[4]={create:c.createVertex,var:"outlineVertexBuffer"},e[5]={create:c.createVertex,var:"outlineDDVertexBuffer"},e[6]={create:c.createIndex,var:"outlineIndexBuffer"},e[7]={create:c.createVertex,var:"lineVertexBuffer"},e[9]={create:c.createIndex,var:"lineIndexBuffer"},e[10]={create:c.createVertex,var:"iconVertexBuffer"},e[11]={create:c.createVertex,var:"iconDDVertexBuffer"},e[12]={create:c.createIndex,var:"iconIndexBuffer"},e[13]={create:c.createVertex,var:"textVertexBuffer"},e[14]={create:c.createVertex,var:"textDDVertexBuffer"},e[15]={create:c.createIndex,var:"textIndexBuffer"},e[16]={create:c.createVertex,var:"circleVertexBuffer"},e[17]={create:c.createIndex,var:"circleIndexBuffer"},e},t.prototype._createBufferObjects=function(e){for(var r=e.context,a=new Uint32Array(this._vectorTileData.bufferDataInfo),i=a.length,s=0,n=0;n<i;n+=2,s++){var f=a[n];if(!(a[n+1]<=0||0===this._vectorTileData.bufferData[s].byteLength)){var l=t.bufferToObject[f];l?this[l.var]?this[l.var].setData(this._vectorTileData.bufferData[s]):this[l.var]=l.create(r,35044,this._vectorTileData.bufferData[s]):console.error("Bad buffer type "+f)}}},t.prototype.detach=function(t){this.client&&this.status!==l.TileStatus.INVALID&&this.status!==l.TileStatus.INITIALIZED&&this.client.invoke("destructTileData",this.id),this.dispose(),e.prototype.detach.call(this,t)},t.prototype.doRender=function(e){if(this.visible&&this.status===l.TileStatus.READY){var t=e.context,r=e.renderer;if(t&&r){var a=e.drawphase;this._symbolUpdateData&&this._updateSymbolData(e),t.setStencilFunction(514,this.stencilData.reference,this.stencilData.mask);var i=this.styleLayers,s=void 0!==e.layerOpacity?e.layerOpacity:1;if(0!==s){var n=this._renderBuckets.length;if(0===a)for(var f=n-1;f>=0;f--){var u=this._renderBuckets[f];1!==u.type&&0!==u.type||!u.hasData()||r.renderBucket(t,u,e.displayLevel,e.requiredLevel,a,this,i.layers[u.layerID],s)}else for(var f=0;f<n;f++){var u=this._renderBuckets[f];u.hasData()&&r.renderBucket(t,u,e.displayLevel,e.requiredLevel,a,this,i.layers[u.layerID],s)}}}}},t.prototype._updateSymbolData=function(e){if(!this._symbolUpdateData.bucketDataInfo)return!0;var t=new Uint32Array(this._symbolUpdateData.bucketDataInfo),r=t.length;if(0===r)return this._symbolUpdateData=null,!0;if(this.status!==l.TileStatus.READY)return this.requestRender(),!1;for(var a=e.context,i=new Uint32Array(this._symbolUpdateData.bufferDataInfo),s=i.length,n=0,f=0;f<s;f+=2,n++){switch(i[f]){case 10:this.iconVertexBuffer&&(this.iconVertexBuffer.dispose(),this.iconVertexBuffer=null),this.iconVertexBuffer=c.createVertex(a,35044,this._symbolUpdateData.bufferData[n]);break;case 11:this.iconDDVertexBuffer&&(this.iconDDVertexBuffer.dispose(),this.iconDDVertexBuffer=null),this.iconDDVertexBuffer=c.createVertex(a,35044,this._symbolUpdateData.bufferData[n]);break;case 12:this.iconIndexBuffer&&(this.iconIndexBuffer.dispose(),this.iconIndexBuffer=null),this.iconIndexBuffer=c.createIndex(a,35044,this._symbolUpdateData.bufferData[n]);break;case 13:this.textVertexBuffer&&(this.textVertexBuffer.dispose(),this.textVertexBuffer=null),this.textVertexBuffer=c.createVertex(a,35044,this._symbolUpdateData.bufferData[n]);break;case 14:this.textDDVertexBuffer&&(this.textDDVertexBuffer.dispose(),this.textDDVertexBuffer=null),this.textDDVertexBuffer=c.createVertex(a,35044,this._symbolUpdateData.bufferData[n]);break;case 15:this.textIndexBuffer&&(this.textIndexBuffer.dispose(),this.textIndexBuffer=null),this.textIndexBuffer=c.createIndex(a,35044,this._symbolUpdateData.bufferData[n])}}for(var u=this._renderBuckets.length,h=0;h<u;h++){if(this._renderBuckets[h]instanceof o.SymbolRenderBucket){var d=this._renderBuckets[h];d.markerPerPageElementsMap.clear(),d.glyphPerPageElementsMap.clear()}}for(var x,D,B=0;B<r;){var y=t[B];D=-1;for(var p=this._renderBuckets.length,h=0;h<p;h++)if(this._renderBuckets[h].layerID===y){D=h;break}x=this._renderBuckets[D],x||(x=new o.SymbolRenderBucket,x.layerID=y,x.isSDF=0!==t[B+2],this._renderBuckets.push(x));var b=B+3,v=t[b];if(b++,v>0)for(var V=void 0,I=void 0,_=void 0,k=0;k<v;k++)V=t[b],I=t[b+1],_=t[b+2],x.markerPerPageElementsMap.set(V,[I,_]),b+=3;var m=b,g=t[m];if(m++,g>0)for(var V=void 0,I=void 0,_=void 0,k=0;k<g;k++)V=t[m],I=t[m+1],_=t[m+2],x.glyphPerPageElementsMap.set(V,[I,_]),m+=3;B+=5+3*v+3*g}return this.iconVertexArrayObject&&(this.iconVertexArrayObject.dispose(),this.iconVertexArrayObject=null),this.iconDDVertexArrayObject&&(this.iconDDVertexArrayObject.dispose(),this.iconDDVertexArrayObject=null),this.textVertexArrayObject&&(this.textVertexArrayObject.dispose(),this.textVertexArrayObject=null),this.textDDVertexArrayObject&&(this.textDDVertexArrayObject.dispose(),this.textDDVertexArrayObject=null),this._symbolUpdateData=null,!0},t.pool=new a(t),t.bufferToObject=t._createBufferToObject(),t}(f)});