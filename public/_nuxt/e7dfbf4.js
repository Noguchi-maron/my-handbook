(window.webpackJsonp=window.webpackJsonp||[]).push([[22,9],{446:function(t,e,n){var content=n(462);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("29942900",content,!0,{sourceMap:!1})},458:function(t,e,n){"use strict";n.r(e);n(9),n(61),n(24),n(39),n(73),n(55),n(8),n(68),n(82),n(56);function o(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,l=!0,d=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return l=t.done,t},e:function(t){d=!0,c=t},f:function(){try{l||null==n.return||n.return()}finally{if(d)throw c}}}}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var c={props:{destLists:Array},computed:{path:function(){var path=[];return this.dests.forEach((function(t){path.push(t.position)})),path},dests:function(){return this.destLists}},data:function(){return{maplocation:{lat:0,lng:0},zoom:14,styleMap:{width:"100%",height:"500px"},mapOptions:{streetViewControl:!1,styles:[]},windowSize:{h:0,w:0}}},mounted:function(){0!=this.dests.length&&this.setMaplocation()},methods:{setMaplocation:function(){var t=0,e=0;this.dests.forEach((function(n){t+=n.position.lat,e+=n.position.lng}));var n={lat:t/this.dests.length,lng:e/this.dests.length};this.maplocation=n,this.setZoom()},setZoom:function(){var t=this;this.$gmapApiPromiseLazy().then((function(){if(t.dests.length>2){var e,n=new google.maps.LatLngBounds,r=o(t.dests);try{for(r.s();!(e=r.n()).done;){var c=e.value;n.extend(c.position)}}catch(t){r.e(t)}finally{r.f()}t.$refs.gmap.fitBounds(n)}}))},resizeWindow:function(){if(window.innerWidth<600){var t=String(Math.floor((window.innerHeight-56)/3));this.styleMap.height=t+"px"}else this.styleMap.height="500px"}}},l=n(30),d=n(90),h=n.n(d),f=n(439),v=n(432),m=n(433),w=n(438),k=n.n(w),_=n(210),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{directives:[{name:"resize",rawName:"v-resize",value:t.resizeWindow,expression:"resizeWindow"}]},[n("v-col",[n("v-card",{attrs:{flat:""}},[n("GmapMap",{ref:"gmap",style:t.styleMap,attrs:{"map-type-id":"roadmap",center:t.maplocation,zoom:t.zoom,options:t.mapOptions}},[t._l(t.dests,(function(e){return n("GmapInfoWindow",{key:"first-"+e.order,attrs:{opened:e.window_open,position:e.position,options:{pixelOffset:{width:0,height:-35}}},on:{closeclick:function(t){e.window_open=!1}}},[t._v(t._s(e.order)+"."+t._s(e.name))])})),t._v(" "),t._l(t.dests,(function(e,o){return n("GmapMarker",{key:"second-"+e.order,attrs:{title:e.name,position:e.position},on:{click:function(e){return t.$emit("clickMarker",o)}}})})),t._v(" "),n("GmapPolyline",{attrs:{path:t.path,options:{strokeColor:"#1A73E8"}}})],2)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VCard:f.a,VCol:v.a,VRow:m.a}),k()(component,{Resize:_.a})},461:function(t,e,n){"use strict";n(446)},462:function(t,e,n){var o=n(20)(!1);o.push([t.i,".scroll-x[data-v-7a879a57]{overflow-x:scroll}",""]),t.exports=o},465:function(t,e,n){"use strict";n.r(e);var o=n(25),r=(n(66),n(9),n(38),n(128),n(29),n(98),{props:{authorId:String,bookId:String},data:function(){return{dests:[],isEdit:!1,book:null,bookData:{},dates:[],selectDate:0,userId:this.authorId,mapActive:!1,mapHeight:500,listHeight:450,isIconShow:!1,isShowAddress:!0}},watch:{selectDate:function(){this.getDests}},computed:{firstDate:function(){if(!this.$route.query.date)return 0;returnthis.$route.query.date}},mounted:function(){this.authorId||(this.userId=this.$store.getters.userId),console.log(this.userId),this.book=this.$fb.firestore().collection("users").doc(this.userId).collection("books").doc(this.bookId),this.getBookData()},methods:{getBookData:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.book.get();case 2:(n=e.sent).exists&&(t.bookData=n.data(),t.getDates(),t.getDests(),console.log(t.bookData));case 4:case"end":return e.stop()}}),e)})))()},getDests:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.mapActive=!1,n=t.selectDate+1,e.next=4,t.book.collection("dests").where("date","==",n).orderBy("order").get().then((function(e){e?(t.dests=e.docs.map((function(t){return t.data()})),console.log(t.dests),t.dests.forEach((function(e){t.$set(e,"window_open",!1)})),console.log("bmbm"),t.mapActive=!0):(t.dests=[],t.mapActive=!0)}));case 4:case"end":return e.stop()}}),e)})))()},openInfo:function(i){this.dests.forEach((function(t){return t.window_open=!1})),this.dests[i].window_open=!0},toSearch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.$fb.firestore.FieldValue.serverTimestamp(),t.book.update({update:n}),t.$router.push("/mypage/".concat(t.bookId,"/search?date=").concat(t.selectDate,"&order=").concat(t.dests.length));case 3:case"end":return e.stop()}}),e)})))()},toEditBook:function(){this.$router.push("/mypage/".concat(this.bookId,"/edit"))},editBtn:function(){this.isEdit=!0},editDone:function(){var t=this;this.dests.forEach((function(e,i){var n=++i;e.order!==n&&(t.setOrder(n,e.id,i),console.log(e.order,n))})),this.isEdit=!1},setOrder:function(t,e){var n=this;return Object(o.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,n.book.collection("dests").doc(e).update({order:t});case 2:case"end":return o.stop()}}),o)})))()},deleteBtn:function(t,i){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.book.collection("dests").doc(t).delete();case 2:e.dests.splice(i,1);case 3:case"end":return n.stop()}}),n)})))()},setDate:function(t){return{year:Number(t.substr(0,4)),month:Number(t.substr(5,2)),date:Number(t.substr(8,2))}},getDates:function(){var t=this.setDate(this.bookData.firstDate);console.log(t);var e=this.setDate(this.bookData.lastDate),n=new Date(t.year,t.month-1,t.date),o=new Date(e.year,e.month-1,e.date);console.log(e),console.log(o);for(var r=(o-n)/864e5,i=1;i<=r+1;i++)this.dates.push(i);console.log(this.dates)},editDestsBtn:function(t){this.$router.push("/mypage/".concat(this.bookId,"/").concat(t,"?date=").concat(this.selectDate))},resizeWindow:function(){if(window.innerWidth<600){this.mapHeight=Math.floor((window.innerHeight-56)/3),this.listHeight=2*this.mapHeight-50-50-50}else this.listHeight=450;window.innerWidth<400?(this.isIconShow=!1,this.isShowAddress=!1):(this.isIconShow=!0,this.isShowAddress=!0)}}}),c=(n(461),n(30)),l=n(90),d=n.n(l),h=n(237),f=n(439),v=n(473),m=n(572),w=n(432),k=n(198),_=n(199),y=n(124),x=n(200),I=n(110),D=n(433),E=n(78),S=n(438),C=n.n(S),A=n(210),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{directives:[{name:"resize",rawName:"v-resize",value:t.resizeWindow,expression:"resizeWindow"}],staticClass:"page-wrap",attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{cols:"11",md:"10"}},[n("v-row",{staticClass:"align-center"},[n("h3",{staticClass:"d-inline-block"},[t._v(t._s(t.bookData.title))]),t._v(" "),t.authorId?t._e():n("v-icon",{staticClass:"ml-4 on-click",on:{click:t.toEditBook}},[t._v("mdi-pencil")])],1),t._v(" "),n("v-row",{attrs:{justify:"space-between"}},[n("v-col",{staticClass:"pr-4",attrs:{cols:"12",sm:"6"}},[t.mapActive?t._e():n("div",{style:{height:t.mapHeight+"px"}}),t._v(" "),t.mapActive?n("MapParts",{attrs:{destLists:t.dests},on:{clickMarker:t.openInfo}}):t._e()],1),t._v(" "),n("v-col",{staticClass:"pl-4",attrs:{cols:"12",sm:"6"}},[n("v-sheet",[n("v-chip-group",{attrs:{mandatory:"","active-class":"primary--text","next-icon":"mdi-chevron-right","show-arrows":t.isIconShow},on:{change:t.getDests},model:{value:t.selectDate,callback:function(e){t.selectDate=e},expression:"selectDate"}},t._l(t.dates,(function(e){return n("v-chip",{key:e},[t._v(t._s(e)+"日目")])})),1)],1),t._v(" "),n("v-card",{style:{height:t.listHeight+"px"},attrs:{outlined:""}},[t.authorId?t._e():n("v-row",{staticClass:"mt-3 mr-4",attrs:{justify:"end"}},[n("v-btn",{attrs:{text:"",color:"primary",disabled:t.isEdit},on:{click:t.toSearch}},[t._v("目的地追加")]),t._v(" "),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:!t.isEdit,expression:"!isEdit"}],attrs:{text:"",color:"error"},on:{click:t.editBtn}},[t._v("編集")]),t._v(" "),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"isEdit"}],attrs:{text:"",color:"error"},on:{click:t.editDone}},[t._v("完了")])],1),t._v(" "),n("v-row",[n("v-col",[n("v-card",{staticClass:"scroll",attrs:{flat:""}},[n("v-list",[n("v-list-item-group",[n("draggable",{attrs:{handle:".item-handle"},model:{value:t.dests,callback:function(e){t.dests=e},expression:"dests"}},t._l(t.dests,(function(e,i){return n("v-list-item",{key:e.order,on:{click:function(e){return t.openInfo(i)}}},[n("v-icon",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"isEdit"}],staticClass:"item-handle",attrs:{color:"#c0c0c0"}},[t._v("mdi-drag-horizontal-variant")]),t._v(" "),n("v-list-item-title",{staticClass:"mr-4"},[n("span",{directives:[{name:"show",rawName:"v-show",value:!t.isEdit,expression:"!isEdit"}]},[t._v(t._s(i+1)+".")]),t._v(" 　"+t._s(e.name))]),t._v(" "),n("v-list-item-subtitle",{directives:[{name:"show",rawName:"v-show",value:t.isShowAddress,expression:"isShowAddress"}],staticClass:"address"},[t._v(t._s(e.address))]),t._v(" "),n("v-btn",{attrs:{color:"primary",text:""},on:{click:function(n){return t.editDestsBtn(e.id)}}},[t._v("詳細")]),t._v(" "),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.isEdit,expression:"isEdit"}],attrs:{color:"error",text:""},on:{click:function(n){return t.deleteBtn(e.id,i)}}},[t._v("削除")])],1)})),1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,"7a879a57",null);e.default=component.exports;d()(component,{MapParts:n(458).default}),d()(component,{VBtn:h.a,VCard:f.a,VChip:v.a,VChipGroup:m.a,VCol:w.a,VIcon:k.a,VList:_.a,VListItem:y.a,VListItemGroup:x.a,VListItemSubtitle:I.b,VListItemTitle:I.c,VRow:D.a,VSheet:E.a}),C()(component,{Resize:A.a})},477:function(t,e,n){"use strict";n.r(e);var o=n(478),r=n.n(o);for(var c in o)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(c);e.default=r.a},478:function(t,e){},546:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return r}));var o=function(){var t=this,e=t.$createElement;return(t._self._c||e)("BooksPage",{attrs:{authorId:t.$route.params.authorId,bookId:t.$route.params.bookId}})},r=[]},550:function(t,e,n){"use strict";n.r(e);var o=n(546),r=n(477);for(var c in r)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(c);var l=n(30),component=Object(l.a)(r.default,o.a,o.b,!1,null,null,null);e.default=component.exports,installComponents(component,{BooksPage:n(465).default})}}]);