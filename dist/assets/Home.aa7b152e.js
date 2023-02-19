import{m as C,a as U,_,y as u,j as p,P as k}from"./VAvatar.eccdc5c0.js";import{V as b,a as y,b as w,c as $}from"./VCard.45e85f98.js";import{m as T,n as e,a5 as v,aa as f,a7 as t,a8 as l,a3 as d,a9 as n,J as V,ad as x}from"./index.f3876fc3.js";import{a as i,V as r}from"./VRow.9b0220cb.js";const D=T({name:"VContainer",props:{fluid:{type:Boolean,default:!1},...C()},setup(a,c){let{slots:o}=c;return U(()=>e(a.tag,{class:["v-container",{"v-container--fluid":a.fluid}]},o)),{}}}),I={props:["Title","Icon","Description","mdAndUpvalue","xsvalue"]},F={class:"text-h6 mb-1"},H={class:"text-caption ma-2"};function B(a,c,o,s,h,g){return v(),f(b,{class:"mx-auto ma-2 pa-2","max-width":o.xsvalue?"100%":o.mdAndUpvalue?"60%":"80%",style:{"background-color":"#F5F5F5"}},{default:t(()=>[e(y,null,{default:t(()=>[l("div",null,[l("div",F,[d(n(o.Title)+" ",1),e(u,null,{default:t(()=>[d(n(o.Icon),1)]),_:1})]),l("div",H,n(o.Description),1)])]),_:1}),e(w,null,{default:t(()=>[e(p,{variant:"text",color:"info","prepend-icon":"mdi-notebook-outline"},{default:t(()=>[d(n(a.$t("homepage.instructions")),1)]),_:1}),e(k),e(p,{style:{"background-color":"#5FD083",color:"#fff"},"prepend-icon":o.Icon},{default:t(()=>[d(n(a.$t("homepage.try_it")),1)]),_:1},8,["prepend-icon"])]),_:1})]),_:1},8,["max-width"])}const j=_(I,[["render",B]]),N={props:["Title","Icon","Description","mdAndUpvalue","xsvalue"]},S={class:"text-h6 mb-1"},J={class:"text-caption ma-2"},P={class:"ml-2"};function R(a,c,o,s,h,g){return v(),f(b,{class:"mx-auto ma-2 pa-2","max-width":o.xsvalue?"100%":o.mdAndUpvalue?"60%":"80%",style:{"background-color":"#F5F5F5"}},{default:t(()=>[e(y,null,{default:t(()=>[l("div",null,[l("div",S,[d(n(o.Title)+" ",1),e(u,null,{default:t(()=>[d(n(o.Icon),1)]),_:1})]),l("div",J,n(o.Description),1)])]),_:1}),e($,{class:"ma-2 pa-2"},{default:t(()=>[l("span",P,n(a.$t("homepage.coming_soon")),1),e(u,{icon:"mdi-sprout-outline"})]),_:1})]),_:1},8,["max-width"])}const Y=_(N,[["render",R]]),X={components:{HomeCard:j,HomeCardComming:Y},setup(){const{xs:a,mdAndUp:c}=V();var o=c.value,s=a.value;return{mdAndUpvalue:o,xsvalue:s}}},q={class:"font-weight-bold text-h4 text-sm-h5 ma-2 pa-2"},z={class:"text-h6 text-sm-subtitle-1 ma-2 pa-2"},E={class:"d-flex align-center ma-2 pa-2"},G={class:"text-subtitle-1 text-sm-caption ma-2 pa-2"},K=l("iframe",{width:"100%",height:"315",src:"https://www.youtube.com/embed/isUJXYdhkpg",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:""},null,-1),L={class:"font-weight-bold text-h4 text-sm-h5 ma-2 pa-2"};function M(a,c,o,s,h,g){const A=x("HomeCard"),m=x("HomeCardComming");return v(),f(D,null,{default:t(()=>[e(r,{"no-gutters":""},{default:t(()=>[e(i,{key:"1",cols:"12",sm:"6"},{default:t(()=>[l("p",q,n(a.$t("homepage.goal")),1),l("p",z,n(a.$t("homepage.AI")),1),l("div",E,[e(p,{color:"secondary",style:{"background-color":"black"}},{default:t(()=>[d(n(a.$t("nav.login")),1)]),_:1}),l("p",G,n(a.$t("homepage.statistics")),1)])]),_:1}),e(i,{key:"2",cols:"12",sm:"6"},{default:t(()=>[K]),_:1})]),_:1}),e(r,{id:"contribute_section"},{default:t(()=>[e(i,{cols:"12",style:{"text-align":"center","margin-top":"40px !important"}},{default:t(()=>[l("p",L,n(a.$t("homepage.contribute")),1)]),_:1}),e(i,{key:"1",cols:"12",sm:"6"},{default:t(()=>[e(A,{Title:a.$t("homepage.validate_recitation"),Icon:"mdi-checkbox-marked-circle-outline",Description:a.$t("homepage.validate_recitation_description"),mdAndUpvalue:s.mdAndUpvalue,xsvalue:s.xsvalue},null,8,["Title","Description","mdAndUpvalue","xsvalue"])]),_:1}),e(i,{key:"2",cols:"12",sm:"6"},{default:t(()=>[e(m,{Title:a.$t("homepage.transcribe_recitation"),Icon:"mdi-feather",Description:a.$t("homepage.transcribe_recitation_description"),mdAndUpvalue:s.mdAndUpvalue,xsvalue:s.xsvalue},null,8,["Title","Description","mdAndUpvalue","xsvalue"])]),_:1})]),_:1}),e(r,null,{default:t(()=>[e(i,{key:"1",cols:"12",sm:"6"},{default:t(()=>[e(m,{Title:a.$t("homepage.validate_transcription"),Icon:"mdi-text-box-search-outline",Description:a.$t("homepage.validate_transcription_description"),mdAndUpvalue:s.mdAndUpvalue,xsvalue:s.xsvalue},null,8,["Title","Description","mdAndUpvalue","xsvalue"])]),_:1}),e(i,{key:"2",cols:"12",sm:"6"},{default:t(()=>[e(m,{Title:a.$t("homepage.validate_Tajweed"),Icon:"mdi-magnify",Description:a.$t("homepage.validate_Tajweed_description"),mdAndUpvalue:s.mdAndUpvalue,xsvalue:s.xsvalue},null,8,["Title","Description","mdAndUpvalue","xsvalue"])]),_:1})]),_:1}),e(r,{style:{height:"200px"}})]),_:1})}const ee=_(X,[["render",M]]);export{ee as default};
