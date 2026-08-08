import Card from "./Card.astro";

const mockPost = {
  id: "hello-world",
  filePath: "src/data/blog/hello-world.md",
  data: {
    title: "Hello World — My First Post",
    description:
      "An introduction to this blog and what to expect from future posts.",
    pubDatetime: new Date("2025-06-15T10:00:00Z"),
    modDatetime: null,
    timezone: "America/Vancouver",
    tags: ["astro", "blogging"],
    featured: false,
    draft: false,
  },
};

const meta = {
  title: "Components/Astro/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A blog post list card rendered inside a `<ul>`. Displays the post title (as a link), publish/modified date, and description. Accepts `variant` to render as `h2` (default) or `h3`.",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["h2", "h3"] },
  },
};

export default meta;

export const HeadingTwo = {
  args: {
    ...mockPost,
    variant: "h2",
  },
};

export const HeadingThree = {
  args: {
    ...mockPost,
    variant: "h3",
  },
};

export const WithModifiedDate = {
  args: {
    ...mockPost,
    data: {
      ...mockPost.data,
      modDatetime: new Date("2025-08-01T14:30:00Z"),
    },
    variant: "h2",
  },
};

export const LongTitle = {
  args: {
    ...mockPost,
    data: {
      ...mockPost.data,
      title:
        "This Is a Post with a Very Long Title That Might Wrap on Smaller Screens",
    },
    variant: "h2",
  },
};
