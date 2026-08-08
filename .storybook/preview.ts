import { definePreview } from "@storybook-astro/framework";
import addonDocs from "@storybook/addon-docs";
import addonThemes, { withThemeByDataAttribute } from "@storybook/addon-themes";

// Storybook renders stories in a bare iframe, so the site's Tailwind layer and
// CSS variables have to be pulled in explicitly for components to look right.
import "../src/styles/global.css";

export default definePreview({
  // `definePreview` builds a CSF-factory preview, and Storybook composes *only*
  // this chain — the `previewAnnotations` contributed by entries in `main.ts`
  // `addons` are ignored. Every addon that ships preview-side behaviour has to
  // be listed here or it silently does nothing (docs pages lose their renderer,
  // themes lose their global).
  addons: [addonDocs(), addonThemes()],
  decorators: [
    withThemeByDataAttribute({
      themes: { light: "light", dark: "dark" },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
  parameters: {
    layout: "padded",
    backgrounds: { disable: true },
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: {
          name: "Desktop",
          styles: { width: "1280px", height: "800px" },
        },
      },
    },
  },
});
