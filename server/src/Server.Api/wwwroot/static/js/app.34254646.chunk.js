(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{108:function(e,t,n){"use strict";var a=n(357);n.o(a,"StudyState")&&n.d(t,"StudyState",(function(){return a.StudyState}));var r=n(358);n.o(r,"StudyState")&&n.d(t,"StudyState",(function(){return r.StudyState}));var s=n(359);n.o(s,"StudyState")&&n.d(t,"StudyState",(function(){return s.StudyState}));var u=n(360);n.o(u,"StudyState")&&n.d(t,"StudyState",(function(){return u.StudyState}));var c=n(361);n.o(c,"StudyState")&&n.d(t,"StudyState",(function(){return c.StudyState}));var o=n(362);n.o(o,"StudyState")&&n.d(t,"StudyState",(function(){return o.StudyState}));var i=n(363);n.o(i,"StudyState")&&n.d(t,"StudyState",(function(){return i.StudyState}));var l=n(364);n.d(t,"StudyState",(function(){return l.a}));n(365)},357:function(e,t){},358:function(e,t){},359:function(e,t){},360:function(e,t){},361:function(e,t){},362:function(e,t){},363:function(e,t){},364:function(e,t,n){"use strict";var a;n.d(t,"a",(function(){return a})),function(e){e.Enabled="Enabled",e.Disabled="Disabled"}(a||(a={}))},365:function(e,t){},410:function(e,t,n){"use strict";var a=n(0),r=n(14),s=n(382),u=n(378),c=n(621),o=n(18),i=n(22),l=n.n(i),m=n(21),f=n.n(m),d=n(380),j=n(139),p=n(397),y=n.n(p).a.create({baseURL:"/api",timeout:1e4}),S=function(e){var t;return l.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.a.awrap(y.get("studies",{params:e}));case 2:return t=n.sent,n.abrupt("return",t.data);case 4:case"end":return n.stop()}}))},v=function(e){var t=e.name;return y.post("study",{name:t})},b=function(e){var t=e.id,n=e.name,a=e.state;return y.put("study/"+t,{name:n,state:a})},E=function(e){var t,n,a,r;return l.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return t=e.id,n=e.page,a=e.results,s.next=3,l.a.awrap(y.get("study/"+t+"/results",{params:{page:n,results:a}}));case 3:return r=s.sent,s.abrupt("return",r.data);case 5:case"end":return s.stop()}}))},g=function(e){var t,n;return l.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.id,a.next=3,l.a.awrap(y.get("study/"+t+"/stations"));case 3:return n=a.sent,a.abrupt("return",n.data);case 5:case"end":return a.stop()}}))},h=n(8),w=n(11),k=n.n(w),O=n(622),x=n(207),z=function(){var e=a.useState(!1),t=f()(e,2),n=t[0],r=t[1],s=a.useState(""),u=f()(s,2),c=u[0],o=u[1],i=a.useState(""),l=f()(i,2),m=l[0],d=l[1],j=a.useRef(y.interceptors.response.use((function(e){return d(e.data),e}),(function(e){return r(!0),o(e.message),Promise.reject(e)})));return a.useEffect((function(){return function(){y.interceptors.response.eject(j.current)}})),a.createElement(x.a,{visible:n,actions:[{label:"Ok",onPress:function(){return r(!1)}}],icon:function(e){return a.createElement(O.a,k()({},e,{name:"wifi-off"}))}},c+"\n"+m)},C=function(e){return a.createElement(h.a,{style:{flex:1}},a.createElement(z,null),e.children)},P=function(e){var t=e.route,n=e.navigation,r=t.params.onSubmit,s=a.useState(""),u=f()(s,2),c=u[0],o=u[1];return a.createElement(C,null,a.createElement(d.a,{label:"Name",value:c,onChangeText:o}),a.createElement(j.a,{icon:"content-save",mode:"contained",onPress:function(){return l.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.awrap(v({name:c}));case 2:return e.next=4,l.a.awrap(r());case 4:n.goBack();case 5:case"end":return e.stop()}}))}},"Save"))},D=n(10),M=n.n(D),I=n(7),H=n(366),T=n(367),N=n(108),R=I.a.create({row:{flexDirection:"row",justifyContent:"space-between"}}),Y=function(e){var t=e.route,n=e.navigation,r=t.params,s=r.study,u=r.onSubmit,c=a.useState(s.name),o=f()(c,2),i=o[0],m=o[1],p=a.useState(s.state||N.StudyState.Enabled),y=f()(p,2),S=y[0],v=y[1];return a.createElement(C,null,a.createElement(h.a,{style:R.row},a.createElement(H.a,null,"Id"),a.createElement(H.a,null,s.id)),a.createElement(h.a,{style:R.row},a.createElement(H.a,null,"Created"),a.createElement(H.a,null,M()(s.created).format("DD MMM HH:mm"))),a.createElement(d.a,{label:"Name",value:i,onChangeText:m}),a.createElement(h.a,{style:R.row},a.createElement(H.a,null,S),a.createElement(T.a,{value:S===N.StudyState.Enabled,onValueChange:function(){v(S===N.StudyState.Enabled?N.StudyState.Disabled:N.StudyState.Enabled)}})),a.createElement(j.a,{icon:"content-save",mode:"contained",onPress:function(){return l.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.awrap(b({id:s.id,name:i,state:S}));case 2:return e.next=4,l.a.awrap(u());case 4:n.goBack();case 5:case"end":return e.stop()}}))}},"Save"))},A=n(25),L=n.n(A),W=n(620),F=n(38),G=n(381),J=n(96),U=n(66),q=n(32),B=function(){return a.createElement(U.a,{style:{flex:1}},a.createElement(q.a,null,"Surface"))},V="ws://"+window.location.hostname+"/api/ws",_=Object(W.a)(),K=function(e){var t=e.studyId,n=a.useState([]),s=f()(n,2),u=s[0],c=s[1],o=a.useState(0),i=f()(o,2),m=i[0],d=i[1],j=a.useState(0),p=f()(j,2),y=p[0],S=p[1],v=a.useState(0),b=f()(v,2),h=b[0],w=b[1],k=a.useState(!0),O=f()(k,2),x=O[0],z=O[1],C=a.useState([]),P=f()(C,2),D=P[0],I=P[1];a.useEffect((function(){H()}),[m]);var H=function(){var e;return l.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.a.awrap(E({id:t,page:m,results:5}));case 2:e=n.sent,w(e.totalPages),S(e.totalResults),c(e.items),z(!1);case 7:case"end":return n.stop()}}))};a.useEffect((function(){T()}),[]);var T=function(){var e;return l.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.a.awrap(g({id:t}));case 2:e=n.sent,I(e);case 4:case"end":return n.stop()}}))};if("web"!==r.a.OS){var N=a.useRef(new WebSocket(V+"/studyresults?id="+t)),R=a.useCallback((function(){N.current.onmessage=function(e){var t=JSON.parse(e.data);c((function(e){return e.pop(),[t].concat(L()(e))})),S((function(e){return e+1}))}}),[]),Y=a.useCallback((function(){N.current.close()}),[]);a.useEffect((function(){return R(),function(){Y()}}),[])}return a.createElement(F.d,null,a.createElement(G.a,null,a.createElement(G.a.Header,null,a.createElement(G.a.Title,null,"Created"),a.createElement(G.a.Title,{numeric:!0},"StationId"),a.createElement(G.a.Title,{numeric:!0},"SensorId"),a.createElement(G.a.Title,{numeric:!0},"Value")),x?a.createElement(J.a,null):u.map((function(e){return a.createElement(G.a.Row,{key:e.created},a.createElement(G.a.Cell,null,M()(e.created).format("DD MMM HH:mm")),a.createElement(G.a.Cell,{numeric:!0},e.stationId),a.createElement(G.a.Cell,{numeric:!0},e.sensorId),a.createElement(G.a.Cell,{numeric:!0},e.value))})),a.createElement(G.a.Pagination,{page:m,numberOfPages:h,onPageChange:function(e){return d(e)},label:5*m+1+" - "+Math.min(5*m+5,y)+" of "+y})),D.length>0&&a.createElement(_.Navigator,{lazy:!0},D.map((function(e){return a.createElement(_.Screen,{name:"Station "+e,component:B})}))))},Q=I.a.create({row:{flexDirection:"row",justifyContent:"space-between"}}),X=function(e){var t=e.route.params.study;return a.createElement(C,null,a.createElement(h.a,{style:Q.row},a.createElement(H.a,null,"Id"),a.createElement(H.a,null,t.id)),a.createElement(h.a,{style:Q.row},a.createElement(H.a,null,"Created"),a.createElement(H.a,null,M()(t.created).format("DD MMM YYYY HH:mm"))),a.createElement(h.a,{style:Q.row},a.createElement(H.a,null,"State"),a.createElement(H.a,null,t.state)),a.createElement(K,{studyId:t.id}))},Z=n(47),$=n(383),ee=n(33),te=n(40),ne=function(e){var t=e.study,n=e.onEditSubmit,r=Object(ee.useNavigation)();return a.createElement(te.a,{onPress:function(){r.navigate("Results",{study:t})},onLongPress:function(){r.navigate("ModifyStudy",{study:t,onSubmit:n})}},a.createElement(Z.a.Item,{title:t.name,description:M()(t.created).format("DD MMM YYYY HH:mm"),left:function(e){return a.createElement(Z.a.Icon,k()({},e,{icon:"folder"}))},right:function(e){return a.createElement(Z.a.Icon,k()({},e,{icon:"chevron-right"}))}}))},ae=(I.a.create({fab:{}}),function(e){var t=e.navigation,n=a.useState(!1),r=f()(n,2),s=r[0],u=r[1],c=a.useState([]),o=f()(c,2),i=o[0],m=o[1],d=a.useState(0),j=f()(d,2),p=j[0],y=(j[1],a.useState(!0)),v=f()(y,2),b=v[0],E=v[1];a.useEffect((function(){g()}),[]);var g=function(){var e;return l.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return E(!0),t.next=3,l.a.awrap(S({page:p}));case 3:e=t.sent,m(e.items),E(!1);case 6:case"end":return t.stop()}}))};return a.createElement(C,null,a.createElement(Z.a.Section,{title:"Studies"},b&&a.createElement(J.a,null),i.map((function(e){return a.createElement(ne,{key:e.created,study:e,onEditSubmit:g})}))),a.createElement($.a.Group,{open:s,visible:!0,icon:s?"close":"plus",actions:[{icon:"plus",label:"Add new",onPress:function(){t.navigate("AddStudy",{onSubmit:g})}},{icon:"refresh",label:"Refresh list",onPress:function(){}}],onStateChange:function(e){var t=e.open;return u(t)}}))}),re=Object(c.a)(),se=Object(o.b)((function(e){var t=e.theme;return a.createElement(u.a,null,a.createElement(re.Navigator,{screenOptions:{headerStyle:{backgroundColor:t.colors.primary},headerTintColor:"#fff",headerTitleStyle:{fontWeight:"bold"}}},a.createElement(re.Screen,{name:"Studies",component:ae}),a.createElement(re.Screen,{name:"Results",options:function(e){return{title:e.route.params.study.name}},component:X}),a.createElement(re.Screen,{name:"ModifyStudy",options:function(e){return{title:"Modify "+e.route.params.study.name}},component:Y}),a.createElement(re.Screen,{name:"AddStudy",options:function(){return{title:"Add a new study"}},component:P})))})),ue=n(13),ce=n.n(ue),oe=n(90);function ie(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function le(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ie(Object(n),!0).forEach((function(t){ce()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ie(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var me=le({},oe.a,{colors:le({},oe.a.colors,{primary:"#1a237e",accent:"#000051",backdrop:"rgba(255, 255, 255, 0.92)"})});function fe(){return a.createElement(s.a,{theme:me},a.createElement(a.Fragment,null,"web"===r.a.OS?a.createElement("style",{type:"text/css"},"\n        @font-face {\n          font-family: 'MaterialCommunityIcons';\n          src: url("+n(185)+") format('truetype');\n        }\n      "):null,a.createElement(se,null)))}n.d(t,"a",(function(){return fe}))},436:function(e,t,n){n(437),e.exports=n(605)},437:function(e,t){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/expo-service-worker.js",{scope:"/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))},586:function(e,t,n){var a={"./af":230,"./af.js":230,"./ar":231,"./ar-dz":232,"./ar-dz.js":232,"./ar-kw":233,"./ar-kw.js":233,"./ar-ly":234,"./ar-ly.js":234,"./ar-ma":235,"./ar-ma.js":235,"./ar-sa":236,"./ar-sa.js":236,"./ar-tn":237,"./ar-tn.js":237,"./ar.js":231,"./az":238,"./az.js":238,"./be":239,"./be.js":239,"./bg":240,"./bg.js":240,"./bm":241,"./bm.js":241,"./bn":242,"./bn.js":242,"./bo":243,"./bo.js":243,"./br":244,"./br.js":244,"./bs":245,"./bs.js":245,"./ca":246,"./ca.js":246,"./cs":247,"./cs.js":247,"./cv":248,"./cv.js":248,"./cy":249,"./cy.js":249,"./da":250,"./da.js":250,"./de":251,"./de-at":252,"./de-at.js":252,"./de-ch":253,"./de-ch.js":253,"./de.js":251,"./dv":254,"./dv.js":254,"./el":255,"./el.js":255,"./en-SG":256,"./en-SG.js":256,"./en-au":257,"./en-au.js":257,"./en-ca":258,"./en-ca.js":258,"./en-gb":259,"./en-gb.js":259,"./en-ie":260,"./en-ie.js":260,"./en-il":261,"./en-il.js":261,"./en-nz":262,"./en-nz.js":262,"./eo":263,"./eo.js":263,"./es":264,"./es-do":265,"./es-do.js":265,"./es-us":266,"./es-us.js":266,"./es.js":264,"./et":267,"./et.js":267,"./eu":268,"./eu.js":268,"./fa":269,"./fa.js":269,"./fi":270,"./fi.js":270,"./fo":271,"./fo.js":271,"./fr":272,"./fr-ca":273,"./fr-ca.js":273,"./fr-ch":274,"./fr-ch.js":274,"./fr.js":272,"./fy":275,"./fy.js":275,"./ga":276,"./ga.js":276,"./gd":277,"./gd.js":277,"./gl":278,"./gl.js":278,"./gom-latn":279,"./gom-latn.js":279,"./gu":280,"./gu.js":280,"./he":281,"./he.js":281,"./hi":282,"./hi.js":282,"./hr":283,"./hr.js":283,"./hu":284,"./hu.js":284,"./hy-am":285,"./hy-am.js":285,"./id":286,"./id.js":286,"./is":287,"./is.js":287,"./it":288,"./it-ch":289,"./it-ch.js":289,"./it.js":288,"./ja":290,"./ja.js":290,"./jv":291,"./jv.js":291,"./ka":292,"./ka.js":292,"./kk":293,"./kk.js":293,"./km":294,"./km.js":294,"./kn":295,"./kn.js":295,"./ko":296,"./ko.js":296,"./ku":297,"./ku.js":297,"./ky":298,"./ky.js":298,"./lb":299,"./lb.js":299,"./lo":300,"./lo.js":300,"./lt":301,"./lt.js":301,"./lv":302,"./lv.js":302,"./me":303,"./me.js":303,"./mi":304,"./mi.js":304,"./mk":305,"./mk.js":305,"./ml":306,"./ml.js":306,"./mn":307,"./mn.js":307,"./mr":308,"./mr.js":308,"./ms":309,"./ms-my":310,"./ms-my.js":310,"./ms.js":309,"./mt":311,"./mt.js":311,"./my":312,"./my.js":312,"./nb":313,"./nb.js":313,"./ne":314,"./ne.js":314,"./nl":315,"./nl-be":316,"./nl-be.js":316,"./nl.js":315,"./nn":317,"./nn.js":317,"./pa-in":318,"./pa-in.js":318,"./pl":319,"./pl.js":319,"./pt":320,"./pt-br":321,"./pt-br.js":321,"./pt.js":320,"./ro":322,"./ro.js":322,"./ru":323,"./ru.js":323,"./sd":324,"./sd.js":324,"./se":325,"./se.js":325,"./si":326,"./si.js":326,"./sk":327,"./sk.js":327,"./sl":328,"./sl.js":328,"./sq":329,"./sq.js":329,"./sr":330,"./sr-cyrl":331,"./sr-cyrl.js":331,"./sr.js":330,"./ss":332,"./ss.js":332,"./sv":333,"./sv.js":333,"./sw":334,"./sw.js":334,"./ta":335,"./ta.js":335,"./te":336,"./te.js":336,"./tet":337,"./tet.js":337,"./tg":338,"./tg.js":338,"./th":339,"./th.js":339,"./tl-ph":340,"./tl-ph.js":340,"./tlh":341,"./tlh.js":341,"./tr":342,"./tr.js":342,"./tzl":343,"./tzl.js":343,"./tzm":344,"./tzm-latn":345,"./tzm-latn.js":345,"./tzm.js":344,"./ug-cn":346,"./ug-cn.js":346,"./uk":347,"./uk.js":347,"./ur":348,"./ur.js":348,"./uz":349,"./uz-latn":350,"./uz-latn.js":350,"./uz.js":349,"./vi":351,"./vi.js":351,"./x-pseudo":352,"./x-pseudo.js":352,"./yo":353,"./yo.js":353,"./zh-cn":354,"./zh-cn.js":354,"./zh-hk":355,"./zh-hk.js":355,"./zh-tw":356,"./zh-tw.js":356};function r(e){var t=s(e);return n(t)}function s(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}r.keys=function(){return Object.keys(a)},r.resolve=s,e.exports=r,r.id=586}},[[436,1,2]]]);
//# sourceMappingURL=../../33818ad6e09e4dea07cc.map