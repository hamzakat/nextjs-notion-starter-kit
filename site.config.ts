import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: 'cc0a6c88222247c9a2a8e251d956641a',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Next.js Notion Starter Kit',
  domain: '',
  author: 'الكاتب',

  // open graph metadata (optional)
  description: 'Next.js Notion Starter Kit Site',

  // social usernames (optional)
  twitter: '',
  github: '',
  linkedin: '',
  mastodon: 'https://localhost.com', // optional mastodon profile URL, provides link verification
  newsletter: 'https://localhost.com', // optional newsletter URL
  youtube: '', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover:
    'https://images.unsplash.com/photo-1485322551133-3a4c27a9d925?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  defaultPageCoverPosition: 0.5,

  // if you want to switch the display direction to right-to-left  (e.g. in case you have Arabic content)
  RTL: true,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: false, // disable it because images stay blurred when we render the pages at the server (SSR)

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages
  // navigationStyle: 'default'

  navigationStyle: 'custom',
  navigationLinks: [] // disable breadcrumbs
})
