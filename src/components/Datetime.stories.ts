import Datetime from "./Datetime.astro";

const meta = {
  title: "Components/Astro/Datetime",
  component: Datetime,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays a formatted date/time with a calendar icon. Shows 'Updated:' label when a modification date is newer than the publish date.",
      },
    },
  },
  argTypes: {
    pubDatetime: { control: "text" },
    modDatetime: { control: "text" },
    timezone: { control: "text" },
    size: { control: "radio", options: ["sm", "lg"] },
  },
};

export default meta;

export const Published = {
  args: {
    pubDatetime: "2025-06-15T10:00:00Z",
    modDatetime: null,
    timezone: "America/Vancouver",
    size: "sm",
  },
};

export const Updated = {
  args: {
    pubDatetime: "2025-06-15T10:00:00Z",
    modDatetime: "2025-08-01T14:30:00Z",
    timezone: "America/Vancouver",
    size: "sm",
  },
};

export const Large = {
  args: {
    pubDatetime: "2025-06-15T10:00:00Z",
    modDatetime: null,
    timezone: "America/Vancouver",
    size: "lg",
  },
};
