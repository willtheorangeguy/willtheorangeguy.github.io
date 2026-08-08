import EditPost from "./EditPost.astro";

const mockPost = {
  id: "hello-world",
  filePath: "src/data/blog/hello-world.md",
  data: {
    title: "Hello World",
    description: "An introduction post.",
    pubDatetime: new Date("2025-06-15T10:00:00Z"),
    modDatetime: null,
    timezone: "America/Vancouver",
    tags: ["astro"],
    featured: false,
    draft: false,
    hideEditPost: false,
  },
};

const meta = {
  title: "Components/Astro/EditPost",
  component: EditPost,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An 'Edit this page on GitHub' link shown at the bottom of posts when `SITE.editPost.enabled` is true and the post's `hideEditPost` frontmatter is not set. The link opens in a new tab pointing to the source file in the repo.",
      },
    },
  },
  argTypes: {
    hideEditPost: { control: "boolean" },
  },
};

export default meta;

export const Visible = {
  args: {
    post: mockPost,
    hideEditPost: false,
  },
};

export const Hidden = {
  args: {
    post: mockPost,
    hideEditPost: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The edit link is hidden when `hideEditPost` is true (or when `SITE.editPost.enabled` is false).",
      },
    },
  },
};
