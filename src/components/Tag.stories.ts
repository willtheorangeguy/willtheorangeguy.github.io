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

export const InListContext = {
  args: {
    tag: "astro",
    tagName: "Astro",
    size: "sm",
  },
  // `Tag` renders a bare `<li>`, so a decorator supplies the `<ul>` it lives in
  // on the real pages.
  decorators: [(Story: () => unknown) => `<ul>${Story()}</ul>`],
  parameters: {
    docs: {
      description: {
        story: "Tags are rendered inside a `<ul>` element in context.",
      },
    },
  },
};
