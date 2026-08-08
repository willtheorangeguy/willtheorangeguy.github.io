import Socials from "./Socials.astro";

const meta = {
  title: "Components/Astro/Socials",
  component: Socials,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Renders social media icon links from the `SOCIALS` array in `src/constants.ts`. Each icon is a styled `LinkButton` with a stroke accent fill.",
      },
    },
  },
  argTypes: {
    centered: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  args: { centered: false },
};

export const Centered = {
  args: { centered: true },
};
