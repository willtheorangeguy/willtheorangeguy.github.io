import Tag from "./Tag.astro";

const meta = {
  title: "Components/Astro/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A clickable tag/category chip with a hash icon, used on post cards and the tags page.",
      },
    },
  },
  argTypes: {
    tag: { control: "text" },
    tagName: { control: "text" },
    size: { control: "radio", options: ["sm", "lg"] },
  },
};

export default meta;

export const Small = {
  args: {
    tag: "astro",
    tagName: "Astro",
    size: "sm",
  },
};

export const Large = {
  args: {
    tag: "astro",
    tagName: "Astro",
    size: "lg",
  },
};

export const MultipleTags = {
  render: () => ({
    Component: Tag,
    props: { tag: "astro", tagName: "Astro", size: "sm" },
  }),
  parameters: {
    docs: {
      description: {
        story: "Tags are rendered inside a `<ul>` element in context.",
      },
    },
  },
};
