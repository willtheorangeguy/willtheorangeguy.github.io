export const SITE = {
  website: "https://williamvdg.me/",
  author: "willtheorangeguy",
  profile: "https://williamvdg.me/",
  desc: "A dev blog, with random personal thoughts, tech stuff, and travel musings.",
  title: "To Be Continued",
  ogImage: "hero.jpg",
  lightAndDarkMode: true,
  postPerIndex: 5,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: " Suggest Changes",
    url: "https://github.com/willtheorangeguy/willtheorangeguy.github.io/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/Vancouver", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
