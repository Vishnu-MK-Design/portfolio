import{c as $a,N as Pt,S as ja,C as je,F as Ea,V as Le,R as Qa,a as _t,w as kn,M as nn,W as li,b as Kt,d as at,L as Jt,H as Tn,U as Ft,D as bt,B as vt,e as an,f as xn,p as Ja,E as er,g as qe,P as _n,A as tr,h as Dn,i as Ct,j as En,k as Jn,l as rn,m as on,n as Sa,o as nr,q as kt,r as Sn,s as ir,t as ar,u as jt,O as rr,v as or,x as sr,y as lr,z as cr,G as fr,I as dr,J as ur,K as pr,Q as hr,T as _r,X as mr,Y as gr,Z as vr,_ as Er,$ as Sr,a0 as Mr,a1 as Tr,a2 as Ln,a3 as zt,a4 as fn,a5 as xr,a6 as tn,a7 as Ar,a8 as Rr,a9 as br,aa as Cr,ab as Ma,ac as Pr,ad as Dr,ae as Lr,af as Ta,ag as Be,ah as Ur,ai as wr,aj as yr,ak as Bt,al as xa,am as mn,an as dt,ao as Aa,ap as Ot,aq as Rt,ar as Mn,as as Ra,at as ba,au as Ca,av as Pa,aw as Ir,ax as Nr,ay as Or,az as Fr,aA as Da,aB as Nt,aC as Br,aD as Hr,aE as Gr,aF as La,aG as Vr,aH as Ua,aI as wa,aJ as Un,aK as wn,aL as yn,aM as In,aN as Ke,aO as ci,aP as fi,aQ as di,aR as ui,aS as pi,aT as hi,aU as _i,aV as mi,aW as gi,aX as vi,aY as Ei,aZ as Si,a_ as Mi,a$ as Ti,b0 as xi,b1 as Ai,b2 as Ri,b3 as bi,b4 as Ci,b5 as Pi,b6 as Di,b7 as Li,b8 as Ui,b9 as wi,ba as yi,bb as Ii,bc as Ni,bd as Oi,be as zn,bf as Wn,bg as Xn,bh as Yn,bi as Kn,bj as qn,bk as Zn,bl as kr,bm as Fi,bn as zr,bo as gn,bp as Wr,bq as Bi,br as Hi,bs as Gi,bt as $n,bu as jn,bv as Xr,bw as ya,bx as Yr,by as An,bz as Kr,bA as qr,bB as Ia,bC as Rn,bD as Vi,bE as Na,bF as ki,bG as Oa,bH as sn,bI as qt,bJ as Zr,bK as $r,bL as jr,bM as Qr,bN as Jr,bO as zi,bP as ht,bQ as eo,bR as to,bS as no,bT as io,bU as ao,bV as ro,bW as oo,bX as so,bY as lo,bZ as co,b_ as fo,b$ as uo,c0 as po,c1 as ho,c2 as _o,c3 as mo,c4 as go,c5 as vo,c6 as Eo,c7 as Yt,c8 as Wt,c9 as Wi,ca as Xi,cb as So,cc as Mo,cd as To,ce as Yi,cf as xo,cg as Ao,ch as Ro,ci as bo}from"./three-core-BtgmOd79.js";function Fa(){let e=null,n=!1,t=null,i=null;function s(r,d){t(r,d),i=e.requestAnimationFrame(s)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(s),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function Co(e){const n=new WeakMap;function t(c,x){const m=c.array,U=c.usage,E=m.byteLength,M=e.createBuffer();e.bindBuffer(x,M),e.bufferData(x,m,U),c.onUploadCallback();let S;if(m instanceof Float32Array)S=e.FLOAT;else if(typeof Float16Array<"u"&&m instanceof Float16Array)S=e.HALF_FLOAT;else if(m instanceof Uint16Array)c.isFloat16BufferAttribute?S=e.HALF_FLOAT:S=e.UNSIGNED_SHORT;else if(m instanceof Int16Array)S=e.SHORT;else if(m instanceof Uint32Array)S=e.UNSIGNED_INT;else if(m instanceof Int32Array)S=e.INT;else if(m instanceof Int8Array)S=e.BYTE;else if(m instanceof Uint8Array)S=e.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)S=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:M,type:S,bytesPerElement:m.BYTES_PER_ELEMENT,version:c.version,size:E}}function i(c,x,m){const U=x.array,E=x.updateRanges;if(e.bindBuffer(m,c),E.length===0)e.bufferSubData(m,0,U);else{E.sort((S,O)=>S.start-O.start);let M=0;for(let S=1;S<E.length;S++){const O=E[M],C=E[S];C.start<=O.start+O.count+1?O.count=Math.max(O.count,C.start+C.count-O.start):(++M,E[M]=C)}E.length=M+1;for(let S=0,O=E.length;S<O;S++){const C=E[S];e.bufferSubData(m,C.start*U.BYTES_PER_ELEMENT,U,C.start,C.count)}x.clearUpdateRanges()}x.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function r(c){c.isInterleavedBufferAttribute&&(c=c.data);const x=n.get(c);x&&(e.deleteBuffer(x.buffer),n.delete(c))}function d(c,x){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const U=n.get(c);(!U||U.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const m=n.get(c);if(m===void 0)n.set(c,t(c,x));else if(m.version<c.version){if(m.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(m.buffer,c,x),m.version=c.version}}return{get:s,remove:r,update:d}}var Po=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Do=`#ifdef USE_ALPHAHASH
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
#endif`,Lo=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uo=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wo=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yo=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Io=`#ifdef USE_AOMAP
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
#endif`,No=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Oo=`#ifdef USE_BATCHING
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
#endif`,Fo=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bo=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ho=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Go=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vo=`#ifdef USE_IRIDESCENCE
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
#endif`,ko=`#ifdef USE_BUMPMAP
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
#endif`,zo=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yo=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ko=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,$o=`#if defined( USE_COLOR_ALPHA )
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
#endif`,jo=`#define PI 3.141592653589793
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
} // validated`,Qo=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Jo=`vec3 transformedNormal = objectNormal;
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
#endif`,es=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ts=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ns=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,is=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,as="gl_FragColor = linearToOutputTexel( gl_FragColor );",rs=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,os=`#ifdef USE_ENVMAP
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
#endif`,ss=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ls=`#ifdef USE_ENVMAP
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
#endif`,cs=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fs=`#ifdef USE_ENVMAP
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
#endif`,ds=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,us=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ps=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hs=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_s=`#ifdef USE_GRADIENTMAP
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
}`,ms=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gs=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vs=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Es=`uniform bool receiveShadow;
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
#endif`,Ss=`#ifdef USE_ENVMAP
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
#endif`,Ms=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ts=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xs=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,As=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rs=`PhysicalMaterial material;
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
#endif`,bs=`struct PhysicalMaterial {
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
}`,Cs=`
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
#endif`,Ps=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ds=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ls=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Us=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ws=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ys=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Is=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ns=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Os=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Fs=`#if defined( USE_POINTS_UV )
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
#endif`,Bs=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hs=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gs=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vs=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ks=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zs=`#ifdef USE_MORPHTARGETS
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
#endif`,Ws=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xs=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ys=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ks=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qs=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zs=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$s=`#ifdef USE_NORMALMAP
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
#endif`,js=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qs=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Js=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,el=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tl=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nl=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,il=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,al=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rl=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ol=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sl=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ll=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cl=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fl=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dl=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ul=`float getShadowMask() {
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
}`,pl=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hl=`#ifdef USE_SKINNING
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
#endif`,_l=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ml=`#ifdef USE_SKINNING
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
#endif`,gl=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vl=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,El=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sl=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ml=`#ifdef USE_TRANSMISSION
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
#endif`,Tl=`#ifdef USE_TRANSMISSION
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
#endif`,xl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Al=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bl=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cl=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pl=`uniform sampler2D t2D;
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
}`,Dl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ll=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ul=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wl=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yl=`#include <common>
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
}`,Il=`#if DEPTH_PACKING == 3200
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
}`,Nl=`#define DISTANCE
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
}`,Ol=`#define DISTANCE
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
}`,Fl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bl=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hl=`uniform float scale;
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
}`,Gl=`uniform vec3 diffuse;
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
}`,Vl=`#include <common>
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
}`,kl=`uniform vec3 diffuse;
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
}`,zl=`#define LAMBERT
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
}`,Wl=`#define LAMBERT
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
}`,Xl=`#define MATCAP
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
}`,Yl=`#define MATCAP
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
}`,Kl=`#define NORMAL
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
}`,ql=`#define NORMAL
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
}`,Zl=`#define PHONG
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
}`,$l=`#define PHONG
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
}`,jl=`#define STANDARD
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
}`,Ql=`#define STANDARD
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
}`,Jl=`#define TOON
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
}`,ec=`#define TOON
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
}`,tc=`uniform float size;
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
}`,nc=`uniform vec3 diffuse;
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
}`,ic=`#include <common>
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
}`,ac=`uniform vec3 color;
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
}`,rc=`uniform float rotation;
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
}`,oc=`uniform vec3 diffuse;
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
}`,Ie={alphahash_fragment:Po,alphahash_pars_fragment:Do,alphamap_fragment:Lo,alphamap_pars_fragment:Uo,alphatest_fragment:wo,alphatest_pars_fragment:yo,aomap_fragment:Io,aomap_pars_fragment:No,batching_pars_vertex:Oo,batching_vertex:Fo,begin_vertex:Bo,beginnormal_vertex:Ho,bsdfs:Go,iridescence_fragment:Vo,bumpmap_pars_fragment:ko,clipping_planes_fragment:zo,clipping_planes_pars_fragment:Wo,clipping_planes_pars_vertex:Xo,clipping_planes_vertex:Yo,color_fragment:Ko,color_pars_fragment:qo,color_pars_vertex:Zo,color_vertex:$o,common:jo,cube_uv_reflection_fragment:Qo,defaultnormal_vertex:Jo,displacementmap_pars_vertex:es,displacementmap_vertex:ts,emissivemap_fragment:ns,emissivemap_pars_fragment:is,colorspace_fragment:as,colorspace_pars_fragment:rs,envmap_fragment:os,envmap_common_pars_fragment:ss,envmap_pars_fragment:ls,envmap_pars_vertex:cs,envmap_physical_pars_fragment:Ss,envmap_vertex:fs,fog_vertex:ds,fog_pars_vertex:us,fog_fragment:ps,fog_pars_fragment:hs,gradientmap_pars_fragment:_s,lightmap_pars_fragment:ms,lights_lambert_fragment:gs,lights_lambert_pars_fragment:vs,lights_pars_begin:Es,lights_toon_fragment:Ms,lights_toon_pars_fragment:Ts,lights_phong_fragment:xs,lights_phong_pars_fragment:As,lights_physical_fragment:Rs,lights_physical_pars_fragment:bs,lights_fragment_begin:Cs,lights_fragment_maps:Ps,lights_fragment_end:Ds,logdepthbuf_fragment:Ls,logdepthbuf_pars_fragment:Us,logdepthbuf_pars_vertex:ws,logdepthbuf_vertex:ys,map_fragment:Is,map_pars_fragment:Ns,map_particle_fragment:Os,map_particle_pars_fragment:Fs,metalnessmap_fragment:Bs,metalnessmap_pars_fragment:Hs,morphinstance_vertex:Gs,morphcolor_vertex:Vs,morphnormal_vertex:ks,morphtarget_pars_vertex:zs,morphtarget_vertex:Ws,normal_fragment_begin:Xs,normal_fragment_maps:Ys,normal_pars_fragment:Ks,normal_pars_vertex:qs,normal_vertex:Zs,normalmap_pars_fragment:$s,clearcoat_normal_fragment_begin:js,clearcoat_normal_fragment_maps:Qs,clearcoat_pars_fragment:Js,iridescence_pars_fragment:el,opaque_fragment:tl,packing:nl,premultiplied_alpha_fragment:il,project_vertex:al,dithering_fragment:rl,dithering_pars_fragment:ol,roughnessmap_fragment:sl,roughnessmap_pars_fragment:ll,shadowmap_pars_fragment:cl,shadowmap_pars_vertex:fl,shadowmap_vertex:dl,shadowmask_pars_fragment:ul,skinbase_vertex:pl,skinning_pars_vertex:hl,skinning_vertex:_l,skinnormal_vertex:ml,specularmap_fragment:gl,specularmap_pars_fragment:vl,tonemapping_fragment:El,tonemapping_pars_fragment:Sl,transmission_fragment:Ml,transmission_pars_fragment:Tl,uv_pars_fragment:xl,uv_pars_vertex:Al,uv_vertex:Rl,worldpos_vertex:bl,background_vert:Cl,background_frag:Pl,backgroundCube_vert:Dl,backgroundCube_frag:Ll,cube_vert:Ul,cube_frag:wl,depth_vert:yl,depth_frag:Il,distanceRGBA_vert:Nl,distanceRGBA_frag:Ol,equirect_vert:Fl,equirect_frag:Bl,linedashed_vert:Hl,linedashed_frag:Gl,meshbasic_vert:Vl,meshbasic_frag:kl,meshlambert_vert:zl,meshlambert_frag:Wl,meshmatcap_vert:Xl,meshmatcap_frag:Yl,meshnormal_vert:Kl,meshnormal_frag:ql,meshphong_vert:Zl,meshphong_frag:$l,meshphysical_vert:jl,meshphysical_frag:Ql,meshtoon_vert:Jl,meshtoon_frag:ec,points_vert:tc,points_frag:nc,shadow_vert:ic,shadow_frag:ac,sprite_vert:rc,sprite_frag:oc},ie={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},xt={basic:{uniforms:ht([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:ht([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new je(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:ht([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:ht([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:ht([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new je(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:ht([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:ht([ie.points,ie.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:ht([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:ht([ie.common,ie.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:ht([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:ht([ie.sprite,ie.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:ht([ie.common,ie.displacementmap,{referencePosition:{value:new Le},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:ht([ie.lights,ie.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};xt.physical={uniforms:ht([xt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const dn={r:0,b:0,g:0},Ut=new Na,sc=new nn;function lc(e,n,t,i,s,r,d){const c=new je(0);let x=r===!0?0:1,m,U,E=null,M=0,S=null;function O(R){let g=R.isScene===!0?R.background:null;return g&&g.isTexture&&(g=(R.backgroundBlurriness>0?t:n).get(g)),g}function C(R){let g=!1;const N=O(R);N===null?a(c,x):N&&N.isColor&&(a(N,1),g=!0);const D=e.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,d):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,d),(e.autoClear||g)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function f(R,g){const N=O(g);N&&(N.isCubeTexture||N.mapping===An)?(U===void 0&&(U=new dt(new Rn(1,1,1),new Bt({name:"BackgroundCubeMaterial",uniforms:Vi(xt.backgroundCube.uniforms),vertexShader:xt.backgroundCube.vertexShader,fragmentShader:xt.backgroundCube.fragmentShader,side:vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(D,I,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(U)),Ut.copy(g.backgroundRotation),Ut.x*=-1,Ut.y*=-1,Ut.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(Ut.y*=-1,Ut.z*=-1),U.material.uniforms.envMap.value=N,U.material.uniforms.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,U.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(sc.makeRotationFromEuler(Ut)),U.material.toneMapped=at.getTransfer(N.colorSpace)!==Ke,(E!==N||M!==N.version||S!==e.toneMapping)&&(U.material.needsUpdate=!0,E=N,M=N.version,S=e.toneMapping),U.layers.enableAll(),R.unshift(U,U.geometry,U.material,0,0,null)):N&&N.isTexture&&(m===void 0&&(m=new dt(new Pa(2,2),new Bt({name:"BackgroundMaterial",uniforms:Vi(xt.background.uniforms),vertexShader:xt.background.vertexShader,fragmentShader:xt.background.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=N,m.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,m.material.toneMapped=at.getTransfer(N.colorSpace)!==Ke,N.matrixAutoUpdate===!0&&N.updateMatrix(),m.material.uniforms.uvTransform.value.copy(N.matrix),(E!==N||M!==N.version||S!==e.toneMapping)&&(m.material.needsUpdate=!0,E=N,M=N.version,S=e.toneMapping),m.layers.enableAll(),R.unshift(m,m.geometry,m.material,0,0,null))}function a(R,g){R.getRGB(dn,Ia(e)),i.buffers.color.setClear(dn.r,dn.g,dn.b,g,d)}function P(){U!==void 0&&(U.geometry.dispose(),U.material.dispose(),U=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return c},setClearColor:function(R,g=1){c.set(R),x=g,a(c,x)},getClearAlpha:function(){return x},setClearAlpha:function(R){x=R,a(c,x)},render:C,addToRenderList:f,dispose:P}}function cc(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=M(null);let r=s,d=!1;function c(u,b,B,X,Y){let Z=!1;const W=E(X,B,b);r!==W&&(r=W,m(r.object)),Z=S(u,X,B,Y),Z&&O(u,X,B,Y),Y!==null&&n.update(Y,e.ELEMENT_ARRAY_BUFFER),(Z||d)&&(d=!1,g(u,b,B,X),Y!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(Y).buffer))}function x(){return e.createVertexArray()}function m(u){return e.bindVertexArray(u)}function U(u){return e.deleteVertexArray(u)}function E(u,b,B){const X=B.wireframe===!0;let Y=i[u.id];Y===void 0&&(Y={},i[u.id]=Y);let Z=Y[b.id];Z===void 0&&(Z={},Y[b.id]=Z);let W=Z[X];return W===void 0&&(W=M(x()),Z[X]=W),W}function M(u){const b=[],B=[],X=[];for(let Y=0;Y<t;Y++)b[Y]=0,B[Y]=0,X[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:B,attributeDivisors:X,object:u,attributes:{},index:null}}function S(u,b,B,X){const Y=r.attributes,Z=b.attributes;let W=0;const ne=B.getAttributes();for(const G in ne)if(ne[G].location>=0){const Te=Y[G];let we=Z[G];if(we===void 0&&(G==="instanceMatrix"&&u.instanceMatrix&&(we=u.instanceMatrix),G==="instanceColor"&&u.instanceColor&&(we=u.instanceColor)),Te===void 0||Te.attribute!==we||we&&Te.data!==we.data)return!0;W++}return r.attributesNum!==W||r.index!==X}function O(u,b,B,X){const Y={},Z=b.attributes;let W=0;const ne=B.getAttributes();for(const G in ne)if(ne[G].location>=0){let Te=Z[G];Te===void 0&&(G==="instanceMatrix"&&u.instanceMatrix&&(Te=u.instanceMatrix),G==="instanceColor"&&u.instanceColor&&(Te=u.instanceColor));const we={};we.attribute=Te,Te&&Te.data&&(we.data=Te.data),Y[G]=we,W++}r.attributes=Y,r.attributesNum=W,r.index=X}function C(){const u=r.newAttributes;for(let b=0,B=u.length;b<B;b++)u[b]=0}function f(u){a(u,0)}function a(u,b){const B=r.newAttributes,X=r.enabledAttributes,Y=r.attributeDivisors;B[u]=1,X[u]===0&&(e.enableVertexAttribArray(u),X[u]=1),Y[u]!==b&&(e.vertexAttribDivisor(u,b),Y[u]=b)}function P(){const u=r.newAttributes,b=r.enabledAttributes;for(let B=0,X=b.length;B<X;B++)b[B]!==u[B]&&(e.disableVertexAttribArray(B),b[B]=0)}function R(u,b,B,X,Y,Z,W){W===!0?e.vertexAttribIPointer(u,b,B,Y,Z):e.vertexAttribPointer(u,b,B,X,Y,Z)}function g(u,b,B,X){C();const Y=X.attributes,Z=B.getAttributes(),W=b.defaultAttributeValues;for(const ne in Z){const G=Z[ne];if(G.location>=0){let ge=Y[ne];if(ge===void 0&&(ne==="instanceMatrix"&&u.instanceMatrix&&(ge=u.instanceMatrix),ne==="instanceColor"&&u.instanceColor&&(ge=u.instanceColor)),ge!==void 0){const Te=ge.normalized,we=ge.itemSize,He=n.get(ge);if(He===void 0)continue;const nt=He.buffer,et=He.type,ze=He.bytesPerElement,V=et===e.INT||et===e.UNSIGNED_INT||ge.gpuType===Da;if(ge.isInterleavedBufferAttribute){const q=ge.data,ce=q.stride,Ce=ge.offset;if(q.isInstancedInterleavedBuffer){for(let Ee=0;Ee<G.locationSize;Ee++)a(G.location+Ee,q.meshPerAttribute);u.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let Ee=0;Ee<G.locationSize;Ee++)f(G.location+Ee);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let Ee=0;Ee<G.locationSize;Ee++)R(G.location+Ee,we/G.locationSize,et,Te,ce*ze,(Ce+we/G.locationSize*Ee)*ze,V)}else{if(ge.isInstancedBufferAttribute){for(let q=0;q<G.locationSize;q++)a(G.location+q,ge.meshPerAttribute);u.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let q=0;q<G.locationSize;q++)f(G.location+q);e.bindBuffer(e.ARRAY_BUFFER,nt);for(let q=0;q<G.locationSize;q++)R(G.location+q,we/G.locationSize,et,Te,we*ze,we/G.locationSize*q*ze,V)}}else if(W!==void 0){const Te=W[ne];if(Te!==void 0)switch(Te.length){case 2:e.vertexAttrib2fv(G.location,Te);break;case 3:e.vertexAttrib3fv(G.location,Te);break;case 4:e.vertexAttrib4fv(G.location,Te);break;default:e.vertexAttrib1fv(G.location,Te)}}}}P()}function N(){z();for(const u in i){const b=i[u];for(const B in b){const X=b[B];for(const Y in X)U(X[Y].object),delete X[Y];delete b[B]}delete i[u]}}function D(u){if(i[u.id]===void 0)return;const b=i[u.id];for(const B in b){const X=b[B];for(const Y in X)U(X[Y].object),delete X[Y];delete b[B]}delete i[u.id]}function I(u){for(const b in i){const B=i[b];if(B[u.id]===void 0)continue;const X=B[u.id];for(const Y in X)U(X[Y].object),delete X[Y];delete B[u.id]}}function z(){h(),d=!0,r!==s&&(r=s,m(r.object))}function h(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:z,resetDefaultState:h,dispose:N,releaseStatesOfGeometry:D,releaseStatesOfProgram:I,initAttributes:C,enableAttribute:f,disableUnusedAttributes:P}}function fc(e,n,t){let i;function s(m){i=m}function r(m,U){e.drawArrays(i,m,U),t.update(U,i,1)}function d(m,U,E){E!==0&&(e.drawArraysInstanced(i,m,U,E),t.update(U,i,E))}function c(m,U,E){if(E===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,m,0,U,0,E);let S=0;for(let O=0;O<E;O++)S+=U[O];t.update(S,i,1)}function x(m,U,E,M){if(E===0)return;const S=n.get("WEBGL_multi_draw");if(S===null)for(let O=0;O<m.length;O++)d(m[O],U[O],M[O]);else{S.multiDrawArraysInstancedWEBGL(i,m,0,U,0,M,0,E);let O=0;for(let C=0;C<E;C++)O+=U[C]*M[C];t.update(O,i,1)}}this.setMode=s,this.render=r,this.renderInstances=d,this.renderMultiDraw=c,this.renderMultiDrawInstances=x}function dc(e,n,t,i){let s;function r(){if(s!==void 0)return s;if(n.has("EXT_texture_filter_anisotropic")===!0){const I=n.get("EXT_texture_filter_anisotropic");s=e.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function d(I){return!(I!==Ct&&i.convert(I)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(I){const z=I===Tn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(I!==Ft&&i.convert(I)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Nt&&!z)}function x(I){if(I==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=t.precision!==void 0?t.precision:"highp";const U=x(m);U!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",U,"instead."),m=U);const E=t.logarithmicDepthBuffer===!0,M=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),S=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),O=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=e.getParameter(e.MAX_TEXTURE_SIZE),f=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),a=e.getParameter(e.MAX_VERTEX_ATTRIBS),P=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),R=e.getParameter(e.MAX_VARYING_VECTORS),g=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),N=O>0,D=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:x,textureFormatReadable:d,textureTypeReadable:c,precision:m,logarithmicDepthBuffer:E,reversedDepthBuffer:M,maxTextures:S,maxVertexTextures:O,maxTextureSize:C,maxCubemapSize:f,maxAttributes:a,maxVertexUniforms:P,maxVaryings:R,maxFragmentUniforms:g,vertexTextures:N,maxSamples:D}}function uc(e){const n=this;let t=null,i=0,s=!1,r=!1;const d=new Ta,c=new Be,x={value:null,needsUpdate:!1};this.uniform=x,this.numPlanes=0,this.numIntersection=0,this.init=function(E,M){const S=E.length!==0||M||i!==0||s;return s=M,i=E.length,S},this.beginShadows=function(){r=!0,U(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(E,M){t=U(E,M,0)},this.setState=function(E,M,S){const O=E.clippingPlanes,C=E.clipIntersection,f=E.clipShadows,a=e.get(E);if(!s||O===null||O.length===0||r&&!f)r?U(null):m();else{const P=r?0:i,R=P*4;let g=a.clippingState||null;x.value=g,g=U(O,M,R,S);for(let N=0;N!==R;++N)g[N]=t[N];a.clippingState=g,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=P}};function m(){x.value!==t&&(x.value=t,x.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function U(E,M,S,O){const C=E!==null?E.length:0;let f=null;if(C!==0){if(f=x.value,O!==!0||f===null){const a=S+C*4,P=M.matrixWorldInverse;c.getNormalMatrix(P),(f===null||f.length<a)&&(f=new Float32Array(a));for(let R=0,g=S;R!==C;++R,g+=4)d.copy(E[R]).applyMatrix4(P,c),d.normal.toArray(f,g),f[g+3]=d.constant}x.value=f,x.needsUpdate=!0}return n.numPlanes=C,n.numIntersection=0,f}}function pc(e){let n=new WeakMap;function t(d,c){return c===$n?d.mapping=sn:c===jn&&(d.mapping=qt),d}function i(d){if(d&&d.isTexture){const c=d.mapping;if(c===$n||c===jn)if(n.has(d)){const x=n.get(d).texture;return t(x,d.mapping)}else{const x=d.image;if(x&&x.height>0){const m=new Xr(x.height);return m.fromEquirectangularTexture(e,d),n.set(d,m),d.addEventListener("dispose",s),t(m.texture,d.mapping)}else return null}}return d}function s(d){const c=d.target;c.removeEventListener("dispose",s);const x=n.get(c);x!==void 0&&(n.delete(c),x.dispose())}function r(){n=new WeakMap}return{get:i,dispose:r}}const Xt=4,Ki=[.125,.215,.35,.446,.526,.582],It=20,Nn=new Zr,qi=new je;let On=null,Fn=0,Bn=0,Hn=!1;const yt=(1+Math.sqrt(5))/2,Gt=1/yt,Zi=[new Le(-yt,Gt,0),new Le(yt,Gt,0),new Le(-Gt,0,yt),new Le(Gt,0,yt),new Le(0,yt,-Gt),new Le(0,yt,Gt),new Le(-1,1,-1),new Le(1,1,-1),new Le(-1,1,1),new Le(1,1,1)],hc=new Le;class $i{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(n,t=0,i=.1,s=100,r={}){const{size:d=256,position:c=hc}=r;On=this._renderer.getRenderTarget(),Fn=this._renderer.getActiveCubeFace(),Bn=this._renderer.getActiveMipmapLevel(),Hn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const x=this._allocateTargets();return x.depthBuffer=!0,this._sceneToCubeUV(n,i,s,x,c),t>0&&this._blur(x,0,0,t),this._applyPMREM(x),this._cleanup(x),x}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ji(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qi(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodPlanes.length;n++)this._lodPlanes[n].dispose()}_cleanup(n){this._renderer.setRenderTarget(On,Fn,Bn),this._renderer.xr.enabled=Hn,n.scissorTest=!1,un(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===sn||n.mapping===qt?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),On=this._renderer.getRenderTarget(),Fn=this._renderer.getActiveCubeFace(),Bn=this._renderer.getActiveMipmapLevel(),Hn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:Tn,format:Ct,colorSpace:xn,depthBuffer:!1},s=ji(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ji(n,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_c(r)),this._blurMaterial=mc(r,n,t)}return s}_compileMaterial(n){const t=new dt(this._lodPlanes[0],n);this._renderer.compile(t,Nn)}_sceneToCubeUV(n,t,i,s,r){const x=new _n(90,1,t,i),m=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],E=this._renderer,M=E.autoClear,S=E.toneMapping;E.getClearColor(qi),E.toneMapping=Pt,E.autoClear=!1,E.state.buffers.depth.getReversed()&&(E.setRenderTarget(s),E.clearDepth(),E.setRenderTarget(null));const C=new $r({name:"PMREM.Background",side:vt,depthWrite:!1,depthTest:!1}),f=new dt(new Rn,C);let a=!1;const P=n.background;P?P.isColor&&(C.color.copy(P),n.background=null,a=!0):(C.color.copy(qi),a=!0);for(let R=0;R<6;R++){const g=R%3;g===0?(x.up.set(0,m[R],0),x.position.set(r.x,r.y,r.z),x.lookAt(r.x+U[R],r.y,r.z)):g===1?(x.up.set(0,0,m[R]),x.position.set(r.x,r.y,r.z),x.lookAt(r.x,r.y+U[R],r.z)):(x.up.set(0,m[R],0),x.position.set(r.x,r.y,r.z),x.lookAt(r.x,r.y,r.z+U[R]));const N=this._cubeSize;un(s,g*N,R>2?N:0,N,N),E.setRenderTarget(s),a&&E.render(f,x),E.render(n,x)}f.geometry.dispose(),f.material.dispose(),E.toneMapping=S,E.autoClear=M,n.background=P}_textureToCubeUV(n,t){const i=this._renderer,s=n.mapping===sn||n.mapping===qt;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ji()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qi());const r=s?this._cubemapMaterial:this._equirectMaterial,d=new dt(this._lodPlanes[0],r),c=r.uniforms;c.envMap.value=n;const x=this._cubeSize;un(t,0,0,3*x,2*x),i.setRenderTarget(t),i.render(d,Nn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const d=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),c=Zi[(s-r-1)%Zi.length];this._blur(n,r-1,r,d,c)}t.autoClear=i}_blur(n,t,i,s,r){const d=this._pingPongRenderTarget;this._halfBlur(n,d,t,i,s,"latitudinal",r),this._halfBlur(d,n,i,i,s,"longitudinal",r)}_halfBlur(n,t,i,s,r,d,c){const x=this._renderer,m=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const U=3,E=new dt(this._lodPlanes[s],m),M=m.uniforms,S=this._sizeLods[i]-1,O=isFinite(r)?Math.PI/(2*S):2*Math.PI/(2*It-1),C=r/O,f=isFinite(r)?1+Math.floor(U*C):It;f>It&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${It}`);const a=[];let P=0;for(let I=0;I<It;++I){const z=I/C,h=Math.exp(-z*z/2);a.push(h),I===0?P+=h:I<f&&(P+=2*h)}for(let I=0;I<a.length;I++)a[I]=a[I]/P;M.envMap.value=n.texture,M.samples.value=f,M.weights.value=a,M.latitudinal.value=d==="latitudinal",c&&(M.poleAxis.value=c);const{_lodMax:R}=this;M.dTheta.value=O,M.mipInt.value=R-i;const g=this._sizeLods[s],N=3*g*(s>R-Xt?s-R+Xt:0),D=4*(this._cubeSize-g);un(t,N,D,3*g,2*g),x.setRenderTarget(t),x.render(E,Nn)}}function _c(e){const n=[],t=[],i=[];let s=e;const r=e-Xt+1+Ki.length;for(let d=0;d<r;d++){const c=Math.pow(2,s);t.push(c);let x=1/c;d>e-Xt?x=Ki[d-e+Xt-1]:d===0&&(x=0),i.push(x);const m=1/(c-2),U=-m,E=1+m,M=[U,U,E,U,E,E,U,U,E,E,U,E],S=6,O=6,C=3,f=2,a=1,P=new Float32Array(C*O*S),R=new Float32Array(f*O*S),g=new Float32Array(a*O*S);for(let D=0;D<S;D++){const I=D%3*2/3-1,z=D>2?0:-1,h=[I,z,0,I+2/3,z,0,I+2/3,z+1,0,I,z,0,I+2/3,z+1,0,I,z+1,0];P.set(h,C*O*D),R.set(M,f*O*D);const u=[D,D,D,D,D,D];g.set(u,a*O*D)}const N=new xa;N.setAttribute("position",new mn(P,C)),N.setAttribute("uv",new mn(R,f)),N.setAttribute("faceIndex",new mn(g,a)),n.push(N),s>Xt&&s--}return{lodPlanes:n,sizeLods:t,sigmas:i}}function ji(e,n,t){const i=new Kt(e,n,t);return i.texture.mapping=An,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function un(e,n,t,i,s){e.viewport.set(n,t,i,s),e.scissor.set(n,t,i,s)}function mc(e,n,t){const i=new Float32Array(It),s=new Le(0,1,0);return new Bt({name:"SphericalGaussianBlur",defines:{n:It,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ei(),fragmentShader:`

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
		`,blending:Ot,depthTest:!1,depthWrite:!1})}function Qi(){return new Bt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ei(),fragmentShader:`

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
		`,blending:Ot,depthTest:!1,depthWrite:!1})}function Ji(){return new Bt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ei(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ot,depthTest:!1,depthWrite:!1})}function ei(){return`

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
	`}function gc(e){let n=new WeakMap,t=null;function i(c){if(c&&c.isTexture){const x=c.mapping,m=x===$n||x===jn,U=x===sn||x===qt;if(m||U){let E=n.get(c);const M=E!==void 0?E.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==M)return t===null&&(t=new $i(e)),E=m?t.fromEquirectangular(c,E):t.fromCubemap(c,E),E.texture.pmremVersion=c.pmremVersion,n.set(c,E),E.texture;if(E!==void 0)return E.texture;{const S=c.image;return m&&S&&S.height>0||U&&S&&s(S)?(t===null&&(t=new $i(e)),E=m?t.fromEquirectangular(c):t.fromCubemap(c),E.texture.pmremVersion=c.pmremVersion,n.set(c,E),c.addEventListener("dispose",r),E.texture):null}}}return c}function s(c){let x=0;const m=6;for(let U=0;U<m;U++)c[U]!==void 0&&x++;return x===m}function r(c){const x=c.target;x.removeEventListener("dispose",r);const m=n.get(x);m!==void 0&&(n.delete(x),m.dispose())}function d(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:d}}function vc(e){const n={};function t(i){if(n[i]!==void 0)return n[i];let s;switch(i){case"WEBGL_depth_texture":s=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=e.getExtension(i)}return n[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&kn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Ec(e,n,t,i){const s={},r=new WeakMap;function d(E){const M=E.target;M.index!==null&&n.remove(M.index);for(const O in M.attributes)n.remove(M.attributes[O]);M.removeEventListener("dispose",d),delete s[M.id];const S=r.get(M);S&&(n.remove(S),r.delete(M)),i.releaseStatesOfGeometry(M),M.isInstancedBufferGeometry===!0&&delete M._maxInstanceCount,t.memory.geometries--}function c(E,M){return s[M.id]===!0||(M.addEventListener("dispose",d),s[M.id]=!0,t.memory.geometries++),M}function x(E){const M=E.attributes;for(const S in M)n.update(M[S],e.ARRAY_BUFFER)}function m(E){const M=[],S=E.index,O=E.attributes.position;let C=0;if(S!==null){const P=S.array;C=S.version;for(let R=0,g=P.length;R<g;R+=3){const N=P[R+0],D=P[R+1],I=P[R+2];M.push(N,D,D,I,I,N)}}else if(O!==void 0){const P=O.array;C=O.version;for(let R=0,g=P.length/3-1;R<g;R+=3){const N=R+0,D=R+1,I=R+2;M.push(N,D,D,I,I,N)}}else return;const f=new(Jr(M)?jr:Qr)(M,1);f.version=C;const a=r.get(E);a&&n.remove(a),r.set(E,f)}function U(E){const M=r.get(E);if(M){const S=E.index;S!==null&&M.version<S.version&&m(E)}else m(E);return r.get(E)}return{get:c,update:x,getWireframeAttribute:U}}function Sc(e,n,t){let i;function s(M){i=M}let r,d;function c(M){r=M.type,d=M.bytesPerElement}function x(M,S){e.drawElements(i,S,r,M*d),t.update(S,i,1)}function m(M,S,O){O!==0&&(e.drawElementsInstanced(i,S,r,M*d,O),t.update(S,i,O))}function U(M,S,O){if(O===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,S,0,r,M,0,O);let f=0;for(let a=0;a<O;a++)f+=S[a];t.update(f,i,1)}function E(M,S,O,C){if(O===0)return;const f=n.get("WEBGL_multi_draw");if(f===null)for(let a=0;a<M.length;a++)m(M[a]/d,S[a],C[a]);else{f.multiDrawElementsInstancedWEBGL(i,S,0,r,M,0,C,0,O);let a=0;for(let P=0;P<O;P++)a+=S[P]*C[P];t.update(a,i,1)}}this.setMode=s,this.setIndex=c,this.render=x,this.renderInstances=m,this.renderMultiDraw=U,this.renderMultiDrawInstances=E}function Mc(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,d,c){switch(t.calls++,d){case e.TRIANGLES:t.triangles+=c*(r/3);break;case e.LINES:t.lines+=c*(r/2);break;case e.LINE_STRIP:t.lines+=c*(r-1);break;case e.LINE_LOOP:t.lines+=c*r;break;case e.POINTS:t.points+=c*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Tc(e,n,t){const i=new WeakMap,s=new _t;function r(d,c,x){const m=d.morphTargetInfluences,U=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,E=U!==void 0?U.length:0;let M=i.get(c);if(M===void 0||M.count!==E){let h=function(){I.dispose(),i.delete(c),c.removeEventListener("dispose",h)};M!==void 0&&M.texture.dispose();const S=c.morphAttributes.position!==void 0,O=c.morphAttributes.normal!==void 0,C=c.morphAttributes.color!==void 0,f=c.morphAttributes.position||[],a=c.morphAttributes.normal||[],P=c.morphAttributes.color||[];let R=0;S===!0&&(R=1),O===!0&&(R=2),C===!0&&(R=3);let g=c.attributes.position.count*R,N=1;g>n.maxTextureSize&&(N=Math.ceil(g/n.maxTextureSize),g=n.maxTextureSize);const D=new Float32Array(g*N*4*E),I=new ya(D,g,N,E);I.type=Nt,I.needsUpdate=!0;const z=R*4;for(let u=0;u<E;u++){const b=f[u],B=a[u],X=P[u],Y=g*N*4*u;for(let Z=0;Z<b.count;Z++){const W=Z*z;S===!0&&(s.fromBufferAttribute(b,Z),D[Y+W+0]=s.x,D[Y+W+1]=s.y,D[Y+W+2]=s.z,D[Y+W+3]=0),O===!0&&(s.fromBufferAttribute(B,Z),D[Y+W+4]=s.x,D[Y+W+5]=s.y,D[Y+W+6]=s.z,D[Y+W+7]=0),C===!0&&(s.fromBufferAttribute(X,Z),D[Y+W+8]=s.x,D[Y+W+9]=s.y,D[Y+W+10]=s.z,D[Y+W+11]=X.itemSize===4?s.w:1)}}M={count:E,texture:I,size:new qe(g,N)},i.set(c,M),c.addEventListener("dispose",h)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)x.getUniforms().setValue(e,"morphTexture",d.morphTexture,t);else{let S=0;for(let C=0;C<m.length;C++)S+=m[C];const O=c.morphTargetsRelative?1:1-S;x.getUniforms().setValue(e,"morphTargetBaseInfluence",O),x.getUniforms().setValue(e,"morphTargetInfluences",m)}x.getUniforms().setValue(e,"morphTargetsTexture",M.texture,t),x.getUniforms().setValue(e,"morphTargetsTextureSize",M.size)}return{update:r}}function xc(e,n,t,i){let s=new WeakMap;function r(x){const m=i.render.frame,U=x.geometry,E=n.get(x,U);if(s.get(E)!==m&&(n.update(E),s.set(E,m)),x.isInstancedMesh&&(x.hasEventListener("dispose",c)===!1&&x.addEventListener("dispose",c),s.get(x)!==m&&(t.update(x.instanceMatrix,e.ARRAY_BUFFER),x.instanceColor!==null&&t.update(x.instanceColor,e.ARRAY_BUFFER),s.set(x,m))),x.isSkinnedMesh){const M=x.skeleton;s.get(M)!==m&&(M.update(),s.set(M,m))}return E}function d(){s=new WeakMap}function c(x){const m=x.target;m.removeEventListener("dispose",c),t.remove(m.instanceMatrix),m.instanceColor!==null&&t.remove(m.instanceColor)}return{update:r,dispose:d}}const Ba=new uo,ea=new Sa(1,1),Ha=new ya,Ga=new fo,Va=new co,ta=[],na=[],ia=new Float32Array(16),aa=new Float32Array(9),ra=new Float32Array(4);function Zt(e,n,t){const i=e[0];if(i<=0||i>0)return e;const s=n*t;let r=ta[s];if(r===void 0&&(r=new Float32Array(s),ta[s]=r),n!==0){i.toArray(r,0);for(let d=1,c=0;d!==n;++d)c+=t,e[d].toArray(r,c)}return r}function ot(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function st(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function bn(e,n){let t=na[n];t===void 0&&(t=new Int32Array(n),na[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Ac(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Rc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2fv(this.addr,n),st(t,n)}}function bc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(ot(t,n))return;e.uniform3fv(this.addr,n),st(t,n)}}function Cc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4fv(this.addr,n),st(t,n)}}function Pc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;ra.set(i),e.uniformMatrix2fv(this.addr,!1,ra),st(t,i)}}function Dc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;aa.set(i),e.uniformMatrix3fv(this.addr,!1,aa),st(t,i)}}function Lc(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ot(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),st(t,n)}else{if(ot(t,i))return;ia.set(i),e.uniformMatrix4fv(this.addr,!1,ia),st(t,i)}}function Uc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function wc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2iv(this.addr,n),st(t,n)}}function yc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(ot(t,n))return;e.uniform3iv(this.addr,n),st(t,n)}}function Ic(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4iv(this.addr,n),st(t,n)}}function Nc(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function Oc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ot(t,n))return;e.uniform2uiv(this.addr,n),st(t,n)}}function Fc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(ot(t,n))return;e.uniform3uiv(this.addr,n),st(t,n)}}function Bc(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ot(t,n))return;e.uniform4uiv(this.addr,n),st(t,n)}}function Hc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let r;this.type===e.SAMPLER_2D_SHADOW?(ea.compareFunction=Ma,r=ea):r=Ba,t.setTexture2D(n||r,s)}function Gc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(n||Ga,s)}function Vc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(n||Va,s)}function kc(e,n,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(n||Ha,s)}function zc(e){switch(e){case 5126:return Ac;case 35664:return Rc;case 35665:return bc;case 35666:return Cc;case 35674:return Pc;case 35675:return Dc;case 35676:return Lc;case 5124:case 35670:return Uc;case 35667:case 35671:return wc;case 35668:case 35672:return yc;case 35669:case 35673:return Ic;case 5125:return Nc;case 36294:return Oc;case 36295:return Fc;case 36296:return Bc;case 35678:case 36198:case 36298:case 36306:case 35682:return Hc;case 35679:case 36299:case 36307:return Gc;case 35680:case 36300:case 36308:case 36293:return Vc;case 36289:case 36303:case 36311:case 36292:return kc}}function Wc(e,n){e.uniform1fv(this.addr,n)}function Xc(e,n){const t=Zt(n,this.size,2);e.uniform2fv(this.addr,t)}function Yc(e,n){const t=Zt(n,this.size,3);e.uniform3fv(this.addr,t)}function Kc(e,n){const t=Zt(n,this.size,4);e.uniform4fv(this.addr,t)}function qc(e,n){const t=Zt(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Zc(e,n){const t=Zt(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function $c(e,n){const t=Zt(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function jc(e,n){e.uniform1iv(this.addr,n)}function Qc(e,n){e.uniform2iv(this.addr,n)}function Jc(e,n){e.uniform3iv(this.addr,n)}function ef(e,n){e.uniform4iv(this.addr,n)}function tf(e,n){e.uniform1uiv(this.addr,n)}function nf(e,n){e.uniform2uiv(this.addr,n)}function af(e,n){e.uniform3uiv(this.addr,n)}function rf(e,n){e.uniform4uiv(this.addr,n)}function of(e,n,t){const i=this.cache,s=n.length,r=bn(t,s);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let d=0;d!==s;++d)t.setTexture2D(n[d]||Ba,r[d])}function sf(e,n,t){const i=this.cache,s=n.length,r=bn(t,s);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let d=0;d!==s;++d)t.setTexture3D(n[d]||Ga,r[d])}function lf(e,n,t){const i=this.cache,s=n.length,r=bn(t,s);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let d=0;d!==s;++d)t.setTextureCube(n[d]||Va,r[d])}function cf(e,n,t){const i=this.cache,s=n.length,r=bn(t,s);ot(i,r)||(e.uniform1iv(this.addr,r),st(i,r));for(let d=0;d!==s;++d)t.setTexture2DArray(n[d]||Ha,r[d])}function ff(e){switch(e){case 5126:return Wc;case 35664:return Xc;case 35665:return Yc;case 35666:return Kc;case 35674:return qc;case 35675:return Zc;case 35676:return $c;case 5124:case 35670:return jc;case 35667:case 35671:return Qc;case 35668:case 35672:return Jc;case 35669:case 35673:return ef;case 5125:return tf;case 36294:return nf;case 36295:return af;case 36296:return rf;case 35678:case 36198:case 36298:case 36306:case 35682:return of;case 35679:case 36299:case 36307:return sf;case 35680:case 36300:case 36308:case 36293:return lf;case 36289:case 36303:case 36311:case 36292:return cf}}class df{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=zc(t.type)}}class uf{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ff(t.type)}}class pf{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const s=this.seq;for(let r=0,d=s.length;r!==d;++r){const c=s[r];c.setValue(n,t[c.id],i)}}}const Gn=/(\w+)(\])?(\[|\.)?/g;function oa(e,n){e.seq.push(n),e.map[n.id]=n}function hf(e,n,t){const i=e.name,s=i.length;for(Gn.lastIndex=0;;){const r=Gn.exec(i),d=Gn.lastIndex;let c=r[1];const x=r[2]==="]",m=r[3];if(x&&(c=c|0),m===void 0||m==="["&&d+2===s){oa(t,m===void 0?new df(c,e,n):new uf(c,e,n));break}else{let E=t.map[c];E===void 0&&(E=new pf(c),oa(t,E)),t=E}}}class vn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=n.getActiveUniform(t,s),d=n.getUniformLocation(t,r.name);hf(r,d,this)}}setValue(n,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(n,i,s)}setOptional(n,t,i){const s=t[i];s!==void 0&&this.setValue(n,i,s)}static upload(n,t,i,s){for(let r=0,d=t.length;r!==d;++r){const c=t[r],x=i[c.id];x.needsUpdate!==!1&&c.setValue(n,x.value,s)}}static seqWithValue(n,t){const i=[];for(let s=0,r=n.length;s!==r;++s){const d=n[s];d.id in t&&i.push(d)}return i}}function sa(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const _f=37297;let mf=0;function gf(e,n){const t=e.split(`
`),i=[],s=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let d=s;d<r;d++){const c=d+1;i.push(`${c===n?">":" "} ${c}: ${t[d]}`)}return i.join(`
`)}const la=new Be;function vf(e){at._getMatrix(la,at.workingColorSpace,e);const n=`mat3( ${la.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(e)){case Oa:return[n,"LinearTransferOETF"];case Ke:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function ca(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const d=/ERROR: 0:(\d+)/.exec(r);if(d){const c=parseInt(d[1]);return t.toUpperCase()+`

`+r+`

`+gf(e.getShaderSource(n),c)}else return r}function Ef(e,n){const t=vf(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Sf(e,n){let t;switch(n){case lo:t="Linear";break;case so:t="Reinhard";break;case oo:t="Cineon";break;case ro:t="ACESFilmic";break;case ao:t="AgX";break;case io:t="Neutral";break;case no:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",n),t="Linear"}return"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const pn=new Le;function Mf(){at.getLuminanceCoefficients(pn);const e=pn.x.toFixed(4),n=pn.y.toFixed(4),t=pn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tf(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(en).join(`
`)}function xf(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Af(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=e.getActiveAttrib(n,s),d=r.name;let c=1;r.type===e.FLOAT_MAT2&&(c=2),r.type===e.FLOAT_MAT3&&(c=3),r.type===e.FLOAT_MAT4&&(c=4),t[d]={type:r.type,location:e.getAttribLocation(n,d),locationSize:c}}return t}function en(e){return e!==""}function fa(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function da(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Rf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qn(e){return e.replace(Rf,Cf)}const bf=new Map;function Cf(e,n){let t=Ie[n];if(t===void 0){const i=bf.get(n);if(i!==void 0)t=Ie[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return Qn(t)}const Pf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ua(e){return e.replace(Pf,Df)}function Df(e,n,t,i){let s="";for(let r=parseInt(n);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pa(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}function Lf(e){let n="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Aa?n="SHADOWMAP_TYPE_PCF":e.shadowMapType===to?n="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Rt&&(n="SHADOWMAP_TYPE_VSM"),n}function Uf(e){let n="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case sn:case qt:n="ENVMAP_TYPE_CUBE";break;case An:n="ENVMAP_TYPE_CUBE_UV";break}return n}function wf(e){let n="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===qt&&(n="ENVMAP_MODE_REFRACTION"),n}function yf(e){let n="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case mo:n="ENVMAP_BLENDING_MULTIPLY";break;case _o:n="ENVMAP_BLENDING_MIX";break;case ho:n="ENVMAP_BLENDING_ADD";break}return n}function If(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Nf(e,n,t,i){const s=e.getContext(),r=t.defines;let d=t.vertexShader,c=t.fragmentShader;const x=Lf(t),m=Uf(t),U=wf(t),E=yf(t),M=If(t),S=Tf(t),O=xf(r),C=s.createProgram();let f,a,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,O].filter(en).join(`
`),f.length>0&&(f+=`
`),a=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,O].filter(en).join(`
`),a.length>0&&(a+=`
`)):(f=[pa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,O,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+U:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+x:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(en).join(`
`),a=[pa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,O,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.envMap?"#define "+U:"",t.envMap?"#define "+E:"",M?"#define CUBEUV_TEXEL_WIDTH "+M.texelWidth:"",M?"#define CUBEUV_TEXEL_HEIGHT "+M.texelHeight:"",M?"#define CUBEUV_MAX_MIP "+M.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+x:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pt?"#define TONE_MAPPING":"",t.toneMapping!==Pt?Ie.tonemapping_pars_fragment:"",t.toneMapping!==Pt?Sf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,Ef("linearToOutputTexel",t.outputColorSpace),Mf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(en).join(`
`)),d=Qn(d),d=fa(d,t),d=da(d,t),c=Qn(c),c=fa(c,t),c=da(c,t),d=ua(d),c=ua(c),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,f=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,a=["#define varying in",t.glslVersion===zi?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+a);const R=P+f+d,g=P+a+c,N=sa(s,s.VERTEX_SHADER,R),D=sa(s,s.FRAGMENT_SHADER,g);s.attachShader(C,N),s.attachShader(C,D),t.index0AttributeName!==void 0?s.bindAttribLocation(C,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(C,0,"position"),s.linkProgram(C);function I(b){if(e.debug.checkShaderErrors){const B=s.getProgramInfoLog(C)||"",X=s.getShaderInfoLog(N)||"",Y=s.getShaderInfoLog(D)||"",Z=B.trim(),W=X.trim(),ne=Y.trim();let G=!0,ge=!0;if(s.getProgramParameter(C,s.LINK_STATUS)===!1)if(G=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,C,N,D);else{const Te=ca(s,N,"vertex"),we=ca(s,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(C,s.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+Z+`
`+Te+`
`+we)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(W===""||ne==="")&&(ge=!1);ge&&(b.diagnostics={runnable:G,programLog:Z,vertexShader:{log:W,prefix:f},fragmentShader:{log:ne,prefix:a}})}s.deleteShader(N),s.deleteShader(D),z=new vn(s,C),h=Af(s,C)}let z;this.getUniforms=function(){return z===void 0&&I(this),z};let h;this.getAttributes=function(){return h===void 0&&I(this),h};let u=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return u===!1&&(u=s.getProgramParameter(C,_f)),u},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(C),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=mf++,this.cacheKey=n,this.usedTimes=1,this.program=C,this.vertexShader=N,this.fragmentShader=D,this}let Of=0;class Ff{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),d=this._getShaderCacheForMaterial(n);return d.has(s)===!1&&(d.add(s),s.usedTimes++),d.has(r)===!1&&(d.add(r),r.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new Bf(n),t.set(n,i)),i}}class Bf{constructor(n){this.id=Of++,this.code=n,this.usedTimes=0}}function Hf(e,n,t,i,s,r,d){const c=new eo,x=new Ff,m=new Set,U=[],E=s.logarithmicDepthBuffer,M=s.vertexTextures;let S=s.precision;const O={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function C(h){return m.add(h),h===0?"uv":`uv${h}`}function f(h,u,b,B,X){const Y=B.fog,Z=X.geometry,W=h.isMeshStandardMaterial?B.environment:null,ne=(h.isMeshStandardMaterial?t:n).get(h.envMap||W),G=ne&&ne.mapping===An?ne.image.height:null,ge=O[h.type];h.precision!==null&&(S=s.getMaxPrecision(h.precision),S!==h.precision&&console.warn("THREE.WebGLProgram.getParameters:",h.precision,"not supported, using",S,"instead."));const Te=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,we=Te!==void 0?Te.length:0;let He=0;Z.morphAttributes.position!==void 0&&(He=1),Z.morphAttributes.normal!==void 0&&(He=2),Z.morphAttributes.color!==void 0&&(He=3);let nt,et,ze,V;if(ge){const Ge=xt[ge];nt=Ge.vertexShader,et=Ge.fragmentShader}else nt=h.vertexShader,et=h.fragmentShader,x.update(h),ze=x.getVertexShaderID(h),V=x.getFragmentShaderID(h);const q=e.getRenderTarget(),ce=e.state.buffers.depth.getReversed(),Ce=X.isInstancedMesh===!0,Ee=X.isBatchedMesh===!0,Oe=!!h.map,ct=!!h.matcap,_=!!ne,Ze=!!h.aoMap,De=!!h.lightMap,Re=!!h.bumpMap,ue=!!h.normalMap,$e=!!h.displacementMap,pe=!!h.emissiveMap,ye=!!h.metalnessMap,lt=!!h.roughnessMap,it=h.anisotropy>0,p=h.clearcoat>0,o=h.dispersion>0,L=h.iridescence>0,H=h.sheen>0,K=h.transmission>0,F=it&&!!h.anisotropyMap,ve=p&&!!h.clearcoatMap,ee=p&&!!h.clearcoatNormalMap,he=p&&!!h.clearcoatRoughnessMap,_e=L&&!!h.iridescenceMap,Q=L&&!!h.iridescenceThicknessMap,oe=H&&!!h.sheenColorMap,Ae=H&&!!h.sheenRoughnessMap,me=!!h.specularMap,ae=!!h.specularColorMap,Ue=!!h.specularIntensityMap,v=K&&!!h.transmissionMap,J=K&&!!h.thicknessMap,te=!!h.gradientMap,le=!!h.alphaMap,$=h.alphaTest>0,k=!!h.alphaHash,de=!!h.extensions;let Pe=Pt;h.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Pe=e.toneMapping);const Xe={shaderID:ge,shaderType:h.type,shaderName:h.name,vertexShader:nt,fragmentShader:et,defines:h.defines,customVertexShaderID:ze,customFragmentShaderID:V,isRawShaderMaterial:h.isRawShaderMaterial===!0,glslVersion:h.glslVersion,precision:S,batching:Ee,batchingColor:Ee&&X._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&X.instanceColor!==null,instancingMorph:Ce&&X.morphTexture!==null,supportsVertexTextures:M,outputColorSpace:q===null?e.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:xn,alphaToCoverage:!!h.alphaToCoverage,map:Oe,matcap:ct,envMap:_,envMapMode:_&&ne.mapping,envMapCubeUVHeight:G,aoMap:Ze,lightMap:De,bumpMap:Re,normalMap:ue,displacementMap:M&&$e,emissiveMap:pe,normalMapObjectSpace:ue&&h.normalMapType===qr,normalMapTangentSpace:ue&&h.normalMapType===Kr,metalnessMap:ye,roughnessMap:lt,anisotropy:it,anisotropyMap:F,clearcoat:p,clearcoatMap:ve,clearcoatNormalMap:ee,clearcoatRoughnessMap:he,dispersion:o,iridescence:L,iridescenceMap:_e,iridescenceThicknessMap:Q,sheen:H,sheenColorMap:oe,sheenRoughnessMap:Ae,specularMap:me,specularColorMap:ae,specularIntensityMap:Ue,transmission:K,transmissionMap:v,thicknessMap:J,gradientMap:te,opaque:h.transparent===!1&&h.blending===gn&&h.alphaToCoverage===!1,alphaMap:le,alphaTest:$,alphaHash:k,combine:h.combine,mapUv:Oe&&C(h.map.channel),aoMapUv:Ze&&C(h.aoMap.channel),lightMapUv:De&&C(h.lightMap.channel),bumpMapUv:Re&&C(h.bumpMap.channel),normalMapUv:ue&&C(h.normalMap.channel),displacementMapUv:$e&&C(h.displacementMap.channel),emissiveMapUv:pe&&C(h.emissiveMap.channel),metalnessMapUv:ye&&C(h.metalnessMap.channel),roughnessMapUv:lt&&C(h.roughnessMap.channel),anisotropyMapUv:F&&C(h.anisotropyMap.channel),clearcoatMapUv:ve&&C(h.clearcoatMap.channel),clearcoatNormalMapUv:ee&&C(h.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&C(h.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&C(h.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&C(h.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&C(h.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&C(h.sheenRoughnessMap.channel),specularMapUv:me&&C(h.specularMap.channel),specularColorMapUv:ae&&C(h.specularColorMap.channel),specularIntensityMapUv:Ue&&C(h.specularIntensityMap.channel),transmissionMapUv:v&&C(h.transmissionMap.channel),thicknessMapUv:J&&C(h.thicknessMap.channel),alphaMapUv:le&&C(h.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(ue||it),vertexColors:h.vertexColors,vertexAlphas:h.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!Z.attributes.uv&&(Oe||le),fog:!!Y,useFog:h.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:h.flatShading===!0&&h.wireframe===!1,sizeAttenuation:h.sizeAttenuation===!0,logarithmicDepthBuffer:E,reversedDepthBuffer:ce,skinning:X.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:He,numDirLights:u.directional.length,numPointLights:u.point.length,numSpotLights:u.spot.length,numSpotLightMaps:u.spotLightMap.length,numRectAreaLights:u.rectArea.length,numHemiLights:u.hemi.length,numDirLightShadows:u.directionalShadowMap.length,numPointLightShadows:u.pointShadowMap.length,numSpotLightShadows:u.spotShadowMap.length,numSpotLightShadowsWithMaps:u.numSpotLightShadowsWithMaps,numLightProbes:u.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:h.dithering,shadowMapEnabled:e.shadowMap.enabled&&b.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:Oe&&h.map.isVideoTexture===!0&&at.getTransfer(h.map.colorSpace)===Ke,decodeVideoTextureEmissive:pe&&h.emissiveMap.isVideoTexture===!0&&at.getTransfer(h.emissiveMap.colorSpace)===Ke,premultipliedAlpha:h.premultipliedAlpha,doubleSided:h.side===bt,flipSided:h.side===vt,useDepthPacking:h.depthPacking>=0,depthPacking:h.depthPacking||0,index0AttributeName:h.index0AttributeName,extensionClipCullDistance:de&&h.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&h.extensions.multiDraw===!0||Ee)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:h.customProgramCacheKey()};return Xe.vertexUv1s=m.has(1),Xe.vertexUv2s=m.has(2),Xe.vertexUv3s=m.has(3),m.clear(),Xe}function a(h){const u=[];if(h.shaderID?u.push(h.shaderID):(u.push(h.customVertexShaderID),u.push(h.customFragmentShaderID)),h.defines!==void 0)for(const b in h.defines)u.push(b),u.push(h.defines[b]);return h.isRawShaderMaterial===!1&&(P(u,h),R(u,h),u.push(e.outputColorSpace)),u.push(h.customProgramCacheKey),u.join()}function P(h,u){h.push(u.precision),h.push(u.outputColorSpace),h.push(u.envMapMode),h.push(u.envMapCubeUVHeight),h.push(u.mapUv),h.push(u.alphaMapUv),h.push(u.lightMapUv),h.push(u.aoMapUv),h.push(u.bumpMapUv),h.push(u.normalMapUv),h.push(u.displacementMapUv),h.push(u.emissiveMapUv),h.push(u.metalnessMapUv),h.push(u.roughnessMapUv),h.push(u.anisotropyMapUv),h.push(u.clearcoatMapUv),h.push(u.clearcoatNormalMapUv),h.push(u.clearcoatRoughnessMapUv),h.push(u.iridescenceMapUv),h.push(u.iridescenceThicknessMapUv),h.push(u.sheenColorMapUv),h.push(u.sheenRoughnessMapUv),h.push(u.specularMapUv),h.push(u.specularColorMapUv),h.push(u.specularIntensityMapUv),h.push(u.transmissionMapUv),h.push(u.thicknessMapUv),h.push(u.combine),h.push(u.fogExp2),h.push(u.sizeAttenuation),h.push(u.morphTargetsCount),h.push(u.morphAttributeCount),h.push(u.numDirLights),h.push(u.numPointLights),h.push(u.numSpotLights),h.push(u.numSpotLightMaps),h.push(u.numHemiLights),h.push(u.numRectAreaLights),h.push(u.numDirLightShadows),h.push(u.numPointLightShadows),h.push(u.numSpotLightShadows),h.push(u.numSpotLightShadowsWithMaps),h.push(u.numLightProbes),h.push(u.shadowMapType),h.push(u.toneMapping),h.push(u.numClippingPlanes),h.push(u.numClipIntersection),h.push(u.depthPacking)}function R(h,u){c.disableAll(),u.supportsVertexTextures&&c.enable(0),u.instancing&&c.enable(1),u.instancingColor&&c.enable(2),u.instancingMorph&&c.enable(3),u.matcap&&c.enable(4),u.envMap&&c.enable(5),u.normalMapObjectSpace&&c.enable(6),u.normalMapTangentSpace&&c.enable(7),u.clearcoat&&c.enable(8),u.iridescence&&c.enable(9),u.alphaTest&&c.enable(10),u.vertexColors&&c.enable(11),u.vertexAlphas&&c.enable(12),u.vertexUv1s&&c.enable(13),u.vertexUv2s&&c.enable(14),u.vertexUv3s&&c.enable(15),u.vertexTangents&&c.enable(16),u.anisotropy&&c.enable(17),u.alphaHash&&c.enable(18),u.batching&&c.enable(19),u.dispersion&&c.enable(20),u.batchingColor&&c.enable(21),u.gradientMap&&c.enable(22),h.push(c.mask),c.disableAll(),u.fog&&c.enable(0),u.useFog&&c.enable(1),u.flatShading&&c.enable(2),u.logarithmicDepthBuffer&&c.enable(3),u.reversedDepthBuffer&&c.enable(4),u.skinning&&c.enable(5),u.morphTargets&&c.enable(6),u.morphNormals&&c.enable(7),u.morphColors&&c.enable(8),u.premultipliedAlpha&&c.enable(9),u.shadowMapEnabled&&c.enable(10),u.doubleSided&&c.enable(11),u.flipSided&&c.enable(12),u.useDepthPacking&&c.enable(13),u.dithering&&c.enable(14),u.transmission&&c.enable(15),u.sheen&&c.enable(16),u.opaque&&c.enable(17),u.pointsUvs&&c.enable(18),u.decodeVideoTexture&&c.enable(19),u.decodeVideoTextureEmissive&&c.enable(20),u.alphaToCoverage&&c.enable(21),h.push(c.mask)}function g(h){const u=O[h.type];let b;if(u){const B=xt[u];b=Yr.clone(B.uniforms)}else b=h.uniforms;return b}function N(h,u){let b;for(let B=0,X=U.length;B<X;B++){const Y=U[B];if(Y.cacheKey===u){b=Y,++b.usedTimes;break}}return b===void 0&&(b=new Nf(e,u,h,r),U.push(b)),b}function D(h){if(--h.usedTimes===0){const u=U.indexOf(h);U[u]=U[U.length-1],U.pop(),h.destroy()}}function I(h){x.remove(h)}function z(){x.dispose()}return{getParameters:f,getProgramCacheKey:a,getUniforms:g,acquireProgram:N,releaseProgram:D,releaseShaderCache:I,programs:U,dispose:z}}function Gf(){let e=new WeakMap;function n(d){return e.has(d)}function t(d){let c=e.get(d);return c===void 0&&(c={},e.set(d,c)),c}function i(d){e.delete(d)}function s(d,c,x){e.get(d)[c]=x}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:s,dispose:r}}function Vf(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function ha(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function _a(){const e=[];let n=0;const t=[],i=[],s=[];function r(){n=0,t.length=0,i.length=0,s.length=0}function d(E,M,S,O,C,f){let a=e[n];return a===void 0?(a={id:E.id,object:E,geometry:M,material:S,groupOrder:O,renderOrder:E.renderOrder,z:C,group:f},e[n]=a):(a.id=E.id,a.object=E,a.geometry=M,a.material=S,a.groupOrder=O,a.renderOrder=E.renderOrder,a.z=C,a.group=f),n++,a}function c(E,M,S,O,C,f){const a=d(E,M,S,O,C,f);S.transmission>0?i.push(a):S.transparent===!0?s.push(a):t.push(a)}function x(E,M,S,O,C,f){const a=d(E,M,S,O,C,f);S.transmission>0?i.unshift(a):S.transparent===!0?s.unshift(a):t.unshift(a)}function m(E,M){t.length>1&&t.sort(E||Vf),i.length>1&&i.sort(M||ha),s.length>1&&s.sort(M||ha)}function U(){for(let E=n,M=e.length;E<M;E++){const S=e[E];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:x,finish:U,sort:m}}function kf(){let e=new WeakMap;function n(i,s){const r=e.get(i);let d;return r===void 0?(d=new _a,e.set(i,[d])):s>=r.length?(d=new _a,r.push(d)):d=r[s],d}function t(){e=new WeakMap}return{get:n,dispose:t}}function zf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new Le,color:new je};break;case"SpotLight":t={position:new Le,direction:new Le,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Le,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Le,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new Le,halfWidth:new Le,halfHeight:new Le};break}return e[n.id]=t,t}}}function Wf(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let Xf=0;function Yf(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function Kf(e){const n=new zf,t=Wf(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)i.probe.push(new Le);const s=new Le,r=new nn,d=new nn;function c(m){let U=0,E=0,M=0;for(let h=0;h<9;h++)i.probe[h].set(0,0,0);let S=0,O=0,C=0,f=0,a=0,P=0,R=0,g=0,N=0,D=0,I=0;m.sort(Yf);for(let h=0,u=m.length;h<u;h++){const b=m[h],B=b.color,X=b.intensity,Y=b.distance,Z=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)U+=B.r*X,E+=B.g*X,M+=B.b*X;else if(b.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(b.sh.coefficients[W],X);I++}else if(b.isDirectionalLight){const W=n.get(b);if(W.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const ne=b.shadow,G=t.get(b);G.shadowIntensity=ne.intensity,G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,i.directionalShadow[S]=G,i.directionalShadowMap[S]=Z,i.directionalShadowMatrix[S]=b.shadow.matrix,P++}i.directional[S]=W,S++}else if(b.isSpotLight){const W=n.get(b);W.position.setFromMatrixPosition(b.matrixWorld),W.color.copy(B).multiplyScalar(X),W.distance=Y,W.coneCos=Math.cos(b.angle),W.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),W.decay=b.decay,i.spot[C]=W;const ne=b.shadow;if(b.map&&(i.spotLightMap[N]=b.map,N++,ne.updateMatrices(b),b.castShadow&&D++),i.spotLightMatrix[C]=ne.matrix,b.castShadow){const G=t.get(b);G.shadowIntensity=ne.intensity,G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,i.spotShadow[C]=G,i.spotShadowMap[C]=Z,g++}C++}else if(b.isRectAreaLight){const W=n.get(b);W.color.copy(B).multiplyScalar(X),W.halfWidth.set(b.width*.5,0,0),W.halfHeight.set(0,b.height*.5,0),i.rectArea[f]=W,f++}else if(b.isPointLight){const W=n.get(b);if(W.color.copy(b.color).multiplyScalar(b.intensity),W.distance=b.distance,W.decay=b.decay,b.castShadow){const ne=b.shadow,G=t.get(b);G.shadowIntensity=ne.intensity,G.shadowBias=ne.bias,G.shadowNormalBias=ne.normalBias,G.shadowRadius=ne.radius,G.shadowMapSize=ne.mapSize,G.shadowCameraNear=ne.camera.near,G.shadowCameraFar=ne.camera.far,i.pointShadow[O]=G,i.pointShadowMap[O]=Z,i.pointShadowMatrix[O]=b.shadow.matrix,R++}i.point[O]=W,O++}else if(b.isHemisphereLight){const W=n.get(b);W.skyColor.copy(b.color).multiplyScalar(X),W.groundColor.copy(b.groundColor).multiplyScalar(X),i.hemi[a]=W,a++}}f>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ie.LTC_FLOAT_1,i.rectAreaLTC2=ie.LTC_FLOAT_2):(i.rectAreaLTC1=ie.LTC_HALF_1,i.rectAreaLTC2=ie.LTC_HALF_2)),i.ambient[0]=U,i.ambient[1]=E,i.ambient[2]=M;const z=i.hash;(z.directionalLength!==S||z.pointLength!==O||z.spotLength!==C||z.rectAreaLength!==f||z.hemiLength!==a||z.numDirectionalShadows!==P||z.numPointShadows!==R||z.numSpotShadows!==g||z.numSpotMaps!==N||z.numLightProbes!==I)&&(i.directional.length=S,i.spot.length=C,i.rectArea.length=f,i.point.length=O,i.hemi.length=a,i.directionalShadow.length=P,i.directionalShadowMap.length=P,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=g,i.spotShadowMap.length=g,i.directionalShadowMatrix.length=P,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=g+N-D,i.spotLightMap.length=N,i.numSpotLightShadowsWithMaps=D,i.numLightProbes=I,z.directionalLength=S,z.pointLength=O,z.spotLength=C,z.rectAreaLength=f,z.hemiLength=a,z.numDirectionalShadows=P,z.numPointShadows=R,z.numSpotShadows=g,z.numSpotMaps=N,z.numLightProbes=I,i.version=Xf++)}function x(m,U){let E=0,M=0,S=0,O=0,C=0;const f=U.matrixWorldInverse;for(let a=0,P=m.length;a<P;a++){const R=m[a];if(R.isDirectionalLight){const g=i.directional[E];g.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),g.direction.sub(s),g.direction.transformDirection(f),E++}else if(R.isSpotLight){const g=i.spot[S];g.position.setFromMatrixPosition(R.matrixWorld),g.position.applyMatrix4(f),g.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),g.direction.sub(s),g.direction.transformDirection(f),S++}else if(R.isRectAreaLight){const g=i.rectArea[O];g.position.setFromMatrixPosition(R.matrixWorld),g.position.applyMatrix4(f),d.identity(),r.copy(R.matrixWorld),r.premultiply(f),d.extractRotation(r),g.halfWidth.set(R.width*.5,0,0),g.halfHeight.set(0,R.height*.5,0),g.halfWidth.applyMatrix4(d),g.halfHeight.applyMatrix4(d),O++}else if(R.isPointLight){const g=i.point[M];g.position.setFromMatrixPosition(R.matrixWorld),g.position.applyMatrix4(f),M++}else if(R.isHemisphereLight){const g=i.hemi[C];g.direction.setFromMatrixPosition(R.matrixWorld),g.direction.transformDirection(f),C++}}}return{setup:c,setupView:x,state:i}}function ma(e){const n=new Kf(e),t=[],i=[];function s(U){m.camera=U,t.length=0,i.length=0}function r(U){t.push(U)}function d(U){i.push(U)}function c(){n.setup(t)}function x(U){n.setupView(t,U)}const m={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:s,state:m,setupLights:c,setupLightsView:x,pushLight:r,pushShadow:d}}function qf(e){let n=new WeakMap;function t(s,r=0){const d=n.get(s);let c;return d===void 0?(c=new ma(e),n.set(s,[c])):r>=d.length?(c=new ma(e),d.push(c)):c=d[r],c}function i(){n=new WeakMap}return{get:t,dispose:i}}const Zf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$f=`uniform sampler2D shadow_pass;
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
}`;function jf(e,n,t){let i=new Ea;const s=new qe,r=new qe,d=new _t,c=new Ur({depthPacking:wr}),x=new yr,m={},U=t.maxTextureSize,E={[an]:vt,[vt]:an,[bt]:bt},M=new Bt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:Zf,fragmentShader:$f}),S=M.clone();S.defines.HORIZONTAL_PASS=1;const O=new xa;O.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new dt(O,M),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Aa;let a=this.type;this.render=function(D,I,z){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||D.length===0)return;const h=e.getRenderTarget(),u=e.getActiveCubeFace(),b=e.getActiveMipmapLevel(),B=e.state;B.setBlending(Ot),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const X=a!==Rt&&this.type===Rt,Y=a===Rt&&this.type!==Rt;for(let Z=0,W=D.length;Z<W;Z++){const ne=D[Z],G=ne.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ge=G.getFrameExtents();if(s.multiply(ge),r.copy(G.mapSize),(s.x>U||s.y>U)&&(s.x>U&&(r.x=Math.floor(U/ge.x),s.x=r.x*ge.x,G.mapSize.x=r.x),s.y>U&&(r.y=Math.floor(U/ge.y),s.y=r.y*ge.y,G.mapSize.y=r.y)),G.map===null||X===!0||Y===!0){const we=this.type!==Rt?{minFilter:tn,magFilter:tn}:{};G.map!==null&&G.map.dispose(),G.map=new Kt(s.x,s.y,we),G.map.texture.name=ne.name+".shadowMap",G.camera.updateProjectionMatrix()}e.setRenderTarget(G.map),e.clear();const Te=G.getViewportCount();for(let we=0;we<Te;we++){const He=G.getViewport(we);d.set(r.x*He.x,r.y*He.y,r.x*He.z,r.y*He.w),B.viewport(d),G.updateMatrices(ne,we),i=G.getFrustum(),g(I,z,G.camera,ne,this.type)}G.isPointLightShadow!==!0&&this.type===Rt&&P(G,z),G.needsUpdate=!1}a=this.type,f.needsUpdate=!1,e.setRenderTarget(h,u,b)};function P(D,I){const z=n.update(C);M.defines.VSM_SAMPLES!==D.blurSamples&&(M.defines.VSM_SAMPLES=D.blurSamples,S.defines.VSM_SAMPLES=D.blurSamples,M.needsUpdate=!0,S.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Kt(s.x,s.y)),M.uniforms.shadow_pass.value=D.map.texture,M.uniforms.resolution.value=D.mapSize,M.uniforms.radius.value=D.radius,e.setRenderTarget(D.mapPass),e.clear(),e.renderBufferDirect(I,null,z,M,C,null),S.uniforms.shadow_pass.value=D.mapPass.texture,S.uniforms.resolution.value=D.mapSize,S.uniforms.radius.value=D.radius,e.setRenderTarget(D.map),e.clear(),e.renderBufferDirect(I,null,z,S,C,null)}function R(D,I,z,h){let u=null;const b=z.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(b!==void 0)u=b;else if(u=z.isPointLight===!0?x:c,e.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const B=u.uuid,X=I.uuid;let Y=m[B];Y===void 0&&(Y={},m[B]=Y);let Z=Y[X];Z===void 0&&(Z=u.clone(),Y[X]=Z,I.addEventListener("dispose",N)),u=Z}if(u.visible=I.visible,u.wireframe=I.wireframe,h===Rt?u.side=I.shadowSide!==null?I.shadowSide:I.side:u.side=I.shadowSide!==null?I.shadowSide:E[I.side],u.alphaMap=I.alphaMap,u.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,u.map=I.map,u.clipShadows=I.clipShadows,u.clippingPlanes=I.clippingPlanes,u.clipIntersection=I.clipIntersection,u.displacementMap=I.displacementMap,u.displacementScale=I.displacementScale,u.displacementBias=I.displacementBias,u.wireframeLinewidth=I.wireframeLinewidth,u.linewidth=I.linewidth,z.isPointLight===!0&&u.isMeshDistanceMaterial===!0){const B=e.properties.get(u);B.light=z}return u}function g(D,I,z,h,u){if(D.visible===!1)return;if(D.layers.test(I.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&u===Rt)&&(!D.frustumCulled||i.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,D.matrixWorld);const X=n.update(D),Y=D.material;if(Array.isArray(Y)){const Z=X.groups;for(let W=0,ne=Z.length;W<ne;W++){const G=Z[W],ge=Y[G.materialIndex];if(ge&&ge.visible){const Te=R(D,ge,h,u);D.onBeforeShadow(e,D,I,z,X,Te,G),e.renderBufferDirect(z,null,X,Te,D,G),D.onAfterShadow(e,D,I,z,X,Te,G)}}}else if(Y.visible){const Z=R(D,Y,h,u);D.onBeforeShadow(e,D,I,z,X,Z,null),e.renderBufferDirect(z,null,X,Z,D,null),D.onAfterShadow(e,D,I,z,X,Z,null)}}const B=D.children;for(let X=0,Y=B.length;X<Y;X++)g(B[X],I,z,h,u)}function N(D){D.target.removeEventListener("dispose",N);for(const z in m){const h=m[z],u=D.target.uuid;u in h&&(h[u].dispose(),delete h[u])}}}const Qf={[Zn]:qn,[Kn]:Wn,[Yn]:zn,[Sn]:Xn,[qn]:Zn,[Wn]:Kn,[zn]:Yn,[Xn]:Sn};function Jf(e,n){function t(){let v=!1;const J=new _t;let te=null;const le=new _t(0,0,0,0);return{setMask:function($){te!==$&&!v&&(e.colorMask($,$,$,$),te=$)},setLocked:function($){v=$},setClear:function($,k,de,Pe,Xe){Xe===!0&&($*=Pe,k*=Pe,de*=Pe),J.set($,k,de,Pe),le.equals(J)===!1&&(e.clearColor($,k,de,Pe),le.copy(J))},reset:function(){v=!1,te=null,le.set(-1,0,0,0)}}}function i(){let v=!1,J=!1,te=null,le=null,$=null;return{setReversed:function(k){if(J!==k){const de=n.get("EXT_clip_control");k?de.clipControlEXT(de.LOWER_LEFT_EXT,de.ZERO_TO_ONE_EXT):de.clipControlEXT(de.LOWER_LEFT_EXT,de.NEGATIVE_ONE_TO_ONE_EXT),J=k;const Pe=$;$=null,this.setClear(Pe)}},getReversed:function(){return J},setTest:function(k){k?q(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(k){te!==k&&!v&&(e.depthMask(k),te=k)},setFunc:function(k){if(J&&(k=Qf[k]),le!==k){switch(k){case Zn:e.depthFunc(e.NEVER);break;case qn:e.depthFunc(e.ALWAYS);break;case Kn:e.depthFunc(e.LESS);break;case Sn:e.depthFunc(e.LEQUAL);break;case Yn:e.depthFunc(e.EQUAL);break;case Xn:e.depthFunc(e.GEQUAL);break;case Wn:e.depthFunc(e.GREATER);break;case zn:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}le=k}},setLocked:function(k){v=k},setClear:function(k){$!==k&&(J&&(k=1-k),e.clearDepth(k),$=k)},reset:function(){v=!1,te=null,le=null,$=null,J=!1}}}function s(){let v=!1,J=null,te=null,le=null,$=null,k=null,de=null,Pe=null,Xe=null;return{setTest:function(Ge){v||(Ge?q(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(Ge){J!==Ge&&!v&&(e.stencilMask(Ge),J=Ge)},setFunc:function(Ge,At,Tt){(te!==Ge||le!==At||$!==Tt)&&(e.stencilFunc(Ge,At,Tt),te=Ge,le=At,$=Tt)},setOp:function(Ge,At,Tt){(k!==Ge||de!==At||Pe!==Tt)&&(e.stencilOp(Ge,At,Tt),k=Ge,de=At,Pe=Tt)},setLocked:function(Ge){v=Ge},setClear:function(Ge){Xe!==Ge&&(e.clearStencil(Ge),Xe=Ge)},reset:function(){v=!1,J=null,te=null,le=null,$=null,k=null,de=null,Pe=null,Xe=null}}}const r=new t,d=new i,c=new s,x=new WeakMap,m=new WeakMap;let U={},E={},M=new WeakMap,S=[],O=null,C=!1,f=null,a=null,P=null,R=null,g=null,N=null,D=null,I=new je(0,0,0),z=0,h=!1,u=null,b=null,B=null,X=null,Y=null;const Z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ne=0;const G=e.getParameter(e.VERSION);G.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(G)[1]),W=ne>=1):G.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),W=ne>=2);let ge=null,Te={};const we=e.getParameter(e.SCISSOR_BOX),He=e.getParameter(e.VIEWPORT),nt=new _t().fromArray(we),et=new _t().fromArray(He);function ze(v,J,te,le){const $=new Uint8Array(4),k=e.createTexture();e.bindTexture(v,k),e.texParameteri(v,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(v,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let de=0;de<te;de++)v===e.TEXTURE_3D||v===e.TEXTURE_2D_ARRAY?e.texImage3D(J,0,e.RGBA,1,1,le,0,e.RGBA,e.UNSIGNED_BYTE,$):e.texImage2D(J+de,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,$);return k}const V={};V[e.TEXTURE_2D]=ze(e.TEXTURE_2D,e.TEXTURE_2D,1),V[e.TEXTURE_CUBE_MAP]=ze(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[e.TEXTURE_2D_ARRAY]=ze(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),V[e.TEXTURE_3D]=ze(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),d.setClear(1),c.setClear(0),q(e.DEPTH_TEST),d.setFunc(Sn),Re(!1),ue(Fi),q(e.CULL_FACE),Ze(Ot);function q(v){U[v]!==!0&&(e.enable(v),U[v]=!0)}function ce(v){U[v]!==!1&&(e.disable(v),U[v]=!1)}function Ce(v,J){return E[v]!==J?(e.bindFramebuffer(v,J),E[v]=J,v===e.DRAW_FRAMEBUFFER&&(E[e.FRAMEBUFFER]=J),v===e.FRAMEBUFFER&&(E[e.DRAW_FRAMEBUFFER]=J),!0):!1}function Ee(v,J){let te=S,le=!1;if(v){te=M.get(J),te===void 0&&(te=[],M.set(J,te));const $=v.textures;if(te.length!==$.length||te[0]!==e.COLOR_ATTACHMENT0){for(let k=0,de=$.length;k<de;k++)te[k]=e.COLOR_ATTACHMENT0+k;te.length=$.length,le=!0}}else te[0]!==e.BACK&&(te[0]=e.BACK,le=!0);le&&e.drawBuffers(te)}function Oe(v){return O!==v?(e.useProgram(v),O=v,!0):!1}const ct={[jt]:e.FUNC_ADD,[ar]:e.FUNC_SUBTRACT,[ir]:e.FUNC_REVERSE_SUBTRACT};ct[go]=e.MIN,ct[vo]=e.MAX;const _={[Er]:e.ZERO,[vr]:e.ONE,[gr]:e.SRC_COLOR,[mr]:e.SRC_ALPHA,[_r]:e.SRC_ALPHA_SATURATE,[hr]:e.DST_COLOR,[pr]:e.DST_ALPHA,[ur]:e.ONE_MINUS_SRC_COLOR,[dr]:e.ONE_MINUS_SRC_ALPHA,[fr]:e.ONE_MINUS_DST_COLOR,[cr]:e.ONE_MINUS_DST_ALPHA,[lr]:e.CONSTANT_COLOR,[sr]:e.ONE_MINUS_CONSTANT_COLOR,[or]:e.CONSTANT_ALPHA,[rr]:e.ONE_MINUS_CONSTANT_ALPHA};function Ze(v,J,te,le,$,k,de,Pe,Xe,Ge){if(v===Ot){C===!0&&(ce(e.BLEND),C=!1);return}if(C===!1&&(q(e.BLEND),C=!0),v!==Wr){if(v!==f||Ge!==h){if((a!==jt||g!==jt)&&(e.blendEquation(e.FUNC_ADD),a=jt,g=jt),Ge)switch(v){case gn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Gi:e.blendFunc(e.ONE,e.ONE);break;case Hi:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Bi:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}else switch(v){case gn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Gi:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Hi:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bi:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}P=null,R=null,N=null,D=null,I.set(0,0,0),z=0,f=v,h=Ge}return}$=$||J,k=k||te,de=de||le,(J!==a||$!==g)&&(e.blendEquationSeparate(ct[J],ct[$]),a=J,g=$),(te!==P||le!==R||k!==N||de!==D)&&(e.blendFuncSeparate(_[te],_[le],_[k],_[de]),P=te,R=le,N=k,D=de),(Pe.equals(I)===!1||Xe!==z)&&(e.blendColor(Pe.r,Pe.g,Pe.b,Xe),I.copy(Pe),z=Xe),f=v,h=!1}function De(v,J){v.side===bt?ce(e.CULL_FACE):q(e.CULL_FACE);let te=v.side===vt;J&&(te=!te),Re(te),v.blending===gn&&v.transparent===!1?Ze(Ot):Ze(v.blending,v.blendEquation,v.blendSrc,v.blendDst,v.blendEquationAlpha,v.blendSrcAlpha,v.blendDstAlpha,v.blendColor,v.blendAlpha,v.premultipliedAlpha),d.setFunc(v.depthFunc),d.setTest(v.depthTest),d.setMask(v.depthWrite),r.setMask(v.colorWrite);const le=v.stencilWrite;c.setTest(le),le&&(c.setMask(v.stencilWriteMask),c.setFunc(v.stencilFunc,v.stencilRef,v.stencilFuncMask),c.setOp(v.stencilFail,v.stencilZFail,v.stencilZPass)),pe(v.polygonOffset,v.polygonOffsetFactor,v.polygonOffsetUnits),v.alphaToCoverage===!0?q(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function Re(v){u!==v&&(v?e.frontFace(e.CW):e.frontFace(e.CCW),u=v)}function ue(v){v!==kr?(q(e.CULL_FACE),v!==b&&(v===Fi?e.cullFace(e.BACK):v===zr?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):ce(e.CULL_FACE),b=v}function $e(v){v!==B&&(W&&e.lineWidth(v),B=v)}function pe(v,J,te){v?(q(e.POLYGON_OFFSET_FILL),(X!==J||Y!==te)&&(e.polygonOffset(J,te),X=J,Y=te)):ce(e.POLYGON_OFFSET_FILL)}function ye(v){v?q(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function lt(v){v===void 0&&(v=e.TEXTURE0+Z-1),ge!==v&&(e.activeTexture(v),ge=v)}function it(v,J,te){te===void 0&&(ge===null?te=e.TEXTURE0+Z-1:te=ge);let le=Te[te];le===void 0&&(le={type:void 0,texture:void 0},Te[te]=le),(le.type!==v||le.texture!==J)&&(ge!==te&&(e.activeTexture(te),ge=te),e.bindTexture(v,J||V[v]),le.type=v,le.texture=J)}function p(){const v=Te[ge];v!==void 0&&v.type!==void 0&&(e.bindTexture(v.type,null),v.type=void 0,v.texture=void 0)}function o(){try{e.compressedTexImage2D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function L(){try{e.compressedTexImage3D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function H(){try{e.texSubImage2D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function K(){try{e.texSubImage3D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function F(){try{e.compressedTexSubImage2D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ve(){try{e.compressedTexSubImage3D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ee(){try{e.texStorage2D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function he(){try{e.texStorage3D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function _e(){try{e.texImage2D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Q(){try{e.texImage3D(...arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function oe(v){nt.equals(v)===!1&&(e.scissor(v.x,v.y,v.z,v.w),nt.copy(v))}function Ae(v){et.equals(v)===!1&&(e.viewport(v.x,v.y,v.z,v.w),et.copy(v))}function me(v,J){let te=m.get(J);te===void 0&&(te=new WeakMap,m.set(J,te));let le=te.get(v);le===void 0&&(le=e.getUniformBlockIndex(J,v.name),te.set(v,le))}function ae(v,J){const le=m.get(J).get(v);x.get(J)!==le&&(e.uniformBlockBinding(J,le,v.__bindingPointIndex),x.set(J,le))}function Ue(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),d.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),U={},ge=null,Te={},E={},M=new WeakMap,S=[],O=null,C=!1,f=null,a=null,P=null,R=null,g=null,N=null,D=null,I=new je(0,0,0),z=0,h=!1,u=null,b=null,B=null,X=null,Y=null,nt.set(0,0,e.canvas.width,e.canvas.height),et.set(0,0,e.canvas.width,e.canvas.height),r.reset(),d.reset(),c.reset()}return{buffers:{color:r,depth:d,stencil:c},enable:q,disable:ce,bindFramebuffer:Ce,drawBuffers:Ee,useProgram:Oe,setBlending:Ze,setMaterial:De,setFlipSided:Re,setCullFace:ue,setLineWidth:$e,setPolygonOffset:pe,setScissorTest:ye,activeTexture:lt,bindTexture:it,unbindTexture:p,compressedTexImage2D:o,compressedTexImage3D:L,texImage2D:_e,texImage3D:Q,updateUBOMapping:me,uniformBlockBinding:ae,texStorage2D:ee,texStorage3D:he,texSubImage2D:H,texSubImage3D:K,compressedTexSubImage2D:F,compressedTexSubImage3D:ve,scissor:oe,viewport:Ae,reset:Ue}}function ed(e,n,t,i,s,r,d){const c=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,x=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new qe,U=new WeakMap;let E;const M=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function O(p,o){return S?new OffscreenCanvas(p,o):po("canvas")}function C(p,o,L){let H=1;const K=it(p);if((K.width>L||K.height>L)&&(H=L/Math.max(K.width,K.height)),H<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){const F=Math.floor(H*K.width),ve=Math.floor(H*K.height);E===void 0&&(E=O(F,ve));const ee=o?O(F,ve):E;return ee.width=F,ee.height=ve,ee.getContext("2d").drawImage(p,0,0,F,ve),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+F+"x"+ve+")."),ee}else return"data"in p&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),p;return p}function f(p){return p.generateMipmaps}function a(p){e.generateMipmap(p)}function P(p){return p.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?e.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function R(p,o,L,H,K=!1){if(p!==null){if(e[p]!==void 0)return e[p];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let F=o;if(o===e.RED&&(L===e.FLOAT&&(F=e.R32F),L===e.HALF_FLOAT&&(F=e.R16F),L===e.UNSIGNED_BYTE&&(F=e.R8)),o===e.RED_INTEGER&&(L===e.UNSIGNED_BYTE&&(F=e.R8UI),L===e.UNSIGNED_SHORT&&(F=e.R16UI),L===e.UNSIGNED_INT&&(F=e.R32UI),L===e.BYTE&&(F=e.R8I),L===e.SHORT&&(F=e.R16I),L===e.INT&&(F=e.R32I)),o===e.RG&&(L===e.FLOAT&&(F=e.RG32F),L===e.HALF_FLOAT&&(F=e.RG16F),L===e.UNSIGNED_BYTE&&(F=e.RG8)),o===e.RG_INTEGER&&(L===e.UNSIGNED_BYTE&&(F=e.RG8UI),L===e.UNSIGNED_SHORT&&(F=e.RG16UI),L===e.UNSIGNED_INT&&(F=e.RG32UI),L===e.BYTE&&(F=e.RG8I),L===e.SHORT&&(F=e.RG16I),L===e.INT&&(F=e.RG32I)),o===e.RGB_INTEGER&&(L===e.UNSIGNED_BYTE&&(F=e.RGB8UI),L===e.UNSIGNED_SHORT&&(F=e.RGB16UI),L===e.UNSIGNED_INT&&(F=e.RGB32UI),L===e.BYTE&&(F=e.RGB8I),L===e.SHORT&&(F=e.RGB16I),L===e.INT&&(F=e.RGB32I)),o===e.RGBA_INTEGER&&(L===e.UNSIGNED_BYTE&&(F=e.RGBA8UI),L===e.UNSIGNED_SHORT&&(F=e.RGBA16UI),L===e.UNSIGNED_INT&&(F=e.RGBA32UI),L===e.BYTE&&(F=e.RGBA8I),L===e.SHORT&&(F=e.RGBA16I),L===e.INT&&(F=e.RGBA32I)),o===e.RGB&&(L===e.UNSIGNED_INT_5_9_9_9_REV&&(F=e.RGB9_E5),L===e.UNSIGNED_INT_10F_11F_11F_REV&&(F=e.R11F_G11F_B10F)),o===e.RGBA){const ve=K?Oa:at.getTransfer(H);L===e.FLOAT&&(F=e.RGBA32F),L===e.HALF_FLOAT&&(F=e.RGBA16F),L===e.UNSIGNED_BYTE&&(F=ve===Ke?e.SRGB8_ALPHA8:e.RGBA8),L===e.UNSIGNED_SHORT_4_4_4_4&&(F=e.RGBA4),L===e.UNSIGNED_SHORT_5_5_5_1&&(F=e.RGB5_A1)}return(F===e.R16F||F===e.R32F||F===e.RG16F||F===e.RG32F||F===e.RGBA16F||F===e.RGBA32F)&&n.get("EXT_color_buffer_float"),F}function g(p,o){let L;return p?o===null||o===on||o===rn?L=e.DEPTH24_STENCIL8:o===Nt?L=e.DEPTH32F_STENCIL8:o===Mn&&(L=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):o===null||o===on||o===rn?L=e.DEPTH_COMPONENT24:o===Nt?L=e.DEPTH_COMPONENT32F:o===Mn&&(L=e.DEPTH_COMPONENT16),L}function N(p,o){return f(p)===!0||p.isFramebufferTexture&&p.minFilter!==tn&&p.minFilter!==zt?Math.log2(Math.max(o.width,o.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?o.mipmaps.length:1}function D(p){const o=p.target;o.removeEventListener("dispose",D),z(o),o.isVideoTexture&&U.delete(o)}function I(p){const o=p.target;o.removeEventListener("dispose",I),u(o)}function z(p){const o=i.get(p);if(o.__webglInit===void 0)return;const L=p.source,H=M.get(L);if(H){const K=H[o.__cacheKey];K.usedTimes--,K.usedTimes===0&&h(p),Object.keys(H).length===0&&M.delete(L)}i.remove(p)}function h(p){const o=i.get(p);e.deleteTexture(o.__webglTexture);const L=p.source,H=M.get(L);delete H[o.__cacheKey],d.memory.textures--}function u(p){const o=i.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),i.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(o.__webglFramebuffer[H]))for(let K=0;K<o.__webglFramebuffer[H].length;K++)e.deleteFramebuffer(o.__webglFramebuffer[H][K]);else e.deleteFramebuffer(o.__webglFramebuffer[H]);o.__webglDepthbuffer&&e.deleteRenderbuffer(o.__webglDepthbuffer[H])}else{if(Array.isArray(o.__webglFramebuffer))for(let H=0;H<o.__webglFramebuffer.length;H++)e.deleteFramebuffer(o.__webglFramebuffer[H]);else e.deleteFramebuffer(o.__webglFramebuffer);if(o.__webglDepthbuffer&&e.deleteRenderbuffer(o.__webglDepthbuffer),o.__webglMultisampledFramebuffer&&e.deleteFramebuffer(o.__webglMultisampledFramebuffer),o.__webglColorRenderbuffer)for(let H=0;H<o.__webglColorRenderbuffer.length;H++)o.__webglColorRenderbuffer[H]&&e.deleteRenderbuffer(o.__webglColorRenderbuffer[H]);o.__webglDepthRenderbuffer&&e.deleteRenderbuffer(o.__webglDepthRenderbuffer)}const L=p.textures;for(let H=0,K=L.length;H<K;H++){const F=i.get(L[H]);F.__webglTexture&&(e.deleteTexture(F.__webglTexture),d.memory.textures--),i.remove(L[H])}i.remove(p)}let b=0;function B(){b=0}function X(){const p=b;return p>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+p+" texture units while this GPU supports only "+s.maxTextures),b+=1,p}function Y(p){const o=[];return o.push(p.wrapS),o.push(p.wrapT),o.push(p.wrapR||0),o.push(p.magFilter),o.push(p.minFilter),o.push(p.anisotropy),o.push(p.internalFormat),o.push(p.format),o.push(p.type),o.push(p.generateMipmaps),o.push(p.premultiplyAlpha),o.push(p.flipY),o.push(p.unpackAlignment),o.push(p.colorSpace),o.join()}function Z(p,o){const L=i.get(p);if(p.isVideoTexture&&ye(p),p.isRenderTargetTexture===!1&&p.isExternalTexture!==!0&&p.version>0&&L.__version!==p.version){const H=p.image;if(H===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V(L,p,o);return}}else p.isExternalTexture&&(L.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,L.__webglTexture,e.TEXTURE0+o)}function W(p,o){const L=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&L.__version!==p.version){V(L,p,o);return}t.bindTexture(e.TEXTURE_2D_ARRAY,L.__webglTexture,e.TEXTURE0+o)}function ne(p,o){const L=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&L.__version!==p.version){V(L,p,o);return}t.bindTexture(e.TEXTURE_3D,L.__webglTexture,e.TEXTURE0+o)}function G(p,o){const L=i.get(p);if(p.version>0&&L.__version!==p.version){q(L,p,o);return}t.bindTexture(e.TEXTURE_CUBE_MAP,L.__webglTexture,e.TEXTURE0+o)}const ge={[Tr]:e.REPEAT,[Mr]:e.CLAMP_TO_EDGE,[Sr]:e.MIRRORED_REPEAT},Te={[tn]:e.NEAREST,[xr]:e.NEAREST_MIPMAP_NEAREST,[fn]:e.NEAREST_MIPMAP_LINEAR,[zt]:e.LINEAR,[Ln]:e.LINEAR_MIPMAP_NEAREST,[Jt]:e.LINEAR_MIPMAP_LINEAR},we={[Lr]:e.NEVER,[Dr]:e.ALWAYS,[Pr]:e.LESS,[Ma]:e.LEQUAL,[Cr]:e.EQUAL,[br]:e.GEQUAL,[Rr]:e.GREATER,[Ar]:e.NOTEQUAL};function He(p,o){if(o.type===Nt&&n.has("OES_texture_float_linear")===!1&&(o.magFilter===zt||o.magFilter===Ln||o.magFilter===fn||o.magFilter===Jt||o.minFilter===zt||o.minFilter===Ln||o.minFilter===fn||o.minFilter===Jt)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(p,e.TEXTURE_WRAP_S,ge[o.wrapS]),e.texParameteri(p,e.TEXTURE_WRAP_T,ge[o.wrapT]),(p===e.TEXTURE_3D||p===e.TEXTURE_2D_ARRAY)&&e.texParameteri(p,e.TEXTURE_WRAP_R,ge[o.wrapR]),e.texParameteri(p,e.TEXTURE_MAG_FILTER,Te[o.magFilter]),e.texParameteri(p,e.TEXTURE_MIN_FILTER,Te[o.minFilter]),o.compareFunction&&(e.texParameteri(p,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(p,e.TEXTURE_COMPARE_FUNC,we[o.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(o.magFilter===tn||o.minFilter!==fn&&o.minFilter!==Jt||o.type===Nt&&n.has("OES_texture_float_linear")===!1)return;if(o.anisotropy>1||i.get(o).__currentAnisotropy){const L=n.get("EXT_texture_filter_anisotropic");e.texParameterf(p,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(o.anisotropy,s.getMaxAnisotropy())),i.get(o).__currentAnisotropy=o.anisotropy}}}function nt(p,o){let L=!1;p.__webglInit===void 0&&(p.__webglInit=!0,o.addEventListener("dispose",D));const H=o.source;let K=M.get(H);K===void 0&&(K={},M.set(H,K));const F=Y(o);if(F!==p.__cacheKey){K[F]===void 0&&(K[F]={texture:e.createTexture(),usedTimes:0},d.memory.textures++,L=!0),K[F].usedTimes++;const ve=K[p.__cacheKey];ve!==void 0&&(K[p.__cacheKey].usedTimes--,ve.usedTimes===0&&h(o)),p.__cacheKey=F,p.__webglTexture=K[F].texture}return L}function et(p,o,L){return Math.floor(Math.floor(p/L)/o)}function ze(p,o,L,H){const F=p.updateRanges;if(F.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,o.width,o.height,L,H,o.data);else{F.sort((Q,oe)=>Q.start-oe.start);let ve=0;for(let Q=1;Q<F.length;Q++){const oe=F[ve],Ae=F[Q],me=oe.start+oe.count,ae=et(Ae.start,o.width,4),Ue=et(oe.start,o.width,4);Ae.start<=me+1&&ae===Ue&&et(Ae.start+Ae.count-1,o.width,4)===ae?oe.count=Math.max(oe.count,Ae.start+Ae.count-oe.start):(++ve,F[ve]=Ae)}F.length=ve+1;const ee=e.getParameter(e.UNPACK_ROW_LENGTH),he=e.getParameter(e.UNPACK_SKIP_PIXELS),_e=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,o.width);for(let Q=0,oe=F.length;Q<oe;Q++){const Ae=F[Q],me=Math.floor(Ae.start/4),ae=Math.ceil(Ae.count/4),Ue=me%o.width,v=Math.floor(me/o.width),J=ae,te=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ue),e.pixelStorei(e.UNPACK_SKIP_ROWS,v),t.texSubImage2D(e.TEXTURE_2D,0,Ue,v,J,te,L,H,o.data)}p.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,ee),e.pixelStorei(e.UNPACK_SKIP_PIXELS,he),e.pixelStorei(e.UNPACK_SKIP_ROWS,_e)}}function V(p,o,L){let H=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(H=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(H=e.TEXTURE_3D);const K=nt(p,o),F=o.source;t.bindTexture(H,p.__webglTexture,e.TEXTURE0+L);const ve=i.get(F);if(F.version!==ve.__version||K===!0){t.activeTexture(e.TEXTURE0+L);const ee=at.getPrimaries(at.workingColorSpace),he=o.colorSpace===kt?null:at.getPrimaries(o.colorSpace),_e=o.colorSpace===kt||ee===he?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let Q=C(o.image,!1,s.maxTextureSize);Q=lt(o,Q);const oe=r.convert(o.format,o.colorSpace),Ae=r.convert(o.type);let me=R(o.internalFormat,oe,Ae,o.colorSpace,o.isVideoTexture);He(H,o);let ae;const Ue=o.mipmaps,v=o.isVideoTexture!==!0,J=ve.__version===void 0||K===!0,te=F.dataReady,le=N(o,Q);if(o.isDepthTexture)me=g(o.format===En,o.type),J&&(v?t.texStorage2D(e.TEXTURE_2D,1,me,Q.width,Q.height):t.texImage2D(e.TEXTURE_2D,0,me,Q.width,Q.height,0,oe,Ae,null));else if(o.isDataTexture)if(Ue.length>0){v&&J&&t.texStorage2D(e.TEXTURE_2D,le,me,Ue[0].width,Ue[0].height);for(let $=0,k=Ue.length;$<k;$++)ae=Ue[$],v?te&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,ae.width,ae.height,oe,Ae,ae.data):t.texImage2D(e.TEXTURE_2D,$,me,ae.width,ae.height,0,oe,Ae,ae.data);o.generateMipmaps=!1}else v?(J&&t.texStorage2D(e.TEXTURE_2D,le,me,Q.width,Q.height),te&&ze(o,Q,oe,Ae)):t.texImage2D(e.TEXTURE_2D,0,me,Q.width,Q.height,0,oe,Ae,Q.data);else if(o.isCompressedTexture)if(o.isCompressedArrayTexture){v&&J&&t.texStorage3D(e.TEXTURE_2D_ARRAY,le,me,Ue[0].width,Ue[0].height,Q.depth);for(let $=0,k=Ue.length;$<k;$++)if(ae=Ue[$],o.format!==Ct)if(oe!==null)if(v){if(te)if(o.layerUpdates.size>0){const de=ki(ae.width,ae.height,o.format,o.type);for(const Pe of o.layerUpdates){const Xe=ae.data.subarray(Pe*de/ae.data.BYTES_PER_ELEMENT,(Pe+1)*de/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,Pe,ae.width,ae.height,1,oe,Xe)}o.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,ae.width,ae.height,Q.depth,oe,ae.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,$,me,ae.width,ae.height,Q.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else v?te&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,ae.width,ae.height,Q.depth,oe,Ae,ae.data):t.texImage3D(e.TEXTURE_2D_ARRAY,$,me,ae.width,ae.height,Q.depth,0,oe,Ae,ae.data)}else{v&&J&&t.texStorage2D(e.TEXTURE_2D,le,me,Ue[0].width,Ue[0].height);for(let $=0,k=Ue.length;$<k;$++)ae=Ue[$],o.format!==Ct?oe!==null?v?te&&t.compressedTexSubImage2D(e.TEXTURE_2D,$,0,0,ae.width,ae.height,oe,ae.data):t.compressedTexImage2D(e.TEXTURE_2D,$,me,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):v?te&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,ae.width,ae.height,oe,Ae,ae.data):t.texImage2D(e.TEXTURE_2D,$,me,ae.width,ae.height,0,oe,Ae,ae.data)}else if(o.isDataArrayTexture)if(v){if(J&&t.texStorage3D(e.TEXTURE_2D_ARRAY,le,me,Q.width,Q.height,Q.depth),te)if(o.layerUpdates.size>0){const $=ki(Q.width,Q.height,o.format,o.type);for(const k of o.layerUpdates){const de=Q.data.subarray(k*$/Q.data.BYTES_PER_ELEMENT,(k+1)*$/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,k,Q.width,Q.height,1,oe,Ae,de)}o.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,oe,Ae,Q.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,me,Q.width,Q.height,Q.depth,0,oe,Ae,Q.data);else if(o.isData3DTexture)v?(J&&t.texStorage3D(e.TEXTURE_3D,le,me,Q.width,Q.height,Q.depth),te&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,oe,Ae,Q.data)):t.texImage3D(e.TEXTURE_3D,0,me,Q.width,Q.height,Q.depth,0,oe,Ae,Q.data);else if(o.isFramebufferTexture){if(J)if(v)t.texStorage2D(e.TEXTURE_2D,le,me,Q.width,Q.height);else{let $=Q.width,k=Q.height;for(let de=0;de<le;de++)t.texImage2D(e.TEXTURE_2D,de,me,$,k,0,oe,Ae,null),$>>=1,k>>=1}}else if(Ue.length>0){if(v&&J){const $=it(Ue[0]);t.texStorage2D(e.TEXTURE_2D,le,me,$.width,$.height)}for(let $=0,k=Ue.length;$<k;$++)ae=Ue[$],v?te&&t.texSubImage2D(e.TEXTURE_2D,$,0,0,oe,Ae,ae):t.texImage2D(e.TEXTURE_2D,$,me,oe,Ae,ae);o.generateMipmaps=!1}else if(v){if(J){const $=it(Q);t.texStorage2D(e.TEXTURE_2D,le,me,$.width,$.height)}te&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,oe,Ae,Q)}else t.texImage2D(e.TEXTURE_2D,0,me,oe,Ae,Q);f(o)&&a(H),ve.__version=F.version,o.onUpdate&&o.onUpdate(o)}p.__version=o.version}function q(p,o,L){if(o.image.length!==6)return;const H=nt(p,o),K=o.source;t.bindTexture(e.TEXTURE_CUBE_MAP,p.__webglTexture,e.TEXTURE0+L);const F=i.get(K);if(K.version!==F.__version||H===!0){t.activeTexture(e.TEXTURE0+L);const ve=at.getPrimaries(at.workingColorSpace),ee=o.colorSpace===kt?null:at.getPrimaries(o.colorSpace),he=o.colorSpace===kt||ve===ee?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const _e=o.isCompressedTexture||o.image[0].isCompressedTexture,Q=o.image[0]&&o.image[0].isDataTexture,oe=[];for(let k=0;k<6;k++)!_e&&!Q?oe[k]=C(o.image[k],!0,s.maxCubemapSize):oe[k]=Q?o.image[k].image:o.image[k],oe[k]=lt(o,oe[k]);const Ae=oe[0],me=r.convert(o.format,o.colorSpace),ae=r.convert(o.type),Ue=R(o.internalFormat,me,ae,o.colorSpace),v=o.isVideoTexture!==!0,J=F.__version===void 0||H===!0,te=K.dataReady;let le=N(o,Ae);He(e.TEXTURE_CUBE_MAP,o);let $;if(_e){v&&J&&t.texStorage2D(e.TEXTURE_CUBE_MAP,le,Ue,Ae.width,Ae.height);for(let k=0;k<6;k++){$=oe[k].mipmaps;for(let de=0;de<$.length;de++){const Pe=$[de];o.format!==Ct?me!==null?v?te&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,de,0,0,Pe.width,Pe.height,me,Pe.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,de,Ue,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):v?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,de,0,0,Pe.width,Pe.height,me,ae,Pe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,de,Ue,Pe.width,Pe.height,0,me,ae,Pe.data)}}}else{if($=o.mipmaps,v&&J){$.length>0&&le++;const k=it(oe[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,le,Ue,k.width,k.height)}for(let k=0;k<6;k++)if(Q){v?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,0,0,oe[k].width,oe[k].height,me,ae,oe[k].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,Ue,oe[k].width,oe[k].height,0,me,ae,oe[k].data);for(let de=0;de<$.length;de++){const Xe=$[de].image[k].image;v?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,de+1,0,0,Xe.width,Xe.height,me,ae,Xe.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,de+1,Ue,Xe.width,Xe.height,0,me,ae,Xe.data)}}else{v?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,0,0,me,ae,oe[k]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,Ue,me,ae,oe[k]);for(let de=0;de<$.length;de++){const Pe=$[de];v?te&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,de+1,0,0,me,ae,Pe.image[k]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+k,de+1,Ue,me,ae,Pe.image[k])}}}f(o)&&a(e.TEXTURE_CUBE_MAP),F.__version=K.version,o.onUpdate&&o.onUpdate(o)}p.__version=o.version}function ce(p,o,L,H,K,F){const ve=r.convert(L.format,L.colorSpace),ee=r.convert(L.type),he=R(L.internalFormat,ve,ee,L.colorSpace),_e=i.get(o),Q=i.get(L);if(Q.__renderTarget=o,!_e.__hasExternalTextures){const oe=Math.max(1,o.width>>F),Ae=Math.max(1,o.height>>F);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?t.texImage3D(K,F,he,oe,Ae,o.depth,0,ve,ee,null):t.texImage2D(K,F,he,oe,Ae,0,ve,ee,null)}t.bindFramebuffer(e.FRAMEBUFFER,p),pe(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,H,K,Q.__webglTexture,0,$e(o)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,H,K,Q.__webglTexture,F),t.bindFramebuffer(e.FRAMEBUFFER,null)}function Ce(p,o,L){if(e.bindRenderbuffer(e.RENDERBUFFER,p),o.depthBuffer){const H=o.depthTexture,K=H&&H.isDepthTexture?H.type:null,F=g(o.stencilBuffer,K),ve=o.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ee=$e(o);pe(o)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ee,F,o.width,o.height):L?e.renderbufferStorageMultisample(e.RENDERBUFFER,ee,F,o.width,o.height):e.renderbufferStorage(e.RENDERBUFFER,F,o.width,o.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,ve,e.RENDERBUFFER,p)}else{const H=o.textures;for(let K=0;K<H.length;K++){const F=H[K],ve=r.convert(F.format,F.colorSpace),ee=r.convert(F.type),he=R(F.internalFormat,ve,ee,F.colorSpace),_e=$e(o);L&&pe(o)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,_e,he,o.width,o.height):pe(o)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,_e,he,o.width,o.height):e.renderbufferStorage(e.RENDERBUFFER,he,o.width,o.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ee(p,o){if(o&&o.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(e.FRAMEBUFFER,p),!(o.depthTexture&&o.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const H=i.get(o.depthTexture);H.__renderTarget=o,(!H.__webglTexture||o.depthTexture.image.width!==o.width||o.depthTexture.image.height!==o.height)&&(o.depthTexture.image.width=o.width,o.depthTexture.image.height=o.height,o.depthTexture.needsUpdate=!0),Z(o.depthTexture,0);const K=H.__webglTexture,F=$e(o);if(o.depthTexture.format===Jn)pe(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0,F):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,K,0);else if(o.depthTexture.format===En)pe(o)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0,F):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Oe(p){const o=i.get(p),L=p.isWebGLCubeRenderTarget===!0;if(o.__boundDepthTexture!==p.depthTexture){const H=p.depthTexture;if(o.__depthDisposeCallback&&o.__depthDisposeCallback(),H){const K=()=>{delete o.__boundDepthTexture,delete o.__depthDisposeCallback,H.removeEventListener("dispose",K)};H.addEventListener("dispose",K),o.__depthDisposeCallback=K}o.__boundDepthTexture=H}if(p.depthTexture&&!o.__autoAllocateDepthBuffer){if(L)throw new Error("target.depthTexture not supported in Cube render targets");const H=p.texture.mipmaps;H&&H.length>0?Ee(o.__webglFramebuffer[0],p):Ee(o.__webglFramebuffer,p)}else if(L){o.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer[H]),o.__webglDepthbuffer[H]===void 0)o.__webglDepthbuffer[H]=e.createRenderbuffer(),Ce(o.__webglDepthbuffer[H],p,!1);else{const K=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,F=o.__webglDepthbuffer[H];e.bindRenderbuffer(e.RENDERBUFFER,F),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,F)}}else{const H=p.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,o.__webglFramebuffer),o.__webglDepthbuffer===void 0)o.__webglDepthbuffer=e.createRenderbuffer(),Ce(o.__webglDepthbuffer,p,!1);else{const K=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,F=o.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,F),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,F)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function ct(p,o,L){const H=i.get(p);o!==void 0&&ce(H.__webglFramebuffer,p,p.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),L!==void 0&&Oe(p)}function _(p){const o=p.texture,L=i.get(p),H=i.get(o);p.addEventListener("dispose",I);const K=p.textures,F=p.isWebGLCubeRenderTarget===!0,ve=K.length>1;if(ve||(H.__webglTexture===void 0&&(H.__webglTexture=e.createTexture()),H.__version=o.version,d.memory.textures++),F){L.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(o.mipmaps&&o.mipmaps.length>0){L.__webglFramebuffer[ee]=[];for(let he=0;he<o.mipmaps.length;he++)L.__webglFramebuffer[ee][he]=e.createFramebuffer()}else L.__webglFramebuffer[ee]=e.createFramebuffer()}else{if(o.mipmaps&&o.mipmaps.length>0){L.__webglFramebuffer=[];for(let ee=0;ee<o.mipmaps.length;ee++)L.__webglFramebuffer[ee]=e.createFramebuffer()}else L.__webglFramebuffer=e.createFramebuffer();if(ve)for(let ee=0,he=K.length;ee<he;ee++){const _e=i.get(K[ee]);_e.__webglTexture===void 0&&(_e.__webglTexture=e.createTexture(),d.memory.textures++)}if(p.samples>0&&pe(p)===!1){L.__webglMultisampledFramebuffer=e.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let ee=0;ee<K.length;ee++){const he=K[ee];L.__webglColorRenderbuffer[ee]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,L.__webglColorRenderbuffer[ee]);const _e=r.convert(he.format,he.colorSpace),Q=r.convert(he.type),oe=R(he.internalFormat,_e,Q,he.colorSpace,p.isXRRenderTarget===!0),Ae=$e(p);e.renderbufferStorageMultisample(e.RENDERBUFFER,Ae,oe,p.width,p.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ee,e.RENDERBUFFER,L.__webglColorRenderbuffer[ee])}e.bindRenderbuffer(e.RENDERBUFFER,null),p.depthBuffer&&(L.__webglDepthRenderbuffer=e.createRenderbuffer(),Ce(L.__webglDepthRenderbuffer,p,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(F){t.bindTexture(e.TEXTURE_CUBE_MAP,H.__webglTexture),He(e.TEXTURE_CUBE_MAP,o);for(let ee=0;ee<6;ee++)if(o.mipmaps&&o.mipmaps.length>0)for(let he=0;he<o.mipmaps.length;he++)ce(L.__webglFramebuffer[ee][he],p,o,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ee,he);else ce(L.__webglFramebuffer[ee],p,o,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);f(o)&&a(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ve){for(let ee=0,he=K.length;ee<he;ee++){const _e=K[ee],Q=i.get(_e);let oe=e.TEXTURE_2D;(p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(oe=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(oe,Q.__webglTexture),He(oe,_e),ce(L.__webglFramebuffer,p,_e,e.COLOR_ATTACHMENT0+ee,oe,0),f(_e)&&a(oe)}t.unbindTexture()}else{let ee=e.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(ee=p.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ee,H.__webglTexture),He(ee,o),o.mipmaps&&o.mipmaps.length>0)for(let he=0;he<o.mipmaps.length;he++)ce(L.__webglFramebuffer[he],p,o,e.COLOR_ATTACHMENT0,ee,he);else ce(L.__webglFramebuffer,p,o,e.COLOR_ATTACHMENT0,ee,0);f(o)&&a(ee),t.unbindTexture()}p.depthBuffer&&Oe(p)}function Ze(p){const o=p.textures;for(let L=0,H=o.length;L<H;L++){const K=o[L];if(f(K)){const F=P(p),ve=i.get(K).__webglTexture;t.bindTexture(F,ve),a(F),t.unbindTexture()}}}const De=[],Re=[];function ue(p){if(p.samples>0){if(pe(p)===!1){const o=p.textures,L=p.width,H=p.height;let K=e.COLOR_BUFFER_BIT;const F=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ve=i.get(p),ee=o.length>1;if(ee)for(let _e=0;_e<o.length;_e++)t.bindFramebuffer(e.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,ve.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const he=p.texture.mipmaps;he&&he.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let _e=0;_e<o.length;_e++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),ee){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ve.__webglColorRenderbuffer[_e]);const Q=i.get(o[_e]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Q,0)}e.blitFramebuffer(0,0,L,H,0,0,L,H,K,e.NEAREST),x===!0&&(De.length=0,Re.length=0,De.push(e.COLOR_ATTACHMENT0+_e),p.depthBuffer&&p.resolveDepthBuffer===!1&&(De.push(F),Re.push(F),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Re)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ee)for(let _e=0;_e<o.length;_e++){t.bindFramebuffer(e.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.RENDERBUFFER,ve.__webglColorRenderbuffer[_e]);const Q=i.get(o[_e]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,ve.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+_e,e.TEXTURE_2D,Q,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.resolveDepthBuffer===!1&&x){const o=p.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[o])}}}function $e(p){return Math.min(s.maxSamples,p.samples)}function pe(p){const o=i.get(p);return p.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&o.__useRenderToTexture!==!1}function ye(p){const o=d.render.frame;U.get(p)!==o&&(U.set(p,o),p.update())}function lt(p,o){const L=p.colorSpace,H=p.format,K=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||L!==xn&&L!==kt&&(at.getTransfer(L)===Ke?(H!==Ct||K!==Ft)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",L)),o}function it(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(m.width=p.naturalWidth||p.width,m.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(m.width=p.displayWidth,m.height=p.displayHeight):(m.width=p.width,m.height=p.height),m}this.allocateTextureUnit=X,this.resetTextureUnits=B,this.setTexture2D=Z,this.setTexture2DArray=W,this.setTexture3D=ne,this.setTextureCube=G,this.rebindTextures=ct,this.setupRenderTarget=_,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=ue,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=pe}function td(e,n){function t(i,s=kt){let r;const d=at.getTransfer(s);if(i===Ft)return e.UNSIGNED_BYTE;if(i===Ra)return e.UNSIGNED_SHORT_4_4_4_4;if(i===ba)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Ir)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Nr)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Or)return e.BYTE;if(i===Fr)return e.SHORT;if(i===Mn)return e.UNSIGNED_SHORT;if(i===Da)return e.INT;if(i===on)return e.UNSIGNED_INT;if(i===Nt)return e.FLOAT;if(i===Tn)return e.HALF_FLOAT;if(i===Br)return e.ALPHA;if(i===Hr)return e.RGB;if(i===Ct)return e.RGBA;if(i===Jn)return e.DEPTH_COMPONENT;if(i===En)return e.DEPTH_STENCIL;if(i===Gr)return e.RED;if(i===La)return e.RED_INTEGER;if(i===Vr)return e.RG;if(i===Ua)return e.RG_INTEGER;if(i===wa)return e.RGBA_INTEGER;if(i===Un||i===wn||i===yn||i===In)if(d===Ke)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Un)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===wn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===yn)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===In)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Un)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===wn)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===yn)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===In)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ci||i===fi||i===di||i===ui)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ci)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===fi)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===di)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ui)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===pi||i===hi||i===_i)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===pi||i===hi)return d===Ke?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===_i)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===mi||i===gi||i===vi||i===Ei||i===Si||i===Mi||i===Ti||i===xi||i===Ai||i===Ri||i===bi||i===Ci||i===Pi||i===Di)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===mi)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===gi)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===vi)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ei)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Si)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Mi)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ti)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xi)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ai)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ri)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===bi)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ci)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Pi)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Di)return d===Ke?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Li||i===Ui||i===wi)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===Li)return d===Ke?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ui)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wi)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===yi||i===Ii||i===Ni||i===Oi)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===yi)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ii)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ni)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Oi)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===rn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const nd=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,id=`
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

}`;class ad{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new Ca(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Bt({vertexShader:nd,fragmentShader:id,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dt(new Pa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rd extends er{constructor(n,t){super();const i=this;let s=null,r=1,d=null,c="local-floor",x=1,m=null,U=null,E=null,M=null,S=null,O=null;const C=typeof XRWebGLBinding<"u",f=new ad,a={},P=t.getContextAttributes();let R=null,g=null;const N=[],D=[],I=new qe;let z=null;const h=new _n;h.viewport=new _t;const u=new _n;u.viewport=new _t;const b=[h,u],B=new tr;let X=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let q=N[V];return q===void 0&&(q=new Dn,N[V]=q),q.getTargetRaySpace()},this.getControllerGrip=function(V){let q=N[V];return q===void 0&&(q=new Dn,N[V]=q),q.getGripSpace()},this.getHand=function(V){let q=N[V];return q===void 0&&(q=new Dn,N[V]=q),q.getHandSpace()};function Z(V){const q=D.indexOf(V.inputSource);if(q===-1)return;const ce=N[q];ce!==void 0&&(ce.update(V.inputSource,V.frame,m||d),ce.dispatchEvent({type:V.type,data:V.inputSource}))}function W(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",ne);for(let V=0;V<N.length;V++){const q=D[V];q!==null&&(D[V]=null,N[V].disconnect(q))}X=null,Y=null,f.reset();for(const V in a)delete a[V];n.setRenderTarget(R),S=null,M=null,E=null,s=null,g=null,ze.stop(),i.isPresenting=!1,n.setPixelRatio(z),n.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){c=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||d},this.setReferenceSpace=function(V){m=V},this.getBaseLayer=function(){return M!==null?M:S},this.getBinding=function(){return E===null&&C&&(E=new XRWebGLBinding(s,t)),E},this.getFrame=function(){return O},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(R=n.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",W),s.addEventListener("inputsourceschange",ne),P.xrCompatible!==!0&&await t.makeXRCompatible(),z=n.getPixelRatio(),n.getSize(I),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Ce=null,Ee=null;P.depth&&(Ee=P.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=P.stencil?En:Jn,Ce=P.stencil?rn:on);const Oe={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:r};E=this.getBinding(),M=E.createProjectionLayer(Oe),s.updateRenderState({layers:[M]}),n.setPixelRatio(1),n.setSize(M.textureWidth,M.textureHeight,!1),g=new Kt(M.textureWidth,M.textureHeight,{format:Ct,type:Ft,depthTexture:new Sa(M.textureWidth,M.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:P.stencil,colorSpace:n.outputColorSpace,samples:P.antialias?4:0,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}else{const ce={antialias:P.antialias,alpha:!0,depth:P.depth,stencil:P.stencil,framebufferScaleFactor:r};S=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:S}),n.setPixelRatio(1),n.setSize(S.framebufferWidth,S.framebufferHeight,!1),g=new Kt(S.framebufferWidth,S.framebufferHeight,{format:Ct,type:Ft,colorSpace:n.outputColorSpace,stencilBuffer:P.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(x),m=null,d=await s.requestReferenceSpace(c),ze.setContext(s),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function ne(V){for(let q=0;q<V.removed.length;q++){const ce=V.removed[q],Ce=D.indexOf(ce);Ce>=0&&(D[Ce]=null,N[Ce].disconnect(ce))}for(let q=0;q<V.added.length;q++){const ce=V.added[q];let Ce=D.indexOf(ce);if(Ce===-1){for(let Oe=0;Oe<N.length;Oe++)if(Oe>=D.length){D.push(ce),Ce=Oe;break}else if(D[Oe]===null){D[Oe]=ce,Ce=Oe;break}if(Ce===-1)break}const Ee=N[Ce];Ee&&Ee.connect(ce)}}const G=new Le,ge=new Le;function Te(V,q,ce){G.setFromMatrixPosition(q.matrixWorld),ge.setFromMatrixPosition(ce.matrixWorld);const Ce=G.distanceTo(ge),Ee=q.projectionMatrix.elements,Oe=ce.projectionMatrix.elements,ct=Ee[14]/(Ee[10]-1),_=Ee[14]/(Ee[10]+1),Ze=(Ee[9]+1)/Ee[5],De=(Ee[9]-1)/Ee[5],Re=(Ee[8]-1)/Ee[0],ue=(Oe[8]+1)/Oe[0],$e=ct*Re,pe=ct*ue,ye=Ce/(-Re+ue),lt=ye*-Re;if(q.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(lt),V.translateZ(ye),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),Ee[10]===-1)V.projectionMatrix.copy(q.projectionMatrix),V.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const it=ct+ye,p=_+ye,o=$e-lt,L=pe+(Ce-lt),H=Ze*_/p*it,K=De*_/p*it;V.projectionMatrix.makePerspective(o,L,H,K,it,p),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function we(V,q){q===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(q.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let q=V.near,ce=V.far;f.texture!==null&&(f.depthNear>0&&(q=f.depthNear),f.depthFar>0&&(ce=f.depthFar)),B.near=u.near=h.near=q,B.far=u.far=h.far=ce,(X!==B.near||Y!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),X=B.near,Y=B.far),B.layers.mask=V.layers.mask|6,h.layers.mask=B.layers.mask&3,u.layers.mask=B.layers.mask&5;const Ce=V.parent,Ee=B.cameras;we(B,Ce);for(let Oe=0;Oe<Ee.length;Oe++)we(Ee[Oe],Ce);Ee.length===2?Te(B,h,u):B.projectionMatrix.copy(h.projectionMatrix),He(V,B,Ce)};function He(V,q,ce){ce===null?V.matrix.copy(q.matrixWorld):(V.matrix.copy(ce.matrixWorld),V.matrix.invert(),V.matrix.multiply(q.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(q.projectionMatrix),V.projectionMatrixInverse.copy(q.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=nr*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(M===null&&S===null))return x},this.setFoveation=function(V){x=V,M!==null&&(M.fixedFoveation=V),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=V)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(B)},this.getCameraTexture=function(V){return a[V]};let nt=null;function et(V,q){if(U=q.getViewerPose(m||d),O=q,U!==null){const ce=U.views;S!==null&&(n.setRenderTargetFramebuffer(g,S.framebuffer),n.setRenderTarget(g));let Ce=!1;ce.length!==B.cameras.length&&(B.cameras.length=0,Ce=!0);for(let _=0;_<ce.length;_++){const Ze=ce[_];let De=null;if(S!==null)De=S.getViewport(Ze);else{const ue=E.getViewSubImage(M,Ze);De=ue.viewport,_===0&&(n.setRenderTargetTextures(g,ue.colorTexture,ue.depthStencilTexture),n.setRenderTarget(g))}let Re=b[_];Re===void 0&&(Re=new _n,Re.layers.enable(_),Re.viewport=new _t,b[_]=Re),Re.matrix.fromArray(Ze.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray(Ze.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set(De.x,De.y,De.width,De.height),_===0&&(B.matrix.copy(Re.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ce===!0&&B.cameras.push(Re)}const Ee=s.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&C){E=i.getBinding();const _=E.getDepthInformation(ce[0]);_&&_.isValid&&_.texture&&f.init(_,s.renderState)}if(Ee&&Ee.includes("camera-access")&&C){n.state.unbindTexture(),E=i.getBinding();for(let _=0;_<ce.length;_++){const Ze=ce[_].camera;if(Ze){let De=a[Ze];De||(De=new Ca,a[Ze]=De);const Re=E.getCameraImage(Ze);De.sourceTexture=Re}}}}for(let ce=0;ce<N.length;ce++){const Ce=D[ce],Ee=N[ce];Ce!==null&&Ee!==void 0&&Ee.update(Ce,q,m||d)}nt&&nt(V,q),q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:q}),O=null}const ze=new Fa;ze.setAnimationLoop(et),this.setAnimationLoop=function(V){nt=V},this.dispose=function(){}}}const wt=new Na,od=new nn;function sd(e,n){function t(f,a){f.matrixAutoUpdate===!0&&f.updateMatrix(),a.value.copy(f.matrix)}function i(f,a){a.color.getRGB(f.fogColor.value,Ia(e)),a.isFog?(f.fogNear.value=a.near,f.fogFar.value=a.far):a.isFogExp2&&(f.fogDensity.value=a.density)}function s(f,a,P,R,g){a.isMeshBasicMaterial||a.isMeshLambertMaterial?r(f,a):a.isMeshToonMaterial?(r(f,a),E(f,a)):a.isMeshPhongMaterial?(r(f,a),U(f,a)):a.isMeshStandardMaterial?(r(f,a),M(f,a),a.isMeshPhysicalMaterial&&S(f,a,g)):a.isMeshMatcapMaterial?(r(f,a),O(f,a)):a.isMeshDepthMaterial?r(f,a):a.isMeshDistanceMaterial?(r(f,a),C(f,a)):a.isMeshNormalMaterial?r(f,a):a.isLineBasicMaterial?(d(f,a),a.isLineDashedMaterial&&c(f,a)):a.isPointsMaterial?x(f,a,P,R):a.isSpriteMaterial?m(f,a):a.isShadowMaterial?(f.color.value.copy(a.color),f.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}function r(f,a){f.opacity.value=a.opacity,a.color&&f.diffuse.value.copy(a.color),a.emissive&&f.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(f.map.value=a.map,t(a.map,f.mapTransform)),a.alphaMap&&(f.alphaMap.value=a.alphaMap,t(a.alphaMap,f.alphaMapTransform)),a.bumpMap&&(f.bumpMap.value=a.bumpMap,t(a.bumpMap,f.bumpMapTransform),f.bumpScale.value=a.bumpScale,a.side===vt&&(f.bumpScale.value*=-1)),a.normalMap&&(f.normalMap.value=a.normalMap,t(a.normalMap,f.normalMapTransform),f.normalScale.value.copy(a.normalScale),a.side===vt&&f.normalScale.value.negate()),a.displacementMap&&(f.displacementMap.value=a.displacementMap,t(a.displacementMap,f.displacementMapTransform),f.displacementScale.value=a.displacementScale,f.displacementBias.value=a.displacementBias),a.emissiveMap&&(f.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,f.emissiveMapTransform)),a.specularMap&&(f.specularMap.value=a.specularMap,t(a.specularMap,f.specularMapTransform)),a.alphaTest>0&&(f.alphaTest.value=a.alphaTest);const P=n.get(a),R=P.envMap,g=P.envMapRotation;R&&(f.envMap.value=R,wt.copy(g),wt.x*=-1,wt.y*=-1,wt.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(wt.y*=-1,wt.z*=-1),f.envMapRotation.value.setFromMatrix4(od.makeRotationFromEuler(wt)),f.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=a.reflectivity,f.ior.value=a.ior,f.refractionRatio.value=a.refractionRatio),a.lightMap&&(f.lightMap.value=a.lightMap,f.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,f.lightMapTransform)),a.aoMap&&(f.aoMap.value=a.aoMap,f.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,f.aoMapTransform))}function d(f,a){f.diffuse.value.copy(a.color),f.opacity.value=a.opacity,a.map&&(f.map.value=a.map,t(a.map,f.mapTransform))}function c(f,a){f.dashSize.value=a.dashSize,f.totalSize.value=a.dashSize+a.gapSize,f.scale.value=a.scale}function x(f,a,P,R){f.diffuse.value.copy(a.color),f.opacity.value=a.opacity,f.size.value=a.size*P,f.scale.value=R*.5,a.map&&(f.map.value=a.map,t(a.map,f.uvTransform)),a.alphaMap&&(f.alphaMap.value=a.alphaMap,t(a.alphaMap,f.alphaMapTransform)),a.alphaTest>0&&(f.alphaTest.value=a.alphaTest)}function m(f,a){f.diffuse.value.copy(a.color),f.opacity.value=a.opacity,f.rotation.value=a.rotation,a.map&&(f.map.value=a.map,t(a.map,f.mapTransform)),a.alphaMap&&(f.alphaMap.value=a.alphaMap,t(a.alphaMap,f.alphaMapTransform)),a.alphaTest>0&&(f.alphaTest.value=a.alphaTest)}function U(f,a){f.specular.value.copy(a.specular),f.shininess.value=Math.max(a.shininess,1e-4)}function E(f,a){a.gradientMap&&(f.gradientMap.value=a.gradientMap)}function M(f,a){f.metalness.value=a.metalness,a.metalnessMap&&(f.metalnessMap.value=a.metalnessMap,t(a.metalnessMap,f.metalnessMapTransform)),f.roughness.value=a.roughness,a.roughnessMap&&(f.roughnessMap.value=a.roughnessMap,t(a.roughnessMap,f.roughnessMapTransform)),a.envMap&&(f.envMapIntensity.value=a.envMapIntensity)}function S(f,a,P){f.ior.value=a.ior,a.sheen>0&&(f.sheenColor.value.copy(a.sheenColor).multiplyScalar(a.sheen),f.sheenRoughness.value=a.sheenRoughness,a.sheenColorMap&&(f.sheenColorMap.value=a.sheenColorMap,t(a.sheenColorMap,f.sheenColorMapTransform)),a.sheenRoughnessMap&&(f.sheenRoughnessMap.value=a.sheenRoughnessMap,t(a.sheenRoughnessMap,f.sheenRoughnessMapTransform))),a.clearcoat>0&&(f.clearcoat.value=a.clearcoat,f.clearcoatRoughness.value=a.clearcoatRoughness,a.clearcoatMap&&(f.clearcoatMap.value=a.clearcoatMap,t(a.clearcoatMap,f.clearcoatMapTransform)),a.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=a.clearcoatRoughnessMap,t(a.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),a.clearcoatNormalMap&&(f.clearcoatNormalMap.value=a.clearcoatNormalMap,t(a.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(a.clearcoatNormalScale),a.side===vt&&f.clearcoatNormalScale.value.negate())),a.dispersion>0&&(f.dispersion.value=a.dispersion),a.iridescence>0&&(f.iridescence.value=a.iridescence,f.iridescenceIOR.value=a.iridescenceIOR,f.iridescenceThicknessMinimum.value=a.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=a.iridescenceThicknessRange[1],a.iridescenceMap&&(f.iridescenceMap.value=a.iridescenceMap,t(a.iridescenceMap,f.iridescenceMapTransform)),a.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=a.iridescenceThicknessMap,t(a.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),a.transmission>0&&(f.transmission.value=a.transmission,f.transmissionSamplerMap.value=P.texture,f.transmissionSamplerSize.value.set(P.width,P.height),a.transmissionMap&&(f.transmissionMap.value=a.transmissionMap,t(a.transmissionMap,f.transmissionMapTransform)),f.thickness.value=a.thickness,a.thicknessMap&&(f.thicknessMap.value=a.thicknessMap,t(a.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=a.attenuationDistance,f.attenuationColor.value.copy(a.attenuationColor)),a.anisotropy>0&&(f.anisotropyVector.value.set(a.anisotropy*Math.cos(a.anisotropyRotation),a.anisotropy*Math.sin(a.anisotropyRotation)),a.anisotropyMap&&(f.anisotropyMap.value=a.anisotropyMap,t(a.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=a.specularIntensity,f.specularColor.value.copy(a.specularColor),a.specularColorMap&&(f.specularColorMap.value=a.specularColorMap,t(a.specularColorMap,f.specularColorMapTransform)),a.specularIntensityMap&&(f.specularIntensityMap.value=a.specularIntensityMap,t(a.specularIntensityMap,f.specularIntensityMapTransform))}function O(f,a){a.matcap&&(f.matcap.value=a.matcap)}function C(f,a){const P=n.get(a).light;f.referencePosition.value.setFromMatrixPosition(P.matrixWorld),f.nearDistance.value=P.shadow.camera.near,f.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ld(e,n,t,i){let s={},r={},d=[];const c=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function x(P,R){const g=R.program;i.uniformBlockBinding(P,g)}function m(P,R){let g=s[P.id];g===void 0&&(O(P),g=U(P),s[P.id]=g,P.addEventListener("dispose",f));const N=R.program;i.updateUBOMapping(P,N);const D=n.render.frame;r[P.id]!==D&&(M(P),r[P.id]=D)}function U(P){const R=E();P.__bindingPointIndex=R;const g=e.createBuffer(),N=P.__size,D=P.usage;return e.bindBuffer(e.UNIFORM_BUFFER,g),e.bufferData(e.UNIFORM_BUFFER,N,D),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,R,g),g}function E(){for(let P=0;P<c;P++)if(d.indexOf(P)===-1)return d.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function M(P){const R=s[P.id],g=P.uniforms,N=P.__cache;e.bindBuffer(e.UNIFORM_BUFFER,R);for(let D=0,I=g.length;D<I;D++){const z=Array.isArray(g[D])?g[D]:[g[D]];for(let h=0,u=z.length;h<u;h++){const b=z[h];if(S(b,D,h,N)===!0){const B=b.__offset,X=Array.isArray(b.value)?b.value:[b.value];let Y=0;for(let Z=0;Z<X.length;Z++){const W=X[Z],ne=C(W);typeof W=="number"||typeof W=="boolean"?(b.__data[0]=W,e.bufferSubData(e.UNIFORM_BUFFER,B+Y,b.__data)):W.isMatrix3?(b.__data[0]=W.elements[0],b.__data[1]=W.elements[1],b.__data[2]=W.elements[2],b.__data[3]=0,b.__data[4]=W.elements[3],b.__data[5]=W.elements[4],b.__data[6]=W.elements[5],b.__data[7]=0,b.__data[8]=W.elements[6],b.__data[9]=W.elements[7],b.__data[10]=W.elements[8],b.__data[11]=0):(W.toArray(b.__data,Y),Y+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,B,b.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function S(P,R,g,N){const D=P.value,I=R+"_"+g;if(N[I]===void 0)return typeof D=="number"||typeof D=="boolean"?N[I]=D:N[I]=D.clone(),!0;{const z=N[I];if(typeof D=="number"||typeof D=="boolean"){if(z!==D)return N[I]=D,!0}else if(z.equals(D)===!1)return z.copy(D),!0}return!1}function O(P){const R=P.uniforms;let g=0;const N=16;for(let I=0,z=R.length;I<z;I++){const h=Array.isArray(R[I])?R[I]:[R[I]];for(let u=0,b=h.length;u<b;u++){const B=h[u],X=Array.isArray(B.value)?B.value:[B.value];for(let Y=0,Z=X.length;Y<Z;Y++){const W=X[Y],ne=C(W),G=g%N,ge=G%ne.boundary,Te=G+ge;g+=ge,Te!==0&&N-Te<ne.storage&&(g+=N-Te),B.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=g,g+=ne.storage}}}const D=g%N;return D>0&&(g+=N-D),P.__size=g,P.__cache={},this}function C(P){const R={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(R.boundary=4,R.storage=4):P.isVector2?(R.boundary=8,R.storage=8):P.isVector3||P.isColor?(R.boundary=16,R.storage=12):P.isVector4?(R.boundary=16,R.storage=16):P.isMatrix3?(R.boundary=48,R.storage=48):P.isMatrix4?(R.boundary=64,R.storage=64):P.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",P),R}function f(P){const R=P.target;R.removeEventListener("dispose",f);const g=d.indexOf(R.__bindingPointIndex);d.splice(g,1),e.deleteBuffer(s[R.id]),delete s[R.id],delete r[R.id]}function a(){for(const P in s)e.deleteBuffer(s[P]);d=[],s={},r={}}return{bind:x,update:m,dispose:a}}class xd{constructor(n={}){const{canvas:t=$a(),context:i=null,depth:s=!0,stencil:r=!1,alpha:d=!1,antialias:c=!1,premultipliedAlpha:x=!0,preserveDrawingBuffer:m=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:E=!1,reversedDepthBuffer:M=!1}=n;this.isWebGLRenderer=!0;let S;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=i.getContextAttributes().alpha}else S=d;const O=new Uint32Array(4),C=new Int32Array(4);let f=null,a=null;const P=[],R=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const g=this;let N=!1;this._outputColorSpace=ja;let D=0,I=0,z=null,h=-1,u=null;const b=new _t,B=new _t;let X=null;const Y=new je(0);let Z=0,W=t.width,ne=t.height,G=1,ge=null,Te=null;const we=new _t(0,0,W,ne),He=new _t(0,0,W,ne);let nt=!1;const et=new Ea;let ze=!1,V=!1;const q=new nn,ce=new Le,Ce=new _t,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function ct(){return z===null?G:1}let _=i;function Ze(l,T){return t.getContext(l,T)}try{const l={alpha:!0,depth:s,stencil:r,antialias:c,premultipliedAlpha:x,preserveDrawingBuffer:m,powerPreference:U,failIfMajorPerformanceCaveat:E};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Qa}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",$,!1),_===null){const T="webgl2";if(_=Ze(T,l),_===null)throw Ze(T)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(l){throw console.error("THREE.WebGLRenderer: "+l.message),l}let De,Re,ue,$e,pe,ye,lt,it,p,o,L,H,K,F,ve,ee,he,_e,Q,oe,Ae,me,ae,Ue;function v(){De=new vc(_),De.init(),me=new td(_,De),Re=new dc(_,De,n,me),ue=new Jf(_,De),Re.reversedDepthBuffer&&M&&ue.buffers.depth.setReversed(!0),$e=new Mc(_),pe=new Gf,ye=new ed(_,De,ue,pe,Re,me,$e),lt=new pc(g),it=new gc(g),p=new Co(_),ae=new cc(_,p),o=new Ec(_,p,$e,ae),L=new xc(_,o,p,$e),Q=new Tc(_,Re,ye),ee=new uc(pe),H=new Hf(g,lt,it,De,Re,ae,ee),K=new sd(g,pe),F=new kf,ve=new qf(De),_e=new lc(g,lt,it,ue,L,S,x),he=new jf(g,L,Re),Ue=new ld(_,$e,Re,ue),oe=new fc(_,De,$e),Ae=new Sc(_,De,$e),$e.programs=H.programs,g.capabilities=Re,g.extensions=De,g.properties=pe,g.renderLists=F,g.shadowMap=he,g.state=ue,g.info=$e}v();const J=new rd(g,_);this.xr=J,this.getContext=function(){return _},this.getContextAttributes=function(){return _.getContextAttributes()},this.forceContextLoss=function(){const l=De.get("WEBGL_lose_context");l&&l.loseContext()},this.forceContextRestore=function(){const l=De.get("WEBGL_lose_context");l&&l.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(l){l!==void 0&&(G=l,this.setSize(W,ne,!1))},this.getSize=function(l){return l.set(W,ne)},this.setSize=function(l,T,w=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=l,ne=T,t.width=Math.floor(l*G),t.height=Math.floor(T*G),w===!0&&(t.style.width=l+"px",t.style.height=T+"px"),this.setViewport(0,0,l,T)},this.getDrawingBufferSize=function(l){return l.set(W*G,ne*G).floor()},this.setDrawingBufferSize=function(l,T,w){W=l,ne=T,G=w,t.width=Math.floor(l*w),t.height=Math.floor(T*w),this.setViewport(0,0,l,T)},this.getCurrentViewport=function(l){return l.copy(b)},this.getViewport=function(l){return l.copy(we)},this.setViewport=function(l,T,w,y){l.isVector4?we.set(l.x,l.y,l.z,l.w):we.set(l,T,w,y),ue.viewport(b.copy(we).multiplyScalar(G).round())},this.getScissor=function(l){return l.copy(He)},this.setScissor=function(l,T,w,y){l.isVector4?He.set(l.x,l.y,l.z,l.w):He.set(l,T,w,y),ue.scissor(B.copy(He).multiplyScalar(G).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(l){ue.setScissorTest(nt=l)},this.setOpaqueSort=function(l){ge=l},this.setTransparentSort=function(l){Te=l},this.getClearColor=function(l){return l.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor(...arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha(...arguments)},this.clear=function(l=!0,T=!0,w=!0){let y=0;if(l){let A=!1;if(z!==null){const j=z.texture.format;A=j===wa||j===Ua||j===La}if(A){const j=z.texture.type,re=j===Ft||j===on||j===Mn||j===rn||j===Ra||j===ba,fe=_e.getClearColor(),se=_e.getClearAlpha(),xe=fe.r,be=fe.g,Se=fe.b;re?(O[0]=xe,O[1]=be,O[2]=Se,O[3]=se,_.clearBufferuiv(_.COLOR,0,O)):(C[0]=xe,C[1]=be,C[2]=Se,C[3]=se,_.clearBufferiv(_.COLOR,0,C))}else y|=_.COLOR_BUFFER_BIT}T&&(y|=_.DEPTH_BUFFER_BIT),w&&(y|=_.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),_.clear(y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",$,!1),_e.dispose(),F.dispose(),ve.dispose(),pe.dispose(),lt.dispose(),it.dispose(),L.dispose(),ae.dispose(),Ue.dispose(),H.dispose(),J.dispose(),J.removeEventListener("sessionstart",Tt),J.removeEventListener("sessionend",ni),Dt.stop()};function te(l){l.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const l=$e.autoReset,T=he.enabled,w=he.autoUpdate,y=he.needsUpdate,A=he.type;v(),$e.autoReset=l,he.enabled=T,he.autoUpdate=w,he.needsUpdate=y,he.type=A}function $(l){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",l.statusMessage)}function k(l){const T=l.target;T.removeEventListener("dispose",k),de(T)}function de(l){Pe(l),pe.remove(l)}function Pe(l){const T=pe.get(l).programs;T!==void 0&&(T.forEach(function(w){H.releaseProgram(w)}),l.isShaderMaterial&&H.releaseShaderCache(l))}this.renderBufferDirect=function(l,T,w,y,A,j){T===null&&(T=Ee);const re=A.isMesh&&A.matrixWorld.determinant()<0,fe=Wa(l,T,w,y,A);ue.setMaterial(y,re);let se=w.index,xe=1;if(y.wireframe===!0){if(se=o.getWireframeAttribute(w),se===void 0)return;xe=2}const be=w.drawRange,Se=w.attributes.position;let Ne=be.start*xe,Ve=(be.start+be.count)*xe;j!==null&&(Ne=Math.max(Ne,j.start*xe),Ve=Math.min(Ve,(j.start+j.count)*xe)),se!==null?(Ne=Math.max(Ne,0),Ve=Math.min(Ve,se.count)):Se!=null&&(Ne=Math.max(Ne,0),Ve=Math.min(Ve,Se.count));const tt=Ve-Ne;if(tt<0||tt===1/0)return;ae.setup(A,y,fe,w,se);let Ye,We=oe;if(se!==null&&(Ye=p.get(se),We=Ae,We.setIndex(Ye)),A.isMesh)y.wireframe===!0?(ue.setLineWidth(y.wireframeLinewidth*ct()),We.setMode(_.LINES)):We.setMode(_.TRIANGLES);else if(A.isLine){let Me=y.linewidth;Me===void 0&&(Me=1),ue.setLineWidth(Me*ct()),A.isLineSegments?We.setMode(_.LINES):A.isLineLoop?We.setMode(_.LINE_LOOP):We.setMode(_.LINE_STRIP)}else A.isPoints?We.setMode(_.POINTS):A.isSprite&&We.setMode(_.TRIANGLES);if(A.isBatchedMesh)if(A._multiDrawInstances!==null)kn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),We.renderMultiDrawInstances(A._multiDrawStarts,A._multiDrawCounts,A._multiDrawCount,A._multiDrawInstances);else if(De.get("WEBGL_multi_draw"))We.renderMultiDraw(A._multiDrawStarts,A._multiDrawCounts,A._multiDrawCount);else{const Me=A._multiDrawStarts,Qe=A._multiDrawCounts,Fe=A._multiDrawCount,mt=se?p.get(se).bytesPerElement:1,Ht=pe.get(y).currentProgram.getUniforms();for(let gt=0;gt<Fe;gt++)Ht.setValue(_,"_gl_DrawID",gt),We.render(Me[gt]/mt,Qe[gt])}else if(A.isInstancedMesh)We.renderInstances(Ne,tt,A.count);else if(w.isInstancedBufferGeometry){const Me=w._maxInstanceCount!==void 0?w._maxInstanceCount:1/0,Qe=Math.min(w.instanceCount,Me);We.renderInstances(Ne,tt,Qe)}else We.render(Ne,tt)};function Xe(l,T,w){l.transparent===!0&&l.side===bt&&l.forceSinglePass===!1?(l.side=vt,l.needsUpdate=!0,cn(l,T,w),l.side=an,l.needsUpdate=!0,cn(l,T,w),l.side=bt):cn(l,T,w)}this.compile=function(l,T,w=null){w===null&&(w=l),a=ve.get(w),a.init(T),R.push(a),w.traverseVisible(function(A){A.isLight&&A.layers.test(T.layers)&&(a.pushLight(A),A.castShadow&&a.pushShadow(A))}),l!==w&&l.traverseVisible(function(A){A.isLight&&A.layers.test(T.layers)&&(a.pushLight(A),A.castShadow&&a.pushShadow(A))}),a.setupLights();const y=new Set;return l.traverse(function(A){if(!(A.isMesh||A.isPoints||A.isLine||A.isSprite))return;const j=A.material;if(j)if(Array.isArray(j))for(let re=0;re<j.length;re++){const fe=j[re];Xe(fe,w,A),y.add(fe)}else Xe(j,w,A),y.add(j)}),a=R.pop(),y},this.compileAsync=function(l,T,w=null){const y=this.compile(l,T,w);return new Promise(A=>{function j(){if(y.forEach(function(re){pe.get(re).currentProgram.isReady()&&y.delete(re)}),y.size===0){A(l);return}setTimeout(j,10)}De.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Ge=null;function At(l){Ge&&Ge(l)}function Tt(){Dt.stop()}function ni(){Dt.start()}const Dt=new Fa;Dt.setAnimationLoop(At),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(l){Ge=l,J.setAnimationLoop(l),l===null?Dt.stop():Dt.start()},J.addEventListener("sessionstart",Tt),J.addEventListener("sessionend",ni),this.render=function(l,T){if(T!==void 0&&T.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(l.matrixWorldAutoUpdate===!0&&l.updateMatrixWorld(),T.parent===null&&T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(T),T=J.getCamera()),l.isScene===!0&&l.onBeforeRender(g,l,T,z),a=ve.get(l,R.length),a.init(T),R.push(a),q.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),et.setFromProjectionMatrix(q,li,T.reversedDepth),V=this.localClippingEnabled,ze=ee.init(this.clippingPlanes,V),f=F.get(l,P.length),f.init(),P.push(f),J.enabled===!0&&J.isPresenting===!0){const j=g.xr.getDepthSensingMesh();j!==null&&Cn(j,T,-1/0,g.sortObjects)}Cn(l,T,0,g.sortObjects),f.finish(),g.sortObjects===!0&&f.sort(ge,Te),Oe=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Oe&&_e.addToRenderList(f,l),this.info.render.frame++,ze===!0&&ee.beginShadows();const w=a.state.shadowsArray;he.render(w,l,T),ze===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const y=f.opaque,A=f.transmissive;if(a.setupLights(),T.isArrayCamera){const j=T.cameras;if(A.length>0)for(let re=0,fe=j.length;re<fe;re++){const se=j[re];ai(y,A,l,se)}Oe&&_e.render(l);for(let re=0,fe=j.length;re<fe;re++){const se=j[re];ii(f,l,se,se.viewport)}}else A.length>0&&ai(y,A,l,T),Oe&&_e.render(l),ii(f,l,T);z!==null&&I===0&&(ye.updateMultisampleRenderTarget(z),ye.updateRenderTargetMipmap(z)),l.isScene===!0&&l.onAfterRender(g,l,T),ae.resetDefaultState(),h=-1,u=null,R.pop(),R.length>0?(a=R[R.length-1],ze===!0&&ee.setGlobalState(g.clippingPlanes,a.state.camera)):a=null,P.pop(),P.length>0?f=P[P.length-1]:f=null};function Cn(l,T,w,y){if(l.visible===!1)return;if(l.layers.test(T.layers)){if(l.isGroup)w=l.renderOrder;else if(l.isLOD)l.autoUpdate===!0&&l.update(T);else if(l.isLight)a.pushLight(l),l.castShadow&&a.pushShadow(l);else if(l.isSprite){if(!l.frustumCulled||et.intersectsSprite(l)){y&&Ce.setFromMatrixPosition(l.matrixWorld).applyMatrix4(q);const re=L.update(l),fe=l.material;fe.visible&&f.push(l,re,fe,w,Ce.z,null)}}else if((l.isMesh||l.isLine||l.isPoints)&&(!l.frustumCulled||et.intersectsObject(l))){const re=L.update(l),fe=l.material;if(y&&(l.boundingSphere!==void 0?(l.boundingSphere===null&&l.computeBoundingSphere(),Ce.copy(l.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),Ce.copy(re.boundingSphere.center)),Ce.applyMatrix4(l.matrixWorld).applyMatrix4(q)),Array.isArray(fe)){const se=re.groups;for(let xe=0,be=se.length;xe<be;xe++){const Se=se[xe],Ne=fe[Se.materialIndex];Ne&&Ne.visible&&f.push(l,re,Ne,w,Ce.z,Se)}}else fe.visible&&f.push(l,re,fe,w,Ce.z,null)}}const j=l.children;for(let re=0,fe=j.length;re<fe;re++)Cn(j[re],T,w,y)}function ii(l,T,w,y){const A=l.opaque,j=l.transmissive,re=l.transparent;a.setupLightsView(w),ze===!0&&ee.setGlobalState(g.clippingPlanes,w),y&&ue.viewport(b.copy(y)),A.length>0&&ln(A,T,w),j.length>0&&ln(j,T,w),re.length>0&&ln(re,T,w),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function ai(l,T,w,y){if((w.isScene===!0?w.overrideMaterial:null)!==null)return;a.state.transmissionRenderTarget[y.id]===void 0&&(a.state.transmissionRenderTarget[y.id]=new Kt(1,1,{generateMipmaps:!0,type:De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float")?Tn:Ft,minFilter:Jt,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const j=a.state.transmissionRenderTarget[y.id],re=y.viewport||b;j.setSize(re.z*g.transmissionResolutionScale,re.w*g.transmissionResolutionScale);const fe=g.getRenderTarget(),se=g.getActiveCubeFace(),xe=g.getActiveMipmapLevel();g.setRenderTarget(j),g.getClearColor(Y),Z=g.getClearAlpha(),Z<1&&g.setClearColor(16777215,.5),g.clear(),Oe&&_e.render(w);const be=g.toneMapping;g.toneMapping=Pt;const Se=y.viewport;if(y.viewport!==void 0&&(y.viewport=void 0),a.setupLightsView(y),ze===!0&&ee.setGlobalState(g.clippingPlanes,y),ln(l,w,y),ye.updateMultisampleRenderTarget(j),ye.updateRenderTargetMipmap(j),De.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let Ve=0,tt=T.length;Ve<tt;Ve++){const Ye=T[Ve],We=Ye.object,Me=Ye.geometry,Qe=Ye.material,Fe=Ye.group;if(Qe.side===bt&&We.layers.test(y.layers)){const mt=Qe.side;Qe.side=vt,Qe.needsUpdate=!0,ri(We,w,y,Me,Qe,Fe),Qe.side=mt,Qe.needsUpdate=!0,Ne=!0}}Ne===!0&&(ye.updateMultisampleRenderTarget(j),ye.updateRenderTargetMipmap(j))}g.setRenderTarget(fe,se,xe),g.setClearColor(Y,Z),Se!==void 0&&(y.viewport=Se),g.toneMapping=be}function ln(l,T,w){const y=T.isScene===!0?T.overrideMaterial:null;for(let A=0,j=l.length;A<j;A++){const re=l[A],fe=re.object,se=re.geometry,xe=re.group;let be=re.material;be.allowOverride===!0&&y!==null&&(be=y),fe.layers.test(w.layers)&&ri(fe,T,w,se,be,xe)}}function ri(l,T,w,y,A,j){l.onBeforeRender(g,T,w,y,A,j),l.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,l.matrixWorld),l.normalMatrix.getNormalMatrix(l.modelViewMatrix),A.onBeforeRender(g,T,w,y,l,j),A.transparent===!0&&A.side===bt&&A.forceSinglePass===!1?(A.side=vt,A.needsUpdate=!0,g.renderBufferDirect(w,T,y,A,l,j),A.side=an,A.needsUpdate=!0,g.renderBufferDirect(w,T,y,A,l,j),A.side=bt):g.renderBufferDirect(w,T,y,A,l,j),l.onAfterRender(g,T,w,y,A,j)}function cn(l,T,w){T.isScene!==!0&&(T=Ee);const y=pe.get(l),A=a.state.lights,j=a.state.shadowsArray,re=A.state.version,fe=H.getParameters(l,A.state,j,T,w),se=H.getProgramCacheKey(fe);let xe=y.programs;y.environment=l.isMeshStandardMaterial?T.environment:null,y.fog=T.fog,y.envMap=(l.isMeshStandardMaterial?it:lt).get(l.envMap||y.environment),y.envMapRotation=y.environment!==null&&l.envMap===null?T.environmentRotation:l.envMapRotation,xe===void 0&&(l.addEventListener("dispose",k),xe=new Map,y.programs=xe);let be=xe.get(se);if(be!==void 0){if(y.currentProgram===be&&y.lightsStateVersion===re)return si(l,fe),be}else fe.uniforms=H.getUniforms(l),l.onBeforeCompile(fe,g),be=H.acquireProgram(fe,se),xe.set(se,be),y.uniforms=fe.uniforms;const Se=y.uniforms;return(!l.isShaderMaterial&&!l.isRawShaderMaterial||l.clipping===!0)&&(Se.clippingPlanes=ee.uniform),si(l,fe),y.needsLights=Ya(l),y.lightsStateVersion=re,y.needsLights&&(Se.ambientLightColor.value=A.state.ambient,Se.lightProbe.value=A.state.probe,Se.directionalLights.value=A.state.directional,Se.directionalLightShadows.value=A.state.directionalShadow,Se.spotLights.value=A.state.spot,Se.spotLightShadows.value=A.state.spotShadow,Se.rectAreaLights.value=A.state.rectArea,Se.ltc_1.value=A.state.rectAreaLTC1,Se.ltc_2.value=A.state.rectAreaLTC2,Se.pointLights.value=A.state.point,Se.pointLightShadows.value=A.state.pointShadow,Se.hemisphereLights.value=A.state.hemi,Se.directionalShadowMap.value=A.state.directionalShadowMap,Se.directionalShadowMatrix.value=A.state.directionalShadowMatrix,Se.spotShadowMap.value=A.state.spotShadowMap,Se.spotLightMatrix.value=A.state.spotLightMatrix,Se.spotLightMap.value=A.state.spotLightMap,Se.pointShadowMap.value=A.state.pointShadowMap,Se.pointShadowMatrix.value=A.state.pointShadowMatrix),y.currentProgram=be,y.uniformsList=null,be}function oi(l){if(l.uniformsList===null){const T=l.currentProgram.getUniforms();l.uniformsList=vn.seqWithValue(T.seq,l.uniforms)}return l.uniformsList}function si(l,T){const w=pe.get(l);w.outputColorSpace=T.outputColorSpace,w.batching=T.batching,w.batchingColor=T.batchingColor,w.instancing=T.instancing,w.instancingColor=T.instancingColor,w.instancingMorph=T.instancingMorph,w.skinning=T.skinning,w.morphTargets=T.morphTargets,w.morphNormals=T.morphNormals,w.morphColors=T.morphColors,w.morphTargetsCount=T.morphTargetsCount,w.numClippingPlanes=T.numClippingPlanes,w.numIntersection=T.numClipIntersection,w.vertexAlphas=T.vertexAlphas,w.vertexTangents=T.vertexTangents,w.toneMapping=T.toneMapping}function Wa(l,T,w,y,A){T.isScene!==!0&&(T=Ee),ye.resetTextureUnits();const j=T.fog,re=y.isMeshStandardMaterial?T.environment:null,fe=z===null?g.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:xn,se=(y.isMeshStandardMaterial?it:lt).get(y.envMap||re),xe=y.vertexColors===!0&&!!w.attributes.color&&w.attributes.color.itemSize===4,be=!!w.attributes.tangent&&(!!y.normalMap||y.anisotropy>0),Se=!!w.morphAttributes.position,Ne=!!w.morphAttributes.normal,Ve=!!w.morphAttributes.color;let tt=Pt;y.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(tt=g.toneMapping);const Ye=w.morphAttributes.position||w.morphAttributes.normal||w.morphAttributes.color,We=Ye!==void 0?Ye.length:0,Me=pe.get(y),Qe=a.state.lights;if(ze===!0&&(V===!0||l!==u)){const ft=l===u&&y.id===h;ee.setState(y,l,ft)}let Fe=!1;y.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==Qe.state.version||Me.outputColorSpace!==fe||A.isBatchedMesh&&Me.batching===!1||!A.isBatchedMesh&&Me.batching===!0||A.isBatchedMesh&&Me.batchingColor===!0&&A.colorTexture===null||A.isBatchedMesh&&Me.batchingColor===!1&&A.colorTexture!==null||A.isInstancedMesh&&Me.instancing===!1||!A.isInstancedMesh&&Me.instancing===!0||A.isSkinnedMesh&&Me.skinning===!1||!A.isSkinnedMesh&&Me.skinning===!0||A.isInstancedMesh&&Me.instancingColor===!0&&A.instanceColor===null||A.isInstancedMesh&&Me.instancingColor===!1&&A.instanceColor!==null||A.isInstancedMesh&&Me.instancingMorph===!0&&A.morphTexture===null||A.isInstancedMesh&&Me.instancingMorph===!1&&A.morphTexture!==null||Me.envMap!==se||y.fog===!0&&Me.fog!==j||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==ee.numPlanes||Me.numIntersection!==ee.numIntersection)||Me.vertexAlphas!==xe||Me.vertexTangents!==be||Me.morphTargets!==Se||Me.morphNormals!==Ne||Me.morphColors!==Ve||Me.toneMapping!==tt||Me.morphTargetsCount!==We)&&(Fe=!0):(Fe=!0,Me.__version=y.version);let mt=Me.currentProgram;Fe===!0&&(mt=cn(y,T,A));let Ht=!1,gt=!1,$t=!1;const Je=mt.getUniforms(),Et=Me.uniforms;if(ue.useProgram(mt.program)&&(Ht=!0,gt=!0,$t=!0),y.id!==h&&(h=y.id,gt=!0),Ht||u!==l){ue.buffers.depth.getReversed()&&l.reversedDepth!==!0&&(l._reversedDepth=!0,l.updateProjectionMatrix()),Je.setValue(_,"projectionMatrix",l.projectionMatrix),Je.setValue(_,"viewMatrix",l.matrixWorldInverse);const ut=Je.map.cameraPosition;ut!==void 0&&ut.setValue(_,ce.setFromMatrixPosition(l.matrixWorld)),Re.logarithmicDepthBuffer&&Je.setValue(_,"logDepthBufFC",2/(Math.log(l.far+1)/Math.LN2)),(y.isMeshPhongMaterial||y.isMeshToonMaterial||y.isMeshLambertMaterial||y.isMeshBasicMaterial||y.isMeshStandardMaterial||y.isShaderMaterial)&&Je.setValue(_,"isOrthographic",l.isOrthographicCamera===!0),u!==l&&(u=l,gt=!0,$t=!0)}if(A.isSkinnedMesh){Je.setOptional(_,A,"bindMatrix"),Je.setOptional(_,A,"bindMatrixInverse");const ft=A.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),Je.setValue(_,"boneTexture",ft.boneTexture,ye))}A.isBatchedMesh&&(Je.setOptional(_,A,"batchingTexture"),Je.setValue(_,"batchingTexture",A._matricesTexture,ye),Je.setOptional(_,A,"batchingIdTexture"),Je.setValue(_,"batchingIdTexture",A._indirectTexture,ye),Je.setOptional(_,A,"batchingColorTexture"),A._colorsTexture!==null&&Je.setValue(_,"batchingColorTexture",A._colorsTexture,ye));const St=w.morphAttributes;if((St.position!==void 0||St.normal!==void 0||St.color!==void 0)&&Q.update(A,w,mt),(gt||Me.receiveShadow!==A.receiveShadow)&&(Me.receiveShadow=A.receiveShadow,Je.setValue(_,"receiveShadow",A.receiveShadow)),y.isMeshGouraudMaterial&&y.envMap!==null&&(Et.envMap.value=se,Et.flipEnvMap.value=se.isCubeTexture&&se.isRenderTargetTexture===!1?-1:1),y.isMeshStandardMaterial&&y.envMap===null&&T.environment!==null&&(Et.envMapIntensity.value=T.environmentIntensity),gt&&(Je.setValue(_,"toneMappingExposure",g.toneMappingExposure),Me.needsLights&&Xa(Et,$t),j&&y.fog===!0&&K.refreshFogUniforms(Et,j),K.refreshMaterialUniforms(Et,y,G,ne,a.state.transmissionRenderTarget[l.id]),vn.upload(_,oi(Me),Et,ye)),y.isShaderMaterial&&y.uniformsNeedUpdate===!0&&(vn.upload(_,oi(Me),Et,ye),y.uniformsNeedUpdate=!1),y.isSpriteMaterial&&Je.setValue(_,"center",A.center),Je.setValue(_,"modelViewMatrix",A.modelViewMatrix),Je.setValue(_,"normalMatrix",A.normalMatrix),Je.setValue(_,"modelMatrix",A.matrixWorld),y.isShaderMaterial||y.isRawShaderMaterial){const ft=y.uniformsGroups;for(let ut=0,Pn=ft.length;ut<Pn;ut++){const Lt=ft[ut];Ue.update(Lt,mt),Ue.bind(Lt,mt)}}return mt}function Xa(l,T){l.ambientLightColor.needsUpdate=T,l.lightProbe.needsUpdate=T,l.directionalLights.needsUpdate=T,l.directionalLightShadows.needsUpdate=T,l.pointLights.needsUpdate=T,l.pointLightShadows.needsUpdate=T,l.spotLights.needsUpdate=T,l.spotLightShadows.needsUpdate=T,l.rectAreaLights.needsUpdate=T,l.hemisphereLights.needsUpdate=T}function Ya(l){return l.isMeshLambertMaterial||l.isMeshToonMaterial||l.isMeshPhongMaterial||l.isMeshStandardMaterial||l.isShadowMaterial||l.isShaderMaterial&&l.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(l,T,w){const y=pe.get(l);y.__autoAllocateDepthBuffer=l.resolveDepthBuffer===!1,y.__autoAllocateDepthBuffer===!1&&(y.__useRenderToTexture=!1),pe.get(l.texture).__webglTexture=T,pe.get(l.depthTexture).__webglTexture=y.__autoAllocateDepthBuffer?void 0:w,y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(l,T){const w=pe.get(l);w.__webglFramebuffer=T,w.__useDefaultFramebuffer=T===void 0};const Ka=_.createFramebuffer();this.setRenderTarget=function(l,T=0,w=0){z=l,D=T,I=w;let y=!0,A=null,j=!1,re=!1;if(l){const se=pe.get(l);if(se.__useDefaultFramebuffer!==void 0)ue.bindFramebuffer(_.FRAMEBUFFER,null),y=!1;else if(se.__webglFramebuffer===void 0)ye.setupRenderTarget(l);else if(se.__hasExternalTextures)ye.rebindTextures(l,pe.get(l.texture).__webglTexture,pe.get(l.depthTexture).__webglTexture);else if(l.depthBuffer){const Se=l.depthTexture;if(se.__boundDepthTexture!==Se){if(Se!==null&&pe.has(Se)&&(l.width!==Se.image.width||l.height!==Se.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ye.setupDepthRenderbuffer(l)}}const xe=l.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(re=!0);const be=pe.get(l).__webglFramebuffer;l.isWebGLCubeRenderTarget?(Array.isArray(be[T])?A=be[T][w]:A=be[T],j=!0):l.samples>0&&ye.useMultisampledRTT(l)===!1?A=pe.get(l).__webglMultisampledFramebuffer:Array.isArray(be)?A=be[w]:A=be,b.copy(l.viewport),B.copy(l.scissor),X=l.scissorTest}else b.copy(we).multiplyScalar(G).floor(),B.copy(He).multiplyScalar(G).floor(),X=nt;if(w!==0&&(A=Ka),ue.bindFramebuffer(_.FRAMEBUFFER,A)&&y&&ue.drawBuffers(l,A),ue.viewport(b),ue.scissor(B),ue.setScissorTest(X),j){const se=pe.get(l.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_CUBE_MAP_POSITIVE_X+T,se.__webglTexture,w)}else if(re){const se=T;for(let xe=0;xe<l.textures.length;xe++){const be=pe.get(l.textures[xe]);_.framebufferTextureLayer(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0+xe,be.__webglTexture,w,se)}}else if(l!==null&&w!==0){const se=pe.get(l.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,se.__webglTexture,w)}h=-1},this.readRenderTargetPixels=function(l,T,w,y,A,j,re,fe=0){if(!(l&&l.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let se=pe.get(l).__webglFramebuffer;if(l.isWebGLCubeRenderTarget&&re!==void 0&&(se=se[re]),se){ue.bindFramebuffer(_.FRAMEBUFFER,se);try{const xe=l.textures[fe],be=xe.format,Se=xe.type;if(!Re.textureFormatReadable(be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Re.textureTypeReadable(Se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}T>=0&&T<=l.width-y&&w>=0&&w<=l.height-A&&(l.textures.length>1&&_.readBuffer(_.COLOR_ATTACHMENT0+fe),_.readPixels(T,w,y,A,me.convert(be),me.convert(Se),j))}finally{const xe=z!==null?pe.get(z).__webglFramebuffer:null;ue.bindFramebuffer(_.FRAMEBUFFER,xe)}}},this.readRenderTargetPixelsAsync=async function(l,T,w,y,A,j,re,fe=0){if(!(l&&l.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let se=pe.get(l).__webglFramebuffer;if(l.isWebGLCubeRenderTarget&&re!==void 0&&(se=se[re]),se)if(T>=0&&T<=l.width-y&&w>=0&&w<=l.height-A){ue.bindFramebuffer(_.FRAMEBUFFER,se);const xe=l.textures[fe],be=xe.format,Se=xe.type;if(!Re.textureFormatReadable(be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Re.textureTypeReadable(Se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ne=_.createBuffer();_.bindBuffer(_.PIXEL_PACK_BUFFER,Ne),_.bufferData(_.PIXEL_PACK_BUFFER,j.byteLength,_.STREAM_READ),l.textures.length>1&&_.readBuffer(_.COLOR_ATTACHMENT0+fe),_.readPixels(T,w,y,A,me.convert(be),me.convert(Se),0);const Ve=z!==null?pe.get(z).__webglFramebuffer:null;ue.bindFramebuffer(_.FRAMEBUFFER,Ve);const tt=_.fenceSync(_.SYNC_GPU_COMMANDS_COMPLETE,0);return _.flush(),await Ja(_,tt,4),_.bindBuffer(_.PIXEL_PACK_BUFFER,Ne),_.getBufferSubData(_.PIXEL_PACK_BUFFER,0,j),_.deleteBuffer(Ne),_.deleteSync(tt),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(l,T=null,w=0){const y=Math.pow(2,-w),A=Math.floor(l.image.width*y),j=Math.floor(l.image.height*y),re=T!==null?T.x:0,fe=T!==null?T.y:0;ye.setTexture2D(l,0),_.copyTexSubImage2D(_.TEXTURE_2D,w,0,0,re,fe,A,j),ue.unbindTexture()};const qa=_.createFramebuffer(),Za=_.createFramebuffer();this.copyTextureToTexture=function(l,T,w=null,y=null,A=0,j=null){j===null&&(A!==0?(kn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=A,A=0):j=0);let re,fe,se,xe,be,Se,Ne,Ve,tt;const Ye=l.isCompressedTexture?l.mipmaps[j]:l.image;if(w!==null)re=w.max.x-w.min.x,fe=w.max.y-w.min.y,se=w.isBox3?w.max.z-w.min.z:1,xe=w.min.x,be=w.min.y,Se=w.isBox3?w.min.z:0;else{const St=Math.pow(2,-A);re=Math.floor(Ye.width*St),fe=Math.floor(Ye.height*St),l.isDataArrayTexture?se=Ye.depth:l.isData3DTexture?se=Math.floor(Ye.depth*St):se=1,xe=0,be=0,Se=0}y!==null?(Ne=y.x,Ve=y.y,tt=y.z):(Ne=0,Ve=0,tt=0);const We=me.convert(T.format),Me=me.convert(T.type);let Qe;T.isData3DTexture?(ye.setTexture3D(T,0),Qe=_.TEXTURE_3D):T.isDataArrayTexture||T.isCompressedArrayTexture?(ye.setTexture2DArray(T,0),Qe=_.TEXTURE_2D_ARRAY):(ye.setTexture2D(T,0),Qe=_.TEXTURE_2D),_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,T.flipY),_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),_.pixelStorei(_.UNPACK_ALIGNMENT,T.unpackAlignment);const Fe=_.getParameter(_.UNPACK_ROW_LENGTH),mt=_.getParameter(_.UNPACK_IMAGE_HEIGHT),Ht=_.getParameter(_.UNPACK_SKIP_PIXELS),gt=_.getParameter(_.UNPACK_SKIP_ROWS),$t=_.getParameter(_.UNPACK_SKIP_IMAGES);_.pixelStorei(_.UNPACK_ROW_LENGTH,Ye.width),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,Ye.height),_.pixelStorei(_.UNPACK_SKIP_PIXELS,xe),_.pixelStorei(_.UNPACK_SKIP_ROWS,be),_.pixelStorei(_.UNPACK_SKIP_IMAGES,Se);const Je=l.isDataArrayTexture||l.isData3DTexture,Et=T.isDataArrayTexture||T.isData3DTexture;if(l.isDepthTexture){const St=pe.get(l),ft=pe.get(T),ut=pe.get(St.__renderTarget),Pn=pe.get(ft.__renderTarget);ue.bindFramebuffer(_.READ_FRAMEBUFFER,ut.__webglFramebuffer),ue.bindFramebuffer(_.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let Lt=0;Lt<se;Lt++)Je&&(_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,pe.get(l).__webglTexture,A,Se+Lt),_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,pe.get(T).__webglTexture,j,tt+Lt)),_.blitFramebuffer(xe,be,re,fe,Ne,Ve,re,fe,_.DEPTH_BUFFER_BIT,_.NEAREST);ue.bindFramebuffer(_.READ_FRAMEBUFFER,null),ue.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else if(A!==0||l.isRenderTargetTexture||pe.has(l)){const St=pe.get(l),ft=pe.get(T);ue.bindFramebuffer(_.READ_FRAMEBUFFER,qa),ue.bindFramebuffer(_.DRAW_FRAMEBUFFER,Za);for(let ut=0;ut<se;ut++)Je?_.framebufferTextureLayer(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,St.__webglTexture,A,Se+ut):_.framebufferTexture2D(_.READ_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,St.__webglTexture,A),Et?_.framebufferTextureLayer(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,ft.__webglTexture,j,tt+ut):_.framebufferTexture2D(_.DRAW_FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_2D,ft.__webglTexture,j),A!==0?_.blitFramebuffer(xe,be,re,fe,Ne,Ve,re,fe,_.COLOR_BUFFER_BIT,_.NEAREST):Et?_.copyTexSubImage3D(Qe,j,Ne,Ve,tt+ut,xe,be,re,fe):_.copyTexSubImage2D(Qe,j,Ne,Ve,xe,be,re,fe);ue.bindFramebuffer(_.READ_FRAMEBUFFER,null),ue.bindFramebuffer(_.DRAW_FRAMEBUFFER,null)}else Et?l.isDataTexture||l.isData3DTexture?_.texSubImage3D(Qe,j,Ne,Ve,tt,re,fe,se,We,Me,Ye.data):T.isCompressedArrayTexture?_.compressedTexSubImage3D(Qe,j,Ne,Ve,tt,re,fe,se,We,Ye.data):_.texSubImage3D(Qe,j,Ne,Ve,tt,re,fe,se,We,Me,Ye):l.isDataTexture?_.texSubImage2D(_.TEXTURE_2D,j,Ne,Ve,re,fe,We,Me,Ye.data):l.isCompressedTexture?_.compressedTexSubImage2D(_.TEXTURE_2D,j,Ne,Ve,Ye.width,Ye.height,We,Ye.data):_.texSubImage2D(_.TEXTURE_2D,j,Ne,Ve,re,fe,We,Me,Ye);_.pixelStorei(_.UNPACK_ROW_LENGTH,Fe),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,mt),_.pixelStorei(_.UNPACK_SKIP_PIXELS,Ht),_.pixelStorei(_.UNPACK_SKIP_ROWS,gt),_.pixelStorei(_.UNPACK_SKIP_IMAGES,$t),j===0&&T.generateMipmaps&&_.generateMipmap(Qe),ue.unbindTexture()},this.initRenderTarget=function(l){pe.get(l).__webglFramebuffer===void 0&&ye.setupRenderTarget(l)},this.initTexture=function(l){l.isCubeTexture?ye.setTextureCube(l,0):l.isData3DTexture?ye.setTexture3D(l,0):l.isDataArrayTexture||l.isCompressedArrayTexture?ye.setTexture2DArray(l,0):ye.setTexture2D(l,0),ue.unbindTexture()},this.resetState=function(){D=0,I=0,z=null,ue.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(n),t.unpackColorSpace=at._getUnpackColorSpace()}}const Qt=new Le;function Mt(e,n,t,i,s,r){const d=2*Math.PI*s/4,c=Math.max(r-2*s,0),x=Math.PI/4;Qt.copy(n),Qt[i]=0,Qt.normalize();const m=.5*d/(d+c),U=1-Qt.angleTo(e)/x;return Math.sign(Qt[t])===1?U*m:c/(d+c)+m+m*(1-U)}class ka extends Rn{constructor(n=1,t=1,i=1,s=2,r=.1){const d=s*2+1;if(r=Math.min(n/2,t/2,i/2,r),super(1,1,1,d,d,d),this.type="RoundedBoxGeometry",this.parameters={width:n,height:t,depth:i,segments:s,radius:r},d===1)return;const c=this.toNonIndexed();this.index=null,this.attributes.position=c.attributes.position,this.attributes.normal=c.attributes.normal,this.attributes.uv=c.attributes.uv;const x=new Le,m=new Le,U=new Le(n,t,i).divideScalar(2).subScalar(r),E=this.attributes.position.array,M=this.attributes.normal.array,S=this.attributes.uv.array,O=E.length/6,C=new Le,f=.5/d;for(let a=0,P=0;a<E.length;a+=3,P+=2)switch(x.fromArray(E,a),m.copy(x),m.x-=Math.sign(m.x)*f,m.y-=Math.sign(m.y)*f,m.z-=Math.sign(m.z)*f,m.normalize(),E[a+0]=U.x*Math.sign(x.x)+m.x*r,E[a+1]=U.y*Math.sign(x.y)+m.y*r,E[a+2]=U.z*Math.sign(x.z)+m.z*r,M[a+0]=m.x,M[a+1]=m.y,M[a+2]=m.z,Math.floor(a/O)){case 0:C.set(1,0,0),S[P+0]=Mt(C,m,"z","y",r,i),S[P+1]=1-Mt(C,m,"y","z",r,t);break;case 1:C.set(-1,0,0),S[P+0]=1-Mt(C,m,"z","y",r,i),S[P+1]=1-Mt(C,m,"y","z",r,t);break;case 2:C.set(0,1,0),S[P+0]=1-Mt(C,m,"x","z",r,n),S[P+1]=Mt(C,m,"z","x",r,i);break;case 3:C.set(0,-1,0),S[P+0]=1-Mt(C,m,"x","z",r,n),S[P+1]=1-Mt(C,m,"z","x",r,i);break;case 4:C.set(0,0,1),S[P+0]=1-Mt(C,m,"x","y",r,n),S[P+1]=1-Mt(C,m,"y","x",r,t);break;case 5:C.set(0,0,-1),S[P+0]=Mt(C,m,"x","y",r,n),S[P+1]=1-Mt(C,m,"y","x",r,t);break}}static fromJSON(n){return new ka(n.width,n.height,n.depth,n.segments,n.radius)}}const ga={type:"change"},ti={type:"start"},za={type:"end"},hn=new So,va=new Ta,cd=Math.cos(70*Mo.DEG2RAD),rt=new Le,pt=2*Math.PI,ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vn=1e-6;class Ad extends Eo{constructor(n,t=null){super(n,t),this.state=ke.NONE,this.target=new Le,this.cursor=new Le,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Yt.ROTATE,MIDDLE:Yt.DOLLY,RIGHT:Yt.PAN},this.touches={ONE:Wt.ROTATE,TWO:Wt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new Le,this._lastQuaternion=new Wi,this._lastTargetPosition=new Le,this._quat=new Wi().setFromUnitVectors(n.up,new Le(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xi,this._sphericalDelta=new Xi,this._scale=1,this._panOffset=new Le,this._rotateStart=new qe,this._rotateEnd=new qe,this._rotateDelta=new qe,this._panStart=new qe,this._panEnd=new qe,this._panDelta=new qe,this._dollyStart=new qe,this._dollyEnd=new qe,this._dollyDelta=new qe,this._dollyDirection=new Le,this._mouse=new qe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=dd.bind(this),this._onPointerDown=fd.bind(this),this._onPointerUp=ud.bind(this),this._onContextMenu=Ed.bind(this),this._onMouseWheel=_d.bind(this),this._onKeyDown=md.bind(this),this._onTouchStart=gd.bind(this),this._onTouchMove=vd.bind(this),this._onMouseDown=pd.bind(this),this._onMouseMove=hd.bind(this),this._interceptControlDown=Sd.bind(this),this._interceptControlUp=Md.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(n){super.connect(n),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(n){n.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=n}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ga),this.update(),this.state=ke.NONE}update(n=null){const t=this.object.position;rt.copy(t).sub(this.target),rt.applyQuaternion(this._quat),this._spherical.setFromVector3(rt),this.autoRotate&&this.state===ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(n)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=pt:i>Math.PI&&(i-=pt),s<-Math.PI?s+=pt:s>Math.PI&&(s-=pt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const d=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=d!=this._spherical.radius}if(rt.setFromSpherical(this._spherical),rt.applyQuaternion(this._quatInverse),t.copy(this.target).add(rt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let d=null;if(this.object.isPerspectiveCamera){const c=rt.length();d=this._clampDistance(c*this._scale);const x=c-d;this.object.position.addScaledVector(this._dollyDirection,x),this.object.updateMatrixWorld(),r=!!x}else if(this.object.isOrthographicCamera){const c=new Le(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const x=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=x!==this.object.zoom;const m=new Le(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(c),this.object.updateMatrixWorld(),d=rt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;d!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(d).add(this.object.position):(hn.origin.copy(this.object.position),hn.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(hn.direction))<cd?this.object.lookAt(this.target):(va.setFromNormalAndCoplanarPoint(this.object.up,this.target),hn.intersectPlane(va,this.target))))}else if(this.object.isOrthographicCamera){const d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),d!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Vn||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vn||this._lastTargetPosition.distanceToSquared(this.target)>Vn?(this.dispatchEvent(ga),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(n){return n!==null?pt/60*this.autoRotateSpeed*n:pt/60/60*this.autoRotateSpeed}_getZoomScale(n){const t=Math.abs(n*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(n){this._sphericalDelta.theta-=n}_rotateUp(n){this._sphericalDelta.phi-=n}_panLeft(n,t){rt.setFromMatrixColumn(t,0),rt.multiplyScalar(-n),this._panOffset.add(rt)}_panUp(n,t){this.screenSpacePanning===!0?rt.setFromMatrixColumn(t,1):(rt.setFromMatrixColumn(t,0),rt.crossVectors(this.object.up,rt)),rt.multiplyScalar(n),this._panOffset.add(rt)}_pan(n,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;rt.copy(s).sub(this.target);let r=rt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*n*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(n*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(n){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=n:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(n,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=n-i.left,r=t-i.top,d=i.width,c=i.height;this._mouse.x=s/d*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(n){return Math.max(this.minDistance,Math.min(this.maxDistance,n))}_handleMouseDownRotate(n){this._rotateStart.set(n.clientX,n.clientY)}_handleMouseDownDolly(n){this._updateZoomParameters(n.clientX,n.clientX),this._dollyStart.set(n.clientX,n.clientY)}_handleMouseDownPan(n){this._panStart.set(n.clientX,n.clientY)}_handleMouseMoveRotate(n){this._rotateEnd.set(n.clientX,n.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(pt*this._rotateDelta.x/t.clientHeight),this._rotateUp(pt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(n){this._dollyEnd.set(n.clientX,n.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(n){this._panEnd.set(n.clientX,n.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(n){this._updateZoomParameters(n.clientX,n.clientY),n.deltaY<0?this._dollyIn(this._getZoomScale(n.deltaY)):n.deltaY>0&&this._dollyOut(this._getZoomScale(n.deltaY)),this.update()}_handleKeyDown(n){let t=!1;switch(n.code){case this.keys.UP:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateUp(-pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:n.ctrlKey||n.metaKey||n.shiftKey?this.enableRotate&&this._rotateLeft(-pt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(n.preventDefault(),this.update())}_handleTouchStartRotate(n){if(this._pointers.length===1)this._rotateStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(n){if(this._pointers.length===1)this._panStart.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,s=n.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enablePan&&this._handleTouchStartPan(n)}_handleTouchStartDollyRotate(n){this.enableZoom&&this._handleTouchStartDolly(n),this.enableRotate&&this._handleTouchStartRotate(n)}_handleTouchMoveRotate(n){if(this._pointers.length==1)this._rotateEnd.set(n.pageX,n.pageY);else{const i=this._getSecondPointerPosition(n),s=.5*(n.pageX+i.x),r=.5*(n.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(pt*this._rotateDelta.x/t.clientHeight),this._rotateUp(pt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(n){if(this._pointers.length===1)this._panEnd.set(n.pageX,n.pageY);else{const t=this._getSecondPointerPosition(n),i=.5*(n.pageX+t.x),s=.5*(n.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(n){const t=this._getSecondPointerPosition(n),i=n.pageX-t.x,s=n.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const d=(n.pageX+t.x)*.5,c=(n.pageY+t.y)*.5;this._updateZoomParameters(d,c)}_handleTouchMoveDollyPan(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enablePan&&this._handleTouchMovePan(n)}_handleTouchMoveDollyRotate(n){this.enableZoom&&this._handleTouchMoveDolly(n),this.enableRotate&&this._handleTouchMoveRotate(n)}_addPointer(n){this._pointers.push(n.pointerId)}_removePointer(n){delete this._pointerPositions[n.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(n){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==n.pointerId)return!0;return!1}_trackPointer(n){let t=this._pointerPositions[n.pointerId];t===void 0&&(t=new qe,this._pointerPositions[n.pointerId]=t),t.set(n.pageX,n.pageY)}_getSecondPointerPosition(n){const t=n.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(n){const t=n.deltaMode,i={clientX:n.clientX,clientY:n.clientY,deltaY:n.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return n.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function fd(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e)))}function dd(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function ud(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(za),this.state=ke.NONE;break;case 1:const n=this._pointers[0],t=this._pointerPositions[n];this._onTouchStart({pointerId:n,pageX:t.x,pageY:t.y});break}}function pd(e){let n;switch(e.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case Yt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=ke.DOLLY;break;case Yt.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ke.ROTATE}break;case Yt.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=ke.PAN}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(ti)}function hd(e){switch(this.state){case ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function _d(e){this.enabled===!1||this.enableZoom===!1||this.state!==ke.NONE||(e.preventDefault(),this.dispatchEvent(ti),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(za))}function md(e){this.enabled!==!1&&this._handleKeyDown(e)}function gd(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case Wt.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=ke.TOUCH_ROTATE;break;case Wt.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=ke.TOUCH_PAN;break;default:this.state=ke.NONE}break;case 2:switch(this.touches.TWO){case Wt.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=ke.TOUCH_DOLLY_PAN;break;case Wt.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=ke.TOUCH_DOLLY_ROTATE;break;default:this.state=ke.NONE}break;default:this.state=ke.NONE}this.state!==ke.NONE&&this.dispatchEvent(ti)}function vd(e){switch(this._trackPointer(e),this.state){case ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=ke.NONE}}function Ed(e){this.enabled!==!1&&e.preventDefault()}function Sd(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Md(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Rd extends To{constructor(){super();const n=new Rn;n.deleteAttribute("uv");const t=new Yi({side:vt}),i=new Yi,s=new xo(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new dt(n,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const d=new Ao(n,i,6),c=new Ro;c.position.set(-10.906,2.009,1.846),c.rotation.set(0,-.195,0),c.scale.set(2.328,7.905,4.651),c.updateMatrix(),d.setMatrixAt(0,c.matrix),c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),c.updateMatrix(),d.setMatrixAt(1,c.matrix),c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),c.updateMatrix(),d.setMatrixAt(2,c.matrix),c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),c.updateMatrix(),d.setMatrixAt(3,c.matrix),c.position.set(2.291,-.756,-2.621),c.rotation.set(0,-.286,0),c.scale.set(1.546,1.552,1.496),c.updateMatrix(),d.setMatrixAt(4,c.matrix),c.position.set(-2.193,-.369,-5.547),c.rotation.set(0,.516,0),c.scale.set(3.875,3.487,2.986),c.updateMatrix(),d.setMatrixAt(5,c.matrix),this.add(d);const x=new dt(n,Vt(50));x.position.set(-16.116,14.37,8.208),x.scale.set(.1,2.428,2.739),this.add(x);const m=new dt(n,Vt(50));m.position.set(-16.109,18.021,-8.207),m.scale.set(.1,2.425,2.751),this.add(m);const U=new dt(n,Vt(17));U.position.set(14.904,12.198,-1.832),U.scale.set(.15,4.265,6.331),this.add(U);const E=new dt(n,Vt(43));E.position.set(-.462,8.89,14.52),E.scale.set(4.38,5.441,.088),this.add(E);const M=new dt(n,Vt(20));M.position.set(3.235,11.486,-12.541),M.scale.set(2.5,2,.1),this.add(M);const S=new dt(n,Vt(100));S.position.set(0,20,0),S.scale.set(1,.1,1),this.add(S)}dispose(){const n=new Set;this.traverse(t=>{t.isMesh&&(n.add(t.geometry),n.add(t.material))});for(const t of n)t.dispose()}}function Vt(e){return new bo({color:0,emissive:16777215,emissiveIntensity:e})}export{Ad as O,$i as P,ka as R,xd as W,Rd as a};
