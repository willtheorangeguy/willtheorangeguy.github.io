import type { Meta, StoryObj } from "@storybook/react";
import { GoogleMapsStatsCard } from "./GoogleMapsStats";

const meta = {
  title: "Components/React/GoogleMapsStats",
  component: GoogleMapsStatsCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A React island that fetches Google Maps Local Guide stats (points, views, photos, reviews) from a cached JSON file and renders them as a card. Shows a loading skeleton, an error state, or the populated card.",
      },
    },
  },
  argTypes: {
    profileUrl: { control: "text" },
  },
} satisfies Meta<typeof GoogleMapsStatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profileUrl:
      "https://www.google.com/maps/contrib/105699800700652892082/reviews",
  },
};

export const InvalidUrl: Story = {
  args: {
    profileUrl: "https://maps.google.com/not-a-valid-profile",
  },
  parameters: {
    docs: {
      description: {
        story:
          "An invalid profile URL causes the component to display the error state.",
      },
    },
  },
};
