import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";var t,n=e((()=>{t=()=>{throw Error(`Astro components are rendered server-side by Storybook.`)},t.isAstroComponentFactory=!0,t.moduleId=`D:/Code/willtheorangeguy/willtheorangeguy.github.io/src/components/Pagination.astro`})),r,i,a,o,s,c,l,u;e((()=>{n(),r=(e,t)=>({currentPage:e,lastPage:t,url:{prev:e>1?`/posts/${e-1}`:void 0,next:e<t?`/posts/${e+1}`:void 0,current:`/posts/${e}`,first:`/posts/1`,last:`/posts/${t}`},data:[],start:(e-1)*10,end:e*10-1,total:t*10,size:10}),i={title:`Components/Astro/Pagination`,component:t,parameters:{layout:`centered`,docs:{description:{component:"Previous / Next pagination nav. Only rendered when `page.lastPage > 1`. Prev/Next buttons are disabled (rendered as `<span>`) when there is no adjacent page."}}}},a={args:{page:r(3,7)}},o={args:{page:r(1,7)}},s={args:{page:r(7,7)}},c={args:{page:r(1,2)}},l={args:{page:r(1,1)},parameters:{docs:{description:{story:`When there is only one page, the pagination component renders nothing.`}}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    page: makePage(3, 7)
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    page: makePage(1, 7)
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    page: makePage(7, 7)
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    page: makePage(1, 2)
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    page: makePage(1, 1)
  },
  parameters: {
    docs: {
      description: {
        story: "When there is only one page, the pagination component renders nothing."
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u=[`MiddlePage`,`FirstPage`,`LastPage`,`TwoPages`,`SinglePage`]}))();export{o as FirstPage,s as LastPage,a as MiddlePage,l as SinglePage,c as TwoPages,u as __namedExportsOrder,i as default};