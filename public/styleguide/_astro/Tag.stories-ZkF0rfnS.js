import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";var t,n=e((()=>{t=()=>{throw Error(`Astro components are rendered server-side by Storybook.`)},t.isAstroComponentFactory=!0,t.moduleId=`D:/W/willtheorangeguy/willtheorangeguy.github.io/src/components/Tag.astro`})),r,i,a,o,s;e((()=>{n(),r={title:`Components/Astro/Tag`,component:t,parameters:{layout:`centered`,docs:{description:{component:`A clickable tag/category chip with a hash icon, used on post cards and the tags page.`}}},argTypes:{tag:{control:`text`},tagName:{control:`text`},size:{control:`radio`,options:[`sm`,`lg`]}}},i={args:{tag:`astro`,tagName:`Astro`,size:`sm`}},a={args:{tag:`astro`,tagName:`Astro`,size:`lg`}},o={args:{tag:`astro`,tagName:`Astro`,size:`sm`},decorators:[e=>`<ul>${e()}</ul>`],parameters:{docs:{description:{story:"Tags are rendered inside a `<ul>` element in context."}}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    tag: "astro",
    tagName: "Astro",
    size: "sm"
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    tag: "astro",
    tagName: "Astro",
    size: "lg"
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    tag: "astro",
    tagName: "Astro",
    size: "sm"
  },
  // \`Tag\` renders a bare \`<li>\`, so a decorator supplies the \`<ul>\` it lives in
  // on the real pages.
  decorators: [(Story: () => unknown) => \`<ul>\${Story()}</ul>\`],
  parameters: {
    docs: {
      description: {
        story: "Tags are rendered inside a \`<ul>\` element in context."
      }
    }
  }
}`,...o.parameters?.docs?.source}}},s=[`Small`,`Large`,`InListContext`]}))();export{o as InListContext,a as Large,i as Small,s as __namedExportsOrder,r as default};