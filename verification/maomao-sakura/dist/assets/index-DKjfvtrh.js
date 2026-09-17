(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Te={seed:6202611,trackPoints:[[-128,20],[-123,78],[-92,129],[-34,154],[26,147],[75,110],[100,65],[88,18],[117,-28],[132,-82],[99,-125],[43,-137],[-5,-115],[-53,-124],[-103,-94],[-126,-47]],colors:{sky:"#a7c9e0",horizon:"#efdbdf",fog:"#dedde8",ambient:"#e6ecff",bounce:"#c4a0a8",sun:"#ffe6dc",sandTexture:"#f1ddcb",sand:"#ffe6d4",wetSand:"#d7c2c3",grass:"#abc8a2",road:"#f3ddcf",leaves:"#e9aabd",leavesDark:"#bd829d",leavesLight:"#f5c5cd",accent:"#d790b4"}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xl="180",Fs={ROTATE:0,DOLLY:1,PAN:2},Is={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},dd=0,wc=1,fd=2,tu=1,eu=2,ai=3,di=0,Ye=1,Fe=2,li=0,Ai=1,br=2,Ac=3,Rc=4,pd=5,Wi=100,md=101,gd=102,_d=103,vd=104,xd=200,Md=201,yd=202,Sd=203,Qo=204,tl=205,bd=206,Ed=207,Td=208,wd=209,Ad=210,Rd=211,Cd=212,Pd=213,Ld=214,el=0,nl=1,il=2,Hs=3,sl=4,rl=5,al=6,ol=7,ql=0,Dd=1,Id=2,Ri=0,nu=1,iu=2,su=3,Yl=4,ru=5,au=6,ou=7,lu=300,Vs=301,Gs=302,ll=303,cl=304,Ka=306,Ha=1e3,$i=1001,hl=1002,gn=1003,Ud=1004,Vr=1005,kn=1006,ao=1007,ji=1008,Kn=1009,cu=1010,hu=1011,Er=1012,$l=1013,ts=1014,Yn=1015,ci=1016,jl=1017,Kl=1018,Tr=1020,uu=35902,du=35899,fu=1021,pu=1022,Rn=1023,wr=1026,Ar=1027,Zl=1028,Jl=1029,mu=1030,Ql=1031,tc=1033,Da=33776,Ia=33777,Ua=33778,Na=33779,ul=35840,dl=35841,fl=35842,pl=35843,ml=36196,gl=37492,_l=37496,vl=37808,xl=37809,Ml=37810,yl=37811,Sl=37812,bl=37813,El=37814,Tl=37815,wl=37816,Al=37817,Rl=37818,Cl=37819,Pl=37820,Ll=37821,Dl=36492,Il=36494,Ul=36495,Nl=36283,Fl=36284,Ol=36285,kl=36286,Nd=3200,Fd=3201,ec=0,Od=1,Ti="",He="srgb",Ws="srgb-linear",Va="linear",ae="srgb",os=7680,Cc=519,kd=512,Bd=513,zd=514,gu=515,Hd=516,Vd=517,Gd=518,Wd=519,Bl=35044,Ga=35048,Pc="300 es",$n=2e3,Wa=2001;class ns{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Lc=1234567;const vr=Math.PI/180,Rr=180/Math.PI;function jn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ge[i&255]+Ge[i>>8&255]+Ge[i>>16&255]+Ge[i>>24&255]+"-"+Ge[t&255]+Ge[t>>8&255]+"-"+Ge[t>>16&15|64]+Ge[t>>24&255]+"-"+Ge[e&63|128]+Ge[e>>8&255]+"-"+Ge[e>>16&255]+Ge[e>>24&255]+Ge[n&255]+Ge[n>>8&255]+Ge[n>>16&255]+Ge[n>>24&255]).toLowerCase()}function jt(i,t,e){return Math.max(t,Math.min(e,i))}function nc(i,t){return(i%t+t)%t}function Xd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function qd(i,t,e){return i!==t?(e-i)/(t-i):0}function xr(i,t,e){return(1-e)*i+e*t}function Yd(i,t,e,n){return xr(i,t,1-Math.exp(-e*n))}function $d(i,t=1){return t-Math.abs(nc(i,t*2)-t)}function jd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Kd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Zd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Jd(i,t){return i+Math.random()*(t-i)}function Qd(i){return i*(.5-Math.random())}function tf(i){i!==void 0&&(Lc=i);let t=Lc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ef(i){return i*vr}function nf(i){return i*Rr}function sf(i){return(i&i-1)===0&&i!==0}function rf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function af(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function of(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),m=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*u,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*m,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*m,o*c);break;case"ZYZ":i.set(l*m,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function On(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function oe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const zn={DEG2RAD:vr,RAD2DEG:Rr,generateUUID:jn,clamp:jt,euclideanModulo:nc,mapLinear:Xd,inverseLerp:qd,lerp:xr,damp:Yd,pingpong:$d,smoothstep:jd,smootherstep:Kd,randInt:Zd,randFloat:Jd,randFloatSpread:Qd,seededRandom:tf,degToRad:ef,radToDeg:nf,isPowerOfTwo:sf,ceilPowerOfTwo:rf,floorPowerOfTwo:af,setQuaternionFromProperEuler:of,normalize:oe,denormalize:On};class mt{constructor(t=0,e=0){mt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Hn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[a+0],f=r[a+1],m=r[a+2],M=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=M;return}if(u!==M||l!==d||c!==f||h!==m){let v=1-o;const g=l*d+c*f+h*m+u*M,T=g>=0?1:-1,E=1-g*g;if(E>Number.EPSILON){const A=Math.sqrt(E),C=Math.atan2(A,g*T);v=Math.sin(v*C)/A,o=Math.sin(o*C)/A}const S=o*T;if(l=l*v+d*S,c=c*v+f*S,h=h*v+m*S,u=u*v+M*S,v===1-o){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-o*f,t[e+2]=c*m+h*f+o*d-l*u,t[e+3]=h*m-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(jt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Dc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Dc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return oo.copy(this).projectOnVector(t),this.sub(oo)}reflect(t){return this.sub(oo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oo=new N,Dc=new Hn;class $t{constructor(t,e,n,s,r,a,o,l,c){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],M=s[0],v=s[3],g=s[6],T=s[1],E=s[4],S=s[7],A=s[2],C=s[5],U=s[8];return r[0]=a*M+o*T+l*A,r[3]=a*v+o*E+l*C,r[6]=a*g+o*S+l*U,r[1]=c*M+h*T+u*A,r[4]=c*v+h*E+u*C,r[7]=c*g+h*S+u*U,r[2]=d*M+f*T+m*A,r[5]=d*v+f*E+m*C,r[8]=d*g+f*S+m*U,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/m;return t[0]=u*M,t[1]=(s*c-h*n)*M,t[2]=(o*n-s*a)*M,t[3]=d*M,t[4]=(h*e-s*l)*M,t[5]=(s*r-o*e)*M,t[6]=f*M,t[7]=(n*l-c*e)*M,t[8]=(a*e-n*r)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(lo.makeScale(t,e)),this}rotate(t){return this.premultiply(lo.makeRotation(-t)),this}translate(t,e){return this.premultiply(lo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const lo=new $t;function _u(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Xa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function lf(){const i=Xa("canvas");return i.style.display="block",i}const Ic={};function Cr(i){i in Ic||(Ic[i]=!0,console.warn(i))}function cf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Uc=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nc=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hf(){const i={enabled:!0,workingColorSpace:Ws,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ae&&(s.r=hi(s.r),s.g=hi(s.g),s.b=hi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ae&&(s.r=Os(s.r),s.g=Os(s.g),s.b=Os(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ti?Va:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Cr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Cr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ws]:{primaries:t,whitePoint:n,transfer:Va,toXYZ:Uc,fromXYZ:Nc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:n,transfer:ae,toXYZ:Uc,fromXYZ:Nc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),i}const ee=hf();function hi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Os(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ls;class uf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ls===void 0&&(ls=Xa("canvas")),ls.width=t.width,ls.height=t.height;const s=ls.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ls}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Xa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=hi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(hi(e[n]/255)*255):e[n]=hi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let df=0;class ic{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=jn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(co(s[a].image)):r.push(co(s[a]))}else r=co(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function co(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?uf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ff=0;const ho=new N;class $e extends ns{constructor(t=$e.DEFAULT_IMAGE,e=$e.DEFAULT_MAPPING,n=$i,s=$i,r=kn,a=ji,o=Rn,l=Kn,c=$e.DEFAULT_ANISOTROPY,h=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ff++}),this.uuid=jn(),this.name="",this.source=new ic(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ho).x}get height(){return this.source.getSize(ho).y}get depth(){return this.source.getSize(ho).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ha:t.x=t.x-Math.floor(t.x);break;case $i:t.x=t.x<0?0:1;break;case hl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ha:t.y=t.y-Math.floor(t.y);break;case $i:t.y=t.y<0?0:1;break;case hl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}$e.DEFAULT_IMAGE=null;$e.DEFAULT_MAPPING=lu;$e.DEFAULT_ANISOTROPY=1;class fe{constructor(t=0,e=0,n=0,s=1){fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],M=l[2],v=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-M)<.01&&Math.abs(m-v)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+M)<.1&&Math.abs(m+v)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,S=(f+1)/2,A=(g+1)/2,C=(h+d)/4,U=(u+M)/4,I=(m+v)/4;return E>S&&E>A?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=C/n,r=U/n):S>A?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=C/s,r=I/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=U/r,s=I/r),this.set(n,s,r,e),this}let T=Math.sqrt((v-m)*(v-m)+(u-M)*(u-M)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(v-m)/T,this.y=(u-M)/T,this.z=(d-h)/T,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this.w=jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this.w=jt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pf extends ns{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new $e(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:kn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new ic(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bn extends pf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class vu extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class mf extends $e{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class is{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Dn):Dn.fromBufferAttribute(r,a),Dn.applyMatrix4(t.matrixWorld),this.expandByPoint(Dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Gr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gr.copy(n.boundingBox)),Gr.applyMatrix4(t.matrixWorld),this.union(Gr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Dn),Dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(nr),Wr.subVectors(this.max,nr),cs.subVectors(t.a,nr),hs.subVectors(t.b,nr),us.subVectors(t.c,nr),mi.subVectors(hs,cs),gi.subVectors(us,hs),Ui.subVectors(cs,us);let e=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Ui.z,Ui.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Ui.z,0,-Ui.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Ui.y,Ui.x,0];return!uo(e,cs,hs,us,Wr)||(e=[1,0,0,0,1,0,0,0,1],!uo(e,cs,hs,us,Wr))?!1:(Xr.crossVectors(mi,gi),e=[Xr.x,Xr.y,Xr.z],uo(e,cs,hs,us,Wr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ei),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const ei=[new N,new N,new N,new N,new N,new N,new N,new N],Dn=new N,Gr=new is,cs=new N,hs=new N,us=new N,mi=new N,gi=new N,Ui=new N,nr=new N,Wr=new N,Xr=new N,Ni=new N;function uo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ni.fromArray(i,r);const o=s.x*Math.abs(Ni.x)+s.y*Math.abs(Ni.y)+s.z*Math.abs(Ni.z),l=t.dot(Ni),c=e.dot(Ni),h=n.dot(Ni);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const gf=new is,ir=new N,fo=new N;class Ks{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):gf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ir.subVectors(t,this.center);const e=ir.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ir,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ir.copy(t.center).add(fo)),this.expandByPoint(ir.copy(t.center).sub(fo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const ni=new N,po=new N,qr=new N,_i=new N,mo=new N,Yr=new N,go=new N;class sc{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ni)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ni.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ni.copy(this.origin).addScaledVector(this.direction,e),ni.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){po.copy(t).add(e).multiplyScalar(.5),qr.copy(e).sub(t).normalize(),_i.copy(this.origin).sub(po);const r=t.distanceTo(e)*.5,a=-this.direction.dot(qr),o=_i.dot(this.direction),l=-_i.dot(qr),c=_i.lengthSq(),h=Math.abs(1-a*a);let u,d,f,m;if(h>0)if(u=a*l-o,d=a*o-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const M=1/h;u*=M,d*=M,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(po).addScaledVector(qr,d),f}intersectSphere(t,e){ni.subVectors(t.center,this.origin);const n=ni.dot(this.direction),s=ni.dot(ni)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ni)!==null}intersectTriangle(t,e,n,s,r){mo.subVectors(e,t),Yr.subVectors(n,t),go.crossVectors(mo,Yr);let a=this.direction.dot(go),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_i.subVectors(this.origin,t);const l=o*this.direction.dot(Yr.crossVectors(_i,Yr));if(l<0)return null;const c=o*this.direction.dot(mo.cross(_i));if(c<0||l+c>a)return null;const h=-o*_i.dot(go);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,s,r,a,o,l,c,h,u,d,f,m,M,v){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,d,f,m,M,v)}set(t,e,n,s,r,a,o,l,c,h,u,d,f,m,M,v){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=m,g[11]=M,g[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ds.setFromMatrixColumn(t,0).length(),r=1/ds.setFromMatrixColumn(t,1).length(),a=1/ds.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,f=a*u,m=o*h,M=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-M*c,e[9]=-o*l,e[2]=M-d*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,M=c*u;e[0]=d+M*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=M+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,M=c*u;e[0]=d-M*o,e[4]=-a*u,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=M-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,m=o*h,M=o*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+M,e[1]=l*u,e[5]=M*c+d,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,m=o*l,M=o*c;e[0]=l*h,e[4]=M-d*u,e[8]=m*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-M*u}else if(t.order==="XZY"){const d=a*l,f=a*c,m=o*l,M=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+M,e[5]=a*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=o*h,e[10]=M*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_f,t,vf)}lookAt(t,e,n){const s=this.elements;return dn.subVectors(t,e),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),vi.crossVectors(n,dn),vi.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),vi.crossVectors(n,dn)),vi.normalize(),$r.crossVectors(dn,vi),s[0]=vi.x,s[4]=$r.x,s[8]=dn.x,s[1]=vi.y,s[5]=$r.y,s[9]=dn.y,s[2]=vi.z,s[6]=$r.z,s[10]=dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],M=n[6],v=n[10],g=n[14],T=n[3],E=n[7],S=n[11],A=n[15],C=s[0],U=s[4],I=s[8],b=s[12],y=s[1],R=s[5],G=s[9],Y=s[13],nt=s[2],j=s[6],tt=s[10],ct=s[14],Q=s[3],St=s[7],wt=s[11],bt=s[15];return r[0]=a*C+o*y+l*nt+c*Q,r[4]=a*U+o*R+l*j+c*St,r[8]=a*I+o*G+l*tt+c*wt,r[12]=a*b+o*Y+l*ct+c*bt,r[1]=h*C+u*y+d*nt+f*Q,r[5]=h*U+u*R+d*j+f*St,r[9]=h*I+u*G+d*tt+f*wt,r[13]=h*b+u*Y+d*ct+f*bt,r[2]=m*C+M*y+v*nt+g*Q,r[6]=m*U+M*R+v*j+g*St,r[10]=m*I+M*G+v*tt+g*wt,r[14]=m*b+M*Y+v*ct+g*bt,r[3]=T*C+E*y+S*nt+A*Q,r[7]=T*U+E*R+S*j+A*St,r[11]=T*I+E*G+S*tt+A*wt,r[15]=T*b+E*Y+S*ct+A*bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],M=t[7],v=t[11],g=t[15];return m*(+r*l*u-s*c*u-r*o*d+n*c*d+s*o*f-n*l*f)+M*(+e*l*f-e*c*d+r*a*d-s*a*f+s*c*h-r*l*h)+v*(+e*c*u-e*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+g*(-s*o*h-e*l*u+e*o*d+s*a*u-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],M=t[13],v=t[14],g=t[15],T=u*v*c-M*d*c+M*l*f-o*v*f-u*l*g+o*d*g,E=m*d*c-h*v*c-m*l*f+a*v*f+h*l*g-a*d*g,S=h*M*c-m*u*c+m*o*f-a*M*f-h*o*g+a*u*g,A=m*u*l-h*M*l-m*o*d+a*M*d+h*o*v-a*u*v,C=e*T+n*E+s*S+r*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/C;return t[0]=T*U,t[1]=(M*d*r-u*v*r-M*s*f+n*v*f+u*s*g-n*d*g)*U,t[2]=(o*v*r-M*l*r+M*s*c-n*v*c-o*s*g+n*l*g)*U,t[3]=(u*l*r-o*d*r-u*s*c+n*d*c+o*s*f-n*l*f)*U,t[4]=E*U,t[5]=(h*v*r-m*d*r+m*s*f-e*v*f-h*s*g+e*d*g)*U,t[6]=(m*l*r-a*v*r-m*s*c+e*v*c+a*s*g-e*l*g)*U,t[7]=(a*d*r-h*l*r+h*s*c-e*d*c-a*s*f+e*l*f)*U,t[8]=S*U,t[9]=(m*u*r-h*M*r-m*n*f+e*M*f+h*n*g-e*u*g)*U,t[10]=(a*M*r-m*o*r+m*n*c-e*M*c-a*n*g+e*o*g)*U,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*f-e*o*f)*U,t[12]=A*U,t[13]=(h*M*s-m*u*s+m*n*d-e*M*d-h*n*v+e*u*v)*U,t[14]=(m*o*s-a*M*s-m*n*l+e*M*l+a*n*v-e*o*v)*U,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*d+e*o*d)*U,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,m=r*u,M=a*h,v=a*u,g=o*u,T=l*c,E=l*h,S=l*u,A=n.x,C=n.y,U=n.z;return s[0]=(1-(M+g))*A,s[1]=(f+S)*A,s[2]=(m-E)*A,s[3]=0,s[4]=(f-S)*C,s[5]=(1-(d+g))*C,s[6]=(v+T)*C,s[7]=0,s[8]=(m+E)*U,s[9]=(v-T)*U,s[10]=(1-(d+M))*U,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ds.set(s[0],s[1],s[2]).length();const a=ds.set(s[4],s[5],s[6]).length(),o=ds.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],In.copy(this);const c=1/r,h=1/a,u=1/o;return In.elements[0]*=c,In.elements[1]*=c,In.elements[2]*=c,In.elements[4]*=h,In.elements[5]*=h,In.elements[6]*=h,In.elements[8]*=u,In.elements[9]*=u,In.elements[10]*=u,e.setFromRotationMatrix(In),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=$n,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let m,M;if(l)m=r/(a-r),M=a*r/(a-r);else if(o===$n)m=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Wa)m=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=$n,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,M;if(l)m=1/(a-r),M=a/(a-r);else if(o===$n)m=-2/(a-r),M=-(a+r)/(a-r);else if(o===Wa)m=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ds=new N,In=new ie,_f=new N(0,0,0),vf=new N(1,1,1),vi=new N,$r=new N,dn=new N,Fc=new ie,Oc=new Hn;class _n{constructor(t=0,e=0,n=0,s=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Fc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Oc.setFromEuler(this),this.setFromQuaternion(Oc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class xu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let xf=0;const kc=new N,fs=new Hn,ii=new ie,jr=new N,sr=new N,Mf=new N,yf=new Hn,Bc=new N(1,0,0),zc=new N(0,1,0),Hc=new N(0,0,1),Vc={type:"added"},Sf={type:"removed"},ps={type:"childadded",child:null},_o={type:"childremoved",child:null};class be extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new N,e=new _n,n=new Hn,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new $t}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.multiply(fs),this}rotateOnWorldAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.premultiply(fs),this}rotateX(t){return this.rotateOnAxis(Bc,t)}rotateY(t){return this.rotateOnAxis(zc,t)}rotateZ(t){return this.rotateOnAxis(Hc,t)}translateOnAxis(t,e){return kc.copy(t).applyQuaternion(this.quaternion),this.position.add(kc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Bc,t)}translateY(t){return this.translateOnAxis(zc,t)}translateZ(t){return this.translateOnAxis(Hc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?jr.copy(t):jr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(sr,jr,this.up):ii.lookAt(jr,sr,this.up),this.quaternion.setFromRotationMatrix(ii),s&&(ii.extractRotation(s.matrixWorld),fs.setFromRotationMatrix(ii),this.quaternion.premultiply(fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vc),ps.child=t,this.dispatchEvent(ps),ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Sf),_o.child=t,this.dispatchEvent(_o),_o.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ii.multiply(t.parent.matrixWorld)),t.applyMatrix4(ii),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vc),ps.child=t,this.dispatchEvent(ps),ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,t,Mf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,yf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}be.DEFAULT_UP=new N(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Un=new N,si=new N,vo=new N,ri=new N,ms=new N,gs=new N,Gc=new N,xo=new N,Mo=new N,yo=new N,So=new fe,bo=new fe,Eo=new fe;class An{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Un.subVectors(t,e),s.cross(Un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Un.subVectors(s,e),si.subVectors(n,e),vo.subVectors(t,e);const a=Un.dot(Un),o=Un.dot(si),l=Un.dot(vo),c=si.dot(si),h=si.dot(vo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,m=(a*h-o*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ri.x),l.addScaledVector(a,ri.y),l.addScaledVector(o,ri.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return So.setScalar(0),bo.setScalar(0),Eo.setScalar(0),So.fromBufferAttribute(t,e),bo.fromBufferAttribute(t,n),Eo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(So,r.x),a.addScaledVector(bo,r.y),a.addScaledVector(Eo,r.z),a}static isFrontFacing(t,e,n,s){return Un.subVectors(n,e),si.subVectors(t,e),Un.cross(si).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Un.subVectors(this.c,this.b),si.subVectors(this.a,this.b),Un.cross(si).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return An.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return An.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return An.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return An.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return An.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;ms.subVectors(s,n),gs.subVectors(r,n),xo.subVectors(t,n);const l=ms.dot(xo),c=gs.dot(xo);if(l<=0&&c<=0)return e.copy(n);Mo.subVectors(t,s);const h=ms.dot(Mo),u=gs.dot(Mo);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(ms,a);yo.subVectors(t,r);const f=ms.dot(yo),m=gs.dot(yo);if(m>=0&&f<=m)return e.copy(r);const M=f*c-l*m;if(M<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(gs,o);const v=h*m-f*u;if(v<=0&&u-h>=0&&f-m>=0)return Gc.subVectors(r,s),o=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(Gc,o);const g=1/(v+M+d);return a=M*g,o=d*g,e.copy(n).addScaledVector(ms,a).addScaledVector(gs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Mu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},Kr={h:0,s:0,l:0};function To(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ut{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=nc(t,1),e=jt(e,0,1),n=jt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=To(a,r,t+1/3),this.g=To(a,r,t),this.b=To(a,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=He){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const n=Mu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hi(t.r),this.g=hi(t.g),this.b=hi(t.b),this}copyLinearToSRGB(t){return this.r=Os(t.r),this.g=Os(t.g),this.b=Os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return ee.workingToColorSpace(We.copy(this),t),Math.round(jt(We.r*255,0,255))*65536+Math.round(jt(We.g*255,0,255))*256+Math.round(jt(We.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(We.copy(this),e);const n=We.r,s=We.g,r=We.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(We.copy(this),e),t.r=We.r,t.g=We.g,t.b=We.b,t}getStyle(t=He){ee.workingToColorSpace(We.copy(this),t);const e=We.r,n=We.g,s=We.b;return t!==He?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(xi),this.setHSL(xi.h+t,xi.s+e,xi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(xi),t.getHSL(Kr);const n=xr(xi.h,Kr.h,e),s=xr(xi.s,Kr.s,e),r=xr(xi.l,Kr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const We=new Ut;Ut.NAMES=Mu;let bf=0;class Di extends ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=jn(),this.name="",this.type="Material",this.blending=Ai,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qo,this.blendDst=tl,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=Hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qo&&(n.blendSrc=this.blendSrc),this.blendDst!==tl&&(n.blendDst=this.blendDst),this.blendEquation!==Wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Cc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==os&&(n.stencilFail=this.stencilFail),this.stencilZFail!==os&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==os&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Or extends Di{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=ql,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new N,Zr=new mt;let Ef=0;class nn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ef++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Bl,this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Zr.fromBufferAttribute(this,e),Zr.applyMatrix3(t),this.setXY(e,Zr.x,Zr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=On(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=oe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=On(e,this.array)),e}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=On(e,this.array)),e}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=On(e,this.array)),e}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=On(e,this.array)),e}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array),r=oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Bl&&(t.usage=this.usage),t}}class yu extends nn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Su extends nn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class zt extends nn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Tf=0;const bn=new ie,wo=new be,_s=new N,fn=new is,rr=new is,Ie=new N;class se extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_u(t)?Su:yu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,n){return bn.makeTranslation(t,e,n),this.applyMatrix4(bn),this}scale(t,e,n){return bn.makeScale(t,e,n),this.applyMatrix4(bn),this}lookAt(t){return wo.lookAt(t),wo.updateMatrix(),this.applyMatrix4(wo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new is);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ks);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];rr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ie.addVectors(fn.min,rr.min),fn.expandByPoint(Ie),Ie.addVectors(fn.max,rr.max),fn.expandByPoint(Ie)):(fn.expandByPoint(rr.min),fn.expandByPoint(rr.max))}fn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ie));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ie.fromBufferAttribute(o,c),l&&(_s.fromBufferAttribute(t,c),Ie.add(_s)),s=Math.max(s,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new N,l[I]=new N;const c=new N,h=new N,u=new N,d=new mt,f=new mt,m=new mt,M=new N,v=new N;function g(I,b,y){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,b),m.fromBufferAttribute(r,y),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const R=1/(f.x*m.y-m.x*f.y);isFinite(R)&&(M.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(R),v.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(R),o[I].add(M),o[b].add(M),o[y].add(M),l[I].add(v),l[b].add(v),l[y].add(v))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let I=0,b=T.length;I<b;++I){const y=T[I],R=y.start,G=y.count;for(let Y=R,nt=R+G;Y<nt;Y+=3)g(t.getX(Y+0),t.getX(Y+1),t.getX(Y+2))}const E=new N,S=new N,A=new N,C=new N;function U(I){A.fromBufferAttribute(s,I),C.copy(A);const b=o[I];E.copy(b),E.sub(A.multiplyScalar(A.dot(b))).normalize(),S.crossVectors(C,b);const R=S.dot(l[I])<0?-1:1;a.setXYZW(I,E.x,E.y,E.z,R)}for(let I=0,b=T.length;I<b;++I){const y=T[I],R=y.start,G=y.count;for(let Y=R,nt=R+G;Y<nt;Y+=3)U(t.getX(Y+0)),U(t.getX(Y+1)),U(t.getX(Y+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new nn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,h=new N,u=new N;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),M=t.getX(d+1),v=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,v),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,M),c.fromBufferAttribute(n,v),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(M,l.x,l.y,l.z),n.setXYZ(v,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let M=0,v=l.length;M<v;M++){o.isInterleavedBufferAttribute?f=l[M]*o.data.stride+o.offset:f=l[M]*h;for(let g=0;g<h;g++)d[m++]=c[f++]}return new nn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new se,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wc=new ie,Fi=new sc,Jr=new Ks,Xc=new N,Qr=new N,ta=new N,ea=new N,Ao=new N,na=new N,qc=new N,ia=new N;class de extends be{constructor(t=new se,e=new Or){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){na.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Ao.fromBufferAttribute(u,t),a?na.addScaledVector(Ao,h):na.addScaledVector(Ao.sub(e),h))}e.add(na)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(r),Fi.copy(t.ray).recast(t.near),!(Jr.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Jr,Xc)===null||Fi.origin.distanceToSquared(Xc)>(t.far-t.near)**2))&&(Wc.copy(r).invert(),Fi.copy(t.ray).applyMatrix4(Wc),!(n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Fi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,M=d.length;m<M;m++){const v=d[m],g=a[v.materialIndex],T=Math.max(v.start,f.start),E=Math.min(o.count,Math.min(v.start+v.count,f.start+f.count));for(let S=T,A=E;S<A;S+=3){const C=o.getX(S),U=o.getX(S+1),I=o.getX(S+2);s=sa(this,g,t,n,c,h,u,C,U,I),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=v.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),M=Math.min(o.count,f.start+f.count);for(let v=m,g=M;v<g;v+=3){const T=o.getX(v),E=o.getX(v+1),S=o.getX(v+2);s=sa(this,a,t,n,c,h,u,T,E,S),s&&(s.faceIndex=Math.floor(v/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,M=d.length;m<M;m++){const v=d[m],g=a[v.materialIndex],T=Math.max(v.start,f.start),E=Math.min(l.count,Math.min(v.start+v.count,f.start+f.count));for(let S=T,A=E;S<A;S+=3){const C=S,U=S+1,I=S+2;s=sa(this,g,t,n,c,h,u,C,U,I),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=v.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),M=Math.min(l.count,f.start+f.count);for(let v=m,g=M;v<g;v+=3){const T=v,E=v+1,S=v+2;s=sa(this,a,t,n,c,h,u,T,E,S),s&&(s.faceIndex=Math.floor(v/3),e.push(s))}}}}function wf(i,t,e,n,s,r,a,o){let l;if(t.side===Ye?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===di,o),l===null)return null;ia.copy(o),ia.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ia);return c<e.near||c>e.far?null:{distance:c,point:ia.clone(),object:i}}function sa(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Qr),i.getVertexPosition(l,ta),i.getVertexPosition(c,ea);const h=wf(i,t,e,n,Qr,ta,ea,qc);if(h){const u=new N;An.getBarycoord(qc,Qr,ta,ea,u),s&&(h.uv=An.getInterpolatedAttribute(s,o,l,c,u,new mt)),r&&(h.uv1=An.getInterpolatedAttribute(r,o,l,c,u,new mt)),a&&(h.normal=An.getInterpolatedAttribute(a,o,l,c,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new N,materialIndex:0};An.getNormal(Qr,ta,ea,d.normal),h.face=d,h.barycoord=u}return h}class Pn extends se{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(u,2));function m(M,v,g,T,E,S,A,C,U,I,b){const y=S/U,R=A/I,G=S/2,Y=A/2,nt=C/2,j=U+1,tt=I+1;let ct=0,Q=0;const St=new N;for(let wt=0;wt<tt;wt++){const bt=wt*R-Y;for(let Lt=0;Lt<j;Lt++){const Vt=Lt*y-G;St[M]=Vt*T,St[v]=bt*E,St[g]=nt,c.push(St.x,St.y,St.z),St[M]=0,St[v]=0,St[g]=C>0?1:-1,h.push(St.x,St.y,St.z),u.push(Lt/U),u.push(1-wt/I),ct+=1}}for(let wt=0;wt<I;wt++)for(let bt=0;bt<U;bt++){const Lt=d+bt+j*wt,Vt=d+bt+j*(wt+1),Yt=d+(bt+1)+j*(wt+1),Ot=d+(bt+1)+j*wt;l.push(Lt,Vt,Ot),l.push(Vt,Yt,Ot),Q+=6}o.addGroup(f,Q,b),f+=Q,d+=ct}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function en(i){const t={};for(let e=0;e<i.length;e++){const n=Xs(i[e]);for(const s in n)t[s]=n[s]}return t}function Af(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function bu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const Pr={clone:Xs,merge:en};var Rf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oe extends Di{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rf,this.fragmentShader=Cf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xs(t.uniforms),this.uniformsGroups=Af(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Eu extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=$n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Mi=new N,Yc=new mt,$c=new mt;class pn extends Eu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Rr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(vr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Rr*2*Math.atan(Math.tan(vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Mi.x,Mi.y).multiplyScalar(-t/Mi.z),Mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mi.x,Mi.y).multiplyScalar(-t/Mi.z)}getViewSize(t,e){return this.getViewBounds(t,Yc,$c),e.subVectors($c,Yc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(vr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const vs=-90,xs=1;class Pf extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new pn(vs,xs,t,e);s.layers=this.layers,this.add(s);const r=new pn(vs,xs,t,e);r.layers=this.layers,this.add(r);const a=new pn(vs,xs,t,e);a.layers=this.layers,this.add(a);const o=new pn(vs,xs,t,e);o.layers=this.layers,this.add(o);const l=new pn(vs,xs,t,e);l.layers=this.layers,this.add(l);const c=new pn(vs,xs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===$n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Wa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const M=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=M,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Tu extends $e{constructor(t=[],e=Vs,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Lf extends Bn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Tu(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pn(5,5,5),r=new Oe({name:"CubemapFromEquirect",uniforms:Xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:li});r.uniforms.tEquirect.value=e;const a=new de(s,r),o=e.minFilter;return e.minFilter===ji&&(e.minFilter=kn),new Pf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class Se extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Df={type:"move"};class Ro{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const M of t.hand.values()){const v=e.getJointPose(M,n),g=this._getHandJoint(c,M);v!==null&&(g.matrix.fromArray(v.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=v.radius),g.visible=v!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Df)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Se;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class rc{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ut(t),this.density=e}clone(){return new rc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class wu extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class If{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Bl,this.updateRanges=[],this.version=0,this.uuid=jn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Qe=new N;class qa{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyMatrix4(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyNormalMatrix(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.transformDirection(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=On(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=oe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=On(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=On(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=On(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=On(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array),r=oe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new nn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new qa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Au extends Di{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ut(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ms;const ar=new N,ys=new N,Ss=new N,bs=new mt,or=new mt,Ru=new ie,ra=new N,lr=new N,aa=new N,jc=new mt,Co=new mt,Kc=new mt;class Uf extends be{constructor(t=new Au){if(super(),this.isSprite=!0,this.type="Sprite",Ms===void 0){Ms=new se;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new If(e,5);Ms.setIndex([0,1,2,0,2,3]),Ms.setAttribute("position",new qa(n,3,0,!1)),Ms.setAttribute("uv",new qa(n,2,3,!1))}this.geometry=Ms,this.material=t,this.center=new mt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ys.setFromMatrixScale(this.matrixWorld),Ru.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ss.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ys.multiplyScalar(-Ss.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;oa(ra.set(-.5,-.5,0),Ss,a,ys,s,r),oa(lr.set(.5,-.5,0),Ss,a,ys,s,r),oa(aa.set(.5,.5,0),Ss,a,ys,s,r),jc.set(0,0),Co.set(1,0),Kc.set(1,1);let o=t.ray.intersectTriangle(ra,lr,aa,!1,ar);if(o===null&&(oa(lr.set(-.5,.5,0),Ss,a,ys,s,r),Co.set(0,1),o=t.ray.intersectTriangle(ra,aa,lr,!1,ar),o===null))return;const l=t.ray.origin.distanceTo(ar);l<t.near||l>t.far||e.push({distance:l,point:ar.clone(),uv:An.getInterpolation(ar,ra,lr,aa,jc,Co,Kc,new mt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function oa(i,t,e,n,s,r){bs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(or.x=r*bs.x-s*bs.y,or.y=s*bs.x+r*bs.y):or.copy(bs),i.copy(t),i.x+=or.x,i.y+=or.y,i.applyMatrix4(Ru)}class ac extends $e{constructor(t=null,e=1,n=1,s,r,a,o,l,c=gn,h=gn,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zc extends nn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Es=new ie,Jc=new ie,la=[],Qc=new is,Nf=new ie,cr=new de,hr=new Ks;class oc extends de{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Zc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Nf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new is),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Es),Qc.copy(t.boundingBox).applyMatrix4(Es),this.boundingBox.union(Qc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ks),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Es),hr.copy(t.boundingSphere).applyMatrix4(Es),this.boundingSphere.union(hr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(cr.geometry=this.geometry,cr.material=this.material,cr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hr.copy(this.boundingSphere),hr.applyMatrix4(n),t.ray.intersectsSphere(hr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Es),Jc.multiplyMatrices(n,Es),cr.matrixWorld=Jc,cr.raycast(t,la);for(let a=0,o=la.length;a<o;a++){const l=la[a];l.instanceId=r,l.object=this,e.push(l)}la.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Zc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ac(new Float32Array(s*this.count),s,this.count,Zl,Yn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Po=new N,Ff=new N,Of=new $t;class Ei{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Po.subVectors(n,e).cross(Ff.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Po),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Of.getNormalMatrix(t),s=this.coplanarPoint(Po).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Oi=new Ks,kf=new mt(.5,.5),ca=new N;class lc{constructor(t=new Ei,e=new Ei,n=new Ei,s=new Ei,r=new Ei,a=new Ei){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=$n,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],M=r[9],v=r[10],g=r[11],T=r[12],E=r[13],S=r[14],A=r[15];if(s[0].setComponents(c-a,f-h,g-m,A-T).normalize(),s[1].setComponents(c+a,f+h,g+m,A+T).normalize(),s[2].setComponents(c+o,f+u,g+M,A+E).normalize(),s[3].setComponents(c-o,f-u,g-M,A-E).normalize(),n)s[4].setComponents(l,d,v,S).normalize(),s[5].setComponents(c-l,f-d,g-v,A-S).normalize();else if(s[4].setComponents(c-l,f-d,g-v,A-S).normalize(),e===$n)s[5].setComponents(c+l,f+d,g+v,A+S).normalize();else if(e===Wa)s[5].setComponents(l,d,v,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(t){Oi.center.set(0,0,0);const e=kf.distanceTo(t.center);return Oi.radius=.7071067811865476+e,Oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(ca.x=s.normal.x>0?t.max.x:t.min.x,ca.y=s.normal.y>0?t.max.y:t.min.y,ca.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ca)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cu extends Di{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ut(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const th=new ie,zl=new sc,ha=new Ks,ua=new N;class Bf extends be{constructor(t=new se,e=new Cu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ha.copy(n.boundingSphere),ha.applyMatrix4(s),ha.radius+=r,t.ray.intersectsSphere(ha)===!1)return;th.copy(s).invert(),zl.copy(t.ray).applyMatrix4(th);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,M=f;m<M;m++){const v=c.getX(m);ua.fromBufferAttribute(u,v),eh(ua,v,l,s,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,M=f;m<M;m++)ua.fromBufferAttribute(u,m),eh(ua,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function eh(i,t,e,n,s,r,a){const o=zl.distanceSqToPoint(i);if(o<e){const l=new N;zl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class cc extends $e{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Pu extends $e{constructor(t,e,n=ts,s,r,a,o=gn,l=gn,c,h=wr,u=1){if(h!==wr&&h!==Ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ic(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Lu extends $e{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class hc extends se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new N,h=new mt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new zt(a,3)),this.setAttribute("normal",new zt(o,3)),this.setAttribute("uv",new zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ji extends se{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const M=[],v=n/2;let g=0;T(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new zt(u,3)),this.setAttribute("normal",new zt(d,3)),this.setAttribute("uv",new zt(f,2));function T(){const S=new N,A=new N;let C=0;const U=(e-t)/n;for(let I=0;I<=r;I++){const b=[],y=I/r,R=y*(e-t)+t;for(let G=0;G<=s;G++){const Y=G/s,nt=Y*l+o,j=Math.sin(nt),tt=Math.cos(nt);A.x=R*j,A.y=-y*n+v,A.z=R*tt,u.push(A.x,A.y,A.z),S.set(j,U,tt).normalize(),d.push(S.x,S.y,S.z),f.push(Y,1-y),b.push(m++)}M.push(b)}for(let I=0;I<s;I++)for(let b=0;b<r;b++){const y=M[b][I],R=M[b+1][I],G=M[b+1][I+1],Y=M[b][I+1];(t>0||b!==0)&&(h.push(y,R,Y),C+=3),(e>0||b!==r-1)&&(h.push(R,G,Y),C+=3)}c.addGroup(g,C,0),g+=C}function E(S){const A=m,C=new mt,U=new N;let I=0;const b=S===!0?t:e,y=S===!0?1:-1;for(let G=1;G<=s;G++)u.push(0,v*y,0),d.push(0,y,0),f.push(.5,.5),m++;const R=m;for(let G=0;G<=s;G++){const nt=G/s*l+o,j=Math.cos(nt),tt=Math.sin(nt);U.x=b*tt,U.y=v*y,U.z=b*j,u.push(U.x,U.y,U.z),d.push(0,y,0),C.x=j*.5+.5,C.y=tt*.5*y+.5,f.push(C.x,C.y),m++}for(let G=0;G<s;G++){const Y=A+G,nt=R+G;S===!0?h.push(nt,nt+1,Y):h.push(nt+1,nt,Y),I+=3}c.addGroup(g,I,S===!0?1:2),g+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ji(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ya extends Ji{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Ya(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Za extends se{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new zt(r,3)),this.setAttribute("normal",new zt(r.slice(),3)),this.setAttribute("uv",new zt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(T){const E=new N,S=new N,A=new N;for(let C=0;C<e.length;C+=3)f(e[C+0],E),f(e[C+1],S),f(e[C+2],A),l(E,S,A,T)}function l(T,E,S,A){const C=A+1,U=[];for(let I=0;I<=C;I++){U[I]=[];const b=T.clone().lerp(S,I/C),y=E.clone().lerp(S,I/C),R=C-I;for(let G=0;G<=R;G++)G===0&&I===C?U[I][G]=b:U[I][G]=b.clone().lerp(y,G/R)}for(let I=0;I<C;I++)for(let b=0;b<2*(C-I)-1;b++){const y=Math.floor(b/2);b%2===0?(d(U[I][y+1]),d(U[I+1][y]),d(U[I][y])):(d(U[I][y+1]),d(U[I+1][y+1]),d(U[I+1][y]))}}function c(T){const E=new N;for(let S=0;S<r.length;S+=3)E.x=r[S+0],E.y=r[S+1],E.z=r[S+2],E.normalize().multiplyScalar(T),r[S+0]=E.x,r[S+1]=E.y,r[S+2]=E.z}function h(){const T=new N;for(let E=0;E<r.length;E+=3){T.x=r[E+0],T.y=r[E+1],T.z=r[E+2];const S=v(T)/2/Math.PI+.5,A=g(T)/Math.PI+.5;a.push(S,1-A)}m(),u()}function u(){for(let T=0;T<a.length;T+=6){const E=a[T+0],S=a[T+2],A=a[T+4],C=Math.max(E,S,A),U=Math.min(E,S,A);C>.9&&U<.1&&(E<.2&&(a[T+0]+=1),S<.2&&(a[T+2]+=1),A<.2&&(a[T+4]+=1))}}function d(T){r.push(T.x,T.y,T.z)}function f(T,E){const S=T*3;E.x=t[S+0],E.y=t[S+1],E.z=t[S+2]}function m(){const T=new N,E=new N,S=new N,A=new N,C=new mt,U=new mt,I=new mt;for(let b=0,y=0;b<r.length;b+=9,y+=6){T.set(r[b+0],r[b+1],r[b+2]),E.set(r[b+3],r[b+4],r[b+5]),S.set(r[b+6],r[b+7],r[b+8]),C.set(a[y+0],a[y+1]),U.set(a[y+2],a[y+3]),I.set(a[y+4],a[y+5]),A.copy(T).add(E).add(S).divideScalar(3);const R=v(A);M(C,y+0,T,R),M(U,y+2,E,R),M(I,y+4,S,R)}}function M(T,E,S,A){A<0&&T.x===1&&(a[E]=T.x-1),S.x===0&&S.z===0&&(a[E]=A/2/Math.PI+.5)}function v(T){return Math.atan2(T.z,-T.x)}function g(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Za(t.vertices,t.indices,t.radius,t.details)}}class uc extends Za{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new uc(t.radius,t.detail)}}class Qn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(a-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new mt:new N);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new N,s=[],r=[],a=[],o=new N,l=new ie;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new N)}r[0]=new N,a[0]=new N;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(jt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(jt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class dc extends Qn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new mt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class zf extends dc{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function fc(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const da=new N,Lo=new fc,Do=new fc,Io=new fc;class Lr extends Qn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new N){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(da.subVectors(s[0],s[1]).add(s[0]),c=da);const u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(da.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=da),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),M=Math.pow(u.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(h),f);M<1e-4&&(M=1),m<1e-4&&(m=M),v<1e-4&&(v=M),Lo.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,M,v),Do.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,M,v),Io.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,M,v)}else this.curveType==="catmullrom"&&(Lo.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Do.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Io.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Lo.calc(l),Do.calc(l),Io.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function nh(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Hf(i,t){const e=1-i;return e*e*t}function Vf(i,t){return 2*(1-i)*i*t}function Gf(i,t){return i*i*t}function Mr(i,t,e,n){return Hf(i,t)+Vf(i,e)+Gf(i,n)}function Wf(i,t){const e=1-i;return e*e*e*t}function Xf(i,t){const e=1-i;return 3*e*e*i*t}function qf(i,t){return 3*(1-i)*i*i*t}function Yf(i,t){return i*i*i*t}function yr(i,t,e,n,s){return Wf(i,t)+Xf(i,e)+qf(i,n)+Yf(i,s)}class Du extends Qn{constructor(t=new mt,e=new mt,n=new mt,s=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new mt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(yr(t,s.x,r.x,a.x,o.x),yr(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class $f extends Qn{constructor(t=new N,e=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new N){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(yr(t,s.x,r.x,a.x,o.x),yr(t,s.y,r.y,a.y,o.y),yr(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Iu extends Qn{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jf extends Qn{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uu extends Qn{constructor(t=new mt,e=new mt,n=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new mt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Mr(t,s.x,r.x,a.x),Mr(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nu extends Qn{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Mr(t,s.x,r.x,a.x),Mr(t,s.y,r.y,a.y),Mr(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fu extends Qn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(nh(o,l.x,c.x,h.x,u.x),nh(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new mt().fromArray(s))}return this}}var $a=Object.freeze({__proto__:null,ArcCurve:zf,CatmullRomCurve3:Lr,CubicBezierCurve:Du,CubicBezierCurve3:$f,EllipseCurve:dc,LineCurve:Iu,LineCurve3:jf,QuadraticBezierCurve:Uu,QuadraticBezierCurve3:Nu,SplineCurve:Fu});class Kf extends Qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $a[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new $a[s.type]().fromJSON(s))}return this}}class ih extends Kf{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Iu(this.currentPoint.clone(),new mt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Uu(this.currentPoint.clone(),new mt(t,e),new mt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new Du(this.currentPoint.clone(),new mt(t,e),new mt(n,s),new mt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Fu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new dc(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Zs extends ih{constructor(t){super(t),this.uuid=jn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new ih().fromJSON(s))}return this}}function Zf(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Ou(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=np(i,t,r,e)),i.length>80*e){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=e;d<s;d+=e){const f=i[d],m=i[d+1];f<o&&(o=f),m<l&&(l=m),f>h&&(h=f),m>u&&(u=m)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Dr(r,a,e,o,l,c,0),a}function Ou(i,t,e,n,s){let r;if(s===fp(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=sh(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=sh(a/n|0,i[a],i[a+1],r);return r&&qs(r,r.next)&&(Ur(r),r=r.next),r}function es(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(qs(e,e.next)||xe(e.prev,e,e.next)===0)){if(Ur(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Dr(i,t,e,n,s,r,a){if(!i)return;!a&&r&&op(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?Qf(i,n,s,r):Jf(i)){t.push(l.i,i.i,c.i),Ur(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=tp(es(i),t),Dr(i,t,e,n,s,r,2)):a===2&&ep(i,t,e,n,s,r):Dr(es(i),t,e,n,s,r,1);break}}}function Jf(i){const t=i.prev,e=i,n=i.next;if(xe(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),u=Math.min(o,l,c),d=Math.max(s,r,a),f=Math.max(o,l,c);let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&gr(s,o,r,l,a,c,m.x,m.y)&&xe(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Qf(i,t,e,n){const s=i.prev,r=i,a=i.next;if(xe(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,d=a.y,f=Math.min(o,l,c),m=Math.min(h,u,d),M=Math.max(o,l,c),v=Math.max(h,u,d),g=Hl(f,m,t,e,n),T=Hl(M,v,t,e,n);let E=i.prevZ,S=i.nextZ;for(;E&&E.z>=g&&S&&S.z<=T;){if(E.x>=f&&E.x<=M&&E.y>=m&&E.y<=v&&E!==s&&E!==a&&gr(o,h,l,u,c,d,E.x,E.y)&&xe(E.prev,E,E.next)>=0||(E=E.prevZ,S.x>=f&&S.x<=M&&S.y>=m&&S.y<=v&&S!==s&&S!==a&&gr(o,h,l,u,c,d,S.x,S.y)&&xe(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;E&&E.z>=g;){if(E.x>=f&&E.x<=M&&E.y>=m&&E.y<=v&&E!==s&&E!==a&&gr(o,h,l,u,c,d,E.x,E.y)&&xe(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;S&&S.z<=T;){if(S.x>=f&&S.x<=M&&S.y>=m&&S.y<=v&&S!==s&&S!==a&&gr(o,h,l,u,c,d,S.x,S.y)&&xe(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function tp(i,t){let e=i;do{const n=e.prev,s=e.next.next;!qs(n,s)&&Bu(n,e,e.next,s)&&Ir(n,s)&&Ir(s,n)&&(t.push(n.i,e.i,s.i),Ur(e),Ur(e.next),e=i=s),e=e.next}while(e!==i);return es(e)}function ep(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&hp(a,o)){let l=zu(a,o);a=es(a,a.next),l=es(l,l.next),Dr(a,t,e,n,s,r,0),Dr(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function np(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Ou(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(cp(c))}s.sort(ip);for(let r=0;r<s.length;r++)e=sp(s[r],e);return e}function ip(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function sp(i,t){const e=rp(i,t);if(!e)return t;const n=zu(e,i);return es(n,n.next),es(e,e.next)}function rp(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if(qs(i,e))return e;do{if(qs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&ku(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);Ir(e,i)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&ap(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function ap(i,t){return xe(i.prev,i,t.prev)<0&&xe(t.next,i,i.next)<0}function op(i,t,e,n){let s=i;do s.z===0&&(s.z=Hl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,lp(s)}function lp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function Hl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function cp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ku(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function gr(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&ku(i,t,e,n,s,r,a,o)}function hp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!up(i,t)&&(Ir(i,t)&&Ir(t,i)&&dp(i,t)&&(xe(i.prev,i,t.prev)||xe(i,t.prev,t))||qs(i,t)&&xe(i.prev,i,i.next)>0&&xe(t.prev,t,t.next)>0)}function xe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function qs(i,t){return i.x===t.x&&i.y===t.y}function Bu(i,t,e,n){const s=pa(xe(i,t,e)),r=pa(xe(i,t,n)),a=pa(xe(e,n,i)),o=pa(xe(e,n,t));return!!(s!==r&&a!==o||s===0&&fa(i,e,t)||r===0&&fa(i,n,t)||a===0&&fa(e,i,n)||o===0&&fa(e,t,n))}function fa(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function pa(i){return i>0?1:i<0?-1:0}function up(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Bu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ir(i,t){return xe(i.prev,i,i.next)<0?xe(i,t,i.next)>=0&&xe(i,i.prev,t)>=0:xe(i,t,i.prev)<0||xe(i,i.next,t)<0}function dp(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function zu(i,t){const e=Vl(i.i,i.x,i.y),n=Vl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function sh(i,t,e,n){const s=Vl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ur(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Vl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function fp(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class pp{static triangulate(t,e,n=2){return Zf(t,e,n)}}class Us{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Us.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];rh(t),ah(n,t);let a=t.length;e.forEach(rh);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,ah(n,e[l]);const o=pp.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function rh(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function ah(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class ss extends se{constructor(t=new Zs([new mt(.5,.5),new mt(-.5,.5),new mt(-.5,-.5),new mt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new zt(s,3)),this.setAttribute("uv",new zt(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,M=e.bevelOffset!==void 0?e.bevelOffset:0,v=e.bevelSegments!==void 0?e.bevelSegments:3;const g=e.extrudePath,T=e.UVGenerator!==void 0?e.UVGenerator:mp;let E,S=!1,A,C,U,I;g&&(E=g.getSpacedPoints(h),S=!0,d=!1,A=g.computeFrenetFrames(h,!1),C=new N,U=new N,I=new N),d||(v=0,f=0,m=0,M=0);const b=o.extractPoints(c);let y=b.shape;const R=b.holes;if(!Us.isClockWise(y)){y=y.reverse();for(let _t=0,dt=R.length;_t<dt;_t++){const B=R[_t];Us.isClockWise(B)&&(R[_t]=B.reverse())}}function Y(_t){const B=10000000000000001e-36;let _=_t[0];for(let O=1;O<=_t.length;O++){const L=O%_t.length,H=_t[L],X=H.x-_.x,ut=H.y-_.y,x=X*X+ut*ut,p=Math.max(Math.abs(H.x),Math.abs(H.y),Math.abs(_.x),Math.abs(_.y)),D=B*p*p;if(x<=D){_t.splice(L,1),O--;continue}_=H}}Y(y),R.forEach(Y);const nt=R.length,j=y;for(let _t=0;_t<nt;_t++){const dt=R[_t];y=y.concat(dt)}function tt(_t,dt,B){return dt||console.error("THREE.ExtrudeGeometry: vec does not exist"),_t.clone().addScaledVector(dt,B)}const ct=y.length;function Q(_t,dt,B){let _,O,L;const H=_t.x-dt.x,X=_t.y-dt.y,ut=B.x-_t.x,x=B.y-_t.y,p=H*H+X*X,D=H*x-X*ut;if(Math.abs(D)>Number.EPSILON){const V=Math.sqrt(p),Z=Math.sqrt(ut*ut+x*x),q=dt.x-X/V,vt=dt.y+H/V,ht=B.x-x/Z,Et=B.y+ut/Z,yt=((ht-q)*x-(Et-vt)*ut)/(H*x-X*ut);_=q+H*yt-_t.x,O=vt+X*yt-_t.y;const et=_*_+O*O;if(et<=2)return new mt(_,O);L=Math.sqrt(et/2)}else{let V=!1;H>Number.EPSILON?ut>Number.EPSILON&&(V=!0):H<-Number.EPSILON?ut<-Number.EPSILON&&(V=!0):Math.sign(X)===Math.sign(x)&&(V=!0),V?(_=-X,O=H,L=Math.sqrt(p)):(_=H,O=X,L=Math.sqrt(p/2))}return new mt(_/L,O/L)}const St=[];for(let _t=0,dt=j.length,B=dt-1,_=_t+1;_t<dt;_t++,B++,_++)B===dt&&(B=0),_===dt&&(_=0),St[_t]=Q(j[_t],j[B],j[_]);const wt=[];let bt,Lt=St.concat();for(let _t=0,dt=nt;_t<dt;_t++){const B=R[_t];bt=[];for(let _=0,O=B.length,L=O-1,H=_+1;_<O;_++,L++,H++)L===O&&(L=0),H===O&&(H=0),bt[_]=Q(B[_],B[L],B[H]);wt.push(bt),Lt=Lt.concat(bt)}let Vt;if(v===0)Vt=Us.triangulateShape(j,R);else{const _t=[],dt=[];for(let B=0;B<v;B++){const _=B/v,O=f*Math.cos(_*Math.PI/2),L=m*Math.sin(_*Math.PI/2)+M;for(let H=0,X=j.length;H<X;H++){const ut=tt(j[H],St[H],L);Dt(ut.x,ut.y,-O),_===0&&_t.push(ut)}for(let H=0,X=nt;H<X;H++){const ut=R[H];bt=wt[H];const x=[];for(let p=0,D=ut.length;p<D;p++){const V=tt(ut[p],bt[p],L);Dt(V.x,V.y,-O),_===0&&x.push(V)}_===0&&dt.push(x)}}Vt=Us.triangulateShape(_t,dt)}const Yt=Vt.length,Ot=m+M;for(let _t=0;_t<ct;_t++){const dt=d?tt(y[_t],Lt[_t],Ot):y[_t];S?(U.copy(A.normals[0]).multiplyScalar(dt.x),C.copy(A.binormals[0]).multiplyScalar(dt.y),I.copy(E[0]).add(U).add(C),Dt(I.x,I.y,I.z)):Dt(dt.x,dt.y,0)}for(let _t=1;_t<=h;_t++)for(let dt=0;dt<ct;dt++){const B=d?tt(y[dt],Lt[dt],Ot):y[dt];S?(U.copy(A.normals[_t]).multiplyScalar(B.x),C.copy(A.binormals[_t]).multiplyScalar(B.y),I.copy(E[_t]).add(U).add(C),Dt(I.x,I.y,I.z)):Dt(B.x,B.y,u/h*_t)}for(let _t=v-1;_t>=0;_t--){const dt=_t/v,B=f*Math.cos(dt*Math.PI/2),_=m*Math.sin(dt*Math.PI/2)+M;for(let O=0,L=j.length;O<L;O++){const H=tt(j[O],St[O],_);Dt(H.x,H.y,u+B)}for(let O=0,L=R.length;O<L;O++){const H=R[O];bt=wt[O];for(let X=0,ut=H.length;X<ut;X++){const x=tt(H[X],bt[X],_);S?Dt(x.x,x.y+E[h-1].y,E[h-1].x+B):Dt(x.x,x.y,u+B)}}}lt(),pt();function lt(){const _t=s.length/3;if(d){let dt=0,B=ct*dt;for(let _=0;_<Yt;_++){const O=Vt[_];Ct(O[2]+B,O[1]+B,O[0]+B)}dt=h+v*2,B=ct*dt;for(let _=0;_<Yt;_++){const O=Vt[_];Ct(O[0]+B,O[1]+B,O[2]+B)}}else{for(let dt=0;dt<Yt;dt++){const B=Vt[dt];Ct(B[2],B[1],B[0])}for(let dt=0;dt<Yt;dt++){const B=Vt[dt];Ct(B[0]+ct*h,B[1]+ct*h,B[2]+ct*h)}}n.addGroup(_t,s.length/3-_t,0)}function pt(){const _t=s.length/3;let dt=0;At(j,dt),dt+=j.length;for(let B=0,_=R.length;B<_;B++){const O=R[B];At(O,dt),dt+=O.length}n.addGroup(_t,s.length/3-_t,1)}function At(_t,dt){let B=_t.length;for(;--B>=0;){const _=B;let O=B-1;O<0&&(O=_t.length-1);for(let L=0,H=h+v*2;L<H;L++){const X=ct*L,ut=ct*(L+1),x=dt+_+X,p=dt+O+X,D=dt+O+ut,V=dt+_+ut;Wt(x,p,D,V)}}}function Dt(_t,dt,B){l.push(_t),l.push(dt),l.push(B)}function Ct(_t,dt,B){Xt(_t),Xt(dt),Xt(B);const _=s.length/3,O=T.generateTopUV(n,s,_-3,_-2,_-1);z(O[0]),z(O[1]),z(O[2])}function Wt(_t,dt,B,_){Xt(_t),Xt(dt),Xt(_),Xt(dt),Xt(B),Xt(_);const O=s.length/3,L=T.generateSideWallUV(n,s,O-6,O-3,O-2,O-1);z(L[0]),z(L[1]),z(L[3]),z(L[1]),z(L[2]),z(L[3])}function Xt(_t){s.push(l[_t*3+0]),s.push(l[_t*3+1]),s.push(l[_t*3+2])}function z(_t){r.push(_t.x),r.push(_t.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return gp(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new $a[s.type]().fromJSON(s)),new ss(n,t.options)}}const mp={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new mt(r,a),new mt(o,l),new mt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],m=t[s*3+2],M=t[r*3],v=t[r*3+1],g=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new mt(a,1-l),new mt(c,1-u),new mt(d,1-m),new mt(M,1-g)]:[new mt(o,1-l),new mt(h,1-u),new mt(f,1-m),new mt(v,1-g)]}};function gp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ki extends Za{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ki(t.radius,t.detail)}}class pc extends se{constructor(t=[new mt(0,-.5),new mt(.5,0),new mt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=jt(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,u=new N,d=new mt,f=new N,m=new N,M=new N;let v=0,g=0;for(let T=0;T<=t.length-1;T++)switch(T){case 0:v=t[T+1].x-t[T].x,g=t[T+1].y-t[T].y,f.x=g*1,f.y=-v,f.z=g*0,M.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(M.x,M.y,M.z);break;default:v=t[T+1].x-t[T].x,g=t[T+1].y-t[T].y,f.x=g*1,f.y=-v,f.z=g*0,m.copy(f),f.x+=M.x,f.y+=M.y,f.z+=M.z,f.normalize(),l.push(f.x,f.y,f.z),M.copy(m)}for(let T=0;T<=e;T++){const E=n+T*h*s,S=Math.sin(E),A=Math.cos(E);for(let C=0;C<=t.length-1;C++){u.x=t[C].x*S,u.y=t[C].y,u.z=t[C].x*A,a.push(u.x,u.y,u.z),d.x=T/e,d.y=C/(t.length-1),o.push(d.x,d.y);const U=l[3*C+0]*S,I=l[3*C+1],b=l[3*C+0]*A;c.push(U,I,b)}}for(let T=0;T<e;T++)for(let E=0;E<t.length-1;E++){const S=E+T*t.length,A=S,C=S+t.length,U=S+t.length+1,I=S+1;r.push(A,C,I),r.push(U,I,C)}this.setIndex(r),this.setAttribute("position",new zt(a,3)),this.setAttribute("uv",new zt(o,2)),this.setAttribute("normal",new zt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pc(t.points,t.segments,t.phiStart,t.phiLength)}}class ui extends se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,f=[],m=[],M=[],v=[];for(let g=0;g<h;g++){const T=g*d-a;for(let E=0;E<c;E++){const S=E*u-r;m.push(S,-T,0),M.push(0,0,1),v.push(E/o),v.push(1-g/l)}}for(let g=0;g<l;g++)for(let T=0;T<o;T++){const E=T+c*g,S=T+c*(g+1),A=T+1+c*(g+1),C=T+1+c*g;f.push(E,S,C),f.push(S,A,C)}this.setIndex(f),this.setAttribute("position",new zt(m,3)),this.setAttribute("normal",new zt(M,3)),this.setAttribute("uv",new zt(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ui(t.width,t.height,t.widthSegments,t.heightSegments)}}class Zn extends se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new N,d=new N,f=[],m=[],M=[],v=[];for(let g=0;g<=n;g++){const T=[],E=g/n;let S=0;g===0&&a===0?S=.5/e:g===n&&l===Math.PI&&(S=-.5/e);for(let A=0;A<=e;A++){const C=A/e;u.x=-t*Math.cos(s+C*r)*Math.sin(a+E*o),u.y=t*Math.cos(a+E*o),u.z=t*Math.sin(s+C*r)*Math.sin(a+E*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),M.push(d.x,d.y,d.z),v.push(C+S,1-E),T.push(c++)}h.push(T)}for(let g=0;g<n;g++)for(let T=0;T<e;T++){const E=h[g][T+1],S=h[g][T],A=h[g+1][T],C=h[g+1][T+1];(g!==0||a>0)&&f.push(E,S,C),(g!==n-1||l<Math.PI)&&f.push(S,A,C)}this.setIndex(f),this.setAttribute("position",new zt(m,3)),this.setAttribute("normal",new zt(M,3)),this.setAttribute("uv",new zt(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ys extends se{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new N,u=new N,d=new N;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const M=m/s*r,v=f/n*Math.PI*2;u.x=(t+e*Math.cos(v))*Math.cos(M),u.y=(t+e*Math.cos(v))*Math.sin(M),u.z=e*Math.sin(v),o.push(u.x,u.y,u.z),h.x=t*Math.cos(M),h.y=t*Math.sin(M),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const M=(s+1)*f+m-1,v=(s+1)*(f-1)+m-1,g=(s+1)*(f-1)+m,T=(s+1)*f+m;a.push(M,v,T),a.push(v,g,T)}this.setIndex(a),this.setAttribute("position",new zt(o,3)),this.setAttribute("normal",new zt(l,3)),this.setAttribute("uv",new zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ys(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ja extends se{constructor(t=new Nu(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new N,l=new N,c=new mt;let h=new N;const u=[],d=[],f=[],m=[];M(),this.setIndex(m),this.setAttribute("position",new zt(u,3)),this.setAttribute("normal",new zt(d,3)),this.setAttribute("uv",new zt(f,2));function M(){for(let E=0;E<e;E++)v(E);v(r===!1?e:0),T(),g()}function v(E){h=t.getPointAt(E/e,h);const S=a.normals[E],A=a.binormals[E];for(let C=0;C<=s;C++){const U=C/s*Math.PI*2,I=Math.sin(U),b=-Math.cos(U);l.x=b*S.x+I*A.x,l.y=b*S.y+I*A.y,l.z=b*S.z+I*A.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}function g(){for(let E=1;E<=e;E++)for(let S=1;S<=s;S++){const A=(s+1)*(E-1)+(S-1),C=(s+1)*E+(S-1),U=(s+1)*E+S,I=(s+1)*(E-1)+S;m.push(A,C,I),m.push(C,U,I)}}function T(){for(let E=0;E<=e;E++)for(let S=0;S<=s;S++)c.x=E/e,c.y=S/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ja(new $a[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class _p extends Oe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class wn extends Di{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ec,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ja extends wn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new mt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return jt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ut(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ut(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ut(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class vp extends Di{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ec,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=ql,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class xp extends Di{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Mp extends Di{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class mc extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class yp extends mc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ut(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Uo=new ie,oh=new N,lh=new N;class Hu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.mapType=Kn,this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new lc,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;oh.setFromMatrixPosition(t.matrixWorld),e.position.copy(oh),lh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(lh),e.updateMatrixWorld(),Uo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uo,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Uo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ch=new ie,ur=new N,No=new N;class Sp extends Hu{constructor(){super(new pn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new mt(4,2),this._viewportCount=6,this._viewports=[new fe(2,1,1,1),new fe(0,1,1,1),new fe(3,1,1,1),new fe(1,1,1,1),new fe(3,0,1,1),new fe(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ur.setFromMatrixPosition(t.matrixWorld),n.position.copy(ur),No.copy(n.position),No.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(No),n.updateMatrixWorld(),s.makeTranslation(-ur.x,-ur.y,-ur.z),ch.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ch,n.coordinateSystem,n.reversedDepth)}}class bp extends mc{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Sp}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class gc extends Eu{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ep extends Hu{constructor(){super(new gc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Tp extends mc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new Ep}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class wp extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Ap{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class hh{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=jt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(jt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Rp extends ns{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function uh(i,t,e,n){const s=Cp(n);switch(e){case fu:return i*t;case Zl:return i*t/s.components*s.byteLength;case Jl:return i*t/s.components*s.byteLength;case mu:return i*t*2/s.components*s.byteLength;case Ql:return i*t*2/s.components*s.byteLength;case pu:return i*t*3/s.components*s.byteLength;case Rn:return i*t*4/s.components*s.byteLength;case tc:return i*t*4/s.components*s.byteLength;case Da:case Ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ua:case Na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case dl:case pl:return Math.max(i,16)*Math.max(t,8)/4;case ul:case fl:return Math.max(i,8)*Math.max(t,8)/2;case ml:case gl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case _l:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case vl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ml:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case yl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Sl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case bl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case El:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Tl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case wl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Al:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Rl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Cl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Pl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ll:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Dl:case Il:case Ul:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Nl:case Fl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ol:case kl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Cp(i){switch(i){case Kn:case cu:return{byteLength:1,components:1};case Er:case hu:case ci:return{byteLength:2,components:1};case jl:case Kl:return{byteLength:2,components:4};case ts:case $l:case Yn:return{byteLength:4,components:1};case uu:case du:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Vu(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Pp(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],M=u[f];M.start<=m.start+m.count+1?m.count=Math.max(m.count,M.start+M.count-m.start):(++d,u[d]=M)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const M=u[f];i.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Lp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ip=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Up=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Np=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Op=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,kp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,zp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Wp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Xp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,tm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,em=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,nm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,im=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,am=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,om="gl_FragColor = linearToOutputTexel( gl_FragColor );",lm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,hm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,um=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,dm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,pm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_m=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Mm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ym=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,bm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Em=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Am=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Cm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Pm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Lm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Dm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Um=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,km=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ym=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$m=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,jm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,t0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,e0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,n0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,i0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,s0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,r0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,a0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,o0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,l0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,c0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,h0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,u0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,d0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,f0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,p0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,m0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,g0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,v0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,x0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,M0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,y0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,S0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,b0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,E0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,T0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,A0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,R0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,C0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const P0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,L0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,N0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,O0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,k0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,B0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,H0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,G0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,W0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,X0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,j0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Z0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,J0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Q0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,eg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ng=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ig=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,rg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ag=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,og=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,lg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kt={alphahash_fragment:Lp,alphahash_pars_fragment:Dp,alphamap_fragment:Ip,alphamap_pars_fragment:Up,alphatest_fragment:Np,alphatest_pars_fragment:Fp,aomap_fragment:Op,aomap_pars_fragment:kp,batching_pars_vertex:Bp,batching_vertex:zp,begin_vertex:Hp,beginnormal_vertex:Vp,bsdfs:Gp,iridescence_fragment:Wp,bumpmap_pars_fragment:Xp,clipping_planes_fragment:qp,clipping_planes_pars_fragment:Yp,clipping_planes_pars_vertex:$p,clipping_planes_vertex:jp,color_fragment:Kp,color_pars_fragment:Zp,color_pars_vertex:Jp,color_vertex:Qp,common:tm,cube_uv_reflection_fragment:em,defaultnormal_vertex:nm,displacementmap_pars_vertex:im,displacementmap_vertex:sm,emissivemap_fragment:rm,emissivemap_pars_fragment:am,colorspace_fragment:om,colorspace_pars_fragment:lm,envmap_fragment:cm,envmap_common_pars_fragment:hm,envmap_pars_fragment:um,envmap_pars_vertex:dm,envmap_physical_pars_fragment:bm,envmap_vertex:fm,fog_vertex:pm,fog_pars_vertex:mm,fog_fragment:gm,fog_pars_fragment:_m,gradientmap_pars_fragment:vm,lightmap_pars_fragment:xm,lights_lambert_fragment:Mm,lights_lambert_pars_fragment:ym,lights_pars_begin:Sm,lights_toon_fragment:Em,lights_toon_pars_fragment:Tm,lights_phong_fragment:wm,lights_phong_pars_fragment:Am,lights_physical_fragment:Rm,lights_physical_pars_fragment:Cm,lights_fragment_begin:Pm,lights_fragment_maps:Lm,lights_fragment_end:Dm,logdepthbuf_fragment:Im,logdepthbuf_pars_fragment:Um,logdepthbuf_pars_vertex:Nm,logdepthbuf_vertex:Fm,map_fragment:Om,map_pars_fragment:km,map_particle_fragment:Bm,map_particle_pars_fragment:zm,metalnessmap_fragment:Hm,metalnessmap_pars_fragment:Vm,morphinstance_vertex:Gm,morphcolor_vertex:Wm,morphnormal_vertex:Xm,morphtarget_pars_vertex:qm,morphtarget_vertex:Ym,normal_fragment_begin:$m,normal_fragment_maps:jm,normal_pars_fragment:Km,normal_pars_vertex:Zm,normal_vertex:Jm,normalmap_pars_fragment:Qm,clearcoat_normal_fragment_begin:t0,clearcoat_normal_fragment_maps:e0,clearcoat_pars_fragment:n0,iridescence_pars_fragment:i0,opaque_fragment:s0,packing:r0,premultiplied_alpha_fragment:a0,project_vertex:o0,dithering_fragment:l0,dithering_pars_fragment:c0,roughnessmap_fragment:h0,roughnessmap_pars_fragment:u0,shadowmap_pars_fragment:d0,shadowmap_pars_vertex:f0,shadowmap_vertex:p0,shadowmask_pars_fragment:m0,skinbase_vertex:g0,skinning_pars_vertex:_0,skinning_vertex:v0,skinnormal_vertex:x0,specularmap_fragment:M0,specularmap_pars_fragment:y0,tonemapping_fragment:S0,tonemapping_pars_fragment:b0,transmission_fragment:E0,transmission_pars_fragment:T0,uv_pars_fragment:w0,uv_pars_vertex:A0,uv_vertex:R0,worldpos_vertex:C0,background_vert:P0,background_frag:L0,backgroundCube_vert:D0,backgroundCube_frag:I0,cube_vert:U0,cube_frag:N0,depth_vert:F0,depth_frag:O0,distanceRGBA_vert:k0,distanceRGBA_frag:B0,equirect_vert:z0,equirect_frag:H0,linedashed_vert:V0,linedashed_frag:G0,meshbasic_vert:W0,meshbasic_frag:X0,meshlambert_vert:q0,meshlambert_frag:Y0,meshmatcap_vert:$0,meshmatcap_frag:j0,meshnormal_vert:K0,meshnormal_frag:Z0,meshphong_vert:J0,meshphong_frag:Q0,meshphysical_vert:tg,meshphysical_frag:eg,meshtoon_vert:ng,meshtoon_frag:ig,points_vert:sg,points_frag:rg,shadow_vert:ag,shadow_frag:og,sprite_vert:lg,sprite_frag:cg},Rt={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},qn={basic:{uniforms:en([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:en([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:en([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:en([Rt.common,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.roughnessmap,Rt.metalnessmap,Rt.fog,Rt.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:en([Rt.common,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.gradientmap,Rt.fog,Rt.lights,{emissive:{value:new Ut(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:en([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:en([Rt.points,Rt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:en([Rt.common,Rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:en([Rt.common,Rt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:en([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:en([Rt.sprite,Rt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:en([Rt.common,Rt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:en([Rt.lights,Rt.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};qn.physical={uniforms:en([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const ma={r:0,b:0,g:0},ki=new _n,hg=new ie;function ug(i,t,e,n,s,r,a){const o=new Ut(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?e:t).get(S)),S}function M(E){let S=!1;const A=m(E);A===null?g(o,l):A&&A.isColor&&(g(A,1),S=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(E,S){const A=m(S);A&&(A.isCubeTexture||A.mapping===Ka)?(h===void 0&&(h=new de(new Pn(1,1,1),new Oe({name:"BackgroundCubeMaterial",uniforms:Xs(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,U,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ki.copy(S.backgroundRotation),ki.x*=-1,ki.y*=-1,ki.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(hg.makeRotationFromEuler(ki)),h.material.toneMapped=ee.getTransfer(A.colorSpace)!==ae,(u!==A||d!==A.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=A,d=A.version,f=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new de(new ui(2,2),new Oe({name:"BackgroundMaterial",uniforms:Xs(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ee.getTransfer(A.colorSpace)!==ae,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||d!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,d=A.version,f=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function g(E,S){E.getRGB(ma,bu(i)),n.buffers.color.setClear(ma.r,ma.g,ma.b,S,a)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,S=1){o.set(E),l=S,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,g(o,l)},render:M,addToRenderList:v,dispose:T}}function dg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(y,R,G,Y,nt){let j=!1;const tt=u(Y,G,R);r!==tt&&(r=tt,c(r.object)),j=f(y,Y,G,nt),j&&m(y,Y,G,nt),nt!==null&&t.update(nt,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,S(y,R,G,Y),nt!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(nt).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,R,G){const Y=G.wireframe===!0;let nt=n[y.id];nt===void 0&&(nt={},n[y.id]=nt);let j=nt[R.id];j===void 0&&(j={},nt[R.id]=j);let tt=j[Y];return tt===void 0&&(tt=d(l()),j[Y]=tt),tt}function d(y){const R=[],G=[],Y=[];for(let nt=0;nt<e;nt++)R[nt]=0,G[nt]=0,Y[nt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:G,attributeDivisors:Y,object:y,attributes:{},index:null}}function f(y,R,G,Y){const nt=r.attributes,j=R.attributes;let tt=0;const ct=G.getAttributes();for(const Q in ct)if(ct[Q].location>=0){const wt=nt[Q];let bt=j[Q];if(bt===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(bt=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(bt=y.instanceColor)),wt===void 0||wt.attribute!==bt||bt&&wt.data!==bt.data)return!0;tt++}return r.attributesNum!==tt||r.index!==Y}function m(y,R,G,Y){const nt={},j=R.attributes;let tt=0;const ct=G.getAttributes();for(const Q in ct)if(ct[Q].location>=0){let wt=j[Q];wt===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(wt=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(wt=y.instanceColor));const bt={};bt.attribute=wt,wt&&wt.data&&(bt.data=wt.data),nt[Q]=bt,tt++}r.attributes=nt,r.attributesNum=tt,r.index=Y}function M(){const y=r.newAttributes;for(let R=0,G=y.length;R<G;R++)y[R]=0}function v(y){g(y,0)}function g(y,R){const G=r.newAttributes,Y=r.enabledAttributes,nt=r.attributeDivisors;G[y]=1,Y[y]===0&&(i.enableVertexAttribArray(y),Y[y]=1),nt[y]!==R&&(i.vertexAttribDivisor(y,R),nt[y]=R)}function T(){const y=r.newAttributes,R=r.enabledAttributes;for(let G=0,Y=R.length;G<Y;G++)R[G]!==y[G]&&(i.disableVertexAttribArray(G),R[G]=0)}function E(y,R,G,Y,nt,j,tt){tt===!0?i.vertexAttribIPointer(y,R,G,nt,j):i.vertexAttribPointer(y,R,G,Y,nt,j)}function S(y,R,G,Y){M();const nt=Y.attributes,j=G.getAttributes(),tt=R.defaultAttributeValues;for(const ct in j){const Q=j[ct];if(Q.location>=0){let St=nt[ct];if(St===void 0&&(ct==="instanceMatrix"&&y.instanceMatrix&&(St=y.instanceMatrix),ct==="instanceColor"&&y.instanceColor&&(St=y.instanceColor)),St!==void 0){const wt=St.normalized,bt=St.itemSize,Lt=t.get(St);if(Lt===void 0)continue;const Vt=Lt.buffer,Yt=Lt.type,Ot=Lt.bytesPerElement,lt=Yt===i.INT||Yt===i.UNSIGNED_INT||St.gpuType===$l;if(St.isInterleavedBufferAttribute){const pt=St.data,At=pt.stride,Dt=St.offset;if(pt.isInstancedInterleavedBuffer){for(let Ct=0;Ct<Q.locationSize;Ct++)g(Q.location+Ct,pt.meshPerAttribute);y.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let Ct=0;Ct<Q.locationSize;Ct++)v(Q.location+Ct);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let Ct=0;Ct<Q.locationSize;Ct++)E(Q.location+Ct,bt/Q.locationSize,Yt,wt,At*Ot,(Dt+bt/Q.locationSize*Ct)*Ot,lt)}else{if(St.isInstancedBufferAttribute){for(let pt=0;pt<Q.locationSize;pt++)g(Q.location+pt,St.meshPerAttribute);y.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let pt=0;pt<Q.locationSize;pt++)v(Q.location+pt);i.bindBuffer(i.ARRAY_BUFFER,Vt);for(let pt=0;pt<Q.locationSize;pt++)E(Q.location+pt,bt/Q.locationSize,Yt,wt,bt*Ot,bt/Q.locationSize*pt*Ot,lt)}}else if(tt!==void 0){const wt=tt[ct];if(wt!==void 0)switch(wt.length){case 2:i.vertexAttrib2fv(Q.location,wt);break;case 3:i.vertexAttrib3fv(Q.location,wt);break;case 4:i.vertexAttrib4fv(Q.location,wt);break;default:i.vertexAttrib1fv(Q.location,wt)}}}}T()}function A(){I();for(const y in n){const R=n[y];for(const G in R){const Y=R[G];for(const nt in Y)h(Y[nt].object),delete Y[nt];delete R[G]}delete n[y]}}function C(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const G in R){const Y=R[G];for(const nt in Y)h(Y[nt].object),delete Y[nt];delete R[G]}delete n[y.id]}function U(y){for(const R in n){const G=n[R];if(G[y.id]===void 0)continue;const Y=G[y.id];for(const nt in Y)h(Y[nt].object),delete Y[nt];delete G[y.id]}}function I(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:b,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfProgram:U,initAttributes:M,enableAttribute:v,disableUnusedAttributes:T}}function fg(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let M=0;M<u;M++)m+=h[M]*d[M];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function pg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const U=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(U){return!(U!==Rn&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(U){const I=U===ci&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(U!==Kn&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==Yn&&!I)}function l(U){if(U==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_TEXTURE_SIZE),v=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:M,maxCubemapSize:v,maxAttributes:g,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:A,maxSamples:C}}function mg(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Ei,o=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,M=u.clipIntersection,v=u.clipShadows,g=i.get(u);if(!s||m===null||m.length===0||r&&!v)r?h(null):c();else{const T=r?0:n,E=T*4;let S=g.clippingState||null;l.value=S,S=h(m,d,E,f);for(let A=0;A!==E;++A)S[A]=e[A];g.clippingState=S,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const M=u!==null?u.length:0;let v=null;if(M!==0){if(v=l.value,m!==!0||v===null){const g=f+M*4,T=d.matrixWorldInverse;o.getNormalMatrix(T),(v===null||v.length<g)&&(v=new Float32Array(g));for(let E=0,S=f;E!==M;++E,S+=4)a.copy(u[E]).applyMatrix4(T,o),a.normal.toArray(v,S),v[S+3]=a.constant}l.value=v,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,v}}function gg(i){let t=new WeakMap;function e(a,o){return o===ll?a.mapping=Vs:o===cl&&(a.mapping=Gs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ll||o===cl)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Lf(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Ns=4,dh=[.125,.215,.35,.446,.526,.582],Xi=20,Fo=new gc,fh=new Ut;let Oo=null,ko=0,Bo=0,zo=!1;const Gi=(1+Math.sqrt(5))/2,Ts=1/Gi,ph=[new N(-Gi,Ts,0),new N(Gi,Ts,0),new N(-Ts,0,Gi),new N(Ts,0,Gi),new N(0,Gi,-Ts),new N(0,Gi,Ts),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)],_g=new N;class Gl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=_g}=r;Oo=this._renderer.getRenderTarget(),ko=this._renderer.getActiveCubeFace(),Bo=this._renderer.getActiveMipmapLevel(),zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_h(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Oo,ko,Bo),this._renderer.xr.enabled=zo,t.scissorTest=!1,ga(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Vs||t.mapping===Gs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Oo=this._renderer.getRenderTarget(),ko=this._renderer.getActiveCubeFace(),Bo=this._renderer.getActiveMipmapLevel(),zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:kn,minFilter:kn,generateMipmaps:!1,type:ci,format:Rn,colorSpace:Ws,depthBuffer:!1},s=mh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vg(r)),this._blurMaterial=xg(r,t,e)}return s}_compileMaterial(t){const e=new de(this._lodPlanes[0],t);this._renderer.compile(e,Fo)}_sceneToCubeUV(t,e,n,s,r){const l=new pn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(fh),u.toneMapping=Ri,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const M=new Or({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),v=new de(new Pn,M);let g=!1;const T=t.background;T?T.isColor&&(M.color.copy(T),t.background=null,g=!0):(M.color.copy(fh),g=!0);for(let E=0;E<6;E++){const S=E%3;S===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):S===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const A=this._cubeSize;ga(s,S*A,E>2?A:0,A,A),u.setRenderTarget(s),g&&u.render(v,l),u.render(t,l)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=T}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Vs||t.mapping===Gs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=_h()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new de(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;ga(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Fo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ph[(s-r-1)%ph.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new de(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Xi-1),M=r/m,v=isFinite(r)?1+Math.floor(h*M):Xi;v>Xi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${Xi}`);const g=[];let T=0;for(let U=0;U<Xi;++U){const I=U/M,b=Math.exp(-I*I/2);g.push(b),U===0?T+=b:U<v&&(T+=2*b)}for(let U=0;U<g.length;U++)g[U]=g[U]/T;d.envMap.value=t.texture,d.samples.value=v,d.weights.value=g,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:E}=this;d.dTheta.value=m,d.mipInt.value=E-n;const S=this._sizeLods[s],A=3*S*(s>E-Ns?s-E+Ns:0),C=4*(this._cubeSize-S);ga(e,A,C,3*S,2*S),l.setRenderTarget(e),l.render(u,Fo)}}function vg(i){const t=[],e=[],n=[];let s=i;const r=i-Ns+1+dh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Ns?l=dh[a-i+Ns-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,M=3,v=2,g=1,T=new Float32Array(M*m*f),E=new Float32Array(v*m*f),S=new Float32Array(g*m*f);for(let C=0;C<f;C++){const U=C%3*2/3-1,I=C>2?0:-1,b=[U,I,0,U+2/3,I,0,U+2/3,I+1,0,U,I,0,U+2/3,I+1,0,U,I+1,0];T.set(b,M*m*C),E.set(d,v*m*C);const y=[C,C,C,C,C,C];S.set(y,g*m*C)}const A=new se;A.setAttribute("position",new nn(T,M)),A.setAttribute("uv",new nn(E,v)),A.setAttribute("faceIndex",new nn(S,g)),t.push(A),s>Ns&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function mh(i,t,e){const n=new Bn(i,t,e);return n.texture.mapping=Ka,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ga(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function xg(i,t,e){const n=new Float32Array(Xi),s=new N(0,1,0);return new Oe({name:"SphericalGaussianBlur",defines:{n:Xi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function gh(){return new Oe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function _h(){return new Oe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function _c(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Mg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ll||l===cl,h=l===Vs||l===Gs;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Gl(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Gl(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function yg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Cr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Sg(i,t,e,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,m=u.attributes.position;let M=0;if(f!==null){const T=f.array;M=f.version;for(let E=0,S=T.length;E<S;E+=3){const A=T[E+0],C=T[E+1],U=T[E+2];d.push(A,C,C,U,U,A)}}else if(m!==void 0){const T=m.array;M=m.version;for(let E=0,S=T.length/3-1;E<S;E+=3){const A=E+0,C=E+1,U=E+2;d.push(A,C,C,U,U,A)}}else return;const v=new(_u(d)?Su:yu)(d,1);v.version=M;const g=r.get(u);g&&t.remove(g),r.set(u,v)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function bg(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),e.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*a,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let v=0;for(let g=0;g<m;g++)v+=f[g];e.update(v,n,1)}function u(d,f,m,M){if(m===0)return;const v=t.get("WEBGL_multi_draw");if(v===null)for(let g=0;g<d.length;g++)c(d[g]/a,f[g],M[g]);else{v.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,M,0,m);let g=0;for(let T=0;T<m;T++)g+=f[T]*M[T];e.update(g,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Eg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Tg(i,t,e){const n=new WeakMap,s=new fe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let y=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var f=y;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let S=0;m===!0&&(S=1),M===!0&&(S=2),v===!0&&(S=3);let A=o.attributes.position.count*S,C=1;A>t.maxTextureSize&&(C=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const U=new Float32Array(A*C*4*u),I=new vu(U,A,C,u);I.type=Yn,I.needsUpdate=!0;const b=S*4;for(let R=0;R<u;R++){const G=g[R],Y=T[R],nt=E[R],j=A*C*4*R;for(let tt=0;tt<G.count;tt++){const ct=tt*b;m===!0&&(s.fromBufferAttribute(G,tt),U[j+ct+0]=s.x,U[j+ct+1]=s.y,U[j+ct+2]=s.z,U[j+ct+3]=0),M===!0&&(s.fromBufferAttribute(Y,tt),U[j+ct+4]=s.x,U[j+ct+5]=s.y,U[j+ct+6]=s.z,U[j+ct+7]=0),v===!0&&(s.fromBufferAttribute(nt,tt),U[j+ct+8]=s.x,U[j+ct+9]=s.y,U[j+ct+10]=s.z,U[j+ct+11]=nt.itemSize===4?s.w:1)}}d={count:u,texture:I,size:new mt(A,C)},n.set(o,d),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let v=0;v<c.length;v++)m+=c[v];const M=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",M),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function wg(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const Gu=new $e,vh=new Pu(1,1),Wu=new vu,Xu=new mf,qu=new Tu,xh=[],Mh=[],yh=new Float32Array(16),Sh=new Float32Array(9),bh=new Float32Array(4);function Js(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=xh[s];if(r===void 0&&(r=new Float32Array(s),xh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Le(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function De(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Qa(i,t){let e=Mh[t];e===void 0&&(e=new Int32Array(t),Mh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ag(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Rg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2fv(this.addr,t),De(e,t)}}function Cg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;i.uniform3fv(this.addr,t),De(e,t)}}function Pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4fv(this.addr,t),De(e,t)}}function Lg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;bh.set(n),i.uniformMatrix2fv(this.addr,!1,bh),De(e,n)}}function Dg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;Sh.set(n),i.uniformMatrix3fv(this.addr,!1,Sh),De(e,n)}}function Ig(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Le(e,n))return;yh.set(n),i.uniformMatrix4fv(this.addr,!1,yh),De(e,n)}}function Ug(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2iv(this.addr,t),De(e,t)}}function Fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;i.uniform3iv(this.addr,t),De(e,t)}}function Og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4iv(this.addr,t),De(e,t)}}function kg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Bg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;i.uniform2uiv(this.addr,t),De(e,t)}}function zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;i.uniform3uiv(this.addr,t),De(e,t)}}function Hg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;i.uniform4uiv(this.addr,t),De(e,t)}}function Vg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(vh.compareFunction=gu,r=vh):r=Gu,e.setTexture2D(t||r,s)}function Gg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Xu,s)}function Wg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||qu,s)}function Xg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Wu,s)}function qg(i){switch(i){case 5126:return Ag;case 35664:return Rg;case 35665:return Cg;case 35666:return Pg;case 35674:return Lg;case 35675:return Dg;case 35676:return Ig;case 5124:case 35670:return Ug;case 35667:case 35671:return Ng;case 35668:case 35672:return Fg;case 35669:case 35673:return Og;case 5125:return kg;case 36294:return Bg;case 36295:return zg;case 36296:return Hg;case 35678:case 36198:case 36298:case 36306:case 35682:return Vg;case 35679:case 36299:case 36307:return Gg;case 35680:case 36300:case 36308:case 36293:return Wg;case 36289:case 36303:case 36311:case 36292:return Xg}}function Yg(i,t){i.uniform1fv(this.addr,t)}function $g(i,t){const e=Js(t,this.size,2);i.uniform2fv(this.addr,e)}function jg(i,t){const e=Js(t,this.size,3);i.uniform3fv(this.addr,e)}function Kg(i,t){const e=Js(t,this.size,4);i.uniform4fv(this.addr,e)}function Zg(i,t){const e=Js(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Jg(i,t){const e=Js(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Qg(i,t){const e=Js(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function t_(i,t){i.uniform1iv(this.addr,t)}function e_(i,t){i.uniform2iv(this.addr,t)}function n_(i,t){i.uniform3iv(this.addr,t)}function i_(i,t){i.uniform4iv(this.addr,t)}function s_(i,t){i.uniform1uiv(this.addr,t)}function r_(i,t){i.uniform2uiv(this.addr,t)}function a_(i,t){i.uniform3uiv(this.addr,t)}function o_(i,t){i.uniform4uiv(this.addr,t)}function l_(i,t,e){const n=this.cache,s=t.length,r=Qa(e,s);Le(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Gu,r[a])}function c_(i,t,e){const n=this.cache,s=t.length,r=Qa(e,s);Le(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Xu,r[a])}function h_(i,t,e){const n=this.cache,s=t.length,r=Qa(e,s);Le(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||qu,r[a])}function u_(i,t,e){const n=this.cache,s=t.length,r=Qa(e,s);Le(n,r)||(i.uniform1iv(this.addr,r),De(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Wu,r[a])}function d_(i){switch(i){case 5126:return Yg;case 35664:return $g;case 35665:return jg;case 35666:return Kg;case 35674:return Zg;case 35675:return Jg;case 35676:return Qg;case 5124:case 35670:return t_;case 35667:case 35671:return e_;case 35668:case 35672:return n_;case 35669:case 35673:return i_;case 5125:return s_;case 36294:return r_;case 36295:return a_;case 36296:return o_;case 35678:case 36198:case 36298:case 36306:case 35682:return l_;case 35679:case 36299:case 36307:return c_;case 35680:case 36300:case 36308:case 36293:return h_;case 36289:case 36303:case 36311:case 36292:return u_}}class f_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=qg(e.type)}}class p_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=d_(e.type)}}class m_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Ho=/(\w+)(\])?(\[|\.)?/g;function Eh(i,t){i.seq.push(t),i.map[t.id]=t}function g_(i,t,e){const n=i.name,s=n.length;for(Ho.lastIndex=0;;){const r=Ho.exec(n),a=Ho.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Eh(e,c===void 0?new f_(o,i,t):new p_(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new m_(o),Eh(e,u)),e=u}}}class Fa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);g_(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Th(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const __=37297;let v_=0;function x_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const wh=new $t;function M_(i){ee._getMatrix(wh,ee.workingColorSpace,i);const t=`mat3( ${wh.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case Va:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ah(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+x_(i.getShaderSource(t),o)}else return r}function y_(i,t){const e=M_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function S_(i,t){let e;switch(t){case nu:e="Linear";break;case iu:e="Reinhard";break;case su:e="Cineon";break;case Yl:e="ACESFilmic";break;case au:e="AgX";break;case ou:e="Neutral";break;case ru:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _a=new N;function b_(){ee.getLuminanceCoefficients(_a);const i=_a.x.toFixed(4),t=_a.y.toFixed(4),e=_a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function E_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_r).join(`
`)}function T_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function w_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function _r(i){return i!==""}function Rh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ch(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const A_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wl(i){return i.replace(A_,C_)}const R_=new Map;function C_(i,t){let e=Kt[t];if(e===void 0){const n=R_.get(t);if(n!==void 0)e=Kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Wl(e)}const P_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ph(i){return i.replace(P_,L_)}function L_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Lh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function D_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===eu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ai&&(t="SHADOWMAP_TYPE_VSM"),t}function I_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Vs:case Gs:t="ENVMAP_TYPE_CUBE";break;case Ka:t="ENVMAP_TYPE_CUBE_UV";break}return t}function U_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Gs:t="ENVMAP_MODE_REFRACTION";break}return t}function N_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ql:t="ENVMAP_BLENDING_MULTIPLY";break;case Dd:t="ENVMAP_BLENDING_MIX";break;case Id:t="ENVMAP_BLENDING_ADD";break}return t}function F_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function O_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=D_(e),c=I_(e),h=U_(e),u=N_(e),d=F_(e),f=E_(e),m=T_(r),M=s.createProgram();let v,g,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(_r).join(`
`),v.length>0&&(v+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(_r).join(`
`),g.length>0&&(g+=`
`)):(v=[Lh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_r).join(`
`),g=[Lh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ri?"#define TONE_MAPPING":"",e.toneMapping!==Ri?Kt.tonemapping_pars_fragment:"",e.toneMapping!==Ri?S_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,y_("linearToOutputTexel",e.outputColorSpace),b_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_r).join(`
`)),a=Wl(a),a=Rh(a,e),a=Ch(a,e),o=Wl(o),o=Rh(o,e),o=Ch(o,e),a=Ph(a),o=Ph(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,v=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,g=["#define varying in",e.glslVersion===Pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const E=T+v+a,S=T+g+o,A=Th(s,s.VERTEX_SHADER,E),C=Th(s,s.FRAGMENT_SHADER,S);s.attachShader(M,A),s.attachShader(M,C),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function U(R){if(i.debug.checkShaderErrors){const G=s.getProgramInfoLog(M)||"",Y=s.getShaderInfoLog(A)||"",nt=s.getShaderInfoLog(C)||"",j=G.trim(),tt=Y.trim(),ct=nt.trim();let Q=!0,St=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,M,A,C);else{const wt=Ah(s,A,"vertex"),bt=Ah(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+j+`
`+wt+`
`+bt)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(tt===""||ct==="")&&(St=!1);St&&(R.diagnostics={runnable:Q,programLog:j,vertexShader:{log:tt,prefix:v},fragmentShader:{log:ct,prefix:g}})}s.deleteShader(A),s.deleteShader(C),I=new Fa(s,M),b=w_(s,M)}let I;this.getUniforms=function(){return I===void 0&&U(this),I};let b;this.getAttributes=function(){return b===void 0&&U(this),b};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(M,__)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=v_++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=A,this.fragmentShader=C,this}let k_=0;class B_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new z_(t),e.set(t,n)),n}}class z_{constructor(t){this.id=k_++,this.code=t,this.usedTimes=0}}function H_(i,t,e,n,s,r,a){const o=new xu,l=new B_,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(b){return c.add(b),b===0?"uv":`uv${b}`}function v(b,y,R,G,Y){const nt=G.fog,j=Y.geometry,tt=b.isMeshStandardMaterial?G.environment:null,ct=(b.isMeshStandardMaterial?e:t).get(b.envMap||tt),Q=ct&&ct.mapping===Ka?ct.image.height:null,St=m[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const wt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,bt=wt!==void 0?wt.length:0;let Lt=0;j.morphAttributes.position!==void 0&&(Lt=1),j.morphAttributes.normal!==void 0&&(Lt=2),j.morphAttributes.color!==void 0&&(Lt=3);let Vt,Yt,Ot,lt;if(St){const te=qn[St];Vt=te.vertexShader,Yt=te.fragmentShader}else Vt=b.vertexShader,Yt=b.fragmentShader,l.update(b),Ot=l.getVertexShaderID(b),lt=l.getFragmentShaderID(b);const pt=i.getRenderTarget(),At=i.state.buffers.depth.getReversed(),Dt=Y.isInstancedMesh===!0,Ct=Y.isBatchedMesh===!0,Wt=!!b.map,Xt=!!b.matcap,z=!!ct,_t=!!b.aoMap,dt=!!b.lightMap,B=!!b.bumpMap,_=!!b.normalMap,O=!!b.displacementMap,L=!!b.emissiveMap,H=!!b.metalnessMap,X=!!b.roughnessMap,ut=b.anisotropy>0,x=b.clearcoat>0,p=b.dispersion>0,D=b.iridescence>0,V=b.sheen>0,Z=b.transmission>0,q=ut&&!!b.anisotropyMap,vt=x&&!!b.clearcoatMap,ht=x&&!!b.clearcoatNormalMap,Et=x&&!!b.clearcoatRoughnessMap,yt=D&&!!b.iridescenceMap,et=D&&!!b.iridescenceThicknessMap,P=V&&!!b.sheenColorMap,W=V&&!!b.sheenRoughnessMap,k=!!b.specularMap,$=!!b.specularColorMap,st=!!b.specularIntensityMap,F=Z&&!!b.transmissionMap,it=Z&&!!b.thicknessMap,ft=!!b.gradientMap,Mt=!!b.alphaMap,gt=b.alphaTest>0,rt=!!b.alphaHash,xt=!!b.extensions;let Ft=Ri;b.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(Ft=i.toneMapping);const Qt={shaderID:St,shaderType:b.type,shaderName:b.name,vertexShader:Vt,fragmentShader:Yt,defines:b.defines,customVertexShaderID:Ot,customFragmentShaderID:lt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Ct,batchingColor:Ct&&Y._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&Y.instanceColor!==null,instancingMorph:Dt&&Y.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:pt===null?i.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:Ws,alphaToCoverage:!!b.alphaToCoverage,map:Wt,matcap:Xt,envMap:z,envMapMode:z&&ct.mapping,envMapCubeUVHeight:Q,aoMap:_t,lightMap:dt,bumpMap:B,normalMap:_,displacementMap:d&&O,emissiveMap:L,normalMapObjectSpace:_&&b.normalMapType===Od,normalMapTangentSpace:_&&b.normalMapType===ec,metalnessMap:H,roughnessMap:X,anisotropy:ut,anisotropyMap:q,clearcoat:x,clearcoatMap:vt,clearcoatNormalMap:ht,clearcoatRoughnessMap:Et,dispersion:p,iridescence:D,iridescenceMap:yt,iridescenceThicknessMap:et,sheen:V,sheenColorMap:P,sheenRoughnessMap:W,specularMap:k,specularColorMap:$,specularIntensityMap:st,transmission:Z,transmissionMap:F,thicknessMap:it,gradientMap:ft,opaque:b.transparent===!1&&b.blending===Ai&&b.alphaToCoverage===!1,alphaMap:Mt,alphaTest:gt,alphaHash:rt,combine:b.combine,mapUv:Wt&&M(b.map.channel),aoMapUv:_t&&M(b.aoMap.channel),lightMapUv:dt&&M(b.lightMap.channel),bumpMapUv:B&&M(b.bumpMap.channel),normalMapUv:_&&M(b.normalMap.channel),displacementMapUv:O&&M(b.displacementMap.channel),emissiveMapUv:L&&M(b.emissiveMap.channel),metalnessMapUv:H&&M(b.metalnessMap.channel),roughnessMapUv:X&&M(b.roughnessMap.channel),anisotropyMapUv:q&&M(b.anisotropyMap.channel),clearcoatMapUv:vt&&M(b.clearcoatMap.channel),clearcoatNormalMapUv:ht&&M(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&M(b.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&M(b.iridescenceMap.channel),iridescenceThicknessMapUv:et&&M(b.iridescenceThicknessMap.channel),sheenColorMapUv:P&&M(b.sheenColorMap.channel),sheenRoughnessMapUv:W&&M(b.sheenRoughnessMap.channel),specularMapUv:k&&M(b.specularMap.channel),specularColorMapUv:$&&M(b.specularColorMap.channel),specularIntensityMapUv:st&&M(b.specularIntensityMap.channel),transmissionMapUv:F&&M(b.transmissionMap.channel),thicknessMapUv:it&&M(b.thicknessMap.channel),alphaMapUv:Mt&&M(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(_||ut),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!j.attributes.uv&&(Wt||Mt),fog:!!nt,useFog:b.fog===!0,fogExp2:!!nt&&nt.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:At,skinning:Y.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Lt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ft,decodeVideoTexture:Wt&&b.map.isVideoTexture===!0&&ee.getTransfer(b.map.colorSpace)===ae,decodeVideoTextureEmissive:L&&b.emissiveMap.isVideoTexture===!0&&ee.getTransfer(b.emissiveMap.colorSpace)===ae,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Fe,flipSided:b.side===Ye,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:xt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&b.extensions.multiDraw===!0||Ct)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Qt.vertexUv1s=c.has(1),Qt.vertexUv2s=c.has(2),Qt.vertexUv3s=c.has(3),c.clear(),Qt}function g(b){const y=[];if(b.shaderID?y.push(b.shaderID):(y.push(b.customVertexShaderID),y.push(b.customFragmentShaderID)),b.defines!==void 0)for(const R in b.defines)y.push(R),y.push(b.defines[R]);return b.isRawShaderMaterial===!1&&(T(y,b),E(y,b),y.push(i.outputColorSpace)),y.push(b.customProgramCacheKey),y.join()}function T(b,y){b.push(y.precision),b.push(y.outputColorSpace),b.push(y.envMapMode),b.push(y.envMapCubeUVHeight),b.push(y.mapUv),b.push(y.alphaMapUv),b.push(y.lightMapUv),b.push(y.aoMapUv),b.push(y.bumpMapUv),b.push(y.normalMapUv),b.push(y.displacementMapUv),b.push(y.emissiveMapUv),b.push(y.metalnessMapUv),b.push(y.roughnessMapUv),b.push(y.anisotropyMapUv),b.push(y.clearcoatMapUv),b.push(y.clearcoatNormalMapUv),b.push(y.clearcoatRoughnessMapUv),b.push(y.iridescenceMapUv),b.push(y.iridescenceThicknessMapUv),b.push(y.sheenColorMapUv),b.push(y.sheenRoughnessMapUv),b.push(y.specularMapUv),b.push(y.specularColorMapUv),b.push(y.specularIntensityMapUv),b.push(y.transmissionMapUv),b.push(y.thicknessMapUv),b.push(y.combine),b.push(y.fogExp2),b.push(y.sizeAttenuation),b.push(y.morphTargetsCount),b.push(y.morphAttributeCount),b.push(y.numDirLights),b.push(y.numPointLights),b.push(y.numSpotLights),b.push(y.numSpotLightMaps),b.push(y.numHemiLights),b.push(y.numRectAreaLights),b.push(y.numDirLightShadows),b.push(y.numPointLightShadows),b.push(y.numSpotLightShadows),b.push(y.numSpotLightShadowsWithMaps),b.push(y.numLightProbes),b.push(y.shadowMapType),b.push(y.toneMapping),b.push(y.numClippingPlanes),b.push(y.numClipIntersection),b.push(y.depthPacking)}function E(b,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),b.push(o.mask)}function S(b){const y=m[b.type];let R;if(y){const G=qn[y];R=Pr.clone(G.uniforms)}else R=b.uniforms;return R}function A(b,y){let R;for(let G=0,Y=h.length;G<Y;G++){const nt=h[G];if(nt.cacheKey===y){R=nt,++R.usedTimes;break}}return R===void 0&&(R=new O_(i,y,b,r),h.push(R)),R}function C(b){if(--b.usedTimes===0){const y=h.indexOf(b);h[y]=h[h.length-1],h.pop(),b.destroy()}}function U(b){l.remove(b)}function I(){l.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:S,acquireProgram:A,releaseProgram:C,releaseShaderCache:U,programs:h,dispose:I}}function V_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function G_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Dh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ih(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,d,f,m,M,v){let g=i[t];return g===void 0?(g={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:M,group:v},i[t]=g):(g.id=u.id,g.object=u,g.geometry=d,g.material=f,g.groupOrder=m,g.renderOrder=u.renderOrder,g.z=M,g.group=v),t++,g}function o(u,d,f,m,M,v){const g=a(u,d,f,m,M,v);f.transmission>0?n.push(g):f.transparent===!0?s.push(g):e.push(g)}function l(u,d,f,m,M,v){const g=a(u,d,f,m,M,v);f.transmission>0?n.unshift(g):f.transparent===!0?s.unshift(g):e.unshift(g)}function c(u,d){e.length>1&&e.sort(u||G_),n.length>1&&n.sort(d||Dh),s.length>1&&s.sort(d||Dh)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function W_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Ih,i.set(n,[a])):s>=r.length?(a=new Ih,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function X_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Ut};break;case"SpotLight":e={position:new N,direction:new N,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":e={color:new Ut,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function q_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Y_=0;function $_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function j_(i){const t=new X_,e=q_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);const s=new N,r=new ie,a=new ie;function o(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,M=0,v=0,g=0,T=0,E=0,S=0,A=0,C=0,U=0;c.sort($_);for(let b=0,y=c.length;b<y;b++){const R=c[b],G=R.color,Y=R.intensity,nt=R.distance,j=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=G.r*Y,u+=G.g*Y,d+=G.b*Y;else if(R.isLightProbe){for(let tt=0;tt<9;tt++)n.probe[tt].addScaledVector(R.sh.coefficients[tt],Y);U++}else if(R.isDirectionalLight){const tt=t.get(R);if(tt.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const ct=R.shadow,Q=e.get(R);Q.shadowIntensity=ct.intensity,Q.shadowBias=ct.bias,Q.shadowNormalBias=ct.normalBias,Q.shadowRadius=ct.radius,Q.shadowMapSize=ct.mapSize,n.directionalShadow[f]=Q,n.directionalShadowMap[f]=j,n.directionalShadowMatrix[f]=R.shadow.matrix,T++}n.directional[f]=tt,f++}else if(R.isSpotLight){const tt=t.get(R);tt.position.setFromMatrixPosition(R.matrixWorld),tt.color.copy(G).multiplyScalar(Y),tt.distance=nt,tt.coneCos=Math.cos(R.angle),tt.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),tt.decay=R.decay,n.spot[M]=tt;const ct=R.shadow;if(R.map&&(n.spotLightMap[A]=R.map,A++,ct.updateMatrices(R),R.castShadow&&C++),n.spotLightMatrix[M]=ct.matrix,R.castShadow){const Q=e.get(R);Q.shadowIntensity=ct.intensity,Q.shadowBias=ct.bias,Q.shadowNormalBias=ct.normalBias,Q.shadowRadius=ct.radius,Q.shadowMapSize=ct.mapSize,n.spotShadow[M]=Q,n.spotShadowMap[M]=j,S++}M++}else if(R.isRectAreaLight){const tt=t.get(R);tt.color.copy(G).multiplyScalar(Y),tt.halfWidth.set(R.width*.5,0,0),tt.halfHeight.set(0,R.height*.5,0),n.rectArea[v]=tt,v++}else if(R.isPointLight){const tt=t.get(R);if(tt.color.copy(R.color).multiplyScalar(R.intensity),tt.distance=R.distance,tt.decay=R.decay,R.castShadow){const ct=R.shadow,Q=e.get(R);Q.shadowIntensity=ct.intensity,Q.shadowBias=ct.bias,Q.shadowNormalBias=ct.normalBias,Q.shadowRadius=ct.radius,Q.shadowMapSize=ct.mapSize,Q.shadowCameraNear=ct.camera.near,Q.shadowCameraFar=ct.camera.far,n.pointShadow[m]=Q,n.pointShadowMap[m]=j,n.pointShadowMatrix[m]=R.shadow.matrix,E++}n.point[m]=tt,m++}else if(R.isHemisphereLight){const tt=t.get(R);tt.skyColor.copy(R.color).multiplyScalar(Y),tt.groundColor.copy(R.groundColor).multiplyScalar(Y),n.hemi[g]=tt,g++}}v>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Rt.LTC_FLOAT_1,n.rectAreaLTC2=Rt.LTC_FLOAT_2):(n.rectAreaLTC1=Rt.LTC_HALF_1,n.rectAreaLTC2=Rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==m||I.spotLength!==M||I.rectAreaLength!==v||I.hemiLength!==g||I.numDirectionalShadows!==T||I.numPointShadows!==E||I.numSpotShadows!==S||I.numSpotMaps!==A||I.numLightProbes!==U)&&(n.directional.length=f,n.spot.length=M,n.rectArea.length=v,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=S+A-C,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=U,I.directionalLength=f,I.pointLength=m,I.spotLength=M,I.rectAreaLength=v,I.hemiLength=g,I.numDirectionalShadows=T,I.numPointShadows=E,I.numSpotShadows=S,I.numSpotMaps=A,I.numLightProbes=U,n.version=Y_++)}function l(c,h){let u=0,d=0,f=0,m=0,M=0;const v=h.matrixWorldInverse;for(let g=0,T=c.length;g<T;g++){const E=c[g];if(E.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(v),u++}else if(E.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(v),S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(v),f++}else if(E.isRectAreaLight){const S=n.rectArea[m];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(v),a.identity(),r.copy(E.matrixWorld),r.premultiply(v),a.extractRotation(r),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),m++}else if(E.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(v),d++}else if(E.isHemisphereLight){const S=n.hemi[M];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(v),M++}}}return{setup:o,setupView:l,state:n}}function Uh(i){const t=new j_(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function K_(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Uh(i),t.set(s,[o])):r>=a.length?(o=new Uh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Z_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,J_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Q_(i,t,e){let n=new lc;const s=new mt,r=new mt,a=new fe,o=new xp({depthPacking:Fd}),l=new Mp,c={},h=e.maxTextureSize,u={[di]:Ye,[Ye]:di,[Fe]:Fe},d=new Oe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:Z_,fragmentShader:J_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new se;m.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new de(m,d),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tu;let g=this.type;this.render=function(C,U,I){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||C.length===0)return;const b=i.getRenderTarget(),y=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),G=i.state;G.setBlending(li),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const Y=g!==ai&&this.type===ai,nt=g===ai&&this.type!==ai;for(let j=0,tt=C.length;j<tt;j++){const ct=C[j],Q=ct.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",ct,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;s.copy(Q.mapSize);const St=Q.getFrameExtents();if(s.multiply(St),r.copy(Q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/St.x),s.x=r.x*St.x,Q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/St.y),s.y=r.y*St.y,Q.mapSize.y=r.y)),Q.map===null||Y===!0||nt===!0){const bt=this.type!==ai?{minFilter:gn,magFilter:gn}:{};Q.map!==null&&Q.map.dispose(),Q.map=new Bn(s.x,s.y,bt),Q.map.texture.name=ct.name+".shadowMap",Q.camera.updateProjectionMatrix()}i.setRenderTarget(Q.map),i.clear();const wt=Q.getViewportCount();for(let bt=0;bt<wt;bt++){const Lt=Q.getViewport(bt);a.set(r.x*Lt.x,r.y*Lt.y,r.x*Lt.z,r.y*Lt.w),G.viewport(a),Q.updateMatrices(ct,bt),n=Q.getFrustum(),S(U,I,Q.camera,ct,this.type)}Q.isPointLightShadow!==!0&&this.type===ai&&T(Q,I),Q.needsUpdate=!1}g=this.type,v.needsUpdate=!1,i.setRenderTarget(b,y,R)};function T(C,U){const I=t.update(M);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Bn(s.x,s.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(U,null,I,d,M,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(U,null,I,f,M,null)}function E(C,U,I,b){let y=null;const R=I.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(R!==void 0)y=R;else if(y=I.isPointLight===!0?l:o,i.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0||U.alphaToCoverage===!0){const G=y.uuid,Y=U.uuid;let nt=c[G];nt===void 0&&(nt={},c[G]=nt);let j=nt[Y];j===void 0&&(j=y.clone(),nt[Y]=j,U.addEventListener("dispose",A)),y=j}if(y.visible=U.visible,y.wireframe=U.wireframe,b===ai?y.side=U.shadowSide!==null?U.shadowSide:U.side:y.side=U.shadowSide!==null?U.shadowSide:u[U.side],y.alphaMap=U.alphaMap,y.alphaTest=U.alphaToCoverage===!0?.5:U.alphaTest,y.map=U.map,y.clipShadows=U.clipShadows,y.clippingPlanes=U.clippingPlanes,y.clipIntersection=U.clipIntersection,y.displacementMap=U.displacementMap,y.displacementScale=U.displacementScale,y.displacementBias=U.displacementBias,y.wireframeLinewidth=U.wireframeLinewidth,y.linewidth=U.linewidth,I.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const G=i.properties.get(y);G.light=I}return y}function S(C,U,I,b,y){if(C.visible===!1)return;if(C.layers.test(U.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===ai)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,C.matrixWorld);const Y=t.update(C),nt=C.material;if(Array.isArray(nt)){const j=Y.groups;for(let tt=0,ct=j.length;tt<ct;tt++){const Q=j[tt],St=nt[Q.materialIndex];if(St&&St.visible){const wt=E(C,St,b,y);C.onBeforeShadow(i,C,U,I,Y,wt,Q),i.renderBufferDirect(I,null,Y,wt,C,Q),C.onAfterShadow(i,C,U,I,Y,wt,Q)}}}else if(nt.visible){const j=E(C,nt,b,y);C.onBeforeShadow(i,C,U,I,Y,j,null),i.renderBufferDirect(I,null,Y,j,C,null),C.onAfterShadow(i,C,U,I,Y,j,null)}}const G=C.children;for(let Y=0,nt=G.length;Y<nt;Y++)S(G[Y],U,I,b,y)}function A(C){C.target.removeEventListener("dispose",A);for(const I in c){const b=c[I],y=C.target.uuid;y in b&&(b[y].dispose(),delete b[y])}}}const tv={[el]:nl,[il]:al,[sl]:ol,[Hs]:rl,[nl]:el,[al]:il,[ol]:sl,[rl]:Hs};function ev(i,t){function e(){let F=!1;const it=new fe;let ft=null;const Mt=new fe(0,0,0,0);return{setMask:function(gt){ft!==gt&&!F&&(i.colorMask(gt,gt,gt,gt),ft=gt)},setLocked:function(gt){F=gt},setClear:function(gt,rt,xt,Ft,Qt){Qt===!0&&(gt*=Ft,rt*=Ft,xt*=Ft),it.set(gt,rt,xt,Ft),Mt.equals(it)===!1&&(i.clearColor(gt,rt,xt,Ft),Mt.copy(it))},reset:function(){F=!1,ft=null,Mt.set(-1,0,0,0)}}}function n(){let F=!1,it=!1,ft=null,Mt=null,gt=null;return{setReversed:function(rt){if(it!==rt){const xt=t.get("EXT_clip_control");rt?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT),it=rt;const Ft=gt;gt=null,this.setClear(Ft)}},getReversed:function(){return it},setTest:function(rt){rt?pt(i.DEPTH_TEST):At(i.DEPTH_TEST)},setMask:function(rt){ft!==rt&&!F&&(i.depthMask(rt),ft=rt)},setFunc:function(rt){if(it&&(rt=tv[rt]),Mt!==rt){switch(rt){case el:i.depthFunc(i.NEVER);break;case nl:i.depthFunc(i.ALWAYS);break;case il:i.depthFunc(i.LESS);break;case Hs:i.depthFunc(i.LEQUAL);break;case sl:i.depthFunc(i.EQUAL);break;case rl:i.depthFunc(i.GEQUAL);break;case al:i.depthFunc(i.GREATER);break;case ol:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=rt}},setLocked:function(rt){F=rt},setClear:function(rt){gt!==rt&&(it&&(rt=1-rt),i.clearDepth(rt),gt=rt)},reset:function(){F=!1,ft=null,Mt=null,gt=null,it=!1}}}function s(){let F=!1,it=null,ft=null,Mt=null,gt=null,rt=null,xt=null,Ft=null,Qt=null;return{setTest:function(te){F||(te?pt(i.STENCIL_TEST):At(i.STENCIL_TEST))},setMask:function(te){it!==te&&!F&&(i.stencilMask(te),it=te)},setFunc:function(te,Ke,Ve){(ft!==te||Mt!==Ke||gt!==Ve)&&(i.stencilFunc(te,Ke,Ve),ft=te,Mt=Ke,gt=Ve)},setOp:function(te,Ke,Ve){(rt!==te||xt!==Ke||Ft!==Ve)&&(i.stencilOp(te,Ke,Ve),rt=te,xt=Ke,Ft=Ve)},setLocked:function(te){F=te},setClear:function(te){Qt!==te&&(i.clearStencil(te),Qt=te)},reset:function(){F=!1,it=null,ft=null,Mt=null,gt=null,rt=null,xt=null,Ft=null,Qt=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,M=!1,v=null,g=null,T=null,E=null,S=null,A=null,C=null,U=new Ut(0,0,0),I=0,b=!1,y=null,R=null,G=null,Y=null,nt=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let tt=!1,ct=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(ct=parseFloat(/^WebGL (\d)/.exec(Q)[1]),tt=ct>=1):Q.indexOf("OpenGL ES")!==-1&&(ct=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),tt=ct>=2);let St=null,wt={};const bt=i.getParameter(i.SCISSOR_BOX),Lt=i.getParameter(i.VIEWPORT),Vt=new fe().fromArray(bt),Yt=new fe().fromArray(Lt);function Ot(F,it,ft,Mt){const gt=new Uint8Array(4),rt=i.createTexture();i.bindTexture(F,rt),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xt=0;xt<ft;xt++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(it,0,i.RGBA,1,1,Mt,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(it+xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return rt}const lt={};lt[i.TEXTURE_2D]=Ot(i.TEXTURE_2D,i.TEXTURE_2D,1),lt[i.TEXTURE_CUBE_MAP]=Ot(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),lt[i.TEXTURE_2D_ARRAY]=Ot(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),lt[i.TEXTURE_3D]=Ot(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),pt(i.DEPTH_TEST),a.setFunc(Hs),B(!1),_(wc),pt(i.CULL_FACE),_t(li);function pt(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function At(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function Dt(F,it){return u[F]!==it?(i.bindFramebuffer(F,it),u[F]=it,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=it),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=it),!0):!1}function Ct(F,it){let ft=f,Mt=!1;if(F){ft=d.get(it),ft===void 0&&(ft=[],d.set(it,ft));const gt=F.textures;if(ft.length!==gt.length||ft[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,xt=gt.length;rt<xt;rt++)ft[rt]=i.COLOR_ATTACHMENT0+rt;ft.length=gt.length,Mt=!0}}else ft[0]!==i.BACK&&(ft[0]=i.BACK,Mt=!0);Mt&&i.drawBuffers(ft)}function Wt(F){return m!==F?(i.useProgram(F),m=F,!0):!1}const Xt={[Wi]:i.FUNC_ADD,[md]:i.FUNC_SUBTRACT,[gd]:i.FUNC_REVERSE_SUBTRACT};Xt[_d]=i.MIN,Xt[vd]=i.MAX;const z={[xd]:i.ZERO,[Md]:i.ONE,[yd]:i.SRC_COLOR,[Qo]:i.SRC_ALPHA,[Ad]:i.SRC_ALPHA_SATURATE,[Td]:i.DST_COLOR,[bd]:i.DST_ALPHA,[Sd]:i.ONE_MINUS_SRC_COLOR,[tl]:i.ONE_MINUS_SRC_ALPHA,[wd]:i.ONE_MINUS_DST_COLOR,[Ed]:i.ONE_MINUS_DST_ALPHA,[Rd]:i.CONSTANT_COLOR,[Cd]:i.ONE_MINUS_CONSTANT_COLOR,[Pd]:i.CONSTANT_ALPHA,[Ld]:i.ONE_MINUS_CONSTANT_ALPHA};function _t(F,it,ft,Mt,gt,rt,xt,Ft,Qt,te){if(F===li){M===!0&&(At(i.BLEND),M=!1);return}if(M===!1&&(pt(i.BLEND),M=!0),F!==pd){if(F!==v||te!==b){if((g!==Wi||S!==Wi)&&(i.blendEquation(i.FUNC_ADD),g=Wi,S=Wi),te)switch(F){case Ai:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case br:i.blendFunc(i.ONE,i.ONE);break;case Ac:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ai:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case br:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ac:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}T=null,E=null,A=null,C=null,U.set(0,0,0),I=0,v=F,b=te}return}gt=gt||it,rt=rt||ft,xt=xt||Mt,(it!==g||gt!==S)&&(i.blendEquationSeparate(Xt[it],Xt[gt]),g=it,S=gt),(ft!==T||Mt!==E||rt!==A||xt!==C)&&(i.blendFuncSeparate(z[ft],z[Mt],z[rt],z[xt]),T=ft,E=Mt,A=rt,C=xt),(Ft.equals(U)===!1||Qt!==I)&&(i.blendColor(Ft.r,Ft.g,Ft.b,Qt),U.copy(Ft),I=Qt),v=F,b=!1}function dt(F,it){F.side===Fe?At(i.CULL_FACE):pt(i.CULL_FACE);let ft=F.side===Ye;it&&(ft=!ft),B(ft),F.blending===Ai&&F.transparent===!1?_t(li):_t(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const Mt=F.stencilWrite;o.setTest(Mt),Mt&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),L(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?pt(i.SAMPLE_ALPHA_TO_COVERAGE):At(i.SAMPLE_ALPHA_TO_COVERAGE)}function B(F){y!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),y=F)}function _(F){F!==dd?(pt(i.CULL_FACE),F!==R&&(F===wc?i.cullFace(i.BACK):F===fd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):At(i.CULL_FACE),R=F}function O(F){F!==G&&(tt&&i.lineWidth(F),G=F)}function L(F,it,ft){F?(pt(i.POLYGON_OFFSET_FILL),(Y!==it||nt!==ft)&&(i.polygonOffset(it,ft),Y=it,nt=ft)):At(i.POLYGON_OFFSET_FILL)}function H(F){F?pt(i.SCISSOR_TEST):At(i.SCISSOR_TEST)}function X(F){F===void 0&&(F=i.TEXTURE0+j-1),St!==F&&(i.activeTexture(F),St=F)}function ut(F,it,ft){ft===void 0&&(St===null?ft=i.TEXTURE0+j-1:ft=St);let Mt=wt[ft];Mt===void 0&&(Mt={type:void 0,texture:void 0},wt[ft]=Mt),(Mt.type!==F||Mt.texture!==it)&&(St!==ft&&(i.activeTexture(ft),St=ft),i.bindTexture(F,it||lt[F]),Mt.type=F,Mt.texture=it)}function x(){const F=wt[St];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function p(){try{i.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function D(){try{i.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function V(){try{i.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Z(){try{i.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function vt(){try{i.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ht(){try{i.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Et(){try{i.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function yt(){try{i.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function et(){try{i.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function P(F){Vt.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Vt.copy(F))}function W(F){Yt.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Yt.copy(F))}function k(F,it){let ft=c.get(it);ft===void 0&&(ft=new WeakMap,c.set(it,ft));let Mt=ft.get(F);Mt===void 0&&(Mt=i.getUniformBlockIndex(it,F.name),ft.set(F,Mt))}function $(F,it){const Mt=c.get(it).get(F);l.get(it)!==Mt&&(i.uniformBlockBinding(it,Mt,F.__bindingPointIndex),l.set(it,Mt))}function st(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},St=null,wt={},u={},d=new WeakMap,f=[],m=null,M=!1,v=null,g=null,T=null,E=null,S=null,A=null,C=null,U=new Ut(0,0,0),I=0,b=!1,y=null,R=null,G=null,Y=null,nt=null,Vt.set(0,0,i.canvas.width,i.canvas.height),Yt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:pt,disable:At,bindFramebuffer:Dt,drawBuffers:Ct,useProgram:Wt,setBlending:_t,setMaterial:dt,setFlipSided:B,setCullFace:_,setLineWidth:O,setPolygonOffset:L,setScissorTest:H,activeTexture:X,bindTexture:ut,unbindTexture:x,compressedTexImage2D:p,compressedTexImage3D:D,texImage2D:yt,texImage3D:et,updateUBOMapping:k,uniformBlockBinding:$,texStorage2D:ht,texStorage3D:Et,texSubImage2D:V,texSubImage3D:Z,compressedTexSubImage2D:q,compressedTexSubImage3D:vt,scissor:P,viewport:W,reset:st}}function nv(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new mt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(x,p){return f?new OffscreenCanvas(x,p):Xa("canvas")}function M(x,p,D){let V=1;const Z=ut(x);if((Z.width>D||Z.height>D)&&(V=D/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const q=Math.floor(V*Z.width),vt=Math.floor(V*Z.height);u===void 0&&(u=m(q,vt));const ht=p?m(q,vt):u;return ht.width=q,ht.height=vt,ht.getContext("2d").drawImage(x,0,0,q,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+q+"x"+vt+")."),ht}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),x;return x}function v(x){return x.generateMipmaps}function g(x){i.generateMipmap(x)}function T(x){return x.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?i.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(x,p,D,V,Z=!1){if(x!==null){if(i[x]!==void 0)return i[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let q=p;if(p===i.RED&&(D===i.FLOAT&&(q=i.R32F),D===i.HALF_FLOAT&&(q=i.R16F),D===i.UNSIGNED_BYTE&&(q=i.R8)),p===i.RED_INTEGER&&(D===i.UNSIGNED_BYTE&&(q=i.R8UI),D===i.UNSIGNED_SHORT&&(q=i.R16UI),D===i.UNSIGNED_INT&&(q=i.R32UI),D===i.BYTE&&(q=i.R8I),D===i.SHORT&&(q=i.R16I),D===i.INT&&(q=i.R32I)),p===i.RG&&(D===i.FLOAT&&(q=i.RG32F),D===i.HALF_FLOAT&&(q=i.RG16F),D===i.UNSIGNED_BYTE&&(q=i.RG8)),p===i.RG_INTEGER&&(D===i.UNSIGNED_BYTE&&(q=i.RG8UI),D===i.UNSIGNED_SHORT&&(q=i.RG16UI),D===i.UNSIGNED_INT&&(q=i.RG32UI),D===i.BYTE&&(q=i.RG8I),D===i.SHORT&&(q=i.RG16I),D===i.INT&&(q=i.RG32I)),p===i.RGB_INTEGER&&(D===i.UNSIGNED_BYTE&&(q=i.RGB8UI),D===i.UNSIGNED_SHORT&&(q=i.RGB16UI),D===i.UNSIGNED_INT&&(q=i.RGB32UI),D===i.BYTE&&(q=i.RGB8I),D===i.SHORT&&(q=i.RGB16I),D===i.INT&&(q=i.RGB32I)),p===i.RGBA_INTEGER&&(D===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),D===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),D===i.UNSIGNED_INT&&(q=i.RGBA32UI),D===i.BYTE&&(q=i.RGBA8I),D===i.SHORT&&(q=i.RGBA16I),D===i.INT&&(q=i.RGBA32I)),p===i.RGB&&(D===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),D===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),p===i.RGBA){const vt=Z?Va:ee.getTransfer(V);D===i.FLOAT&&(q=i.RGBA32F),D===i.HALF_FLOAT&&(q=i.RGBA16F),D===i.UNSIGNED_BYTE&&(q=vt===ae?i.SRGB8_ALPHA8:i.RGBA8),D===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),D===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function S(x,p){let D;return x?p===null||p===ts||p===Tr?D=i.DEPTH24_STENCIL8:p===Yn?D=i.DEPTH32F_STENCIL8:p===Er&&(D=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):p===null||p===ts||p===Tr?D=i.DEPTH_COMPONENT24:p===Yn?D=i.DEPTH_COMPONENT32F:p===Er&&(D=i.DEPTH_COMPONENT16),D}function A(x,p){return v(x)===!0||x.isFramebufferTexture&&x.minFilter!==gn&&x.minFilter!==kn?Math.log2(Math.max(p.width,p.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?p.mipmaps.length:1}function C(x){const p=x.target;p.removeEventListener("dispose",C),I(p),p.isVideoTexture&&h.delete(p)}function U(x){const p=x.target;p.removeEventListener("dispose",U),y(p)}function I(x){const p=n.get(x);if(p.__webglInit===void 0)return;const D=x.source,V=d.get(D);if(V){const Z=V[p.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(x),Object.keys(V).length===0&&d.delete(D)}n.remove(x)}function b(x){const p=n.get(x);i.deleteTexture(p.__webglTexture);const D=x.source,V=d.get(D);delete V[p.__cacheKey],a.memory.textures--}function y(x){const p=n.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),n.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(p.__webglFramebuffer[V]))for(let Z=0;Z<p.__webglFramebuffer[V].length;Z++)i.deleteFramebuffer(p.__webglFramebuffer[V][Z]);else i.deleteFramebuffer(p.__webglFramebuffer[V]);p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer[V])}else{if(Array.isArray(p.__webglFramebuffer))for(let V=0;V<p.__webglFramebuffer.length;V++)i.deleteFramebuffer(p.__webglFramebuffer[V]);else i.deleteFramebuffer(p.__webglFramebuffer);if(p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer),p.__webglMultisampledFramebuffer&&i.deleteFramebuffer(p.__webglMultisampledFramebuffer),p.__webglColorRenderbuffer)for(let V=0;V<p.__webglColorRenderbuffer.length;V++)p.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(p.__webglColorRenderbuffer[V]);p.__webglDepthRenderbuffer&&i.deleteRenderbuffer(p.__webglDepthRenderbuffer)}const D=x.textures;for(let V=0,Z=D.length;V<Z;V++){const q=n.get(D[V]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(D[V])}n.remove(x)}let R=0;function G(){R=0}function Y(){const x=R;return x>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+s.maxTextures),R+=1,x}function nt(x){const p=[];return p.push(x.wrapS),p.push(x.wrapT),p.push(x.wrapR||0),p.push(x.magFilter),p.push(x.minFilter),p.push(x.anisotropy),p.push(x.internalFormat),p.push(x.format),p.push(x.type),p.push(x.generateMipmaps),p.push(x.premultiplyAlpha),p.push(x.flipY),p.push(x.unpackAlignment),p.push(x.colorSpace),p.join()}function j(x,p){const D=n.get(x);if(x.isVideoTexture&&H(x),x.isRenderTargetTexture===!1&&x.isExternalTexture!==!0&&x.version>0&&D.__version!==x.version){const V=x.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{lt(D,x,p);return}}else x.isExternalTexture&&(D.__webglTexture=x.sourceTexture?x.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,D.__webglTexture,i.TEXTURE0+p)}function tt(x,p){const D=n.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&D.__version!==x.version){lt(D,x,p);return}e.bindTexture(i.TEXTURE_2D_ARRAY,D.__webglTexture,i.TEXTURE0+p)}function ct(x,p){const D=n.get(x);if(x.isRenderTargetTexture===!1&&x.version>0&&D.__version!==x.version){lt(D,x,p);return}e.bindTexture(i.TEXTURE_3D,D.__webglTexture,i.TEXTURE0+p)}function Q(x,p){const D=n.get(x);if(x.version>0&&D.__version!==x.version){pt(D,x,p);return}e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+p)}const St={[Ha]:i.REPEAT,[$i]:i.CLAMP_TO_EDGE,[hl]:i.MIRRORED_REPEAT},wt={[gn]:i.NEAREST,[Ud]:i.NEAREST_MIPMAP_NEAREST,[Vr]:i.NEAREST_MIPMAP_LINEAR,[kn]:i.LINEAR,[ao]:i.LINEAR_MIPMAP_NEAREST,[ji]:i.LINEAR_MIPMAP_LINEAR},bt={[kd]:i.NEVER,[Wd]:i.ALWAYS,[Bd]:i.LESS,[gu]:i.LEQUAL,[zd]:i.EQUAL,[Gd]:i.GEQUAL,[Hd]:i.GREATER,[Vd]:i.NOTEQUAL};function Lt(x,p){if(p.type===Yn&&t.has("OES_texture_float_linear")===!1&&(p.magFilter===kn||p.magFilter===ao||p.magFilter===Vr||p.magFilter===ji||p.minFilter===kn||p.minFilter===ao||p.minFilter===Vr||p.minFilter===ji)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(x,i.TEXTURE_WRAP_S,St[p.wrapS]),i.texParameteri(x,i.TEXTURE_WRAP_T,St[p.wrapT]),(x===i.TEXTURE_3D||x===i.TEXTURE_2D_ARRAY)&&i.texParameteri(x,i.TEXTURE_WRAP_R,St[p.wrapR]),i.texParameteri(x,i.TEXTURE_MAG_FILTER,wt[p.magFilter]),i.texParameteri(x,i.TEXTURE_MIN_FILTER,wt[p.minFilter]),p.compareFunction&&(i.texParameteri(x,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(x,i.TEXTURE_COMPARE_FUNC,bt[p.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(p.magFilter===gn||p.minFilter!==Vr&&p.minFilter!==ji||p.type===Yn&&t.has("OES_texture_float_linear")===!1)return;if(p.anisotropy>1||n.get(p).__currentAnisotropy){const D=t.get("EXT_texture_filter_anisotropic");i.texParameterf(x,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(p.anisotropy,s.getMaxAnisotropy())),n.get(p).__currentAnisotropy=p.anisotropy}}}function Vt(x,p){let D=!1;x.__webglInit===void 0&&(x.__webglInit=!0,p.addEventListener("dispose",C));const V=p.source;let Z=d.get(V);Z===void 0&&(Z={},d.set(V,Z));const q=nt(p);if(q!==x.__cacheKey){Z[q]===void 0&&(Z[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,D=!0),Z[q].usedTimes++;const vt=Z[x.__cacheKey];vt!==void 0&&(Z[x.__cacheKey].usedTimes--,vt.usedTimes===0&&b(p)),x.__cacheKey=q,x.__webglTexture=Z[q].texture}return D}function Yt(x,p,D){return Math.floor(Math.floor(x/D)/p)}function Ot(x,p,D,V){const q=x.updateRanges;if(q.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,p.width,p.height,D,V,p.data);else{q.sort((et,P)=>et.start-P.start);let vt=0;for(let et=1;et<q.length;et++){const P=q[vt],W=q[et],k=P.start+P.count,$=Yt(W.start,p.width,4),st=Yt(P.start,p.width,4);W.start<=k+1&&$===st&&Yt(W.start+W.count-1,p.width,4)===$?P.count=Math.max(P.count,W.start+W.count-P.start):(++vt,q[vt]=W)}q.length=vt+1;const ht=i.getParameter(i.UNPACK_ROW_LENGTH),Et=i.getParameter(i.UNPACK_SKIP_PIXELS),yt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,p.width);for(let et=0,P=q.length;et<P;et++){const W=q[et],k=Math.floor(W.start/4),$=Math.ceil(W.count/4),st=k%p.width,F=Math.floor(k/p.width),it=$,ft=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,st),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),e.texSubImage2D(i.TEXTURE_2D,0,st,F,it,ft,D,V,p.data)}x.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ht),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Et),i.pixelStorei(i.UNPACK_SKIP_ROWS,yt)}}function lt(x,p,D){let V=i.TEXTURE_2D;(p.isDataArrayTexture||p.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),p.isData3DTexture&&(V=i.TEXTURE_3D);const Z=Vt(x,p),q=p.source;e.bindTexture(V,x.__webglTexture,i.TEXTURE0+D);const vt=n.get(q);if(q.version!==vt.__version||Z===!0){e.activeTexture(i.TEXTURE0+D);const ht=ee.getPrimaries(ee.workingColorSpace),Et=p.colorSpace===Ti?null:ee.getPrimaries(p.colorSpace),yt=p.colorSpace===Ti||ht===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let et=M(p.image,!1,s.maxTextureSize);et=X(p,et);const P=r.convert(p.format,p.colorSpace),W=r.convert(p.type);let k=E(p.internalFormat,P,W,p.colorSpace,p.isVideoTexture);Lt(V,p);let $;const st=p.mipmaps,F=p.isVideoTexture!==!0,it=vt.__version===void 0||Z===!0,ft=q.dataReady,Mt=A(p,et);if(p.isDepthTexture)k=S(p.format===Ar,p.type),it&&(F?e.texStorage2D(i.TEXTURE_2D,1,k,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,k,et.width,et.height,0,P,W,null));else if(p.isDataTexture)if(st.length>0){F&&it&&e.texStorage2D(i.TEXTURE_2D,Mt,k,st[0].width,st[0].height);for(let gt=0,rt=st.length;gt<rt;gt++)$=st[gt],F?ft&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,$.width,$.height,P,W,$.data):e.texImage2D(i.TEXTURE_2D,gt,k,$.width,$.height,0,P,W,$.data);p.generateMipmaps=!1}else F?(it&&e.texStorage2D(i.TEXTURE_2D,Mt,k,et.width,et.height),ft&&Ot(p,et,P,W)):e.texImage2D(i.TEXTURE_2D,0,k,et.width,et.height,0,P,W,et.data);else if(p.isCompressedTexture)if(p.isCompressedArrayTexture){F&&it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,k,st[0].width,st[0].height,et.depth);for(let gt=0,rt=st.length;gt<rt;gt++)if($=st[gt],p.format!==Rn)if(P!==null)if(F){if(ft)if(p.layerUpdates.size>0){const xt=uh($.width,$.height,p.format,p.type);for(const Ft of p.layerUpdates){const Qt=$.data.subarray(Ft*xt/$.data.BYTES_PER_ELEMENT,(Ft+1)*xt/$.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,Ft,$.width,$.height,1,P,Qt)}p.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,$.width,$.height,et.depth,P,$.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,gt,k,$.width,$.height,et.depth,0,$.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?ft&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,$.width,$.height,et.depth,P,W,$.data):e.texImage3D(i.TEXTURE_2D_ARRAY,gt,k,$.width,$.height,et.depth,0,P,W,$.data)}else{F&&it&&e.texStorage2D(i.TEXTURE_2D,Mt,k,st[0].width,st[0].height);for(let gt=0,rt=st.length;gt<rt;gt++)$=st[gt],p.format!==Rn?P!==null?F?ft&&e.compressedTexSubImage2D(i.TEXTURE_2D,gt,0,0,$.width,$.height,P,$.data):e.compressedTexImage2D(i.TEXTURE_2D,gt,k,$.width,$.height,0,$.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?ft&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,$.width,$.height,P,W,$.data):e.texImage2D(i.TEXTURE_2D,gt,k,$.width,$.height,0,P,W,$.data)}else if(p.isDataArrayTexture)if(F){if(it&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,k,et.width,et.height,et.depth),ft)if(p.layerUpdates.size>0){const gt=uh(et.width,et.height,p.format,p.type);for(const rt of p.layerUpdates){const xt=et.data.subarray(rt*gt/et.data.BYTES_PER_ELEMENT,(rt+1)*gt/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,rt,et.width,et.height,1,P,W,xt)}p.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,P,W,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,k,et.width,et.height,et.depth,0,P,W,et.data);else if(p.isData3DTexture)F?(it&&e.texStorage3D(i.TEXTURE_3D,Mt,k,et.width,et.height,et.depth),ft&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,P,W,et.data)):e.texImage3D(i.TEXTURE_3D,0,k,et.width,et.height,et.depth,0,P,W,et.data);else if(p.isFramebufferTexture){if(it)if(F)e.texStorage2D(i.TEXTURE_2D,Mt,k,et.width,et.height);else{let gt=et.width,rt=et.height;for(let xt=0;xt<Mt;xt++)e.texImage2D(i.TEXTURE_2D,xt,k,gt,rt,0,P,W,null),gt>>=1,rt>>=1}}else if(st.length>0){if(F&&it){const gt=ut(st[0]);e.texStorage2D(i.TEXTURE_2D,Mt,k,gt.width,gt.height)}for(let gt=0,rt=st.length;gt<rt;gt++)$=st[gt],F?ft&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,P,W,$):e.texImage2D(i.TEXTURE_2D,gt,k,P,W,$);p.generateMipmaps=!1}else if(F){if(it){const gt=ut(et);e.texStorage2D(i.TEXTURE_2D,Mt,k,gt.width,gt.height)}ft&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,P,W,et)}else e.texImage2D(i.TEXTURE_2D,0,k,P,W,et);v(p)&&g(V),vt.__version=q.version,p.onUpdate&&p.onUpdate(p)}x.__version=p.version}function pt(x,p,D){if(p.image.length!==6)return;const V=Vt(x,p),Z=p.source;e.bindTexture(i.TEXTURE_CUBE_MAP,x.__webglTexture,i.TEXTURE0+D);const q=n.get(Z);if(Z.version!==q.__version||V===!0){e.activeTexture(i.TEXTURE0+D);const vt=ee.getPrimaries(ee.workingColorSpace),ht=p.colorSpace===Ti?null:ee.getPrimaries(p.colorSpace),Et=p.colorSpace===Ti||vt===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const yt=p.isCompressedTexture||p.image[0].isCompressedTexture,et=p.image[0]&&p.image[0].isDataTexture,P=[];for(let rt=0;rt<6;rt++)!yt&&!et?P[rt]=M(p.image[rt],!0,s.maxCubemapSize):P[rt]=et?p.image[rt].image:p.image[rt],P[rt]=X(p,P[rt]);const W=P[0],k=r.convert(p.format,p.colorSpace),$=r.convert(p.type),st=E(p.internalFormat,k,$,p.colorSpace),F=p.isVideoTexture!==!0,it=q.__version===void 0||V===!0,ft=Z.dataReady;let Mt=A(p,W);Lt(i.TEXTURE_CUBE_MAP,p);let gt;if(yt){F&&it&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,st,W.width,W.height);for(let rt=0;rt<6;rt++){gt=P[rt].mipmaps;for(let xt=0;xt<gt.length;xt++){const Ft=gt[xt];p.format!==Rn?k!==null?F?ft&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt,0,0,Ft.width,Ft.height,k,Ft.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt,st,Ft.width,Ft.height,0,Ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt,0,0,Ft.width,Ft.height,k,$,Ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt,st,Ft.width,Ft.height,0,k,$,Ft.data)}}}else{if(gt=p.mipmaps,F&&it){gt.length>0&&Mt++;const rt=ut(P[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,st,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(et){F?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,P[rt].width,P[rt].height,k,$,P[rt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,st,P[rt].width,P[rt].height,0,k,$,P[rt].data);for(let xt=0;xt<gt.length;xt++){const Qt=gt[xt].image[rt].image;F?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt+1,0,0,Qt.width,Qt.height,k,$,Qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt+1,st,Qt.width,Qt.height,0,k,$,Qt.data)}}else{F?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,k,$,P[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,st,k,$,P[rt]);for(let xt=0;xt<gt.length;xt++){const Ft=gt[xt];F?ft&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt+1,0,0,k,$,Ft.image[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,xt+1,st,k,$,Ft.image[rt])}}}v(p)&&g(i.TEXTURE_CUBE_MAP),q.__version=Z.version,p.onUpdate&&p.onUpdate(p)}x.__version=p.version}function At(x,p,D,V,Z,q){const vt=r.convert(D.format,D.colorSpace),ht=r.convert(D.type),Et=E(D.internalFormat,vt,ht,D.colorSpace),yt=n.get(p),et=n.get(D);if(et.__renderTarget=p,!yt.__hasExternalTextures){const P=Math.max(1,p.width>>q),W=Math.max(1,p.height>>q);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?e.texImage3D(Z,q,Et,P,W,p.depth,0,vt,ht,null):e.texImage2D(Z,q,Et,P,W,0,vt,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,x),L(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,Z,et.__webglTexture,0,O(p)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,Z,et.__webglTexture,q),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(x,p,D){if(i.bindRenderbuffer(i.RENDERBUFFER,x),p.depthBuffer){const V=p.depthTexture,Z=V&&V.isDepthTexture?V.type:null,q=S(p.stencilBuffer,Z),vt=p.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=O(p);L(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,q,p.width,p.height):D?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,q,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,q,p.width,p.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,vt,i.RENDERBUFFER,x)}else{const V=p.textures;for(let Z=0;Z<V.length;Z++){const q=V[Z],vt=r.convert(q.format,q.colorSpace),ht=r.convert(q.type),Et=E(q.internalFormat,vt,ht,q.colorSpace),yt=O(p);D&&L(p)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,Et,p.width,p.height):L(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt,Et,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,Et,p.width,p.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(x,p){if(p&&p.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,x),!(p.depthTexture&&p.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const V=n.get(p.depthTexture);V.__renderTarget=p,(!V.__webglTexture||p.depthTexture.image.width!==p.width||p.depthTexture.image.height!==p.height)&&(p.depthTexture.image.width=p.width,p.depthTexture.image.height=p.height,p.depthTexture.needsUpdate=!0),j(p.depthTexture,0);const Z=V.__webglTexture,q=O(p);if(p.depthTexture.format===wr)L(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(p.depthTexture.format===Ar)L(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Wt(x){const p=n.get(x),D=x.isWebGLCubeRenderTarget===!0;if(p.__boundDepthTexture!==x.depthTexture){const V=x.depthTexture;if(p.__depthDisposeCallback&&p.__depthDisposeCallback(),V){const Z=()=>{delete p.__boundDepthTexture,delete p.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),p.__depthDisposeCallback=Z}p.__boundDepthTexture=V}if(x.depthTexture&&!p.__autoAllocateDepthBuffer){if(D)throw new Error("target.depthTexture not supported in Cube render targets");const V=x.texture.mipmaps;V&&V.length>0?Ct(p.__webglFramebuffer[0],x):Ct(p.__webglFramebuffer,x)}else if(D){p.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[V]),p.__webglDepthbuffer[V]===void 0)p.__webglDepthbuffer[V]=i.createRenderbuffer(),Dt(p.__webglDepthbuffer[V],x,!1);else{const Z=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=p.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,q)}}else{const V=x.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer),p.__webglDepthbuffer===void 0)p.__webglDepthbuffer=i.createRenderbuffer(),Dt(p.__webglDepthbuffer,x,!1);else{const Z=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=p.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,q)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(x,p,D){const V=n.get(x);p!==void 0&&At(V.__webglFramebuffer,x,x.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),D!==void 0&&Wt(x)}function z(x){const p=x.texture,D=n.get(x),V=n.get(p);x.addEventListener("dispose",U);const Z=x.textures,q=x.isWebGLCubeRenderTarget===!0,vt=Z.length>1;if(vt||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=p.version,a.memory.textures++),q){D.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(p.mipmaps&&p.mipmaps.length>0){D.__webglFramebuffer[ht]=[];for(let Et=0;Et<p.mipmaps.length;Et++)D.__webglFramebuffer[ht][Et]=i.createFramebuffer()}else D.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(p.mipmaps&&p.mipmaps.length>0){D.__webglFramebuffer=[];for(let ht=0;ht<p.mipmaps.length;ht++)D.__webglFramebuffer[ht]=i.createFramebuffer()}else D.__webglFramebuffer=i.createFramebuffer();if(vt)for(let ht=0,Et=Z.length;ht<Et;ht++){const yt=n.get(Z[ht]);yt.__webglTexture===void 0&&(yt.__webglTexture=i.createTexture(),a.memory.textures++)}if(x.samples>0&&L(x)===!1){D.__webglMultisampledFramebuffer=i.createFramebuffer(),D.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let ht=0;ht<Z.length;ht++){const Et=Z[ht];D.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,D.__webglColorRenderbuffer[ht]);const yt=r.convert(Et.format,Et.colorSpace),et=r.convert(Et.type),P=E(Et.internalFormat,yt,et,Et.colorSpace,x.isXRRenderTarget===!0),W=O(x);i.renderbufferStorageMultisample(i.RENDERBUFFER,W,P,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,D.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),x.depthBuffer&&(D.__webglDepthRenderbuffer=i.createRenderbuffer(),Dt(D.__webglDepthRenderbuffer,x,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Lt(i.TEXTURE_CUBE_MAP,p);for(let ht=0;ht<6;ht++)if(p.mipmaps&&p.mipmaps.length>0)for(let Et=0;Et<p.mipmaps.length;Et++)At(D.__webglFramebuffer[ht][Et],x,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Et);else At(D.__webglFramebuffer[ht],x,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);v(p)&&g(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let ht=0,Et=Z.length;ht<Et;ht++){const yt=Z[ht],et=n.get(yt);let P=i.TEXTURE_2D;(x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(P=x.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(P,et.__webglTexture),Lt(P,yt),At(D.__webglFramebuffer,x,yt,i.COLOR_ATTACHMENT0+ht,P,0),v(yt)&&g(P)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(ht=x.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,V.__webglTexture),Lt(ht,p),p.mipmaps&&p.mipmaps.length>0)for(let Et=0;Et<p.mipmaps.length;Et++)At(D.__webglFramebuffer[Et],x,p,i.COLOR_ATTACHMENT0,ht,Et);else At(D.__webglFramebuffer,x,p,i.COLOR_ATTACHMENT0,ht,0);v(p)&&g(ht),e.unbindTexture()}x.depthBuffer&&Wt(x)}function _t(x){const p=x.textures;for(let D=0,V=p.length;D<V;D++){const Z=p[D];if(v(Z)){const q=T(x),vt=n.get(Z).__webglTexture;e.bindTexture(q,vt),g(q),e.unbindTexture()}}}const dt=[],B=[];function _(x){if(x.samples>0){if(L(x)===!1){const p=x.textures,D=x.width,V=x.height;let Z=i.COLOR_BUFFER_BIT;const q=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=n.get(x),ht=p.length>1;if(ht)for(let yt=0;yt<p.length;yt++)e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer);const Et=x.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let yt=0;yt<p.length;yt++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,vt.__webglColorRenderbuffer[yt]);const et=n.get(p[yt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,et,0)}i.blitFramebuffer(0,0,D,V,0,0,D,V,Z,i.NEAREST),l===!0&&(dt.length=0,B.length=0,dt.push(i.COLOR_ATTACHMENT0+yt),x.depthBuffer&&x.resolveDepthBuffer===!1&&(dt.push(q),B.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,dt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let yt=0;yt<p.length;yt++){e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,vt.__webglColorRenderbuffer[yt]);const et=n.get(p[yt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&l){const p=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[p])}}}function O(x){return Math.min(s.maxSamples,x.samples)}function L(x){const p=n.get(x);return x.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&p.__useRenderToTexture!==!1}function H(x){const p=a.render.frame;h.get(x)!==p&&(h.set(x,p),x.update())}function X(x,p){const D=x.colorSpace,V=x.format,Z=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||D!==Ws&&D!==Ti&&(ee.getTransfer(D)===ae?(V!==Rn||Z!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",D)),p}function ut(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(c.width=x.naturalWidth||x.width,c.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(c.width=x.displayWidth,c.height=x.displayHeight):(c.width=x.width,c.height=x.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=G,this.setTexture2D=j,this.setTexture2DArray=tt,this.setTexture3D=ct,this.setTextureCube=Q,this.rebindTextures=Xt,this.setupRenderTarget=z,this.updateRenderTargetMipmap=_t,this.updateMultisampleRenderTarget=_,this.setupDepthRenderbuffer=Wt,this.setupFrameBufferTexture=At,this.useMultisampledRTT=L}function iv(i,t){function e(n,s=Ti){let r;const a=ee.getTransfer(s);if(n===Kn)return i.UNSIGNED_BYTE;if(n===jl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===uu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===du)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===cu)return i.BYTE;if(n===hu)return i.SHORT;if(n===Er)return i.UNSIGNED_SHORT;if(n===$l)return i.INT;if(n===ts)return i.UNSIGNED_INT;if(n===Yn)return i.FLOAT;if(n===ci)return i.HALF_FLOAT;if(n===fu)return i.ALPHA;if(n===pu)return i.RGB;if(n===Rn)return i.RGBA;if(n===wr)return i.DEPTH_COMPONENT;if(n===Ar)return i.DEPTH_STENCIL;if(n===Zl)return i.RED;if(n===Jl)return i.RED_INTEGER;if(n===mu)return i.RG;if(n===Ql)return i.RG_INTEGER;if(n===tc)return i.RGBA_INTEGER;if(n===Da||n===Ia||n===Ua||n===Na)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Da)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Da)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ua)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Na)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ul||n===dl||n===fl||n===pl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ul)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===dl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===pl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ml||n===gl||n===_l)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ml||n===gl)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_l)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vl||n===xl||n===Ml||n===yl||n===Sl||n===bl||n===El||n===Tl||n===wl||n===Al||n===Rl||n===Cl||n===Pl||n===Ll)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===vl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ml)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Sl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===El)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Tl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Al)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Rl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Cl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pl)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ll)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Dl||n===Il||n===Ul)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Dl)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ul)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Nl||n===Fl||n===Ol||n===kl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Nl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Fl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ol)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===kl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Tr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const sv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class av{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Lu(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Oe({vertexShader:sv,fragmentShader:rv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new de(new ui(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ov extends ns{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const M=typeof XRWebGLBinding<"u",v=new av,g={},T=e.getContextAttributes();let E=null,S=null;const A=[],C=[],U=new mt;let I=null;const b=new pn;b.viewport=new fe;const y=new pn;y.viewport=new fe;const R=[b,y],G=new wp;let Y=null,nt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(lt){let pt=A[lt];return pt===void 0&&(pt=new Ro,A[lt]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(lt){let pt=A[lt];return pt===void 0&&(pt=new Ro,A[lt]=pt),pt.getGripSpace()},this.getHand=function(lt){let pt=A[lt];return pt===void 0&&(pt=new Ro,A[lt]=pt),pt.getHandSpace()};function j(lt){const pt=C.indexOf(lt.inputSource);if(pt===-1)return;const At=A[pt];At!==void 0&&(At.update(lt.inputSource,lt.frame,c||a),At.dispatchEvent({type:lt.type,data:lt.inputSource}))}function tt(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",tt),s.removeEventListener("inputsourceschange",ct);for(let lt=0;lt<A.length;lt++){const pt=C[lt];pt!==null&&(C[lt]=null,A[lt].disconnect(pt))}Y=null,nt=null,v.reset();for(const lt in g)delete g[lt];t.setRenderTarget(E),f=null,d=null,u=null,s=null,S=null,Ot.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(lt){r=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(lt){o=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(lt){c=lt},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&M&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(lt){if(s=lt,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",tt),s.addEventListener("inputsourceschange",ct),T.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(U),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let At=null,Dt=null,Ct=null;T.depth&&(Ct=T.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,At=T.stencil?Ar:wr,Dt=T.stencil?Tr:ts);const Wt={colorFormat:e.RGBA8,depthFormat:Ct,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Wt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),S=new Bn(d.textureWidth,d.textureHeight,{format:Rn,type:Kn,depthTexture:new Pu(d.textureWidth,d.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,At),stencilBuffer:T.stencil,colorSpace:t.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const At={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,At),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Bn(f.framebufferWidth,f.framebufferHeight,{format:Rn,type:Kn,colorSpace:t.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ot.setContext(s),Ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function ct(lt){for(let pt=0;pt<lt.removed.length;pt++){const At=lt.removed[pt],Dt=C.indexOf(At);Dt>=0&&(C[Dt]=null,A[Dt].disconnect(At))}for(let pt=0;pt<lt.added.length;pt++){const At=lt.added[pt];let Dt=C.indexOf(At);if(Dt===-1){for(let Wt=0;Wt<A.length;Wt++)if(Wt>=C.length){C.push(At),Dt=Wt;break}else if(C[Wt]===null){C[Wt]=At,Dt=Wt;break}if(Dt===-1)break}const Ct=A[Dt];Ct&&Ct.connect(At)}}const Q=new N,St=new N;function wt(lt,pt,At){Q.setFromMatrixPosition(pt.matrixWorld),St.setFromMatrixPosition(At.matrixWorld);const Dt=Q.distanceTo(St),Ct=pt.projectionMatrix.elements,Wt=At.projectionMatrix.elements,Xt=Ct[14]/(Ct[10]-1),z=Ct[14]/(Ct[10]+1),_t=(Ct[9]+1)/Ct[5],dt=(Ct[9]-1)/Ct[5],B=(Ct[8]-1)/Ct[0],_=(Wt[8]+1)/Wt[0],O=Xt*B,L=Xt*_,H=Dt/(-B+_),X=H*-B;if(pt.matrixWorld.decompose(lt.position,lt.quaternion,lt.scale),lt.translateX(X),lt.translateZ(H),lt.matrixWorld.compose(lt.position,lt.quaternion,lt.scale),lt.matrixWorldInverse.copy(lt.matrixWorld).invert(),Ct[10]===-1)lt.projectionMatrix.copy(pt.projectionMatrix),lt.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const ut=Xt+H,x=z+H,p=O-X,D=L+(Dt-X),V=_t*z/x*ut,Z=dt*z/x*ut;lt.projectionMatrix.makePerspective(p,D,V,Z,ut,x),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert()}}function bt(lt,pt){pt===null?lt.matrixWorld.copy(lt.matrix):lt.matrixWorld.multiplyMatrices(pt.matrixWorld,lt.matrix),lt.matrixWorldInverse.copy(lt.matrixWorld).invert()}this.updateCamera=function(lt){if(s===null)return;let pt=lt.near,At=lt.far;v.texture!==null&&(v.depthNear>0&&(pt=v.depthNear),v.depthFar>0&&(At=v.depthFar)),G.near=y.near=b.near=pt,G.far=y.far=b.far=At,(Y!==G.near||nt!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),Y=G.near,nt=G.far),G.layers.mask=lt.layers.mask|6,b.layers.mask=G.layers.mask&3,y.layers.mask=G.layers.mask&5;const Dt=lt.parent,Ct=G.cameras;bt(G,Dt);for(let Wt=0;Wt<Ct.length;Wt++)bt(Ct[Wt],Dt);Ct.length===2?wt(G,b,y):G.projectionMatrix.copy(b.projectionMatrix),Lt(lt,G,Dt)};function Lt(lt,pt,At){At===null?lt.matrix.copy(pt.matrixWorld):(lt.matrix.copy(At.matrixWorld),lt.matrix.invert(),lt.matrix.multiply(pt.matrixWorld)),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.updateMatrixWorld(!0),lt.projectionMatrix.copy(pt.projectionMatrix),lt.projectionMatrixInverse.copy(pt.projectionMatrixInverse),lt.isPerspectiveCamera&&(lt.fov=Rr*2*Math.atan(1/lt.projectionMatrix.elements[5]),lt.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(lt){l=lt,d!==null&&(d.fixedFoveation=lt),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=lt)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(G)},this.getCameraTexture=function(lt){return g[lt]};let Vt=null;function Yt(lt,pt){if(h=pt.getViewerPose(c||a),m=pt,h!==null){const At=h.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let Dt=!1;At.length!==G.cameras.length&&(G.cameras.length=0,Dt=!0);for(let z=0;z<At.length;z++){const _t=At[z];let dt=null;if(f!==null)dt=f.getViewport(_t);else{const _=u.getViewSubImage(d,_t);dt=_.viewport,z===0&&(t.setRenderTargetTextures(S,_.colorTexture,_.depthStencilTexture),t.setRenderTarget(S))}let B=R[z];B===void 0&&(B=new pn,B.layers.enable(z),B.viewport=new fe,R[z]=B),B.matrix.fromArray(_t.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(_t.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(dt.x,dt.y,dt.width,dt.height),z===0&&(G.matrix.copy(B.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Dt===!0&&G.cameras.push(B)}const Ct=s.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){u=n.getBinding();const z=u.getDepthInformation(At[0]);z&&z.isValid&&z.texture&&v.init(z,s.renderState)}if(Ct&&Ct.includes("camera-access")&&M){t.state.unbindTexture(),u=n.getBinding();for(let z=0;z<At.length;z++){const _t=At[z].camera;if(_t){let dt=g[_t];dt||(dt=new Lu,g[_t]=dt);const B=u.getCameraImage(_t);dt.sourceTexture=B}}}}for(let At=0;At<A.length;At++){const Dt=C[At],Ct=A[At];Dt!==null&&Ct!==void 0&&Ct.update(Dt,pt,c||a)}Vt&&Vt(lt,pt),pt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pt}),m=null}const Ot=new Vu;Ot.setAnimationLoop(Yt),this.setAnimationLoop=function(lt){Vt=lt},this.dispose=function(){}}}const Bi=new _n,lv=new ie;function cv(i,t){function e(v,g){v.matrixAutoUpdate===!0&&v.updateMatrix(),g.value.copy(v.matrix)}function n(v,g){g.color.getRGB(v.fogColor.value,bu(i)),g.isFog?(v.fogNear.value=g.near,v.fogFar.value=g.far):g.isFogExp2&&(v.fogDensity.value=g.density)}function s(v,g,T,E,S){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(v,g):g.isMeshToonMaterial?(r(v,g),u(v,g)):g.isMeshPhongMaterial?(r(v,g),h(v,g)):g.isMeshStandardMaterial?(r(v,g),d(v,g),g.isMeshPhysicalMaterial&&f(v,g,S)):g.isMeshMatcapMaterial?(r(v,g),m(v,g)):g.isMeshDepthMaterial?r(v,g):g.isMeshDistanceMaterial?(r(v,g),M(v,g)):g.isMeshNormalMaterial?r(v,g):g.isLineBasicMaterial?(a(v,g),g.isLineDashedMaterial&&o(v,g)):g.isPointsMaterial?l(v,g,T,E):g.isSpriteMaterial?c(v,g):g.isShadowMaterial?(v.color.value.copy(g.color),v.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(v,g){v.opacity.value=g.opacity,g.color&&v.diffuse.value.copy(g.color),g.emissive&&v.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(v.map.value=g.map,e(g.map,v.mapTransform)),g.alphaMap&&(v.alphaMap.value=g.alphaMap,e(g.alphaMap,v.alphaMapTransform)),g.bumpMap&&(v.bumpMap.value=g.bumpMap,e(g.bumpMap,v.bumpMapTransform),v.bumpScale.value=g.bumpScale,g.side===Ye&&(v.bumpScale.value*=-1)),g.normalMap&&(v.normalMap.value=g.normalMap,e(g.normalMap,v.normalMapTransform),v.normalScale.value.copy(g.normalScale),g.side===Ye&&v.normalScale.value.negate()),g.displacementMap&&(v.displacementMap.value=g.displacementMap,e(g.displacementMap,v.displacementMapTransform),v.displacementScale.value=g.displacementScale,v.displacementBias.value=g.displacementBias),g.emissiveMap&&(v.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,v.emissiveMapTransform)),g.specularMap&&(v.specularMap.value=g.specularMap,e(g.specularMap,v.specularMapTransform)),g.alphaTest>0&&(v.alphaTest.value=g.alphaTest);const T=t.get(g),E=T.envMap,S=T.envMapRotation;E&&(v.envMap.value=E,Bi.copy(S),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),v.envMapRotation.value.setFromMatrix4(lv.makeRotationFromEuler(Bi)),v.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=g.reflectivity,v.ior.value=g.ior,v.refractionRatio.value=g.refractionRatio),g.lightMap&&(v.lightMap.value=g.lightMap,v.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,v.lightMapTransform)),g.aoMap&&(v.aoMap.value=g.aoMap,v.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,v.aoMapTransform))}function a(v,g){v.diffuse.value.copy(g.color),v.opacity.value=g.opacity,g.map&&(v.map.value=g.map,e(g.map,v.mapTransform))}function o(v,g){v.dashSize.value=g.dashSize,v.totalSize.value=g.dashSize+g.gapSize,v.scale.value=g.scale}function l(v,g,T,E){v.diffuse.value.copy(g.color),v.opacity.value=g.opacity,v.size.value=g.size*T,v.scale.value=E*.5,g.map&&(v.map.value=g.map,e(g.map,v.uvTransform)),g.alphaMap&&(v.alphaMap.value=g.alphaMap,e(g.alphaMap,v.alphaMapTransform)),g.alphaTest>0&&(v.alphaTest.value=g.alphaTest)}function c(v,g){v.diffuse.value.copy(g.color),v.opacity.value=g.opacity,v.rotation.value=g.rotation,g.map&&(v.map.value=g.map,e(g.map,v.mapTransform)),g.alphaMap&&(v.alphaMap.value=g.alphaMap,e(g.alphaMap,v.alphaMapTransform)),g.alphaTest>0&&(v.alphaTest.value=g.alphaTest)}function h(v,g){v.specular.value.copy(g.specular),v.shininess.value=Math.max(g.shininess,1e-4)}function u(v,g){g.gradientMap&&(v.gradientMap.value=g.gradientMap)}function d(v,g){v.metalness.value=g.metalness,g.metalnessMap&&(v.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,v.metalnessMapTransform)),v.roughness.value=g.roughness,g.roughnessMap&&(v.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,v.roughnessMapTransform)),g.envMap&&(v.envMapIntensity.value=g.envMapIntensity)}function f(v,g,T){v.ior.value=g.ior,g.sheen>0&&(v.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),v.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(v.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,v.sheenColorMapTransform)),g.sheenRoughnessMap&&(v.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,v.sheenRoughnessMapTransform))),g.clearcoat>0&&(v.clearcoat.value=g.clearcoat,v.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(v.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,v.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(v.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Ye&&v.clearcoatNormalScale.value.negate())),g.dispersion>0&&(v.dispersion.value=g.dispersion),g.iridescence>0&&(v.iridescence.value=g.iridescence,v.iridescenceIOR.value=g.iridescenceIOR,v.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(v.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,v.iridescenceMapTransform)),g.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),g.transmission>0&&(v.transmission.value=g.transmission,v.transmissionSamplerMap.value=T.texture,v.transmissionSamplerSize.value.set(T.width,T.height),g.transmissionMap&&(v.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,v.transmissionMapTransform)),v.thickness.value=g.thickness,g.thicknessMap&&(v.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=g.attenuationDistance,v.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(v.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(v.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=g.specularIntensity,v.specularColor.value.copy(g.specularColor),g.specularColorMap&&(v.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,v.specularColorMapTransform)),g.specularIntensityMap&&(v.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,v.specularIntensityMapTransform))}function m(v,g){g.matcap&&(v.matcap.value=g.matcap)}function M(v,g){const T=t.get(g).light;v.referencePosition.value.setFromMatrixPosition(T.matrixWorld),v.nearDistance.value=T.shadow.camera.near,v.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function hv(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const S=E.program;n.uniformBlockBinding(T,S)}function c(T,E){let S=s[T.id];S===void 0&&(m(T),S=h(T),s[T.id]=S,T.addEventListener("dispose",v));const A=E.program;n.updateUBOMapping(T,A);const C=t.render.frame;r[T.id]!==C&&(d(T),r[T.id]=C)}function h(T){const E=u();T.__bindingPointIndex=E;const S=i.createBuffer(),A=T.__size,C=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,A,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,S),S}function u(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const E=s[T.id],S=T.uniforms,A=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let C=0,U=S.length;C<U;C++){const I=Array.isArray(S[C])?S[C]:[S[C]];for(let b=0,y=I.length;b<y;b++){const R=I[b];if(f(R,C,b,A)===!0){const G=R.__offset,Y=Array.isArray(R.value)?R.value:[R.value];let nt=0;for(let j=0;j<Y.length;j++){const tt=Y[j],ct=M(tt);typeof tt=="number"||typeof tt=="boolean"?(R.__data[0]=tt,i.bufferSubData(i.UNIFORM_BUFFER,G+nt,R.__data)):tt.isMatrix3?(R.__data[0]=tt.elements[0],R.__data[1]=tt.elements[1],R.__data[2]=tt.elements[2],R.__data[3]=0,R.__data[4]=tt.elements[3],R.__data[5]=tt.elements[4],R.__data[6]=tt.elements[5],R.__data[7]=0,R.__data[8]=tt.elements[6],R.__data[9]=tt.elements[7],R.__data[10]=tt.elements[8],R.__data[11]=0):(tt.toArray(R.__data,nt),nt+=ct.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(T,E,S,A){const C=T.value,U=E+"_"+S;if(A[U]===void 0)return typeof C=="number"||typeof C=="boolean"?A[U]=C:A[U]=C.clone(),!0;{const I=A[U];if(typeof C=="number"||typeof C=="boolean"){if(I!==C)return A[U]=C,!0}else if(I.equals(C)===!1)return I.copy(C),!0}return!1}function m(T){const E=T.uniforms;let S=0;const A=16;for(let U=0,I=E.length;U<I;U++){const b=Array.isArray(E[U])?E[U]:[E[U]];for(let y=0,R=b.length;y<R;y++){const G=b[y],Y=Array.isArray(G.value)?G.value:[G.value];for(let nt=0,j=Y.length;nt<j;nt++){const tt=Y[nt],ct=M(tt),Q=S%A,St=Q%ct.boundary,wt=Q+St;S+=St,wt!==0&&A-wt<ct.storage&&(S+=A-wt),G.__data=new Float32Array(ct.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=S,S+=ct.storage}}}const C=S%A;return C>0&&(S+=A-C),T.__size=S,T.__cache={},this}function M(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function v(T){const E=T.target;E.removeEventListener("dispose",v);const S=a.indexOf(E.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function g(){for(const T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:l,update:c,dispose:g}}class uv{constructor(t={}){const{canvas:e=lf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),M=new Int32Array(4);let v=null,g=null;const T=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let A=!1;this._outputColorSpace=He;let C=0,U=0,I=null,b=-1,y=null;const R=new fe,G=new fe;let Y=null;const nt=new Ut(0);let j=0,tt=e.width,ct=e.height,Q=1,St=null,wt=null;const bt=new fe(0,0,tt,ct),Lt=new fe(0,0,tt,ct);let Vt=!1;const Yt=new lc;let Ot=!1,lt=!1;const pt=new ie,At=new N,Dt=new fe,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function Xt(){return I===null?Q:1}let z=n;function _t(w,K){return e.getContext(w,K)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Xl}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),z===null){const K="webgl2";if(z=_t(K,w),z===null)throw _t(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let dt,B,_,O,L,H,X,ut,x,p,D,V,Z,q,vt,ht,Et,yt,et,P,W,k,$,st;function F(){dt=new yg(z),dt.init(),k=new iv(z,dt),B=new pg(z,dt,t,k),_=new ev(z,dt),B.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),O=new Eg(z),L=new V_,H=new nv(z,dt,_,L,B,k,O),X=new gg(S),ut=new Mg(S),x=new Pp(z),$=new dg(z,x),p=new Sg(z,x,O,$),D=new wg(z,p,x,O),et=new Tg(z,B,H),ht=new mg(L),V=new H_(S,X,ut,dt,B,$,ht),Z=new cv(S,L),q=new W_,vt=new K_(dt),yt=new ug(S,X,ut,_,D,f,l),Et=new Q_(S,D,B),st=new hv(z,O,B,_),P=new fg(z,dt,O),W=new bg(z,dt,O),O.programs=V.programs,S.capabilities=B,S.extensions=dt,S.properties=L,S.renderLists=q,S.shadowMap=Et,S.state=_,S.info=O}F();const it=new ov(S,z);this.xr=it,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const w=dt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=dt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(w){w!==void 0&&(Q=w,this.setSize(tt,ct,!1))},this.getSize=function(w){return w.set(tt,ct)},this.setSize=function(w,K,at=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}tt=w,ct=K,e.width=Math.floor(w*Q),e.height=Math.floor(K*Q),at===!0&&(e.style.width=w+"px",e.style.height=K+"px"),this.setViewport(0,0,w,K)},this.getDrawingBufferSize=function(w){return w.set(tt*Q,ct*Q).floor()},this.setDrawingBufferSize=function(w,K,at){tt=w,ct=K,Q=at,e.width=Math.floor(w*at),e.height=Math.floor(K*at),this.setViewport(0,0,w,K)},this.getCurrentViewport=function(w){return w.copy(R)},this.getViewport=function(w){return w.copy(bt)},this.setViewport=function(w,K,at,ot){w.isVector4?bt.set(w.x,w.y,w.z,w.w):bt.set(w,K,at,ot),_.viewport(R.copy(bt).multiplyScalar(Q).round())},this.getScissor=function(w){return w.copy(Lt)},this.setScissor=function(w,K,at,ot){w.isVector4?Lt.set(w.x,w.y,w.z,w.w):Lt.set(w,K,at,ot),_.scissor(G.copy(Lt).multiplyScalar(Q).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(w){_.setScissorTest(Vt=w)},this.setOpaqueSort=function(w){St=w},this.setTransparentSort=function(w){wt=w},this.getClearColor=function(w){return w.copy(yt.getClearColor())},this.setClearColor=function(){yt.setClearColor(...arguments)},this.getClearAlpha=function(){return yt.getClearAlpha()},this.setClearAlpha=function(){yt.setClearAlpha(...arguments)},this.clear=function(w=!0,K=!0,at=!0){let ot=0;if(w){let J=!1;if(I!==null){const Tt=I.texture.format;J=Tt===tc||Tt===Ql||Tt===Jl}if(J){const Tt=I.texture.type,Pt=Tt===Kn||Tt===ts||Tt===Er||Tt===Tr||Tt===jl||Tt===Kl,Nt=yt.getClearColor(),It=yt.getClearAlpha(),Ht=Nt.r,Gt=Nt.g,kt=Nt.b;Pt?(m[0]=Ht,m[1]=Gt,m[2]=kt,m[3]=It,z.clearBufferuiv(z.COLOR,0,m)):(M[0]=Ht,M[1]=Gt,M[2]=kt,M[3]=It,z.clearBufferiv(z.COLOR,0,M))}else ot|=z.COLOR_BUFFER_BIT}K&&(ot|=z.DEPTH_BUFFER_BIT),at&&(ot|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),yt.dispose(),q.dispose(),vt.dispose(),L.dispose(),X.dispose(),ut.dispose(),D.dispose(),$.dispose(),st.dispose(),V.dispose(),it.dispose(),it.removeEventListener("sessionstart",Ve),it.removeEventListener("sessionend",rs),Ln.stop()};function ft(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const w=O.autoReset,K=Et.enabled,at=Et.autoUpdate,ot=Et.needsUpdate,J=Et.type;F(),O.autoReset=w,Et.enabled=K,Et.autoUpdate=at,Et.needsUpdate=ot,Et.type=J}function gt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function rt(w){const K=w.target;K.removeEventListener("dispose",rt),xt(K)}function xt(w){Ft(w),L.remove(w)}function Ft(w){const K=L.get(w).programs;K!==void 0&&(K.forEach(function(at){V.releaseProgram(at)}),w.isShaderMaterial&&V.releaseShaderCache(w))}this.renderBufferDirect=function(w,K,at,ot,J,Tt){K===null&&(K=Ct);const Pt=J.isMesh&&J.matrixWorld.determinant()<0,Nt=Wn(w,K,at,ot,J);_.setMaterial(ot,Pt);let It=at.index,Ht=1;if(ot.wireframe===!0){if(It=p.getWireframeAttribute(at),It===void 0)return;Ht=2}const Gt=at.drawRange,kt=at.attributes.position;let Jt=Gt.start*Ht,le=(Gt.start+Gt.count)*Ht;Tt!==null&&(Jt=Math.max(Jt,Tt.start*Ht),le=Math.min(le,(Tt.start+Tt.count)*Ht)),It!==null?(Jt=Math.max(Jt,0),le=Math.min(le,It.count)):kt!=null&&(Jt=Math.max(Jt,0),le=Math.min(le,kt.count));const Me=le-Jt;if(Me<0||Me===1/0)return;$.setup(J,ot,Nt,at,It);let ge,pe=P;if(It!==null&&(ge=x.get(It),pe=W,pe.setIndex(ge)),J.isMesh)ot.wireframe===!0?(_.setLineWidth(ot.wireframeLinewidth*Xt()),pe.setMode(z.LINES)):pe.setMode(z.TRIANGLES);else if(J.isLine){let Bt=ot.linewidth;Bt===void 0&&(Bt=1),_.setLineWidth(Bt*Xt()),J.isLineSegments?pe.setMode(z.LINES):J.isLineLoop?pe.setMode(z.LINE_LOOP):pe.setMode(z.LINE_STRIP)}else J.isPoints?pe.setMode(z.POINTS):J.isSprite&&pe.setMode(z.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)Cr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pe.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(dt.get("WEBGL_multi_draw"))pe.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const Bt=J._multiDrawStarts,_e=J._multiDrawCounts,ne=J._multiDrawCount,hn=It?x.get(It).bytesPerElement:1,as=L.get(ot).currentProgram.getUniforms();for(let un=0;un<ne;un++)as.setValue(z,"_gl_DrawID",un),pe.render(Bt[un]/hn,_e[un])}else if(J.isInstancedMesh)pe.renderInstances(Jt,Me,J.count);else if(at.isInstancedBufferGeometry){const Bt=at._maxInstanceCount!==void 0?at._maxInstanceCount:1/0,_e=Math.min(at.instanceCount,Bt);pe.renderInstances(Jt,Me,_e)}else pe.render(Jt,Me)};function Qt(w,K,at){w.transparent===!0&&w.side===Fe&&w.forceSinglePass===!1?(w.side=Ye,w.needsUpdate=!0,Ze(w,K,at),w.side=di,w.needsUpdate=!0,Ze(w,K,at),w.side=Fe):Ze(w,K,at)}this.compile=function(w,K,at=null){at===null&&(at=w),g=vt.get(at),g.init(K),E.push(g),at.traverseVisible(function(J){J.isLight&&J.layers.test(K.layers)&&(g.pushLight(J),J.castShadow&&g.pushShadow(J))}),w!==at&&w.traverseVisible(function(J){J.isLight&&J.layers.test(K.layers)&&(g.pushLight(J),J.castShadow&&g.pushShadow(J))}),g.setupLights();const ot=new Set;return w.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const Tt=J.material;if(Tt)if(Array.isArray(Tt))for(let Pt=0;Pt<Tt.length;Pt++){const Nt=Tt[Pt];Qt(Nt,at,J),ot.add(Nt)}else Qt(Tt,at,J),ot.add(Tt)}),g=E.pop(),ot},this.compileAsync=function(w,K,at=null){const ot=this.compile(w,K,at);return new Promise(J=>{function Tt(){if(ot.forEach(function(Pt){L.get(Pt).currentProgram.isReady()&&ot.delete(Pt)}),ot.size===0){J(w);return}setTimeout(Tt,10)}dt.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let te=null;function Ke(w){te&&te(w)}function Ve(){Ln.stop()}function rs(){Ln.start()}const Ln=new Vu;Ln.setAnimationLoop(Ke),typeof self<"u"&&Ln.setContext(self),this.setAnimationLoop=function(w){te=w,it.setAnimationLoop(w),w===null?Ln.stop():Ln.start()},it.addEventListener("sessionstart",Ve),it.addEventListener("sessionend",rs),this.render=function(w,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(K),K=it.getCamera()),w.isScene===!0&&w.onBeforeRender(S,w,K,I),g=vt.get(w,E.length),g.init(K),E.push(g),pt.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),Yt.setFromProjectionMatrix(pt,$n,K.reversedDepth),lt=this.localClippingEnabled,Ot=ht.init(this.clippingPlanes,lt),v=q.get(w,T.length),v.init(),T.push(v),it.enabled===!0&&it.isPresenting===!0){const Tt=S.xr.getDepthSensingMesh();Tt!==null&&ti(Tt,K,-1/0,S.sortObjects)}ti(w,K,0,S.sortObjects),v.finish(),S.sortObjects===!0&&v.sort(St,wt),Wt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Wt&&yt.addToRenderList(v,w),this.info.render.frame++,Ot===!0&&ht.beginShadows();const at=g.state.shadowsArray;Et.render(at,w,K),Ot===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();const ot=v.opaque,J=v.transmissive;if(g.setupLights(),K.isArrayCamera){const Tt=K.cameras;if(J.length>0)for(let Pt=0,Nt=Tt.length;Pt<Nt;Pt++){const It=Tt[Pt];ke(ot,J,w,It)}Wt&&yt.render(w);for(let Pt=0,Nt=Tt.length;Pt<Nt;Pt++){const It=Tt[Pt];pi(v,w,It,It.viewport)}}else J.length>0&&ke(ot,J,w,K),Wt&&yt.render(w),pi(v,w,K);I!==null&&U===0&&(H.updateMultisampleRenderTarget(I),H.updateRenderTargetMipmap(I)),w.isScene===!0&&w.onAfterRender(S,w,K),$.resetDefaultState(),b=-1,y=null,E.pop(),E.length>0?(g=E[E.length-1],Ot===!0&&ht.setGlobalState(S.clippingPlanes,g.state.camera)):g=null,T.pop(),T.length>0?v=T[T.length-1]:v=null};function ti(w,K,at,ot){if(w.visible===!1)return;if(w.layers.test(K.layers)){if(w.isGroup)at=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(K);else if(w.isLight)g.pushLight(w),w.castShadow&&g.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Yt.intersectsSprite(w)){ot&&Dt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(pt);const Pt=D.update(w),Nt=w.material;Nt.visible&&v.push(w,Pt,Nt,at,Dt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Yt.intersectsObject(w))){const Pt=D.update(w),Nt=w.material;if(ot&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Dt.copy(w.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),Dt.copy(Pt.boundingSphere.center)),Dt.applyMatrix4(w.matrixWorld).applyMatrix4(pt)),Array.isArray(Nt)){const It=Pt.groups;for(let Ht=0,Gt=It.length;Ht<Gt;Ht++){const kt=It[Ht],Jt=Nt[kt.materialIndex];Jt&&Jt.visible&&v.push(w,Pt,Jt,at,Dt.z,kt)}}else Nt.visible&&v.push(w,Pt,Nt,at,Dt.z,null)}}const Tt=w.children;for(let Pt=0,Nt=Tt.length;Pt<Nt;Pt++)ti(Tt[Pt],K,at,ot)}function pi(w,K,at,ot){const J=w.opaque,Tt=w.transmissive,Pt=w.transparent;g.setupLightsView(at),Ot===!0&&ht.setGlobalState(S.clippingPlanes,at),ot&&_.viewport(R.copy(ot)),J.length>0&&xn(J,K,at),Tt.length>0&&xn(Tt,K,at),Pt.length>0&&xn(Pt,K,at),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function ke(w,K,at,ot){if((at.isScene===!0?at.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[ot.id]===void 0&&(g.state.transmissionRenderTarget[ot.id]=new Bn(1,1,{generateMipmaps:!0,type:dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float")?ci:Kn,minFilter:ji,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const Tt=g.state.transmissionRenderTarget[ot.id],Pt=ot.viewport||R;Tt.setSize(Pt.z*S.transmissionResolutionScale,Pt.w*S.transmissionResolutionScale);const Nt=S.getRenderTarget(),It=S.getActiveCubeFace(),Ht=S.getActiveMipmapLevel();S.setRenderTarget(Tt),S.getClearColor(nt),j=S.getClearAlpha(),j<1&&S.setClearColor(16777215,.5),S.clear(),Wt&&yt.render(at);const Gt=S.toneMapping;S.toneMapping=Ri;const kt=ot.viewport;if(ot.viewport!==void 0&&(ot.viewport=void 0),g.setupLightsView(ot),Ot===!0&&ht.setGlobalState(S.clippingPlanes,ot),xn(w,at,ot),H.updateMultisampleRenderTarget(Tt),H.updateRenderTargetMipmap(Tt),dt.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let le=0,Me=K.length;le<Me;le++){const ge=K[le],pe=ge.object,Bt=ge.geometry,_e=ge.material,ne=ge.group;if(_e.side===Fe&&pe.layers.test(ot.layers)){const hn=_e.side;_e.side=Ye,_e.needsUpdate=!0,Mn(pe,at,ot,Bt,_e,ne),_e.side=hn,_e.needsUpdate=!0,Jt=!0}}Jt===!0&&(H.updateMultisampleRenderTarget(Tt),H.updateRenderTargetMipmap(Tt))}S.setRenderTarget(Nt,It,Ht),S.setClearColor(nt,j),kt!==void 0&&(ot.viewport=kt),S.toneMapping=Gt}function xn(w,K,at){const ot=K.isScene===!0?K.overrideMaterial:null;for(let J=0,Tt=w.length;J<Tt;J++){const Pt=w[J],Nt=Pt.object,It=Pt.geometry,Ht=Pt.group;let Gt=Pt.material;Gt.allowOverride===!0&&ot!==null&&(Gt=ot),Nt.layers.test(at.layers)&&Mn(Nt,K,at,It,Gt,Ht)}}function Mn(w,K,at,ot,J,Tt){w.onBeforeRender(S,K,at,ot,J,Tt),w.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),J.onBeforeRender(S,K,at,ot,w,Tt),J.transparent===!0&&J.side===Fe&&J.forceSinglePass===!1?(J.side=Ye,J.needsUpdate=!0,S.renderBufferDirect(at,K,ot,J,w,Tt),J.side=di,J.needsUpdate=!0,S.renderBufferDirect(at,K,ot,J,w,Tt),J.side=Fe):S.renderBufferDirect(at,K,ot,J,w,Tt),w.onAfterRender(S,K,at,ot,J,Tt)}function Ze(w,K,at){K.isScene!==!0&&(K=Ct);const ot=L.get(w),J=g.state.lights,Tt=g.state.shadowsArray,Pt=J.state.version,Nt=V.getParameters(w,J.state,Tt,K,at),It=V.getProgramCacheKey(Nt);let Ht=ot.programs;ot.environment=w.isMeshStandardMaterial?K.environment:null,ot.fog=K.fog,ot.envMap=(w.isMeshStandardMaterial?ut:X).get(w.envMap||ot.environment),ot.envMapRotation=ot.environment!==null&&w.envMap===null?K.environmentRotation:w.envMapRotation,Ht===void 0&&(w.addEventListener("dispose",rt),Ht=new Map,ot.programs=Ht);let Gt=Ht.get(It);if(Gt!==void 0){if(ot.currentProgram===Gt&&ot.lightsStateVersion===Pt)return Gn(w,Nt),Gt}else Nt.uniforms=V.getUniforms(w),w.onBeforeCompile(Nt,S),Gt=V.acquireProgram(Nt,It),Ht.set(It,Gt),ot.uniforms=Nt.uniforms;const kt=ot.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(kt.clippingPlanes=ht.uniform),Gn(w,Nt),ot.needsLights=zr(w),ot.lightsStateVersion=Pt,ot.needsLights&&(kt.ambientLightColor.value=J.state.ambient,kt.lightProbe.value=J.state.probe,kt.directionalLights.value=J.state.directional,kt.directionalLightShadows.value=J.state.directionalShadow,kt.spotLights.value=J.state.spot,kt.spotLightShadows.value=J.state.spotShadow,kt.rectAreaLights.value=J.state.rectArea,kt.ltc_1.value=J.state.rectAreaLTC1,kt.ltc_2.value=J.state.rectAreaLTC2,kt.pointLights.value=J.state.point,kt.pointLightShadows.value=J.state.pointShadow,kt.hemisphereLights.value=J.state.hemi,kt.directionalShadowMap.value=J.state.directionalShadowMap,kt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,kt.spotShadowMap.value=J.state.spotShadowMap,kt.spotLightMatrix.value=J.state.spotLightMatrix,kt.spotLightMap.value=J.state.spotLightMap,kt.pointShadowMap.value=J.state.pointShadowMap,kt.pointShadowMatrix.value=J.state.pointShadowMatrix),ot.currentProgram=Gt,ot.uniformsList=null,Gt}function cn(w){if(w.uniformsList===null){const K=w.currentProgram.getUniforms();w.uniformsList=Fa.seqWithValue(K.seq,w.uniforms)}return w.uniformsList}function Gn(w,K){const at=L.get(w);at.outputColorSpace=K.outputColorSpace,at.batching=K.batching,at.batchingColor=K.batchingColor,at.instancing=K.instancing,at.instancingColor=K.instancingColor,at.instancingMorph=K.instancingMorph,at.skinning=K.skinning,at.morphTargets=K.morphTargets,at.morphNormals=K.morphNormals,at.morphColors=K.morphColors,at.morphTargetsCount=K.morphTargetsCount,at.numClippingPlanes=K.numClippingPlanes,at.numIntersection=K.numClipIntersection,at.vertexAlphas=K.vertexAlphas,at.vertexTangents=K.vertexTangents,at.toneMapping=K.toneMapping}function Wn(w,K,at,ot,J){K.isScene!==!0&&(K=Ct),H.resetTextureUnits();const Tt=K.fog,Pt=ot.isMeshStandardMaterial?K.environment:null,Nt=I===null?S.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ws,It=(ot.isMeshStandardMaterial?ut:X).get(ot.envMap||Pt),Ht=ot.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,Gt=!!at.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),kt=!!at.morphAttributes.position,Jt=!!at.morphAttributes.normal,le=!!at.morphAttributes.color;let Me=Ri;ot.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Me=S.toneMapping);const ge=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,pe=ge!==void 0?ge.length:0,Bt=L.get(ot),_e=g.state.lights;if(Ot===!0&&(lt===!0||w!==y)){const Je=w===y&&ot.id===b;ht.setState(ot,w,Je)}let ne=!1;ot.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==_e.state.version||Bt.outputColorSpace!==Nt||J.isBatchedMesh&&Bt.batching===!1||!J.isBatchedMesh&&Bt.batching===!0||J.isBatchedMesh&&Bt.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&Bt.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&Bt.instancing===!1||!J.isInstancedMesh&&Bt.instancing===!0||J.isSkinnedMesh&&Bt.skinning===!1||!J.isSkinnedMesh&&Bt.skinning===!0||J.isInstancedMesh&&Bt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Bt.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Bt.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Bt.instancingMorph===!1&&J.morphTexture!==null||Bt.envMap!==It||ot.fog===!0&&Bt.fog!==Tt||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==ht.numPlanes||Bt.numIntersection!==ht.numIntersection)||Bt.vertexAlphas!==Ht||Bt.vertexTangents!==Gt||Bt.morphTargets!==kt||Bt.morphNormals!==Jt||Bt.morphColors!==le||Bt.toneMapping!==Me||Bt.morphTargetsCount!==pe)&&(ne=!0):(ne=!0,Bt.__version=ot.version);let hn=Bt.currentProgram;ne===!0&&(hn=Ze(ot,K,J));let as=!1,un=!1,er=!1;const ve=hn.getUniforms(),yn=Bt.uniforms;if(_.useProgram(hn.program)&&(as=!0,un=!0,er=!0),ot.id!==b&&(b=ot.id,un=!0),as||y!==w){_.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ve.setValue(z,"projectionMatrix",w.projectionMatrix),ve.setValue(z,"viewMatrix",w.matrixWorldInverse);const sn=ve.map.cameraPosition;sn!==void 0&&sn.setValue(z,At.setFromMatrixPosition(w.matrixWorld)),B.logarithmicDepthBuffer&&ve.setValue(z,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&ve.setValue(z,"isOrthographic",w.isOrthographicCamera===!0),y!==w&&(y=w,un=!0,er=!0)}if(J.isSkinnedMesh){ve.setOptional(z,J,"bindMatrix"),ve.setOptional(z,J,"bindMatrixInverse");const Je=J.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),ve.setValue(z,"boneTexture",Je.boneTexture,H))}J.isBatchedMesh&&(ve.setOptional(z,J,"batchingTexture"),ve.setValue(z,"batchingTexture",J._matricesTexture,H),ve.setOptional(z,J,"batchingIdTexture"),ve.setValue(z,"batchingIdTexture",J._indirectTexture,H),ve.setOptional(z,J,"batchingColorTexture"),J._colorsTexture!==null&&ve.setValue(z,"batchingColorTexture",J._colorsTexture,H));const Sn=at.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&et.update(J,at,hn),(un||Bt.receiveShadow!==J.receiveShadow)&&(Bt.receiveShadow=J.receiveShadow,ve.setValue(z,"receiveShadow",J.receiveShadow)),ot.isMeshGouraudMaterial&&ot.envMap!==null&&(yn.envMap.value=It,yn.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),ot.isMeshStandardMaterial&&ot.envMap===null&&K.environment!==null&&(yn.envMapIntensity.value=K.environmentIntensity),un&&(ve.setValue(z,"toneMappingExposure",S.toneMappingExposure),Bt.needsLights&&io(yn,er),Tt&&ot.fog===!0&&Z.refreshFogUniforms(yn,Tt),Z.refreshMaterialUniforms(yn,ot,Q,ct,g.state.transmissionRenderTarget[w.id]),Fa.upload(z,cn(Bt),yn,H)),ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(Fa.upload(z,cn(Bt),yn,H),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&ve.setValue(z,"center",J.center),ve.setValue(z,"modelViewMatrix",J.modelViewMatrix),ve.setValue(z,"normalMatrix",J.normalMatrix),ve.setValue(z,"modelMatrix",J.matrixWorld),ot.isShaderMaterial||ot.isRawShaderMaterial){const Je=ot.uniformsGroups;for(let sn=0,ro=Je.length;sn<ro;sn++){const Ii=Je[sn];st.update(Ii,hn),st.bind(Ii,hn)}}return hn}function io(w,K){w.ambientLightColor.needsUpdate=K,w.lightProbe.needsUpdate=K,w.directionalLights.needsUpdate=K,w.directionalLightShadows.needsUpdate=K,w.pointLights.needsUpdate=K,w.pointLightShadows.needsUpdate=K,w.spotLights.needsUpdate=K,w.spotLightShadows.needsUpdate=K,w.rectAreaLights.needsUpdate=K,w.hemisphereLights.needsUpdate=K}function zr(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(w,K,at){const ot=L.get(w);ot.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,ot.__autoAllocateDepthBuffer===!1&&(ot.__useRenderToTexture=!1),L.get(w.texture).__webglTexture=K,L.get(w.depthTexture).__webglTexture=ot.__autoAllocateDepthBuffer?void 0:at,ot.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,K){const at=L.get(w);at.__webglFramebuffer=K,at.__useDefaultFramebuffer=K===void 0};const Hr=z.createFramebuffer();this.setRenderTarget=function(w,K=0,at=0){I=w,C=K,U=at;let ot=!0,J=null,Tt=!1,Pt=!1;if(w){const It=L.get(w);if(It.__useDefaultFramebuffer!==void 0)_.bindFramebuffer(z.FRAMEBUFFER,null),ot=!1;else if(It.__webglFramebuffer===void 0)H.setupRenderTarget(w);else if(It.__hasExternalTextures)H.rebindTextures(w,L.get(w.texture).__webglTexture,L.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const kt=w.depthTexture;if(It.__boundDepthTexture!==kt){if(kt!==null&&L.has(kt)&&(w.width!==kt.image.width||w.height!==kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");H.setupDepthRenderbuffer(w)}}const Ht=w.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(Pt=!0);const Gt=L.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Gt[K])?J=Gt[K][at]:J=Gt[K],Tt=!0):w.samples>0&&H.useMultisampledRTT(w)===!1?J=L.get(w).__webglMultisampledFramebuffer:Array.isArray(Gt)?J=Gt[at]:J=Gt,R.copy(w.viewport),G.copy(w.scissor),Y=w.scissorTest}else R.copy(bt).multiplyScalar(Q).floor(),G.copy(Lt).multiplyScalar(Q).floor(),Y=Vt;if(at!==0&&(J=Hr),_.bindFramebuffer(z.FRAMEBUFFER,J)&&ot&&_.drawBuffers(w,J),_.viewport(R),_.scissor(G),_.setScissorTest(Y),Tt){const It=L.get(w.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+K,It.__webglTexture,at)}else if(Pt){const It=K;for(let Ht=0;Ht<w.textures.length;Ht++){const Gt=L.get(w.textures[Ht]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ht,Gt.__webglTexture,at,It)}}else if(w!==null&&at!==0){const It=L.get(w.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,It.__webglTexture,at)}b=-1},this.readRenderTargetPixels=function(w,K,at,ot,J,Tt,Pt,Nt=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=L.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Pt!==void 0&&(It=It[Pt]),It){_.bindFramebuffer(z.FRAMEBUFFER,It);try{const Ht=w.textures[Nt],Gt=Ht.format,kt=Ht.type;if(!B.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!B.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=w.width-ot&&at>=0&&at<=w.height-J&&(w.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Nt),z.readPixels(K,at,ot,J,k.convert(Gt),k.convert(kt),Tt))}finally{const Ht=I!==null?L.get(I).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,Ht)}}},this.readRenderTargetPixelsAsync=async function(w,K,at,ot,J,Tt,Pt,Nt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=L.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Pt!==void 0&&(It=It[Pt]),It)if(K>=0&&K<=w.width-ot&&at>=0&&at<=w.height-J){_.bindFramebuffer(z.FRAMEBUFFER,It);const Ht=w.textures[Nt],Gt=Ht.format,kt=Ht.type;if(!B.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!B.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Jt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Jt),z.bufferData(z.PIXEL_PACK_BUFFER,Tt.byteLength,z.STREAM_READ),w.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Nt),z.readPixels(K,at,ot,J,k.convert(Gt),k.convert(kt),0);const le=I!==null?L.get(I).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,le);const Me=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await cf(z,Me,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Jt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Tt),z.deleteBuffer(Jt),z.deleteSync(Me),Tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,K=null,at=0){const ot=Math.pow(2,-at),J=Math.floor(w.image.width*ot),Tt=Math.floor(w.image.height*ot),Pt=K!==null?K.x:0,Nt=K!==null?K.y:0;H.setTexture2D(w,0),z.copyTexSubImage2D(z.TEXTURE_2D,at,0,0,Pt,Nt,J,Tt),_.unbindTexture()};const so=z.createFramebuffer(),ud=z.createFramebuffer();this.copyTextureToTexture=function(w,K,at=null,ot=null,J=0,Tt=null){Tt===null&&(J!==0?(Cr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Tt=J,J=0):Tt=0);let Pt,Nt,It,Ht,Gt,kt,Jt,le,Me;const ge=w.isCompressedTexture?w.mipmaps[Tt]:w.image;if(at!==null)Pt=at.max.x-at.min.x,Nt=at.max.y-at.min.y,It=at.isBox3?at.max.z-at.min.z:1,Ht=at.min.x,Gt=at.min.y,kt=at.isBox3?at.min.z:0;else{const Sn=Math.pow(2,-J);Pt=Math.floor(ge.width*Sn),Nt=Math.floor(ge.height*Sn),w.isDataArrayTexture?It=ge.depth:w.isData3DTexture?It=Math.floor(ge.depth*Sn):It=1,Ht=0,Gt=0,kt=0}ot!==null?(Jt=ot.x,le=ot.y,Me=ot.z):(Jt=0,le=0,Me=0);const pe=k.convert(K.format),Bt=k.convert(K.type);let _e;K.isData3DTexture?(H.setTexture3D(K,0),_e=z.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(H.setTexture2DArray(K,0),_e=z.TEXTURE_2D_ARRAY):(H.setTexture2D(K,0),_e=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,K.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,K.unpackAlignment);const ne=z.getParameter(z.UNPACK_ROW_LENGTH),hn=z.getParameter(z.UNPACK_IMAGE_HEIGHT),as=z.getParameter(z.UNPACK_SKIP_PIXELS),un=z.getParameter(z.UNPACK_SKIP_ROWS),er=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,ge.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ge.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Ht),z.pixelStorei(z.UNPACK_SKIP_ROWS,Gt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,kt);const ve=w.isDataArrayTexture||w.isData3DTexture,yn=K.isDataArrayTexture||K.isData3DTexture;if(w.isDepthTexture){const Sn=L.get(w),Je=L.get(K),sn=L.get(Sn.__renderTarget),ro=L.get(Je.__renderTarget);_.bindFramebuffer(z.READ_FRAMEBUFFER,sn.__webglFramebuffer),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,ro.__webglFramebuffer);for(let Ii=0;Ii<It;Ii++)ve&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,L.get(w).__webglTexture,J,kt+Ii),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,L.get(K).__webglTexture,Tt,Me+Ii)),z.blitFramebuffer(Ht,Gt,Pt,Nt,Jt,le,Pt,Nt,z.DEPTH_BUFFER_BIT,z.NEAREST);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(J!==0||w.isRenderTargetTexture||L.has(w)){const Sn=L.get(w),Je=L.get(K);_.bindFramebuffer(z.READ_FRAMEBUFFER,so),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,ud);for(let sn=0;sn<It;sn++)ve?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Sn.__webglTexture,J,kt+sn):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Sn.__webglTexture,J),yn?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Je.__webglTexture,Tt,Me+sn):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Je.__webglTexture,Tt),J!==0?z.blitFramebuffer(Ht,Gt,Pt,Nt,Jt,le,Pt,Nt,z.COLOR_BUFFER_BIT,z.NEAREST):yn?z.copyTexSubImage3D(_e,Tt,Jt,le,Me+sn,Ht,Gt,Pt,Nt):z.copyTexSubImage2D(_e,Tt,Jt,le,Ht,Gt,Pt,Nt);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else yn?w.isDataTexture||w.isData3DTexture?z.texSubImage3D(_e,Tt,Jt,le,Me,Pt,Nt,It,pe,Bt,ge.data):K.isCompressedArrayTexture?z.compressedTexSubImage3D(_e,Tt,Jt,le,Me,Pt,Nt,It,pe,ge.data):z.texSubImage3D(_e,Tt,Jt,le,Me,Pt,Nt,It,pe,Bt,ge):w.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Tt,Jt,le,Pt,Nt,pe,Bt,ge.data):w.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Tt,Jt,le,ge.width,ge.height,pe,ge.data):z.texSubImage2D(z.TEXTURE_2D,Tt,Jt,le,Pt,Nt,pe,Bt,ge);z.pixelStorei(z.UNPACK_ROW_LENGTH,ne),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,hn),z.pixelStorei(z.UNPACK_SKIP_PIXELS,as),z.pixelStorei(z.UNPACK_SKIP_ROWS,un),z.pixelStorei(z.UNPACK_SKIP_IMAGES,er),Tt===0&&K.generateMipmaps&&z.generateMipmap(_e),_.unbindTexture()},this.initRenderTarget=function(w){L.get(w).__webglFramebuffer===void 0&&H.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?H.setTextureCube(w,0):w.isData3DTexture?H.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?H.setTexture2DArray(w,0):H.setTexture2D(w,0),_.unbindTexture()},this.resetState=function(){C=0,U=0,I=null,_.reset(),$.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}const Nh={type:"change"},vc={type:"start"},Yu={type:"end"},va=new sc,Fh=new Ei,dv=Math.cos(70*zn.DEG2RAD),Ae=new N,rn=2*Math.PI,ue={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vo=1e-6;class fv extends Rp{constructor(t,e=null){super(t,e),this.state=ue.NONE,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Fs.ROTATE,MIDDLE:Fs.DOLLY,RIGHT:Fs.PAN},this.touches={ONE:Is.ROTATE,TWO:Is.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new Hn,this._lastTargetPosition=new N,this._quat=new Hn().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new hh,this._sphericalDelta=new hh,this._scale=1,this._panOffset=new N,this._rotateStart=new mt,this._rotateEnd=new mt,this._rotateDelta=new mt,this._panStart=new mt,this._panEnd=new mt,this._panDelta=new mt,this._dollyStart=new mt,this._dollyEnd=new mt,this._dollyDelta=new mt,this._dollyDirection=new N,this._mouse=new mt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=mv.bind(this),this._onPointerDown=pv.bind(this),this._onPointerUp=gv.bind(this),this._onContextMenu=bv.bind(this),this._onMouseWheel=xv.bind(this),this._onKeyDown=Mv.bind(this),this._onTouchStart=yv.bind(this),this._onTouchMove=Sv.bind(this),this._onMouseDown=_v.bind(this),this._onMouseMove=vv.bind(this),this._interceptControlDown=Ev.bind(this),this._interceptControlUp=Tv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Nh),this.update(),this.state=ue.NONE}update(t=null){const e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===ue.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=rn:n>Math.PI&&(n-=rn),s<-Math.PI?s+=rn:s>Math.PI&&(s-=rn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ae.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(va.origin.copy(this.object.position),va.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(va.direction))<dv?this.object.lookAt(this.target):(Fh.setFromNormalAndCoplanarPoint(this.object.up,this.target),va.intersectPlane(Fh,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Vo||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vo||this._lastTargetPosition.distanceToSquared(this.target)>Vo?(this.dispatchEvent(Nh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?rn/60*this.autoRotateSpeed*t:rn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(rn*this._rotateDelta.x/e.clientHeight),this._rotateUp(rn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-rn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(rn*this._rotateDelta.x/e.clientHeight),this._rotateUp(rn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new mt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function pv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function mv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function gv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yu),this.state=ue.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function _v(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Fs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ue.DOLLY;break;case Fs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ue.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ue.ROTATE}break;case Fs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ue.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ue.PAN}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(vc)}function vv(i){switch(this.state){case ue.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ue.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ue.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function xv(i){this.enabled===!1||this.enableZoom===!1||this.state!==ue.NONE||(i.preventDefault(),this.dispatchEvent(vc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Yu))}function Mv(i){this.enabled!==!1&&this._handleKeyDown(i)}function yv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Is.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ue.TOUCH_ROTATE;break;case Is.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ue.TOUCH_PAN;break;default:this.state=ue.NONE}break;case 2:switch(this.touches.TWO){case Is.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ue.TOUCH_DOLLY_PAN;break;case Is.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ue.TOUCH_DOLLY_ROTATE;break;default:this.state=ue.NONE}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(vc)}function Sv(i){switch(this._trackPointer(i),this.state){case ue.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ue.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ue.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ue.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ue.NONE}}function bv(i){this.enabled!==!1&&i.preventDefault()}function Ev(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Tv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Oa={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Qs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const wv=new gc(-1,1,1,-1,0,1);class Av extends se{constructor(){super(),this.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new zt([0,2,0,0,2,0],2))}}const Rv=new Av;class xc{constructor(t){this._mesh=new de(Rv,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,wv)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class $u extends Qs{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Oe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Pr.clone(t.uniforms),this.material=new Oe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new xc(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Oh extends Qs{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Cv extends Qs{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Pv{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new mt);this._width=n.width,this._height=n.height,e=new Bn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ci}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new $u(Oa),this.copyPass.material.blending=li,this.clock=new Ap}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Oh!==void 0&&(a instanceof Oh?n=!0:a instanceof Cv&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new mt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Lv extends Qs{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ut}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}}const Dv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ut(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class $s extends Qs{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new mt(t.x,t.y):new mt(256,256),this.clearColor=new Ut(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Bn(r,a,{type:ci}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new Bn(r,a,{type:ci});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new Bn(r,a,{type:ci});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}const o=Dv;this.highPassUniforms=Pr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Oe({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new mt(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Pr.clone(Oa.uniforms),this.blendMaterial=new Oe({uniforms:this.copyUniforms,vertexShader:Oa.vertexShader,fragmentShader:Oa.fragmentShader,blending:br,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ut,this._oldClearAlpha=1,this._basic=new Or,this._fsQuad=new xc(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new mt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=$s.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=$s.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Oe({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new mt(.5,.5)},direction:{value:new mt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(t){return new Oe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}$s.BlurDirectionX=new mt(1,0);$s.BlurDirectionY=new mt(0,1);const xa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Iv extends Qs{constructor(){super(),this.uniforms=Pr.clone(xa.uniforms),this.material=new _p({name:xa.name,uniforms:this.uniforms,vertexShader:xa.vertexShader,fragmentShader:xa.fragmentShader}),this._fsQuad=new xc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ee.getTransfer(this._outputColorSpace)===ae&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===nu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===iu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===su?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Yl?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===au?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ou?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ru&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Uv extends wu{constructor(){super();const t=new Pn;t.deleteAttribute("uv");const e=new wn({side:Ye}),n=new wn,s=new bp(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new de(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new oc(t,n,6),o=new be;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new de(t,ws(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new de(t,ws(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new de(t,ws(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new de(t,ws(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new de(t,ws(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new de(t,ws(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function ws(i){return new vp({color:0,emissive:16777215,emissiveIntensity:i})}function Nv(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new se;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=kh(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let M=0;M<a[h].length;++M)f.push(a[h][M][d]);const m=kh(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function kh(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new nn(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<e;m++){const M=h.getComponent(d,m);o.setComponent(d+u,m,M)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const dr=new N;function En(i,t,e,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;dr.copy(t),dr[n]=0,dr.normalize();const c=.5*a/(a+o),h=1-dr.angleTo(i)/l;return Math.sign(dr[e])===1?h*c:o/(a+o)+c+c*(1-h)}class Mc extends Pn{constructor(t=1,e=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new N,c=new N,h=new N(t,e,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,m=u.length/6,M=new N,v=.5/a;for(let g=0,T=0;g<u.length;g+=3,T+=2)switch(l.fromArray(u,g),c.copy(l),c.x-=Math.sign(c.x)*v,c.y-=Math.sign(c.y)*v,c.z-=Math.sign(c.z)*v,c.normalize(),u[g+0]=h.x*Math.sign(l.x)+c.x*r,u[g+1]=h.y*Math.sign(l.y)+c.y*r,u[g+2]=h.z*Math.sign(l.z)+c.z*r,d[g+0]=c.x,d[g+1]=c.y,d[g+2]=c.z,Math.floor(g/m)){case 0:M.set(1,0,0),f[T+0]=En(M,c,"z","y",r,n),f[T+1]=1-En(M,c,"y","z",r,e);break;case 1:M.set(-1,0,0),f[T+0]=1-En(M,c,"z","y",r,n),f[T+1]=1-En(M,c,"y","z",r,e);break;case 2:M.set(0,1,0),f[T+0]=1-En(M,c,"x","z",r,t),f[T+1]=En(M,c,"z","x",r,n);break;case 3:M.set(0,-1,0),f[T+0]=1-En(M,c,"x","z",r,t),f[T+1]=1-En(M,c,"z","x",r,n);break;case 4:M.set(0,0,1),f[T+0]=1-En(M,c,"x","y",r,t),f[T+1]=1-En(M,c,"y","x",r,e);break;case 5:M.set(0,0,-1),f[T+0]=En(M,c,"x","y",r,t),f[T+1]=1-En(M,c,"y","x",r,e);break}}static fromJSON(t){return new Mc(t.width,t.height,t.depth,t.segments,t.radius)}}const Xe=Math.PI*2;let ka=Te.seed;const on=()=>(ka=Math.imul(ka,1664525)+1013904223>>>0,ka/4294967296),Be=(i,t)=>i+(t-i)*on(),As=i=>zn.euclideanModulo(i,1),Go=(i,t,e)=>zn.smoothstep(e,i,t);function fr(i,t,e){const n=document.createElement("canvas");n.width=i,n.height=t;const s=n.getContext("2d");e(s,i,t);const r=new cc(n);return r.colorSpace=He,r.anisotropy=8,r}function tn(i,t,e,n=[0,0,0],s=[0,0,0]){const r=new de(i,t);return r.position.set(...n),r.rotation.set(...s),e.add(r),r}function qe(i,t={}){return new wn({color:i,roughness:.85,...t})}class Fv{constructor(t){this.scene=t,this.parts=new Map,this.matrix=new ie,this.euler=new _n,this.quat=new Hn}add(t,e,n=[0,0,0],s=[1,1,1],r=[0,0,0]){this.euler.set(...r),this.quat.setFromEuler(this.euler),this.matrix.compose(new N(...n),this.quat,new N(...s));const a=t.index?t.toNonIndexed():t.clone();a.applyMatrix4(this.matrix),a.deleteAttribute("uv"),a.deleteAttribute("color"),this.parts.has(e)||this.parts.set(e,[]),this.parts.get(e).push(a)}flush(){for(const[t,e]of this.parts){const n=Nv(e);e.forEach(r=>r.dispose());const s=new de(n,t);s.castShadow=!0,s.receiveShadow=!0,this.scene.add(s)}this.parts.clear()}}function Ov(i){ka=Te.seed;const t=Te.trackPoints.map(([P,W])=>new N(P,.24,W)),e=new Lr(t,!0,"centripetal",.5);e.arcLengthDivisions=4096,e.updateArcLengths();const n=e.getLength(),s=16;function r(P,W=0){P=As(P);const k=e.getPointAt(P),$=e.getTangentAt(P).normalize(),st=new N($.z,0,-$.x).normalize();return k.addScaledVector(st,W),{position:k,tangent:$,normal:st,yaw:Math.atan2($.x,$.z)}}const a=Array.from({length:1201},(P,W)=>e.getPointAt(W/1200));function o(P,W){let k=1/0,$;for(let st=0;st<1200;st++){const F=a[st],it=a[st+1],ft=it.x-F.x,Mt=it.z-F.z,gt=zn.clamp(((P-F.x)*ft+(W-F.z)*Mt)/(ft*ft+Mt*Mt),0,1),rt=F.x+ft*gt,xt=F.z+Mt*gt,Ft=(P-rt)**2+(W-xt)**2;Ft<k&&(k=Ft,$={u:As((st+gt)/1200),position:new N(rt,.24,xt),lateral:((P-rt)*Mt-(W-xt)*ft)/Math.hypot(ft,Mt),distance:Math.sqrt(Ft)})}return $}const l=Array.from({length:160},(P,W)=>{const k=e.getPointAt(W/160);return{x:k.x,z:k.z}}),c=new Fv(i),h=new Pn(1,1,1),u=new Zn(1,12,9),d=new Ji(1,1,1,10),f=new Ya(1,1,12),m={wood:qe("#aa7044"),lightWood:qe("#d6a567"),darkWood:qe("#674839"),cream:qe("#fff0cd"),coral:qe(Te.colors.accent),mint:qe("#69cbb8"),navy:qe("#244d59"),yellow:qe("#ffc970"),green:qe(Te.colors.leaves),darkGreen:qe(Te.colors.leavesDark),lime:qe(Te.colors.leavesLight),rock:qe("#a8a798"),darkRock:qe("#777f6f"),pink:qe("#f2a1a2"),white:qe("#fff9e8")};for(const P of[m.cream,m.coral,m.mint,m.yellow])P.side=Fe;const M={value:0};for(const P of[m.green,m.darkGreen,m.lime])P.side=Fe,P.onBeforeCompile=W=>{W.uniforms.windTime=M,W.vertexShader=`uniform float windTime;
`+W.vertexShader,W.vertexShader=W.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(windTime*1.2+position.x*.14+position.z*.11)*smoothstep(6.,18.,position.y)*.24;`)},P.customProgramCacheKey=()=>"aloha-frond-wind";const v=new Float32Array(256);for(let P=0;P<2048;P++){const W=e.getPointAt(P/2048),k=As(Math.atan2(W.z,W.x)/Xe),$=Math.floor(k*256)%256;v[$]=Math.max(v[$],Math.hypot(W.x,W.z))}for(let P=0;P<256;P++)if(!v[P])for(let W=1;W<40;W++){const k=v[(P+W)%256]||v[(P-W+256)%256];if(k){v[P]=k;break}}function g(P){const W=As(P/Xe)*256,k=Math.floor(W);return zn.lerp(v[k],v[(k+1)%256],W-k)+28+Math.sin(P*5)*2}const T=fr(512,512,(P,W,k)=>{P.fillStyle=Te.colors.sandTexture,P.fillRect(0,0,W,k);for(let $=0;$<42e3;$++){P.fillStyle=on()>.5?`rgba(255,250,220,${Be(.08,.3)})`:`rgba(147,111,62,${Be(.03,.15)})`;const st=Be(.4,1.5);P.fillRect(on()*W,on()*k,st,st)}});T.wrapS=T.wrapT=Ha,T.repeat.set(30,30);const E=[],S=[],A=[],C=[],U=new Ut(Te.colors.sand),I=new Ut(Te.colors.wetSand),b=new Ut(Te.colors.grass),y=24,R=256;for(let P=0;P<=y;P++)for(let W=0;W<=R;W++){const k=W/R*Xe,$=P/y,st=g(k)*$;let F=-.08;$>.89&&(F-=Go(.89,1,$)*1.27);const it=Math.cos(k)*st,ft=Math.sin(k)*st;E.push(it,F,ft),A.push((it+220)/440,(ft+220)/440);const Mt=1-Go(.5,.7,$+Math.sin(k*4)*.035),gt=U.clone().lerp(b,Mt).lerp(I,Go(.92,1,$)*.65);if(gt.multiplyScalar(.98+Math.sin(it*.8+ft*.5)*.02),S.push(gt.r,gt.g,gt.b),P<y&&W<R){const rt=P*(R+1)+W;C.push(rt,rt+1,rt+R+1,rt+1,rt+R+2,rt+R+1)}}const G=new se;G.setAttribute("position",new zt(E,3)),G.setAttribute("color",new zt(S,3)),G.setAttribute("uv",new zt(A,2)),G.setIndex(C),G.computeVertexNormals();const Y=tn(G,new wn({color:"#ffffff",vertexColors:!0,roughness:1,map:T}),i);Y.receiveShadow=!0;const nt={time:{value:0}},j=new Oe({uniforms:nt,side:Fe,vertexShader:"varying vec3 vWorld; uniform float time; void main(){vec3 p=position;p.y+=sin(p.x*.075+time*.8)*cos(p.z*.095+time*.6)*.065;vWorld=(modelMatrix*vec4(p,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(vWorld,1.);}",fragmentShader:`varying vec3 vWorld;uniform float time;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
 void main(){vec2 p=vWorld.xz;float r=length(p/vec2(1.,1.1));float deep=smoothstep(135.,510.,r);float n=noise(p*.025+time*.025);vec3 col=mix(vec3(.09,.72,.67),vec3(.04,.39,.61),deep);col=mix(col,vec3(.27,.84,.78),(1.-deep)*n*.7);float wave=sin(p.x*.25+sin(p.y*.16+time)*2.+time*.9)*sin(p.y*.27-time*.8);float sparkle=pow(max(0.,wave),22.)*(.4+noise(p*.13+time*.1)*.6);col+=vec3(.42,.66,.57)*sparkle*.23;float farAway=smoothstep(450.,1300.,length(p));col=mix(col,vec3(.64,.81,.85),farAway);gl_FragColor=vec4(col,1.);}`}),tt=new ui(3600,3600,100,100);tt.rotateX(-Math.PI/2),tn(tt,j,i,[0,-1.34,0]);for(let P=0;P<4;P++){const W=[],k=[],$=[];for(let it=0;it<=512;it++){const ft=it/512*Xe;for(let Mt=0;Mt<2;Mt++){const gt=g(ft)+2+P*5.2+Mt*(1.7+P*.7)+Math.sin(ft*19+P)*.7;W.push(Math.cos(ft)*gt,-1.17-P*.025,Math.sin(ft)*gt),k.push(it/512,Mt)}if(it<512){let Mt=it*2;$.push(Mt,Mt+2,Mt+1,Mt+1,Mt+2,Mt+3)}}const st=new se;st.setAttribute("position",new zt(W,3)),st.setAttribute("uv",new zt(k,2)),st.setIndex($),st.computeVertexNormals();const F=new Oe({transparent:!0,depthWrite:!1,side:Fe,uniforms:{time:nt.time,offset:{value:P}},vertexShader:"varying vec2 vUv;uniform float time,offset;void main(){vUv=uv;vec3 p=position;p.xz*=1.+sin(time*.35+offset*.9)*.009;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;uniform float time,offset;void main(){float edge=sin(vUv.y*3.14159);float bits=.55+.45*sin(vUv.x*580.+sin(time+vUv.x*140.));float fade=.6+.4*sin(time*.7+offset);gl_FragColor=vec4(.94,1.,.88,edge*bits*fade*(.55-offset*.1));}"});tn(st,F,i)}function ct(P,W,k,$=0){const st=[],F=[],it=[];for(let gt=0;gt<=1e3;gt++){const rt=gt/1e3;for(let xt=0;xt<2;xt++){const Ft=r(rt,P+(xt-.5)*W).position;st.push(Ft.x,Ft.y+$,Ft.z),F.push(xt,gt/25)}if(gt<1e3){const xt=gt*2;it.push(xt,xt+2,xt+1,xt+1,xt+2,xt+3)}}const ft=new se;ft.setAttribute("position",new zt(st,3)),ft.setAttribute("uv",new zt(F,2)),ft.setIndex(it),ft.computeVertexNormals();const Mt=tn(ft,k,i);return Mt.receiveShadow=!0,Mt}const Q=T.clone();Q.repeat.set(1,1),Q.needsUpdate=!0,ct(0,s,new wn({color:Te.colors.road,roughness:.96,map:Q}));const St=qe("#e0bc88",{transparent:!0,opacity:.16,depthWrite:!1});ct(-2.25,.55,St,.006),ct(2.25,.55,St,.006);const wt=new ie,bt=new Hn,Lt=new N(0,1,0),Vt=Math.floor(n/2.25),Yt=new Pn(.55,.24,2.2);for(let P=0;P<2;P++){const W=Math.ceil(Vt/2)*2,k=new oc(Yt,P?m.cream:m.coral,W);let $=0;for(let st=P;st<Vt;st+=2)for(const F of[-1,1]){const it=r(st/Vt,F*(s/2+.1));it.position.y+=.03,bt.setFromAxisAngle(Lt,it.yaw),wt.compose(it.position,bt,new N(1,1,1)),k.setMatrixAt($++,wt)}k.count=$,k.castShadow=!0,k.receiveShadow=!0,i.add(k)}function Ot(P,W,k=10,$=1,st=0){const F=new N(Math.cos(st),0,Math.sin(st)),it=[];for(let rt=0;rt<=7;rt++){const xt=rt/7;it.push(new N(P+F.x*$*xt*xt,k*xt,W+F.z*$*xt*xt))}const ft=new Ja(new Lr(it),10,.25,7,!1);c.add(ft,m.wood),ft.dispose();for(let rt=1;rt<11;rt++){const xt=rt/11;c.add(new Ys(.265,.026,3,8),m.lightWood,[P+F.x*$*xt*xt,k*xt,W+F.z*$*xt*xt],[1,1,1],[Math.PI/2,0,0])}const Mt=it[7];for(let rt=0;rt<9;rt++){let ti=function(ke){return new N(Mt.x+Qt*Ft*ke,Mt.y+Math.sin(ke*Math.PI)*1.5-ke*ke*2.45,Mt.z+te*Ft*ke)};var gt=ti;const xt=st+rt*Xe/9+Be(-.12,.12),Ft=Be(4.7,6.6)*(k/11)**.35,Qt=Math.cos(xt),te=Math.sin(xt),Ke=-te,Ve=Qt,rs=[],Ln=[];for(let ke=0;ke<13;ke++){const xn=.03+ke*.07,Mn=ti(xn),Ze=ti(xn+.075),cn=Math.sin(xn*Math.PI)*1.1*(1-xn*.35);for(const Gn of[-1,1]){const Wn=new N(Mn.x+Ke*cn*Gn-Qt*.4,Mn.y-.08-cn*.12,Mn.z+Ve*cn*Gn-te*.4);rs.push(Mn.x,Mn.y,Mn.z,Wn.x,Wn.y,Wn.z,Ze.x,Ze.y,Ze.z),Ln.push(0,0,1,0,0,1)}}for(let ke=0;ke<12;ke++){const xn=ke/12,Mn=(ke+1)/12,Ze=ti(xn),cn=ti(Mn),Gn=Math.sin(xn*Math.PI)*.57,Wn=Math.sin(Mn*Math.PI)*.57,io=[Ze.x+Ke*Gn,Ze.y-.08,Ze.z+Ve*Gn],zr=[Ze.x-Ke*Gn,Ze.y-.08,Ze.z-Ve*Gn],Hr=[cn.x+Ke*Wn,cn.y-.08,cn.z+Ve*Wn],so=[cn.x-Ke*Wn,cn.y-.08,cn.z-Ve*Wn];rs.push(...io,...Hr,...zr,...zr,...Hr,...so),Ln.push(0,0,0,1,1,0,1,0,0,1,1,1)}const pi=new se;pi.setAttribute("position",new zt(rs,3)),pi.setAttribute("uv",new zt(Ln,2)),pi.computeVertexNormals(),c.add(pi,[m.green,m.darkGreen,m.lime][rt%3]),pi.dispose()}for(let rt=0;rt<3;rt++)c.add(u,m.darkWood,[Mt.x+Math.cos(rt*2.2)*.35,Mt.y-.45,Mt.z+Math.sin(rt*2.2)*.35],[.25,.33,.25])}for(let P=0;P<69;P++){const W=As(P/69+Be(-.004,.004)),k=P%3===0?-1:1,$=k*Be(13.5,23),st=r(W,$).position;Ot(st.x,st.z,Be(8.5,13.5),Be(.6,2.9),on()*Xe)}function lt(P,W,k,$,st,F=4,it=1.2,ft=Te.colors.accent,Mt="#fff4d7"){const gt=fr(1024,256,(xt,Ft,Qt)=>{xt.fillStyle=ft,xt.fillRect(0,0,Ft,Qt),xt.strokeStyle=Mt,xt.lineWidth=6,xt.strokeRect(14,14,Ft-28,Qt-28),xt.fillStyle=Mt,xt.textAlign="center",xt.textBaseline="middle",xt.font=`900 ${P.length>12?68:92}px Trebuchet MS`,xt.fillText(P,Ft/2,Qt/2+4,Ft-75)}),rt=tn(new Pn(F,it,.14),new wn({map:gt,roughness:.85}),i,[W,k,$],[0,st,0]);return rt.castShadow=!0,rt}function pt(P,W,k=m.coral,$=1){c.add(d,m.lightWood,[P,2.1*$,W],[.065,4.2*$,.065]);for(let st=0;st<12;st++){const F=st/12*Xe,it=(st+1)/12*Xe,ft=new se;ft.setAttribute("position",new zt([P,4.55*$,W,P+Math.cos(F)*2.65*$,3.6*$,W+Math.sin(F)*2.65*$,P+Math.cos(it)*2.65*$,3.6*$,W+Math.sin(it)*2.65*$],3)),ft.computeVertexNormals(),c.add(ft,st%2?m.cream:k),ft.dispose()}c.add(u,m.cream,[P,4.6*$,W],[.13,.13,.13]);for(let st=0;st<2;st++){const F=P+(st?1.2:-1.2),it=W+.5;c.add(h,st?m.cream:k,[F,.37,it],[.9,.12,2.4]),c.add(h,st?m.cream:k,[F,.85,it-1],[.9,.12,1.3],[.75,0,0]);for(const ft of[-1,1])c.add(h,m.lightWood,[F,.2,it+ft*.7],[.82,.32,.08])}}for(const P of[.024,.064,.104,.186,.247,.345,.471,.645,.732,.78,.88,.94]){const W=r(P,-19).position;pt(W.x,W.z,on()>.5?m.coral:m.mint,Be(.7,1.1))}function At(P,W=1,k=1){const $=r(P,W*24),st=$.position;c.add(h,m.lightWood,[st.x,.35,st.z],[7*k,.55,6*k]),c.add(h,m.wood,[st.x,2.15*k,st.z],[5.9*k,3.6*k,4.7*k]);for(let F=0;F<5;F++)c.add(h,F%2?m.lightWood:m.wood,[st.x+(F-2)*1.18*k,2.15*k,st.z+2.4*k],[1.04*k,3.6*k,.1]);for(const F of[-1,1])c.add(h,m.darkWood,[st.x+F*3.1*k,2.25*k,st.z+2.9*k],[.22,4.1*k,.22]),c.add(h,m.navy,[st.x+F*1.7*k,2.3*k,st.z+2.5*k],[1.4*k,1.2*k,.12]);c.add(h,m.darkWood,[st.x,1.6*k,st.z+2.5*k],[1.05*k,2.6*k,.12]);for(let F=0;F<5;F++)c.add(new Ya(5.2*k-F*.18,2.8*k,4),F%2?m.lightWood:m.wood,[st.x,(5.1+F*.16)*k,st.z],[1,1,.86],[0,Math.PI/4,0]);lt(P<.1?"SURF & PURR":"SAKURA CLUB",st.x,3.4*k,st.z+3.05*k,0,3.1*k,.7*k);for(let F=0;F<3;F++)c.add(u,[m.coral,m.mint,m.yellow][F],[st.x+4.1*k+F*.45,1.5,st.z+1.2],[.26,1.7,.095],[0,0,-.15+F*.1])}At(.025,1,1.1),At(.14,1,.9),At(.71,1,1),At(.85,-1,.72);function Dt(P,W,k,$,st=.25){c.add(u,m.yellow,[P,W,k],[st*.36,st*.3,st*.36]);for(let F=0;F<5;F++){const it=F*Xe/5;c.add(u,$,[P+Math.cos(it)*st*.6,W+.03,k+Math.sin(it)*st*.6],[st*.55,st*.19,st*.32],[0,-it,0])}}for(let P=0;P<145;P++){const W=r(on(),Be(11,22)*(on()>.7?-1:1)).position,k=Be(.35,1.2);if(c.add(u,[m.green,m.darkGreen,m.lime][P%3],[W.x,k*.55-.08,W.z],[k,k*.65,k*.9]),P%2===0)for(let $=0;$<3;$++)Dt(W.x+Be(-k,k),k*.95,W.z+Be(-k,k),P%4?m.pink:m.white,Be(.2,.34))}for(let P=0;P<57;P++){const W=r(on(),-Be(13,25)).position,k=Be(.35,1.5);c.add(new uc(1,0),P%3?m.rock:m.darkRock,[W.x,k*.42-.1,W.z],[k,k*.6,k*.78],[on(),on(),on()])}const Ct=r(0),Wt=Ct.position,Xt=Ct.yaw;function z(P,W=0,k=0){return Wt.clone().addScaledVector(Ct.normal,P).addScaledVector(Ct.tangent,W).add(new N(0,k,0))}for(let P=0;P<2;P++)for(let W=0;W<12;W++){const k=z((W-5.5)*s/12,(P-.5)*1.1,.027);c.add(h,(W+P)%2?m.navy:m.cream,k.toArray(),[s/12,.025,1.1],[0,Xt,0])}for(const P of[-1,1]){const W=z(P*9.8,0,4);c.add(d,m.wood,W.toArray(),[.38,8,.38]);const k=z(P*9.8,0,.2);c.add(h,m.coral,k.toArray(),[1.3,.5,1.3],[0,Xt,0]);const $=z(P*9.8,0,8);c.add(u,m.yellow,$.toArray(),[.53,.53,.53])}const _t=z(0,0,7.4);c.add(h,m.lightWood,_t.toArray(),[20.3,.6,.5],[0,Xt,0]);const dt=z(0,.38,7.8);lt("SAKURA  COAST",dt.x,dt.y,dt.z,Xt,10,1.6,"#386d64","#fff0cd");for(let P=0;P<21;P++){const W=z((P-10)*.86,.36,6.65+Math.abs(P-10)*.024),k=new se;k.setAttribute("position",new zt([-.35,0,0,.35,0,0,0,-.65,0],3)),k.computeVertexNormals(),c.add(k,[m.coral,m.cream,m.mint,m.yellow][P%4],W.toArray(),[1,1,1],[0,Xt,0])}for(const P of[.105,.19,.3,.39,.5,.6,.68,.8,.92]){const W=r(P,-10);c.add(d,m.lightWood,[W.position.x,1.5,W.position.z],[.08,3,.08]),lt("› › ›",W.position.x,2.5,W.position.z,W.yaw+Math.PI/2,3.4,1.2)}function B(P,W,k=1){c.add(new Ki(1,2),m.darkRock,[P,8*k,W],[29*k,31*k,29*k],[0,.3,.07]),c.add(new Ki(1,2),m.green,[P-7*k,8*k,W+6*k],[29*k,20*k,24*k],[.2,.4,-.1]),c.add(new Ki(1,2),m.lime,[P+3*k,19*k,W+1*k],[15*k,17*k,14*k],[.2,1,.1]),c.add(new Ki(1,1),m.darkRock,[P+14*k,8*k,W-9*k],[15*k,27*k,17*k],[0,.9,-.2])}B(6,-25,1.25),B(420,170,2.7),B(-365,-320,2.1),B(70,-480,1.7);const _=r(.405,-20).position;c.add(d,m.cream,[_.x,.25,_.z],[4.7,.8,4.7]);for(let P=0;P<5;P++)c.add(new Ji(1.25-P*.055,1.45-P*.055,2.6,16),P%2?m.coral:m.cream,[_.x,1.8+P*2.6,_.z]);c.add(d,m.navy,[_.x,14.5,_.z],[2.05,.3,2.05]),c.add(d,m.mint,[_.x,15.55,_.z],[1.4,1.8,1.4]),c.add(f,m.coral,[_.x,17.1,_.z],[2.1,1.3,2.1]);for(let P=0;P<10;P++){const W=P*Xe/10;c.add(d,m.cream,[_.x+Math.cos(W)*1.85,15.1,_.z+Math.sin(W)*1.85],[.055,1.2,.055])}c.add(new Ys(1.85,.065,5,20),m.cream,[_.x,15.65,_.z],[1,1,1],[Math.PI/2,0,0]);const O=[];for(const[P,W,k]of[[-238,110,1.3],[-290,-82,.9],[245,110,1.2]]){const $=new Se;$.position.set(P,-.5,W),$.rotation.y=.5,i.add($),tn(new Zn(1,12,8),m.cream,$,[0,.1,0]).scale.set(1.3*k,.6*k,3.1*k),tn(d,m.wood,$,[0,4*k,0]).scale.set(.06,8*k,.06);const st=new se;st.setAttribute("position",new zt([.1,1,0,.1,7*k,0,.1,1,3*k],3)),st.computeVertexNormals();const F=new wn({color:"#fff6d7",side:Fe,roughness:1});tn(st,F,$),O.push($)}c.flush();const L=[],H=[],X=new ja({color:"#ffcf58",metalness:.55,roughness:.23,clearcoat:.6,emissive:"#9d5809",emissiveIntensity:.09}),ut=fr(128,128,(P,W,k)=>{P.fillStyle="#ffc846",P.beginPath(),P.arc(64,64,62,0,Xe),P.fill(),P.strokeStyle="#ffeeb0",P.lineWidth=7,P.beginPath(),P.arc(64,64,52,0,Xe),P.stroke(),P.fillStyle="#9f652b",P.beginPath(),P.ellipse(59,64,24,15,0,0,Xe),P.fill(),P.beginPath(),P.moveTo(75,64),P.lineTo(98,46),P.lineTo(98,82),P.fill(),P.fillStyle="#ffe8a2",P.beginPath(),P.arc(47,60,4,0,Xe),P.fill()}),x=new wn({map:ut,metalness:.3,roughness:.4,side:Fe,transparent:!0}),p=new Ji(.6,.6,.15,24);p.rotateX(Math.PI/2);const D=new hc(.59,24);for(const P of[.045,.085,.17,.245,.31,.36,.43,.485,.55,.62,.7,.76,.825,.91,.96])for(let W=0;W<3;W++){const k=As(P+W*.0065),$=Math.sin(P*31)*3.3,st=r(k,$).position,F=new Se;F.position.copy(st),F.position.y+=1.25;const it=tn(p,X,F);it.castShadow=!1,tn(D,x,F,[0,0,.08]),tn(D,x,F,[0,0,-.08],[0,Math.PI,0]),i.add(F),L.push({u:k,lateral:$,kind:"coin",mesh:F,active:!0,respawn:0,baseY:F.position.y,phase:on()*Xe})}const V=new ja({color:"#a1f1e5",metalness:.15,roughness:.12,clearcoat:1,transparent:!0,opacity:.77,emissive:"#77d8c8",emissiveIntensity:.2}),Z=fr(256,256,(P,W,k)=>{P.clearRect(0,0,W,k),P.fillStyle="#fff8dd",P.font="900 190px Trebuchet MS",P.textAlign="center",P.textBaseline="middle",P.fillText("?",W/2,k/2+9)}),q=new Or({map:Z,transparent:!0,side:Fe,depthWrite:!1}),vt=new Mc(1.45,1.45,1.45,2,.2),ht=new ui(1.2,1.2);for(const P of[.125,.285,.455,.655,.855])for(const W of[-4.8,0,4.8]){const k=r(P,W).position,$=new Se;$.position.copy(k),$.position.y+=1.45,tn(vt,V,$),tn(ht,q,$,[0,0,.74]),tn(ht,q,$,[0,0,-.74],[0,Math.PI,0]),$.rotation.z=.14,i.add($),L.push({u:P,lateral:W,kind:"item",mesh:$,active:!0,respawn:0,baseY:$.position.y,phase:on()*Xe})}const Et=fr(256,256,(P,W,k)=>{P.fillStyle="#46bda9",P.fillRect(0,0,W,k),P.strokeStyle="#a7eada",P.lineWidth=7,P.strokeRect(5,5,W-10,k-10),P.fillStyle="#ffffd9";for(let $=0;$<3;$++){const st=35+$*70;P.beginPath(),P.moveTo(35,st+35),P.lineTo(128,st),P.lineTo(221,st+35),P.lineTo(221,st+55),P.lineTo(128,st+20),P.lineTo(35,st+55),P.fill()}}),yt=new wn({map:Et,roughness:.5,emissive:"#6febc8",emissiveIntensity:.26});for(const P of[.205,.52,.805]){const W=r(P,0),k=tn(new ui(8,5),yt,i,[W.position.x,W.position.y+.035,W.position.z],[-Math.PI/2,0,-W.yaw]);k.receiveShadow=!0,H.push({u:P,lateral:0,width:8,length:5,mesh:k})}function et(P,W){nt.time.value=P,M.value=P;for(const k of L)k.mesh.visible=k.active!==!1,k.mesh.rotation.y=P*(k.kind==="coin"?1.2:.6)+k.phase,k.mesh.position.y=k.baseY+Math.sin(P*2+k.phase)*.13;for(let k=0;k<O.length;k++)O[k].rotation.z=Math.sin(P*.65+k)*.055,O[k].position.y=-.5+Math.sin(P*.8+k)*.12}return{curve:e,length:n,width:s,sample:r,nearest:o,update:et,pickups:L,boosts:H,mapPoints:l,coastRadius:g}}const Pi=[{id:"mochi",name:"Mochi",subtitle:"奶油团子 · 椰风领航员",color:"#81d8bd",fur:"#fff0d3",accent:"#ff8e91",eyes:"#657d67",muzzle:"#fff8e9",ear:"#e6b898",number:"01",emoji:"🌺"},{id:"mango",name:"Mango",subtitle:"橘子汽水 · 阳光冲浪手",color:"#ff956f",fur:"#eda555",accent:"#ffdc72",eyes:"#548b7b",muzzle:"#ffedcd",ear:"#d18443",number:"02",emoji:"🥭"},{id:"luna",name:"Luna",subtitle:"月光乌龙 · 星夜追风者",color:"#a7a1e5",fur:"#393b50",accent:"#ffdb85",eyes:"#b6c6ed",muzzle:"#8c869d",ear:"#303347",number:"03",emoji:"🌙"},{id:"oreo",name:"Oreo",subtitle:"黑糖奶盖 · 海盐小队长",color:"#79bee9",fur:"#333741",accent:"#8ce0da",eyes:"#c6a968",muzzle:"#fff5e3",ear:"#30323b",number:"04",emoji:"🐾"},{id:"sakura",name:"Sakura",subtitle:"樱花三色 · 花岛漫游家",color:"#eea5b5",fur:"#ffedcf",accent:"#ee789d",eyes:"#829374",muzzle:"#fff7e7",ear:"#be794e",number:"05",emoji:"🌸"},{id:"coco",name:"Coco",subtitle:"可可布丁 · 椰林探险家",color:"#e3bf85",fur:"#dfbd92",accent:"#6dc9be",eyes:"#79cbd7",muzzle:"#a17b65",ear:"#695044",number:"06",emoji:"🥥"}],Vn=Math.PI*2,kv=new N(0,1,0),ks=new Map,Wo=new Map,Xo=new Map,Bv=i=>Pi.find(t=>t.id===i)||Pi[0],je=(i,t)=>(ks.has(i)||ks.set(i,t()),ks.get(i)),zv=()=>je("sphere",()=>new Zn(1,24,16)),Hv=()=>je("small-sphere",()=>new Zn(1,10,7)),Vv=()=>je("box",()=>new Pn(1,1,1)),qi=()=>je("torus",()=>new Ys(1,.1,8,40)),Bs=()=>je("cylinder",()=>new Ji(1,1,1,24));function he(i,t){if(!Wo.has(i)){const e=new ja(t);e.name=i,Wo.set(i,e)}return Wo.get(i)}function Gv(){return{cream:he("ivory",{color:"#fff2d9",roughness:.38,clearcoat:.6}),chrome:he("chrome",{color:"#dde9e6",metalness:.82,roughness:.22,clearcoat:.65}),gold:he("champagne",{color:"#f2c36f",metalness:.62,roughness:.28}),rubber:he("rubber",{color:"#252c34",roughness:.84}),leather:he("leather",{color:"#58464b",roughness:.74}),seat:he("seat-insert",{color:"#eacba5",roughness:.8}),ink:he("ink",{color:"#29272f",roughness:.34}),eye:he("eye",{color:"#171b28",roughness:.15,clearcoat:1,clearcoatRoughness:.08}),glint:he("glint",{color:"#ffffff",roughness:.1,emissive:"#ffffff",emissiveIntensity:.16}),pink:he("ear-pink",{color:"#eaa1a3",roughness:.8}),blush:he("blush",{color:"#eda6a1",roughness:.9}),nose:he("nose",{color:"#bc797c",roughness:.36,clearcoat:.25}),whiteLamp:he("headlamps",{color:"#fff4d5",emissive:"#ffdf9c",emissiveIntensity:.4,roughness:.15,clearcoat:1}),redLamp:he("tail-lamps",{color:"#ff767c",emissive:"#fa4a52",emissiveIntensity:.32,roughness:.24,clearcoat:1}),leaf:he("leaf",{color:"#5b9e79",roughness:.63}),petalPink:he("petal-pink",{color:"#ffb0bb",roughness:.6,sheen:.35,sheenColor:"#ffecdf"}),petalCoral:he("petal-coral",{color:"#f9818c",roughness:.58,sheen:.35,sheenColor:"#ffc1b1"}),petalYellow:he("petal-yellow",{color:"#ffdb7d",roughness:.65})}}class Cn{constructor(){this.buckets=new Map}add(t,e,n=[0,0,0],s=[1,1,1],r=[0,0,0]){const a=new ie().compose(new N(...n),new Hn().setFromEuler(new _n(...r)),new N(...s));return this.matrix(t,e,a)}matrix(t,e,n){let s=this.buckets.get(t);s||(s={p:[],n:[],uv:[],i:[]},this.buckets.set(t,s));const r=e.attributes.position,a=e.attributes.normal,o=e.attributes.uv,l=s.p.length/3,c=new $t().getNormalMatrix(n),h=new N;for(let u=0;u<r.count;u++)h.fromBufferAttribute(r,u).applyMatrix4(n),s.p.push(h.x,h.y,h.z),a?h.fromBufferAttribute(a,u).applyMatrix3(c).normalize():h.set(0,1,0),s.n.push(h.x,h.y,h.z),s.uv.push(o?o.getX(u):0,o?o.getY(u):0);if(e.index)for(let u=0;u<e.index.count;u++)s.i.push(l+e.index.getX(u));else for(let u=0;u<r.count;u++)s.i.push(l+u);return this}ball(t,e,n,s,r=!1){return this.add(t,r?Hv():zv(),e,n,s)}rod(t,e,n,s=.02){const r=new N(...e),o=new N(...n).sub(r),l=new ie().compose(r.addScaledVector(o,.5),new Hn().setFromUnitVectors(kv,o.clone().normalize()),new N(s,o.length(),s));return this.matrix(t,Bs(),l)}tube(t,e,n=.02,s=28,r=8){const a=new Lr(e.map(l=>new N(...l))),o=new Ja(a,s,n,r,!1);return this.add(t,o),o.dispose(),this}finish(t,e="sculpt",n=!0){const s=[];for(const[r,a]of this.buckets){const o=je(`sculpt:${e}:${r.uuid}`,()=>{const c=new se;return c.setAttribute("position",new zt(a.p,3)),c.setAttribute("normal",new zt(a.n,3)),c.setAttribute("uv",new zt(a.uv,2)),c.setIndex(a.i),c.computeBoundingSphere(),c}),l=new de(o,r);l.name=`${e}:${r.name||r.uuid.slice(0,5)}`,l.castShadow=n&&!/(chrome|champagne|ink|eye|glint|ear-pink|blush|nose|headlamps|tail-lamps|leaf|petal|whisker|iris|goggle-glass|decal|exhaust-flame)/.test(r.name),l.receiveShadow=n,t.add(l),s.push(l)}return this.buckets.clear(),s}}function ju(i,t,e,n=512){if(Xo.has(i))return Xo.get(i);let s;typeof document<"u"&&document.createElement?s=document.createElement("canvas"):typeof OffscreenCanvas<"u"&&(s=new OffscreenCanvas(n,n));const r=s==null?void 0:s.getContext("2d");let a;if(r)s.width=s.height=n,r.fillStyle=t,r.fillRect(0,0,n,n),e(r,n),a=new cc(s);else{const o=new Ut(t).getHex(He);a=new ac(new Uint8Array([o>>16,o>>8&255,o&255,255]),1,1),a.needsUpdate=!0}return a.colorSpace=He,a.anisotropy=4,a.name=`aloha:${i}`,Xo.set(i,a),a}function Wv(i,t="head"){return ju(`fur:${i.id}:${t}`,i.fur,(e,n)=>{e.scale(n,n);const s=(o,l,c,h,u,d=0)=>{e.fillStyle=o,e.beginPath(),e.ellipse(l,c,h,u,d,0,Vn),e.fill()};if(t==="head")if(i.id==="mango"){e.fillStyle="#bd7136";for(const[o,l]of[[.19,-.018],[.25,0],[.31,.018]])e.beginPath(),e.moveTo(o-.021,.23),e.bezierCurveTo(o-.02,.33,o+l,.36,o+l,.414),e.bezierCurveTo(o+.019,.36,o+.022,.3,o+.021,.23),e.fill();for(const o of[-1,1])for(let l=0;l<3;l++)s("#bd7136",.25+o*(.19+l*.007),.49+l*.064,.064,.013,o*-.25);s("#f4c583",.74,.23,.13,.095)}else if(i.id==="oreo")e.fillStyle="#fff5e4",e.beginPath(),e.moveTo(.246,.34),e.bezierCurveTo(.222,.45,.234,.52,.181,.59),e.bezierCurveTo(.14,.67,.18,.82,.25,.82),e.bezierCurveTo(.34,.79,.35,.66,.304,.58),e.bezierCurveTo(.265,.52,.267,.41,.246,.34),e.fill();else if(i.id==="sakura")s("#c98a4e",.12,.39,.105,.22,-.19),s("#78574a",.375,.34,.077,.25,.1),s("#a86c43",.8,.3,.12,.18,-.4),s("#76574a",.7,.57,.085,.12,.5);else if(i.id==="coco"){const o=e.createRadialGradient(.25,.55,.035,.25,.55,.25);o.addColorStop(0,"#6b5148"),o.addColorStop(.6,"#81604e"),o.addColorStop(1,"#dfbd92"),e.fillStyle=o,e.fillRect(0,.23,.53,.63),s("#80624e",.25,.18,.038,.058)}else i.id==="mochi"?(s("#efd9b9",.13,.17,.085,.17,-.24),s("#efddbe",.75,.34,.13,.13),s("#f6e5c9",.39,.19,.065,.12,.22)):i.id==="luna"&&s("#45465c",.75,.39,.2,.32);else if(t==="tail"){if(i.id==="mango"||i.id==="sakura")for(let o=0;o<6;o++)e.fillStyle=i.id==="mango"?"#b9753b":o%2?"#84604b":"#c8894e",e.fillRect(o*.155,0,.072,1);i.id==="coco"&&(e.fillStyle="#79604e",e.fillRect(0,0,1,1)),(i.id==="oreo"||i.id==="mochi"||i.id==="mango")&&(e.fillStyle="#fff1d6",e.fillRect(.78,0,.22,1))}else{if(i.id==="mango")for(let o=0;o<4;o++)s("#bd793f",.72,.27+o*.14,.21,.025,.2);i.id==="sakura"&&(s("#bc804d",.7,.34,.18,.24),s("#765747",.9,.65,.12,.2))}let r=1391+i.id.charCodeAt(0);const a=()=>(r=Math.imul(r,1664525)+1013904223|0,(r>>>0)/4294967296);e.lineWidth=8e-4;for(let o=0;o<3400;o++){e.strokeStyle=o%2?"rgba(255,250,228,.055)":"rgba(52,36,27,.025)";const l=a(),c=a();e.beginPath(),e.moveTo(l,c),e.lineTo(l+(a()-.5)*.004,c+.003+a()*.006),e.stroke()}})}function Xv(i){const t=e=>he(`${i.id}:fur:${e}`,{color:"#ffffff",map:Wv(i,e),roughness:.87,sheen:.32,sheenRoughness:.8,sheenColor:"#f8dbb9"});return{head:t("head"),body:t("body"),tail:t("tail"),ear:he(`${i.id}:ear`,{color:i.ear,roughness:.86,sheen:.25}),muzzle:he(`${i.id}:muzzle`,{color:i.muzzle,roughness:.88,sheen:.25}),iris:he(`${i.id}:iris`,{color:i.eyes,roughness:.24,clearcoat:1}),accessory:he(`${i.id}:accessory`,{color:i.accent,roughness:.43,clearcoat:.2}),whisker:he(`${i.id}:whisker`,{color:["oreo","luna","coco"].includes(i.id)?"#ddd3be":"#8c7465",roughness:.8})}}function Bh(){return je("ear",()=>{const i=new Zs;i.moveTo(-.205,0),i.bezierCurveTo(-.245,.18,-.14,.56,-.035,.64),i.bezierCurveTo(.01,.68,.045,.66,.075,.59),i.bezierCurveTo(.15,.45,.255,.16,.225,.035),i.quadraticCurveTo(0,-.075,-.205,0);const t=new ss(i,{depth:.045,bevelEnabled:!0,bevelThickness:.07,bevelSize:.055,bevelSegments:4,steps:1,curveSegments:10});return t.computeVertexNormals(),t})}function qv(){return je("kitten-head",()=>{const i=new Zn(1,48,32),t=i.attributes.position;for(let e=0;e<t.count;e++){const n=t.getX(e),s=t.getY(e),r=t.getZ(e);t.setXYZ(e,n*(1+.095*(.15-s)),s,r*(1+.035*(1-s*s)))}return i.computeVertexNormals(),i})}function Yv(){return je("kart-shell",()=>{const i=[[.8,1.31,.46,0],[.96,1.47,.51,0],[1.025,1.55,.66,0],[1.01,1.53,.84,0],[.94,1.43,.99,0],[.86,1.34,1.035,-.015],[.69,.82,1.015,-.29],[.635,.765,.935,-.29],[.615,.735,.65,-.29]],t=[],e=[],n=[],s=96;for(let a=0;a<i.length;a++){const[o,l,c,h]=i[a];for(let u=0;u<=s;u++){const d=u/s*Vn,f=Math.sin(d),m=Math.cos(d),M=Math.sign(f)*Math.pow(Math.abs(f),.57)*o*(m>0?.97:1),v=Math.sign(m)*Math.pow(Math.abs(m),.57)*l+h;if(t.push(M,c,v),e.push(u/s,a/(i.length-1)),a<i.length-1&&u<s){const g=a*(s+1)+u,T=g+s+1;n.push(g,g+1,T,g+1,T+1,T)}}}const r=new se;return r.setAttribute("position",new zt(t,3)),r.setAttribute("uv",new zt(e,2)),r.setIndex(n),r.computeVertexNormals(),r})}function yi(){return je("rounded-panel",()=>{const i=new Zs,t=.21;return i.moveTo(-.5+t,-.5),i.lineTo(.5-t,-.5),i.quadraticCurveTo(.5,-.5,.5,-.5+t),i.lineTo(.5,.5-t),i.quadraticCurveTo(.5,.5,.5-t,.5),i.lineTo(-.5+t,.5),i.quadraticCurveTo(-.5,.5,-.5,.5-t),i.lineTo(-.5,-.5+t),i.quadraticCurveTo(-.5,-.5,-.5+t,-.5),new ss(i,{depth:.6,bevelEnabled:!0,bevelSize:.07,bevelThickness:.2,bevelSegments:3,steps:1,curveSegments:8}).translate(0,0,-.3)})}function $v(){return je("curled-tail",()=>{const i=[[0,0,0],[.28,.09,-.12],[.36,.31,-.45],[.4,.77,-.75],[.22,.96,-.83],[.02,.88,-.82],[0,.7,-.78]],t=new Lr(i.map(c=>new N(...c))),e=44,n=16,s=t.computeFrenetFrames(e,!1),r=[],a=[],o=[];for(let c=0;c<=e;c++){const h=c/e,u=t.getPointAt(h),d=(.14+.065*Math.sin(Math.PI*h))*(h>.8?Math.sqrt(Math.max(.001,(1-h)/.2)):1);for(let f=0;f<=n;f++){const m=f/n*Vn,M=u.clone().addScaledVector(s.normals[c],d*Math.cos(m)).addScaledVector(s.binormals[c],d*Math.sin(m));if(r.push(M.x,M.y,M.z),a.push(h,f/n),c<e&&f<n){const v=c*(n+1)+f,g=v+n+1;o.push(v,v+1,g,g,v+1,g+1)}}}const l=new se;return l.setAttribute("position",new zt(r,3)),l.setAttribute("uv",new zt(a,2)),l.setIndex(o),l.computeVertexNormals(),l})}function zi(i,t,e,n,s,r,a=0,o=!1){const[l,c,h]=t;for(let u=0;u<n;u++){const d=u/n*Vn+a;i.ball(s,[l+Math.sin(d)*e*.48,c+Math.cos(d)*e*.48,h+.012],[e*.36,e*.61,e*.2],[.12,.16,-d],!0)}if(i.ball(r,[l,c,h+e*.2],[e*.24,e*.24,e*.19],void 0,!0),o){i.tube(r,[[l,c,h+e*.18],[l+e*.09,c+e*.15,h+e*.44],[l+e*.16,c+e*.4,h+e*.57]],e*.044,9,5);for(let u=0;u<4;u++)i.ball(r,[l+e*(.16+Math.sin(u*2)*.1),c+e*(.4+Math.cos(u*2)*.085),h+e*.57],[e*.065,e*.065,e*.065],void 0,!0)}}function zh(){return je("star",()=>{const i=new Zs;for(let t=0;t<10;t++){const e=t/10*Vn,n=t%2?.43:1;t===0?i.moveTo(Math.sin(e)*n,Math.cos(e)*n):i.lineTo(Math.sin(e)*n,Math.cos(e)*n)}return i.closePath(),new ss(i,{depth:.15,bevelEnabled:!0,bevelSize:.06,bevelThickness:.05,bevelSegments:2,steps:1})})}function jv(i,t,e,n,s){const r=new Cn,a=new Cn;if(e.id==="mochi"||e.id==="sakura"||e.id==="coco"){const o=e.id==="sakura"?[s.petalPink,s.cream,n.accessory]:e.id==="coco"?[s.cream,s.petalYellow,n.accessory]:[s.cream,s.petalYellow,s.cream];for(let l=0;l<9;l++){const c=-1.8+l/8*3.6;zi(a,[Math.sin(c)*.4,1.89-Math.cos(c)*.12,-.24+Math.cos(c)*.365],.096,5,o[l%3],s.petalYellow,l*.7)}a.add(n.accessory,qi(),[0,1.87,-.26],[.38,.32,.34],[Math.PI/2,0,0]),e.id==="mochi"?(r.ball(s.leaf,[-.57,.54,.29],[.12,.23,.028],[0,0,-.67],!0),zi(r,[-.52,.54,.34],.22,5,s.petalCoral,s.petalYellow,.15,!0)):e.id==="sakura"?(r.ball(s.leaf,[.56,.56,.2],[.12,.22,.035],[0,0,.7],!0),zi(r,[.5,.55,.31],.18,5,s.petalPink,s.petalYellow,.12),zi(r,[.67,.38,.27],.125,5,s.cream,s.petalYellow,.45),zi(r,[.33,.69,.19],.108,5,n.accessory,s.petalYellow,-.2)):(r.ball(s.leaf,[-.5,.55,.16],[.065,.26,.03],[0,.3,-.53],!0),r.ball(s.leaf,[-.6,.5,.17],[.068,.22,.03],[0,.1,-.98],!0),zi(r,[-.51,.42,.3],.16,5,s.cream,s.petalYellow,.15))}else if(e.id==="mango"){const o=he("goggle-glass",{color:"#509a91",metalness:.18,roughness:.13,clearcoat:1});r.tube(s.leather,[[-.57,.45,.18],[-.66,.44,-.15],[-.45,.43,-.46],[0,.43,-.55],[.45,.43,-.46],[.66,.44,-.15],[.57,.45,.18]],.042,32);for(const l of[-1,1])r.add(s.gold,qi(),[l*.23,.49,.3],[.205,.151,.205],[-.25,l*.12,0]),r.ball(o,[l*.23,.49,.293],[.183,.133,.037],[-.25,l*.12,0]),r.ball(s.glint,[l*.23-.049,.537,.331],[.044,.016,.009],[0,0,-.3],!0);r.tube(s.gold,[[-.06,.49,.32],[0,.525,.33],[.06,.49,.32]],.021,8),a.add(n.accessory,qi(),[0,1.86,-.25],[.39,.31,.34],[Math.PI/2,0,0]),zi(a,[-.26,1.8,.1],.125,5,s.cream,s.petalYellow,.35)}else if(e.id==="luna"){const o=je("moon-pin",()=>{const l=new Zs;return l.absarc(0,0,1,Math.PI*.29,Math.PI*1.71,!1),l.bezierCurveTo(-.13,-.49,-.32,.34,Math.cos(Math.PI*.29),Math.sin(Math.PI*.29)),new ss(l,{depth:.12,bevelEnabled:!0,bevelSize:.03,bevelThickness:.03,bevelSegments:2,steps:1,curveSegments:16})});r.add(s.gold,o,[0,.415,.475],[.105,.105,.105],[.35,0,-.22]),r.add(s.gold,zh(),[.53,.68,.23],[.1,.1,.1],[.05,-.2,-.15]),a.add(n.accessory,qi(),[0,1.86,-.25],[.36,.32,.33],[Math.PI/2,0,0]),a.add(s.gold,zh(),[0,1.75,.105],[.095,.095,.08]),a.ball(n.accessory,[-.14,1.85,-.61],[.17,.095,.075],[0,0,-.42]),a.ball(n.accessory,[.14,1.85,-.61],[.17,.095,.075],[0,0,.42]),a.ball(s.gold,[0,1.85,-.68],[.06,.068,.046],void 0,!0)}else{a.add(n.accessory,qi(),[0,1.85,-.25],[.37,.31,.45],[Math.PI/2,0,0]),a.ball(n.accessory,[0,1.7,.105],[.22,.24,.035]),a.ball(s.cream,[0,1.81,.148],[.05,.03,.015],void 0,!0),a.ball(n.accessory,[0,1.85,-.6],[.09,.09,.075]);for(const o of[-1,1])a.ball(n.accessory,[o*.14,1.71,-.625],[.09,.23,.035],[0,o*.3,o*-.6]);r.ball(s.cream,[-.48,.53,.08],[.07,.06,.1],void 0,!0)}r.finish(i,`head-accessories:${e.id}`),a.finish(t,`neck-accessories:${e.id}`)}function Kv(i,t,e=!0){const n=new Se;n.name=`driver:${i.id}`;const s=Xv(i),r=new Cn;r.ball(s.body,[0,1.47,-.3],[.445,.54,.355]),r.ball(s.muzzle,[0,1.48,-.006],[.29,.37,.092]);for(const d of[-1,1])r.tube(s.body,[[d*.31,1.68,-.2],[d*.4,1.49,.1],[d*.27,1.54,.4]],.115,15,10),r.ball(s.muzzle,[d*.24,1.035,.24],[.155,.1,.24]);r.finish(n,"body");const a=new Se;a.name="head",a.position.set(0,2.33,-.24),n.add(a);const o=new Cn;o.add(s.head,qv(),[0,0,0],[.735,.595,.565]);for(const d of[-1,1]){o.ball(s.muzzle,[d*.124,-.19,.557],[.19,.137,.113]),o.ball(t.blush,[d*.436,-.115,.441],[.108,.055,.018],[0,d*.38,0],!0);for(let f=0;f<3;f++)o.tube(s.whisker,[[d*.285,-.16-f*.039,.59],[d*.5,-.13-f*.068,.6],[d*(.78-Math.abs(f-1)*.045),-.09-f*.1,.51]],.006,12,5);for(let f=0;f<3;f++)o.ball(s.whisker,[d*(.182+f%2*.047),-.18-Math.floor(f/2)*.038,.66],[.009,.008,.006],void 0,!0);o.tube(s.ear,[[d*.15,.3,.472],[d*.26,.327,.475],[d*.36,.302,.448]],.024,12,8)}o.ball(s.muzzle,[0,-.29,.558],[.145,.073,.055]),o.ball(t.nose,[0,-.119,.679],[.063,.042,.033]),o.ball(t.nose,[0,-.14,.68],[.039,.033,.025],void 0,!0),o.ball(t.glint,[-.018,-.107,.707],[.013,.007,.004],void 0,!0),o.tube(t.ink,[[0,-.157,.686],[0,-.209,.683]],.008,6,5),o.tube(t.ink,[[-.092,-.238,.658],[-.051,-.253,.675],[0,-.216,.685],[.051,-.253,.675],[.092,-.238,.658]],.008,16,5),o.finish(a,"face");const l=[],c=[];for(const d of[-1,1]){const f=new Se;f.name=d<0?"eye-left":"eye-right",f.position.set(d*.278,.105,.532),f.rotation.y=d*.2;const m=new Cn;m.ball(t.eye,[0,0,0],[.156,.182,.056]),m.ball(s.iris,[d*-.009,-.007,.047],[.103,.13,.025]),m.ball(t.eye,[d*-.009,.005,.071],[.061,.099,.014]),m.ball(t.glint,[-.044,.071,.086],[.034,.038,.01],void 0,!0),m.ball(t.glint,[.047,-.042,.075],[.014,.015,.007],void 0,!0),m.finish(f,`eye:${d}`,!1),a.add(f),l.push(f);const M=new Se;M.name=`ear-${d}`,M.position.set(d*.49,.365,-.025),M.rotation.z=-d*.3,M.scale.set(1.1,.75,1);const v=i.id==="mochi"||i.id==="sakura"&&d<0?s.muzzle:s.ear,g=new Cn;g.add(v,Bh()),g.add(t.pink,Bh(),[.009,.073,.095],[.62,.71,.31]),g.ball(s.muzzle,[0,.065,.127],[.115,.055,.03],void 0,!0),g.finish(M,`ear:${i.id}:${d}`),a.add(M),c.push(M)}const h=new Se;h.name="curled-tail",h.position.set(.38,1.06,-.32);const u=new de($v(),s.tail);return u.castShadow=!0,u.receiveShadow=!0,h.add(u),n.add(h),e&&jv(a,n,i,s,t),{cat:n,head:a,eyes:l,ears:c,tail:h,materials:s}}function Zv(i){if(ks.has("wheel-batches"))return ks.get("wheel-batches");const t=new Cn,e=[[.26,-.155],[.32,-.186],[.388,-.175],[.431,-.13],[.44,-.075],[.44,.075],[.431,.13],[.388,.175],[.32,.186],[.26,.155],[.26,-.155]].map(c=>new mt(...c)),n=new pc(e,36);t.add(i.rubber,n,[0,0,0],[1,1,1],[0,0,Math.PI/2]),n.dispose();for(let c=0;c<30;c++)for(const h of[-1,1]){const u=(c+(h>0?.25:0))/30*Vn;t.add(i.rubber,Vv(),[h*.077,Math.cos(u)*.441,Math.sin(u)*.441],[.14,.02,.058],[u,h*.18,0])}const s=je("wheel-rim",()=>new Ys(1,.1,6,28)),r=je("wheel-spoke",()=>{const c=new Zs;return c.moveTo(-.4,-.5),c.lineTo(.4,-.5),c.lineTo(.5,-.4),c.lineTo(.5,.4),c.lineTo(.4,.5),c.lineTo(-.4,.5),c.lineTo(-.5,.4),c.lineTo(-.5,-.4),c.closePath(),new ss(c,{depth:.6,bevelEnabled:!0,bevelSize:.07,bevelThickness:.2,bevelSegments:1,steps:1}).translate(0,0,-.3)});for(const c of[-1,1]){t.add(i.rubber,Bs(),[c*.172,0,0],[.287,.015,.287],[0,0,Math.PI/2]),t.add(i.chrome,s,[c*.186,0,0],[.287,.287,.287],[0,Math.PI/2,0]),t.add(i.chrome,s,[c*.201,0,0],[.249,.249,.11],[0,Math.PI/2,0]);for(let h=0;h<6;h++){const u=h/6*Vn;t.add(i.chrome,r,[c*.198,Math.cos(u)*.155,Math.sin(u)*.155],[.038,.204,.051],[u,0,0]),t.ball(i.chrome,[c*.228,Math.cos(u)*.078,Math.sin(u)*.078],[.011,.015,.015],void 0,!0)}t.add(i.chrome,Bs(),[c*.201,0,0],[.106,.035,.106],[0,0,Math.PI/2]),t.add(i.cream,Bs(),[c*.226,0,0],[.065,.009,.065],[0,0,Math.PI/2])}const a=new Se,l=t.finish(a,"wheel").map(c=>({geometry:c.geometry,material:c.material}));return ks.set("wheel-batches",l),l}function Jv(i){const t=ju(`decals:${i.id}`,"#fff3d9",(e,n)=>{e.fillStyle=i.color,e.fillRect(0,0,n,n),e.strokeStyle="#fff4dd",e.lineWidth=n*.028,e.beginPath(),e.roundRect(n*.06,n*.06,n*.88,n*.88,n*.18),e.stroke(),e.fillStyle="#fff5df",e.beginPath(),e.arc(n*.5,n*.46,n*.3,0,Vn),e.fill(),e.textAlign="center",e.textBaseline="middle",e.fillStyle="#344b51",e.font=`900 ${n*.35}px sans-serif`,e.fillText(i.number,n*.5,n*.48),e.font=`800 ${n*.088}px sans-serif`,e.fillText("ALOHA",n*.5,n*.84),e.fillStyle="#344b51";for(const[s,r,a]of[[.43,.13,.013],[.47,.105,.015],[.515,.105,.015],[.55,.13,.013],[.491,.151,.024]])e.beginPath(),e.arc(n*s,n*r,n*a,0,Vn),e.fill()},256);return he(`decal:${i.id}`,{map:t,roughness:.4,clearcoat:.8,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function Qv(i,t,e,n){const s=new Cn;s.add(e,Yv()),s.ball(n.rubber,[0,.48,-.04],[.9,.135,1.4]),s.ball(n.leather,[0,.755,-.3],[.63,.17,.76]),s.add(n.leather,yi(),[0,1.25,-.73],[1.04,1.11,.17],[-.13,0,0]),s.add(n.seat,yi(),[0,1.29,-.612],[.74,.8,.043],[-.13,0,0]);for(const l of[-1,1])s.ball(n.leather,[l*.43,1.14,-.46],[.13,.42,.22],[-.15,0,l*.08]);for(let l=0;l<5;l++)s.tube(n.leather,[[-.28,1.02+l*.115,-.53-l*.016],[0,1.015+l*.115,-.527-l*.016],[.28,1.02+l*.115,-.53-l*.016]],.005,12,4);s.add(n.cream,yi(),[0,1.016,1.1],[.82,.59,.041],[-Math.PI/2,0,0]);for(const l of[-1,1]){s.tube(n.cream,[[l*.48,.964,1.36],[l*.49,1.015,1.14],[l*.48,1.032,.86]],.018,15,6),s.tube(n.chrome,[[l*.925,.7,-1.21],[l*1.025,.72,-.78],[l*1.025,.72,.52],[l*.94,.7,1.23]],.019,28,6);for(const c of[-1.09,1.065])s.tube(e,[[l*1.015,.56,c-.48],[l*1.055,.89,c-.29],[l*1.055,1.015,c],[l*1.055,.89,c+.29],[l*1.015,.56,c+.48]],.052,26,7);s.ball(n.chrome,[l*.65,.818,1.443],[.251,.179,.1],[-.16,l*.2,0]),s.ball(n.whiteLamp,[l*.65,.834,1.515],[.199,.125,.063],[-.16,l*.2,0]),s.ball(n.glint,[l*.69,.87,1.567],[.048,.026,.012],void 0,!0),s.ball(n.chrome,[l*.66,.755,-1.473],[.219,.123,.081]),s.ball(n.redLamp,[l*.66,.765,-1.529],[.174,.079,.038]),s.add(n.chrome,Bs(),[l*.56,.457,-1.52],[.113,.42,.113],[Math.PI/2,0,0]),s.add(n.rubber,Bs(),[l*.56,.457,-1.738],[.082,.012,.082],[Math.PI/2,0,0]),s.add(n.chrome,qi(),[l*.56,.457,-1.749],[.094,.094,.094]),s.rod(n.chrome,[l*.54,.94,-1.12],[l*.54,1.095,-1.35],.028);for(let c=0;c<3;c++)s.add(n.rubber,yi(),[l*1.029,.79,-.4+c*.16],[.16,.034,.018],[0,Math.PI/2,-.18]);for(const c of[-.82,.72])s.ball(n.chrome,[l*.955,.915,c],[.024,.016,.024],void 0,!0)}s.tube(n.chrome,[[-.88,.48,1.43],[-.83,.44,1.72],[0,.44,1.79],[.83,.44,1.72],[.88,.48,1.43]],.061,34,8),s.add(n.cream,yi(),[0,.474,1.77],[.85,.135,.07]),s.tube(n.chrome,[[-.9,.43,-1.46],[-.86,.42,-1.72],[0,.42,-1.77],[.86,.42,-1.72],[.9,.43,-1.46]],.052,32,8),s.add(n.cream,yi(),[0,.455,-1.782],[.55,.125,.049]),s.ball(n.rubber,[0,.686,1.541],[.29,.085,.04]);for(let l=0;l<3;l++)s.rod(n.chrome,[-.2,.66+l*.028,1.579],[.2,.66+l*.028,1.579],.006);s.add(n.cream,yi(),[0,1.105,-1.335],[1.58,.37,.07],[-Math.PI/2,0,0]),s.add(e,yi(),[0,1.144,-1.335],[.075,.33,.006],[-Math.PI/2,0,0]),s.finish(i,"coachwork");const r=new Cn,a=Jv(t),o=je("decal-plane",()=>new ui(1,1));r.add(a,o,[0,1.044,1.1],[.39,.4,1],[-Math.PI/2,0,0]),r.add(a,o,[0,.805,-1.551],[.3,.255,1],[0,Math.PI,0]);for(const l of[-1,1])r.add(a,o,[l*1.032,.752,.28],[.3,.275,1],[0,l*Math.PI/2,0]);r.finish(i,"enamel-decals",!1)}function tx(i,t,e,n){const s=new Se;s.name="steering-wheel",s.position.set(0,1.49,.48),s.rotation.x=.64,i.add(s);const r=new Cn;r.add(e.rubber,qi(),[0,0,0],[.303,.303,.4]);for(let o=0;o<3;o++){const l=o/3*Vn;r.rod(e.chrome,[0,0,0],[Math.sin(l)*.28,Math.cos(l)*.28,0],.02)}r.ball(t,[0,0,-.015],[.095,.095,.043]);for(const o of[-1,1]){r.ball(n.muzzle,[o*.278,.045,-.014],[.131,.12,.115]);for(let l=0;l<3;l++)r.ball(n.muzzle,[o*.278+(l-1)*.051,.011,.077],[.035,.055,.041],void 0,!0);for(const l of[-.026,.026])r.tube(n.whisker,[[o*.278+l,.016,.113],[o*.278+l,-.019,.111]],.003,4,4)}r.finish(s,"steering");const a=new Cn;return a.rod(e.chrome,[0,1.49,.48],[0,.96,.86],.032),a.finish(i,"steering-column"),s}function Ku(i="mochi",t={}){const e=Bv(i),n=Gv(),s=t.color??e.color,r=new Ut(s).getHexString(),a=he(`enamel:${r}`,{color:s,metalness:.12,roughness:.27,clearcoat:1,clearcoatRoughness:.19}),o=new Se;o.name=`aloha-kart:${e.id}`;const l=new Se;l.name="sprung-body",o.add(l),Qv(l,e,a,n);const c=Kv(e,n,t.accessories!==!1);l.add(c.cat);const h=tx(l,a,n,c.materials),u=[],d=[];for(const E of[-1.09,1.065])for(const S of[-1,1]){const A=new Se;A.position.set(S*1.028,.455,E),A.name=`${E>0?"front":"rear"}-${S<0?"left":"right"}-axle`,o.add(A);const C=new Se;C.name="wheel-spin",A.add(C);for(const U of Zv(n)){const I=new de(U.geometry,U.material===n.cream?a:U.material);I.castShadow=U.material===n.rubber,I.receiveShadow=!0,C.add(I)}u.push(C),E>0&&d.push(A)}const f=new Se;f.name="boost-exhaust",f.visible=!1,f.position.z=-1.75,f.scale.z=.01,l.add(f);const m=he("exhaust-flame",{color:"#b3ffef",emissive:"#70f8e0",emissiveIntensity:3,roughness:.5}),M=new Cn;for(const E of[-1,1])M.ball(m,[E*.56,.457,-.2],[.068,.068,.22]);M.finish(f,"exhaust-flame",!1);const v=Pi.indexOf(e)*.73;let g=0,T=!1;return o.userData.characterId=e.id,o.userData.character=e,o.userData.parts={body:l,cat:c.cat,head:c.head,tail:c.tail,eyes:c.eyes,ears:c.ears,wheels:u,steering:h,frontPivots:d},o.userData.animate=(E={})=>{if(T)return;const S=Number.isFinite(E.time)?E.time:0,A=Number.isFinite(E.dt)?Math.min(Math.max(E.dt,0),.1):1/60,C=Number.isFinite(E.speed)?E.speed:0,U=Number.isFinite(E.steer)?zn.clamp(E.steer,-1,1):0,I=Number(E.drift)||0,b=Number(E.boost)||0,y=Math.min(Math.abs(C)/16,1);g=(g+C*A/.455)%Vn;for(const Y of u)Y.rotation.x=g;for(const Y of d)Y.rotation.y=U*.36;h.rotation.z=-U*.37,l.position.y=Math.sin(S*(7+y*9))*.01*y,l.rotation.z=-U*(.025+y*.025)-zn.clamp(I,-1,1)*U*.024,c.cat.position.y=Math.sin(S*2.4+v)*(.009+.007*(1-y)),c.head.rotation.y=U*.13,c.head.rotation.z=Math.sin(S*1.65+v)*.022*(1-y)+U*.025,c.tail.rotation.y=Math.sin(S*2.2+v)*.095+U*.09,c.tail.rotation.z=Math.sin(S*2.7+v)*.065;for(let Y=0;Y<c.ears.length;Y++){const nt=Y===0?-1:1;c.ears[Y].rotation.z=-nt*.3+Math.sin(S*2.4+Y+v)*.024}const R=((S+v)%5.6+5.6)%5.6,G=R>5.34?1-Math.sin((R-5.34)/.26*Math.PI)*.92:1;for(const Y of c.eyes)Y.scale.y=G;f.visible=b>.01,f.scale.z=b>0?.85+(Math.sin(S*37)+1)*.18:.01},o.userData.dispose=()=>{T||(T=!0,o.clear())},Number.isFinite(t.scale)&&t.scale>0&&o.scale.setScalar(t.scale),t.shadows===!1&&o.traverse(E=>{E.isMesh&&(E.castShadow=!1,E.receiveShadow=!1)}),o}const Ba=Math.PI*2,ex=1/120,Nn=3,pr=24,qo=["mochi","mango","luna","oreo","sakura","coco"],nx={mochi:"Mochi",mango:"Mango",luna:"Luna",oreo:"Oreo",sakura:"Sakura",coco:"Coco"},Ue=(i,t,e)=>Math.max(t,Math.min(e,i)),Yo=i=>(i%1+1)%1,Ma=i=>((i+Math.PI)%Ba+Ba)%Ba-Math.PI,Tn=(i,t=0)=>Number.isFinite(i)?i:t,ix=(i,t,e)=>i<t?Math.min(t,i+e):Math.max(t,i-e);function sx(i,{onEvent:t,seed:e=41226}={}){if(!i||typeof i.sample!="function"||!(i.length>0))throw new TypeError("createSimulation requires a positive track.length and track.sample(u, lateral).");const n=i.length,s=Math.max(4,Tn(i.width,16)),r=s/2-.8,a=s/2+Math.min(9,s*.55),o=Math.max(.7,r-1.2),l=i.pickups||[],c=i.boosts||[],h=[],u=[],d=new Map,f=new Map,m={phase:"menu",elapsed:0,countdown:3,lap:1,totalLaps:Nn,position:8,totalRacers:8,speed:0,coins:0,item:null,boost:0,driftCharge:0,results:[],finishTime:null,shield:0,offroad:!1,wrongWay:!1,pausedFrom:null};let M="mochi",v="menu",g=1,T=0,E={item:!1,reset:!1};function S(){return g=Math.imul(g,1664525)+1013904223>>>0,g/4294967296}const A=(_,O=0)=>i.sample(Yo(_/n),O),C=_=>((_+n/2)%n+n)%n-n/2,U=_=>(_%n+n)%n,I=_=>Number.isFinite(_.yaw)?_.yaw:Math.atan2(_.tangent.x,_.tangent.z);function b(_,O=null,L={}){typeof t=="function"&&t({type:_,time:m.elapsed,...O?{racerId:O.id,id:O.id,racer:O,isPlayer:O.isPlayer,position:O.position.clone()}:{},...L})}function y(_){const O=A(_._distance,_.lateral);_.position.copy(O.position),_.yaw=I(O)+_.heading+(_.drift?_._driftDirection*.12:0),_.progress=_.finished?Nn:_._distance/n,_.offroad=Math.abs(_.lateral)>r}function R(){const _=h.slice().sort((O,L)=>{if(O.finished&&L.finished)return O.finishTime-L.finishTime||O._grid-L._grid;if(O.finished!==L.finished)return O.finished?-1:1;const H=Math.min(O.progress,O._nextCheckpoint/pr);return Math.min(L.progress,L._nextCheckpoint/pr)-H||O._grid-L._grid});return _.forEach((O,L)=>{O.rank=L+1}),_}function G(){const _=h[0];m.lap=_.lap,m.position=_.rank,m.speed=Math.round(_.speed*3.6),m.coins=_.coins,m.item=_.item,m.boost=_.boost,m.driftCharge=_.driftCharge,m.shield=_.shield,m.offroad=_.offroad,m.wrongWay=Math.cos(_.heading)<-.2&&_.speed>3}function Y(_=M){M=qo.includes(_)?_:"mochi",g=Tn(e,41226)>>>0||1,T=0,u.length=0,d.clear(),f.clear(),E={item:!1,reset:!1},v="menu",Object.assign(m,{phase:"menu",elapsed:0,countdown:3,lap:1,position:8,totalLaps:Nn,totalRacers:8,speed:0,coins:0,item:null,boost:0,driftCharge:0,results:[],finishTime:null,shield:0,offroad:!1,wrongWay:!1,pausedFrom:null});const O={};for(let L=0;L<8;L++){const H=L===0?M:qo[L%qo.length],X=(O[H]||0)+1;O[H]=X;const ut=L===0?7:L-1,x=h[L]||{position:new N};Object.assign(x,{id:L===0?"player":`ai${L-1}`,name:nx[H]+(X>1?" Jr.":""),characterId:H,isPlayer:L===0,yaw:0,speed:0,steer:0,drift:!1,boost:0,progress:0,lap:1,coins:0,item:null,finished:!1,finishTime:null,rank:ut+1,driftCharge:0,driftTier:0,shield:0,hit:0,offroad:!1,heading:0,lateral:(ut%2===0?-1:1)*Math.min(2.4,o),_grid:ut,_distance:-6-Math.floor(ut/2)*6,_nextCheckpoint:0,_completedLaps:0,_yawRate:0,_lateralKick:0,_driftSeconds:0,_driftDirection:0,_driftTier:0,_boostPower:0,_stun:0,_respawnLock:0,_boundaryCooldown:0,_baseSpeed:L===0?39.5:32.6+L*7%9*.37,_baseLane:L===0?-.5:[-.65,.45,-.18,.76,-.45,.1,.55][L-1]*o,_personality:S()*Ba,_itemUseAt:1/0,_pace:L===0?37:32,_padsInside:new Set,_padCooldowns:new Map}),h[L]=x,y(x)}for(const L of l)L.active=!0,L.respawn=0;return R(),G(),B}function nt(){return Y(M),m.phase="countdown",b("countdown",h[0],{value:3,count:3,countdown:3}),B}function j(){return m.phase==="paused"?(m.phase=v,m.pausedFrom=null):(m.phase==="racing"||m.phase==="countdown")&&(v=m.phase,m.pausedFrom=v,m.phase="paused"),m.phase}function tt(_,O,L,H=1){const X=L==="item"?16:9+H*2;_.boost=Math.min(3.5,Math.max(_.boost,O)),_._boostPower=Math.max(_._boostPower,X),_.speed=Math.min(_._baseSpeed+X,_.speed+4+H),b("boost",_,{source:L,tier:H,duration:O,strength:H})}function ct(_,O=!0){if(!_.drift)return;const L=_._driftSeconds>=2.25?3:_._driftSeconds>=1.3?2:_._driftSeconds>=.6?1:0;_.drift=!1,O&&L&&!_.offroad&&_.speed>9&&tt(_,[0,.85,1.45,2.15][L],"drift",L),b("drift",_,{action:"release",tier:O?L:0,charge:_.driftCharge}),_._driftSeconds=0,_._driftTier=0,_.driftTier=0,_.driftCharge=0,_._driftDirection=0}function Q(){const _=h[0];return m.phase!=="racing"||_.finished?!1:(ct(_,!1),_.lateral=0,_.heading=0,_._yawRate=0,_._lateralKick=0,_.steer=0,_.speed=0,_.boost=0,_._boostPower=0,_._stun=0,_.hit=0,_._respawnLock=.35,y(_),b("hit",_,{source:"respawn",reason:"respawn",respawn:!0,strength:0}),G(),!0)}function St(_,O=155){let L=null,H=O;for(const X of h){if(X===_||X.finished)continue;const ut=U(X._distance-_._distance);ut>2&&ut<H&&(H=ut,L=X)}return L}function wt(_){if(m.phase!=="racing"||_.finished||!_.item)return!1;const O=_.item;if(!["boost","shield","projectile"].includes(O))return!1;if(_.item=null,_._itemUseAt=1/0,b("item",_,{action:"use",item:O}),O==="boost"&&tt(_,2.5,"item",3),O==="shield"&&(_.shield=Math.max(_.shield,6)),O==="projectile"){const L=St(_),H=_._distance+3;u.push({id:`shell${T++}`,ownerId:_.id,targetId:(L==null?void 0:L.id)||null,position:A(H,_.lateral).position.clone(),yaw:_.yaw,lateral:_.lateral,speed:76,life:2.5,_distance:H})}return!0}function bt(){const _=wt(h[0]);return G(),_}function Lt(_,O,L=null,H=0){if(_.shield>0){_.shield=0,b("hit",_,{source:O,reason:O,attackerId:(L==null?void 0:L.id)||null,blocked:!0,shield:!0,strength:.25});return}_.speed*=O==="projectile"?.52:.83,_._stun=O==="projectile"?.6:.12,_.hit=O==="projectile"?.7:.28,_._lateralKick+=H,O==="projectile"&&(_.coins=Math.max(0,_.coins-2),_.boost=0,_._boostPower=0,ct(_,!1)),b("hit",_,{source:O,reason:O,attackerId:(L==null?void 0:L.id)||null,blocked:!1,strength:O==="projectile"?1:.4})}function Vt(_){return 1.8*Ue(_.speed/10,0,1)/(1+Math.max(0,_.speed-15)*.021)}function Yt(_,O){const L=10+_.speed*.33,H=A(_._distance),X=A(_._distance+L),ut=Ma(I(X)-I(H))/L;let x=_._baseLane+Math.sin(m.elapsed*.39+_._personality)*.38,p=1;for(const W of h){if(W===_||W.finished)continue;const k=U(W._distance-_._distance);if(k<15&&k>.25&&Math.abs(W.lateral-_.lateral)<2.5){const $=W.lateral>0?-1:1;x=Ue(W.lateral+$*3.3,-o,o),k<5&&_.speed>W.speed+1&&(p=.45)}}x=Ue(x,-o,o);const D=A(_._distance+L,x).position,V=Math.atan2(D.x-_.position.x,D.z-_.position.z),Z=I(H)+_.heading,q=Ma(V-Z),vt=2*Math.max(8,_.speed)*Math.sin(q)/L;let ht=Ue(vt/Math.max(.2,Vt(_)),-1,1);_.drift&&(ht=(ht-_._driftDirection*.09)/1.12);const Et=Ue(Math.sqrt(28/Math.max(.006,Math.abs(ut))),22,_._baseSpeed+18),yt=_.speed>Et+2?Ue((_.speed-Et-2)/9,0,.55):0,et=(m.elapsed+_._personality*2)%10,P=O&&Math.abs(ut)>.01&&Math.abs(ut)<.035&&Math.abs(ht)>.22&&_.speed>22&&!_.offroad&&Math.abs(_.lateral)<o&&et>3&&et<4.55;return{throttle:p,brake:yt,steer:ht,drift:P,curve:ut}}function Ot(_,O,L){const H=O.drift&&_.speed>12&&!_.offroad&&_._stun<=0;if(!_.drift&&H&&Math.abs(O.steer)>.14?(_.drift=!0,_._driftDirection=Math.sign(O.steer),_._driftSeconds=0,b("drift",_,{action:"start",tier:0,direction:_._driftDirection})):_.drift&&!H&&ct(_,!O.drift),_.drift){Math.abs(O.steer)>.12&&_.speed>13&&(_._driftSeconds=Math.min(2.7,_._driftSeconds+L)),_.driftCharge=Ue(_._driftSeconds/2.25,0,1);const X=_._driftSeconds>=2.25?3:_._driftSeconds>=1.3?2:_._driftSeconds>=.6?1:0;_.driftTier=X,X>_._driftTier&&(_._driftTier=X,b("drift",_,{action:"charge",tier:X,charge:_.driftCharge}))}}function lt(_,O,L,H){const X=O/n,ut=_._distance/n;if(ut>X)for(;_._nextCheckpoint<=Nn*pr;){const x=_._nextCheckpoint/pr;if(X>x+1e-7||ut+1e-10<x)break;_._nextCheckpoint++,x>0&&Number.isInteger(x)&&(_._completedLaps=x,_.lap=Math.min(Nn,x+1),b("lap",_,{lap:_.lap,completedLaps:x,totalLaps:Nn}))}if(_._nextCheckpoint>Nn*pr&&!_.finished){const x=Ue((Nn*n-O)/Math.max(1e-8,_._distance-O),0,1);_.finishTime=L+H*x,_.finished=!0,_._distance=Nn*n,_.lap=Nn,_.speed=0,_.boost=0,ct(_,!1)}}function pt(_,O,L,H){const X=O-_,ut=C(Yo(Tn(L))*n-_);return ut<Math.min(0,X)-H||ut>Math.max(0,X)+H?null:Math.abs(X)<1e-7?1:Ue(ut/X,0,1)}function At(_,O,L){for(const H of l){if(H.active===!1||H.kind==="item"&&_.item||H.kind!=="coin"&&H.kind!=="item")continue;const X=pt(O,_._distance,H.u,2);if(X===null)continue;const ut=L+(_.lateral-L)*X;if(!(Math.abs(ut-Tn(H.lateral))>(H.kind==="coin"?1.65:2)))if(H.active=!1,H.respawn=H.kind==="coin"?7:6,d.set(H,m.elapsed+H.respawn),H.kind==="coin")_.coins=Math.min(10,_.coins+1),_.speed=Math.min(_.speed+.75,_._baseSpeed+_._boostPower+2),b("coin",_,{coins:_.coins,amount:1,pickup:H});else{const x=S(),p=_.rank>=5?.5:.35,D=_.rank<=2?.43:.23;_.item=x<p?"boost":x<p+D?"shield":"projectile",_._itemUseAt=m.elapsed+.85+S()*1.2,b("item",_,{action:"collect",item:_.item,pickup:H})}}for(let H=0;H<c.length;H++){const X=c[H],ut=Tn(X.length,5)/2+1.2,x=Tn(X.width,4)/2+.75,p=pt(O,_._distance,X.u,ut),D=p===null?_.lateral:L+(_.lateral-L)*p;p!==null&&Math.abs(D-Tn(X.lateral))<x&&!_._padsInside.has(H)&&(_._padCooldowns.get(H)||0)<=m.elapsed&&(tt(_,1.05,"pad",1),_._padCooldowns.set(H,m.elapsed+.8)),Math.abs(C(Yo(X.u)*n-_._distance))<ut&&Math.abs(_.lateral-Tn(X.lateral))<x?_._padsInside.add(H):_._padsInside.delete(H)}}function Dt(_,O,L,H){if(_.finished)return;_.boost=Math.max(0,_.boost-L),_.boost||(_._boostPower=0),_.shield=Math.max(0,_.shield-L),_.hit=Math.max(0,_.hit-L),_._stun=Math.max(0,_._stun-L),_._respawnLock=Math.max(0,_._respawnLock-L),_._boundaryCooldown=Math.max(0,_._boundaryCooldown-L);const X=_._distance,ut=_.lateral,x=A(_._distance),p=A(_._distance+5),D=Ma(I(p)-I(x))/5,V=Ue((Math.abs(_.lateral)-r)/3.8,0,1);Ot(_,O,L);let Z=Math.max(O.throttle,_.boost>0?.85:0);_._respawnLock>0&&(Z=0);const q=O.brake,vt=(_._baseSpeed+_.coins*.18+_._boostPower)*(1-V*.59),ht=_.isPlayer?24:21.5,Et=Z*(1-q)*ht*(1-.34*Ue(_.speed/vt,0,1)),yt=(Z>0?2.5:5.8)+_.speed*.04+V*9+(_.drift?.8:0);_.speed=Math.max(0,_.speed+(Et*(_._stun>0?.3:1)-yt-q*40)*L),_.speed>vt&&(_.speed=Math.max(vt,_.speed-(V?26:18)*L)),_.speed=Ue(_.speed,0,66),_._pace+=(_.speed-_._pace)*(1-Math.exp(-L/7)),_.steer+=(O.steer-_.steer)*(1-Math.exp(-11*L));let et=_.steer;_.drift&&(et=et*1.12+_._driftDirection*.09);const P=et*Vt(_)*(_._stun>0?.65:1);_._yawRate+=(P-_._yawRate)*(1-Math.exp(-10*L));const W=Ue(1-D*_.lateral,.45,1.8),k=_.speed*Math.cos(_.heading)/W,$=_.heading+(_._yawRate-D*k)*L/2,st=I(x)+_.heading+_._yawRate*L;_._distance+=_.speed*Math.cos($)/W*L;const F=_.drift?_._driftDirection*_.speed*.025:0;if(_.lateral+=(_.speed*Math.sin($)+F+_._lateralKick)*L,_._lateralKick*=Math.exp(-5*L),_.heading=Ma(st-I(A(_._distance))),Math.abs(_.lateral)>a){const it=Math.sign(_.lateral);_.lateral=it*a,Math.sin(_.heading)*it>0&&(_.heading=-it*.2),_._lateralKick=-it*3,_._yawRate=0,_._boundaryCooldown<=0&&(_.speed*=.6,_.hit=.22,_._boundaryCooldown=.8,ct(_,!1),b("hit",_,{source:"boundary",reason:"boundary",strength:.25}))}lt(_,X,H,L),y(_),_.finished||At(_,X,ut)}function Ct(){for(let _=0;_<h.length;_++){const O=h[_];if(!O.finished)for(let L=_+1;L<h.length;L++){const H=h[L];if(H.finished)continue;const X=C(O._distance-H._distance),ut=O.lateral-H.lateral;if(Math.abs(X)>3.65||Math.abs(ut)>2.35)continue;const x=1-(X/3.65)**2-(ut/2.35)**2;if(x<=0)continue;const p=Math.abs(ut)>.1?Math.sign(ut):_%2?-1:1,D=Math.min(.12,x*.18);O.lateral+=p*D,H.lateral-=p*D;const V=`${_}:${L}`;if((f.get(V)||0)<=m.elapsed){f.set(V,m.elapsed+.75);const Z=X>0?H:O,q=Z===O?H:O,vt=Z.speed-q.speed;O._lateralKick+=p*2.4,H._lateralKick-=p*2.4,vt>2.5?(Lt(Z,"contact",q),q.shield<=0&&(q.speed=Math.min(q.speed+.9,q._baseSpeed+q._boostPower+1))):(O.hit=H.hit=.22,b("hit",O,{source:"contact",reason:"contact",otherId:H.id,strength:.3}),b("hit",H,{source:"contact",reason:"contact",otherId:O.id,strength:.3}))}y(O),y(H)}}}function Wt(_){for(let O=u.length-1;O>=0;O--){const L=u[O];L.life-=_;const H=L._distance,X=h.find(p=>p.id===L.targetId&&!p.finished);X&&U(X._distance-H)<170&&(L.lateral=ix(L.lateral,X.lateral,6.5*_)),L._distance+=L.speed*_;const ut=A(L._distance,L.lateral);L.position.copy(ut.position),L.position.y+=.75,L.yaw=I(ut);let x=!1;for(const p of h){if(p.id===L.ownerId||p.finished)continue;if(pt(H,L._distance,p._distance/n,2.1)!==null&&Math.abs(L.lateral-p.lateral)<1.9){const V=h.find(Z=>Z.id===L.ownerId);Lt(p,"projectile",V,L.lateral>=p.lateral?-3.5:3.5),x=!0;break}}(x||L.life<=0)&&u.splice(O,1)}}function Xt(){const _=h[0];m.finishTime=_.finishTime,m.elapsed=_.finishTime,m.phase="finished",m.countdown=0,m.results=h.map(L=>{const H=L.finished&&L.finishTime<=_.finishTime+1e-7,X=Math.max(0,Nn*n-L._distance),ut=(Math.max(0,L._distance)+6+Math.floor(L._grid/2)*6)/Math.max(1,m.elapsed),x=Ue(ut*.65+L._pace*.35,12,L._baseSpeed+6),p=H?L.finishTime:Math.max(m.elapsed+.001,L.finishTime??m.elapsed+X/x);return{id:L.id,name:L.name,characterId:L.characterId,isPlayer:L.isPlayer,coins:L.coins,progress:L.progress,finished:H,estimated:!H,time:p,finishTime:p,lap:L.lap}}).sort((L,H)=>L.time-H.time||L.id.localeCompare(H.id));const O=m.results[0].time;m.results.forEach((L,H)=>{L.rank=H+1,L.position=H+1,L.gap=L.time-O,h.find(X=>X.id===L.id).rank=L.rank}),G(),b("finish",_,{finishTime:_.finishTime,rank:_.rank,results:m.results})}function z(_,O){const L=m.elapsed;m.elapsed+=_;for(const[H,X]of d)H.respawn=Math.max(0,X-m.elapsed),H.respawn<=1e-8&&(H.respawn=0,H.active=!0,d.delete(H));for(const H of h){if(H.finished)continue;let X;if(H.isPlayer){const x=O.assist?Yt(H,!1):null;X={throttle:Ue(Tn(O.throttle,O.assist?1:0),0,1),brake:Ue(Tn(O.brake),0,1),steer:Ue(Tn(O.steer),-1,1),drift:!!O.drift},x&&(Math.abs(X.steer)<.05&&(X.steer=x.steer),X.brake=Math.max(X.brake,x.brake),X.throttle*=x.throttle)}else X=Yt(H,!0),H.item&&m.elapsed>=H._itemUseAt&&(H.item!=="projectile"||St(H)||m.elapsed>H._itemUseAt+2)&&wt(H);const ut=H.finished;Dt(H,X,_,L),!ut&&H.finished&&!H.isPlayer&&b("finish",H,{finishTime:H.finishTime,rank:h.filter(x=>x.finished&&x.finishTime<H.finishTime).length+1})}Ct(),Wt(_),R(),h[0].finished&&Xt()}function _t(_,O={}){O=O||{};const L=!!O.item&&!E.item,H=!!O.reset&&!E.reset;E.item=!!O.item,E.reset=!!O.reset,m.phase==="racing"&&(H&&Q(),L&&bt());let X=Ue(Tn(_),0,10);if(m.phase==="countdown"&&X>0){const ut=m.countdown,x=Math.min(X,ut);m.countdown=Math.max(0,ut-x),X-=x;for(const p of[2,1])ut>p&&m.countdown<=p&&b("countdown",h[0],{value:p,count:p,countdown:p});m.countdown<=1e-8&&(m.countdown=0,m.phase="racing",b("go",h[0],{value:0,count:0,countdown:0}))}for(;X>1e-9&&m.phase==="racing";){const ut=Math.min(ex,X);z(ut,O),X-=ut}return G(),dt()}function dt(){return{...m,racers:h,projectiles:u}}const B={racers:h,state:m,reset:Y,start:nt,update:_t,useItem:bt,togglePause:j,getSnapshot:dt,projectiles:u};return Y(),B}const ya=[{id:"mochi",name:"MOCHI",subtitle:"糯米 · 软乎乎，也快乎乎",color:"#9cdbc5"},{id:"mango",name:"MANGO",subtitle:"芒果 · 把阳光踩到底",color:"#efbb65"},{id:"luna",name:"LUNA",subtitle:"露娜 · 追风，也追月亮",color:"#aab7db"},{id:"oreo",name:"OREO",subtitle:"奥利奥 · 黑白分明，全速前进",color:"#afc9c8"},{id:"sakura",name:"SAKURA",subtitle:"樱花 · 温柔的超车高手",color:"#edb2b5"},{id:"coco",name:"COCO",subtitle:"可可 · 海岛上的开心果",color:"#c9ba8b"}],oi="#173d45",Sa=i=>String(i??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),me=(i,t=0)=>i!==null&&i!==""&&Number.isFinite(Number(i))?Number(i):t,re=(...i)=>i.find(t=>t!=null),Rs=(i,t,e)=>Math.max(t,Math.min(e,i)),$o=i=>i%100>=11&&i%100<=13?"TH":{1:"ST",2:"ND",3:"RD"}[i%10]||"TH";function ba(i){const t=Math.max(0,me(i));return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(Math.floor(t%60)).padStart(2,"0")}.${String(Math.floor(t%1*100)).padStart(2,"0")}`}function ce(i,t=""){const e={arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',chevron:'<path d="m9 5 7 7-7 7"/>',pause:'<path d="M8 5v14M16 5v14" stroke-width="4"/>',play:'<path d="m9 5 10 7-10 7Z" fill="currentColor" stroke="none"/>',sound:'<path d="m11 4-5 4H3v8h3l5 4Zm4 4c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',muted:'<path d="m11 4-5 4H3v8h3l5 4Zm5 5 6 6m0-6-6 6"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1.5 1-1.5 1-1.5 2"/><circle cx="12" cy="16.5" r=".9" fill="currentColor" stroke="none"/>',settings:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="var(--ak-cream)"/><circle cx="15" cy="17" r="3" fill="var(--ak-cream)"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',flag:'<path d="M5 21V3m0 1c5-4 9 4 15 0v10c-6 4-10-4-15 0"/><path d="M6 5h4v4H6Zm4 4h4v4h-4Zm4-3h5v4h-5Z" fill="currentColor" stroke="none"/>',fish:'<path d="M3 12c4-7 10-7 15-2l4-3v10l-4-3c-5 5-11 5-15-2Z"/><circle cx="8" cy="11" r="1" fill="currentColor" stroke="none"/>',clock:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6m-3 0v3"/>',fullscreen:'<path d="M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6"/>',camera:'<path d="M3 8h4l2-3h6l2 3h4v12H3Z"/><circle cx="12" cy="13" r="4"/>',view:'<path d="m3 12 5-5h8l5 5-5 5H8Z"/><circle cx="12" cy="12" r="3"/>',restart:'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',home:'<path d="m3 11 9-8 9 8M6 9v12h12V9m-8 12v-7h4v7"/>',bolt:'<path d="m14 2-10 12h7l-1 8L21 9h-8Z" fill="currentColor" stroke="none"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',palm:'<path d="M12 22c3-6 3-11 1-15M13 7C8 2 3 4 2 9c4-2 7-2 11-2Zm0 0c1-6 6-7 9-4-4 0-6 1-9 4Zm0 0c6-2 10 2 9 7-3-4-5-6-9-7Zm0 0c-5 0-9 4-7 9 1-4 3-6 7-9Z"/>',flower:'<path d="M12 9C4-2 0 10 8 12c-11 4-2 13 4 4 4 11 13 2 4-4 11-4 2-13-4-4-4-11-13-2-4 4"/><circle cx="12" cy="12" r="2"/>',trophy:'<path d="M7 3h10v8c0 7-10 7-10 0Zm0 2H3v3c0 4 4 4 4 4m10-7h4v3c0 4-4 4-4 4m-5 4v5m-5 0h10"/>'};return`<svg class="ak-icon ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e[i]||e.bolt}</svg>`}function Hh(i){const t={mochi:["#fff4dc","#f4c8bd","#9cdbc5"],mango:["#f2b458","#ee8a6b","#719b68"],luna:["#666784","#d19baf","#d6c889"],oreo:["#faf3e3","#eeb4b0","#9bbfcb"],sakura:["#ffeddf","#eba9b5","#ef9da9"],coco:["#ae7954","#dbac91","#94bda1"]},[e,n,s]=t[i]||t.mochi,r=i==="luna"?"#fff3d4":oi;let a="",o="";i==="mochi"&&(a='<path d="M43 27c1 5 6 6 7 0m0 0c1 6 6 6 7 0" fill="none" stroke="#dfccad" stroke-width="2.5"/>'),i==="mango"&&(a='<path d="m43 24 2 10m7-10-1 9m8-6-3 9M24 46l7 3m-7 4 7 2m45-9-7 3m7 4-7 2" stroke="#c67a38" stroke-width="3" stroke-linecap="round"/>',o='<path d="M66 23c-1-7 6-12 11-9-1 7-5 10-11 9" fill="#719b68"/><circle cx="68" cy="23" r="5" fill="#ffde87"/>'),i==="luna"&&(o='<path d="M67 13c-9 4-6 16 4 15-7 6-17 0-14-8 1-4 5-7 10-7Z" fill="#f0d990"/><path d="m25 32 2-4 2 4 4 2-4 2-2 4-2-4-4-2Z" fill="#e2d6ad"/>'),i==="oreo"&&(a='<path d="M29 15 42 30c-1 4-1 11-5 16-5 8-13 6-15 1 1-8 3-12 3-12Z" fill="#37454b"/><path d="M69 18 62 30c6-1 10 2 14 6Z" fill="#37454b"/>'),i==="sakura"&&(o='<g fill="#ea8fa5" stroke="#ffe6d5" stroke-width="1.4"><ellipse cx="74" cy="22" rx="5" ry="8"/><ellipse cx="74" cy="22" rx="5" ry="8" transform="rotate(72 74 22)"/><ellipse cx="74" cy="22" rx="5" ry="8" transform="rotate(144 74 22)"/></g><circle cx="74" cy="22" r="3" fill="#f7d882"/>'),i==="coco"&&(a='<ellipse cx="50" cy="56" rx="20" ry="14" fill="#e6c49a"/><path d="M44 28h12" stroke="#815b45" stroke-width="5" stroke-linecap="round"/>',o='<path d="m46 25-7-13 10 5 1-12 5 12 10-6-7 14Z" fill="#719c74" stroke="#47765c" stroke-width="1.4"/>');const l=i==="sakura"?`<path d="M32 47q5-6 10 0m16 0q5-6 10 0" fill="none" stroke="${r}" stroke-width="3" stroke-linecap="round"/>`:`<ellipse cx="37" cy="46" rx="3.2" ry="4.5" fill="${i==="oreo"?"#fff3dc":r}"/><ellipse cx="63" cy="46" rx="3.2" ry="4.5" fill="${r}"/><circle cx="38" cy="44.5" r="1" fill="#fff9ef"/><circle cx="64" cy="44.5" r="1" fill="#fff9ef"/>`;return`<svg class="ak-cat" viewBox="0 0 100 90" fill="none" aria-hidden="true"><ellipse cx="50" cy="79" rx="30" ry="5" fill="${oi}" opacity=".1"/><path d="M29 82c1-18 41-18 42 0" fill="${s}" stroke="${oi}" stroke-width="2"/><path d="M24 37 22 13q0-4 4-2l19 15q6-1 12 0l18-15q4-2 4 2l-3 24c17 29-3 39-26 39S7 65 24 37Z" fill="${e}" stroke="${oi}" stroke-width="2" stroke-linejoin="round"/><path d="m28 20 1 14 10-5Zm44 0-1 14-10-5Z" fill="${n}"/>${a}<ellipse cx="29" cy="55" rx="6" ry="3" fill="${n}" opacity=".7"/><ellipse cx="71" cy="55" rx="6" ry="3" fill="${n}" opacity=".7"/>${l}<path d="m47 54 3 3 3-3Z" fill="${n}" stroke="${oi}" stroke-width="1.3"/><path d="M50 57v3m0 0q-4 5-8 0m8 0q4 5 8 0" stroke="${oi}" stroke-width="1.6" stroke-linecap="round"/><path d="m17 51 9 2m-9 5 9-1m57-6-9 2m9 5-9-1" stroke="${oi}" stroke-width="1.2" stroke-linecap="round"/>${o}<path d="m35 73 15 5 15-5-4 9-11-4-11 4Z" fill="${s}" stroke="${oi}" stroke-width="1.4"/></svg>`}const Vh=i=>({playing:"racing",race:"racing",running:"racing",results:"finished",result:"finished",finish:"finished",paused:"paused",pause:"paused",ready:"menu",loading:"menu",starting:"countdown"})[i]||i;function rx(i={}){var _,O,L,H,X,ut;const t=((_=i.characters)!=null&&_.length?i.characters:ya).map((x,p)=>{const D=ya.find(V=>V.id===x.id)||ya[p%ya.length];return{...D,...x,id:String(x.id||D.id),tint:D.color}});let e=i.root||document.getElementById("ui-root");typeof e=="string"&&(e=document.querySelector(e)),e||(e=document.createElement("div"),e.id="ui-root",document.body.append(e)),(O=e.__alohaUIDispose)==null||O.call(e),e.classList.add("ak-ui"),e.dataset.phase="menu",e.innerHTML=`
    <section class="ak-menu" data-ui="menu" aria-label="Aloha Kart 主菜单">
      <header class="ak-brand"><span class="ak-brand-mark">${ce("flower")}</span><span>SAKURA<br><b>RACING CLUB</b></span><i></i><span class="ak-season">SAKURA CIRCUIT<br><b>一起出发！</b></span></header>
      <div class="ak-menu-copy">
        <div class="ak-eyebrow"><span class="ak-checker"></span> THE ISLAND GRAND PRIX <span class="ak-line"></span></div>
        <h1 class="ak-title" aria-label="SAKURA KART"><span>SAKURA<span class="ak-title-spark">✳</span></span><span>KART<span class="ak-title-streaks"><i></i><i></i><i></i></span></span></h1>
        <h2 class="ak-tagline">樱色猫猫大奖赛</h2>
        <p class="ak-menu-caption">海风、弯道，和一点点猫脾气。</p>
        <div class="ak-course"><span class="ak-course-icon">${ce("palm")}</span><div><span class="ak-micro">YOUR NEXT LITTLE GETAWAY</span><strong>SAKURA COAST</strong><span class="ak-course-meta">海风环岛赛 <i></i> 3 LAPS <i></i> 8 RACERS</span></div></div>
      </div>
      <div class="ak-postmark" aria-hidden="true"><svg viewBox="0 0 144 132"><circle cx="70" cy="66" r="47"/><circle cx="70" cy="66" r="41" stroke-dasharray="1 5"/><path d="M104 36c16-10 19 10 35 0m-35 10c16-10 19 10 35 0m-35 10c16-10 19 10 35 0"/><text x="70" y="49">GREETINGS FROM</text><text x="70" y="70" class="ak-stamp-main">SAKURA</text><text x="70" y="85">THE SUNNY SIDE</text></svg></div>
      <div class="ak-hero-caption"><span class="ak-hero-number" data-ui="hero-number">01</span><span><b data-ui="hero-name">MOCHI</b><small data-ui="hero-subtitle">糯米 · 软乎乎，也快乎乎</small></span><span class="ak-hero-flower">${ce("flower")}</span></div>
      <footer class="ak-menu-bottom">
        <div class="ak-character-area"><div class="ak-strip-label"><span><b>01</b> 选择你的猫猫车手</span><span>CHOOSE YOUR CO-PILOT</span></div><div class="ak-character-strip" role="group" aria-label="选择车手">${t.map((x,p)=>`<button class="ak-character" data-character="${Sa(x.id)}" style="--cat-tint:${x.tint}" aria-label="选择 ${Sa(x.name)}" aria-pressed="false"><span class="ak-char-number">0${p+1}</span>${Hh(x.id)}<span class="ak-char-name">${Sa(x.name)}</span><span class="ak-char-check" aria-hidden="true">✓</span></button>`).join("")}</div></div>
        <div class="ak-start-area"><span class="ak-start-note">好天气，不如比一场。</span><button class="ak-start" data-action="start" disabled><span><small>LET’S MAKE WAVES</small><strong data-ui="start-label">正在准备海岸</strong></span>${ce("arrow")}</button><span class="ak-start-foot"><span class="ak-status-dot"></span> 单人大奖赛 <i>·</i> 键盘 / 触屏均可游玩</span></div>
      </footer>
    </section>
    <nav class="ak-toolbar" aria-label="游戏选项">
      <button class="ak-icon-button ak-help-button" data-action="help" aria-label="操作说明" title="操作说明">${ce("help")}</button>
      <button class="ak-icon-button" data-action="mute" data-ui="mute" aria-label="关闭声音" aria-pressed="false" title="声音">${ce("sound")}</button>
      <button class="ak-icon-button ak-settings-button" data-action="settings" aria-label="游戏设置" title="游戏设置">${ce("settings")}</button>
      <button class="ak-icon-button ak-pause-button" data-action="pause" aria-label="暂停比赛" title="暂停比赛 · Esc" hidden>${ce("pause")}</button>
    </nav>
    <section class="ak-hud" data-ui="hud" aria-label="比赛信息" hidden>
      <div class="ak-race-standing"><div class="ak-position"><div><strong data-ui="position">1</strong><sup data-ui="ordinal">ST</sup></div><span>POSITION <b>/ <span data-ui="total-racers">8</span></b></span></div><div class="ak-lap"><span class="ak-micro">LAP / 圈数</span><strong><span data-ui="lap">1</span><small>/ <span data-ui="total-laps">3</span></small></strong><span class="ak-lap-dots" data-ui="lap-dots"><i></i><i></i><i></i></span></div></div>
      <div class="ak-race-metrics"><div class="ak-timer">${ce("clock")}<span data-ui="time">00:00.00</span></div><div class="ak-coins">${ce("fish")}<span data-ui="coins">00</span><small>COINS</small></div></div>
      <div class="ak-item-wrap"><button class="ak-item" data-action="item" data-ui="item-button" aria-label="尚未获得道具" disabled><span data-ui="item-icon">${ce("bolt")}</span><small data-ui="item-key">E</small></button><span data-ui="item-label">拾取道具</span></div>
      <div class="ak-minimap"><div class="ak-map-label"><span>SAKURA COAST</span><span class="ak-map-live">LIVE</span></div><svg data-ui="map" viewBox="0 0 180 144" role="img" aria-label="赛道小地图"><path data-ui="map-outline" fill="none" stroke="#fff7e6" stroke-width="12" stroke-linejoin="round"/><path data-ui="map-path" fill="none" stroke="#568b87" stroke-width="5" stroke-linejoin="round"/><path data-ui="map-grid" fill="none" stroke="#173d45" stroke-width="3"/><g data-ui="map-racers"></g></svg><span class="ak-map-legend"><i></i> YOU <span>●</span> THE PACK</span></div>
      <div class="ak-speedometer"><div class="ak-speed-main"><svg class="ak-speed-arc" viewBox="0 0 192 116" aria-hidden="true"><path d="M15 104a81 81 0 1 1 162 0" fill="none" stroke="rgba(255,248,231,.32)" stroke-width="4"/><path data-ui="speed-arc" d="M15 104a81 81 0 1 1 162 0" pathLength="100" fill="none" stroke="#f9f2de" stroke-width="5" stroke-dasharray="100" stroke-dashoffset="100"/></svg><strong data-ui="speed">0</strong><span>KM/H</span></div><div class="ak-drift-label"><span data-ui="drift-label">DRIFT CHARGE</span><b data-ui="boost-label">HOLD SHIFT</b></div><div class="ak-drift-track" role="meter" aria-label="漂移蓄力" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-ui="drift-meter"><i data-ui="drift-fill"></i><span></span><span></span></div></div>
      <div class="ak-keyboard-hint"><span><kbd>W A S D</kbd> / <kbd>↑ ← ↓ →</kbd> 驾驶</span><span><kbd data-ui="drift-key">SHIFT</kbd> 漂移</span><span><kbd data-ui="item-hint-key">E</kbd> 道具</span><span><kbd>R</kbd> 回赛道</span></div>
      <div class="ak-touch-controls" aria-label="触屏驾驶"><div class="ak-touch-steering"><button data-touch="left" class="ak-touch-button" aria-label="向左转">${ce("chevron","ak-flip")}</button><button data-touch="right" class="ak-touch-button" aria-label="向右转">${ce("chevron")}</button></div><div class="ak-touch-pedals"><button data-touch="drift" class="ak-touch-button ak-touch-drift" aria-label="按住漂移">漂移</button><button data-touch="brake" class="ak-touch-button ak-touch-brake" aria-label="刹车">刹车</button><button data-touch="throttle" class="ak-touch-button ak-touch-throttle" aria-label="加速">${ce("arrow")}<span>GO</span></button></div></div>
    </section>
    <div class="ak-countdown" data-ui="countdown" aria-live="assertive" hidden><small data-ui="countdown-label">READY, LITTLE RACER?</small><strong data-ui="countdown-number">3</strong><span>下一站，终点线。</span></div>
    <section class="ak-overlay ak-pause-overlay" data-ui="pause" role="dialog" aria-modal="true" aria-labelledby="ak-pause-title" hidden><div class="ak-pause-card"><span class="ak-paper-corner">${ce("palm")}</span><span class="ak-eyebrow">A LITTLE PIT STOP</span><h2 id="ak-pause-title">TAKE IT<br><em>EASY.</em></h2><p>海风不急，我们等你。</p><button class="ak-button ak-button-primary" data-action="resume">继续比赛 ${ce("play")}</button><button class="ak-button" data-action="restart">重新出发 ${ce("restart")}</button><div class="ak-pause-links"><button data-action="help">操作说明</button><button data-action="settings">设置</button><button data-action="menu">返回主菜单</button></div><small class="ak-pause-hint">ESC TO GET BACK IN THE GROOVE</small></div></section>
    <section class="ak-overlay ak-results-overlay" data-ui="results" role="dialog" aria-modal="true" aria-labelledby="ak-results-title" hidden><div class="ak-results-card"><div class="ak-result-eyebrow"><span class="ak-checker"></span> SAKURA COAST · GRAND PRIX <span class="ak-checker"></span></div><h2 id="ak-results-title">WHAT A <em>RIDE!</em></h2><p data-ui="result-message">漂亮完赛！海风为你欢呼。</p><div class="ak-podium" data-ui="podium"></div><div class="ak-result-stats"><div><span>YOUR PLACE</span><strong><b data-ui="result-place">—</b><small data-ui="result-ordinal"></small></strong></div><div><span>RACE TIME</span><strong class="ak-result-time" data-ui="result-time">—</strong></div><div><span>FISH COINS</span><strong>${ce("fish")}<b data-ui="result-coins">0</b></strong></div><div data-ui="best-lap-wrap" hidden><span>BEST LAP</span><strong class="ak-result-time" data-ui="best-lap">—</strong></div></div><div class="ak-results-actions"><button class="ak-button" data-action="menu">${ce("home")} 返回海岸</button><button class="ak-button ak-button-primary" data-action="restart">再来一场 ${ce("arrow")}</button></div><span class="ak-results-footer">SAME SUNSHINE. ONE MORE FINISH LINE.</span></div></section>
    <dialog class="ak-dialog" data-ui="dialog" aria-labelledby="ak-dialog-title"><button class="ak-icon-button ak-dialog-close" data-action="close-dialog" aria-label="关闭">${ce("close")}</button><span class="ak-eyebrow" data-ui="dialog-eyebrow">THE LITTLE FIELD GUIDE</span><h2 id="ak-dialog-title" data-ui="dialog-title">HOW TO <em>ZOOM.</em></h2><div data-ui="help-panel"><p class="ak-dialog-intro">先享受海风，再把弯道变成主场。</p><dl class="ak-controls-list"><div><dt><kbd>W A S D</kbd><span> / </span><kbd>↑ ← ↓ →</kbd></dt><dd>加速、刹车与转向</dd></div><div><dt><kbd data-ui="help-drift-key">SPACE / SHIFT</kbd></dt><dd>按住漂移，松开释放加速</dd></div><div><dt><kbd data-ui="help-item-key">E</kbd></dt><dd>使用拾取的道具</dd></div><div><dt><kbd>R</kbd></dt><dd>回到赛道</dd></div><div><dt><kbd>ESC</kbd></dt><dd>暂停 / 继续比赛</dd></div></dl><p class="ak-help-tip">${ce("fish")} 沿途收集鱼币，穿过加速带。弯道上攒满漂移条，出弯时快猫一步。</p><p class="ak-extra-keys"><kbd>C</kbd> 镜头 <kbd>P</kbd> 明信片 <kbd>M</kbd> 声音 <kbd>F</kbd> 全屏</p><p class="ak-touch-help">触屏：左侧转向，右侧加速、刹车和漂移；点击道具即可使用。</p></div><div data-ui="settings-panel" hidden><p class="ak-dialog-intro">调好节奏，再去兜风。</p><div class="ak-setting-row" data-setting="sound"><div><strong>海岛之声</strong><small>音乐与比赛音效</small></div><button class="ak-setting-toggle" data-action="mute" data-ui="mute-setting" aria-pressed="false">声音开启</button></div><label class="ak-setting-row" data-setting="quality"><span><strong>画面品质</strong><small>流畅与风景，都很重要</small></span><select data-ui="quality" aria-label="画面品质"><option value="high">精致 · HIGH</option><option value="balanced">均衡 · BALANCED</option><option value="low">流畅 · LOW</option></select></label><div class="ak-setting-actions"><button class="ak-button" data-setting="camera" data-action="camera">${ce("view")} 切换镜头</button><button class="ak-button" data-setting="photo" data-action="photo">${ce("camera")} 明信片模式</button><button class="ak-button" data-setting="fullscreen" data-action="fullscreen">${ce("fullscreen")} 全屏游玩</button></div></div></dialog>
    <div class="ak-loading" data-ui="loading" role="progressbar" aria-label="正在准备比赛" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div><span data-ui="loading-label">正在准备海岸</span><b data-ui="loading-percent">0%</b></div><span><i data-ui="loading-fill"></i></span></div>
    <div class="ak-toast" data-ui="toast" role="status" aria-live="polite" hidden></div>`;const n=Object.fromEntries([...e.querySelectorAll("[data-ui]")].map(x=>[x.dataset.ui,x])),s=(x,p)=>{const D=n[x],V=String(p??"");D&&D.textContent!==V&&(D.textContent=V)},r=(x,p)=>{n[x]&&(n[x].hidden=p)},a=new Set,o=(x,p)=>{const D=setTimeout(()=>{a.delete(D),x()},p);return a.add(D),D};let l="menu",c=t.some(x=>x.id===i.selectedCharacter)?i.selectedCharacter:((L=t.find(x=>x.id==="mochi"))==null?void 0:L.id)||t[0].id,h=!!i.muted,u=!0,d,f,m={},M="",v=!1,g=null,T=!1;const E=new Map;let S=!1,A,C=[],U=null,I=null,b=-1/0,y=-1,R=[];function G(x,p=2600){d&&(clearTimeout(d),a.delete(d)),s("toast",x),r("toast",!x),x&&(d=o(()=>r("toast",!0),p))}function Y(x,...p){if(typeof i[x]=="function")try{const D=i[x](...p);return D!=null&&D.catch&&D.catch(V=>G((V==null?void 0:V.message)||"这次没有成功，请再试一次。")),D}catch(D){G((D==null?void 0:D.message)||"这次没有成功，请再试一次。")}}function nt(){const x=window.__touchInput||(window.__touchInput={});for(const[p,D]of Object.entries({throttle:0,brake:0,steer:0,drift:!1,item:!1}))x[p]===void 0&&(x[p]=D);return x}function j(){const x=new Set(E.values());Object.assign(nt(),{throttle:x.has("throttle")?1:0,brake:x.has("brake")?1:0,steer:Number(x.has("right"))-Number(x.has("left")),drift:x.has("drift"),item:S}),e.querySelectorAll("[data-touch]").forEach(p=>p.classList.toggle("is-held",x.has(p.dataset.touch)))}function tt(){E.clear(),S=!1,j()}function ct(){l!=="racing"||n["item-button"].disabled||(A&&(clearTimeout(A),a.delete(A)),S=!0,j(),A=o(()=>{S=!1,j()},150))}function Q(x,p=!0){const D=t.findIndex(Z=>Z.id===x);if(D<0)return;c=x;const V=t[D];e.querySelectorAll("[data-character]").forEach(Z=>{const q=Z.dataset.character===x;Z.classList.toggle("is-selected",q),Z.setAttribute("aria-pressed",String(q))}),s("hero-number",String(D+1).padStart(2,"0")),s("hero-name",V.name),s("hero-subtitle",V.subtitle),p&&Y("onCharacter",x)}function St(x){h=!!x,n.mute.innerHTML=ce(h?"muted":"sound"),n.mute.setAttribute("aria-pressed",String(h)),n.mute.setAttribute("aria-label",h?"开启声音":"关闭声音"),n.mute.title=h?"开启声音":"关闭声音",n["mute-setting"].setAttribute("aria-pressed",String(h)),s("mute-setting",h?"声音关闭":"声音开启"),n["mute-setting"].classList.toggle("is-muted",h)}function wt(x){let p,D=x;x&&typeof x=="object"&&(p=re(x.label,x.message),D=re(x.progress,x.total>0?me(x.loaded)/x.total:void 0,x.percent,0)),D=me(D),D>1&&(D/=100),D=Rs(D,0,1);const V=Math.round(D*100);u=D<1,e.classList.toggle("is-loading",u),n.loading.setAttribute("aria-valuenow",String(V)),n["loading-fill"].style.transform=`scaleX(${D})`,s("loading-percent",`${V}%`),s("loading-label",p||"正在准备海岸"),s("start-label",u?`正在准备 · ${V}%`:"开始比赛"),e.querySelector('[data-action="start"]').disabled=u||T,r("loading",!u)}function bt(x=!0){if(!n.dialog.open)return;typeof n.dialog.close=="function"?n.dialog.close():n.dialog.removeAttribute("open");const p=v;v=!1,x&&p&&l==="paused"&&Y("onResume"),g!=null&&g.isConnected&&!g.closest("[hidden]")&&g.focus({preventScroll:!0})}function Lt(x){g=document.activeElement,v=l==="racing"||l==="countdown",v&&Y("onPause"),tt(),r("help-panel",x!=="help"),r("settings-panel",x!=="settings"),s("dialog-eyebrow",x==="help"?"THE LITTLE FIELD GUIDE":"MAKE YOURSELF AT HOME"),n["dialog-title"].innerHTML=x==="help"?"HOW TO <em>ZOOM.</em>":"ISLAND <em>VIBES.</em>",n.dialog.open||(typeof n.dialog.showModal=="function"?n.dialog.showModal():n.dialog.setAttribute("open",""))}function Vt(x){var V;const p=Vh(x);if(!["menu","countdown","racing","paused","finished"].includes(p)||l===p)return;const D=l;l=p,e.dataset.phase=l,r("menu",l!=="menu"),r("hud",!["countdown","racing","paused"].includes(l)),r("pause",l!=="paused"),r("results",l!=="finished"),e.querySelector('[data-action="pause"]').hidden=!["countdown","racing"].includes(l),f&&(clearTimeout(f),a.delete(f)),r("countdown",l!=="countdown"),l==="racing"&&D==="countdown"&&(s("countdown-number","GO!"),s("countdown-label","CATCH THE COAST"),r("countdown",!1),f=o(()=>r("countdown",!0),720)),l==="countdown"&&(s("countdown-label","READY, LITTLE RACER?"),s("countdown-number","3")),l!=="racing"&&l!=="countdown"&&tt(),(l==="menu"||l==="finished")&&bt(!1),l==="countdown"&&((V=e.querySelector(":focus"))==null||V.blur()),l==="finished"&&(M="",pt(m)),l==="paused"&&!n.dialog.open&&o(()=>{l==="paused"&&!n.dialog.open&&e.querySelector('[data-action="resume"]').focus({preventScroll:!0})},0)}function Yt(x={}){var Z;(!x||typeof x!="object")&&(x={});const p={...x,...x.state||x.raceState||{}},D=Array.isArray(re(p.racers,x.racers,p.players))?re(p.racers,x.racers,p.players):[],V=(p.player&&typeof p.player=="object"?p.player:null)||D.find(q=>q.isPlayer||q.id==="player")||{};return{...p,racers:D,player:V,phase:Vh(re(p.phase,p.status,l)),position:me(re(p.position,p.place,p.rank,V.rank,V.place),1),totalRacers:me(re(p.totalRacers,p.racerCount,D.length||void 0),8),lap:me(re(p.lap,p.currentLap,V.lap),1),totalLaps:me(re(p.totalLaps,p.lapCount),3),elapsed:me(re(p.elapsed,p.raceTime,p.elapsedTime,p.time)),speed:me(re(p.speed,p.speedKmh,V.speedKmh,V.speed)),coins:me(re(p.coins,p.coinCount,V.coins)),item:re(p.item,p.currentItem,V.item),driftCharge:me(re(p.driftCharge,(Z=p.drift)==null?void 0:Z.charge,V.driftCharge)),boost:re(p.boost,p.boostTime,V.boost,0)}}let Ot=null;function lt(x={}){var et,P;const p=Yt(x);m=p,p.phase&&Vt(p.phase);const D=Math.max(1,Math.round(p.position));s("position",D),s("ordinal",$o(D)),s("total-racers",p.totalRacers);const V=Rs(Math.floor(p.lap),1,Math.max(1,p.totalLaps));s("lap",V),s("total-laps",p.totalLaps),[...n["lap-dots"].children].forEach((W,k)=>W.classList.toggle("is-complete",k<V)),s("time",ba(p.elapsed)),s("coins",String(Math.floor(p.coins)).padStart(2,"0"));const Z=Math.max(0,Math.round(p.speed));s("speed",Z),n["speed-arc"].setAttribute("stroke-dashoffset",String(100-Rs(Z/me(i.maxSpeed,180),0,1)*100));const q=Rs(p.driftCharge>1?p.driftCharge/100:p.driftCharge,0,1),vt=typeof p.boost=="object"?me(re(p.boost.remaining,p.boost.time))>0:me(p.boost)>0;n["drift-fill"].style.transform=`scaleX(${vt?1:q})`,n["drift-meter"].setAttribute("aria-valuenow",String(Math.round(q*100))),n["drift-meter"].classList.toggle("is-charged",q>=.66),e.classList.toggle("is-boosting",vt),s("drift-label",vt?"ISLAND TURBO":"DRIFT CHARGE"),s("boost-label",vt?"BOOST!":q>=.66?"RELEASE!":q>.05?"CHARGING":`HOLD ${((et=i.controls)==null?void 0:et.drift)||"SHIFT"}`);const ht=p.item,Et=ht&&ht!=="none"?String(typeof ht=="object"?re(ht.type,ht.kind,ht.id,ht.name,"item"):ht):"";if(Et!==Ot){Ot=Et;const W={boost:"椰风加速",turbo:"椰风加速",mushroom:"椰风加速",shield:"泡泡护盾",bubble:"泡泡护盾",shell:"追风飞弹",rocket:"追风飞弹",fish:"飞鱼冲刺",banana:"小心打滑",coconut:"椰子出击",oil:"小心打滑"},k=Et?typeof ht=="object"&&ht.label||W[Et.toLowerCase()]||"海岛道具":"拾取道具";n["item-icon"].innerHTML=ce(/shield|bubble/.test(Et)?"shield":/fish/.test(Et)?"fish":"bolt"),n["item-button"].disabled=!Et,n["item-button"].classList.toggle("has-item",!!Et),n["item-button"].setAttribute("aria-label",Et?`使用${k}`:"尚未获得道具"),s("item-label",k)}if(l==="countdown"){const W=Math.ceil(me(re(p.countdown,p.countdownRemaining),3));s("countdown-number",W>0?W:"GO!")}l==="finished"&&pt(p);const yt=re(p.mapPoints,(P=p.track)==null?void 0:P.mapPoints);(yt||C.length)&&Dt(yt||U,p.racers)}function pt(x){var Et,yt;const p=re((Et=x.results)==null?void 0:Et.standings,(yt=x.results)==null?void 0:yt.racers,x.results),D=(Array.isArray(p)&&p.length?p:x.racers||[]).map((et,P)=>typeof et=="object"&&et?{...et,_index:P}:{name:String(et),_index:P});(!Array.isArray(p)||!p.length)&&D.sort((et,P)=>{const W=re(et.rank,et.place,typeof et.position=="number"?et.position:void 0),k=re(P.rank,P.place,typeof P.position=="number"?P.position:void 0);return W!==void 0&&k!==void 0?me(W)-me(k):et.finished!==P.finished?et.finished?-1:1:et.finishTime&&P.finishTime?et.finishTime-P.finishTime:me(P.progress)-me(et.progress)});const V=D.find(et=>et.isPlayer||et.id==="player")||x.player||{},Z=Math.max(1,Math.round(me(re(V.rank,V.place,typeof V.position=="number"?V.position:void 0,x.position),1))),q=re(x.finishTime,V.finishTime,V.time,x.elapsed),vt=re(x.bestLap,x.bestLapTime,V.bestLap,V.bestLapTime),ht=JSON.stringify([D.slice(0,3).map(et=>[et.id,et.characterId,et.name,et.finishTime,et.time,et.estimated]),Z,q,x.coins,vt]);ht!==M&&(M=ht,s("result-message",Z===1?"冠军，喵！这片海岸为你欢呼。":Z<=3?"登上领奖台！今天的海风格外甜。":"漂亮完赛！下一场，再快猫一步。"),s("result-place",Z),s("result-ordinal",$o(Z)),s("result-time",ba(q)),s("result-coins",x.coins??V.coins??0),r("best-lap-wrap",!(me(vt)>0)),s("best-lap",ba(vt)),n.podium.innerHTML=D.length?[1,0,2].filter(et=>D[et]).map(et=>{const P=D[et],W=t.find(st=>st.id===P.characterId||st.id===P.id)||t.find(st=>st.id===c),k=P.isPlayer||P.id==="player",$=re(P.finishTime,P.time);return`<div class="ak-podium-place ak-podium-${et+1}${k?" is-player":""}">${et===0?`<span class="ak-podium-crown">${ce("trophy")}</span>`:""}<span class="ak-podium-cat">${Hh(W.id)}</span><strong>${Sa(P.name||W.name)}${k?"<small>YOU</small>":""}</strong><span class="ak-podium-time">${$!=null&&me($)>0?`${P.estimated?"≈ ":""}${ba($)}`:P.finished===!1?"RACING":"—"}</span><span class="ak-podium-step"><b>0${et+1}</b><i>${$o(et+1)}</i></span></div>`}).join(""):'<p class="ak-results-pending">等待比赛成绩…</p>')}function At(x){const p=(x==null?void 0:x.position)||(x==null?void 0:x.pos)||x||{};return Array.isArray(p)?[me(p[0]),me(p.length>2?p[2]:p[1])]:[me(p.x),me(re(p.z,p.y))]}function Dt(x,p=[]){if(Array.isArray(x)&&x.length>1&&(x!==U||x.length!==C.length)){U=x,C=x.map(At);const Z=C.map(it=>it[0]),q=C.map(it=>it[1]),vt=Math.min(...Z),ht=Math.max(...Z),Et=Math.min(...q),yt=Math.max(...q),et=Math.min(152/Math.max(1,ht-vt),115/Math.max(1,yt-Et));I=([it,ft])=>[90+(it-(vt+ht)/2)*et,72-(ft-(Et+yt)/2)*et];const P=C.map(I),W=`${P.map(([it,ft],Mt)=>`${Mt?"L":"M"}${it.toFixed(2)},${ft.toFixed(2)}`).join("")}Z`;n["map-path"].setAttribute("d",W),n["map-outline"].setAttribute("d",W);const[k,$]=P[0],st=P[1],F=Math.atan2(st[1]-$,st[0]-k)+Math.PI/2;n["map-grid"].setAttribute("d",`M${k-Math.cos(F)*6},${$-Math.sin(F)*6}L${k+Math.cos(F)*6},${$+Math.sin(F)*6}`),b=-1/0}if(!I||!Array.isArray(p))return;const D=typeof performance<"u"?performance.now():Date.now();if(D-b<45&&p.length===y)return;b=D,p.length!==y&&(y=p.length,n["map-racers"].replaceChildren(),R=p.map(()=>{const Z=document.createElementNS("http://www.w3.org/2000/svg","circle");return n["map-racers"].append(Z),Z}));let V;p.forEach((Z,q)=>{let vt;if(Z.position||Z.pos||Z.x!==void 0)vt=At(Z);else{const W=(me(re(Z.u,Z.progress))%1+1)%1*C.length,k=C[Math.floor(W)%C.length],$=C[(Math.floor(W)+1)%C.length];vt=[k[0]+($[0]-k[0])*(W%1),k[1]+($[1]-k[1])*(W%1)]}const[ht,Et]=I(vt),yt=Z.isPlayer||Z.id==="player",et=R[q];et.setAttribute("cx",String(Rs(ht,6,174))),et.setAttribute("cy",String(Rs(Et,6,138))),et.setAttribute("r",yt?"5.5":"3.4"),et.setAttribute("fill",yt?"#f47760":oi),et.setAttribute("stroke","#fff8e9"),et.setAttribute("stroke-width",yt?"2":"1.1"),yt&&(V=et)}),V&&n["map-racers"].lastChild!==V&&n["map-racers"].append(V)}function Ct(x){const p=x.target.closest("[data-character]");if(p&&l==="menu"){Q(p.dataset.character);return}const D=x.target.closest("[data-action]");if(!(!D||D.disabled))switch(D.dataset.action){case"start":if(u||T||l!=="menu")return;T=!0,D.disabled=!0,Y("onStart",c),o(()=>{T=!1,D.disabled=u},450);break;case"pause":(l==="racing"||l==="countdown")&&Y("onPause");break;case"resume":Y("onResume");break;case"restart":bt(!1),Y("onRestart",c);break;case"menu":bt(!1),Y("onMenu");break;case"mute":St(!h),Y("onMute",h);break;case"help":Lt("help");break;case"settings":Lt("settings");break;case"close-dialog":bt();break;case"fullscreen":Y("onFullscreen");break;case"camera":Y("onCamera");break;case"photo":bt(),Y("onPhoto");break;case"item":ct();break}}function Wt(x){var D;const p=x.target.closest("[data-touch]");!p||!["racing","countdown"].includes(l)||(x.preventDefault(),(D=p.setPointerCapture)==null||D.call(p,x.pointerId),E.set(x.pointerId,p.dataset.touch),j())}function Xt(x){E.delete(x.pointerId)&&j()}function z(){document.hidden&&tt()}e.addEventListener("click",Ct),e.addEventListener("pointerdown",Wt),e.addEventListener("pointerup",Xt),e.addEventListener("pointercancel",Xt),e.addEventListener("lostpointercapture",Xt),e.addEventListener("contextmenu",x=>{x.target.closest("[data-touch]")&&x.preventDefault()}),n.quality.addEventListener("change",()=>Y("onQuality",n.quality.value)),n.dialog.addEventListener("cancel",x=>{x.preventDefault(),bt()}),n.dialog.addEventListener("click",x=>{if(x.target===n.dialog){const p=n.dialog.getBoundingClientRect();(x.clientX<p.left||x.clientX>p.right||x.clientY<p.top||x.clientY>p.bottom)&&bt()}}),n.dialog.addEventListener("keydown",x=>{x.stopPropagation(),x.key==="Escape"&&(x.preventDefault(),bt())}),window.addEventListener("blur",tt),window.addEventListener("pointerup",Xt),document.addEventListener("visibilitychange",z);for(const[x,p]of Object.entries({sound:"onMute",quality:"onQuality",camera:"onCamera",photo:"onPhoto",fullscreen:"onFullscreen"}))e.querySelector(`[data-setting="${x}"]`).hidden=typeof i[p]!="function";n.mute.hidden=typeof i.onMute!="function";const _t=["onMute","onQuality","onCamera","onPhoto","onFullscreen"].some(x=>typeof i[x]=="function");e.querySelectorAll('[data-action="settings"]').forEach(x=>{x.hidden=!_t});let dt=i.quality;if(!dt)try{dt=localStorage.getItem("aloha-quality")}catch{}if(dt||(dt=window.innerWidth<800?"balanced":"high"),n.quality.value={medium:"balanced",ultra:"high"}[dt]||dt,(H=i.controls)!=null&&H.drift)for(const x of["drift-key","help-drift-key"])s(x,i.controls.drift);if((X=i.controls)!=null&&X.item)for(const x of["item-key","item-hint-key","help-item-key"])s(x,i.controls.item);e.classList.toggle("ak-touch-enabled",i.touch===!0||i.touch!==!1&&(navigator.maxTouchPoints>0||((ut=window.matchMedia)==null?void 0:ut.call(window,"(pointer: coarse)").matches))),Q(c,!1),St(h),nt(),wt(re(i.loadingProgress,0));const B=()=>{a.forEach(clearTimeout),a.clear(),tt(),bt(!1),window.removeEventListener("blur",tt),window.removeEventListener("pointerup",Xt),document.removeEventListener("visibilitychange",z),e.removeEventListener("click",Ct),e.removeEventListener("pointerdown",Wt),e.removeEventListener("pointerup",Xt),e.removeEventListener("pointercancel",Xt),e.removeEventListener("lostpointercapture",Xt),delete e.__alohaUIDispose};return e.__alohaUIDispose=B,{update:lt,setPhase:Vt,setLoading:wt,setMuted:St,setToast:G,drawMap:Dt,getSelectedCharacter:()=>c,dispose:B}}const Ea=Object.freeze([]),Gh=Math.PI*2,jo=(i,t,e)=>Math.max(t,Math.min(e,i)),an=(i,t=0)=>Number.isFinite(i)?i:t,Re={sand:new Ut("#eed4a0"),sandLight:new Ut("#fff0ce"),blue:new Ut("#65cfff"),blueWhite:new Ut("#d0f4ff"),pink:new Ut("#ff71ca"),pinkWhite:new Ut("#ffe0f6"),orange:new Ut("#ff9b42"),teal:new Ut("#69ffe0"),gold:new Ut("#ffda65"),white:new Ut("#fff6d7")},Wh=["#ff7d97","#62e8d1","#ffd46b","#8acbff","#e1a0ff","#fff6d7"].map(i=>new Ut(i));function Xh(i=!1){const e=new Uint8Array(4096);for(let s=0;s<32;s++)for(let r=0;r<32;r++){const a=(r+.5)/32*2-1,o=(s+.5)/32*2-1,l=Math.hypot(a,o);let c=Math.pow(Math.max(0,1-l),i?1.7:2.1);if(i){const u=Math.exp(-Math.min(a*a,o*o)*150)*Math.max(0,1-l)*.55;c=Math.min(1,c+u)}const h=(s*32+r)*4;e[h]=e[h+1]=e[h+2]=255,e[h+3]=Math.round(c*255)}const n=new ac(e,32,32,Rn);return n.minFilter=n.magFilter=kn,n.generateMipmaps=!1,n.needsUpdate=!0,n}function Ko(i,t,e,n,s,r,a,o,l){const c=new Float32Array(e*3),h=new Float32Array(e*3),u=new Float32Array(e*3),d=new Float32Array(e*3),f=new Float32Array(e),m=new Float32Array(e),M=new Float32Array(e),v=new se,g=new nn(c,3).setUsage(Ga),T=new nn(h,3).setUsage(Ga);v.setAttribute("position",g),v.setAttribute("color",T),v.setDrawRange(0,e);const E=new Cu({map:n,size:s,opacity:r,transparent:!0,depthWrite:!1,vertexColors:!0,sizeAttenuation:!0,toneMapped:!1,blending:a?br:Ai}),S=new Bf(v,E);S.name=`aloha-fx-${t}`,S.frustumCulled=!1,S.renderOrder=a?4:2,S.visible=!1,i.add(S);for(let I=0;I<e;I++)c[I*3+1]=-1e4;let A=0,C=0,U=!1;return{emit(I,b,y,R,G,Y,nt,j,tt=b-.2){const ct=A;A=(A+1)%e,f[ct]<=0&&C++;const Q=ct*3;c[Q]=I,c[Q+1]=b,c[Q+2]=y,d[Q]=R,d[Q+1]=G,d[Q+2]=Y,u[Q]=h[Q]=j.r,u[Q+1]=h[Q+1]=j.g,u[Q+2]=h[Q+2]=j.b,f[ct]=m[ct]=nt,M[ct]=tt,U=!0,S.visible=!0},update(I){if(!C&&!U)return;const b=Math.exp(-l*I);for(let y=0;y<e;y++){if(f[y]<=0)continue;const R=y*3;if(f[y]-=I,f[y]<=0){f[y]=0,C--,c[R+1]=-1e4;continue}if(d[R]*=b,d[R+2]*=b,d[R+1]-=o*I,c[R]+=d[R]*I,c[R+1]+=d[R+1]*I,c[R+2]+=d[R+2]*I,c[R+1]<M[y]&&(c[R+1]=M[y],d[R+1]=Math.abs(d[R+1])*.22),a){const G=Math.min(1,f[y]/m[y]*2.3);h[R]=u[R]*G,h[R+1]=u[R+1]*G,h[R+2]=u[R+2]*G}}g.needsUpdate=!0,(a||U)&&(T.needsUpdate=!0),U=!1,S.visible=C>0},clear(){f.fill(0);for(let I=0;I<e;I++)c[I*3+1]=-1e4;C=0,U=!0,S.visible=!1},dispose(){i.remove(S),v.dispose(),E.dispose()}}}function qh(i,t,e,n=!1){const s=n?new ui(1,1):new Pn(1,1,1),r=new Or({color:16777215,transparent:!n,opacity:n?1:.78,depthWrite:n,toneMapped:!1,side:n?Fe:di,blending:n?Ai:br}),a=new oc(s,r,e);a.name=`aloha-fx-${t}`,a.instanceMatrix.setUsage(Ga),a.frustumCulled=!1,a.renderOrder=n?1:3,a.visible=!1,i.add(a);const o=Array.from({length:e},()=>({life:0,duration:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,yaw:0,rotation:0,spin:0,size:1,length:1,ground:0})),l=new be;l.scale.set(0,0,0),l.updateMatrix();for(let d=0;d<e;d++)a.setMatrixAt(d,l.matrix),a.setColorAt(d,Re.white);a.instanceColor.setUsage(Ga);let c=0,h=0,u=!1;return{emit(d,f,m,M,v,g,T,E,S,A,C,U=0,I=f-1){const b=c;c=(c+1)%e;const y=o[b];y.life<=0&&h++,y.x=d,y.y=f,y.z=m,y.vx=M,y.vy=v,y.vz=g,y.life=y.duration=T,y.yaw=S,y.size=A,y.length=C,y.spin=U,y.rotation=S,y.ground=I,a.setColorAt(b,E),u=!0,a.visible=!0},update(d,f){if(!(!h&&!u)){for(let m=0;m<e;m++){const M=o[m];if(!(M.life<=0)){if(M.life-=d,M.life<=0)M.life=0,h--,l.position.set(0,-1e4,0),l.scale.set(0,0,0);else{M.x+=M.vx*d,M.y+=M.vy*d,M.z+=M.vz*d;const v=Math.min(1,M.life/M.duration*(n?4:1.5));n?(M.vy=Math.max(-3.8,M.vy-7*d),M.vx*=Math.exp(-.75*d),M.vz*=Math.exp(-.75*d),M.rotation+=M.spin*d,M.x+=Math.sin(f*3.5+m*1.7)*.8*d,M.y<M.ground&&(M.y=M.ground,M.life=Math.min(M.life,.35)),l.rotation.set(M.rotation,M.yaw+M.rotation*.7,M.rotation*.45),l.scale.set(M.size*v,M.size*.48*v,1)):(l.rotation.set(0,M.yaw,0),l.scale.set(M.size*v,M.size*.6*v,M.length*v)),l.position.set(M.x,M.y,M.z)}l.updateMatrix(),a.setMatrixAt(m,l.matrix)}}a.instanceMatrix.needsUpdate=!0,u&&(a.instanceColor.needsUpdate=!0),u=!1,a.visible=h>0}},clear(){l.position.set(0,-1e4,0),l.scale.set(0,0,0),l.updateMatrix();for(let d=0;d<e;d++)o[d].life=0,a.setMatrixAt(d,l.matrix);h=0,u=!0,a.instanceMatrix.needsUpdate=!0,a.visible=!1},dispose(){i.remove(a),a.dispose(),s.dispose(),r.dispose()}}}function ax(i){const t=new Se;t.name="aloha-effects",i.add(t);const e=Xh(),n=Xh(!0),s=Ko(t,"sand",320,e,.95,.29,!1,-.2,2.4),r=Ko(t,"drift-sparks",480,n,.36,.92,!0,6.5,1.1),a=Ko(t,"pickup-pops",160,n,.56,.95,!0,3.2,1.2),o=qh(t,"boost-streaks",144),l=qh(t,"finish-confetti",240,!0),c=[s,r,a,o,l],h=new Map;let u=!1,d=0,f=0,m=Ea;function M(A,C=0){const U=A.id??A;let I=h.get(U);return I||(I={dust:0,spark:0,boost:0,charge:0,flashUntil:0,flashLevel:0,seen:f,x:A.position.x,z:A.position.z,side:C%2},h.set(U,I)),I.seen=f,I}function v(A,C,U,I=1,b=1){if(!A||!Number.isFinite(A.x)||!Number.isFinite(A.z))return;const y=an(A.y)+.08;for(let R=0;R<U;R++){const G=Gh*R/U+Math.random()*.3,Y=(1.4+Math.random()*2.9)*I;a.emit(A.x,y+b,A.z,Math.cos(G)*Y,(1.5+Math.random()*3)*I,Math.sin(G)*Y,.38+Math.random()*.45,R%4===0?Re.white:C,y)}}function g(A,C){const U=an(A==null?void 0:A.yaw),I=Math.sin(U),b=Math.cos(U),y=an(C.y)+.1;for(let R=0;R<160;R++){const G=R%2?-1:1,Y=(Math.random()-.5)*9,nt=-G*(1+Math.random()*4.5),j=(Math.random()-.2)*6;l.emit(C.x+b*G*4+I*Y,y+1.4+Math.random()*2.5,C.z-I*G*4+b*Y,b*nt+I*j,5+Math.random()*7,-I*nt+b*j,2.2+Math.random()*2,Wh[R%Wh.length],Math.random()*Gh,.13+Math.random()*.17,1,(Math.random()-.5)*14,y)}v(C,Re.gold,32,1.2,2)}function T(A,C,U=Ea){if(!u){A=jo(an(A),0,.075),d=Number.isFinite(C)?C:d+A,m=Array.isArray(U)?U:Ea,f++;for(let I=0;I<m.length;I++){const b=m[I],y=b==null?void 0:b.position;if(!y||!Number.isFinite(y.x)||!Number.isFinite(y.z))continue;const R=M(b,I),G=Math.abs(an(b.speed)),Y=b.isPlayer===!0||b.id==="player",nt=Y?1:.32,j=Math.sin(an(b.yaw)),tt=Math.cos(an(b.yaw)),ct=an(y.y)+.09,Q=!!b.drift&&G>3&&!b.finished,St=(b.boost===!0||an(b.boost)>0)&&G>2;Math.hypot(y.x-R.x,y.z-R.z)>Math.max(20,G*A*4)&&(R.dust=R.spark=R.boost=R.charge=0),R.x=y.x,R.z=y.z,R.charge=Q?R.charge+A:0;const bt=an(b.driftCharge,R.charge),Lt=an(b.driftTier??b.driftLevel)>=2||(Number.isFinite(b.driftCharge)?bt>=.58:bt>=1.3)||R.flashUntil>d&&R.flashLevel>=2,Vt=Lt?Re.pink:Re.blue,Yt=Lt?Re.pinkWhite:Re.blueWhite;if(G>3&&!b.finished){R.dust+=A*(Q?56:b.offroad?32:13)*nt*jo(G/18,.25,1.4);for(let Ot=Math.min(12,Math.floor(R.dust));Ot>0;Ot--){R.dust--;const lt=(R.side++%2?1:-1)*1.02,pt=-1.35-Math.random()*.4;s.emit(y.x+tt*lt+j*pt,ct+.05,y.z-j*lt+tt*pt,-j*G*.1+tt*lt*(Q?1.8:.5),.35+Math.random()*.7,-tt*G*.1-j*lt*(Q?1.8:.5),(Y?.62:.42)+Math.random()*.2,Ot%3?Re.sand:Re.sandLight,ct)}}else R.dust=0;if(Q||R.flashUntil>d){R.spark+=A*(Lt?112:74)*nt;for(let Ot=Math.min(18,Math.floor(R.spark));Ot>0;Ot--){R.spark--;const lt=R.side++%2?1:-1,pt=lt*(1.5+Math.random()*2.7),At=2.2+Math.random()*4;r.emit(y.x+tt*lt*1.1-j*1.32,ct+.13,y.z-j*lt*1.1-tt*1.32,tt*pt-j*At,.6+Math.random()*1.8,-j*pt-tt*At,.22+Math.random()*.26,Ot%3?Vt:Yt,ct)}}else R.spark=0;if(St){R.boost+=A*65*nt;for(let Ot=Math.min(12,Math.floor(R.boost));Ot>0;Ot--){R.boost--;const lt=(R.side++%2?1:-1)*(.55+Math.random()*.3),pt=-1.85-Math.random()*.7;o.emit(y.x+tt*lt+j*pt,ct+.3+Math.random()*.42,y.z-j*lt+tt*pt,-j*8,.05,-tt*8,Y?.26+Math.random()*.12:.22,R.side%3===0?Re.teal:Re.orange,an(b.yaw),Y?.1+Math.random()*.09:.07,jo(G*.07,.65,3.2))}}else R.boost=0}for(const I of c)I.update(A,d);if(f%120===0)for(const[I,b]of h)f-b.seen>120&&h.delete(I)}}function E(A,C=m){var Y,nt;if(u||!A)return;typeof A=="string"&&(A={type:A});const U=Array.isArray(C)?C:m,I=A.type;if(I==="reset"||I==="restart"||I==="menu"){for(const j of c)j.clear();h.clear();return}const b=A.racerId??((Y=A.racer)==null?void 0:Y.id)??(typeof A.racer=="string"?A.racer:void 0),y=((nt=A.racer)!=null&&nt.position?A.racer:null)??(b!=null?U.find(j=>j.id===b):U.find(j=>j.isPlayer||j.id==="player")),R=A.position??(y==null?void 0:y.position);if(!R||!Number.isFinite(R.x)||!Number.isFinite(R.z))return;const G=A.isPlayer??(y?!!(y.isPlayer||y.id==="player"):b==null||b==="player");switch(I){case"coin":v(R,Re.gold,G?22:7,.8,1.2);break;case"item":v(R,Re.teal,G?28:9,1,1.6);break;case"boost":v(R,Re.orange,G?20:6,.7,.45);break;case"drift":case"drift-charge":case"driftCharge":{if(y){const j=M(y);j.flashUntil=d+.4,j.flashLevel=an(A.tier??A.level??A.stage,an(A.charge)>=.58?2:1),v(R,j.flashLevel>=2?Re.pink:Re.blue,G?20:6,.65,.25)}break}case"hit":v(R,Re.white,G?18:7,1.1,.8);break;case"lap":G&&v(R,Re.teal,30,1.2,2);break;case"go":G&&v(R,Re.teal,24,.8,.65);break;case"finish":G&&g(y,R);break}for(const j of c)j.update(0,d)}function S(){if(!u){u=!0;for(const A of c)A.dispose();e.dispose(),n.dispose(),h.clear(),m=Ea,i.remove(t)}}return{update:T,event:E,dispose:S}}const Ta=(i,t,e)=>Math.max(t,Math.min(e,i)),Fn=(i,t=0)=>Number.isFinite(i)?i:t,Hi=Math.PI*2,Zo=.32,Yh=16,ox=10,lx=60/88/2,cx=.16,Jo=[76,0,79,76,74,0,72,0,69,0,72,74,76,0,72,0,74,0,76,79,76,74,72,0,69,72,0,67,0,69,72,0,79,0,81,79,76,0,74,0,76,74,72,0,69,0,67,0,72,0,74,76,79,0,76,74,72,0,69,67,0,69,72,0],$h=[[48,60,64,69],[45,57,60,67],[48,55,62,64],[43,55,60,62]];function wa(i){return()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296*2-1)}function hx(){const i=typeof window<"u"?window:null,t=typeof document<"u"?document:null;let e=null,n=null,s=!1,r=!1,a=!1,o=null,l=null,c=0,h=0,u=-1/0,d="menu",f=-1/0,m=0,M=null;const v=new Map,g=[],T=[],E=[],S=new Map,A=[],C=B=>(g.push(B),B),U=()=>typeof performance<"u"?performance.now()/1e3:Date.now()/1e3;function I(B,_){const O=C(e.createGain());return O.gain.value=B,_&&O.connect(_),O}function b(B,_,O,L){const H=C(e.createBiquadFilter());return H.type=B,H.frequency.value=_,H.Q.value=O,L&&H.connect(L),H}function y(B,_,O=.08){if(!e||!B)return;const L=e.currentTime;B.cancelScheduledValues(L),B.setTargetAtTime(_,L,O)}function R(B){if(B){B.onended=null;try{B.stop()}catch{}try{B.disconnect()}catch{}}}function G(B){R(B.source),B.source=null,B.endsAt=0,B.priority=-1/0,e&&e.state!=="closed"&&(B.gain.gain.cancelScheduledValues(e.currentTime),B.gain.gain.setValueAtTime(0,e.currentTime))}function Y(){for(const B of E)G(B)}function nt(B,_,O,L=1){if(v.has(B))return v.get(B);const H=e.createBuffer(L,Math.ceil(_*e.sampleRate),e.sampleRate);for(let X=0;X<L;X++)O(H.getChannelData(X),e.sampleRate,X);return v.set(B,H),H}function j(B){return nt(`pluck-${B}`,1.65,(_,O)=>{const L=wa(71417+B*319),H=440*Math.pow(2,(B-69)/12),X=O/H-.5,ut=Math.floor(X),x=X-ut,p=new Float32Array(ut+2);for(let q=0;q<p.length;q++)p[q]=L()*.65+Math.sin(Hi*q/ut)*.35;let D=0,V=0;for(let q=0;q<_.length;q++){const vt=q%p.length,ht=(vt-ut+p.length)%p.length,Et=(ht-1+p.length)%p.length,yt=q<p.length?p[vt]:p[ht]*(1-x)+p[Et]*x,et=(yt+D)*.4987;D=yt,p[vt]=et;const P=q/O,W=Math.min(1,P/.003)*Math.exp(-P*1.35)*Math.min(1,(_.length-q)/(O*.07));_[q]=(et+Math.sin(Hi*H*P)*Math.exp(-P*10)*.07)*W,V=Math.max(V,Math.abs(_[q]))}const Z=.78/Math.max(V,.01);for(let q=0;q<_.length;q++)_[q]*=Z})}function tt(B){return nt(B,B==="kick"?.28:B==="rim"?.12:.11,(O,L)=>{const H=wa(B==="kick"?701:B==="rim"?907:1201);let X=0,ut=0;for(let x=0;x<O.length;x++){const p=x/L,D=H(),V=Math.min(1,p/.002);B==="kick"?(X+=Hi*(65+67*Math.exp(-p*38))/L,O[x]=Math.sin(X)*Math.exp(-p*19)*V*.72):B==="rim"?O[x]=(Math.sin(Hi*470*p)*.5+Math.sin(Hi*730*p)*.2+D*.16)*Math.exp(-p*48)*V:O[x]=(D-ut)*.23*Math.exp(-p*40)*V,ut=D}})}function ct(){return nt("surf-loop",3,(B,_,O)=>{const L=wa(49313+O*9007);let H=0,X=0;for(let x=0;x<B.length;x++)H=H*.86+L()*.14,X=X*.985+H*.015,B[x]=H*.8+X*1.5;const ut=Math.floor(_*.12);for(let x=0;x<ut;x++){const p=x/ut,D=B.length-ut+x;B[D]=B[D]*(1-p)+B[x]*p}},2)}function Q(B,_,O,L,H=!1){return nt(B,_,(X,ut)=>{let x=0;for(let p=0;p<X.length;p++){const D=p/ut,V=D/_;x+=Hi*(O*Math.pow(L/O,V))/ut;const Z=Math.min(1,D/.005)*Math.pow(1-V,1.55);X[p]=(Math.sin(x)*.7+(H?Math.sin(x*2)*.13:0))*Z}})}function St(){return nt("boost-whoosh",.65,(B,_)=>{const O=wa(851111);let L=0,H=0;for(let X=0;X<B.length;X++){const x=X/_/.65;L=L*.78+O()*.22,H+=Hi*(180+x*350)/_,B[X]=(L*1.2+Math.sin(H)*.08)*Math.sin(Math.PI*x)*Math.pow(1-x,.65)}})}function wt(){const B=I(0),_=C(e.createDynamicsCompressor());_.threshold.value=-16,_.knee.value=18,_.ratio.value=5,_.attack.value=.004,_.release.value=.22,B.connect(_),_.connect(e.destination);const O=I(.42,B),L=I(.58,B),H=I(.26,B),X=I(.18,B),ut=I(0,H),x=b("lowpass",390,.35,ut),p=C(e.createOscillator());p.type="triangle",p.frequency.value=48,p.connect(I(.58,x));const D=C(e.createOscillator());D.type="triangle",D.frequency.value=96.6,D.connect(I(.16,x));const V=I(0,H),Z=b("bandpass",1500,.65,V),q=I(0,H),vt=C(e.createOscillator());vt.type="sine",vt.frequency.value=660,vt.connect(q);const ht=I(0,H),Et=b("highpass",850,.5,ht),yt=C(e.createBufferSource());yt.buffer=ct(),yt.loop=!0,yt.loopStart=.12,yt.loopEnd=3,yt.connect(Z),yt.connect(Et);const et=I(.28,X),P=b("lowpass",850,.45,et),W=b("highpass",90,.5,P),k=C(e.createBufferSource());k.buffer=ct(),k.loop=!0,k.loopStart=.12,k.loopEnd=3,k.connect(W);for(const $ of[p,D,vt,yt,k])T.push($),$.start();for(let $=0;$<Yh+ox;$++){const st=$<Yh?"music":"sfx",F=st==="music"?O:L,it=I(0),ft=typeof e.createStereoPanner=="function"?C(e.createStereoPanner()):null;ft?(it.connect(ft),ft.connect(F)):it.connect(F),E.push({kind:st,gain:it,pan:ft,source:null,endsAt:0,priority:-1/0})}for(const $ of[43,45,48,55,57,60,62,64,67,69,72,74,76,79,81,84,86,88,91])j($);tt("kick"),tt("rim"),tt("shaker"),St(),Q("tick",.15,660,660),Q("go",.43,880,1174.66,!0),Q("hit",.22,130,58),n={master:B,music:O,sfx:L,vehicle:H,ambience:X,engineGain:ut,engineFilter:x,engine1:p,engine2:D,driftGain:V,driftFilter:Z,driftTone:vt,driftToneGain:q,boostGain:ht,surfGain:et,surfFilter:P}}function bt(B,_,O,L,H="sfx",X=0,ut=1,x=1){if(!e||r||s||e.state!=="running")return;const p=e.currentTime;_=Math.max(_,p+.004);let D=null;for(const ht of E)if(ht.kind===H){if(!ht.source||ht.endsAt<=p){D=ht;break}ht.priority<=ut&&(!D||ht.priority<D.priority||ht.priority===D.priority&&ht.endsAt<D.endsAt)&&(D=ht)}if(!D)return;const V=D;G(V);const Z=e.createBufferSource(),q=Math.min(L,B.duration/x);Z.buffer=B,Z.playbackRate.value=x,Z.connect(V.gain),V.source=Z,V.endsAt=_+q+.025,V.priority=ut,V.pan&&V.pan.pan.setValueAtTime(Ta(X,-1,1),p);const vt=V.gain.gain;vt.setValueAtTime(0,_),vt.linearRampToValueAtTime(O,_+Math.min(.006,q*.1)),vt.setValueAtTime(O,_+Math.max(.006,q*.5)),vt.exponentialRampToValueAtTime(1e-4,_+q),Z.onended=()=>{Z.disconnect(),V.source===Z&&(V.source=null,V.endsAt=0,V.priority=-1/0)},Z.start(_),Z.stop(_+q+.02)}function Lt(B,_,O,L=.7,H="music",X=0,ut=0){bt(j(B),_,O,L,H,X,ut)}function Vt(B,_){const O=B%8,L=$h[Math.floor(B/8)%$h.length];if(O===0&&Lt(L[0],_,.3,.9,"music",-.05),O===0||O===3||O===6)for(let X=1;X<L.length;X++)Lt(L[X],_+X*.015,O===0?.13:.095,O===0?.66:.42,"music",-.32+X*.12);const H=Jo[B%Jo.length];H&&Lt(H,_+.009,.23,.82,"music",.24),bt(tt("shaker"),_+(O%2?.013:0),O%2?.09:.042,.105,"music",-.38,-1),(O===0||O===4)&&bt(tt("kick"),_,.24,.27,"music",0,-1),(O===2||O===6)&&bt(tt("rim"),_+.008,.14,.115,"music",.35,-1)}function Yt(){n&&(y(n.engineGain.gain,0,.07),y(n.driftGain.gain,0,.05),y(n.driftToneGain.gain,0,.05),y(n.boostGain.gain,0,.05))}function Ot(){if(!e||!n||r||e.state!=="running")return;const B=e.currentTime;if(U()-u>.65&&Yt(),s||t!=null&&t.hidden){h=B+.06;return}y(n.surfGain.gain,.24+Math.sin(B*.39)*.07+Math.sin(B*.173+1.4)*.035,.3),y(n.surfFilter.frequency,800+Math.sin(B*.31)*240,.3),h<B-.1&&(h=B+.035);let _=0;for(;h<B+cx&&_<4;)Vt(c,h),c=(c+1)%Jo.length,h+=lx,_++}function lt(){l==null&&(l=setInterval(Ot,30)),Ot()}function pt(){l!=null&&clearInterval(l),l=null}function At(){pt(),Y();for(const B of T)R(B);for(const B of g)try{B.disconnect()}catch{}E.length=0,T.length=0,g.length=0,v.clear(),n=null}function Dt(){var _;if(r||!i||s)return Promise.resolve(!1);if((e==null?void 0:e.state)==="running"&&n)return a=!0,y(n.master.gain,Zo,.08),lt(),Promise.resolve(!0);if(o)return o;if((_=i.navigator)!=null&&_.userActivation&&!i.navigator.userActivation.isActive)return Promise.resolve(!1);const B=i.AudioContext||i.webkitAudioContext;if(!B)return Promise.resolve(!1);try{(!e||e.state==="closed")&&(e=new B({latencyHint:"interactive"}));const O=e.state==="running"?Promise.resolve():e.resume();return Promise.resolve(O).catch(()=>{}),n||wt(),o=Promise.resolve(O).then(()=>{if(r||!e||!n||e.state!=="running")return!1;a=!0,h=e.currentTime+.045,y(n.master.gain,s?0:Zo,.12),M&&Ct(M,0),lt();const L=A.splice(0);for(const H of L)U()-H.at<.4&&Wt(H.event);return!0}).catch(()=>!1).finally(()=>{o=null,A.length=0}),o}catch{if(At(),e&&e.state!=="closed")try{Promise.resolve(e.close()).catch(()=>{})}catch{}return e=null,Promise.resolve(!1)}}function Ct(B,_=0){if(r||!B||(M=B,u=U(),!e||!n||e.state!=="running"))return;const O=B.state??B,L=O.phase??"menu",H=B.racers??O.racers,X=Array.isArray(H)?H.find(yt=>yt.isPlayer||yt.id==="player"):null,ut=L==="racing"&&!(X!=null&&X.finished),x=Math.abs(Fn(O.speed,Fn(X==null?void 0:X.speed)*3.6)),p=Ta(x/165,0,1.3),D=ut&&!!((X==null?void 0:X.drift)??O.drift??Fn(O.driftCharge)>.02),V=ut&&(O.boost===!0||Fn(O.boost,Fn(X==null?void 0:X.boost))>0),Z=Ta(Fn(O.driftCharge,Fn(X==null?void 0:X.driftCharge)),0,1),q=Fn((X==null?void 0:X.driftTier)??(X==null?void 0:X.driftLevel))>=2||Z>=.58,vt=e.currentTime,ht=Ta(Fn(_,.08)*2,.045,.15),Et=44+p*110+Math.sin(vt*17)*(ut?1.4:0)+(V?17:0);if(y(n.engine1.frequency,Et,ht),y(n.engine2.frequency,Et*2.014,ht),y(n.engineFilter.frequency,230+p*650+(V?160:0),.12),y(n.engineGain.gain,ut?.13+p*.29:0,.09),y(n.driftGain.gain,D?.24+p*.16:0,.08),y(n.driftFilter.frequency,1100+Z*410,.14),y(n.driftTone.frequency,q?1046.5:783.99,.1),y(n.driftToneGain.gain,D?.023+Z*.012:0,.08),y(n.boostGain.gain,V?.38:0,.08),y(n.music.gain,L==="paused"?.24:ut?.36:.42,.25),L!==d){if((L==="menu"||L==="countdown")&&(S.clear(),m=0,f=-1/0),L==="paused"||L==="menu")for(const yt of E)yt.kind==="sfx"&&G(yt);d=L}}function Wt(B){var ut,x;if(r||!B||s)return;typeof B=="string"&&(B={type:B});const _=B.racerId??((ut=B.racer)==null?void 0:ut.id)??(typeof B.racer=="string"?B.racer:void 0);if(B.isPlayer===!1||((x=B.racer)==null?void 0:x.isPlayer)===!1||_!=null&&_!=="player")return;if(!e||!n||e.state!=="running"||t!=null&&t.hidden){o&&A.length<8&&A.push({event:{...B},at:U()});return}const O=e.currentTime,L=B.type;if(L==="reset"||L==="restart"||L==="menu"){Y(),Yt(),S.clear(),m=0;return}const H=L==="coin"?.045:L==="finish"?3:L==="countdown"?.12:.16;if(O-(S.get(L)??-1/0)<H||!["countdown","go","coin","item","boost","drift","drift-charge","driftCharge","lap","finish","hit"].includes(L))return;S.set(L,O);const X=O+.008;switch(L){case"countdown":{const p=B.value??B.count??B.countdown??B.number,D=p===0||p==="go"||p==="GO";bt(D?Q("go",.43,880,1174.66,!0):Q("tick",.15,660,660),X,D?.4:.32,D?.43:.15,"sfx",0,3);break}case"go":bt(Q("go",.43,880,1174.66,!0),X,.42,.43,"sfx",0,3),Lt(72,X+.03,.34,.48,"sfx",-.12,3),Lt(79,X+.13,.26,.46,"sfx",.12,3);break;case"coin":{m=O-f<.75?(m+1)%5:0,f=O;const p=[72,74,76,79,81][m];Lt(p,X,.43,.36,"sfx",-.08,2),Lt(p===81?84:p+12,X+.065,.21,.3,"sfx",.12,2);break}case"item":[72,76,79,81].forEach((p,D)=>Lt(p,X+D*.065,.32,.42,"sfx",(D-1.5)*.13,2));break;case"boost":bt(St(),X,.66,.65,"sfx",0,2),Lt(67,X,.28,.32,"sfx",-.1,2),Lt(79,X+.08,.22,.38,"sfx",.1,2);break;case"drift":case"drift-charge":case"driftCharge":{const p=Fn(B.tier??B.level??B.stage)>=2||Fn(B.charge??B.driftCharge)>=.58;Lt(p?79:74,X,.25,.28,"sfx",-.16,1),Lt(p?81:76,X+.085,.26,.38,"sfx",.16,1);break}case"lap":[72,76,79].forEach((p,D)=>Lt(p,X+D*.11,.34,.58,"sfx",(D-1)*.14,3));break;case"finish":[72,76,79,81,79,84].forEach((p,D)=>Lt(p,X+D*.14,.32,D===5?1.05:.48,"sfx",(D%3-1)*.16,4)),[60,64,67].forEach((p,D)=>Lt(p,X+.72+D*.018,.25,1.1,"sfx",(D-1)*.2,4)),Yt();break;case"hit":bt(Q("hit",.22,130,58),X,.36,.22,"sfx",0,2),bt(tt("rim"),X,.22,.1,"sfx",0,2);break}}function Xt(B){var _,O;r||(s=!!B,n&&(e==null?void 0:e.state)!=="closed"&&y(n.master.gain,s?0:Zo,.035),s?(Y(),A.length=0):(O=(_=i==null?void 0:i.navigator)==null?void 0:_.userActivation)!=null&&O.isActive&&Dt())}function z(B){B.isTrusted===!1||r||s||B.type==="keydown"&&(B.repeat||["Shift","Control","Alt","Meta","Escape"].includes(B.key))||(!a||(e==null?void 0:e.state)!=="running")&&Dt()}function _t(){if(!(!e||!n||r)&&t!=null&&t.hidden&&(pt(),Y(),Yt(),y(n.master.gain,0,.025),e.state==="running"))try{Promise.resolve(e.suspend()).catch(()=>{})}catch{}}function dt(){if(!r){r=!0;for(const B of["pointerdown","touchend","keydown"])i==null||i.removeEventListener(B,z,!0);if(t==null||t.removeEventListener("visibilitychange",_t),At(),S.clear(),A.length=0,M=null,e&&e.state!=="closed")try{Promise.resolve(e.close()).catch(()=>{})}catch{}e=null}}for(const B of["pointerdown","touchend","keydown"])i==null||i.addEventListener(B,z,{capture:!0,passive:!0});return t==null||t.addEventListener("visibilitychange",_t),{unlock:Dt,update:Ct,event:Wt,setMuted:Xt,dispose:dt}}const tr=document.querySelector("#game-canvas"),yc=document.querySelector("#boot"),Nr=new URLSearchParams(location.search);let Pe;try{Pe=new uv({canvas:tr,antialias:!0,alpha:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0})}catch(i){throw yc.innerHTML="<strong>夏天还在等你</strong><p>需要支持 WebGL 2 的浏览器，请启用硬件加速后重试。</p>",i}Pe.setSize(innerWidth,innerHeight);Pe.setPixelRatio(Math.min(devicePixelRatio,1.5));Pe.outputColorSpace=He;Pe.toneMapping=Yl;Pe.toneMappingExposure=1.12;Pe.shadowMap.enabled=!0;Pe.shadowMap.type=eu;Pe.info.autoReset=!1;const we=new wu;we.background=new Ut(Te.colors.horizon);we.fog=new rc(Te.colors.fog,.00165);const ze=new pn(48,innerWidth/innerHeight,.15,1900),Zu=new de(new Zn(1300,36,20),new Oe({side:Ye,depthWrite:!1,fog:!1,uniforms:{topColor:{value:new Ut(Te.colors.sky)},horizonColor:{value:new Ut(Te.colors.horizon)},sunDirection:{value:new N(-.35,.48,-.6).normalize()}},vertexShader:"varying vec3 vWorld; void main(){vWorld=(modelMatrix*vec4(position,1.0)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`uniform vec3 topColor; uniform vec3 horizonColor; uniform vec3 sunDirection; varying vec3 vWorld;
  void main(){vec3 d=normalize(vWorld); float h=max(d.y,0.0); vec3 col=mix(horizonColor,topColor,pow(h,0.46)); float sun=max(dot(d,sunDirection),0.); col+=vec3(1.,.67,.32)*pow(sun,14.)*.12; col+=vec3(1.8,1.5,.9)*pow(sun,700.); gl_FragColor=vec4(col,1.);}`}));Zu.renderOrder=-100;we.add(Zu);const ux=new yp(Te.colors.ambient,Te.colors.bounce,1.7);we.add(ux);const ye=new Tp(Te.colors.sun,2.9);ye.position.set(-90,145,-80);ye.castShadow=!0;ye.shadow.mapSize.set(2048,2048);ye.shadow.camera.left=-65;ye.shadow.camera.right=65;ye.shadow.camera.top=65;ye.shadow.camera.bottom=-65;ye.shadow.camera.near=5;ye.shadow.camera.far=320;ye.shadow.normalBias=.055;ye.shadow.bias=-15e-5;ye.shadow.radius=3;we.add(ye,ye.target);const Ju=new Gl(Pe),Qu=new Uv,dx=Ju.fromScene(Qu,.025);we.environment=dx.texture;we.environmentIntensity=.32;Qu.dispose();Ju.dispose();const fx=new Zn(1,14,9),px=new wn({color:"#fffdf1",roughness:1,metalness:0,flatShading:!1,fog:!0}),Sc=new Se;for(let i=0;i<20;i++){const t=i*2.39996,e=new Se;e.position.set(Math.sin(t)*(460+i%3*125),85+i%5*18,Math.cos(t)*(460+i%3*125));for(let n=0;n<6;n++){const s=new de(fx,px);s.position.set((n-2.5)*13,Math.sin(n*1.8+i)*5,Math.cos(n*2.2)*8),s.scale.set(17+Math.sin(n+i)*5,10+Math.cos(n*3)*4,14),e.add(s)}Sc.add(e)}we.add(Sc);const Qi=Ov(we),to=ax(we),fi=hx();let qt,Jn="mochi",wi=localStorage.getItem("aloha-muted")==="1",Yi=localStorage.getItem("aloha-quality")||(innerWidth<800?"balanced":"high"),Xn=0,ln=!1,mr=null,Aa=0,jh="menu",Vi,td=60,Ra=0,Ca=0;const Zi=new Map,Pa=new Map,mx=new Ki(.42,1),gx=new wn({color:"#fbaf79",emissive:"#db7741",emissiveIntensity:.25,roughness:.45}),_x=new Zn(2.05,20,14),vx=new ja({color:"#78e3dc",transparent:!0,opacity:.16,roughness:.1,metalness:.12,side:Fe,depthWrite:!1}),Kh=new Map;let Ce;const eo=document.createElement("canvas");eo.width=192;eo.height=96;const vn=eo.getContext("2d");vn.fillStyle="#173d45";vn.beginPath();vn.roundRect(38,8,116,48,15);vn.fill();vn.beginPath();vn.moveTo(83,54);vn.lineTo(109,54);vn.lineTo(96,71);vn.fill();vn.font="900 29px Trebuchet MS";vn.fillStyle="#fff4db";vn.textAlign="center";vn.fillText("YOU",96,42);const ed=new cc(eo);ed.colorSpace=He;const zs=new Uf(new Au({map:ed,transparent:!0,depthTest:!1,depthWrite:!1}));zs.scale.set(2.2,1.1,1);zs.renderOrder=10;we.add(zs);const Ne=new Set,Zt=sx(Qi,{onEvent(i){if(fi.event(i),to.event(i,Zt.racers),i.isPlayer!==!1&&(i.type==="lap"&&Sr(i.lap>=3?"最后一圈 · 让夏天加速！":"新的一圈，继续乘风！"),i.type==="item"&&i.action!=="use"&&Sr("获得道具 · 按 E 使用"),i.type==="boost"&&Sr("冲刺！"),i.type==="hit"&&(Ds=.3),i.type==="finish")){const t=Zt.state.finishTime||Zt.state.elapsed,e=Number(localStorage.getItem("aloha-best")||1/0);t>0&&t<e&&localStorage.setItem("aloha-best",String(t))}}});let Ds=0;function Sr(i){qt!=null&&qt.setToast&&qt.setToast(i)}function bc(i){var e,n;Ce&&(we.remove(Ce),(n=(e=Ce.userData).dispose)==null||n.call(e)),Ce=Ku(i,{});const t=Qi.sample(.006,-1);Ce.position.copy(t.position),Ce.rotation.y=t.yaw,Ce.scale.setScalar(innerWidth<700?1.15:1.52),we.add(Ce)}function no(){var i,t;for(const e of Zi.values())we.remove(e),(t=(i=e.userData).dispose)==null||t.call(i);Zi.clear();for(const e of Zt.racers){const n=Ku(e.characterId||(e.isPlayer?Jn:Pi[Zi.size%Pi.length].id),{isPlayer:e.isPlayer});n.position.copy(e.position),n.rotation.y=e.yaw,Zi.set(e.id,n),we.add(n)}}function nd(i){Jn=i,Zt.reset(i),no(),bc(i),fi.unlock()}function Fr(i){typeof i=="string"&&Pi.some(t=>t.id===i)&&(Jn=i),ln=!1,mn.enabled=!1,document.body.classList.remove("photo-mode"),Ne.clear(),window.__touchInput={},to.event({type:"reset"},[]),qt==null||qt.setToast(""),Zt.reset(Jn),no(),Zt.start(),fi.unlock(),fi.setMuted(wi),qt==null||qt.setPhase("countdown"),Ci=!1,tr.focus({preventScroll:!0})}function id(){ln=!1,mn.enabled=!1,document.body.classList.remove("photo-mode"),Ne.clear(),window.__touchInput={},to.event({type:"reset"},[]),qt==null||qt.setToast(""),Zt.reset(Jn),no(),bc(Jn),qt==null||qt.setPhase("menu"),Ci=!1}function kr(){if(ln){js();return}(Zt.state.phase==="racing"||Zt.state.phase==="countdown")&&(Zt.togglePause(),Ne.clear(),window.__touchInput={},qt==null||qt.setPhase("paused"))}function Ec(){Zt.state.phase==="paused"&&Zt.togglePause(),fi.unlock(),qt==null||qt.setPhase(Zt.state.phase),tr.focus({preventScroll:!0})}function sd(i){wi=typeof i=="boolean"?i:!wi,fi.unlock(),fi.setMuted(wi),qt==null||qt.setMuted(wi),localStorage.setItem("aloha-muted",wi?"1":"0")}function Tc(i){Yi=["high","ultra","balanced","low","medium"].includes(i)?i:"high";const t=Yi==="low",e=Yi==="high"||Yi==="ultra";Pe.setPixelRatio(Math.min(devicePixelRatio,t?.85:e?1.5:1.1)),Pe.shadowMap.enabled=!t,ye.castShadow=!t;const n=e?2048:1024;ye.shadow.mapSize.x!==n&&(ye.shadow.mapSize.set(n,n),ye.shadow.map&&(ye.shadow.map.dispose(),ye.shadow.map=null)),ld.enabled=!t,Li.setPixelRatio(Pe.getPixelRatio()),Li.setSize(innerWidth,innerHeight),localStorage.setItem("aloha-quality",Yi)}function rd(){Xn=(Xn+1)%3,Sr(["追逐视角","远景视角","车手视角"][Xn])}async function ad(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{Sr("浏览器暂不支持全屏，可使用 F11")}}function js(){if(ln){ln=!1,mn.enabled=!1,document.body.classList.remove("photo-mode"),(mr==="racing"||mr==="countdown")&&Zt.togglePause(),qt==null||qt.setPhase(Zt.state.phase),Ci=!1;return}mr=Zt.state.phase,(mr==="racing"||mr==="countdown")&&Zt.togglePause(),ln=!0,document.body.classList.add("photo-mode");const i=Zt.state.phase==="menu"?Ce:Zi.get("player");mn.target.copy((i==null?void 0:i.position)||new N).add(new N(0,1.4,0)),mn.enabled=!0,mn.update()}function od(){const i=document.createElement("a");i.download=`Aloha-Kart-${new Date().toISOString().replaceAll(":","-")}.png`,i.href=tr.toDataURL("image/png"),i.click()}const Li=new Pv(Pe);Li.addPass(new Lv(we,ze));const ld=new $s(new mt(innerWidth,innerHeight),.16,.4,1.35);Li.addPass(ld);const cd={uniforms:{tDiffuse:{value:null},time:{value:0},boost:{value:0},aspect:{value:innerWidth/innerHeight}},vertexShader:"varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`uniform sampler2D tDiffuse; uniform float time,boost,aspect; varying vec2 vUv;
  float hash(float n){return fract(sin(n)*43758.5453);}
  void main(){vec2 p=vUv-.5; vec3 col=texture2D(tDiffuse,vUv).rgb; float edge=dot(p,p); col*=1.-edge*.22;
  float a=atan(p.y,p.x);float id=floor(a*80.);float rays=step(.87,hash(id))*pow(smoothstep(.12,.48,length(p)),3.); float pulse=pow(fract(length(p)*2.-time*2.+hash(id)),12.); col+=vec3(.32,.68,.68)*rays*pulse*boost*.35;
  gl_FragColor=vec4(col,1.);}`},za=new $u(cd);Li.addPass(za);Li.addPass(new Iv);Tc(Yi);const mn=new fv(ze,tr);mn.enabled=!1;mn.enableDamping=!0;mn.minDistance=3;mn.maxDistance=180;mn.maxPolarAngle=Math.PI*.485;mn.target.set(0,2,0);qt=rx({characters:Pi,onStart:Fr,onCharacter:nd,onPause:kr,onResume:Ec,onRestart:()=>Fr(Jn),onMenu:id,onMute:sd,onQuality:Tc,onCamera:rd,onFullscreen:ad,onPhoto:js});var Jh;(Jh=qt.setMuted)==null||Jh.call(qt,wi);fi.setMuted(wi);var Qh;(Qh=qt.setLoading)==null||Qh.call(qt,1);qt.setPhase("menu");const Br=document.createElement("div");Br.className="photo-bar";Br.innerHTML='<span>POSTCARD MODE <small>拖动环绕 · 滚轮缩放</small></span><button id="photo-save">保存明信片 ↓</button><button id="photo-close">返回游戏 <kbd>P</kbd></button>';document.body.appendChild(Br);Br.querySelector("#photo-save").onclick=od;Br.querySelector("#photo-close").onclick=js;bc(Jn);no();const xx=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","KeyW","KeyA","KeyS","KeyD","KeyE","KeyR","KeyC","KeyP","Escape"]);window.addEventListener("keydown",i=>{var t;i.target instanceof HTMLInputElement||i.target instanceof HTMLSelectElement||(xx.has(i.code)&&i.preventDefault(),Ne.add(i.code),!i.repeat&&(i.code==="Escape"&&(ln?js():Zt.state.phase==="paused"?Ec():kr()),i.code==="KeyM"&&sd(),i.code==="KeyC"&&rd(),i.code==="KeyP"&&js(),i.code==="KeyF"&&ad(),i.code==="Enter"&&Zt.state.phase==="menu"&&Fr(((t=qt.getSelectedCharacter)==null?void 0:t.call(qt))||Jn)))});window.addEventListener("keyup",i=>Ne.delete(i.code));window.addEventListener("blur",()=>{Ne.clear(),window.__touchInput={},Nr.has("test")||kr()});document.addEventListener("visibilitychange",()=>{document.hidden&&!Nr.has("test")&&kr()});tr.addEventListener("contextmenu",i=>i.preventDefault());window.addEventListener("resize",()=>{Ce&&Ce.scale.setScalar(innerWidth<700?1.15:1.52),Ci=!1,ze.aspect=innerWidth/innerHeight,ze.updateProjectionMatrix(),Pe.setSize(innerWidth,innerHeight),Li.setSize(innerWidth,innerHeight),cd.uniforms.aspect.value=ze.aspect});function Mx(){var n,s,r,a,o,l;const i=window.__touchInput||{},t=(s=(n=navigator.getGamepads)==null?void 0:n.call(navigator))==null?void 0:s.find(c=>c==null?void 0:c.connected);let e=(Ne.has("KeyD")||Ne.has("ArrowRight")?1:0)-(Ne.has("KeyA")||Ne.has("ArrowLeft")?1:0);return Math.abs((t==null?void 0:t.axes[0])||0)>.12&&(e=t.axes[0]),{throttle:Math.max(Ne.has("KeyW")||Ne.has("ArrowUp")||Nr.has("autoplay")||window.__autoDrive?1:0,i.throttle||0,((r=t==null?void 0:t.buttons[7])==null?void 0:r.value)||0),brake:Math.max(Ne.has("KeyS")||Ne.has("ArrowDown")?1:0,i.brake||0,((a=t==null?void 0:t.buttons[6])==null?void 0:a.value)||0),steer:Math.max(-1,Math.min(1,e+(i.steer||0))),drift:Ne.has("Space")||Ne.has("ShiftLeft")||!!i.drift||!!((o=t==null?void 0:t.buttons[0])!=null&&o.pressed),item:Ne.has("KeyE")||!!i.item||!!((l=t==null?void 0:t.buttons[2])!=null&&l.pressed),reset:Ne.has("KeyR"),assist:Nr.has("autoplay")||!!window.__autoDrive}}const Cs=new N,Ps=new N,Si=new N,bi=new N,La=new N;let Ci=!1,Ls=null;function yx(i,t){if(ln){mn.update();return}const e=Zt.state.phase;if(e==="menu"){Ls=null;const n=Ce.rotation.y;Cs.set(Math.sin(n),0,Math.cos(n)),Ps.set(Math.cos(n),0,-Math.sin(n));const s=innerWidth<700,r=Math.sin(t*.11)*.75;Si.copy(Ce.position).addScaledVector(Cs,s?12.5:12.4).addScaledVector(Ps,8+r),Si.y+=s?7.8:6.6,bi.copy(Ce.position).addScaledVector(Ps,s?-.7:-5.1),bi.y+=s?1.7:1.8,ze.fov=zn.damp(ze.fov,s?57:44,3,i)}else{const n=Zt.racers.find(c=>c.isPlayer)||Zt.racers[0];if(Ls&&Ci){const c=n.position.clone().sub(Ls);ze.position.add(c),La.add(c)}Ls?Ls.copy(n.position):Ls=n.position.clone(),Cs.set(Math.sin(n.yaw),0,Math.cos(n.yaw)),Ps.set(Math.cos(n.yaw),0,-Math.sin(n.yaw));const s=(typeof n.boost=="number"?n.boost:0)>0,r=innerWidth<700,a=Xn===2?1.5:Xn===1?15.5:8.3,o=Xn===2?3.05:Xn===1?8.8:4.7;Si.copy(n.position).addScaledVector(Cs,-a).addScaledVector(Ps,-(n.drift?Number(n.steer||0)*1.2:0)),Si.y+=o,bi.copy(n.position).addScaledVector(Cs,Xn===2?20:11),bi.y+=Xn===2?1.8:1.05;const l=Xn===2?79:r?73:58;ze.fov=zn.damp(ze.fov,l+(s?8:0)+Math.min(n.speed||0,40)*.075,3,i),e==="finished"&&(Si.copy(n.position).addScaledVector(Cs,11).addScaledVector(Ps,9),Si.y+=6,bi.copy(n.position),bi.y+=1.7)}Ci?(ze.position.lerp(Si,1-Math.exp(-i*6)),La.lerp(bi,1-Math.exp(-i*8))):(ze.position.copy(Si),La.copy(bi),Ci=!0),Ds>0&&(ze.position.x+=Math.sin(t*80)*Ds*.14,ze.position.y+=Math.cos(t*69)*Ds*.08,Ds=Math.max(0,Ds-i)),ze.lookAt(La),ze.updateProjectionMatrix()}function Sx(i,t){var a,o,l,c,h,u;const e=Zt.state.phase,n=Zt.racers.find(d=>d.isPlayer);zs.visible=!ln&&["racing","countdown"].includes(e),n&&(zs.position.copy(n.position),zs.position.y+=4.15),Ce.visible=e==="menu",Ce.visible&&((o=(a=Ce.userData).animate)==null||o.call(a,{time:t,speed:0,steer:Math.sin(t*.8)*.12,drift:!1,boost:0,dt:i}));for(const d of Zt.racers){const f=Zi.get(d.id);if(!f)continue;if(f.visible=e!=="menu",f.position.copy(d.position),n&&!d.isPlayer&&!ln&&e!=="finished"&&e!=="menu"){const M=d.position.x-n.position.x,v=d.position.z-n.position.z,g=M*Math.sin(n.yaw)+v*Math.cos(n.yaw),T=M*Math.cos(n.yaw)-v*Math.sin(n.yaw);g<-2.5&&g>-15&&Math.abs(T)<4.2&&(f.visible=!1)}const m=d.yaw;f.rotation.y+=zn.euclideanModulo(m-f.rotation.y+Math.PI,Math.PI*2)-Math.PI,(c=(l=f.userData).animate)==null||c.call(l,{time:t,speed:d.speed||0,steer:d.steer||0,drift:d.drift||!1,boost:d.boost||0,dt:i})}!ln&&e!=="paused"&&((h=Qi.update)==null||h.call(Qi,t,i));for(const d of Zt.racers){let f=Kh.get(d.id);f||(f=new de(_x,vx),Kh.set(d.id,f),we.add(f)),f.visible=e!=="menu"&&d.shield>0,f.position.copy(d.position),f.position.y+=1.5,f.scale.setScalar(1+Math.sin(t*5)*.025)}const s=new Set;for(const d of Zt.projectiles||[]){s.add(d.id);let f=Pa.get(d.id);f||(f=new de(mx,gx),Pa.set(d.id,f),we.add(f)),f.position.copy(d.position),f.position.y+=.7,f.rotation.set(t*8,t*10,0)}for(const[d,f]of Pa)s.has(d)||(we.remove(f),Pa.delete(d));e!=="paused"&&!ln&&to.update(i,t,e==="menu"?[]:Zt.racers),Sc.rotation.y=Math.sin(t*.007)*.025;const r=e==="menu"?Ce.position:((u=Zt.racers.find(d=>d.isPlayer))==null?void 0:u.position)||Ce.position;ye.target.position.copy(r),ye.position.copy(r).add(new N(-75,120,-55))}let Zh=performance.now();function hd(i){var e;requestAnimationFrame(hd);const t=Math.min((i-Zh)/1e3,.05);Zh=i,Aa+=t,ln||Zt.update(t,Mx()),Vi=Zt.getSnapshot(),Vi.phase!==jh&&(qt.setPhase(Vi.phase),jh=Vi.phase),Sx(t,Aa),yx(t,Aa),ln||qt.update(Vi),Ra%3===0&&((e=qt.drawMap)==null||e.call(qt,Qi.mapPoints,Zt.racers)),fi.update(Vi,t),za.uniforms.time.value=Aa,za.uniforms.boost.value=zn.damp(za.uniforms.boost.value,(Vi.boost||0)>0?1:0,5,t),Pe.info.reset(),Li.render(t),Ra++,Ca+=t,Ca>1&&(td=Ra/Ca,Ra=0,Ca=0),window.__ready=!0}requestAnimationFrame(hd);yc.style.opacity="0";setTimeout(()=>yc.hidden=!0,650);window.__game={scene:we,renderer:Pe,camera:ze,track:Qi,simulation:Zt,ui:qt,CHARACTERS:Pi,start:Fr,menu:id,pause:kr,resume:Ec,setQuality:Tc,chooseCharacter:nd,togglePhoto:js,savePhoto:od,step:(i,t)=>{const e=Zt.update(i,t);return i>1&&(Ci=!1),e},get snapshot(){return Zt.getSnapshot()},get stats(){return{fps:td,drawCalls:Pe.info.render.calls,triangles:Pe.info.render.triangles,quality:Yi,phase:Zt.state.phase,meshes:Zi.size}}};Nr.has("autoplay")&&setTimeout(()=>Fr(Jn),1500);
