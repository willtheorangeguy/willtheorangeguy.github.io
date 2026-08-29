import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";var t,n=e((()=>{t=()=>{throw Error(`Astro components are rendered server-side by Storybook.`)},t.isAstroComponentFactory=!0,t.moduleId=`D:/Code/willtheorangeguy/willtheorangeguy.github.io/src/components/LinkButton.astro`})),r,i,a,o,s;e((()=>{n(),r={title:`Components/Astro/LinkButton`,component:t,parameters:{layout:`centered`,docs:{description:{component:`An anchor or span element used as a styled, accessible link button throughout the site.`}}},argTypes:{href:{control:`text`},disabled:{control:`boolean`},title:{control:`text`},ariaLabel:{control:`text`}}},i={args:{href:`#`,title:`Example link`,slots:{default:`Click me`}}},a={args:{href:`#`,disabled:!0,title:`Disabled link`,slots:{default:`Disabled`}}},o={args:{href:`#`,ariaLabel:`Search the site`,title:`Search`,slots:{default:`Search`}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    href: "#",
    title: "Example link",
    slots: {
      default: "Click me"
    }
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    href: "#",
    disabled: true,
    title: "Disabled link",
    slots: {
      default: "Disabled"
    }
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    href: "#",
    ariaLabel: "Search the site",
    title: "Search",
    slots: {
      default: "Search"
    }
  }
}`,...o.parameters?.docs?.source}}},s=[`Default`,`Disabled`,`WithAriaLabel`]}))();export{i as Default,a as Disabled,o as WithAriaLabel,s as __namedExportsOrder,r as default};