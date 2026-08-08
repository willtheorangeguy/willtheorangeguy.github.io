import Breadcrumb from "./Breadcrumb.astro";

const meta = {
  title: "Components/Astro/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Auto-generates a breadcrumb trail from the current URL path. Splits `Astro.url.pathname` into segments and renders `Home » Segment » …` with the last segment as the current page.",
      },
    },
  },
};

export default meta;

export const Default = {};
