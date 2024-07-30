import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
    website: "https://williamvdg.me/",
    author: "willtheorangeguy",
    desc: "A dev blog, with random personal thoughts, tech stuff, and travel musings.",
    title: "willtheorangeguy",
    ogImage: "hero.jpg",
    lightAndDarkMode: true,
    postPerPage: 5,
};

export const LOCALE = ["en-EN"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
    enable: false,
    svg: true,
    width: 216,
    height: 46,
};

export const SOCIALS: SocialObjects = [
    {
        name: "Github",
        href: "https://github.com/willtheorangeguy/",
        linkTitle: `@willtheorangeguy on Github`,
        active: true,
    },
    {
        name: "Instagram",
        href: "https://instagram.com/william.vdg/",
        linkTitle: `@william.vdg on Instagram`,
        active: true,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/william-v-38981428b/",
        linkTitle: `as William V on LinkedIn`,
        active: true,
    },
    {
        name: "Mastodon",
        href: "https://techhub.social/@willtheorangeguy",
        linkTitle: `@willtheorangeguy on Mastodon`,
        active: true,
    },
    {
        name: "Twitter",
        href: "https://x.com/williamvdg1",
        linkTitle: `@williamvdg1 on Twitter`,
        active: true,
    },
    {
        name: "StackOverflow",
        href: "https://stackoverflow.com/users/6806860/william-v",
        linkTitle: `as William V on StackOverflow`,
        active: true,
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/@willtheorangeguy",
        linkTitle: `@willtheorangeguy on YouTube`,
        active: true,
    },
    {
        name: "Discord",
        href: "discord.com/lcskid",
        linkTitle: `@lcskid on Discord`,
        active: true,
    },
    {
        name: "Steam",
        href: "https://steamcommunity.com/id/lcskid/",
        linkTitle: `@lcskid on Steam`,
        active: true,
    },
];
