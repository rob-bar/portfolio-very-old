// JavaScript Document Cufon
/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 */
var Cufon=(function(){
    var M=function(){
        return M.replace.apply(null,arguments)
        };var X=M.DOM={
        ready:(function(){
            var c=false,e={
                loaded:1,
                complete:1
            };var b=[],d=function(){
                if(c){
                    return
                }c=true;for(var f;f=b.shift();f()){}
                };if(document.addEventListener){
                document.addEventListener("DOMContentLoaded",d,false);window.addEventListener("pageshow",d,false)
                }if(!window.opera&&document.readyState){
                (function(){
                    e[document.readyState]?d():setTimeout(arguments.callee,10)
                    })()
                }if(document.readyState&&document.createStyleSheet){
                (function(){
                    try{
                        document.body.doScroll("left");d()
                        }catch(f){
                        setTimeout(arguments.callee,1)
                        }
                    })()
                }Q(window,"load",d);return function(f){
                if(!arguments.length){
                    d()
                    }else{
                    c?f():b.push(f)
                    }
                }
            })(),
        root:function(){
            return document.documentElement||document.body
            }
        };var N=M.CSS={
        Size:function(c,b){
            this.value=parseFloat(c);this.unit=String(c).match(/[a-z%]*$/)[0]||"px";this.convert=function(d){
                return d/b*this.value
                };this.convertFrom=function(d){
                return d/this.value*b
                };this.toString=function(){
                return this.value+this.unit
                }
            },
        addClass:function(c,b){
            c.className=(c.className&&" ")+b;return c
            },
        color:J(function(c){
            var b={};b.color=c.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(e,d,f){
                b.opacity=parseFloat(f);return"rgb("+d+")"
                });return b
            }),
        fontStretch:J(function(b){
            if(typeof b=="number"){
                return b
                }if(/%$/.test(b)){
                return parseFloat(b)/100
                }return{
                "ultra-condensed":0.5,
                "extra-condensed":0.625,
                condensed:0.75,
                "semi-condensed":0.875,
                "semi-expanded":1.125,
                expanded:1.25,
                "extra-expanded":1.5,
                "ultra-expanded":2
            }[b]||1
            }),
        getStyle:function(c){
            var b=document.defaultView;if(b&&b.getComputedStyle){
                return new A(b.getComputedStyle(c,null))
                }if(c.currentStyle){
                return new A(c.currentStyle)
                }return new A(c.style)
            },
        gradient:J(function(f){
            var g={
                id:f,
                type:f.match(/^-([a-z]+)-gradient\(/)[1],
                stops:[]
            },c=f.substr(f.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var e=0,b=c.length,d;e<b;++e){
                d=c[e].split("=",2).reverse();g.stops.push([d[1]||e/(b-1),d[0]])
                }return g
            }),
        quotedList:J(function(e){
            var d=[],c=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,b;while(b=c.exec(e)){
                d.push(b[3]||b[1])
                }return d
            }),
        recognizesMedia:J(function(h){
            var f=document.createElement("style"),d,c,b;f.type="text/css";f.media=h;try{
                f.appendChild(document.createTextNode("/**/"))
                }catch(g){}c=G("head")[0];c.insertBefore(f,c.firstChild);d=(f.sheet||f.styleSheet);b=d&&!d.disabled;c.removeChild(f);return b
            }),
        removeClass:function(d,c){
            var b=RegExp("(?:^|\\s+)"+c+"(?=\\s|$)","g");d.className=d.className.replace(b,"");return d
            },
        supports:function(d,c){
            var b=document.createElement("span").style;if(b[d]===undefined){
                return false
                }b[d]=c;return b[d]===c
            },
        textAlign:function(e,d,b,c){
            if(d.get("textAlign")=="right"){
                if(b>0){
                    e=" "+e
                    }
                }else{
                if(b<c-1){
                    e+=" "
                    }
                }return e
            },
        textDecoration:function(g,f){
            if(!f){
                f=this.getStyle(g)
                }var c={
                underline:null,
                overline:null,
                "line-through":null
            };for(var b=g;b.parentNode&&b.parentNode.nodeType==1;){
                var e=true;for(var d in c){
                    if(!K(c,d)||c[d]){
                        continue
                    }if(f.get("textDecoration").indexOf(d)!=-1){
                        c[d]=f.get("color")
                        }e=false
                    }if(e){
                    break
                }f=this.getStyle(b=b.parentNode)
                }return c
            },
        textShadow:J(function(f){
            if(f=="none"){
                return null
                }var e=[],g={},b,c=0;var d=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(b=d.exec(f)){
                if(b[0]==","){
                    e.push(g);g={};c=0
                    }else{
                    if(b[1]){
                        g.color=b[1]
                        }else{
                        g[["offX","offY","blur"][c++]]=b[2]
                        }
                    }
                }e.push(g);return e
            }),
        textTransform:function(c,b){
            return c[{
                uppercase:"toUpperCase",
                lowercase:"toLowerCase"
            }[b.get("textTransform")]||"toString"]()
            },
        whiteSpace:(function(){
            var b={
                inline:1,
                "inline-block":1,
                "run-in":1
            };return function(e,c,d){
                if(b[c.get("display")]){
                    return e
                    }if(!d.previousSibling){
                    e=e.replace(/^\s+/,"")
                    }if(!d.nextSibling){
                    e=e.replace(/\s+$/,"")
                    }return e
                }
            })()
        };N.ready=(function(){
        var b=!N.recognizesMedia("all"),e=false;var d=[],h=function(){
            b=true;for(var k;k=d.shift();k()){}
            };var i=G("link"),j=G("style");function c(k){
            return k.disabled||g(k.sheet,k.media||"screen")
            }function g(n,q){
            if(!N.recognizesMedia(q||"all")){
                return true
                }if(!n||n.disabled){
                return false
                }try{
                var r=n.cssRules,p;if(r){
                    search:for(var m=0,k=r.length;p=r[m],m<k;++m){
                        switch(p.type){
                            case 2:break;case 3:if(!g(p.styleSheet,p.media.mediaText)){
                                return false
                                }break;default:break search
                                }
                        }
                    }
                }catch(o){}return true
            }function f(){
            if(document.createStyleSheet){
                return true
                }var l,k;for(k=0;l=i[k];++k){
                if(l.rel.toLowerCase()=="stylesheet"&&!c(l)){
                    return false
                    }
                }for(k=0;l=j[k];++k){
                if(!c(l)){
                    return false
                    }
                }return true
            }X.ready(function(){
            if(!e){
                e=N.getStyle(document.body).isUsable()
                }if(b||(e&&f())){
                h()
                }else{
                setTimeout(arguments.callee,10)
                }
            });return function(k){
            if(b){
                k()
                }else{
                d.push(k)
                }
            }
        })();function S(c){
        var b=this.face=c.face;this.glyphs=c.glyphs;this.w=c.w;this.baseSize=parseInt(b["units-per-em"],10);this.family=b["font-family"].toLowerCase();this.weight=b["font-weight"];this.style=b["font-style"]||"normal";this.viewBox=(function(){
            var e=b.bbox.split(/\s+/);var d={
                minX:parseInt(e[0],10),
                minY:parseInt(e[1],10),
                maxX:parseInt(e[2],10),
                maxY:parseInt(e[3],10)
                };d.width=d.maxX-d.minX;d.height=d.maxY-d.minY;d.toString=function(){
                return[this.minX,this.minY,this.width,this.height].join(" ")
                };return d
            })();this.ascent=-parseInt(b.ascent,10);this.descent=-parseInt(b.descent,10);this.height=-this.ascent+this.descent
        }function F(){
        var c={},b={
            oblique:"italic",
            italic:"oblique"
        };this.add=function(d){
            (c[d.style]||(c[d.style]={}))[d.weight]=d
            };this.get=function(h,i){
            var g=c[h]||c[b[h]]||c.normal||c.italic||c.oblique;if(!g){
                return null
                }i={
                normal:400,
                bold:700
            }[i]||parseInt(i,10);if(g[i]){
                return g[i]
                }var e={
                1:1,
                99:0
            }[i%100],k=[],f,d;if(e===undefined){
                e=i>400
                }if(i==500){
                i=400
                }for(var j in g){
                if(!K(g,j)){
                    continue
                }j=parseInt(j,10);if(!f||j<f){
                    f=j
                    }if(!d||j>d){
                    d=j
                    }k.push(j)
                }if(i<f){
                i=f
                }if(i>d){
                i=d
                }k.sort(function(m,l){
                return(e?(m>i&&l>i)?m<l:m>l:(m<i&&l<i)?m>l:m<l)?-1:1
                });return g[k[0]]
            }
        }function R(){
        function d(f,g){
            if(f.contains){
                return f.contains(g)
                }return f.compareDocumentPosition(g)&16
            }function b(g){
            var f=g.relatedTarget;if(!f||d(this,f)){
                return
            }c(this)
            }function e(f){
            c(this)
            }function c(f){
            setTimeout(function(){
                M.replace(f,D.get(f).options,true)
                },10)
            }this.attach=function(f){
            if(f.onmouseenter===undefined){
                Q(f,"mouseover",b);Q(f,"mouseout",b)
                }else{
                Q(f,"mouseenter",e);Q(f,"mouseleave",e)
                }
            }
        }function U(){
        var c=[],d={};function b(h){
            var e=[],g;for(var f=0;g=h[f];++f){
                e[f]=c[d[g]]
                }return e
            }this.add=function(f,e){
            d[f]=c.push(e)-1
            };this.repeat=function(){
            var e=arguments.length?b(arguments):c,f;for(var g=0;f=e[g++];){
                M.replace(f[0],f[1],true)
                }
            }
        }function a(){
        var d={},b=0;function c(e){
            return e.cufid||(e.cufid=++b)
            }this.get=function(e){
            var f=c(e);return d[f]||(d[f]={})
            }
        }function A(b){
        var d={},c={};this.extend=function(e){
            for(var f in e){
                if(K(e,f)){
                    d[f]=e[f]
                    }
                }return this
            };this.get=function(e){
            return d[e]!=undefined?d[e]:b[e]
            };this.getSize=function(f,e){
            return c[f]||(c[f]=new N.Size(this.get(f),e))
            };this.isUsable=function(){
            return !!b
            }
        }function Q(c,b,d){
        if(c.addEventListener){
            c.addEventListener(b,d,false)
            }else{
            if(c.attachEvent){
                c.attachEvent("on"+b,function(){
                    return d.call(c,window.event)
                    })
                }
            }
        }function V(c,b){
        var d=D.get(c);if(d.options){
            return c
            }if(b.hover&&b.hoverables[c.nodeName.toLowerCase()]){
            B.attach(c)
            }d.options=b;return c
        }function J(b){
        var c={};return function(d){
            if(!K(c,d)){
                c[d]=b.apply(null,arguments)
                }return c[d]
            }
        }function C(g,f){
        if(!f){
            f=N.getStyle(g)
            }var c=N.quotedList(f.get("fontFamily").toLowerCase()),e;for(var d=0,b=c.length;d<b;++d){
            e=c[d];if(I[e]){
                return I[e].get(f.get("fontStyle"),f.get("fontWeight"))
                }
            }return null
        }function G(b){
        return document.getElementsByTagName(b)
        }function K(c,b){
        return c.hasOwnProperty(b)
        }function H(){
        var b={},d,f;for(var e=0,c=arguments.length;d=arguments[e],e<c;++e){
            for(f in d){
                if(K(d,f)){
                    b[f]=d[f]
                    }
                }
            }return b
        }function O(e,o,c,p,f,d){
        var n=p.separate;if(n=="none"){
            return Z[p.engine].apply(null,arguments)
            }var m=document.createDocumentFragment(),h;var j=o.split(P[n]),b=(n=="words");if(b&&T){
            if(/^\s/.test(o)){
                j.unshift("")
                }if(/\s$/.test(o)){
                j.push("")
                }
            }for(var k=0,g=j.length;k<g;++k){
            h=Z[p.engine](e,b?N.textAlign(j[k],c,k,g):j[k],c,p,f,d,k<g-1);if(h){
                m.appendChild(h)
                }
            }return m
        }function L(c,k){
        var d,b,e,h,g,j;for(e=V(c,k).firstChild;e;e=g){
            h=e.nodeType;g=e.nextSibling;j=false;if(h==1){
                if(!e.firstChild){
                    continue
                }if(!/cufon/.test(e.className)){
                    arguments.callee(e,k);continue
                }else{
                    j=true
                    }
                }else{
                if(h!=3){
                    continue
                }
                }if(!b){
                b=N.getStyle(c).extend(k)
                }if(!d){
                d=C(c,b)
                }if(!d){
                continue
            }if(j){
                Z[k.engine](d,null,b,k,e,c);continue
            }var i=N.whiteSpace(e.data,b,e);if(i===""){
                continue
            }var f=O(d,i,b,k,e,c);if(f){
                e.parentNode.replaceChild(f,e)
                }else{
                e.parentNode.removeChild(e)
                }
            }
        }var T=" ".split(/\s+/).length==0;var D=new a();var B=new R();var Y=new U();var E=false;var Z={},I={},W={
        enableTextDecoration:false,
        engine:null,
        forceHitArea:false,
        hover:false,
        hoverables:{
            a:true
        },
        printable:true,
        selector:(window.Sizzle||(window.jQuery&&function(b){
            return jQuery(b)
            })||(window.dojo&&dojo.query)||(window.$$&&function(b){
            return $$(b)
            })||(window.$&&function(b){
            return $(b)
            })||(document.querySelectorAll&&function(b){
            return document.querySelectorAll(b)
            })||(window.Ext&&Ext.query)||G),
        separate:"words",
        textShadow:"none"
    };var P={
        words:/[^\S\u00a0]+/,
        characters:""
    };M.now=function(){
        X.ready();return M
        };M.refresh=function(){
        Y.repeat.apply(Y,arguments);return M
        };M.registerEngine=function(c,b){
        if(!b){
            return M
            }Z[c]=b;return M.set("engine",c)
        };M.registerFont=function(d){
        var b=new S(d),c=b.family;if(!I[c]){
            I[c]=new F()
            }I[c].add(b);return M.set("fontFamily",'"'+c+'"')
        };M.replace=function(d,c,b){
        c=H(W,c);if(!c.engine){
            return M
            }if(!E){
            N.addClass(X.root(),"cufon-active cufon-loading");N.ready(function(){
                N.removeClass(X.root(),"cufon-loading")
                });E=true
            }if(c.hover){
            c.forceHitArea=true
            }if(typeof c.textShadow=="string"){
            c.textShadow=N.textShadow(c.textShadow)
            }if(typeof c.color=="string"&&/^-/.test(c.color)){
            c.textGradient=N.gradient(c.color)
            }if(!b){
            Y.add(d,arguments)
            }if(d.nodeType||typeof d=="string"){
            d=[d]
            }N.ready(function(){
            for(var f=0,e=d.length;f<e;++f){
                var g=d[f];if(typeof g=="string"){
                    M.replace(c.selector(g),c,true)
                    }else{
                    L(g,c)
                    }
                }
            });return M
        };M.set=function(b,c){
        W[b]=c;return M
        };return M
    })();Cufon.registerEngine("canvas",(function(){
    var B=document.createElement("canvas");if(!B||!B.getContext||!B.getContext.apply){
        return
    }B=null;var A=Cufon.CSS.supports("display","inline-block");var E=!A&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var F=document.createElement("style");F.type="text/css";F.appendChild(document.createTextNode((".cufon-canvas{text-indent:0;}@media screen,projection{.cufon-canvas{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(E?"":"font-size:1px;line-height:1px;")+"}.cufon-canvas .cufon-alt{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(A?".cufon-canvas canvas{position:relative;}":".cufon-canvas canvas{position:absolute;}")+"}@media print{.cufon-canvas{padding:0;}.cufon-canvas canvas{display:none;}.cufon-canvas .cufon-alt{display:inline;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(F);function D(O,H){
        var M=0,L=0;var G=[],N=/([mrvxe])([^a-z]*)/g,J;generate:for(var I=0;J=N.exec(O);++I){
            var K=J[2].split(",");switch(J[1]){
                case"v":G[I]={
                    m:"bezierCurveTo",
                    a:[M+~~K[0],L+~~K[1],M+~~K[2],L+~~K[3],M+=~~K[4],L+=~~K[5]]
                    };break;case"r":G[I]={
                    m:"lineTo",
                    a:[M+=~~K[0],L+=~~K[1]]
                    };break;case"m":G[I]={
                    m:"moveTo",
                    a:[M=~~K[0],L=~~K[1]]
                    };break;case"x":G[I]={
                    m:"closePath"
                };break;case"e":break generate
                    }H[G[I].m].apply(H,G[I].a)
            }return G
        }function C(K,J){
        for(var I=0,H=K.length;I<H;++I){
            var G=K[I];J[G.m].apply(J,G.a)
            }
        }return function(AH,a,z,W,e,AI){
        var I=(a===null);if(I){
            a=e.alt
            }var c=AH.viewBox;var K=z.getSize("fontSize",AH.baseSize);var v=z.get("letterSpacing");v=(v=="normal")?0:K.convertFrom(parseInt(v,10));var d=0,w=0,u=0,Y=0;var b=W.textShadow,s=[];if(b){
            for(var AG=b.length;AG--;){
                var m=b[AG];var r=K.convertFrom(parseFloat(m.offX));var p=K.convertFrom(parseFloat(m.offY));s[AG]=[r,p];if(p<d){
                    d=p
                    }if(r>w){
                    w=r
                    }if(p>u){
                    u=p
                    }if(r<Y){
                    Y=r
                    }
                }
            }var AL=Cufon.CSS.textTransform(a,z).split(""),U;var J=AH.glyphs,X,M,AC;var G=0,Q,h=[];for(var AG=0,AE=0,AB=AL.length;AG<AB;++AG){
            X=J[U=AL[AG]]||AH.missingGlyph;if(!X){
                continue
            }if(M){
                G-=AC=M[U]||0;h[AE-1]-=AC
                }G+=Q=h[AE++]=~~(X.w||AH.w)+v;M=X.k
            }if(Q===undefined){
            return null
            }w+=c.width-Q;Y+=c.minX;var V,L;if(I){
            V=e;L=e.firstChild
            }else{
            V=document.createElement("span");V.className="cufon cufon-canvas";V.alt=a;L=document.createElement("canvas");V.appendChild(L);if(W.printable){
                var AD=document.createElement("span");AD.className="cufon-alt";AD.appendChild(document.createTextNode(a));V.appendChild(AD)
                }
            }var AM=V.style;var o=L.style;var H=K.convert(c.height);var AK=Math.ceil(H);var t=AK/H;var n=t*Cufon.CSS.fontStretch(z.get("fontStretch"));var q=G*n;var AA=Math.ceil(K.convert(q+w-Y));var O=Math.ceil(K.convert(c.height-d+u));L.width=AA;L.height=O;o.width=AA+"px";o.height=O+"px";d+=c.minY;o.top=Math.round(K.convert(d-AH.ascent))+"px";o.left=Math.round(K.convert(Y))+"px";var T=Math.ceil(K.convert(q))+"px";if(A){
            AM.width=T;AM.height=K.convert(AH.height)+"px"
            }else{
            AM.paddingLeft=T;AM.paddingBottom=(K.convert(AH.height)-1)+"px"
            }var AJ=L.getContext("2d"),f=H/c.height;AJ.scale(f,f*t);AJ.translate(-Y,-d);AJ.lineWidth=AH.face["underline-thickness"];AJ.save();function N(i,g){
            AJ.strokeStyle=g;AJ.beginPath();AJ.moveTo(0,i);AJ.lineTo(G,i);AJ.stroke()
            }var P=W.enableTextDecoration?Cufon.CSS.textDecoration(AI,z):{};if(P.underline){
            N(-AH.face["underline-position"],P.underline)
            }if(P.overline){
            N(AH.ascent,P.overline)
            }function AF(){
            AJ.scale(n,1);for(var x=0,k=0,g=AL.length;x<g;++x){
                var y=J[AL[x]]||AH.missingGlyph;if(!y){
                    continue
                }if(y.d){
                    AJ.beginPath();if(y.code){
                        C(y.code,AJ)
                        }else{
                        y.code=D("m"+y.d,AJ)
                        }AJ.fill()
                    }AJ.translate(h[k++],0)
                }AJ.restore()
            }if(b){
            for(var AG=b.length;AG--;){
                var m=b[AG];AJ.save();AJ.fillStyle=m.color;AJ.translate.apply(AJ,s[AG]);AF()
                }
            }var S=W.textGradient;if(S){
            var Z=S.stops,R=AJ.createLinearGradient(0,c.minY,0,c.maxY);for(var AG=0,AB=Z.length;AG<AB;++AG){
                R.addColorStop.apply(R,Z[AG])
                }AJ.fillStyle=R
            }else{
            AJ.fillStyle=z.get("color")
            }AF();if(P["line-through"]){
            N(-AH.descent,P["line-through"])
            }return V
        }
    })());Cufon.registerEngine("vml",(function(){
    if(!document.namespaces){
        return
    }if(document.namespaces.cvml==null){
        document.namespaces.add("cvml","urn:schemas-microsoft-com:vml")
        }var B=document.createElement("cvml:shape");B.style.behavior="url(#default#VML)";if(!B.coordsize){
        return
    }B=null;var F=(document.documentMode||0)<8;document.write(('<style type="text/css">.cufon-vml-canvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}.cufon-vml-canvas{position:absolute;text-align:left;}.cufon-vml{display:inline-block;position:relative;vertical-align:'+(F?"middle":"text-bottom")+";}.cufon-vml .cufon-alt{position:absolute;left:-10000in;font-size:1px;}a .cufon-vml{cursor:pointer}}@media print{.cufon-vml *{display:none;}.cufon-vml .cufon-alt{display:inline;}}</style>").replace(/;/g,"!important;"));function C(G,H){
        return A(G,/(?:em|ex|%)$/i.test(H)?"1em":H)
        }function A(J,K){
        if(/px$/i.test(K)){
            return parseFloat(K)
            }var I=J.style.left,H=J.runtimeStyle.left;J.runtimeStyle.left=J.currentStyle.left;J.style.left=K.replace("%","em");var G=J.style.pixelLeft;J.style.left=I;J.runtimeStyle.left=H;return G
        }var E={};function D(L){
        var M=L.id;if(!E[M]){
            var J=L.stops,K=document.createElement("cvml:fill"),G=[];K.type="gradient";K.angle=180;K.focus="0";K.method="sigma";K.color=J[0][1];for(var I=1,H=J.length-1;I<H;++I){
                G.push(J[I][0]*100+"% "+J[I][1])
                }K.colors=G.join(",");K.color2=J[H][1];E[M]=K
            }return E[M]
        }return function(AI,f,AC,b,n,AJ,AA){
        var J=(f===null);if(J){
            f=n.alt
            }var h=AI.viewBox;var L=AC.computedFontSize||(AC.computedFontSize=new Cufon.CSS.Size(C(AJ,AC.get("fontSize"))+"px",AI.baseSize));var z=AC.computedLSpacing;if(z==undefined){
            z=AC.get("letterSpacing");AC.computedLSpacing=z=(z=="normal")?0:~~L.convertFrom(A(AJ,z))
            }var X,M;if(J){
            X=n;M=n.firstChild
            }else{
            X=document.createElement("span");X.className="cufon cufon-vml";X.alt=f;M=document.createElement("span");M.className="cufon-vml-canvas";X.appendChild(M);if(b.printable){
                var AF=document.createElement("span");AF.className="cufon-alt";AF.appendChild(document.createTextNode(f));X.appendChild(AF)
                }if(!AA){
                X.appendChild(document.createElement("cvml:shape"))
                }
            }var AO=X.style;var u=M.style;var H=L.convert(h.height),AL=Math.ceil(H);var y=AL/H;var s=y*Cufon.CSS.fontStretch(AC.get("fontStretch"));var x=h.minX,w=h.minY;u.height=AL;u.top=Math.round(L.convert(w-AI.ascent));u.left=Math.round(L.convert(x));AO.height=L.convert(AI.height)+"px";var Q=b.enableTextDecoration?Cufon.CSS.textDecoration(AJ,AC):{};var e=AC.get("color");var AN=Cufon.CSS.textTransform(f,AC).split(""),W;var K=AI.glyphs,c,N,AE;var G=0,o=[],v=0,S;var U,g=b.textShadow;for(var AH=0,AG=0,AD=AN.length;AH<AD;++AH){
            c=K[W=AN[AH]]||AI.missingGlyph;if(!c){
                continue
            }if(N){
                G-=AE=N[W]||0;o[AG-1]-=AE
                }G+=S=o[AG++]=~~(c.w||AI.w)+z;N=c.k
            }if(S===undefined){
            return null
            }var V=-x+G+(h.width-S);var AM=L.convert(V*s),AB=Math.round(AM);var r=V+","+h.height,I;var m="r"+r+"ns";var T=b.textGradient&&D(b.textGradient);for(AH=0,AG=0;AH<AD;++AH){
            c=K[AN[AH]]||AI.missingGlyph;if(!c){
                continue
            }if(J){
                U=M.childNodes[AG];while(U.firstChild){
                    U.removeChild(U.firstChild)
                    }
                }else{
                U=document.createElement("cvml:shape");M.appendChild(U)
                }U.stroked="f";U.coordsize=r;U.coordorigin=I=(x-v)+","+w;U.path=(c.d?"m"+c.d+"xe":"")+"m"+I+m;U.fillcolor=e;if(T){
                U.appendChild(T.cloneNode(false))
                }var AK=U.style;AK.width=AB;AK.height=AL;if(g){
                var P=g[0],O=g[1];var a=Cufon.CSS.color(P.color),Y;var q=document.createElement("cvml:shadow");q.on="t";q.color=a.color;q.offset=P.offX+","+P.offY;if(O){
                    Y=Cufon.CSS.color(O.color);q.type="double";q.color2=Y.color;q.offset2=O.offX+","+O.offY
                    }q.opacity=a.opacity||(Y&&Y.opacity)||1;U.appendChild(q)
                }v+=o[AG++]
            }var p=U.nextSibling,R,Z;if(b.forceHitArea){
            if(!p){
                p=document.createElement("cvml:rect");p.stroked="f";p.className="cufon-vml-cover";R=document.createElement("cvml:fill");R.opacity=0;p.appendChild(R);M.appendChild(p)
                }Z=p.style;Z.width=AB;Z.height=AL
            }else{
            if(p){
                M.removeChild(p)
                }
            }AO.width=Math.max(Math.ceil(L.convert(G*s)),0);if(F){
            var t=AC.computedYAdjust;if(t===undefined){
                var d=AC.get("lineHeight");if(d=="normal"){
                    d="1em"
                    }else{
                    if(!isNaN(d)){
                        d+="em"
                        }
                    }AC.computedYAdjust=t=0.5*(A(AJ,d)-parseFloat(AO.height))
                }if(t){
                AO.marginTop=Math.ceil(t)+"px";AO.marginBottom=t+"px"
                }
            }return X
        }
    })());