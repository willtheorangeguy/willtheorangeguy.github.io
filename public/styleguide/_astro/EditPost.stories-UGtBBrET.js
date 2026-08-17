import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";var t,n=e((()=>{t=()=>{throw Error(`Astro components are rendered server-side by Storybook.`)},t.isAstroComponentFactory=!0,t.moduleId=`D:/W/willtheorangeguy/willtheorangeguy.github.io/src/components/EditPost.astro`})),r,i,a,o,s;e((()=>{n(),r={id:`hello-world`,filePath:`src/data/blog/hello-world.md`,data:{title:`Hello World`,description:`An introduction post.`,pubDatetime:new Date(`2025-06-15T10:00:00Z`),modDatetime:null,timezone:`America/Vancouver`,tags:[`astro`],featured:!1,draft:!1,hideEditPost:!1}},i={title:`Components/Astro/EditPost`,component:t,parameters:{layout:`centered`,docs:{description:{component:"An 'Edit this page on GitHub' link shown at the bottom of posts when `SITE.editPost.enabled` is true and the post's `hideEditPost` frontmatter is not set. The link opens in a new tab pointing to the source file in the repo."}}},argTypes:{hideEditPost:{control:`boolean`}}},a={args:{post:r,hideEditPost:!1}},o={args:{post:r,hideEditPost:!0},parameters:{docs:{description:{story:"The edit link is hidden when `hideEditPost` is true (or when `SITE.editPost.enabled` is false)."}}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    post: mockPost,
    hideEditPost: false
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    post: mockPost,
    hideEditPost: true
  },
  parameters: {
    docs: {
      description: {
        story: "The edit link is hidden when \`hideEditPost\` is true (or when \`SITE.editPost.enabled\` is false)."
      }
    }
  }
}`,...o.parameters?.docs?.source}}},s=[`Visible`,`Hidden`]}))();export{o as Hidden,a as Visible,s as __namedExportsOrder,i as default};