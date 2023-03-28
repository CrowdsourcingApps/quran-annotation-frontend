import{E as I,Q as T,V as P,b as S,a as E}from"./VTimelineItem.9fee81f8.js";import{V as R,q as z}from"./VcInstructions.040fabae.js";import{aC as y,X as k,Y as r,Z as c,m as s,a1 as m,_ as t,a2 as u,L as v,U as a,a0 as l,aD as L}from"./index.99333668.js";import{_ as B,y as w,j as o,Z as V}from"./VAvatar.b9f9e0a6.js";import{a as h,V as p}from"./VRow.add2c9ba.js";import{V as b,d as f,c as N,b as U}from"./VCard.2ffb4d60.js";import{V as j}from"./VSpacer.e87c24c1.js";import"./VAlert.cea9590c.js";import"./VOverlay.f84e6b3b.js";import"./forwardRefs.54bb1675.js";const _="tasks/";class D{get_validate_correctness(){return y.get(_+"validate_correctness/")}save_validate_correctness_answers(i){return y.post(_+"validate_correctness/answers",i).then(g=>(console.log(g),g))}}const $=new D,F={components:{VcInstructions:R,Error:I},data:()=>({error:null,loading:!0,loading_audio:!1,quran:z,questions:[],currnet:new T,index:0,problem:!1,message:null,title:null,text:null,time_line_colors:[],answers:[],disabled:!1,end:!1,audio:new Audio,Instructions_dialog:!1}),created(){this.getRealTasks()},methods:{toggleProblem(){this.problem=!this.problem},reloadPage(){window.location.reload()},getRealTasks(){$.get_validate_correctness().then(e=>{this.questions=e.data,console.log(this.questions),this.currnet=this.questions[0],this.time_line_colors=new Array(this.questions.length).fill("white"),this.time_line_colors[0]="blue",this.loading=!1},e=>{e.response.status===404?this.error="tasks.404_message":e.response.status===400?this.error="tasks.400_message":this.error="error",this.loading=!1})},setAnswer(e){this.disabled=!0;let i={id:this.currnet.id,label:e,control_task:this.currnet.control_task};this.answers.push(i),this.time_line_colors[this.index]="success",this.index===this.questions.length-1?(this.loading=!0,this.saveAnswers()):this.next()},next(){this.audio&&this.audio.pause(),this.loading=!0,this.problem=!1,this.index=this.index+1,this.currnet=this.questions[this.index],this.time_line_colors[this.index]="blue",this.disabled=!1,this.loading=!1},skip(){this.audio&&this.audio.pause(),this.loading=!0,this.problem=!1,this.time_line_colors[this.index]="fail",this.index===this.questions.length-1?(this.loading=!0,this.saveAnswers()):(this.index=this.index+1,this.currnet=this.questions[this.index],this.time_line_colors[this.index]="blue",this.disabled=!1,this.loading=!1)},playAudio(){this.loading_audio=!0,this.audio.src="https://"+this.currnet.audio_file_name,this.audio.load(),this.audio.addEventListener("canplaythrough",()=>{this.audio.readyState===4&&(this.audio.play(),this.loading_audio=!1)})},saveAnswers(){$.save_validate_correctness_answers(this.answers).then(e=>{this.end=!0,this.loading=!1},e=>{e.response.status===400?e.response.data.detail==="Participant should pass the entrance exam first"?this.error="tasks.400_message":this.error="error":this.error="error",this.loading=!1})}},beforeRouteLeave(e,i,g){this.answers.length>0&&this.saveAnswers(),g()}},Q={key:3,style:{display:"inline-grid"}},Z={key:4,style:{display:"inline-grid"}};function X(e,i,g,Y,G,d){const C=k("Error"),A=k("VcInstructions");return r(),c(v,null,[s(C,{error:e.error},null,8,["error"]),e.end?(r(),m(h,{key:0,style:{"margin-top":"50px"}},{default:t(()=>[s(p,{cols:"1",sm:"3"}),s(p,{col:"10",sm:"6"},{default:t(()=>[s(b,{class:"mx-auto ma-2 pa-2",style:{"text-align":"center"}},{default:t(()=>[s(f,{class:"text-h5 ma-2 pa-2",style:{"text-align":"center"}},{default:t(()=>[s(w,{class:"ma-2",icon:"mdi-party-popper",color:"gold"}),a(" "+l(e.$t("support.jazak"))+" ",1),s(w,{class:"ma-2",icon:"mdi-party-popper",color:"gold"})]),_:1}),s(f,{class:"text-h5 ma-2 pa-2",style:{"text-align":"center","line-height":"2.25rem"}},{default:t(()=>[a(l(e.$t("tasks.completed")),1)]),_:1}),s(f,null,{default:t(()=>[a(l(e.$t("tasks.contribution_today")+" "+this.answers.length+" "+e.$t("tasks.tasks")),1)]),_:1}),e.end_result?(r(),m(f,{key:0,class:"text-h5"},{default:t(()=>[a(l(e.$t("trainning_session.ready")),1)]),_:1})):u("",!0),s(o,{style:{margin:"10px",color:"#fff !important"},color:"success",onClick:i[0]||(i[0]=n=>d.reloadPage())},{default:t(()=>[a(l(e.$t("tasks.contribute_again")),1)]),_:1})]),_:1})]),_:1}),s(p,{cols:"1",sm:"3"})]),_:1})):u("",!0),e.loading?(r(),m(h,{key:1,style:{"margin-top":"50px"}},{default:t(()=>[s(p,{cols:"4"}),s(p,{cols:"4",style:{"text-align":"center"}},{default:t(()=>[s(V,{indeterminate:"",size:51,width:7})]),_:1})]),_:1})):u("",!0),!e.loading&&!e.end&&!e.error?(r(),m(h,{key:2,style:{"justify-content":"center"}},{default:t(()=>[s(p,{cols:"12",sm:"6"},{default:t(()=>[s(P,{"line-inset":"200",direction:"horizontal"},{default:t(()=>[(r(!0),c(v,null,L(e.time_line_colors,(n,q)=>(r(),m(E,{key:q,size:"small","dot-color":n,icon:"mdi-check"},null,8,["dot-color"]))),128))]),_:1})]),_:1})]),_:1})):u("",!0),!e.loading&&!e.end&&!e.error?(r(),m(h,{key:3,style:{"margin-top":"0px"}},{default:t(()=>[s(p,{cols:"1",sm:"3"}),s(p,{cols:"10",sm:"6"},{default:t(()=>[s(b,{class:"mx-auto",style:{"text-align":"center"}},{default:t(()=>[s(f,{class:"ma-2 pa-2"},{default:t(()=>[a(l(e.$t("trainning.listen")),1)]),_:1}),e.loading_audio?u("",!0):(r(),m(o,{key:0,onClick:i[1]||(i[1]=n=>d.playAudio(e.audioFileName)),class:"mr-3",variant:"outlined",color:"black",icon:"mdi-play"})),e.loading_audio?(r(),m(V,{key:1,"model-value":"20",size:47,indeterminate:""})):u("",!0),s(f,{class:"ma-2 pa-2"},{default:t(()=>[a(l(e.$t("trainning.recited_correctly")),1)]),_:1}),s(f,{style:{"line-height":"2.25rem"},class:"ma-2 pa-2 text-h5"},{default:t(()=>[a(l(e.quran[e.currnet.surra_number][e.currnet.aya_number].uthmani),1)]),_:1}),e.problem?(r(),m(N,{key:2,class:"ma-2 pa-2"},{default:t(()=>[a(l(e.$t("trainning.what_problem")),1)]),_:1})):u("",!0),e.problem?u("",!0):(r(),c("div",Q,[s(o,{disabled:e.disabled,onClick:i[2]||(i[2]=n=>d.setAnswer("correct")),color:"success",style:{margin:"10px",color:"#fff !important"}},{default:t(()=>[a(l(e.$t("trainning.correct")),1)]),_:1},8,["disabled"]),s(o,{disabled:e.disabled,onClick:i[3]||(i[3]=n=>d.setAnswer("in_correct")),color:"fail",style:{margin:"10px",color:"#fff !important"}},{default:t(()=>[a(l(e.$t("trainning.incorrect")),1)]),_:1},8,["disabled"]),s(o,{disabled:e.disabled,onClick:i[4]||(i[4]=n=>d.toggleProblem()),color:"invalid",style:{margin:"10px"}},{default:t(()=>[a(l(e.$t("trainning.problem")),1)]),_:1},8,["disabled"])])),e.problem?(r(),c("div",Z,[s(o,{disabled:e.disabled,onClick:i[5]||(i[5]=n=>d.setAnswer("in_complete")),variant:"outlined",color:"invalidoption",style:{margin:"10px"}},{default:t(()=>[a(l(e.$t("trainning.incomplete")),1)]),_:1},8,["disabled"]),s(o,{disabled:e.disabled,onClick:i[6]||(i[6]=n=>d.setAnswer("not_match_aya")),variant:"outlined",color:"invalidoption",style:{margin:"10px"}},{default:t(()=>[a(l(e.$t("trainning.different")),1)]),_:1},8,["disabled"]),s(o,{disabled:e.disabled,onClick:i[7]||(i[7]=n=>d.setAnswer("multiple_aya")),variant:"outlined",color:"invalidoption",style:{margin:"10px"}},{default:t(()=>[a(l(e.$t("trainning.multiple")),1)]),_:1},8,["disabled"]),s(o,{disabled:e.disabled,onClick:i[8]||(i[8]=n=>d.setAnswer("not_related_quran")),variant:"outlined",color:"invalidoption",style:{margin:"10px"}},{default:t(()=>[a(l(e.$t("trainning.empty")),1)]),_:1},8,["disabled"]),s(o,{disabled:e.disabled,onClick:i[9]||(i[9]=n=>d.toggleProblem()),color:"invalid",style:{margin:"10px"},modelValue:e.problem,"onUpdate:modelValue":i[10]||(i[10]=n=>e.problem=n)},{default:t(()=>[a(l(e.$t("trainning.back")),1)]),_:1},8,["disabled","modelValue"])])):u("",!0)]),_:1}),s(h,{style:{margin:"15px"}},{default:t(()=>[s(o,{variant:"outlined",color:"info","prepend-icon":"mdi-notebook-outline"},{default:t(()=>[a(l(e.$t("homepage.instructions"))+" ",1),s(S,{modelValue:e.Instructions_dialog,"onUpdate:modelValue":i[12]||(i[12]=n=>e.Instructions_dialog=n),activator:"parent",width:"auto"},{default:t(()=>[s(b,null,{default:t(()=>[s(A,{Showstart:!1}),s(U,null,{default:t(()=>[s(o,{color:"invalid",block:"",onClick:i[11]||(i[11]=n=>e.Instructions_dialog=!1)},{default:t(()=>[a(l(e.$t("trainning.close")),1)]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),s(j),e.index!=this.questions.length?(r(),m(o,{key:0,onClick:i[13]||(i[13]=n=>d.skip()),variant:"outlined",color:"info","prepend-icon":e.$i18n.locale==="AR"?"mdi-chevron-left":"mdi-chevron-right"},{default:t(()=>[a(l(e.$t("tasks.skip")),1)]),_:1},8,["prepend-icon"])):u("",!0)]),_:1})]),_:1}),s(p,{col:"1",sm:"3"})]),_:1})):u("",!0)],64)}const ie=B(F,[["render",X]]);export{ie as default};
