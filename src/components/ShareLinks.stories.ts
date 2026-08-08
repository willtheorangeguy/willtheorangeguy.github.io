import ShareLinks from "./ShareLinks.astro";

const meta = {
  title: "Components/Astro/ShareLinks",
  component: ShareLinks,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Social sharing buttons rendered at the bottom of blog posts. Links open in a new tab with the current page URL appended. Icons come from the `SHARE_LINKS` array in `src/constants.ts`.",
      },
    },
  },
};

export default meta;

export const Default = {};
