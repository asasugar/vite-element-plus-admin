import"./index.311e097d.js";/* empty css                     *//* empty css                  *//* empty css               *//* empty css                 */import{A as B}from"./page-wrapper.85f5bc98.js";import{d as g,b as p,ah as P,ai as E,A as b,B as v,R as o,P as u,S as m,u as C,V,L as A,M as N,N as y,O as D}from"./element-plus.dee36745.js";import"./mockjs.f3824721.js";/* empty css                */const O=g({__name:"index",setup(k){const n=p();let r=p({oldPassword:"",newPassword:"",againNewPassword:""});const w=p({oldPassword:[{required:!0,message:"\u8BF7\u8F93\u5165\u5F53\u524D\u5BC6\u7801",trigger:"blur"}],newPassword:[{required:!0,message:"\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",trigger:"blur"}],againNewPassword:[{required:!0,validator:(s,e,l)=>{if(!e)return l(new Error("\u4E0D\u80FD\u4E3A\u7A7A"));e!==r.value.newPassword?l(new Error("\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4E0D\u4E00\u81F4")):l()},trigger:"blur"}]}),_=s=>{!s||s.validate(e=>{if(e)console.log("submit!"),V({title:"Success",message:"\u4FEE\u6539\u6210\u529F",type:"success"});else return console.log("error submit!"),!1})},f=s=>{!s||s.resetFields()};return(s,e)=>{const l=A,t=N,d=P,F=E,i=y,c=D;return b(),v(C(B),{"header-title":"\u4FEE\u6539\u5BC6\u7801"},{bodyContent:o(()=>[u(c,{ref_key:"ruleFormRef",ref:n,model:r.value,rules:w.value,"label-width":"auto",class:"rule-form"},{default:o(()=>[u(F,{gutter:10},{default:o(()=>[u(d,{span:8},{default:o(()=>[u(t,{label:"\u65E7\u5BC6\u7801",prop:"oldPassword"},{default:o(()=>[u(l,{modelValue:r.value.oldPassword,"onUpdate:modelValue":e[0]||(e[0]=a=>r.value.oldPassword=a),"show-password":"",type:"password",placeholder:"\u8BF7\u8F93\u5165",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),u(d,{span:8},{default:o(()=>[u(t,{label:"\u65B0\u5BC6\u7801",prop:"newPassword"},{default:o(()=>[u(l,{modelValue:r.value.newPassword,"onUpdate:modelValue":e[1]||(e[1]=a=>r.value.newPassword=a),"show-password":"",type:"password",placeholder:"\u8BF7\u8F93\u5165",clearable:""},null,8,["modelValue"])]),_:1})]),_:1}),u(d,{span:8},{default:o(()=>[u(t,{label:"\u786E\u8BA4\u65B0\u5BC6\u7801",prop:"againNewPassword"},{default:o(()=>[u(l,{modelValue:r.value.againNewPassword,"onUpdate:modelValue":e[2]||(e[2]=a=>r.value.againNewPassword=a),"show-password":"",type:"password",placeholder:"\u8BF7\u8F93\u5165",clearable:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),u(t,null,{default:o(()=>[u(i,{type:"primary",onClick:e[3]||(e[3]=a=>_(n.value))},{default:o(()=>[m("\u4FDD\u5B58")]),_:1}),u(i,{onClick:e[4]||(e[4]=a=>f(n.value))},{default:o(()=>[m("\u91CD\u7F6E")]),_:1})]),_:1})]),_:1},8,["model","rules"])]),_:1})}}});export{O as default};
