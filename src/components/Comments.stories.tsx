import type { Meta, StoryObj } from "@storybook/react";
import Comments from "./Comments";

const meta = {
  title: "Components/React/Comments",
  component: Comments,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A Giscus-powered comment widget that loads GitHub Discussions as comments. The theme is controlled by `localStorage` and `prefers-color-scheme`. Use the **Theme** toolbar button to preview it in light or dark mode.",
      },
    },
  },
  argTypes: {
    lightTheme: {
      control: "select",
      options: ["light", "light_high_contrast", "light_protanopia", "light_tritanopia"],
    },
    darkTheme: {
      control: "select",
      options: ["dark", "dark_high_contrast", "dark_protanopia", "dark_tritanopia", "dark_dimmed"],
    },
  },
} satisfies Meta<typeof Comments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lightTheme: "light",
    darkTheme: "dark",
  },
};

export const HighContrast: Story = {
  args: {
    lightTheme: "light_high_contrast",
    darkTheme: "dark_high_contrast",
  },
  parameters: {
    docs: {
      description: {
        story: "High-contrast Giscus theme for improved accessibility.",
      },
    },
  },
};
