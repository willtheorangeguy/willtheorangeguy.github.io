import Header from "./Header.astro";

const meta = {
  title: "Components/Astro/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The site-wide navigation header. Contains the site title (links to home), nav links (Resume, Projects, Notes, Labs, Posts, Tags), search icon, and light/dark theme toggle. Active link is highlighted with a wavy underline. The hamburger menu is shown on mobile.",
      },
    },
  },
};

export default meta;

export const Default = {};
