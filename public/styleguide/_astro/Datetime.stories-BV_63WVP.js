import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";var t,n=e((()=>{t=()=>{throw Error(`Astro components are rendered server-side by Storybook.`)},t.isAstroComponentFactory=!0,t.moduleId=`D:/Code/willtheorangeguy/willtheorangeguy.github.io/src/components/Datetime.astro`})),r,i,a,o,s;e((()=>{n(),r={title:`Components/Astro/Datetime`,component:t,parameters:{layout:`centered`,docs:{description:{component:`Displays a formatted date/time with a calendar icon. Shows 'Updated:' label when a modification date is newer than the publish date.`}}},argTypes:{pubDatetime:{control:`text`},modDatetime:{control:`text`},timezone:{control:`text`},size:{control:`radio`,options:[`sm`,`lg`]}}},i={args:{pubDatetime:`2025-06-15T10:00:00Z`,modDatetime:null,timezone:`America/Vancouver`,size:`sm`}},a={args:{pubDatetime:`2025-06-15T10:00:00Z`,modDatetime:`2025-08-01T14:30:00Z`,timezone:`America/Vancouver`,size:`sm`}},o={args:{pubDatetime:`2025-06-15T10:00:00Z`,modDatetime:null,timezone:`America/Vancouver`,size:`lg`}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    pubDatetime: "2025-06-15T10:00:00Z",
    modDatetime: null,
    timezone: "America/Vancouver",
    size: "sm"
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    pubDatetime: "2025-06-15T10:00:00Z",
    modDatetime: "2025-08-01T14:30:00Z",
    timezone: "America/Vancouver",
    size: "sm"
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    pubDatetime: "2025-06-15T10:00:00Z",
    modDatetime: null,
    timezone: "America/Vancouver",
    size: "lg"
  }
}`,...o.parameters?.docs?.source}}},s=[`Published`,`Updated`,`Large`]}))();export{o as Large,i as Published,a as Updated,s as __namedExportsOrder,r as default};