/*	ColorBox v1.3.0 - a full featured, light-weight, customizable lightbox based on jQuery 1.3 */
(function(A){
    var p="colorbox",n="hover",w=true,R=false,X,l=!A.support.opacity,T=l&&!window.XMLHttpRequest,W="click.colorbox",x="cbox_open",L="cbox_load",s="cbox_complete",K="cbox_cleanup",m="cbox_closed",O="resize.cbox_resize",I="resize.cboxie6 scroll.cboxie6",F,U,V,d,y,i,b,E,c,P,C,f,q,h,k,M,j,H,r,Y,g,e,a,v,N,o,z,Q,u,G,B={
        transition:"elastic",
        speed:350,
        width:R,
        height:R,
        initialWidth:"400",
        initialHeight:"400",
        maxWidth:R,
        maxHeight:R,
        scalePhotos:w,
        scrollbars:w,
        inline:R,
        html:R,
        iframe:R,
        photo:R,
        href:R,
        title:R,
        rel:R,
        opacity:0.9,
        preloading:w,
        current:"image {current} of {total}",
        previous:"previous",
        next:"next",
        close:"close",
        open:R,
        overlayClose:w,
        slideshow:R,
        slideshowAuto:w,
        slideshowSpeed:2500,
        slideshowStart:"start slideshow",
        slideshowStop:"stop slideshow"
    };function J(Z){
        if(Z.keyCode===37){
            Z.preventDefault();H.click()
            }else{
            if(Z.keyCode===39){
                Z.preventDefault();j.click()
                }
            }
        }function D(Z,aa){
        aa=aa==="x"?document.documentElement.clientWidth:document.documentElement.clientHeight;return(typeof Z==="string")?(Z.match(/%/)?(aa/100)*parseInt(Z,10):parseInt(Z,10)):Z
        }function t(Z){
        return Q.photo||Z.match(/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i)
        }function S(){
        for(var Z in Q){
            if(typeof(Q[Z])==="function"){
                Q[Z]=Q[Z].call(o)
                }
            }
        }X=A.fn.colorbox=function(aa,Z){
        if(this.length){
            this.each(function(){
                var ab=A(this).data(p)?A.extend({},A(this).data(p),aa):A.extend({},B,aa);A(this).data(p,ab).addClass("cboxelement")
                })
            }else{
            A(this).data(p,A.extend({},B,aa))
            }A(this).unbind(W).bind(W,function(ac){
            o=this;Q=A(o).data(p);S();A().bind("keydown.cbox_close",function(ad){
                if(ad.keyCode===27){
                    ad.preventDefault();X.close()
                    }
                });if(Q.overlayClose){
                F.css({
                    cursor:"pointer"
                }).one("click",X.close)
                }o.blur();G=Z||R;var ab=Q.rel||o.rel;if(ab&&ab!=="nofollow"){
                c=A(".cboxelement").filter(function(){
                    var ad=A(this).data(p).rel||this.rel;return(ad===ab)
                    });z=c.index(o);if(z<0){
                    c=c.add(o);z=c.length-1
                    }
                }else{
                c=A(o);z=0
                }if(!u){
                u=w;A.event.trigger(x);r.html(Q.close);F.css({
                    opacity:Q.opacity
                    }).show();X.position(D(Q.initialWidth,"x"),D(Q.initialHeight,"y"),0);if(T){
                    P.bind(I,function(){
                        F.css({
                            width:P.width(),
                            height:P.height(),
                            top:P.scrollTop(),
                            left:P.scrollLeft()
                            })
                        }).trigger(I)
                    }
                }X.slideshow();X.load();ac.preventDefault()
            });if(aa&&aa.open){
            A(this).triggerHandler(W)
            }return this
        };X.init=function(){
        function Z(aa){
            return A('<div id="cbox'+aa+'"/>')
            }P=A(window);U=A('<div id="colorbox"/>');F=Z("Overlay").hide();V=Z("Wrapper");d=Z("Content").append(C=Z("LoadedContent").css({
            width:0,
            height:0
        }),f=Z("LoadingOverlay"),q=Z("LoadingGraphic"),h=Z("Title"),k=Z("Current"),M=Z("Slideshow"),j=Z("Next"),H=Z("Previous"),r=Z("Close"));V.append(A("<div/>").append(Z("TopLeft"),y=Z("TopCenter"),Z("TopRight")),A("<div/>").append(i=Z("MiddleLeft"),d,b=Z("MiddleRight")),A("<div/>").append(Z("BottomLeft"),E=Z("BottomCenter"),Z("BottomRight"))).children().children().css({
            "float":"left"
        });A("body").prepend(F,U.append(V));if(l){
            U.addClass("cboxIE");if(T){
                F.css("position","absolute")
                }
            }d.children().addClass(n).mouseover(function(){
            A(this).addClass(n)
            }).mouseout(function(){
            A(this).removeClass(n)
            }).hide();Y=y.height()+E.height()+d.outerHeight(w)-d.height();g=i.width()+b.width()+d.outerWidth(w)-d.width();e=C.outerHeight(w);a=C.outerWidth(w);U.css({
            "padding-bottom":Y,
            "padding-right":g
        }).hide();j.click(X.next);H.click(X.prev);r.click(X.close);d.children().removeClass(n)
        };X.position=function(ac,ab,aa,ad){
        var ae=document.documentElement.clientHeight,ag=ae/2-ab/2,af=document.documentElement.clientWidth/2-ac/2,Z;if(ab>ae){
            ag-=(ab-ae)
            }if(ag<0){
            ag=0
            }if(af<0){
            af=0
            }ag+=P.scrollTop();af+=P.scrollLeft();ac=ac-g;ab=ab-Y;Z=(U.width()===ac&&U.height()===ab)?0:aa;V[0].style.width=V[0].style.height="9999px";function ah(ai){
            y[0].style.width=E[0].style.width=d[0].style.width=ai.style.width;q[0].style.height=f[0].style.height=d[0].style.height=i[0].style.height=b[0].style.height=ai.style.height
            }U.dequeue().animate({
            height:ab,
            width:ac,
            top:ag,
            left:af
        },{
            duration:Z,
            complete:function(){
                ah(this);V[0].style.width=(ac+g)+"px";V[0].style.height=(ab+Y)+"px";if(ad){
                    ad()
                    }
                },
            step:function(){
                ah(this)
                }
            })
        };X.resize=function(ae){
        if(!u){
            return
        }var aa,al,af,ad,ab,ah,am,Z,aj,ac=Q.transition==="none"?0:Q.speed;P.unbind(O);if(!ae){
            aj=setTimeout(function(){
                al=C.children().outerHeight(w);C[0].style.height=al+"px";X.position(C.width()+a+g,al+e+Y,ac)
                },1);return
        }C.remove();C=A(ae);function ai(){
            aa=Q.width?v:v&&v<C.width()?v:C.width();return aa
            }function ag(){
            al=Q.height?N:N&&N<C.height()?N:C.height();return al
            }if(!Q.scrollbars){
            C.css({
                overflow:"hidden"
            })
            }C.hide().appendTo("body").attr({
            id:"cboxLoadedContent"
        }).css({
            width:ai()
            }).css({
            height:ag()
            }).prependTo(d);if(T){
            A("select:not(#colorbox select)").filter(function(){
                return A(this).css("visibility")!=="hidden"
                }).css({
                visibility:"hidden"
            }).one(K,function(){
                A(this).css({
                    visibility:"inherit"
                })
                })
            }Z=A("#cboxPhoto")[0];if(Z&&Q.height){
            af=(al-parseInt(Z.style.height,10))/2;Z.style.marginTop=(af>0?af:0)+"px"
            }function ak(ao){
            var an=aa+a+g,ap=al+e+Y;A().unbind("keydown",J);X.position(an,ap,ao,function(){
                if(!u){
                    return
                }if(l){
                    if(Z){
                        C.fadeIn(100)
                        }U[0].style.removeAttribute("filter")
                    }d.children().show();A("#cboxIframeTemp").after("<iframe id='cboxIframe' name='iframe_"+new Date().getTime()+"' frameborder=0 src='"+(Q.href||o.href)+"' />").remove();f.hide();q.hide();M.hide();if(c.length>1){
                    k.html(Q.current.replace(/\{current\}/,z+1).replace(/\{total\}/,c.length));j.html(Q.next);H.html(Q.previous);A().bind("keydown",J);if(Q.slideshow){
                        M.show()
                        }
                    }else{
                    k.hide();j.hide();H.hide()
                    }h.html(Q.title||o.title);A.event.trigger(s);if(G){
                    G.call(o)
                    }if(Q.transition==="fade"){
                    U.fadeTo(ac,1,function(){
                        if(l){
                            U[0].style.removeAttribute("filter")
                            }
                        })
                    }P.bind(O,function(){
                    X.position(an,ap,0)
                    })
                })
            }if((Q.transition==="fade"&&U.fadeTo(ac,0,function(){
            ak(0)
            }))||ak(ac)){}if(Q.preloading&&c.length>1){
            ad=z>0?c[z-1]:c[c.length-1];ah=z<c.length-1?c[z+1]:c[0];am=A(ah).data(p).href||ah.href;ab=A(ad).data(p).href||ad.href;if(t(am)){
                A("<img />").attr("src",am)
                }if(t(ab)){
                A("<img />").attr("src",ab)
                }
            }
        };X.load=function(){
        var Z,ad,aa,ac,ab=X.resize;o=c[z];Q=A(o).data(p);S();A.event.trigger(L);Z=Q.height?D(Q.height,"y")-e-Y:R;ad=Q.width?D(Q.width,"x")-a-g:R;aa=Q.href||o.href;f.show();q.show();r.show();if(Q.maxHeight){
            N=Q.maxHeight?D(Q.maxHeight,"y")-e-Y:R;Z=Z&&Z<N?Z:N
            }if(Q.maxWidth){
            v=Q.maxWidth?D(Q.maxWidth,"x")-a-g:R;ad=ad&&ad<v?ad:v
            }N=Z;v=ad;if(Q.inline){
            A('<div id="cboxInlineTemp" />').hide().insertBefore(A(aa)[0]).bind(L+" "+K,function(){
                C.children().insertBefore(this);A(this).remove()
                });ab(A(aa).wrapAll("<div/>").parent())
            }else{
            if(Q.iframe){
                ab(A("<div><div id='cboxIframeTemp' /></div>"))
                }else{
                if(Q.html){
                    ab(A("<div/>").html(Q.html))
                    }else{
                    if(t(aa)){
                        ac=new Image();ac.onload=function(){
                            ac.onload=null;if((N||v)&&Q.scalePhotos){
                                var ag=this.width,ae=this.height,ai=0,ah=this,af=function(){
                                    ae+=ae*ai;ag+=ag*ai;ah.height=ae;ah.width=ag
                                    };if(v&&ag>v){
                                    ai=(v-ag)/ag;af()
                                    }if(N&&ae>N){
                                    ai=(N-ae)/ae;af()
                                    }
                                }ab(A("<div />").css({
                                width:this.width,
                                height:this.height
                                }).append(A(this).css({
                                width:this.width,
                                height:this.height,
                                display:"block",
                                margin:"auto",
                                border:0
                            }).attr("id","cboxPhoto")));if(c.length>1){
                                A(this).css({
                                    cursor:"pointer"
                                }).click(X.next)
                                }if(l){
                                this.style.msInterpolationMode="bicubic"
                                }
                            };ac.src=aa
                        }else{
                        A("<div />").load(aa,function(ae,af){
                            if(af==="success"){
                                ab(A(this))
                                }else{
                                ab(A("<p>Request unsuccessful.</p>"))
                                }
                            })
                        }
                    }
                }
            }
        };X.next=function(){
        z=z<c.length-1?z+1:0;X.load()
        };X.prev=function(){
        z=z>0?z-1:c.length-1;X.load()
        };X.slideshow=function(){
        var aa,Z,ab="cboxSlideshow_";M.bind(K,function(){
            clearTimeout(Z);M.unbind(s+" "+L+" click")
            });function ac(){
            M.text(Q.slideshowStop).bind(s,function(){
                Z=setTimeout(X.next,Q.slideshowSpeed)
                }).bind(L,function(){
                clearTimeout(Z)
                }).one("click",function(){
                aa();A(this).removeClass(n)
                });U.removeClass(ab+"off").addClass(ab+"on")
            }aa=function(){
            clearTimeout(Z);M.text(Q.slideshowStart).unbind(s+" "+L).one("click",function(){
                ac();Z=setTimeout(X.next,Q.slideshowSpeed);A(this).removeClass(n)
                });U.removeClass(ab+"on").addClass(ab+"off")
            };if(Q.slideshow&&c.length>1){
            if(Q.slideshowAuto){
                ac()
                }else{
                aa()
                }
            }
        };X.close=function(){
        A.event.trigger(K);u=R;A().unbind("keydown",J).unbind("keydown.cbox_close");P.unbind(O+" "+I);F.css({
            cursor:"auto"
        }).fadeOut("fast");U.stop(w,R).fadeOut("fast",function(){
            C.remove();U.css({
                opacity:1
            });d.children().hide();A.event.trigger(m)
            })
        };X.element=function(){
        return o
        };X.settings=B;A(X.init)
    }(jQuery));