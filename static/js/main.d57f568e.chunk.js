(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,t,r){e.exports=r(52)},44:function(e,t,r){},46:function(e,t,r){},47:function(e,t,r){},48:function(e,t,r){},50:function(e,t,r){},51:function(e,t,r){},52:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(17),c=r.n(o),i=r(11),d=r(6),l=r(20),s=r(28),u=r(29),b=r(33),g=r(30),f=r(34),m=a.a.createContext({draggedObject:null,registerDraggable:function(){},registerDroppable:function(){}}),p={CARD:"CARD",LIST:"LIST"},O={BOTTOM:"BOTTOM",TOP:"TOP",RIGHT:"RIGHT",LEFT:"LEFT"},v={LEFT:1,MIDDLE:2,RIGHT:3},E=function(e){function t(){var e,r;Object(s.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(b.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(a)))).state={draggedObjectPosition:null},r.draggedObject=null,r.hoveredDroppable=null,r.droppables={},r.registerDroppable=function(e){return r.droppables[e.id]=e,function(){}},r.registerDraggable=function(e){var t=e.dragHandle,n=Object(l.a)(e,["dragHandle"]),a=t.current,o=function(e){if(e.which===v.LEFT){var t={x:e.clientX,y:e.clientY},o=n.node.current.getBoundingClientRect(),c={x:o.left-t.x,y:o.top-t.y};r.bindedStartDragIfMove=function(e){return r.startDragIfMove(Object(d.a)({handle:a},n),t,c,e)},document.addEventListener("mousemove",r.bindedStartDragIfMove),document.addEventListener("mouseup",r.resetPreparationToDrag),e.stopPropagation()}};return a.addEventListener("mousedown",o),function(){a.removeEventListener("mousedown",o)}},r.startDragIfMove=function(e,t,n,a){var o=a.clientX,c=a.clientY;(Math.abs(o-t.x)>2||Math.abs(c-t.y)>2)&&(document.removeEventListener("mousemove",r.bindedStartDragIfMove),document.removeEventListener("mouseup",r.resetPreparationToDrag),r.grabDraggable(Object(d.a)({grabShift:n},e)))},r.resetPreparationToDrag=function(){document.removeEventListener("mousemove",r.bindedStartDragIfMove),document.removeEventListener("mouseup",r.resetPreparationToDrag)},r.grabDraggable=function(e){var t=e.grabShift,n=e.context,a=e.type,o=e.node,c=e.handle,i=e.renderElement,d=e.onRelease,l=o.current.getBoundingClientRect();r.draggedObject={context:n,type:a,renderElement:i,handle:c,onRelease:d,geometry:{width:l.width,height:l.height,grabShift:t},position:{x:l.left,y:l.top},movement:[]},r.dndContext.draggedObject=r.draggedObject,r.manageDroppables(),r.setState({draggedObjectPosition:r.draggedObject.position},function(){document.addEventListener("mousemove",r.moveDraggable),document.addEventListener("mouseup",r.releaseDraggable)})},r.dndContext={draggedObject:null,registerDraggable:r.registerDraggable,registerDroppable:r.registerDroppable},r.moveDraggable=function(e){var t=e.clientX,n=e.clientY,a=e.movementX,o=e.movementY,c=r.draggedObject.geometry,i={x:t+c.grabShift.x,y:n+c.grabShift.y};r.draggedObject.position=i;var d=[];a&&d.push(a>0?O.RIGHT:O.LEFT),o&&d.push(o>0?O.BOTTOM:O.TOP),r.draggedObject.movement=d,r.scrollIfOutOfClient({x:t,y:n}),r.manageDroppables(),r.setState({draggedObjectPosition:i})},r.releaseDraggable=function(){var e=r.draggedObject,t=r.hoveredDroppable;document.removeEventListener("mousemove",r.moveDraggable),document.removeEventListener("mouseup",r.releaseDraggable),r.draggedObject=null,r.hoveredDroppable=null,r.dndContext.draggedObject=null,r.setState({draggedObjectPosition:null}),e.onRelease({draggableContext:e.context,droppableContext:t.context}),t.onDraggableLeave()},r.findDroppable=function(e){var t=r.draggedObject.node;t&&(t.style.visibility="hidden");var n=document.elementFromPoint(e.x,e.y);for(t&&(t.style.visibility="visible");n;){var a=n.closest(".droppable");if(!a)return null;if(r.droppables[a.id]){if(r.droppables[a.id].acceptedTypes.includes(r.draggedObject.type))return r.droppables[a.id];n=a.parentNode}else console.warn("Unregistered droppable with id:",a.id),n=a.parentNode}return null},r.setDraggedObjectRef=function(e){r.draggedObject&&(r.draggedObject.node=e)},r}return Object(f.a)(t,e),Object(u.a)(t,[{key:"scrollIfOutOfClient",value:function(e){var t=this.props.mainScrollbarContainer.current;e.x>=t.clientWidth-50&&t.scrollBy(10,0),e.y>=t.innerHeight-50&&t.scrollBy(0,20),e.x<=t.clientLeft-50&&t.scrollBy(-20,0),e.y<=t.clientTop-50&&t.scrollBy(0,-20)}},{key:"manageDroppables",value:function(){var e=this.draggedObject,t=e.position,r=e.geometry,n=this.hoveredDroppable,a=this.findDroppable({x:t.x+r.width/2,y:t.y+r.height/2});a&&((!n||a.id!==n.id)&&(n&&n.onDraggableLeave(),this.hoveredDroppable=this.droppables[a.id],this.hoveredDroppable.onDraggableEnter(this.draggedObject)),this.hoveredDroppable.onDraggableHover(this.draggedObject))}},{key:"render",value:function(){var e=this.props.children,t=this.state.draggedObjectPosition,r=this.draggedObject,n=this.dndContext;return a.a.createElement(a.a.Fragment,null,r&&r.renderElement({clientPosition:t,draggedObjectRef:this.setDraggedObjectRef}),a.a.createElement(m.Provider,{value:n},e))}}]),t}(a.a.Component),h=r(12),j=r(7),R=r.n(j);function y(e){var t=Object(n.useContext)(m).registerDraggable;Object(n.useEffect)(function(){return t(e)},[e.context,e.type,e.node,e.dragHandle,e.renderElement,e.onRelease])}var C={REQUEST:"@@board/FETCH_BOARD_REQUEST",SUCCESS:"@@board/FETCH_BOARD_SUCCESS",ERROR:"@@board/FETCH_BOARD_ERROR"},S="@@board/MOVE_CARD",x="@@board/MOVE_LIST",T={REQUEST:"@@board/ADD_CARD_REQUEST",SUCCESS:"@@board/ADD_CARD_SUCCESS",ERROR:"@@board/ADD_CARD_ERROR"},D={REQUEST:"@@board/ADD_LIST_REQUEST",SUCCESS:"@@board/ADD_LIST_SUCCESS",ERROR:"@@board/ADD_LIST_ERROR"},L=function(e){return{type:C.SUCCESS,board:e}},I=function(e){return{type:C.ERROR,error:e}},N=function(e,t){return{type:T.SUCCESS,listId:e,card:t}},w=function(e){return{type:T.ERROR,error:e}},A=function(e,t){return{type:D.SUCCESS,boardId:e,list:t}},k=function(e){return{type:D.ERROR,error:e}};function B(e){var t=e.x,r=e.y;return{position:"fixed",left:"".concat(t,"px"),top:"".concat(r,"px")}}r(44);function H(e){var t=e.id,r=e.content,o=e.setCardRef,c=e.moveCardToList,i=e.className,d=Object(n.useRef)(null);y({context:{id:t},type:p.CARD,node:d,dragHandle:d,renderElement:function(e){var t=e.clientPosition,n=e.draggedObjectRef;return a.a.createElement("div",{ref:n,className:R()("card","dragged",i),style:B(t)},a.a.createElement("h4",{className:"card-content"},r))},onRelease:function(e){var t=e.draggableContext,r=e.droppableContext;c(t.id,r.id,r.index)}});return a.a.createElement("li",{id:t,ref:function(e){o(e),d.current=e},className:R()("card",i),tabIndex:0},a.a.createElement("h4",{className:"card-content"},r))}H.defaultProps={className:""};var U={moveCardToList:function(e,t,r){return{type:S,cardId:e,destinationListId:t,indexInList:r}}},P=Object(i.b)(null,U)(H),_=r(13),F=r(15),M=r.n(F);r(46);function Q(e){var t=e.openCreationFormBtnText,r=e.placeholderFormText,o=e.submitFormBtnText,c=e.onAdd,i=e.className,d=e.formClassName,l=Object(n.useState)(!1),s=Object(_.a)(l,2),u=s[0],b=s[1],g=Object(n.useState)(""),f=Object(_.a)(g,2),m=f[0],p=f[1],O=Object(n.useCallback)(function(e){var t=e.target.value;p(t)},[]),v=Object(n.useCallback)(function(){p(""),b(!1)},[]),E=Object(n.useCallback)(function(){m&&(c(m),v())},[m,v,c]),h=(Object(n.useRef)(null),Object(n.useCallback)(function(){b(!0)},[])),j=function(e){var t=Object(n.useRef)(null);return Object(n.useEffect)(function(){t.current=M.a.uniqueId(e)},[e]),t.current}("add-component");!function(e,t){var r=Object(n.useCallback)(function(r){!r.target.closest("#".concat(e))&&t()},[e,t]);Object(n.useEffect)(function(){return document.addEventListener("pointerdown",r),function(){document.removeEventListener("pointerdown",r)}},[r])}(j,Object(n.useCallback)(function(){b(!1)},[]));var y=Object(n.useRef)(null);return Object(n.useEffect)(function(){u&&y.current.scrollIntoView()},[u]),a.a.createElement("div",{id:j,className:R()("add-component-wrapper",i)},a.a.createElement("button",{className:R()("open-form-btn",u&&"hidden"),onClick:h},a.a.createElement("h4",null,t)),a.a.createElement("div",{ref:function(e){return y.current=e},className:R()("form",d,!u&&"hidden")},a.a.createElement("textarea",{autoFocus:!0,className:"content",value:m,placeholder:r,onChange:O}),a.a.createElement("div",{className:"form-controls"},a.a.createElement("button",{className:"add-btn",onClick:E},o),a.a.createElement("button",{"aria-label":"close",className:"close-btn",onClick:v}))))}Q.defaultProps={formClassName:"",className:""};var V=Q;var G={HORIZONTAL:0,VERTICAL:1};var Z={PLACEHOLDER:"PLACEHOLDER",REGULAR_ITEM:"REGULAR_ITEM"},W={HORIZONTAL:"HORIZONTAL",VERTICAL:"VERTICAL"};function X(e,t,r){var n=e?e.map(function(e){return{type:Z.REGULAR_ITEM,data:e}}):[];return null!==t&&(n=n.filter(function(e){return e.data.id!==t})),null!==r.index&&(n=function(e,t){return e.splice(t.index,0,{type:Z.PLACEHOLDER,index:t.index,geometry:t.geometry}),e}(n,r)),n}function Y(e){var t=e.id,r=e.acceptedTypes,a=e.listType,o=e.items,c=e.scrollStep,i=e.scrollOffset,d=Object(n.useState)(null),l=Object(_.a)(d,2),s=l[0],u=l[1],b=Object(n.useState)(null),g=Object(_.a)(b,2),f=g[0],p=g[1],O=Object(n.useState)(!1),v=Object(_.a)(O,2),E=v[0],h=v[1],j=Object(n.useRef)({id:t,index:null}),R=Object(n.useRef)([]),y=Object(n.useRef)(null),C=Object(n.useRef)(null),S=Object(n.useRef)(null),x=a===W.HORIZONTAL?G.HORIZONTAL:G.VERTICAL,T=Object(n.useRef)(!1);Object(n.useEffect)(function(){if(T.current=y.current&&function(e,t){return t===G.HORIZONTAL?e.scrollWidth>e.clientWidth:e.scrollHeight>e.clientHeight}(y.current,x),T.current){var e=a===W.HORIZONTAL,t=y.current&&y.current.getBoundingClientRect();C.current=e?t&&t.left+i:t&&t.top+i,S.current=e?t&&t.right-i:t&&t.bottom-i}},[T]);var D=Object(n.useCallback)(function(e){h(!0),p({width:e.geometry.width,height:e.geometry.height})},[]),L=Object(n.useCallback)(function(e){var t={x:e.position.x+e.geometry.width/2,y:e.position.y+e.geometry.height/2},r=function(e,t){for(var r=0,n=e.length-1;r<=n;){var a=Math.floor((r+n)/2);t(e[a])?r=a+1:n=a-1}return-1!==n?n:null}(R.current,function(r){var n=r.getBoundingClientRect();switch(a){case W.HORIZONTAL:var o=0;return n.width>e.geometry.width&&(o=n.width-e.geometry.width),n.left+o<t.x;case W.VERTICAL:var c=0;return n.height>e.geometry.height&&(c=n.height-e.geometry.height),n.top+c<t.y;default:console.error("Uknown list type:",a)}});T.current&&N(t),r=null!==r?r:0,j.current.index=r,u(r)},[s,f,a,T]),I=Object(n.useCallback)(function(){h(!1),p(null),u(null),j.current.index=null},[]),N=Object(n.useCallback)(function(e){switch(a){case W.HORIZONTAL:e.x<=C.current?y.current.scrollLeft-=c:e.x>=S.current&&(y.current.scrollLeft+=c);break;case W.VERTICAL:e.y<=C.current?y.current.scrollTop-=c:e.y>=S.current&&(y.current.scrollTop+=c)}},[a,y,c,C,S]),w=function(e){var t=Object(n.useContext)(m),r=t.draggedObject,a=t.registerDroppable;return Object(n.useEffect)(function(){return a(e)},[e.id,e.context,e.node,e.acceptedTypes,e.onDraggableEnter,e.onDraggableHover,e.onDraggableLeave]),{draggableContext:r&&r.context,droppableClassName:"droppable"}}({id:t,context:j.current,acceptedTypes:r,onDraggableEnter:D,onDraggableHover:L,onDraggableLeave:I}),A=w.draggableContext,k=w.droppableClassName,B={index:s,geometry:f};return{listItems:X(o,A&&A.id,B),setItemRefAt:function(e,t){e&&(R.current[t]=e)},listBodyRef:y,droppableClassName:k,isHoveredByDraggable:E}}r(47);function q(e){var t=e.id,r=e.name,o=e.cards,c=e.addCard,i=e.setListRef,d=e.moveList,l=e.className,s=Y({id:t,listType:W.VERTICAL,acceptedTypes:[p.CARD],items:o,scrollStep:20,scrollOffset:30}),u=s.listBodyRef,b=s.setItemRefAt,g=s.listItems,f=s.droppableClassName,m=Object(n.useRef)(null),O=Object(n.useRef)(null);y({context:{id:t},type:p.LIST,node:O,dragHandle:m,renderElement:function(e){var n=e.clientPosition,o=e.draggedObjectRef;return a.a.createElement("div",{id:t,ref:o,className:R()("card-list","dragged",l),style:B(n)},a.a.createElement("header",null,a.a.createElement("h2",{className:"list-title"},r)),Boolean(g.length)&&a.a.createElement("ul",{className:"list-cards"},g.map(function(e,t){return a.a.createElement(P,Object.assign({key:e.data.id},e.data,{className:"list-card",setCardRef:function(e){return b(e,t)}}))})),a.a.createElement("footer",null,a.a.createElement(V,{className:"add-card-btn",openCreationFormBtnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0451 \u043e\u0434\u043d\u0443 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443",placeholderFormText:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438",submitFormBtnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443",onAdd:c.bind(null,t)})))},onRelease:function(e){var t=e.draggableContext,r=e.droppableContext;d(t.id,r.id,r.index)}});return a.a.createElement("li",{id:t,className:R()(f,l)},a.a.createElement("div",{ref:function(e){i(e),O.current=e},className:"card-list",tabIndex:0},a.a.createElement("header",{ref:m},a.a.createElement("h2",{className:"list-title"},r)),Boolean(g.length)&&a.a.createElement("ul",{className:"list-cards",ref:u},g.map(function(e,t){var r;return(r={},Object(h.a)(r,Z.REGULAR_ITEM,a.a.createElement(P,Object.assign({key:e.data&&e.data.id},e.data,{className:"list-card",setCardRef:function(e){return b(e,t)}}))),Object(h.a)(r,Z.PLACEHOLDER,a.a.createElement("li",{key:"placeholder",ref:function(e){return b(e,t)},className:"placeholder list-card",style:{width:e.geometry&&e.geometry.width,height:e.geometry&&e.geometry.height}})),r)[e.type]})),a.a.createElement("footer",null,a.a.createElement(V,{className:"add-card-btn",openCreationFormBtnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0451 \u043e\u0434\u043d\u0443 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443",placeholderFormText:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438",submitFormBtnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443",onAdd:c.bind(null,t)}))))}q.defaultProps={className:""};var J={addCard:function(e,t){return{type:T.REQUEST,listId:e,content:t}},moveList:function(e,t,r){return{type:x,listId:e,destinationBoardId:t,newListIdx:r}}},z=Object(i.b)(null,J)(q);var K=function(e){return e.board.board};r(48);function $(e){var t=e.id,r=e.background,o=e.name,c=e.lists,i=e.addList,d=e.scrollbarContainer,l=function(e){var t="img"===e.type?"url(".concat(e.url,") no-repeat"):e.color;return Object(n.useMemo)(function(){return{background:t,backgroundSize:"cover"}},[t])}(r),s=Y({id:t,listType:W.HORIZONTAL,acceptedTypes:[p.LIST],items:c,scrollOffset:100,scrollStep:50}),u=s.setItemRefAt,b=s.listBodyRef,g=s.listItems,f=s.droppableClassName;return a.a.createElement("div",{id:t,className:R()("board",f),style:l},a.a.createElement("h1",{className:"board-title",style:{color:o.color}},o.text),a.a.createElement("ul",{ref:function(e){d.current=e,b.current=e},className:"board-lists"},g.map(function(e,t){var r;return(r={},Object(h.a)(r,Z.REGULAR_ITEM,a.a.createElement(z,Object.assign({key:e.data&&e.data.id,className:"board-list",setListRef:function(e){return u(e,t)}},e.data))),Object(h.a)(r,Z.PLACEHOLDER,a.a.createElement("div",{key:"placeholder",ref:function(e){return u(e,t)},className:"placeholder board-list",style:{width:e.geometry&&e.geometry.width,height:e.geometry&&e.geometry.height}})),r)[e.type]}),a.a.createElement(V,{className:"add-list-wrapper",formClassName:"add-list-form",openCreationFormBtnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0451 \u043e\u0434\u043d\u0443 \u043a\u043e\u043b\u043e\u043d\u043a\u0443",placeholderFormText:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043b\u043e\u043d\u043a\u0438",submitFormBtnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043b\u043e\u043d\u043a\u0443",onAdd:i.bind(null,t)})))}var ee={fetchBoard:function(e){return{type:C.REQUEST,id:e}},addList:function(e,t){return{type:D.REQUEST,boardId:e,content:t}}},te=Object(i.b)(function(e){return{board:K(e)}},ee)(function(e){var t=e.id,r=e.board,o=e.fetchBoard,c=e.addList,i=Object(l.a)(e,["id","board","fetchBoard","addList"]);return Object(n.useEffect)(function(){o(t)},[o,t]),r&&a.a.createElement($,Object.assign({addList:c},r,i))});var re=function(){var e=Object(n.useRef)(null);return a.a.createElement(E,{mainScrollbarContainer:e},a.a.createElement(te,{id:0,scrollbarContainer:e}))},ne=r(32),ae=r(10),oe=r(31),ce=r(21),ie={board:null},de=Object(ae.combineReducers)({board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case C.SUCCESS:return Object(d.a)({},e,{board:{id:t.board.id,name:t.board.name,lists:t.board.lists,background:t.board.background}});case S:var r=t.cardId,n=t.destinationListId,a=t.indexInList,o=null,c=e.board.lists.map(function(e){var t=e.cards.find(function(e){return e.id===r});return t?(o=t,Object(d.a)({},e,{cards:e.cards.filter(function(e){return e.id!==r})})):e});if(o){var i=c.find(function(e){return e.id===n});i?i.cards.splice(a,0,o):console.error("List with id",n,"not found")}else console.error("List containing card with id",r,"not found");return Object(d.a)({},e,{board:Object(d.a)({},e.board,{lists:c})});case x:var l=t.listId,s=t.destinationBoardId,u=t.newListIdx;e.board.id!==s&&console.error("Board destination id does not match current board id");var b=e.board.lists.findIndex(function(e){return e.id===l});if(u===b)return e;var g=e.board.lists[b],f=Object(ce.a)(e.board.lists);return f.splice(b,1),f.splice(u,0,g),Object(d.a)({},e,{board:Object(d.a)({},e.board,{lists:f})});case T.SUCCESS:var m=e.board.lists.map(function(e){return e.id===t.listId?Object(d.a)({},e,{cards:[].concat(Object(ce.a)(e.cards),[t.card])}):e});return Object(d.a)({},e,{board:Object(d.a)({},e.board,{lists:m})});case D.SUCCESS:return Object(d.a)({},e,{board:Object(d.a)({},e.board,{lists:[].concat(Object(ce.a)(e.board.lists),[t.list])})});default:return e}}}),le=r(8),se=r.n(le),ue=r(4),be=0,ge={id:(be++).toString(),name:{text:"\u041f\u0440\u043e\u0435\u043a\u0442 \xab\u041a\u0430\u043d\u0431\u0430\u043d \u0414\u043e\u0441\u043a\u0430\xbb",color:"white"},background:{type:"img",color:"rgba(252,223,161,0.91)",url:"https://cdn.dribbble.com/users/58661/screenshots/1818073/csc_pattern.png"},lists:[{id:(be++).toString(),name:"TO DO",cards:[{id:(be++).toString(),content:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0431\u044d\u043a\u0435\u043d\u0434 \u043d\u0430 node.js"},{id:(be++).toString(),content:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0440\u0435\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u0443\u044e \u0430\u043d\u0438\u043c\u0430\u0446\u0438\u044e \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438\n( \u0432 \u0437\u0430\u0432\u0438\u0441\u0438\u043c\u043e\u0441\u0442\u0438 \u043e\u0442 \u043c\u0435\u0441\u0442\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043f\u043e\u0432\u043e\u0440\u0430\u0447\u0438\u0432\u0430\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443 \u043d\u0430 \u0440\u0430\u0437\u043d\u044b\u0439 \u0443\u0433\u043e\u043b, \u043f\u0440\u0438 \u043f\u0430\u0434\u0435\u043d\u0438\u0438 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u043f\u043b\u0430\u0432\u043d\u043e \u0430\u043d\u0438\u043c\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0435\u0451 \u0440\u0430\u0437\u0432\u043e\u0440\u043e\u0442 \u0432 \u0438\u0441\u0445\u043e\u0434\u043d\u043e\u0435 \u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 :))\n"},{id:(be++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 / \u043a\u043e\u043b\u043e\u043d\u043a\u0438"},{id:(be++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0443\u0434\u0430\u043b\u044f\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 / \u043a\u043e\u043b\u043e\u043d\u043a\u0438"}]},{id:(be++).toString(),name:"IN PROGRESS",cards:[{id:(be++).toString(),content:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0444\u0443\u043d\u043a\u0446\u0438\u044e \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u044f \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0439 \u0438 \u043d\u0430 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0445 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0430\u0445"},{id:(be++).toString(),content:"\u041f\u043e\u0441\u043b\u0435 \u043f\u0440\u043e\u0441\u0442\u0430 \u043a\u043b\u0438\u043a\u0430 \u043d\u0435 \u0438\u043d\u0446\u0438\u0438\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u0435"},{id:(be++).toString(),content:"\u041f\u043e \u043f\u0440\u0430\u0432\u043e\u043c\u0443 \u0438 \u0441\u0440\u0435\u0434\u043d\u0435\u043c\u0443 \u043a\u043b\u0438\u043a\u0443 \u043c\u044b\u0448\u0438 \u043d\u0435 \u0438\u043d\u0438\u0446\u0438\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u0435"},{id:(be++).toString(),content:"\u0412\u044b\u0434\u0435\u043b\u044f\u0442\u044c \u043f\u043b\u0435\u0439\u0441\u0445\u043e\u043b\u0434\u0435\u0440 \u0434\u043b\u044f \u043f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u0435\u043c\u043e\u0439 \u043a\u043e\u043b\u043e\u043d\u043a\u0438 \u0446\u0432\u0435\u0442\u043e\u043c"}]},{id:(be++).toString(),name:"DONE",cards:[{id:(be++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u043f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438"},{id:(be++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u043f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u0442\u044c \u043a\u043e\u043b\u043e\u043d\u043a\u0438"},{id:(be++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u043d\u043e\u0432\u044b\u0435 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438"},{id:(be++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u043d\u043e\u0432\u044b\u0435 \u043a\u043e\u043b\u043e\u043d\u043a\u0438"},{id:(be++).toString(),content:"\u0413\u0438\u0431\u043a\u0430\u044f drag drop system"},{id:(be++).toString(),content:"\u041f\u043e\u0437\u0432\u043e\u043b\u0438\u0442\u044c droppable \u043e\u0431\u044a\u0435\u043a\u0442\u0443 \u0438\u043c\u0435\u0442\u044c \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e accepted draggable types"},{id:(be++).toString(),content:"\u0423\u0441\u0442\u0440\u0430\u043d\u0438\u0442\u044c \u043c\u0435\u043b\u044c\u0442\u0435\u0448\u0435\u043d\u0438\u0435 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u0441 \u043c\u0435\u0448\u044c\u0448\u0438\u043c \u043f\u043e \u0440\u0430\u0437\u043c\u0435\u0440\u0443 \u043f\u043b\u0435\u0439\u0441\u0445\u043e\u043b\u0434\u0435\u0440\u043e\u043c"},{id:(be++).toString(),content:"\u041f\u043e\u0437\u0432\u043e\u043b\u0438\u0442\u044c \u043f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u0435\u043c\u043e\u043c\u0443 \u043e\u0431\u044a\u0435\u043a\u0442\u0443 \u0441\u0434\u0432\u0438\u0433\u0430\u0442\u044c \u0441\u043a\u0440\u043e\u043b\u043b\u0431\u0430\u0440"},{id:(be++).toString(),content:"\u0423\u0441\u0442\u0440\u0430\u043d\u0438\u0442\u044c text overflow \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0443"},{id:(be++).toString(),content:"\u041f\u0440\u0438 \u043e\u0442\u043a\u0440\u044b\u0442\u0438\u0438 \u0444\u043e\u0440\u043c\u044b \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u043d\u043e\u0432\u043e\u0439 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u043f\u0435\u0440\u0435\u0434\u0432\u0438\u0433\u0430\u0442\u044c \u0435\u0451 \u0432 \u0437\u043e\u043d\u0443 \u0432\u0438\u0434\u0438\u043c\u043e\u0441\u0442\u0438"},{id:(be++).toString(),content:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u0438 \u043b\u0438\u0441\u0442\u044b \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u043c\u0438 \u0434\u043b\u044f \u043a\u043b\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u044b"}]},{id:(be++).toString(),name:"RETROSPECTIVE",cards:[]}]};function fe(e){return ge}function me(e,t){return{listId:e,card:{id:M.a.uniqueId("card"),content:t}}}function pe(e,t){return{boardId:e,list:{id:M.a.uniqueId("list"),name:t,cards:[]}}}var Oe=se.a.mark(je),ve=se.a.mark(Re),Ee=se.a.mark(ye),he=se.a.mark(Ce);function je(e){var t,r;return se.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.id,n.prev=1,n.next=4,Object(ue.b)(fe,t);case 4:return r=n.sent,n.next=7,Object(ue.c)(L(r));case 7:n.next=13;break;case 9:return n.prev=9,n.t0=n.catch(1),n.next=13,Object(ue.c)(I(n.t0));case 13:case"end":return n.stop()}},Oe,null,[[1,9]])}function Re(e){var t,r,n;return se.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.listId,r=e.content,a.prev=1,a.next=4,Object(ue.b)(me,t,r);case 4:return n=a.sent,a.next=7,Object(ue.c)(N(n.listId,n.card));case 7:a.next=13;break;case 9:return a.prev=9,a.t0=a.catch(1),a.next=13,Object(ue.c)(w(a.t0));case 13:case"end":return a.stop()}},ve,null,[[1,9]])}function ye(e){var t,r,n;return se.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.boardId,r=e.content,a.prev=1,a.next=4,Object(ue.b)(pe,t,r);case 4:return n=a.sent,a.next=7,Object(ue.c)(A(n.boardId,n.list));case 7:a.next=13;break;case 9:return a.prev=9,a.t0=a.catch(1),a.next=13,Object(ue.c)(k(a.t0));case 13:case"end":return a.stop()}},Ee,null,[[1,9]])}function Ce(){return se.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ue.a)([Object(ue.d)(C.REQUEST,je),Object(ue.d)(T.REQUEST,Re),Object(ue.d)(D.REQUEST,ye)]);case 2:case"end":return e.stop()}},he)}var Se=se.a.mark(xe);function xe(){return se.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ue.a)([Object(ue.b)(Ce)]);case 2:case"end":return e.stop()}},Se)}var Te=Object(ne.a)(),De=Object(ae.createStore)(de,{},Object(oe.composeWithDevTools)(Object(ae.applyMiddleware)(Te)));Te.run(xe);r(50),r(51);c.a.render(a.a.createElement(i.a,{store:De},a.a.createElement(re,null)),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.d57f568e.chunk.js.map