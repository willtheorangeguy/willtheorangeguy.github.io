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

export const Default = {
  args: {
    href: "#",
    title: "Example link",
  },
  render: (args: Record<string, unknown>) => ({
    Component: LinkButton,
    props: args,
    slots: { default: "Click me" },
  }),
};

export const Disabled = {
  args: {
    href: "#",
    disabled: true,
    title: "Disabled link",
  },
  render: (args: Record<string, unknown>) => ({
    Component: LinkButton,
    props: args,
    slots: { default: "Disabled" },
  }),
};

export const WithAriaLabel = {
  args: {
    href: "#",
    ariaLabel: "Search the site",
    title: "Search",
  },
  render: (args: Record<string, unknown>) => ({
    Component: LinkButton,
    props: args,
    slots: { default: "Search" },
  }),
};
