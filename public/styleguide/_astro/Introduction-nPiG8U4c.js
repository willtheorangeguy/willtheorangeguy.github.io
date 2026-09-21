import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{t}from"./jsx-runtime-cM__dR4X.js";import{a as n,c as r,i}from"./iframe-Bb9r93aZ.js";import{t as a}from"./mdx-react-shim-BIyVW-Qh.js";function o(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[`
`,`
`,(0,c.jsx)(i,{title:`Design System/Introduction`}),`
`,(0,c.jsx)(t.h1,{id:`style-guide--design-system`,children:`Style Guide & Design System`}),`
`,(0,c.jsxs)(t.p,{children:[`This is the design environment for `,(0,c.jsx)(t.strong,{children:`willtheorangeguy.github.io`}),` — a personal blog and portfolio built on Astro 7 + AstroPaper theme.`]}),`
`,(0,c.jsx)(t.h2,{id:`whats-in-here`,children:`What's in here`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Section`}),(0,c.jsx)(t.th,{children:`Description`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.strong,{children:`Design System / Design Tokens`})}),(0,c.jsx)(t.td,{children:`Color palette, typography, spacing scale, border radius, and focus styles`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.strong,{children:`Components / Astro`})}),(0,c.jsx)(t.td,{children:`Server-rendered Astro template components (layout, navigation, blog cards)`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.strong,{children:`Components / React`})}),(0,c.jsx)(t.td,{children:`Interactive React island components (stats cards, comments)`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`tech-stack`,children:`Tech stack`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Astro 7`}),` — static site generator with server-rendered `,(0,c.jsx)(t.code,{children:`.astro`}),` components`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`React 19`}),` — used for interactive islands (`,(0,c.jsx)(t.code,{children:`GoogleMapsStats`}),`, `,(0,c.jsx)(t.code,{children:`UnsplashStats`}),`, `,(0,c.jsx)(t.code,{children:`Comments`}),`)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Tailwind CSS v4`}),` — utility-first styling with CSS variable design tokens`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Monospace font`}),` — the whole site uses a monospace font stack for a terminal-inspired aesthetic`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`theming`,children:`Theming`}),`
`,(0,c.jsxs)(t.p,{children:[`Use the `,(0,c.jsx)(t.strong,{children:`Theme`}),` toolbar button (top right) to switch between `,(0,c.jsx)(t.strong,{children:`Light`}),` and `,(0,c.jsx)(t.strong,{children:`Dark`}),` mode. Each theme is driven by the `,(0,c.jsx)(t.code,{children:`data-theme`}),` attribute on the root element and swaps all CSS variables:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Light`}),`: `,(0,c.jsx)(t.code,{children:`--accent: #006cac`}),` (blue)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Dark`}),`: `,(0,c.jsx)(t.code,{children:`--accent: #ff6b01`}),` (orange)`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`file-locations`,children:`File locations`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`src/
  components/       # Astro + React components
    *.astro         # Server-rendered layout/UI components
    *.tsx           # React interactive islands
  styles/
    global.css      # CSS variables, Tailwind base layer
    typography.css  # Prose / typography styles
  stories/          # MDX documentation pages
    *.stories.ts    # Component stories
`})})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),n()}))();export{s as default};