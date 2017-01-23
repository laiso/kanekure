/*!
 * jQuery.bgSwitcher
 *
 * @version    0.3.4-beta
 * @author     Hiroshi Hoaki <rewish.org@gmail.com>
 * @copyright  2010-2012 Hiroshi Hoaki
 * @license    http://rewish.org/license/mit The MIT License
 * @link       http://rewish.org/javascript/jquery_bg_switcher
 */
(function(a){a.fn.bgSwitcher=function(b){return this.each(function(){a(this).data("bgSwitcher",new a.bgSwitcher(this,b))})};a.bgSwitcher=function(c,b){this.initialize.apply(this,arguments)};a.bgSwitcher.defaultOptions={images:null,interval:5000,autoStart:true,duration:1000,easing:"linear",loop:true,random:false,resize:true,switchHandler:function(){this.node.fadeOut(this.options.duration,this.options.easing)}};a.bgSwitcher.prototype={initialize:function(c,b){this.node=a(c);this.setOptions(b);this.preload();this.index=-1;this.next=this.options.random?this.random:this.order;this.next();this.normalSwitch(this.options.images[this.index]);if(this.options.duration>0){this.initCloneNode();this.doSwitch=this.fadeSwitch}else{this.doSwitch=this.normalSwitch}if(this.options.autoStart){this.start()}},setOptions:function(b){this.options=a.extend(true,{},a.bgSwitcher.defaultOptions,b);if(!(this.options.images instanceof Array)){throw new Error("options.images is invalid.")}if(typeof this.options.images[0]==="string"&&typeof this.options.images[1]==="number"&&typeof this.options.images[2]==="number"){this.sequence()}if(this.options.images.length<=1){throw new Error("Image must be at least more than two.")}if(this.options.fadeSpeed!=null){this.options.duration=this.options.fadeSpeed}},start:function(){if(this.timeId){return}var b=this;this.timeId=setInterval(function(){b.next();b.doSwitch(b.options.images[b.index])},b.options.interval)},stop:function(){if(this.timeId){clearInterval(this.timeId);this.timeId=null}},toggle:function(){if(this.timeId){this.stop()}else{this.start()}},reset:function(){this.index=0;this.stop();this.doSwitch(this.options.images[this.index]);this.start()},order:function(){var b=this.options.images.length;++this.index;if(this.index===b){this.index=0}if(!this.options.loop&&this.index>=b-1){this.stop()}},random:function(){var c=this.options.images.length,b=this.index;while(this.index===b){b=Math.floor(Math.random()*c)}this.index=b},sequence:function(){var d=[],e=this.options.images[0],c=this.options.images[1],b=this.options.images[2];do{d.push(e.replace(/\.\w+$/,c+"$&"))}while(++c<=b);this.options.images=d},preload:function(){if(this.loadedImages==null){this.loadedImages={}}var c=0,b=this.options.images,d=b.length,e;for(;c<d;++c){e=b[c];this.loadedImages[e]=new Image;this.loadedImages[e].src=e}},initCloneNode:function(){var c=this.node[0].tagName.toLowerCase();if(c==="html"){throw new Error("FadeOut the HTML not allowed.")}if(c==="body"){this.initRootNode();c="div"}var e=this.node.css("zIndex"),d=this.node.offset();if(isNaN(e)){e=1000;this.node.css({zIndex:e})}var b=[this.node.css("backgroundPositionX"),this.node.css("backgroundPositionY")].join(" ");if(b===" "){b=this.node.css("backgroundPosition")}this.cloneNode=a("<"+c+">");this.cloneNode.css({display:"block",position:"absolute",zIndex:e-2,top:d.top,left:d.left,width:this.node.innerWidth(),height:this.node.innerHeight(),backgroundImage:this.node.css("backgroundImage"),backgroundPosition:b,backgroundRepeat:this.node.css("backgroundRepeat"),backgroundColor:this.node.css("backgroundColor"),backgroundAttachment:this.node.css("backgroundAttachment")});this.origNode=this.node;this.origNode.css({position:"relative",background:"none"});this.node=this.cloneNode.clone();this.node.css("zIndex",e-1);this.origNode.after(this.cloneNode,this.node);if(this.options.resize){a(window).bind("resize.bgSwitcher",a.proxy(this.resizeHandler,this))}},initRootNode:function(){var b,d,f,e,c,g;b=a("> *",this.node).not("script");b.find("script").remove();b=b.wrapAll("<div>").parent();d=this.node;f={backgroundImage:d.css("backgroundImage"),backgroundPosition:d.css("backgroundPosition")||[d.css("backgroundPositionX"),d.css("backgroundPositionY")].join(" "),backgroundRepeat:d.css("backgroundRepeat"),backgroundColor:d.css("backgroundColor"),backgroundAttachment:d.css("backgroundAttachment")};e=["Top","Bottom","Right","Left"];for(c=0;c<4;++c){g="padding"+e[c];f[g]=+d.css("margin"+e[c]).replace(/\D/g,"");f[g]+=+d.css("padding"+e[c]).replace(/\D/g,"");f[g]+="px"}b.css(f);d.css({margin:0,padding:0,background:"none"});this.node=b;this.options.resize=true},resizeHandler:function(){var c=this.origNode.offset(),b={width:this.origNode.innerWidth(),top:c.top,left:c.left};this.node.css(b);this.cloneNode.css(b)},normalSwitch:function(b){this.node.css("backgroundImage","url("+b+")")},fadeSwitch:function(c){var b=this;this.node.stop(true,true);this.node.css("backgroundImage",this.cloneNode.css("backgroundImage"));this.node.show(0,function(){b.cloneNode.css("backgroundImage","url("+c+")");b.options.switchHandler.call(b)})}}})(jQuery);



var height_loop = ()=>{
  setTimeout(()=>{
    $('#all').css({'min-height': $(window).height()});
    height_loop();
  } ,200)
}
  
$(()=>{
  $('#all').css({'min-height': $(window).height()})
  height_loop();
  var images = JSON.parse($('#images').text());
  if(images.length > 0){
    if(images.length == 1){
      images = [images[0], images[0]]
    }
    $('body').bgSwitcher({images: images, interval: 5000})
  }
  $('#main').css({'color': $('#font_color').text()});
});
