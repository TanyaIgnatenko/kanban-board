(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,t,r){e.exports=r(52)},44:function(e,t,r){},46:function(e,t,r){},47:function(e,t,r){},48:function(e,t,r){},50:function(e,t,r){},51:function(e,t,r){},52:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),o=r(17),c=r.n(o),i=r(12),d=r(6),l=r(20),s=r(27),u=r(28),b=r(33),g=r(29),f=r(34),p=a.a.createContext({draggedObject:null,registerDraggable:function(){},registerDroppable:function(){},registerScrollable:function(){}});function m(e){return e.scrollHeight>e.clientHeight}function O(e){return e.scrollWidth>e.clientWidth}var v={CARD:"CARD",LIST:"LIST"},h={BOTTOM:"BOTTOM",TOP:"TOP",RIGHT:"RIGHT",LEFT:"LEFT"},E={LEFT:1,MIDDLE:2,RIGHT:3};var j=function(e){function t(){var e,r;Object(s.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(b.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(a)))).state={draggedObjectPosition:null},r.draggedObject=null,r.hoveredDroppable=null,r.droppables={},r.scrollables={},r.registerScrollable=function(e){return r.scrollables[e.id]=e,function(){delete r.scrollables[e.id]}},r.registerDroppable=function(e){return r.droppables[e.id]=e,function(){delete r.droppables[e.id]}},r.registerDraggable=function(e){var t=e.dragHandleRef,n=Object(l.a)(e,["dragHandleRef"]),a=t.current,o=function(e){if(e.which===E.LEFT){var t={x:e.clientX,y:e.clientY},o=n.ref.current.getBoundingClientRect(),c={x:o.left-t.x,y:o.top-t.y};r.bindedStartDragIfMove=function(e){return r.startDragIfMove(Object(d.a)({handle:a},n),t,c,e)},document.addEventListener("mousemove",r.bindedStartDragIfMove),document.addEventListener("mouseup",r.resetPreparationToDrag),e.stopPropagation()}};return a.addEventListener("mousedown",o),function(){a.removeEventListener("mousedown",o)}},r.startDragIfMove=function(e,t,n,a){var o=a.clientX,c=a.clientY;(Math.abs(o-t.x)>2||Math.abs(c-t.y)>2)&&(document.removeEventListener("mousemove",r.bindedStartDragIfMove),document.removeEventListener("mouseup",r.resetPreparationToDrag),r.grabDraggable(Object(d.a)({grabShift:n},e)))},r.resetPreparationToDrag=function(){document.removeEventListener("mousemove",r.bindedStartDragIfMove),document.removeEventListener("mouseup",r.resetPreparationToDrag)},r.grabDraggable=function(e){var t=e.grabShift,n=e.context,a=e.type,o=e.ref,c=e.handle,i=e.renderAvatar,d=e.onRelease,l=o.current.getBoundingClientRect();r.draggedObject={context:n,type:a,renderAvatar:i,handle:c,onRelease:d,geometry:{width:l.width,height:l.height,grabShift:t},position:{x:l.left,y:l.top},movement:[]},r.dndContext.draggedObject=r.draggedObject,r.manageDroppables(),r.setState({draggedObjectPosition:r.draggedObject.position},function(){document.addEventListener("mousemove",r.moveDraggable),document.addEventListener("mouseup",r.releaseDraggable)})},r.dndContext={draggedObject:null,registerDraggable:r.registerDraggable,registerDroppable:r.registerDroppable,registerScrollable:r.registerScrollable},r.moveDraggable=function(e){var t=e.clientX,n=e.clientY,a=e.movementX,o=e.movementY,c=r.draggedObject.geometry,i={x:t+c.grabShift.x,y:n+c.grabShift.y};r.draggedObject.position=i;var d=[];a&&d.push(a>0?h.RIGHT:h.LEFT),o&&d.push(o>0?h.BOTTOM:h.TOP),r.draggedObject.movement=d,r.scrollIfNedeed({x:t,y:n}),r.manageDroppables(),r.setState({draggedObjectPosition:i})},r.releaseDraggable=function(){var e=r.draggedObject,t=r.hoveredDroppable;document.removeEventListener("mousemove",r.moveDraggable),document.removeEventListener("mouseup",r.releaseDraggable),r.draggedObject=null,r.hoveredDroppable=null,r.dndContext.draggedObject=null,r.setState({draggedObjectPosition:null}),e.onRelease({draggableContext:e.context,droppableContext:t.context}),t.onDraggableLeave()},r.findDroppable=function(e){var t=r.draggedObject.node;!function(e){e?e.style.visibility="hidden":console.error("No element to hide")}(t);var n=document.elementFromPoint(e.x,e.y);for(!function(e){e?e.style.visibility="visible":console.error("No element to hide")}(t);n;){var a=n.closest(".droppable");if(!a)return null;if(r.droppables[a.id]){if(r.droppables[a.id].acceptedTypes.includes(r.draggedObject.type))return r.droppables[a.id];n=a.parentNode}else console.warn("Unregistered droppable with id:",a.id),n=a.parentNode}return null},r.setDraggedObjectRef=function(e){r.draggedObject&&(r.draggedObject.node=e)},r}return Object(f.a)(t,e),Object(u.a)(t,[{key:"scrollIfNedeed",value:function(e){var t=this;Object.values(this.scrollables).forEach(function(r){var n=r.scrollStep,a=r.scrollPointOffset,o=r.scrolledByTypes,c=r.ref.current;c&&o.includes(t.draggedObject.type)&&function(e,t){var r=t.getBoundingClientRect();return e.x>=r.left&&e.x<=r.right&&e.y>=r.top&&e.y<=r.bottom}(e,c)&&(O(c)&&(e.x<=c.clientLeft+a?c.scrollLeft-=n:e.x>=c.clientWidth-a&&(c.scrollLeft+=n)),m(c)&&(e.y<=c.clientTop+a?c.scrollTop-=n:e.y>=c.clientWidth-a&&(c.scrollTop+=n)))})}},{key:"manageDroppables",value:function(){var e=this.draggedObject,t=e.position,r=e.geometry,n=this.hoveredDroppable,a=this.findDroppable({x:t.x+r.width/2,y:t.y+r.height/2});a&&(this.hoveredDroppable=this.droppables[a.id],(!n||a.id!==n.id)&&(n&&n.onDraggableLeave(),this.hoveredDroppable.onDraggableEnter(this.draggedObject)),this.hoveredDroppable.onDraggableHover(this.draggedObject))}},{key:"render",value:function(){var e=this.props.children,t=this.state.draggedObjectPosition,r=this.draggedObject,n=this.dndContext;return a.a.createElement(a.a.Fragment,null,r&&r.renderAvatar({clientPosition:t,draggedObjectRef:this.setDraggedObjectRef}),a.a.createElement(p.Provider,{value:n},e))}}]),t}(a.a.Component),R=r(13),S=r(9),y=r.n(S),C=r(10);function x(e){var t=e.x,r=e.y;return{position:"fixed",left:"".concat(t,"px"),top:"".concat(r,"px")}}var T={REQUEST:"@@board/FETCH_BOARD_REQUEST",SUCCESS:"@@board/FETCH_BOARD_SUCCESS",ERROR:"@@board/FETCH_BOARD_ERROR"},D="@@board/MOVE_CARD",I="@@board/MOVE_LIST",L={REQUEST:"@@board/ADD_CARD_REQUEST",SUCCESS:"@@board/ADD_CARD_SUCCESS",ERROR:"@@board/ADD_CARD_ERROR"},w={REQUEST:"@@board/ADD_LIST_REQUEST",SUCCESS:"@@board/ADD_LIST_SUCCESS",ERROR:"@@board/ADD_LIST_ERROR"},A=function(e){return{type:T.SUCCESS,board:e}},N=function(e){return{type:T.ERROR,error:e}},k=function(e,t){return{type:L.SUCCESS,listId:e,card:t}},P=function(e){return{type:L.ERROR,error:e}},U=function(e,t){return{type:w.SUCCESS,boardId:e,list:t}},B=function(e){return{type:w.ERROR,error:e}};function F(e){var t=Object(n.useContext)(p).registerDraggable;Object(n.useEffect)(function(){return t(e)},[e.context,e.type,e.ref,e.dragHandleRef,e.renderAvatar,e.onRelease])}r(44);function H(e){var t=e.id,r=e.content,o=e.setCardRef,c=e.moveCardToList,i=e.className,d=function(e,n,o){return a.a.createElement("div",{id:t,ref:o,className:y()("card",e&&"dragged",i),style:e?x(n):{},tabIndex:0},a.a.createElement("h4",{className:"card-content"},r))},l=Object(n.useRef)(null);F({context:{id:t},type:v.CARD,ref:l,dragHandleRef:l,renderAvatar:function(e){var t=e.clientPosition,r=e.draggedObjectRef;return d(!0,t,r)},onRelease:function(e){var t=e.draggableContext,r=e.droppableContext;c(t.id,r.id,r.placeholderIndex)}});return d(!1,null,function(e){o(e),l.current=e})}H.defaultProps={className:""};var M={moveCardToList:function(e,t,r){return{type:D,cardId:e,destinationListId:t,indexInList:r}}},_=Object(i.b)(null,M)(H),Q=r(15),G=r.n(Q);r(46);function V(e){var t=e.isFormOpened,r=e.openCreationFormBtnText,o=e.placeholderFormText,c=e.submitFormBtnText,i=e.onAdd,d=e.onFormOpen,l=e.onFormClose,s=e.className,u=e.formClassName,b=e.style,g=Object(n.useRef)(null===t),f=Object(n.useState)(!1),p=Object(C.a)(f,2),m=p[0],O=p[1],v=Object(n.useState)(""),h=Object(C.a)(v,2),E=h[0],j=h[1],R=Object(n.useCallback)(function(e){var t=e.target.value;j(t)},[]),S=Object(n.useCallback)(function(){j(""),g&&O(!1),l()},[]),x=Object(n.useCallback)(function(){E.trim()&&(i(E),S())},[E,S,i]),T=Object(n.useCallback)(function(){g&&O(!0),d()},[]),D=function(e){var t=Object(n.useState)(null),r=Object(C.a)(t,2),a=r[0],o=r[1];return Object(n.useEffect)(function(){o(G.a.uniqueId(e))},[e]),a}("add-component");!function(e,t){var r=Object(n.useCallback)(function(r){!r.target.closest("#".concat(e))&&t()},[e,t]);Object(n.useEffect)(function(){return document.addEventListener("pointerdown",r),function(){document.removeEventListener("pointerdown",r)}},[r])}(D,Object(n.useCallback)(function(){g&&O(!1),l()},[]));var I=Object(n.useRef)(null);return Object(n.useEffect)(function(){m&&I.current.scrollIntoView(!1)},[m]),a.a.createElement("div",{id:D,className:y()("add-component-wrapper",s),style:b},a.a.createElement("button",{className:y()("open-form-btn",{hidden:g.current&&m||!g.current&&t}),onClick:T},a.a.createElement("h4",null,r)),a.a.createElement("div",{ref:function(e){return I.current=e},className:y()("form",u,{hidden:g.current&&!m||!g.current&&!t})},a.a.createElement("textarea",{autoFocus:!0,className:"content",value:E,placeholder:o,onChange:R}),a.a.createElement("div",{className:"form-controls"},a.a.createElement("button",{className:"add-btn",onClick:x},c),a.a.createElement("button",{"aria-label":"close",className:"close-btn",onClick:S}))))}V.defaultProps={isFormOpened:null,className:"",formClassName:"",onFormOpen:function(){},onFormClose:function(){}};var W=V;var X={PLACEHOLDER:"PLACEHOLDER",REGULAR_ITEM:"REGULAR_ITEM"},Y={HORIZONTAL:"HORIZONTAL",VERTICAL:"VERTICAL"};function Z(e,t,r){var n=e?e.map(function(e){return{type:X.REGULAR_ITEM,data:e}}):[];return null!==t&&(n=n.filter(function(e){return e.data.id!==t})),null!==r.placeholderIndex&&(n=function(e,t){return e.splice(t.placeholderIndex,0,{type:X.PLACEHOLDER,placeholderIndex:t.placeholderIndex,geometry:t.geometry}),e}(n,r)),n}function q(e){var t=e.id,r=e.acceptedTypes,a=e.listType,o=e.items,c=Object(n.useState)(null),i=Object(C.a)(c,2),d=i[0],l=i[1],s=Object(n.useState)(null),u=Object(C.a)(s,2),b=u[0],g=u[1],f=Object(n.useState)(!1),m=Object(C.a)(f,2),O=m[0],v=m[1],h=Object(n.useRef)({id:t,placeholderIndex:null}),E=Object(n.useRef)([]),j=Object(n.useCallback)(function(e){v(!0),g({width:e.geometry.width,height:e.geometry.height})},[]),R=Object(n.useCallback)(function(e){var t=e.position.x+e.geometry.width/2,r=e.position.y+e.geometry.height/2,n=function(e,t){for(var r=0,n=e.length-1;r<=n;){var a=Math.floor((r+n)/2);t(e[a])?r=a+1:n=a-1}return-1!==n?n:null}(E.current,function(n){var o=n.getBoundingClientRect();switch(a){case Y.HORIZONTAL:var c=0;return o.width>e.geometry.width&&(c=o.width-e.geometry.width),o.left+c<t;case Y.VERTICAL:var i=0;return o.height>e.geometry.height&&(i=o.height-e.geometry.height),o.top+i<r;default:console.error("Unknown list type:",a)}});n=null!==n?n:0,h.current.placeholderIndex=n,l(n)},[d,a]),S=Object(n.useCallback)(function(){v(!1),g(null),l(null),h.current.placeholderIndex=null},[]),y=function(e){var t=Object(n.useContext)(p),r=t.draggedObject,a=t.registerDroppable;return Object(n.useEffect)(function(){return a(e)},[e.id,e.context,e.acceptedTypes,e.onDraggableEnter,e.onDraggableHover,e.onDraggableLeave]),{draggableContext:r&&r.context,droppableClassName:"droppable"}}({id:t,context:h.current,acceptedTypes:r,onDraggableEnter:j,onDraggableHover:R,onDraggableLeave:S}),x=y.draggableContext,T=y.droppableClassName,D={placeholderIndex:d,geometry:b};return{listItems:Z(o,x&&x.id,D),setItemRefAt:function(e,t){e&&(E.current[t]=e)},droppableClassName:T,isHoveredByDraggable:O}}r(47);function z(e){var t=e.id,r=e.scrollPointOffset,a=void 0===r?0:r,o=e.scrollStep,c=void 0===o?10:o,i=e.scrolledByTypes,d=void 0===i?[]:i,l=Object(n.useRef)(null),s=Object(n.useContext)(p).registerScrollable;return Object(n.useEffect)(function(){return s({id:t,ref:l,scrolledByTypes:d,scrollPointOffset:a,scrollStep:c})},[t,c,a,d]),l}function J(e){var t=e.id,r=e.name,o=e.cards,c=e.addCard,i=e.setListRef,d=e.moveList,l=e.className,s=Object(n.useMemo)(function(){return[v.CARD]},[]),u=q({id:t,listType:Y.VERTICAL,acceptedTypes:s,items:o}),b=u.setItemRefAt,g=u.listItems,f=u.droppableClassName,p=Object(n.useMemo)(function(){return[v.CARD]}),m=z({id:t,scrolledByTypes:p,scrollPointOffset:60,scrollStep:20}),O=Object(n.useRef)(null),h=Object(n.useRef)(null),E=Object(n.useState)(!1),j=Object(C.a)(E,2),S=j[0],T=j[1],D=a.a.createElement(W,{isFormOpened:S,formClassName:"card-form",openCreationFormBtnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0451 \u043e\u0434\u043d\u0443 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443",placeholderFormText:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438",submitFormBtnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443",onFormOpen:function(){return T(!0)},onFormClose:function(){return T(!1)},onAdd:c.bind(null,t)}),I=a.a.createElement(a.a.Fragment,null,a.a.createElement("header",{ref:O},a.a.createElement("h2",{className:"list-title"},r)),(Boolean(g.length)||S)&&a.a.createElement("ul",{ref:m,className:"list-cards"},g.map(function(e,t){var r;return(r={},Object(R.a)(r,X.REGULAR_ITEM,a.a.createElement("li",{key:e.data&&e.data.id},a.a.createElement(_,Object.assign({},e.data,{className:"list-card",setCardRef:function(e){return b(e,t)}})))),Object(R.a)(r,X.PLACEHOLDER,a.a.createElement("li",{key:"placeholder"},a.a.createElement("div",{ref:function(e){return b(e,t)},className:"placeholder list-card",style:{width:e.geometry&&e.geometry.width,height:e.geometry&&e.geometry.height}}))),r)[e.type]}),S&&D),a.a.createElement("footer",null,!S&&D));F({context:{id:t},type:v.LIST,ref:h,dragHandleRef:O,renderAvatar:function(e){var r=e.clientPosition,n=e.draggedObjectRef;return a.a.createElement("div",{id:t,ref:n,className:y()("card-list","dragged",l),style:x(r)},I)},onRelease:function(e){var t=e.draggableContext,r=e.droppableContext;d(t.id,r.id,r.placeholderIndex)}});return a.a.createElement("div",{id:t,className:y()(f,l)},a.a.createElement("div",{id:t,ref:function(e){i(e),h.current=e},className:"card-list",tabIndex:0},I))}J.defaultProps={className:""};var K={addCard:function(e,t){return{type:L.REQUEST,listId:e,content:t}},moveList:function(e,t,r){return{type:I,listId:e,destinationBoardId:t,newListIdx:r}}},$=Object(i.b)(null,K)(J);var ee=function(e){return e.board.board};r(48);function te(e){var t=e.id,r=e.background,o=e.name,c=e.lists,i=e.addList,d=function(e){var t="img"===e.type?"url(".concat(e.url,") no-repeat"):e.color;return Object(n.useMemo)(function(){return{background:t,backgroundSize:"cover"}},[t])}(r),l=Object(n.useMemo)(function(){return[v.LIST]},[]),s=q({id:t,listType:Y.HORIZONTAL,acceptedTypes:l,items:c}),u=s.setItemRefAt,b=s.listItems,g=s.droppableClassName,f=z({id:t,scrolledByTypes:Object(n.useMemo)(function(){return[v.LIST,v.CARD]},[]),scrollPointOffset:60,scrollStep:20});return a.a.createElement("div",{id:t,className:y()("board",g),style:d},a.a.createElement("h1",{className:"board-title",style:{color:o.color}},o.text),a.a.createElement("ul",{ref:f,className:"board-lists"},b.map(function(e,t){var r;return(r={},Object(R.a)(r,X.REGULAR_ITEM,a.a.createElement("li",{key:e.data&&e.data.id},a.a.createElement($,Object.assign({className:"board-list-zone",setListRef:function(e){return u(e,t)}},e.data)))),Object(R.a)(r,X.PLACEHOLDER,a.a.createElement("li",{key:"placeholder"},a.a.createElement("div",{ref:function(e){return u(e,t)},className:"placeholder board-list-zone",style:{width:e.geometry&&e.geometry.width,height:e.geometry&&e.geometry.height}}))),r)[e.type]}),a.a.createElement(W,{className:"add-list-wrapper",formClassName:"add-list-form",openCreationFormBtnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0451 \u043e\u0434\u043d\u0443 \u043a\u043e\u043b\u043e\u043d\u043a\u0443",placeholderFormText:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043b\u043e\u043d\u043a\u0438",submitFormBtnText:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043b\u043e\u043d\u043a\u0443",onAdd:i.bind(null,t)})))}var re={fetchBoard:function(e){return{type:T.REQUEST,id:e}},addList:function(e,t){return{type:w.REQUEST,boardId:e,content:t}}},ne=Object(i.b)(function(e){return{board:ee(e)}},re)(function(e){var t=e.id,r=e.board,o=e.fetchBoard,c=e.addList,i=Object(l.a)(e,["id","board","fetchBoard","addList"]);return Object(n.useEffect)(function(){o(t)},[o,t]),r&&a.a.createElement(te,Object.assign({addList:c},r,i))});var ae=function(){return a.a.createElement(j,null,a.a.createElement(ne,{id:0}))},oe=r(32),ce=r(11),ie=r(30),de=r(31),le={board:null},se=Object(ce.combineReducers)({board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case T.SUCCESS:return Object(d.a)({},e,{board:t.board});case D:var r=t.cardId,n=t.destinationListId,a=t.indexInList,o=null,c=e.board.lists.map(function(e){var t=e.cards.find(function(e){return e.id===r});return t?(o=t,Object(d.a)({},e,{cards:e.cards.filter(function(e){return e.id!==r})})):e});if(o){var i=c.find(function(e){return e.id===n});i?i.cards.splice(a,0,o):console.error("List with id",n,"not found")}else console.error("List containing card with id",r,"not found");return Object(d.a)({},e,{board:Object(d.a)({},e.board,{lists:c})});case I:var l=t.listId,s=t.destinationBoardId,u=t.newListIdx;e.board.id!==s&&console.error("Destination board id does not match current board id");var b=e.board.lists.findIndex(function(e){return e.id===l});if(u===b)return e;var g=e.board.lists[b],f=Object(de.a)(e.board.lists);return f.splice(b,1),f.splice(u,0,g),Object(d.a)({},e,{board:Object(d.a)({},e.board,{lists:f})});case L.SUCCESS:var p=t.listId,m=t.card,O=e.board.lists.map(function(e){return e.id===p?Object(d.a)({},e,{cards:e.cards.push(m)}):e});return Object(d.a)({},e,{board:Object(d.a)({},e.board,{lists:O})});case w.SUCCESS:var v=t.boardId,h=t.list;return e.board.id!==v&&console.error("Board id does not match current board id"),Object(d.a)({},e,{board:Object(d.a)({},e.board,{lists:e.board.lists.push(h)})});default:return e}}}),ue=r(7),be=r.n(ue),ge=r(4),fe=0,pe={id:(fe++).toString(),name:{text:"\u041f\u0440\u043e\u0435\u043a\u0442 \xab\u041a\u0430\u043d\u0431\u0430\u043d \u0414\u043e\u0441\u043a\u0430\xbb",color:"white"},background:{type:"img",color:"rgba(252,223,161,0.91)",url:"https://cdn.dribbble.com/users/58661/screenshots/1818073/csc_pattern.png"},lists:[{id:(fe++).toString(),name:"TO DO",cards:[{id:(fe++).toString(),content:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0431\u044d\u043a\u0435\u043d\u0434 \u043d\u0430 node.js"},{id:(fe++).toString(),content:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0440\u0435\u0430\u043b\u0438\u0441\u0442\u0438\u0447\u043d\u0443\u044e \u0430\u043d\u0438\u043c\u0430\u0446\u0438\u044e \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438\n( \u0432 \u0437\u0430\u0432\u0438\u0441\u0438\u043c\u043e\u0441\u0442\u0438 \u043e\u0442 \u043c\u0435\u0441\u0442\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043f\u043e\u0432\u043e\u0440\u0430\u0447\u0438\u0432\u0430\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443 \u043d\u0430 \u0440\u0430\u0437\u043d\u044b\u0439 \u0443\u0433\u043e\u043b, \u043f\u0440\u0438 \u043f\u0430\u0434\u0435\u043d\u0438\u0438 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u043f\u043b\u0430\u0432\u043d\u043e \u0430\u043d\u0438\u043c\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0435\u0451 \u0440\u0430\u0437\u0432\u043e\u0440\u043e\u0442 \u0432 \u0438\u0441\u0445\u043e\u0434\u043d\u043e\u0435 \u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u0435 :))\n"},{id:(fe++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 / \u043a\u043e\u043b\u043e\u043d\u043a\u0438"},{id:(fe++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0443\u0434\u0430\u043b\u044f\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 / \u043a\u043e\u043b\u043e\u043d\u043a\u0438"}]},{id:(fe++).toString(),name:"IN PROGRESS",cards:[{id:(fe++).toString(),content:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0444\u0443\u043d\u043a\u0446\u0438\u044e \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u044f \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0439 \u0438 \u043d\u0430 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0445 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0430\u0445"},{id:(fe++).toString(),content:"\u041f\u043e\u0441\u043b\u0435 \u043f\u0440\u043e\u0441\u0442\u0430 \u043a\u043b\u0438\u043a\u0430 \u043d\u0435 \u0438\u043d\u0446\u0438\u0438\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u0435"},{id:(fe++).toString(),content:"\u041f\u043e \u043f\u0440\u0430\u0432\u043e\u043c\u0443 \u0438 \u0441\u0440\u0435\u0434\u043d\u0435\u043c\u0443 \u043a\u043b\u0438\u043a\u0443 \u043c\u044b\u0448\u0438 \u043d\u0435 \u0438\u043d\u0438\u0446\u0438\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d\u0438\u0435"},{id:(fe++).toString(),content:"\u0412\u044b\u0434\u0435\u043b\u044f\u0442\u044c \u043f\u043b\u0435\u0439\u0441\u0445\u043e\u043b\u0434\u0435\u0440 \u0434\u043b\u044f \u043f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u0435\u043c\u043e\u0439 \u043a\u043e\u043b\u043e\u043d\u043a\u0438 \u0446\u0432\u0435\u0442\u043e\u043c"}]},{id:(fe++).toString(),name:"DONE",cards:[{id:(fe++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u043f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438"},{id:(fe++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u043f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u0442\u044c \u043a\u043e\u043b\u043e\u043d\u043a\u0438"},{id:(fe++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u043d\u043e\u0432\u044b\u0435 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438"},{id:(fe++).toString(),content:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0441\u043e\u0437\u0434\u0430\u0432\u0430\u0442\u044c \u043d\u043e\u0432\u044b\u0435 \u043a\u043e\u043b\u043e\u043d\u043a\u0438"},{id:(fe++).toString(),content:"\u0413\u0438\u0431\u043a\u0430\u044f drag drop system"},{id:(fe++).toString(),content:"\u041f\u043e\u0437\u0432\u043e\u043b\u0438\u0442\u044c droppable \u043e\u0431\u044a\u0435\u043a\u0442\u0443 \u0438\u043c\u0435\u0442\u044c \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e accepted draggable types"},{id:(fe++).toString(),content:"\u0423\u0441\u0442\u0440\u0430\u043d\u0438\u0442\u044c \u043c\u0435\u043b\u044c\u0442\u0435\u0448\u0435\u043d\u0438\u0435 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u0441 \u043c\u0435\u0448\u044c\u0448\u0438\u043c \u043f\u043e \u0440\u0430\u0437\u043c\u0435\u0440\u0443 \u043f\u043b\u0435\u0439\u0441\u0445\u043e\u043b\u0434\u0435\u0440\u043e\u043c"},{id:(fe++).toString(),content:"\u041f\u043e\u0437\u0432\u043e\u043b\u0438\u0442\u044c \u043f\u0435\u0440\u0435\u0442\u0430\u0441\u043a\u0438\u0432\u0430\u0435\u043c\u043e\u043c\u0443 \u043e\u0431\u044a\u0435\u043a\u0442\u0443 \u0441\u0434\u0432\u0438\u0433\u0430\u0442\u044c \u0441\u043a\u0440\u043e\u043b\u043b\u0431\u0430\u0440"},{id:(fe++).toString(),content:"\u0423\u0441\u0442\u0440\u0430\u043d\u0438\u0442\u044c text overflow \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0443"},{id:(fe++).toString(),content:"\u041f\u0440\u0438 \u043e\u0442\u043a\u0440\u044b\u0442\u0438\u0438 \u0444\u043e\u0440\u043c\u044b \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u043d\u043e\u0432\u043e\u0439 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u043f\u0435\u0440\u0435\u0434\u0432\u0438\u0433\u0430\u0442\u044c \u0435\u0451 \u0432 \u0437\u043e\u043d\u0443 \u0432\u0438\u0434\u0438\u043c\u043e\u0441\u0442\u0438"},{id:(fe++).toString(),content:"\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u0438 \u043b\u0438\u0441\u0442\u044b \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u043c\u0438 \u0434\u043b\u044f \u043a\u043b\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u044b"},{id:(fe++).toString(),content:"\u0417\u0430\u043f\u0440\u0435\u0442\u0438\u0442\u044c \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043f\u0443\u0441\u0442\u044b\u0445 \u0438\u043b\u0438 \u043d\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0445 \u0442\u043e\u043b\u044c\u043a\u043e \u043f\u0440\u043e\u0431\u0435\u043b\u0430\u043c\u0438 \u0438 \u043f\u0435\u0440\u0435\u043d\u043e\u0441\u0430\u043c\u0438 \u0441\u0442\u0440\u043e\u043a \u043a\u0430\u0440\u0442\u043e\u0447\u0435\u043a/\u043a\u043e\u043b\u043e\u043d\u043e\u043a"}]},{id:(fe++).toString(),name:"RETROSPECTIVE",cards:[]}]};function me(e){return pe}function Oe(e,t){return{listId:e,card:{id:G.a.uniqueId("card"),content:t}}}function ve(e,t){return{boardId:e,list:{id:G.a.uniqueId("list"),name:t,cards:[]}}}var he=be.a.mark(Se),Ee=be.a.mark(ye),je=be.a.mark(Ce),Re=be.a.mark(xe);function Se(e){var t,r;return be.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t=e.id,n.prev=1,n.next=4,Object(ge.b)(me,t);case 4:return r=n.sent,n.next=7,Object(ge.c)(A(r));case 7:n.next=13;break;case 9:return n.prev=9,n.t0=n.catch(1),n.next=13,Object(ge.c)(N(n.t0));case 13:case"end":return n.stop()}},he,null,[[1,9]])}function ye(e){var t,r,n;return be.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.listId,r=e.content,a.prev=1,a.next=4,Object(ge.b)(Oe,t,r);case 4:return n=a.sent,a.next=7,Object(ge.c)(k(n.listId,n.card));case 7:a.next=13;break;case 9:return a.prev=9,a.t0=a.catch(1),a.next=13,Object(ge.c)(P(a.t0));case 13:case"end":return a.stop()}},Ee,null,[[1,9]])}function Ce(e){var t,r,n;return be.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.boardId,r=e.content,a.prev=1,a.next=4,Object(ge.b)(ve,t,r);case 4:return n=a.sent,a.next=7,Object(ge.c)(U(n.boardId,n.list));case 7:a.next=13;break;case 9:return a.prev=9,a.t0=a.catch(1),a.next=13,Object(ge.c)(B(a.t0));case 13:case"end":return a.stop()}},je,null,[[1,9]])}function xe(){return be.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ge.a)([Object(ge.d)(T.REQUEST,Se),Object(ge.d)(L.REQUEST,ye),Object(ge.d)(w.REQUEST,Ce)]);case 2:case"end":return e.stop()}},Re)}var Te=be.a.mark(De);function De(){return be.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(ge.a)([Object(ge.b)(xe)]);case 2:case"end":return e.stop()}},Te)}var Ie=Object(oe.a)(),Le=Object(ce.createStore)(se,{},Object(ie.composeWithDevTools)(Object(ce.applyMiddleware)(Ie)));Ie.run(De);r(50),r(51);c.a.render(a.a.createElement(i.a,{store:Le},a.a.createElement(ae,null)),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.c4a89aab.chunk.js.map