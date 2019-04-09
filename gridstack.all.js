!function(t){if("function"==typeof define&&define.amd)define(["jquery","lodash","exports"],t);else if("undefined"!=typeof exports){try{jQuery=require("jquery")}catch(t){}try{_=require("lodash")}catch(t){}t(jQuery,_,exports)}else t(jQuery,_,window)}(function(u,g,t){var e=function(t,e,i){var o=function(){return console.warn("gridstack.js: Function `"+e+"` is deprecated as of v0.2.5 and has been replaced with `"+i+"`. It will be **completely** removed in v1.0."),t.apply(this,arguments)};return o.prototype=t.prototype,o},d=function(t,e){console.warn("gridstack.js: Option `"+t+"` is deprecated as of v0.2.5 and has been replaced with `"+e+"`. It will be **completely** removed in v1.0.")},_={isIntercepted:function(t,e){return!(t.x+t.width<=e.x||e.x+e.width<=t.x||t.y+t.height<=e.y||e.y+e.height<=t.y)},sort:function(t,e,i){return i=i||g.chain(t).map(function(t){return t.x+t.width}).max().value(),e=-1!=e?1:-1,g.sortBy(t,[function(t){return e*(t.x+t.y*i)}])},createStylesheet:function(t){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.setAttribute("data-gs-style-id",t),e.styleSheet?e.styleSheet.cssText="":e.appendChild(document.createTextNode("")),document.getElementsByTagName("head")[0].appendChild(e),e.sheet},removeStylesheet:function(t){u("STYLE[data-gs-style-id="+t+"]").remove()},insertCSSRule:function(t,e,i,o){"function"==typeof t.insertRule?t.insertRule(e+"{"+i+"}",o):"function"==typeof t.addRule&&t.addRule(e,i,o)},toBool:function(t){return"boolean"==typeof t?t:"string"==typeof t?!(""===(t=t.toLowerCase())||"no"==t||"false"==t||"0"==t):Boolean(t)},_collisionNodeCheck:function(t){return t!=this.node&&_.isIntercepted(t,this.nn)},_didCollide:function(t){return _.isIntercepted({x:this.n.x,y:this.newY,width:this.n.width,height:this.n.height},t)},_isAddNodeIntercepted:function(t){return _.isIntercepted({x:this.x,y:this.y,width:this.node.width,height:this.node.height},t)},parseHeight:function(t){var e=t,i="px";if(e&&g.isString(e)){var o=e.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw)?$/);if(!o)throw new Error("Invalid height");i=o[2]||"px",e=parseFloat(o[1])}return{height:e,unit:i}},removePositioningStyles:function(t){var e=t[0].style;e.position&&e.removeProperty("position"),e.left&&e.removeProperty("left"),e.top&&e.removeProperty("top"),e.width&&e.removeProperty("width"),e.height&&e.removeProperty("height")},getScrollParent:function(t){return null==t?null:t.scrollHeight>t.clientHeight?t:_.getScrollParent(t.parentNode)},updateScrollPosition:function(t,e,i){var o=t.getBoundingClientRect(),a=window.innerHeight||document.documentElement.clientHeight;if(o.top<0||o.bottom>a){var r=o.bottom-a,s=o.top,n=_.getScrollParent(t);if(null!=n){var d=n.scrollTop;o.top<0&&i<0?t.offsetHeight>a?n.scrollTop+=i:n.scrollTop+=Math.abs(s)>Math.abs(i)?i:s:0<i&&(t.offsetHeight>a?n.scrollTop+=i:n.scrollTop+=i<r?i:r),e.position.top+=n.scrollTop-d}}}};function c(t){this.grid=t}_.is_intercepted=e(_.isIntercepted,"is_intercepted","isIntercepted"),_.create_stylesheet=e(_.createStylesheet,"create_stylesheet","createStylesheet"),_.remove_stylesheet=e(_.removeStylesheet,"remove_stylesheet","removeStylesheet"),_.insert_css_rule=e(_.insertCSSRule,"insert_css_rule","insertCSSRule"),c.registeredPlugins=[],c.registerPlugin=function(t){c.registeredPlugins.push(t)},c.prototype.resizable=function(t,e){return this},c.prototype.draggable=function(t,e){return this},c.prototype.droppable=function(t,e){return this},c.prototype.isDroppable=function(t){return!1},c.prototype.on=function(t,e,i){return this};var r=0,y=function(t,e,i,o,a){this.width=t,this.float=i||!1,this.height=o||0,this.nodes=a||[],this.onchange=e||function(){},this._updateCounter=0,this._float=this.float,this._addedNodes=[],this._removedNodes=[]};y.prototype.batchUpdate=function(){this._updateCounter=1,this.float=!0},y.prototype.commit=function(){0!==this._updateCounter&&(this._updateCounter=0,this.float=this._float,this._packNodes(),this._notify())},y.prototype.getNodeDataByDOMEl=function(e){return g.find(this.nodes,function(t){return e.get(0)===t.el.get(0)})},y.prototype._fixCollisions=function(t){this._sortNodes(-1);var e=t,i=Boolean(g.find(this.nodes,function(t){return t.locked}));for(this.float||i||(e={x:0,y:t.y,width:this.width,height:t.height});;){var o=g.find(this.nodes,g.bind(_._collisionNodeCheck,{node:t,nn:e}));if(void 0===o)return;this.moveNode(o,o.x,t.y+t.height,o.width,o.height,!0)}},y.prototype.isAreaEmpty=function(t,e,i,o){var a={x:t||0,y:e||0,width:i||1,height:o||1},r=g.find(this.nodes,g.bind(function(t){return _.isIntercepted(t,a)},this));return null==r},y.prototype._sortNodes=function(t){this.nodes=_.sort(this.nodes,t,this.width)},y.prototype._packNodes=function(){this._sortNodes(),this.float?g.each(this.nodes,g.bind(function(t,e){if(!t._updating&&void 0!==t._origY&&t.y!=t._origY)for(var i=t.y;i>=t._origY;){g.chain(this.nodes).take(e).find(g.bind(_._didCollide,{n:t,newY:i})).value()||(t._dirty=!0,t.y=i),--i}},this)):g.each(this.nodes,g.bind(function(t,e){if(!t.locked)for(;0<t.y;){var i=t.y-1,o=0===e;if(0<e)o=void 0===g.chain(this.nodes).take(e).find(g.bind(_._didCollide,{n:t,newY:i})).value();if(!o)break;t._dirty=t.y!=i,t.y=i}},this))},y.prototype._prepareNode=function(t,e){return(t=g.defaults(t||{},{width:1,height:1,x:0,y:0})).x=parseInt(""+t.x),t.y=parseInt(""+t.y),t.width=parseInt(""+t.width),t.height=parseInt(""+t.height),t.autoPosition=t.autoPosition||!1,t.noResize=t.noResize||!1,t.noMove=t.noMove||!1,t.width>this.width?t.width=this.width:t.width<1&&(t.width=1),t.height<1&&(t.height=1),t.x<0&&(t.x=0),t.x+t.width>this.width&&(e?t.width=this.width-t.x:t.x=this.width-t.width),t.y<0&&(t.y=0),t},y.prototype._notify=function(){var t=Array.prototype.slice.call(arguments,0);if(t[0]=void 0===t[0]?[]:[t[0]],t[1]=void 0===t[1]||t[1],!this._updateCounter){var e=t[0].concat(this.getDirtyNodes());this.onchange(e,t[1])}},y.prototype.cleanNodes=function(){this._updateCounter||g.each(this.nodes,function(t){t._dirty=!1})},y.prototype.getDirtyNodes=function(){return g.filter(this.nodes,function(t){return t._dirty})},y.prototype.addNode=function(t,e){if(void 0!==(t=this._prepareNode(t)).maxWidth&&(t.width=Math.min(t.width,t.maxWidth)),void 0!==t.maxHeight&&(t.height=Math.min(t.height,t.maxHeight)),void 0!==t.minWidth&&(t.width=Math.max(t.width,t.minWidth)),void 0!==t.minHeight&&(t.height=Math.max(t.height,t.minHeight)),t._id=++r,t._dirty=!0,t.autoPosition){this._sortNodes();for(var i=0;;++i){var o=i%this.width,a=Math.floor(i/this.width);if(!(o+t.width>this.width)&&!g.find(this.nodes,g.bind(_._isAddNodeIntercepted,{x:o,y:a,node:t}))){t.x=o,t.y=a;break}}}return this.nodes.push(t),void 0!==e&&e&&this._addedNodes.push(g.clone(t)),this._fixCollisions(t),this._packNodes(),this._notify(),t},y.prototype.removeNode=function(t,e){e=void 0===e||e,this._removedNodes.push(g.clone(t)),t._id=null,this.nodes=g.without(this.nodes,t),this._packNodes(),this._notify(t,e)},y.prototype.canMoveNode=function(e,t,i,o,a){if(!this.isNodeChangedPosition(e,t,i,o,a))return!1;var r,s=Boolean(g.find(this.nodes,function(t){return t.locked}));if(!this.height&&!s)return!0;var n=new y(this.width,null,this.float,0,g.map(this.nodes,function(t){return t==e?r=u.extend({},t):u.extend({},t)}));if(void 0===r)return!0;n.moveNode(r,t,i,o,a);var d=!0;return s&&(d&=!Boolean(g.find(n.nodes,function(t){return t!=r&&Boolean(t.locked)&&Boolean(t._dirty)}))),this.height&&(d&=n.getGridHeight()<=this.height),d},y.prototype.canBePlacedWithRespectToHeight=function(t){if(!this.height)return!0;var e=new y(this.width,null,this.float,0,g.map(this.nodes,function(t){return u.extend({},t)}));return e.addNode(t),e.getGridHeight()<=this.height},y.prototype.isNodeChangedPosition=function(t,e,i,o,a){return"number"!=typeof e&&(e=t.x),"number"!=typeof i&&(i=t.y),"number"!=typeof o&&(o=t.width),"number"!=typeof a&&(a=t.height),void 0!==t.maxWidth&&(o=Math.min(o,t.maxWidth)),void 0!==t.maxHeight&&(a=Math.min(a,t.maxHeight)),void 0!==t.minWidth&&(o=Math.max(o,t.minWidth)),void 0!==t.minHeight&&(a=Math.max(a,t.minHeight)),t.x!=e||t.y!=i||t.width!=o||t.height!=a},y.prototype.moveNode=function(t,e,i,o,a,r){if(!this.isNodeChangedPosition(t,e,i,o,a))return t;if("number"!=typeof e&&(e=t.x),"number"!=typeof i&&(i=t.y),"number"!=typeof o&&(o=t.width),"number"!=typeof a&&(a=t.height),void 0!==t.maxWidth&&(o=Math.min(o,t.maxWidth)),void 0!==t.maxHeight&&(a=Math.min(a,t.maxHeight)),void 0!==t.minWidth&&(o=Math.max(o,t.minWidth)),void 0!==t.minHeight&&(a=Math.max(a,t.minHeight)),t.x==e&&t.y==i&&t.width==o&&t.height==a)return t;var s=t.width!=o;return t._dirty=!0,t.x=e,t.y=i,t.width=o,t.height=a,t.lastTriedX=e,t.lastTriedY=i,t.lastTriedWidth=o,t.lastTriedHeight=a,t=this._prepareNode(t,s),this._fixCollisions(t),r||(this._packNodes(),this._notify()),t},y.prototype.getGridHeight=function(){return g.reduce(this.nodes,function(t,e){return Math.max(t,e.y+e.height)},0)},y.prototype.beginUpdate=function(t){g.each(this.nodes,function(t){t._origY=t.y}),t._updating=!0},y.prototype.endUpdate=function(){g.each(this.nodes,function(t){t._origY=t.y});var t=g.find(this.nodes,function(t){return t._updating});t&&(t._updating=!1)};var i=function(t,e){var i,o,h=this;e=e||{},this.container=u(t),void 0!==e.handle_class&&(e.handleClass=e.handle_class,d("handle_class","handleClass")),void 0!==e.item_class&&(e.itemClass=e.item_class,d("item_class","itemClass")),void 0!==e.placeholder_class&&(e.placeholderClass=e.placeholder_class,d("placeholder_class","placeholderClass")),void 0!==e.placeholder_text&&(e.placeholderText=e.placeholder_text,d("placeholder_text","placeholderText")),void 0!==e.cell_height&&(e.cellHeight=e.cell_height,d("cell_height","cellHeight")),void 0!==e.vertical_margin&&(e.verticalMargin=e.vertical_margin,d("vertical_margin","verticalMargin")),void 0!==e.min_width&&(e.minWidth=e.min_width,d("min_width","minWidth")),void 0!==e.static_grid&&(e.staticGrid=e.static_grid,d("static_grid","staticGrid")),void 0!==e.is_nested&&(e.isNested=e.is_nested,d("is_nested","isNested")),void 0!==e.always_show_resize_handle&&(e.alwaysShowResizeHandle=e.always_show_resize_handle,d("always_show_resize_handle","alwaysShowResizeHandle")),e.itemClass=e.itemClass||"grid-stack-item";var a=0<this.container.closest("."+e.itemClass).length;if(this.opts=g.defaults(e||{},{width:parseInt(this.container.attr("data-gs-width"))||12,height:parseInt(this.container.attr("data-gs-height"))||0,itemClass:"grid-stack-item",placeholderClass:"grid-stack-placeholder",placeholderText:"",handle:".grid-stack-item-content",handleClass:null,cellHeight:60,verticalMargin:20,auto:!0,minWidth:768,float:!1,staticGrid:!1,_class:"grid-stack-instance-"+(1e4*Math.random()).toFixed(0),animate:Boolean(this.container.attr("data-gs-animate"))||!1,alwaysShowResizeHandle:e.alwaysShowResizeHandle||!1,resizable:g.defaults(e.resizable||{},{autoHide:!e.alwaysShowResizeHandle,handles:"se"}),draggable:g.defaults(e.draggable||{},{handle:(e.handleClass?"."+e.handleClass:e.handle?e.handle:"")||".grid-stack-item-content",scroll:!1,appendTo:"body"}),disableDrag:e.disableDrag||!1,disableResize:e.disableResize||!1,rtl:"auto",removable:!1,removableOptions:g.defaults(e.removableOptions||{},{accept:"."+e.itemClass}),removeTimeout:2e3,verticalMarginUnit:"px",cellHeightUnit:"px",disableOneColumnMode:e.disableOneColumnMode||!1,oneColumnModeClass:e.oneColumnModeClass||"grid-stack-one-column-mode",ddPlugin:null}),!1===this.opts.ddPlugin?this.opts.ddPlugin=c:null===this.opts.ddPlugin&&(this.opts.ddPlugin=g.first(c.registeredPlugins)||c),this.dd=new this.opts.ddPlugin(this),"auto"===this.opts.rtl&&(this.opts.rtl="rtl"===this.container.css("direction")),this.opts.rtl&&this.container.addClass("grid-stack-rtl"),this.opts.isNested=a,(o="auto"===this.opts.cellHeight)?h.cellHeight(h.cellWidth(),!0):this.cellHeight(this.opts.cellHeight,!0),this.verticalMargin(this.opts.verticalMargin,!0),this.container.addClass(this.opts._class),this._setStaticClass(),a&&this.container.addClass("grid-stack-nested"),this._initStyles(),this.grid=new y(this.opts.width,function(t,e){e=void 0===e||e;var i=0;g.each(this.nodes,function(t){i=Math.max(i,t.y+t.height)}),g.each(t,function(t){e&&null===t._id?t.el&&t.el.remove():t.el.attr("data-gs-x",t.x).attr("data-gs-y",t.y).attr("data-gs-width",t.width).attr("data-gs-height",t.height)}),h._updateStyles(i+10)},this.opts.float,this.opts.height),this.opts.auto){var r=[],s=this;this.container.children("."+this.opts.itemClass+":not(."+this.opts.placeholderClass+")").each(function(t,e){e=u(e),r.push({el:e,i:parseInt(e.attr("data-gs-x"))+parseInt(e.attr("data-gs-y"))*s.opts.width})}),g.chain(r).sortBy(function(t){return t.i}).each(function(t){h._prepareElement(t.el)}).value()}if(this.setAnimation(this.opts.animate),this.placeholder=u('<div class="'+this.opts.placeholderClass+" "+this.opts.itemClass+'"><div class="placeholder-content">'+this.opts.placeholderText+"</div></div>").hide(),this._updateContainerHeight(),this._updateHeightsOnResize=g.throttle(function(){h.cellHeight(h.cellWidth(),!1)},100),this.onResizeHandler=function(){if(o&&h._updateHeightsOnResize(),h._isOneColumnMode()&&!h.opts.disableOneColumnMode){if(i)return;h.container.addClass(h.opts.oneColumnModeClass),i=!0,h.grid._sortNodes(),g.each(h.grid.nodes,function(t){h.container.append(t.el),h.opts.staticGrid||(h.dd.draggable(t.el,"disable"),h.dd.resizable(t.el,"disable"),t.el.trigger("resize"))})}else{if(!i)return;if(h.container.removeClass(h.opts.oneColumnModeClass),i=!1,h.opts.staticGrid)return;g.each(h.grid.nodes,function(t){t.noMove||h.opts.disableDrag||h.dd.draggable(t.el,"enable"),t.noResize||h.opts.disableResize||h.dd.resizable(t.el,"enable"),t.el.trigger("resize")})}},u(window).resize(this.onResizeHandler),this.onResizeHandler(),!h.opts.staticGrid&&"string"==typeof h.opts.removable){var n=u(h.opts.removable);this.dd.isDroppable(n)||this.dd.droppable(n,h.opts.removableOptions),this.dd.on(n,"dropover",function(t,e){var i=u(e.draggable);i.data("_gridstack_node")._grid===h&&(i.data("inTrashZone",!0),h._setupRemovingTimeout(i))}).on(n,"dropout",function(t,e){var i=u(e.draggable);i.data("_gridstack_node")._grid===h&&(i.data("inTrashZone",!1),h._clearRemovingTimeout(i))})}if(!h.opts.staticGrid&&h.opts.acceptWidgets){var l=null,p=function(t,e){var i=l,o=i.data("_gridstack_node"),a=h.getCellFromPixel({left:t.pageX,top:t.pageY},!0),r=Math.max(0,a.x),s=Math.max(0,a.y);o._added||(o._added=!0,o.el=i,o.autoPosition=!0,o.x=r,o.y=s,h.grid.cleanNodes(),h.grid.beginUpdate(o),h.grid.addNode(o),h.container.append(h.placeholder),h.placeholder.attr("data-gs-x",o.x).attr("data-gs-y",o.y).attr("data-gs-width",o.width).attr("data-gs-height",o.height).show(),o.el=h.placeholder,o._beforeDragX=o.x,o._beforeDragY=o.y,h._updateContainerHeight()),h.grid.canMoveNode(o,r,s)&&(h.grid.moveNode(o,r,s),h._updateContainerHeight())};this.dd.droppable(h.container,{accept:function(t){var e=(t=u(t)).data("_gridstack_node");return(!e||e._grid!==h)&&t.is(!0===h.opts.acceptWidgets?".grid-stack-item":h.opts.acceptWidgets)}}).on(h.container,"dropover",function(t,e){h.container.offset();var i=u(e.draggable),o=h.cellWidth(),a=h.cellHeight(),r=i.data("_gridstack_node"),s=r?r.width:Math.ceil(i.outerWidth()/o),n=r?r.height:Math.ceil(i.outerHeight()/a);l=i;var d=h.grid._prepareNode({width:s,height:n,_added:!1,_temporary:!0});i.data("_gridstack_node",d),i.data("_gridstack_node_orig",r),i.on("drag",p)}).on(h.container,"dropout",function(t,e){var i=u(e.draggable);if(i.data("_gridstack_node")){i.unbind("drag",p);var o=i.data("_gridstack_node");o.el=null,h.grid.removeNode(o),h.placeholder.detach(),h._updateContainerHeight(),i.data("_gridstack_node",i.data("_gridstack_node_orig"))}}).on(h.container,"drop",function(t,e){h.placeholder.detach();var i=u(e.draggable).data("_gridstack_node");i._grid=h;var o=u(e.draggable).clone(!1);o.data("_gridstack_node",i);var a=u(e.draggable).data("_gridstack_node_orig");void 0!==a&&void 0!==a._grid&&a._grid._triggerRemoveEvent(),u(e.helper).remove(),i.el=o,h.placeholder.hide(),_.removePositioningStyles(o),o.find("div.ui-resizable-handle").remove(),o.attr("data-gs-x",i.x).attr("data-gs-y",i.y).attr("data-gs-width",i.width).attr("data-gs-height",i.height).addClass(h.opts.itemClass).enableSelection().removeData("draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled").unbind("drag",p),h.container.append(o),h._prepareElementsByNode(o,i),h._updateContainerHeight(),h.grid._addedNodes.push(i),h._triggerAddEvent(),h._triggerChangeEvent(),h.grid.endUpdate(),u(e.draggable).unbind("drag",p),u(e.draggable).removeData("_gridstack_node"),u(e.draggable).removeData("_gridstack_node_orig"),h.container.trigger("dropped",[a,i])})}};return i.prototype._triggerChangeEvent=function(t){var e=this.grid.getDirtyNodes(),i=!1,o=[];e&&e.length&&(o.push(e),i=!0),(i||!0===t)&&this.container.trigger("change",o)},i.prototype._triggerAddEvent=function(){this.grid._addedNodes&&0<this.grid._addedNodes.length&&(this.container.trigger("added",[g.map(this.grid._addedNodes,g.clone)]),this.grid._addedNodes=[])},i.prototype._triggerRemoveEvent=function(){this.grid._removedNodes&&0<this.grid._removedNodes.length&&(this.container.trigger("removed",[g.map(this.grid._removedNodes,g.clone)]),this.grid._removedNodes=[])},i.prototype._initStyles=function(){this._stylesId&&_.removeStylesheet(this._stylesId),this._stylesId="gridstack-style-"+(1e5*Math.random()).toFixed(),this._styles=_.createStylesheet(this._stylesId),null!==this._styles&&(this._styles._max=0)},i.prototype._updateStyles=function(t){if(null!==this._styles&&void 0!==this._styles){var e,i="."+this.opts._class+" ."+this.opts.itemClass,o=this;if(void 0===t&&(t=this._styles._max),this._initStyles(),this._updateContainerHeight(),this.opts.cellHeight&&!(0!==this._styles._max&&t<=this._styles._max)&&(e=this.opts.verticalMargin&&this.opts.cellHeightUnit!==this.opts.verticalMarginUnit?function(t,e){return t&&e?"calc("+(o.opts.cellHeight*t+o.opts.cellHeightUnit)+" + "+(o.opts.verticalMargin*e+o.opts.verticalMarginUnit)+")":o.opts.cellHeight*t+o.opts.verticalMargin*e+o.opts.cellHeightUnit}:function(t,e){return o.opts.cellHeight*t+o.opts.verticalMargin*e+o.opts.cellHeightUnit},0===this._styles._max&&_.insertCSSRule(this._styles,i,"min-height: "+e(1,0)+";",0),t>this._styles._max)){for(var a=this._styles._max;a<t;++a)_.insertCSSRule(this._styles,i+'[data-gs-height="'+(a+1)+'"]',"height: "+e(a+1,a)+";",a),_.insertCSSRule(this._styles,i+'[data-gs-min-height="'+(a+1)+'"]',"min-height: "+e(a+1,a)+";",a),_.insertCSSRule(this._styles,i+'[data-gs-max-height="'+(a+1)+'"]',"max-height: "+e(a+1,a)+";",a),_.insertCSSRule(this._styles,i+'[data-gs-y="'+a+'"]',"top: "+e(a,a)+";",a);this._styles._max=t}}},i.prototype._updateContainerHeight=function(){if(!this.grid._updateCounter){var t=this.grid.getGridHeight(),e=parseInt(this.container.css("min-height"));if(0<e){var i=(e+this.opts.verticalMargin)/(this.cellHeight()+this.opts.verticalMargin);t<i&&(t=i)}this.container.attr("data-gs-current-height",t),this.opts.cellHeight&&(this.opts.verticalMargin?this.opts.cellHeightUnit===this.opts.verticalMarginUnit?this.container.css("height",t*(this.opts.cellHeight+this.opts.verticalMargin)-this.opts.verticalMargin+this.opts.cellHeightUnit):this.container.css("height","calc("+(t*this.opts.cellHeight+this.opts.cellHeightUnit)+" + "+(t*(this.opts.verticalMargin-1)+this.opts.verticalMarginUnit)+")"):this.container.css("height",t*this.opts.cellHeight+this.opts.cellHeightUnit))}},i.prototype._isOneColumnMode=function(){return(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)<=this.opts.minWidth},i.prototype._setupRemovingTimeout=function(t){var e=u(t).data("_gridstack_node");!e._removeTimeout&&this.opts.removable&&(e._removeTimeout=setTimeout(function(){t.addClass("grid-stack-item-removing"),e._isAboutToRemove=!0},this.opts.removeTimeout))},i.prototype._clearRemovingTimeout=function(t){var e=u(t).data("_gridstack_node");e._removeTimeout&&(clearTimeout(e._removeTimeout),e._removeTimeout=null,t.removeClass("grid-stack-item-removing"),e._isAboutToRemove=!1)},i.prototype._prepareElementsByNode=function(h,l){var p,g,c=this,t=function(t,e){var i,o,a=Math.round(e.position.left/p),r=Math.floor((e.position.top+g/2)/g);if("drag"!=t.type&&(i=Math.round(e.size.width/p),o=Math.round(e.size.height/g)),"drag"==t.type){var s=e.position.top-l._prevYPix;if(l._prevYPix=e.position.top,_.updateScrollPosition(h[0],e,s),h.data("inTrashZone")||a<0||a>=c.grid.width||r<0||!c.grid.float&&r>c.grid.getGridHeight()){if(l._temporaryRemoved)return;!0===c.opts.removable&&c._setupRemovingTimeout(h),a=l._beforeDragX,r=l._beforeDragY,c.placeholder.detach(),c.placeholder.hide(),c.grid.removeNode(l),c._updateContainerHeight(),l._temporaryRemoved=!0}else c._clearRemovingTimeout(h),l._temporaryRemoved&&(c.grid.addNode(l),c.placeholder.attr("data-gs-x",a).attr("data-gs-y",r).attr("data-gs-width",i).attr("data-gs-height",o).show(),c.container.append(c.placeholder),l.el=c.placeholder,l._temporaryRemoved=!1)}else if("resize"==t.type&&a<0)return;var n=void 0!==i?i:l.lastTriedWidth,d=void 0!==o?o:l.lastTriedHeight;!c.grid.canMoveNode(l,a,r,i,o)||l.lastTriedX===a&&l.lastTriedY===r&&l.lastTriedWidth===n&&l.lastTriedHeight===d||(l.lastTriedX=a,l.lastTriedY=r,l.lastTriedWidth=i,l.lastTriedHeight=o,c.grid.moveNode(l,a,r,i,o),c._updateContainerHeight(),"resize"==t.type&&u(t.target).trigger("gsresize",l))},e=function(t,e){c.container.append(c.placeholder);var i=u(this);c.grid.cleanNodes(),c.grid.beginUpdate(l),p=c.cellWidth();var o=Math.ceil(i.outerHeight()/i.attr("data-gs-height"));g=c.container.height()/parseInt(c.container.attr("data-gs-current-height")),c.placeholder.attr("data-gs-x",i.attr("data-gs-x")).attr("data-gs-y",i.attr("data-gs-y")).attr("data-gs-width",i.attr("data-gs-width")).attr("data-gs-height",i.attr("data-gs-height")).show(),l.el=c.placeholder,l._beforeDragX=l.x,l._beforeDragY=l.y,l._prevYPix=e.position.top,c.dd.resizable(h,"option","minWidth",p*(l.minWidth||1)),c.dd.resizable(h,"option","minHeight",o*(l.minHeight||1)),"resizestart"==t.type&&i.find(".grid-stack-item").trigger("resizestart")},i=function(t,e){var i=u(this);if(i.data("_gridstack_node")){var o=!1;if(c.placeholder.detach(),l.el=i,c.placeholder.hide(),l._isAboutToRemove)o=!0,h.data("_gridstack_node")._grid._triggerRemoveEvent(),h.removeData("_gridstack_node"),h.remove();else c._clearRemovingTimeout(h),l._temporaryRemoved?(_.removePositioningStyles(i),i.attr("data-gs-x",l._beforeDragX).attr("data-gs-y",l._beforeDragY).attr("data-gs-width",l.width).attr("data-gs-height",l.height),l.x=l._beforeDragX,l.y=l._beforeDragY,l._temporaryRemoved=!1,c.grid.addNode(l)):(_.removePositioningStyles(i),i.attr("data-gs-x",l.x).attr("data-gs-y",l.y).attr("data-gs-width",l.width).attr("data-gs-height",l.height));c._updateContainerHeight(),c._triggerChangeEvent(o),c.grid.endUpdate();var a=i.find(".grid-stack");a.length&&"resizestop"==t.type&&(a.each(function(t,e){u(e).data("gridstack").onResizeHandler()}),i.find(".grid-stack-item").trigger("resizestop"),i.find(".grid-stack-item").trigger("gsresizestop")),"resizestop"==t.type&&c.container.trigger("gsresizestop",i)}};this.dd.draggable(h,{start:e,stop:i,drag:t}).resizable(h,{start:e,stop:i,resize:t}),(l.noMove||this._isOneColumnMode()&&!c.opts.disableOneColumnMode||this.opts.disableDrag||this.opts.staticGrid)&&this.dd.draggable(h,"disable"),(l.noResize||this._isOneColumnMode()&&!c.opts.disableOneColumnMode||this.opts.disableResize||this.opts.staticGrid)&&this.dd.resizable(h,"disable"),h.attr("data-gs-locked",l.locked?"yes":null)},i.prototype._prepareElement=function(t,e){e=void 0!==e&&e;(t=u(t)).addClass(this.opts.itemClass);var i=this.grid.addNode({x:parseInt(t.attr("data-gs-x"),10),y:parseInt(t.attr("data-gs-y"),10),width:t.attr("data-gs-width"),height:t.attr("data-gs-height"),maxWidth:t.attr("data-gs-max-width"),minWidth:t.attr("data-gs-min-width"),maxHeight:t.attr("data-gs-max-height"),minHeight:t.attr("data-gs-min-height"),autoPosition:_.toBool(t.attr("data-gs-auto-position")),noResize:_.toBool(t.attr("data-gs-no-resize")),noMove:_.toBool(t.attr("data-gs-no-move")),locked:_.toBool(t.attr("data-gs-locked")),resizeHandles:t.attr("data-gs-resize-handles"),el:t,id:t.attr("data-gs-id"),_grid:this},e);t.data("_gridstack_node",i),this._prepareElementsByNode(t,i)},i.prototype.setAnimation=function(t){t?this.container.addClass("grid-stack-animate"):this.container.removeClass("grid-stack-animate")},i.prototype.addWidget=function(t,e,i,o,a,r,s,n,d,h,l){return t=u(t),void 0!==e&&t.attr("data-gs-x",e),void 0!==i&&t.attr("data-gs-y",i),void 0!==o&&t.attr("data-gs-width",o),void 0!==a&&t.attr("data-gs-height",a),void 0!==r&&t.attr("data-gs-auto-position",r?"yes":null),void 0!==s&&t.attr("data-gs-min-width",s),void 0!==n&&t.attr("data-gs-max-width",n),void 0!==d&&t.attr("data-gs-min-height",d),void 0!==h&&t.attr("data-gs-max-height",h),void 0!==l&&t.attr("data-gs-id",l),this.container.append(t),this._prepareElement(t,!0),this._triggerAddEvent(),this._updateContainerHeight(),this._triggerChangeEvent(!0),t},i.prototype.makeWidget=function(t){return t=u(t),this._prepareElement(t,!0),this._triggerAddEvent(),this._updateContainerHeight(),this._triggerChangeEvent(!0),t},i.prototype.willItFit=function(t,e,i,o,a){var r={x:t,y:e,width:i,height:o,autoPosition:a};return this.grid.canBePlacedWithRespectToHeight(r)},i.prototype.removeWidget=function(t,e){e=void 0===e||e;var i=(t=u(t)).data("_gridstack_node");i||(i=this.grid.getNodeDataByDOMEl(t)),this.grid.removeNode(i,e),t.removeData("_gridstack_node"),this._updateContainerHeight(),e&&t.remove(),this._triggerChangeEvent(!0),this._triggerRemoveEvent()},i.prototype.removeAll=function(e){g.each(this.grid.nodes,g.bind(function(t){this.removeWidget(t.el,e)},this)),this.grid.nodes=[],this._updateContainerHeight()},i.prototype.destroy=function(t){u(window).off("resize",this.onResizeHandler),this.disable(),void 0===t||t?this.container.remove():(this.removeAll(!1),this.container.removeData("gridstack")),_.removeStylesheet(this._stylesId),this.grid&&(this.grid=null)},i.prototype.resizable=function(t,o){var a=this;return(t=u(t)).each(function(t,e){var i=(e=u(e)).data("_gridstack_node");null!=i&&(i.noResize=!o,i.noResize||a._isOneColumnMode()&&!a.opts.disableOneColumnMode?a.dd.resizable(e,"disable"):a.dd.resizable(e,"enable"))}),this},i.prototype.movable=function(t,o){var a=this;return(t=u(t)).each(function(t,e){var i=(e=u(e)).data("_gridstack_node");null!=i&&(i.noMove=!o,i.noMove||a._isOneColumnMode()&&!a.opts.disableOneColumnMode?(a.dd.draggable(e,"disable"),e.removeClass("ui-draggable-handle")):(a.dd.draggable(e,"enable"),e.addClass("ui-draggable-handle")))}),this},i.prototype.enableMove=function(t,e){this.movable(this.container.children("."+this.opts.itemClass),t),e&&(this.opts.disableDrag=!t)},i.prototype.enableResize=function(t,e){this.resizable(this.container.children("."+this.opts.itemClass),t),e&&(this.opts.disableResize=!t)},i.prototype.disable=function(){this.movable(this.container.children("."+this.opts.itemClass),!1),this.resizable(this.container.children("."+this.opts.itemClass),!1),this.container.trigger("disable")},i.prototype.enable=function(){this.movable(this.container.children("."+this.opts.itemClass),!0),this.resizable(this.container.children("."+this.opts.itemClass),!0),this.container.trigger("enable")},i.prototype.locked=function(t,o){return(t=u(t)).each(function(t,e){var i=(e=u(e)).data("_gridstack_node");null!=i&&(i.locked=o||!1,e.attr("data-gs-locked",i.locked?"yes":null))}),this},i.prototype.maxHeight=function(t,o){return(t=u(t)).each(function(t,e){var i=(e=u(e)).data("_gridstack_node");null!=i&&(isNaN(o)||(i.maxHeight=o||!1,e.attr("data-gs-max-height",o)))}),this},i.prototype.minHeight=function(t,o){return(t=u(t)).each(function(t,e){var i=(e=u(e)).data("_gridstack_node");null!=i&&(isNaN(o)||(i.minHeight=o||!1,e.attr("data-gs-min-height",o)))}),this},i.prototype.maxWidth=function(t,o){return(t=u(t)).each(function(t,e){var i=(e=u(e)).data("_gridstack_node");null!=i&&(isNaN(o)||(i.maxWidth=o||!1,e.attr("data-gs-max-width",o)))}),this},i.prototype.minWidth=function(t,o){return(t=u(t)).each(function(t,e){var i=(e=u(e)).data("_gridstack_node");null!=i&&(isNaN(o)||(i.minWidth=o||!1,e.attr("data-gs-min-width",o)))}),this},i.prototype._updateElement=function(t,e){var i=(t=u(t).first()).data("_gridstack_node");if(null!=i){var o=this;o.grid.cleanNodes(),o.grid.beginUpdate(i),e.call(this,t,i),o._updateContainerHeight(),o._triggerChangeEvent(),o.grid.endUpdate()}},i.prototype.resize=function(t,i,o){this._updateElement(t,function(t,e){i=null!=i?i:e.width,o=null!=o?o:e.height,this.grid.moveNode(e,e.x,e.y,i,o)})},i.prototype.move=function(t,i,o){this._updateElement(t,function(t,e){i=null!=i?i:e.x,o=null!=o?o:e.y,this.grid.moveNode(e,i,o,e.width,e.height)})},i.prototype.update=function(t,i,o,a,r){this._updateElement(t,function(t,e){i=null!=i?i:e.x,o=null!=o?o:e.y,a=null!=a?a:e.width,r=null!=r?r:e.height,this.grid.moveNode(e,i,o,a,r)})},i.prototype.verticalMargin=function(t,e){if(void 0===t)return this.opts.verticalMargin;var i=_.parseHeight(t);this.opts.verticalMarginUnit===i.unit&&this.opts.height===i.height||(this.opts.verticalMarginUnit=i.unit,this.opts.verticalMargin=i.height,e||this._updateStyles())},i.prototype.cellHeight=function(t,e){if(void 0===t){if(this.opts.cellHeight)return this.opts.cellHeight;var i=this.container.children("."+this.opts.itemClass).first();return Math.ceil(i.outerHeight()/i.attr("data-gs-height"))}var o=_.parseHeight(t);this.opts.cellHeightUnit===o.unit&&this.opts.cellHeight===o.height||(this.opts.cellHeightUnit=o.unit,this.opts.cellHeight=o.height,e||this._updateStyles())},i.prototype.cellWidth=function(){return Math.round(this.container.outerWidth()/this.opts.width)},i.prototype.getCellFromPixel=function(t,e){var i=void 0!==e&&e?this.container.offset():this.container.position(),o=t.left-i.left,a=t.top-i.top,r=Math.floor(this.container.width()/this.opts.width),s=Math.floor(this.container.height()/parseInt(this.container.attr("data-gs-current-height")));return{x:Math.floor(o/r),y:Math.floor(a/s)}},i.prototype.batchUpdate=function(){this.grid.batchUpdate()},i.prototype.commit=function(){this.grid.commit(),this._updateContainerHeight()},i.prototype.isAreaEmpty=function(t,e,i,o){return this.grid.isAreaEmpty(t,e,i,o)},i.prototype.setStatic=function(t){this.opts.staticGrid=!0===t,this.enableMove(!t),this.enableResize(!t),this._setStaticClass()},i.prototype._setStaticClass=function(){var t="grid-stack-static";!0===this.opts.staticGrid?this.container.addClass(t):this.container.removeClass(t)},i.prototype._updateNodeWidths=function(t,e){this.grid._sortNodes(),this.grid.batchUpdate();for(var i={},o=0;o<this.grid.nodes.length;o++)i=this.grid.nodes[o],this.update(i.el,Math.round(i.x*e/t),void 0,Math.round(i.width*e/t),void 0);this.grid.commit()},i.prototype.setGridWidth=function(t,e){this.container.removeClass("grid-stack-"+this.opts.width),!0!==e&&this._updateNodeWidths(this.opts.width,t),this.opts.width=t,this.grid.width=t,this.container.addClass("grid-stack-"+t)},y.prototype.batch_update=e(y.prototype.batchUpdate),y.prototype._fix_collisions=e(y.prototype._fixCollisions,"_fix_collisions","_fixCollisions"),y.prototype.is_area_empty=e(y.prototype.isAreaEmpty,"is_area_empty","isAreaEmpty"),y.prototype._sort_nodes=e(y.prototype._sortNodes,"_sort_nodes","_sortNodes"),y.prototype._pack_nodes=e(y.prototype._packNodes,"_pack_nodes","_packNodes"),y.prototype._prepare_node=e(y.prototype._prepareNode,"_prepare_node","_prepareNode"),y.prototype.clean_nodes=e(y.prototype.cleanNodes,"clean_nodes","cleanNodes"),y.prototype.get_dirty_nodes=e(y.prototype.getDirtyNodes,"get_dirty_nodes","getDirtyNodes"),y.prototype.add_node=e(y.prototype.addNode,"add_node","addNode, "),y.prototype.remove_node=e(y.prototype.removeNode,"remove_node","removeNode"),y.prototype.can_move_node=e(y.prototype.canMoveNode,"can_move_node","canMoveNode"),y.prototype.move_node=e(y.prototype.moveNode,"move_node","moveNode"),y.prototype.get_grid_height=e(y.prototype.getGridHeight,"get_grid_height","getGridHeight"),y.prototype.begin_update=e(y.prototype.beginUpdate,"begin_update","beginUpdate"),y.prototype.end_update=e(y.prototype.endUpdate,"end_update","endUpdate"),y.prototype.can_be_placed_with_respect_to_height=e(y.prototype.canBePlacedWithRespectToHeight,"can_be_placed_with_respect_to_height","canBePlacedWithRespectToHeight"),i.prototype._trigger_change_event=e(i.prototype._triggerChangeEvent,"_trigger_change_event","_triggerChangeEvent"),i.prototype._init_styles=e(i.prototype._initStyles,"_init_styles","_initStyles"),i.prototype._update_styles=e(i.prototype._updateStyles,"_update_styles","_updateStyles"),i.prototype._update_container_height=e(i.prototype._updateContainerHeight,"_update_container_height","_updateContainerHeight"),i.prototype._is_one_column_mode=e(i.prototype._isOneColumnMode,"_is_one_column_mode","_isOneColumnMode"),i.prototype._prepare_element=e(i.prototype._prepareElement,"_prepare_element","_prepareElement"),i.prototype.set_animation=e(i.prototype.setAnimation,"set_animation","setAnimation"),i.prototype.add_widget=e(i.prototype.addWidget,"add_widget","addWidget"),i.prototype.make_widget=e(i.prototype.makeWidget,"make_widget","makeWidget"),i.prototype.will_it_fit=e(i.prototype.willItFit,"will_it_fit","willItFit"),i.prototype.remove_widget=e(i.prototype.removeWidget,"remove_widget","removeWidget"),i.prototype.remove_all=e(i.prototype.removeAll,"remove_all","removeAll"),i.prototype.min_height=e(i.prototype.minHeight,"min_height","minHeight"),i.prototype.min_width=e(i.prototype.minWidth,"min_width","minWidth"),i.prototype._update_element=e(i.prototype._updateElement,"_update_element","_updateElement"),i.prototype.cell_height=e(i.prototype.cellHeight,"cell_height","cellHeight"),i.prototype.cell_width=e(i.prototype.cellWidth,"cell_width","cellWidth"),i.prototype.get_cell_from_pixel=e(i.prototype.getCellFromPixel,"get_cell_from_pixel","getCellFromPixel"),i.prototype.batch_update=e(i.prototype.batchUpdate,"batch_update","batchUpdate"),i.prototype.is_area_empty=e(i.prototype.isAreaEmpty,"is_area_empty","isAreaEmpty"),i.prototype.set_static=e(i.prototype.setStatic,"set_static","setStatic"),i.prototype._set_static_class=e(i.prototype._setStaticClass,"_set_static_class","_setStaticClass"),t.GridStackUI=i,t.GridStackUI.Utils=_,t.GridStackUI.Engine=y,t.GridStackUI.GridStackDragDropPlugin=c,u.fn.gridstack=function(e){return this.each(function(){var t=u(this);t.data("gridstack")||t.data("gridstack",new i(this,e))})},t.GridStackUI}),function(t){if("function"==typeof define&&define.amd)define(["jquery","lodash","gridstack","exports","jquery-ui/data","jquery-ui/disable-selection","jquery-ui/focusable","jquery-ui/form","jquery-ui/ie","jquery-ui/keycode","jquery-ui/labels","jquery-ui/jquery-1-7","jquery-ui/plugin","jquery-ui/safe-active-element","jquery-ui/safe-blur","jquery-ui/scroll-parent","jquery-ui/tabbable","jquery-ui/unique-id","jquery-ui/version","jquery-ui/widget","jquery-ui/widgets/mouse","jquery-ui/widgets/draggable","jquery-ui/widgets/droppable","jquery-ui/widgets/resizable"],t);else if("undefined"!=typeof exports){try{jQuery=require("jquery")}catch(t){}try{_=require("lodash")}catch(t){}try{gridstack=require("gridstack")}catch(t){}t(jQuery,_,gridstack.GridStackUI,exports)}else t(jQuery,_,GridStackUI,window)}(function(r,s,e,t){function i(t){e.GridStackDragDropPlugin.call(this,t)}return e.GridStackDragDropPlugin.registerPlugin(i),((i.prototype=Object.create(e.GridStackDragDropPlugin.prototype)).constructor=i).prototype.resizable=function(t,e){if(t=r(t),"disable"===e||"enable"===e)t.resizable(e);else if("option"===e){var i=arguments[2],o=arguments[3];t.resizable(e,i,o)}else{var a=t.data("gs-resize-handles")?t.data("gs-resize-handles"):this.grid.opts.resizable.handles;t.resizable(s.extend({},this.grid.opts.resizable,{handles:a},{start:e.start||function(){},stop:e.stop||function(){},resize:e.resize||function(){}}))}return this},i.prototype.draggable=function(t,e){return t=r(t),"disable"===e||"enable"===e?t.draggable(e):t.draggable(s.extend({},this.grid.opts.draggable,{containment:this.grid.opts.isNested?this.grid.container.parent():null,start:e.start||function(){},stop:e.stop||function(){},drag:e.drag||function(){}})),this},i.prototype.droppable=function(t,e){return(t=r(t)).droppable(e),this},i.prototype.isDroppable=function(t,e){return t=r(t),Boolean(t.data("droppable"))},i.prototype.on=function(t,e,i){return r(t).on(e,i),this},t.JQueryUIGridStackDragDropPlugin=i});
//# sourceMappingURL=gridstack.min.map