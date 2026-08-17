const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./giscus-Ci9LqPcC-CvvnWXw-.js","./rolldown-runtime-DaJ6WEGw.js"])))=>i.map(i=>d[i]);
import{a as e,n as t}from"./rolldown-runtime-DaJ6WEGw.js";import{n,t as r}from"./preload-helper-BrQlA712.js";import{n as i}from"./react-dom-DIkZ3YgS.js";import{t as a}from"./jsx-runtime-cM__dR4X.js";function o({id:e,host:t,repo:n,repoId:i,category:a,categoryId:o,mapping:l,term:u,strict:d,reactionsEnabled:f,emitMetadata:p,inputPosition:m,theme:h,lang:g,loading:_}){let[v,y]=(0,c.useState)(!1);return(0,c.useEffect)(()=>{v||r(()=>import(`./giscus-Ci9LqPcC-CvvnWXw-.js`).then(()=>y(!0)),__vite__mapDeps([0,1]),import.meta.url)},[]),v?(0,s.jsx)(`giscus-widget`,{id:e,host:t,repo:n,repoid:i,category:a,categoryid:o,mapping:l,term:u,strict:d,reactionsenabled:f,emitmetadata:p,inputposition:m,theme:h,lang:g,loading:_}):null}var s,c,l=t((()=>{s=a(),c=e(i(),1),n()})),u,d=t((()=>{u={repo:`willtheorangeguy/willtheorangeguy.github.io`,repoId:`R_kgDOGHnPnA`,category:`Blog Comments`,categoryId:`DIC_kwDOGHnPnM4ClLlc`,mapping:`title`,reactionsEnabled:`0`,emitMetadata:`1`,inputPosition:`bottom`,lang:`en`,loading:`lazy`}}));function f({lightTheme:e=`light`,darkTheme:t=`dark`}){let[n,r]=(0,p.useState)(()=>{let e=localStorage.getItem(`theme`),t=window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`;return e||t});return(0,p.useEffect)(()=>{let e=window.matchMedia(`(prefers-color-scheme: dark)`),t=({matches:e})=>{r(e?`dark`:`light`)};return e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]),(0,p.useEffect)(()=>{let e=document.querySelector(`#theme-btn`),t=()=>{r(e=>e===`dark`?`light`:`dark`)};return e?.addEventListener(`click`,t),()=>e?.removeEventListener(`click`,t)},[]),(0,m.jsx)(`div`,{className:`mt-8`,children:(0,m.jsx)(o,{theme:n===`light`?e:t,...u})})}var p,m,h=t((()=>{l(),d(),p=e(i(),1),m=a()})),g,_,v,y;t((()=>{h(),g={title:`Components/React/Comments`,component:f,parameters:{renderer:`react`,layout:`padded`,docs:{description:{component:"A Giscus-powered comment widget that loads GitHub Discussions as comments. The theme is controlled by `localStorage` and `prefers-color-scheme`. Use the **Theme** toolbar button to preview it in light or dark mode."}}},argTypes:{lightTheme:{control:`select`,options:[`light`,`light_high_contrast`,`light_protanopia`,`light_tritanopia`]},darkTheme:{control:`select`,options:[`dark`,`dark_high_contrast`,`dark_protanopia`,`dark_tritanopia`,`dark_dimmed`]}}},_={args:{lightTheme:`light`,darkTheme:`dark`}},v={args:{lightTheme:`light_high_contrast`,darkTheme:`dark_high_contrast`},parameters:{docs:{description:{story:`High-contrast Giscus theme for improved accessibility.`}}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    lightTheme: "light",
    darkTheme: "dark"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    lightTheme: "light_high_contrast",
    darkTheme: "dark_high_contrast"
  },
  parameters: {
    docs: {
      description: {
        story: "High-contrast Giscus theme for improved accessibility."
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y=[`Default`,`HighContrast`]}))();export{_ as Default,v as HighContrast,y as __namedExportsOrder,g as default};