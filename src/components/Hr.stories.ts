import type { Meta, StoryObj } from "storybook/internal/types";
import Hr from "./Hr.astro";

const meta = {
  title: "Components/Astro/Hr",
  component: Hr,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A styled horizontal rule used as a section divider across the site.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
