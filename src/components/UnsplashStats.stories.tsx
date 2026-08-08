import type { Meta, StoryObj } from "@storybook/react";
import { UnsplashStatsCard } from "./UnsplashStats";

const meta = {
  title: "Components/React/UnsplashStats",
  component: UnsplashStatsCard,
  parameters: {
    // Stories default to the `astro` renderer; React islands have to opt in.
    renderer: "react",
    layout: "centered",
    docs: {
      description: {
        component:
          "A React island that fetches Unsplash photographer stats (photos, views, downloads, likes, followers) via the Unsplash API and renders them as a clickable card. Requires an Unsplash `accessKey` for authenticated requests.",
      },
    },
  },
  argTypes: {
    username: { control: "text" },
    accessKey: { control: "text" },
  },
} satisfies Meta<typeof UnsplashStatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: "william_vdg",
  },
};

export const WithAccessKey: Story = {
  args: {
    username: "william_vdg",
    accessKey: "demo-key",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Providing an `accessKey` enables authenticated requests to the Unsplash API for higher rate limits.",
      },
    },
  },
};
