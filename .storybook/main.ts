import type { StorybookConfig } from "@storybook-astro/framework";
import { react } from "@storybook-astro/framework/integrations";

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.mdx",
    "../src/components/**/*.stories.@(ts|tsx)",
    "../src/stories/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
  framework: {
    name: "@storybook-astro/framework",
    options: {
      integrations: [react()],
    },
  },
};

export default config;
