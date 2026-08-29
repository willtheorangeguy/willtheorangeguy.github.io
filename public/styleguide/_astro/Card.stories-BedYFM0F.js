import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";var t,n=e((()=>{t=()=>{throw Error(`Astro components are rendered server-side by Storybook.`)},t.isAstroComponentFactory=!0,t.moduleId=`D:/Code/willtheorangeguy/willtheorangeguy.github.io/src/components/Card.astro`})),r,i,a,o,s,c,l;e((()=>{n(),r={id:`hello-world`,filePath:`src/data/blog/hello-world.md`,data:{title:`Hello World — My First Post`,description:`An introduction to this blog and what to expect from future posts.`,pubDatetime:new Date(`2025-06-15T10:00:00Z`),modDatetime:null,timezone:`America/Vancouver`,tags:[`astro`,`blogging`],featured:!1,draft:!1}},i={title:`Components/Astro/Card`,component:t,parameters:{layout:`padded`,docs:{description:{component:"A blog post list card rendered inside a `<ul>`. Displays the post title (as a link), publish/modified date, and description. Accepts `variant` to render as `h2` (default) or `h3`."}}},argTypes:{variant:{control:`radio`,options:[`h2`,`h3`]}}},a={args:{...r,variant:`h2`}},o={args:{...r,variant:`h3`}},s={args:{...r,data:{...r.data,modDatetime:new Date(`2025-08-01T14:30:00Z`)},variant:`h2`}},c={args:{...r,data:{...r.data,title:`This Is a Post with a Very Long Title That Might Wrap on Smaller Screens`},variant:`h2`}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...mockPost,
    variant: "h2"
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...mockPost,
    variant: "h3"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...mockPost,
    data: {
      ...mockPost.data,
      modDatetime: new Date("2025-08-01T14:30:00Z")
    },
    variant: "h2"
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...mockPost,
    data: {
      ...mockPost.data,
      title: "This Is a Post with a Very Long Title That Might Wrap on Smaller Screens"
    },
    variant: "h2"
  }
}`,...c.parameters?.docs?.source}}},l=[`HeadingTwo`,`HeadingThree`,`WithModifiedDate`,`LongTitle`]}))();export{o as HeadingThree,a as HeadingTwo,c as LongTitle,s as WithModifiedDate,l as __namedExportsOrder,i as default};