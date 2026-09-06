import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@/constants";
import { useEffect, useState } from "react";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  // Resolved after mount rather than during render: touching localStorage or
  // matchMedia while rendering breaks server rendering, and server rendering is
  // what lets this island load with `client:visible`. The old `client:only`
  // pulled the whole React runtime (~58KB gzip) into every post page up front
  // just to mount a comment box nobody sees until they scroll.
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setTheme(
      localStorage.getItem("theme") || (mediaQuery.matches ? "dark" : "light")
    );

    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  // The min-height reserves the widget's space before Giscus injects its
  // iframe, so the late mount doesn't shift the page (CLS).
  return (
    <div className="mt-8 min-h-[420px]">
      {theme && (
        <Giscus
          theme={theme === "light" ? lightTheme : darkTheme}
          {...GISCUS}
        />
      )}
    </div>
  );
}
