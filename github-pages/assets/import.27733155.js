import{_ as A}from"./index.de691d82.js";/* empty css                 *//* empty css                        *//* empty css                    *//* empty css               */import"./el-tooltip.89296c46.js";/* empty css                  *//* empty css                     *//* empty css                  */import{A as w}from"./page-wrapper.a254fa4d.js";import{r as $,u as N}from"./xlsx.e6952222.js";import{as as U,d as I,b as R,u as b,A as u,J as C,aq as Y,Q as E,aa as P,at as T,r as V,ao as j,ap as L,a7 as M,B as S,R as k,P as v,S as W,a3 as B,a2 as F,N as Z}from"./element-plus.dee36745.js";import"./mockjs.f3824721.js";/* empty css                */const q=U,z=I({name:"ImportExcel",props:{dateFormat:{type:String},timeZone:{type:Number,default:8}},emits:["success","error"],setup(l,{emit:a}){const d=R(null),p=R(!1);function y(e){if(!e||!e["!ref"])return[];const t=[],r=N.decode_range(e["!ref"]),_=r.s.r;for(let n=r.s.c;n<=r.e.c;++n){const o=e[N.encode_cell({c:n,r:_})];let h="UNKNOWN "+n;o&&o.t&&(h=N.format_cell(o)),t.push(h)}return t}function f(e){const t=[],{dateFormat:r,timeZone:_}=l;for(const n of e.SheetNames){const o=e.Sheets[n],h=y(o);let x=N.sheet_to_json(o,{raw:!0,dateNF:r});x=x.map(i=>{for(let D in i)i[D]instanceof Date&&(_===8&&i[D].setSeconds(i[D].getSeconds()+43),r&&(i[D]=q(i[D]).format(r)));return i}),t.push({header:h,results:x,meta:{sheetName:n}})}return t}function s(e){return p.value=!0,new Promise((t,r)=>{const _=new FileReader;_.onload=async n=>{try{const o=n.target&&n.target.result,h=$(o,{type:"array",cellDates:!0}),x=f(h);a("success",x),t("")}catch(o){r(o),a("error")}finally{p.value=!1}},_.readAsArrayBuffer(e)})}async function g(e){const t=b(d);t&&(t.value=""),await s(e)}function m(e){const r=e?.target?.files?.[0];!r||g(r)}function c(){b(d)?.click()}return{handleUpload:c,handleInputClick:m,inputRef:d}}});function H(l,a,d,p,y,f){return u(),C("div",null,[Y(E("input",{ref:"inputRef",type:"file",accept:".xlsx, .xls",onChange:a[0]||(a[0]=(...s)=>l.handleInputClick&&l.handleInputClick(...s))},null,544),[[T,!1]]),E("div",{onClick:a[1]||(a[1]=(...s)=>l.handleUpload&&l.handleUpload(...s))},[P(l.$slots,"default")])])}const J=A(z,[["render",H]]),K={class:"flex center"},ue=I({__name:"import",setup(l){const a=V([]),d=p=>{a.length=0;for(const y of p){const{header:f,results:s,meta:{sheetName:g}}=y,m=[];for(const c of f)m.push({title:c,dataIndex:c});a.push({title:g,dataSource:s,columns:m})}};return(p,y)=>{const f=Z,s=j,g=L,m=M;return u(),S(b(w),{"header-title":"Excel \u5BFC\u5165\u6F14\u793A"},{extra:k(()=>[E("div",K,[v(b(J),{"date-format":"YYYY-MM-DD",onSuccess:d},{default:k(()=>[v(f,{type:"primary"},{default:k(()=>[W("\u5BFC\u5165Excel")]),_:1})]),_:1})])]),bodyContent:k(()=>[a.length?(u(!0),C(F,{key:0},B(a,(c,e)=>(u(),S(g,{key:e,border:"","highlight-current-row":"",style:{width:"100%"},data:c.dataSource},{default:k(()=>[(u(!0),C(F,null,B(c.columns,t=>(u(),S(s,{key:t.dataIndex,prop:t.dataIndex,label:t.title,resizable:""},null,8,["prop","label"]))),128))]),_:2},1032,["data"]))),128)):(u(),S(m,{key:1,description:"No Data"}))]),_:1})}}});export{ue as default};
