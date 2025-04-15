---
author: willtheorangeguy
pubDatetime: 2024-12-17T00:00:00.198Z
title: Switching from Utterances to Giscus
postSlug: switching-from-utterances-to-giscus
featured: false
draft: false
tags:
    - github
    - blog
    - web-development
    - comments
description: Details on how I switched from utterances to giscus on this blog!
---

A while ago, I stumbled upon [utterances](https://utteranc.es/), which easily allows you to add comments to a blog without the need to sign up for a service or set up anything extra. You just use the built in "comment threads" of GitHub Issues to facilitate this. I thought they did a great job with the tool, and I found it extremely easy to setup. All you have to do is:

1. Head to their website [utteranc.es](https://utteranc.es/)
2. Follow the steps on their page to exert as little or as much customization as you want
3. Copy and paste the `script` tag into your blog layout

Here is what it looks like on this blog:

![Blog post with utterances comments](/assets/imgs/blog/utterances.jpg)

This was super easy and I was happy to (hopefully) drive more engagement thanks to the comments. The only annoying part was that I was going to have a ton of open issues acting as comments for the blog posts... Luckily, a few days ago, I came across another blog (which I unfortunately don't remember - otherwise I would have linked it here) and saw that they were using [giscus](https://giscus.app/).

giscus is clearly heavily inspired by utterances, and their website is pretty much the same thing, so you can follow the same easy steps to add it to your site or blog. The benefit of using giscus? It uses GitHub Discussions for the comments, meaning you won't have any unnecessary open GitHub Issues. I also think this is a better platform for blog comments, since Discussions allows for a more forum-like commenting and discussion experience. Another benefit is that giscus is [still under active development](https://github.com/giscus/giscus/commits/main/), whereas utterances was [last updated two years ago](https://github.com/utterance/utterances/commits/master/). Regardless, both are still open source on GitHub and great options to use!

Here is what the comment section currently looks like with giscus:

![Blog post with giscus comments](/assets/imgs/blog/giscus.jpg)

Oh - giscus also has support for reactions!
