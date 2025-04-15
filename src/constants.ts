import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/github-brands.svg";
import IconInstagram from "@/assets/icons/instagram-brands.svg";
import IconLinkedin from "@/assets/icons/linkedin-brands.svg";
import IconMastodon from "@/assets/icons/mastodon-brands.svg";
import IconBluesky from "@/assets/icons/bluesky-brands.svg";
import IconStackOverflow from "@/assets/icons/stack-overflow-brands.svg";
import IconYouTube from "@/assets/icons/youtube-brands.svg";
import IconSteam from "@/assets/icons/steam-brands.svg";
import { SITE } from "@/config";
import type { GiscusProps } from "@giscus/react";

export const SOCIALS = [
{
    name: "Github",
    href: "https://github.com/willtheorangeguy/",
    linkTitle: `@willtheorangeguy on Github`,
    icon: IconGitHub,
},
{
    name: "Instagram",
    href: "https://instagram.com/william.vdg/",
    linkTitle: `@william.vdg on Instagram`,
    icon: IconInstagram,
},
{
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/william-v-38981428b/",
    linkTitle: `as William V on LinkedIn`,
    icon: IconLinkedin,
},
{
    name: "Mastodon",
    href: "https://techhub.social/@willtheorangeguy",
    linkTitle: `@willtheorangeguy on Mastodon`,
    icon: IconMastodon,
},
{
    name: "BlueSky",
    href: "https://bsky.app/profile/willtheorangeguy.bsky.social",
    linkTitle: `@willtheorangeguy on BlueSky`,
    icon: IconBluesky,
},
{
    name: "StackOverflow",
    href: "https://stackoverflow.com/users/6806860/william-v",
    linkTitle: `as William V on StackOverflow`,
    icon: IconStackOverflow,
},
{
    name: "YouTube",
    href: "https://www.youtube.com/@willtheorangeguy",
    linkTitle: `@willtheorangeguy on YouTube`,
    icon: IconYouTube,
},
{
    name: "Steam",
    href: "https://steamcommunity.com/id/lcskid/",
    linkTitle: `@lcskid on Steam`,
    icon: IconSteam,
},
] as const;

export const SHARE_LINKS = [
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;

export const GISCUS: GiscusProps = {
    repo: "willtheorangeguy/willtheorangeguy.github.io",
    repoId: "R_kgDOGHnPnA",
    category: "Blog Comments",
    categoryId: "DIC_kwDOGHnPnM4ClLlc",
    mapping: "title",
    reactionsEnabled: "0",
    emitMetadata: "1",
    inputPosition: "bottom",
    lang: "en",
    loading: "lazy",
  };
