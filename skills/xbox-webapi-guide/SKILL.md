---
name: "xbox-webapi-guide"
description: "Guide for using xbox-webapi in Node/TS. Invoke when integrating or debugging Xbox profile, achievements, presence, media APIs, or handling XSTS auth and pagination."
---

# Xbox WebAPI Provider Index

This skill provides an index of providers. Detailed capabilities and method docs live in the references directory. Before using any provider, make sure you have:
- uhs: Xbox User Hash (from XSTS)
- token: XSTS token (XBL3.0)

Create client:
- new XboxWebApi({ uhs, token })

## Providers

> - [achievements (Achievements & title history, contract: 2)](references/achievements.md)
> - [catalog (Store catalog search/products, MS-CV: 1.0)](references/catalog.md)
> - [gameclips (Game clips, contract: 3)](references/gameclips.md)
> - [screenshots (Screenshots, contract: 3)](references/screenshots.md)
> - [gamepass (Game Pass products/lists)](references/gamepass.md)
> - [messages (Messaging)](references/messages.md)
> - [people (Friends/recent players)](references/people.md)
> - [pins (User lists: PINS/Saved for later)](references/pins.md)
> - [profile (User profile, contract: 3)](references/profile.md)
> - [social (Social summary/relationships)](references/social.md)
> - [titlehub (Title history & details)](references/titlehub.md)
> - [userpresence (Presence, contract: 3)](references/userpresence.md)
> - [usersearch (User search, contract: 1)](references/usersearch.md)
> - [userstats (User stats, contract: 2)](references/userstats.md)
> - [smartglass (Console remote control/status, contract: 4)](references/smartglass.md)
> - [xnotify (Xbox Live service status)](references/xnotify.md)
> - [rest (Generic GET proxy)](references/rest.md)

See the corresponding docs under references for detailed endpoints, headers, contracts, and method signatures.
