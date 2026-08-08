import Footer from "./Footer.astro";

const meta = {
  title: "Components/Astro/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The site footer with copyright year, AstroPaper attribution, and social icon links. Rendered at the bottom of every page.",
      },
    },
  },
  argTypes: {
    noMarginTop: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  args: { noMarginTop: false },
};

export const NoMarginTop = {
  args: { noMarginTop: true },
};
