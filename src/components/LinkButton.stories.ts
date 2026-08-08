import LinkButton from "./LinkButton.astro";

const meta = {
  title: "Components/Astro/LinkButton",
  component: LinkButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An anchor or span element used as a styled, accessible link button throughout the site.",
      },
    },
  },
  argTypes: {
    href: { control: "text" },
    disabled: { control: "boolean" },
    title: { control: "text" },
    ariaLabel: { control: "text" },
  },
};

export default meta;

// Slot content is passed through the reserved `slots` arg — the Astro renderer
// splits it back out of the args before handing them to the component.
export const Default = {
  args: {
    href: "#",
    title: "Example link",
    slots: { default: "Click me" },
  },
};

export const Disabled = {
  args: {
    href: "#",
    disabled: true,
    title: "Disabled link",
    slots: { default: "Disabled" },
  },
};

export const WithAriaLabel = {
  args: {
    href: "#",
    ariaLabel: "Search the site",
    title: "Search",
    slots: { default: "Search" },
  },
};
