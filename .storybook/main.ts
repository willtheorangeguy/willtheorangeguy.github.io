import type { StorybookConfig } from "@storybook-astro/framework";
import { react } from "@storybook-astro/framework/integrations";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.mdx",
    "../src/components/**/*.stories.@(ts|tsx)",
    "../src/stories/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook-astro/framework",
    options: {
      integrations: [react()],
    },
  },
};

export default config;
