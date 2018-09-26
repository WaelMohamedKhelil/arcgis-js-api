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

define(["require","exports","../../lib/gl-matrix","../../support/geometryUtils","../../support/mathUtils"],function(t,e,r,a,n){function c(t,e){if(!t){var r=new Error("dummy");throw r.stack&&console.log(r.stack),new ct(e)}}function o(t,e){t||(console.log("Verify failed: "+e),console.log(new Error("dummy").stack))}function i(t){return n.clamp(Math.round(32767*t),-32767,32767)}function u(t,e){var r=Math.abs(t[0]),a=Math.abs(t[1]),n=Math.abs(t[2]),c=1/(r+a+n),o=r*c,i=a*c,u=Math.min(t[2]*c,0);e[0]=(t[0]<0?-1:1)*(o-u),e[1]=(t[1]<0?-1:1)*(i-u)}function v(t,e){return void 0===t?e:t}function d(t){return t=Math.floor(t),[(t>>16&255)/255,(t>>8&255)/255,(255&t)/255]}function s(t){return"0x"+((n.clamp(Math.round(255*t[0]),0,255)<<16)+(n.clamp(Math.round(255*t[1]),0,255)<<8)+n.clamp(Math.round(255*t[2]),0,255)).toString(16)}function f(t){var e=t.toString(16);return"00000000".substr(0,8-e.length)+e}function l(t,e,a,n,c){a=a||nt;var o=r.vec3d.subtract(t,a,K),i=r.vec3d.dot(e,e),u=2*r.vec3d.dot(e,o),v=r.vec3d.dot(o,o)-n*n,d=u*u-4*i*v;if(d<0)return!1;var s=Math.sqrt(d),f=(-u-s)/(2*i),l=(-u+s)/(2*i);return(f<0||l<f&&l>0)&&(f=l),f>0&&(c&&r.vec3d.add(t,r.vec3d.scale(e,f,at),c),!0)}function m(t,e,a,n,c,o,i,u,v){void 0===v&&(v=r.vec3d.create());var d=n[i]-a[o],s=n[i+1]-a[o+1],f=n[i+2]-a[o+2],l=c[u]-a[o],m=c[u+1]-a[o+1],M=c[u+2]-a[o+2],h=e[1]*M-m*e[2],p=e[2]*l-M*e[0],y=e[0]*m-l*e[1],b=d*h+s*p+f*y;if(b>-1e-5&&b<1e-5)return!1;var x=1/b,g=t[0]-a[o],O=t[1]-a[o+1],P=t[2]-a[o+2];if(v[1]=x*(g*h+O*p+P*y),v[1]<0||v[1]>1)return!1;var F=O*f-s*P,S=P*d-f*g,A=g*s-d*O;return v[2]=x*(e[0]*F+e[1]*S+e[2]*A),!(v[2]<0||v[1]+v[2]>1)&&(v[0]=x*(l*F+m*S+M*A),!0)}function M(t,e,r,a){var n,c=(r[0]-t[0])/e[0],o=(a[0]-t[0])/e[0];c>o&&(n=c,c=o,o=n);var i=(r[1]-t[1])/e[1],u=(a[1]-t[1])/e[1];if(i>u&&(n=i,i=u,u=n),c>u||i>o)return!1;i>c&&(c=i),u<o&&(o=u);var v=(r[2]-t[2])/e[2],d=(a[2]-t[2])/e[2];return v>d&&(n=v,v=d,d=n),!(c>d||v>o)&&(d<o&&(o=d),!(o<0))}function h(t,e,a,n,c,o){void 0===o&&(o=r.vec2d.create());var i=(n[c]-a[c])*(e[0]-t[0])-(n[0]-a[0])*(e[c]-t[c]),u=(n[0]-a[0])*(t[c]-a[c])-(n[c]-a[c])*(t[0]-a[0]);if(0===i)return!1;var v=u/i;return o[0]=t[0]+v*(e[0]-t[0]),o[1]=t[c]+v*(e[c]-t[c]),!0}function p(t,e,a){r.mat4d.multiply(e,t,X),r.mat4d.inverse(X);for(var n=0;n<8;++n)r.mat4d.multiplyVec4(X,G[n],_),r.vec3d.set3(_[0]/_[3],_[1]/_[3],_[2]/_[3],a[n])}function y(t,e,r,a){void 0===a&&(a=r,r=z),p(t,e,r),b(r,a)}function b(t,e){a.plane.fromPoints(t[4],t[0],t[3],e[0]),a.plane.fromPoints(t[1],t[5],t[6],e[1]),a.plane.fromPoints(t[4],t[5],t[1],e[2]),a.plane.fromPoints(t[3],t[2],t[6],e[3]),a.plane.fromPoints(t[0],t[1],t[2],e[4]),a.plane.fromPoints(t[5],t[4],t[7],e[5])}function x(t,e,a,n,o){o||(o=t),_[0]=t[0],_[1]=t[1],_[2]=t[2],_[3]=1,r.mat4d.multiplyVec4(e,_),o.length>2&&(o[2]=-_[2]),r.mat4d.multiplyVec4(a,_),c(0!==_[3]),o[0]=_[0]/_[3],o[1]=_[1]/_[3],o[2]=_[2]/_[3],o[0]=(.5*o[0]+.5)*n[2]+n[0],o[1]=(.5*o[1]+.5)*n[3]+n[1]}function g(t){for(var e in t)return e}function O(t){return t[g(t)]}function P(t){for(var e in t)return!1;return!0}function F(t,e){return Math.log(t)/Math.log(e)}function S(t,e){t[12]=e[0],t[13]=e[1],t[14]=e[2]}function A(t,e,r,a){t[12]=e,t[13]=r,t[14]=a}function E(t,e){return void 0===e&&(e=r.vec3d.create()),e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function T(t,e){return t=r.mat4d.identity(t),S(t,e),t}function I(t){return 1===t[0]&&0===t[1]&&0===t[2]&&0===t[3]&&0===t[4]&&1===t[5]&&0===t[6]&&0===t[7]&&0===t[8]&&0===t[9]&&1===t[10]&&0===t[11]&&1===t[15]}function N(t,e,r){return 2*Math.atan(r*Math.tan(.5*t)/e)}function R(t,e,r){return 2*Math.atan(e*Math.tan(.5*t)/r)}function q(t,e,r){return 2*Math.atan(Math.sqrt(e*e+r*r)*Math.tan(.5*t)/e)}function C(t,e,r){return 2*Math.atan(Math.sqrt(e*e+r*r)*Math.tan(.5*t)/r)}function D(t,e,r){return 2*Math.atan(e*Math.tan(.5*t)/Math.sqrt(e*e+r*r))}function L(t,e,r){return 2*Math.atan(r*Math.tan(.5*t)/Math.sqrt(e*e+r*r))}function U(t,e,a,c,o){var i=W,u=Y;if(i[0]=t[0]-a[0],i[1]=t[1]-a[1],i[2]=t[2]-a[2],u[0]=c[0]-a[0],u[1]=c[1]-a[1],u[2]=c[2]-a[2],Math.abs(u[0])<1e-4&&Math.abs(u[1])<1e-4&&Math.abs(u[2])<1e-4)return o.success=!1,o;var v=Z;if(v[0]=e[0]-t[0],v[1]=e[1]-t[1],v[2]=e[2]-t[2],Math.abs(v[0])<1e-4&&Math.abs(v[1])<1e-4&&Math.abs(v[2])<1e-4)return o.success=!1,o;var d=i[0]*u[0]+i[1]*u[1]+i[2]*u[2],s=u[0]*v[0]+u[1]*v[1]+u[2]*v[2],f=i[0]*v[0]+i[1]*v[1]+i[2]*v[2],l=u[0]*u[0]+u[1]*u[1]+u[2]*u[2],m=v[0]*v[0]+v[1]*v[1]+v[2]*v[2],M=m*l-s*s;if(Math.abs(M)<1e-4)return o.success=!1,o;var h=d*s-f*l,p=n.clamp(h/M,0,1),y=n.clamp((d+s*p)/l,0,1),b=H,x=J;b[0]=t[0]+p*v[0],b[1]=t[1]+p*v[1],b[2]=t[2]+p*v[2],x[0]=a[0]+y*u[0],x[1]=a[1]+y*u[1],x[2]=a[2]+y*u[2];var g=r.vec3d.dist2(b,x);return o.success=!0,o.dist2=g,o.pa=b,o.pb=x,o}function V(t,e,a){var c=et,o=rt,i=at,u=tt,v=Q,d=$;c[0]=e[0]-t[0],c[1]=e[1]-t[1],c[2]=0,o[0]=a[0]-t[0],o[1]=a[1]-t[1],o[2]=0,i[0]=a[0],i[1]=a[1],i[2]=0;var s=r.vec2d.dot(o,c),f=r.vec2d.dot(c,c),l=n.clamp(s/f,0,1);u[0]=c[0]*l,u[1]=c[1]*l,v[0]=t[0]+u[0],v[1]=t[1]+u[1],r.vec2d.subtract(i,v,d);var m=r.vec2d.dot(d,d),M=r.vec2d.dot(o,o),h=r.vec2d.dot(c,c),p=r.vec2d.dot(u,u);return(p>M||p>h)&&(m=Number.MAX_VALUE),m}function j(t,e,r){void 0===r&&(r=0);for(var a=n.clamp(t,0,ut),c=0;c<4;c++)e[r+c]=Math.floor(256*w(a*ot[c]))}function k(t,e){void 0===e&&(e=0);for(var r=0,a=0;a<4;a++)r+=t[e+a]*it[a];return r}function w(t){return t-Math.floor(t)}function B(t,e,a,n,c){var o=t;0===t[11]?(n[0]=2/(e*o[0]),n[1]=2/(a*o[5]),n[2]=(1+o[12])/o[0],n[3]=(1+o[13])/o[5],r.vec2d.set2(0,1,c)):(n[0]=-2/(e*o[0]),n[1]=-2/(a*o[5]),n[2]=(1-o[8])/o[0],n[3]=(1-o[9])/o[5],r.vec2d.set2(1,0,c))}Object.defineProperty(e,"__esModule",{value:!0});var X=r.mat4d.create(),G=[r.vec4d.createFrom(-1,-1,-1,1),r.vec4d.createFrom(1,-1,-1,1),r.vec4d.createFrom(1,1,-1,1),r.vec4d.createFrom(-1,1,-1,1),r.vec4d.createFrom(-1,-1,1,1),r.vec4d.createFrom(1,-1,1,1),r.vec4d.createFrom(1,1,1,1),r.vec4d.createFrom(-1,1,1,1)],_=r.vec4d.create(),z=[r.vec3d.create(),r.vec3d.create(),r.vec3d.create(),r.vec3d.create(),r.vec3d.create(),r.vec3d.create(),r.vec3d.create(),r.vec3d.create()],K=r.vec3d.create(),W=r.vec3d.create(),Y=r.vec3d.create(),Z=r.vec3d.create(),H=r.vec3d.create(),J=r.vec3d.create(),Q=r.vec3d.create(),$=r.vec3d.create(),tt=r.vec3d.create(),et=r.vec3d.create(),rt=r.vec3d.create(),at=r.vec3d.create(),nt=r.vec3d.createFrom(0,0,0),ct=function(){function t(t){this.message=t}return t.prototype.toString=function(){return"AssertException: "+this.message},t}();e.AssertException=ct,e.VertexAttrConstants={POSITION:"position",NORMAL:"normal",NORMALCOMPRESSED:"normalCompressed",UV0:"uv0",AUXPOS1:"auxpos1",AUXPOS2:"auxpos2",COLOR:"color",SYMBOLCOLOR:"symbolColor",SIZE:"size",REGION:"region",COMPONENTINDEX:"componentIndex"},e.assert=c,e.verify=o,e.encodeInt16=i,e.encodeNormal=u,e.fallbackIfUndefined=v,e.hex2rgb=d,e.rgb2hex=s,e.dec2hex=f,e.raySphere=l,e.rayTriangle3D=m,e.rayBoxTest=M,e.rayRay2D=h,e.matrixToFrustumPoints=p,e.matrixToFrustumPlanes=y,e.frustumPointsToPlanes=b,e.project=x,e.getFirstObjectKey=g,e.getFirstObjectValue=O,e.objectEmpty=P,e.logWithBase=F,e.setMatrixTranslation=S,e.setMatrixTranslation3=A,e.getMatrixTranslation=E,e.createTranslationMatrix=T,e.isTranslationMatrix=I,e.fovx2fovy=N,e.fovy2fovx=R,e.fovx2fovd=q,e.fovy2fovd=C,e.fovd2fovx=D,e.fovd2fovy=L,e.lineLineDistanceSquared3D=U,e.pointLineSegmentDistanceSquared2D=V,e.packFloatRGBA=j,e.unpackFloatRGBA=k;var ot=[1,256,65536,16777216],it=[1/256,1/65536,1/16777216,1/4294967296],ut=k(new Uint8ClampedArray([255,255,255,255]));e.inverseProjectionInfo=B});