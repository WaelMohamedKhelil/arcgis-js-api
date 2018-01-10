// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../../../core/sniff","../../../../core/Logger","../lib/GLTextureRep","../lib/GLMaterialRep","../lib/ShaderSnippets","../lib/GLSLShaderRep","../lib/TextureRenderer","../lib/gl-matrix","../lib/webgl-utils","./Model","./Viewport","../materials/repository","../lib/SSAOHelperObscurance","../lib/HighlightHelper","../lib/RenderOccludedHelper","../lib/OffscreenRenderingHelper","../lib/tracer","../../../webgl/RenderingContext","../lib/ProgramRepository","../lighting/Lightsources","../../../support/screenshotUtils"],function(e,t,i,r,s,n,a,h,o,p,d,_,c,u,g,l,v,R,x,f,w,m,y){var C=p.vec3d,b=p.vec4d,S=r.getLogger("esri.views.3d.webgl-engine.parts.View"),L=function(){function e(e,t,i,r){var a=this;this._backgroundColor=b.createFrom(1,1,1,1),this._lightDirection=C.createFrom(0,1,0),this._didRender=!1,this._needsRender=!0,this._idleSuspend=!0,this._shouldRender=!1,this._screenCaptureQueue=[],this._container=e,this._stage=t,this._initializeContext(r),this._initializeShaders(r);var h=function(){return a._viewport.getCamera().viewport};this._textureRep=new s(t.getAll(_.ContentType.TEXTURE),this._programRepository,h,this._rctx),this._materialRep=new n(this._textureRep,this._programRepository),this._viewport=new c(this._programRepository,this._materialRep,this._textureRep,this._rctx),this._initializeViewportCamera(),this._textureRenderer=new o(this._rctx,this._canvas,this._programRepository,this._materialRep,this._textureRep,i),this._initializeFrameTask()}return e.prototype._initializeFrameTask=function(){var e=this;this._frameTask={preRender:function(){if(x.begin(),e._stage.processDirty(),e.needsRender()){e._shouldRender=!0;var t=e._viewport.getCamera();t.setGLViewport(e._rctx),e._rctx.setClearColor.apply(e._rctx,e._backgroundColor),e._rctx.clear(16640)}else e._shouldRender=!1},render:function(){e._shouldRender&&(e._didRender=!0,e._viewport.render(e._lightDirection,null))},postRender:function(){x.end()},update:function(){e._performScreenCaptures(),e.resetNeedsRender()}}},e.prototype._initializeViewportCamera=function(){var e=this._container.getBoundingClientRect(),t=this._viewport.getCamera();t.viewport[2]=e.width,t.viewport[3]=e.height,this._viewport.setCamera(t)},e.prototype._initializeContext=function(e){this._canvas=e.canvas,this._canvas||(this._canvas=document.createElement("canvas")),this._canvas.setAttribute("style","width: 100%; height:100%; display:block;");var t={alpha:e.alpha||!1,antialias:!1,depth:!0,stencil:null==e.stencil?!0:e.stencil},r=d.setupWebGL(this._canvas,t);this._gl=x.instrumentContext(r[0]);var s={disabledExtensions:e.deactivatedWebGLExtensions};this._rctx=new f(r[0],s),!e.alpha&&this._rctx.contextAttributes.alpha&&S.error("WebGL context has alpha channel even though no alpha channel was requested"),i("safari")>=11&&(this._container.style.backgroundColor="black"),this._container.appendChild(this._canvas)},e.prototype._initializeShaders=function(e){var t="global"===e.viewingMode?"#define VIEWING_MODE_GLOBAL 1 \n":" #define VIEWING_MODE_LOCAL 1 \n";this._shaderSnippets=new a({fsprecisionf:"\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\nprecision highp sampler2D;\n#else\nprecision mediump float;\nprecision mediump sampler2D;\n#endif\n",vsprecisionf:"\nprecision highp float;\nprecision highp sampler2D;\n",viewingMode:t}),this._shaderRep=new h,this._programRepository=new w,u.initializeShaders(this._shaderSnippets,this._shaderRep,this._programRepository,this._rctx),l.loadShaders(this._shaderSnippets,this._shaderRep,this._programRepository,this._rctx),v.loadShaders(this._shaderSnippets,this._shaderRep,this._programRepository,this._rctx),g.loadShaders(this._shaderSnippets,this._shaderRep,this._programRepository,this._rctx),R.loadShaders(this._shaderSnippets,this._shaderRep,this._programRepository,this._rctx)},e.prototype.dispose=function(){this._viewport.dispose(),this._viewport=null,this._textureRenderer.dispose(),this._textureRenderer=null,this._programRepository.dispose(),this._programRepository=null,this._container.contains(this._canvas)&&this._container.removeChild(this._canvas),this._container=null,this._canvas=null,this._gl=null},e.prototype.getCombinedStats=function(){return this._viewport.getCombinedStats()},e.prototype.setNeedsRender=function(){this._didRender=!1,this._needsRender=!0},e.prototype.resetNeedsRender=function(){this._didRender&&(this._needsRender=!1,this._didRender=!1),this._viewport.resetNeedsRender(),this._textureRep.resetNeedsRender()},e.prototype.needsRender=function(){return this._needsRender||!this._idleSuspend||this._viewport.needsRender()||this._textureRep.needsRender()},e.prototype.getFrameTask=function(){return this._frameTask},e.prototype.setLighting=function(e){C.set3(0,0,0,this._lightDirection);for(var t=0,i=e.lights;t<i.length;t++){var r=i[t];if(r instanceof m.MainLight){C.negate(r.direction,this._lightDirection);break}}this._viewport.setLighting(e),this._needsRender=!0},e.prototype.getMainLightDirection=function(){return this._lightDirection},e.prototype.getViewParams=function(e){var t=this._viewport.getViewParams(e);return(!e||e.backgroundColor)&&(t.backgroundColor=this._backgroundColor),t},e.prototype.setViewParams=function(e){this._needsRender=!0,e.backgroundColor&&(this._backgroundColor=e.backgroundColor),this._viewport.setViewParams(e)},e.prototype.setRenderParams=function(e){this._needsRender=!0,void 0!==e.idleSuspend&&(this._idleSuspend=!!e.idleSuspend),this._viewport.setRenderParams(e)},e.prototype.getRenderParams=function(){var e=this._viewport.getRenderParams();return e.anisotropicFiltering=this._textureRep.getMaxAnisotropy(),e.idleSuspend=this._idleSuspend,e},Object.defineProperty(e.prototype,"renderingContext",{get:function(){return this._rctx},enumerable:!0,configurable:!0}),e.prototype.has=function(e){return"s3tc"===e?!!this._rctx.extensions.compressedTextureS3TC:"standardDerivatives"===e?!!this._rctx.extensions.standardDerivatives:"shaderTextureLOD"===e?!!this._rctx.extensions.shaderTextureLOD:"angleInstancedArrays"===e?!!this._rctx.extensions.angleInstancedArrays:!1},e.prototype.getFrustumObjects=function(){return this._viewport.getFrustumObjects()},e.prototype.modify=function(e,t,i,r){this._viewport.modify(e,t,i,r)},e.prototype.setCamera=function(e){this._viewport.setCamera(e)},e.prototype.getCamera=function(){return this._viewport.getCamera()},e.prototype.getPickRay=function(e,t,i){this._viewport.getPickRay(e,t,i)},e.prototype.pickRayWithBeginPoint=function(e,t,i,r,s){this._viewport.pickRayWithBeginPoint(e,t,i,r,s)},e.prototype.getCanvas=function(){return this._canvas},e.prototype.getTextureGraphicsRenderer=function(){return this._textureRenderer},e.prototype.requestScreenCapture=function(e,t){this._screenCaptureQueue.push({settings:e||{},callback:t}),this._needsRender=!0},e.prototype.getAllTexturesLoaded=function(){return 0===this._textureRep.getLoadingCount()},e.prototype.getTextureLoaded=function(e){return this._textureRep.getIsLoaded(e)},e.prototype.addTextureListener=function(e){this._textureRep.addTextureListener(e)},e.prototype.removeTextureListener=function(e){this._textureRep.removeTextureListener(e)},e.prototype.addExternalRenderer=function(e,t){return this._viewport.addExternalRenderer(e,t)?(t.initializeRenderContext({rctx:this._rctx,gl:this._rctx.gl,shaderSnippets:this._shaderSnippets,shaderRep:this._shaderRep,programRep:this._programRepository,textureRep:this._textureRep}),!0):!1},e.prototype.removeExternalRenderer=function(e){return this._viewport.removeExternalRenderer(e)?(e.uninitializeRenderContext({rctx:this._rctx,gl:this._rctx.gl}),!0):!1},e.prototype._performScreenCaptures=function(){if(0!==this._screenCaptureQueue.length){for(var e=0;e<this._screenCaptureQueue.length;e++){var t=this._screenCaptureQueue[e],i={x:0,y:0,width:this._canvas.width,height:this._canvas.height},r={x:0,y:0,width:this._canvas.width,height:this._canvas.height},s=t.settings.area;if(s&&(i.x=s.x,i.y=s.y,i.width=s.width,i.height=s.height),void 0!==t.settings.width&&void 0!==t.settings.height){var n=t.settings.width/t.settings.height;if(i.height*n<i.width){var a=i.height*n;i.x+=Math.floor((i.width-a)/2),i.width=Math.floor(a)}else{var h=i.width/n;i.y+=Math.floor((i.height-h)/2),i.height=Math.floor(h)}r.width=t.settings.width,r.height=t.settings.height}else r.width=i.width,r.height=i.height;var o=this._canvas,p=null;if(0!==i.x||0!==i.y||i.width!==this._canvas.width||i.height!==this._canvas.height||0!==r.x||0!==r.y||r.width!==this._canvas.width||r.height!==this._canvas.height){this._resizeCanvas||(this._resizeCanvas=document.createElement("canvas")),this._resizeCanvas.width=r.width,this._resizeCanvas.height=r.height;var d=this._resizeCanvas.getContext("2d");p=new Uint8Array(i.width*i.height*4),this._gl.readPixels(i.x,this._canvas.height-(i.y+i.height),i.width,i.height,6408,5121,p);var _=d.getImageData(r.x,r.y,r.width,r.height);y.resampleHermite(p,i.width,i.height,_.data,r.width,r.height,!0),d.putImageData(_,r.x,r.y),o=this._resizeCanvas,d=null}var c={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg"}[t.settings.format?t.settings.format.toLowerCase():"png"],u=1;void 0!==t.settings.quality&&(u=t.settings.quality/100);var g=o.toDataURL(c,u),l={dataURL:g,x:r.x,y:r.y,width:r.width,height:r.height};t.settings.returnByteBuffer&&(l.data=p),t.callback(l)}this._screenCaptureQueue=[]}},e}();return L});