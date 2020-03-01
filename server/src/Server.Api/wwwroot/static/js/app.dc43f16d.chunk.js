(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{343:function(e,t){},344:function(e,t){},345:function(e,t){},346:function(e,t){},347:function(e,t){},348:function(e,t){},349:function(e,t,n){"use strict";var a;n.d(t,"a",(function(){return a})),function(e){e.Enabled="Enabled",e.Disabled="Disabled"}(a||(a={}))},350:function(e,t){},397:function(e,t,n){"use strict";var a=n(0),r=n(15),s=n(369),u=n(364),c=n(607),o=n(16),l=n(27),i=n.n(l),m=n(21),d=n.n(m),f=n(366),j=n(130),p=n(383),y=n.n(p).a.create({baseURL:"/api",timeout:1e4}),S=function(e){var t;return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,i.a.awrap(y.get("studies",{params:e}));case 2:return t=n.sent,n.abrupt("return",t.data);case 4:case"end":return n.stop()}}))},b=function(e){var t=e.name;return y.post("study",{name:t})},v=function(e){var t=e.id,n=e.name,a=e.state;return y.put("study/"+t,{name:n,state:a})},E=function(e){var t,n,a,r;return i.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return t=e.id,n=e.page,a=e.results,s.next=3,i.a.awrap(y.get("study/"+t+"/results",{params:{page:n,results:a}}));case 3:return r=s.sent,s.abrupt("return",r.data);case 5:case"end":return s.stop()}}))},g=n(3),h=n(11),w=n.n(h),k=n(608),O=n(193),x=function(){var e=a.useState(!1),t=d()(e,2),n=t[0],r=t[1],s=a.useState(""),u=d()(s,2),c=u[0],o=u[1],l=a.useState(""),i=d()(l,2),m=i[0],f=i[1],j=a.useRef(y.interceptors.response.use((function(e){return f(e.data),e}),(function(e){return r(!0),o(e.message),Promise.reject(e)})));return a.useEffect((function(){return function(){y.interceptors.response.eject(j.current)}})),a.createElement(O.a,{visible:n,actions:[{label:"Ok",onPress:function(){return r(!1)}}],icon:function(e){return a.createElement(k.a,w()({},e,{name:"wifi-off"}))}},c+"\n"+m)},z=function(e){return a.createElement(g.a,{style:{flex:1}},a.createElement(x,null),e.children)},C=function(e){var t=e.route,n=e.navigation,r=t.params.onSubmit,s=a.useState(""),u=d()(s,2),c=u[0],o=u[1];return a.createElement(z,null,a.createElement(f.a,{label:"Name",value:c,onChangeText:o}),a.createElement(j.a,{icon:"content-save",mode:"contained",onPress:function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.awrap(b({name:c}));case 2:return e.next=4,i.a.awrap(r());case 4:n.goBack();case 5:case"end":return e.stop()}}))}},"Save"))},P=n(10),D=n.n(P),M=n(2),I=n(351),H=n(352),T=n(99),R=M.a.create({row:{flexDirection:"row",justifyContent:"space-between"}}),Y=function(e){var t=e.route,n=e.navigation,r=t.params,s=r.study,u=r.onSubmit,c=a.useState(s.name),o=d()(c,2),l=o[0],m=o[1],p=a.useState(s.state||T.StudyState.Enabled),y=d()(p,2),S=y[0],b=y[1];return a.createElement(z,null,a.createElement(g.a,{style:R.row},a.createElement(I.a,null,"Id"),a.createElement(I.a,null,s.id)),a.createElement(g.a,{style:R.row},a.createElement(I.a,null,"Created"),a.createElement(I.a,null,D()(s.created).format("DD MMM HH:mm"))),a.createElement(f.a,{label:"Name",value:l,onChangeText:m}),a.createElement(g.a,{style:R.row},a.createElement(I.a,null,S),a.createElement(H.a,{value:S===T.StudyState.Enabled,onValueChange:function(){b(S===T.StudyState.Enabled?T.StudyState.Disabled:T.StudyState.Enabled)}})),a.createElement(j.a,{icon:"content-save",mode:"contained",onPress:function(){return i.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.awrap(v({id:s.id,name:l,state:S}));case 2:return e.next=4,i.a.awrap(u());case 4:n.goBack();case 5:case"end":return e.stop()}}))}},"Save"))},N=n(28),A=n.n(N),L=n(367),W=n(88),F=function(e){var t=e.studyId,n=a.useState([]),r=d()(n,2),s=r[0],u=r[1],c=a.useState(0),o=d()(c,2),l=o[0],m=o[1],f=a.useState(0),j=d()(f,2),p=j[0],y=j[1],S=a.useState(0),b=d()(S,2),v=b[0],g=b[1],h=a.useState(!0),w=d()(h,2),k=w[0],O=w[1];a.useEffect((function(){x()}),[l]);var x=function(){var e;return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return O(!0),n.next=3,i.a.awrap(E({id:t,page:l,results:5}));case 3:e=n.sent,g(e.totalPages),y(e.totalResults),u(e.items),O(!1);case 8:case"end":return n.stop()}}))},z=a.useRef(new WebSocket("ws://studies-pk.herokuapp.com/api/ws/studyresults?id="+t)),C=a.useCallback((function(){z.current.onmessage=function(e){var t=JSON.parse(e.data);u((function(e){return e.pop(),[t].concat(A()(e))})),y((function(e){return e+1}))}}),[]),P=a.useCallback((function(){z.current.close()}),[]);return a.useEffect((function(){return C(),function(){P()}}),[]),a.createElement(L.a,null,a.createElement(L.a.Header,null,a.createElement(L.a.Title,null,"Created"),a.createElement(L.a.Title,{numeric:!0},"StationId"),a.createElement(L.a.Title,{numeric:!0},"SensorId"),a.createElement(L.a.Title,{numeric:!0},"Value")),k?a.createElement(W.a,null):s.map((function(e){return a.createElement(L.a.Row,{key:e.created},a.createElement(L.a.Cell,null,D()(e.created).format("DD MMM HH:mm")),a.createElement(L.a.Cell,{numeric:!0},e.stationId),a.createElement(L.a.Cell,{numeric:!0},e.sensorId),a.createElement(L.a.Cell,{numeric:!0},e.value))})),a.createElement(L.a.Pagination,{page:l,numberOfPages:v,onPageChange:function(e){return m(e)},label:5*l+1+" - "+Math.min(5*l+5,p)+" of "+p}))},G=M.a.create({row:{flexDirection:"row",justifyContent:"space-between"}}),J=function(e){var t=e.route.params.study;return a.createElement(z,null,a.createElement(g.a,{style:G.row},a.createElement(I.a,null,"Id"),a.createElement(I.a,null,t.id)),a.createElement(g.a,{style:G.row},a.createElement(I.a,null,"Created"),a.createElement(I.a,null,D()(t.created).format("DD MMM YYYY HH:mm"))),a.createElement(g.a,{style:G.row},a.createElement(I.a,null,"State"),a.createElement(I.a,null,t.state)),a.createElement(F,{studyId:t.id}))},U=n(44),q=n(368),B=n(35),V=n(37),_=function(e){var t=e.study,n=e.onEditSubmit,r=Object(B.useNavigation)();return a.createElement(V.a,{onPress:function(){r.navigate("Results",{study:t})},onLongPress:function(){r.navigate("ModifyStudy",{study:t,onSubmit:n})}},a.createElement(U.a.Item,{title:t.name,description:D()(t.created).format("DD MMM YYYY HH:mm"),left:function(e){return a.createElement(U.a.Icon,w()({},e,{icon:"folder"}))},right:function(e){return a.createElement(U.a.Icon,w()({},e,{icon:"chevron-right"}))}}))},K=(M.a.create({fab:{}}),function(e){var t=e.navigation,n=a.useState(!1),r=d()(n,2),s=r[0],u=r[1],c=a.useState([]),o=d()(c,2),l=o[0],m=o[1],f=a.useState(0),j=d()(f,2),p=j[0],y=(j[1],a.useState(!0)),b=d()(y,2),v=b[0],E=b[1];a.useEffect((function(){g()}),[]);var g=function(){var e;return i.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return E(!0),t.next=3,i.a.awrap(S({page:p}));case 3:e=t.sent,m(e.items),E(!1);case 6:case"end":return t.stop()}}))};return a.createElement(z,null,a.createElement(U.a.Section,{title:"Studies"},v&&a.createElement(W.a,null),l.map((function(e){return a.createElement(_,{key:e.created,study:e,onEditSubmit:g})}))),a.createElement(q.a.Group,{open:s,visible:!0,icon:s?"close":"plus",actions:[{icon:"plus",label:"Add new",onPress:function(){t.navigate("AddStudy",{onSubmit:g})}},{icon:"refresh",label:"Refresh list",onPress:function(){}}],onStateChange:function(e){var t=e.open;return u(t)}}))}),Q=Object(c.a)(),X=Object(o.b)((function(e){var t=e.theme;return a.createElement(u.a,null,a.createElement(Q.Navigator,{screenOptions:{headerStyle:{backgroundColor:t.colors.primary},headerTintColor:"#fff",headerTitleStyle:{fontWeight:"bold"}}},a.createElement(Q.Screen,{name:"Studies",component:K}),a.createElement(Q.Screen,{name:"Results",options:function(e){return{title:e.route.params.study.name}},component:J}),a.createElement(Q.Screen,{name:"ModifyStudy",options:function(e){return{title:"Modify "+e.route.params.study.name}},component:Y}),a.createElement(Q.Screen,{name:"AddStudy",options:function(){return{title:"Add a new study"}},component:C})))})),Z=n(14),$=n.n(Z),ee=n(82);function te(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function ne(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?te(Object(n),!0).forEach((function(t){$()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):te(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ae=ne({},ee.a,{colors:ne({},ee.a.colors,{primary:"#1a237e",accent:"#000051",backdrop:"rgba(255, 255, 255, 0.92)"})});function re(){return a.createElement(s.a,{theme:ae},a.createElement(a.Fragment,null,"web"===r.a.OS?a.createElement("style",{type:"text/css"},"\n        @font-face {\n          font-family: 'MaterialCommunityIcons';\n          src: url("+n(173)+") format('truetype');\n        }\n      "):null,a.createElement(X,null)))}n.d(t,"a",(function(){return re}))},423:function(e,t,n){n(424),e.exports=n(593)},424:function(e,t){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/expo-service-worker.js",{scope:"/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))},573:function(e,t,n){var a={"./af":216,"./af.js":216,"./ar":217,"./ar-dz":218,"./ar-dz.js":218,"./ar-kw":219,"./ar-kw.js":219,"./ar-ly":220,"./ar-ly.js":220,"./ar-ma":221,"./ar-ma.js":221,"./ar-sa":222,"./ar-sa.js":222,"./ar-tn":223,"./ar-tn.js":223,"./ar.js":217,"./az":224,"./az.js":224,"./be":225,"./be.js":225,"./bg":226,"./bg.js":226,"./bm":227,"./bm.js":227,"./bn":228,"./bn.js":228,"./bo":229,"./bo.js":229,"./br":230,"./br.js":230,"./bs":231,"./bs.js":231,"./ca":232,"./ca.js":232,"./cs":233,"./cs.js":233,"./cv":234,"./cv.js":234,"./cy":235,"./cy.js":235,"./da":236,"./da.js":236,"./de":237,"./de-at":238,"./de-at.js":238,"./de-ch":239,"./de-ch.js":239,"./de.js":237,"./dv":240,"./dv.js":240,"./el":241,"./el.js":241,"./en-SG":242,"./en-SG.js":242,"./en-au":243,"./en-au.js":243,"./en-ca":244,"./en-ca.js":244,"./en-gb":245,"./en-gb.js":245,"./en-ie":246,"./en-ie.js":246,"./en-il":247,"./en-il.js":247,"./en-nz":248,"./en-nz.js":248,"./eo":249,"./eo.js":249,"./es":250,"./es-do":251,"./es-do.js":251,"./es-us":252,"./es-us.js":252,"./es.js":250,"./et":253,"./et.js":253,"./eu":254,"./eu.js":254,"./fa":255,"./fa.js":255,"./fi":256,"./fi.js":256,"./fo":257,"./fo.js":257,"./fr":258,"./fr-ca":259,"./fr-ca.js":259,"./fr-ch":260,"./fr-ch.js":260,"./fr.js":258,"./fy":261,"./fy.js":261,"./ga":262,"./ga.js":262,"./gd":263,"./gd.js":263,"./gl":264,"./gl.js":264,"./gom-latn":265,"./gom-latn.js":265,"./gu":266,"./gu.js":266,"./he":267,"./he.js":267,"./hi":268,"./hi.js":268,"./hr":269,"./hr.js":269,"./hu":270,"./hu.js":270,"./hy-am":271,"./hy-am.js":271,"./id":272,"./id.js":272,"./is":273,"./is.js":273,"./it":274,"./it-ch":275,"./it-ch.js":275,"./it.js":274,"./ja":276,"./ja.js":276,"./jv":277,"./jv.js":277,"./ka":278,"./ka.js":278,"./kk":279,"./kk.js":279,"./km":280,"./km.js":280,"./kn":281,"./kn.js":281,"./ko":282,"./ko.js":282,"./ku":283,"./ku.js":283,"./ky":284,"./ky.js":284,"./lb":285,"./lb.js":285,"./lo":286,"./lo.js":286,"./lt":287,"./lt.js":287,"./lv":288,"./lv.js":288,"./me":289,"./me.js":289,"./mi":290,"./mi.js":290,"./mk":291,"./mk.js":291,"./ml":292,"./ml.js":292,"./mn":293,"./mn.js":293,"./mr":294,"./mr.js":294,"./ms":295,"./ms-my":296,"./ms-my.js":296,"./ms.js":295,"./mt":297,"./mt.js":297,"./my":298,"./my.js":298,"./nb":299,"./nb.js":299,"./ne":300,"./ne.js":300,"./nl":301,"./nl-be":302,"./nl-be.js":302,"./nl.js":301,"./nn":303,"./nn.js":303,"./pa-in":304,"./pa-in.js":304,"./pl":305,"./pl.js":305,"./pt":306,"./pt-br":307,"./pt-br.js":307,"./pt.js":306,"./ro":308,"./ro.js":308,"./ru":309,"./ru.js":309,"./sd":310,"./sd.js":310,"./se":311,"./se.js":311,"./si":312,"./si.js":312,"./sk":313,"./sk.js":313,"./sl":314,"./sl.js":314,"./sq":315,"./sq.js":315,"./sr":316,"./sr-cyrl":317,"./sr-cyrl.js":317,"./sr.js":316,"./ss":318,"./ss.js":318,"./sv":319,"./sv.js":319,"./sw":320,"./sw.js":320,"./ta":321,"./ta.js":321,"./te":322,"./te.js":322,"./tet":323,"./tet.js":323,"./tg":324,"./tg.js":324,"./th":325,"./th.js":325,"./tl-ph":326,"./tl-ph.js":326,"./tlh":327,"./tlh.js":327,"./tr":328,"./tr.js":328,"./tzl":329,"./tzl.js":329,"./tzm":330,"./tzm-latn":331,"./tzm-latn.js":331,"./tzm.js":330,"./ug-cn":332,"./ug-cn.js":332,"./uk":333,"./uk.js":333,"./ur":334,"./ur.js":334,"./uz":335,"./uz-latn":336,"./uz-latn.js":336,"./uz.js":335,"./vi":337,"./vi.js":337,"./x-pseudo":338,"./x-pseudo.js":338,"./yo":339,"./yo.js":339,"./zh-cn":340,"./zh-cn.js":340,"./zh-hk":341,"./zh-hk.js":341,"./zh-tw":342,"./zh-tw.js":342};function r(e){var t=s(e);return n(t)}function s(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=s,e.exports=r,r.id=573},99:function(e,t,n){"use strict";var a=n(343);n.o(a,"StudyState")&&n.d(t,"StudyState",(function(){return a.StudyState}));var r=n(344);n.o(r,"StudyState")&&n.d(t,"StudyState",(function(){return r.StudyState}));var s=n(345);n.o(s,"StudyState")&&n.d(t,"StudyState",(function(){return s.StudyState}));var u=n(346);n.o(u,"StudyState")&&n.d(t,"StudyState",(function(){return u.StudyState}));var c=n(347);n.o(c,"StudyState")&&n.d(t,"StudyState",(function(){return c.StudyState}));var o=n(348);n.o(o,"StudyState")&&n.d(t,"StudyState",(function(){return o.StudyState}));var l=n(349);n.d(t,"StudyState",(function(){return l.a}));n(350)}},[[423,1,2]]]);
//# sourceMappingURL=../../7fa8d3a879bcf13f870b.map