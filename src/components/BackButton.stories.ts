import BackButton from "./BackButton.astro";

const meta = {
  title: "Components/Astro/BackButton",
  component: BackButton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A 'Go back' navigation button that appears at the top of post pages. Visibility is controlled by `SITE.showBackButton` in `src/config.ts`. Dynamically updates its `href` from `sessionStorage` so it returns to the referring list page.",
      },
    },
  },
};

export default meta;

export const Default = {};
