import type { GatsbyConfig, PluginRef } from "gatsby"
import "dotenv/config"

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;
const googleAnalyticsTrackingId = process.env.GOOGLE_ANALYTICS_ID;

const config: GatsbyConfig = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-minimal-blog/gatsby-config.mjs
    siteTitle: "Rohit Macherla",
    siteTitleAlt: `Rohit Macherla - Solves business problems using Salesforce.com`,
    siteUrl: "https://rohitmacherla.com",
    siteDescription: "Rohit Macherla's portfolio and blog",
    siteLanguage: `en`,
    siteImage: "/rohit.jpg",
    author: "Rohit Macherla",
  },
  trailingSlash: `never`,
  plugins: [
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-PBRJNRS4", // GTM container ID
        
        // Include GTM in development
        // Default: includeInDevelopment = false
        includeInDevelopment: true,

        // GTM Environment Details
        // Default: gtmAuth = false, gtmPreview = false, dataLayerName = "dataLayer"
        // gtmAuth: "your-gtm-auth", // If using GTM environments
        // gtmPreview: "your-gtm-preview",
        dataLayerName: "dataLayer",

        // Specify where to place the GTM script
        // Default: defaultDataLayer = {...}
        defaultDataLayer: function () {
          return {
            // Default data layer values
            pageType: typeof window !== 'undefined' ? window.location.pathname : '',
            siteName: 'Rohit Macherla',
            buildTime: new Date().toISOString(),
          }
        },

        // Control when GTM fires
        // Default: enableWebVitalsTracking = false
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `GitHub`,
            url: `https://github.com/markgarg`,
          },
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/rohit-macherla`,
          },
          {
            name: `StackExchange`,
            url: `https://stackexchange.com/users/183803/markgarg?tab=accounts`,
          },
          {
            name: `Salesforce`,
            url: `https://trailblazer.me/id/rmacherla1`,
          },
          {
            name: `RSS`,
            url: `/rss.xml`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rohit Macherla's blog`,
        short_name: `rohit-macherla-blog`,
        description: `Rohit Macherla's portfolio and blog`,
        start_url: `/`,
        background_color: `#fff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/media/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/media/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allPost },
            }: {
              query: { allPost: IAllPost; site: { siteMetadata: ISiteMetadata } }
            }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": content }],
                }
              }),
            query: `{
  allPost(sort: {date: DESC}) {
    nodes {
      title
      date(formatString: "MMMM D, YYYY")
      excerpt
      slug
    }
  }
}`,
            output: `rss.xml`,
            title: `Rohit Macherla's blog`,
          },
        ],
      },
    },
    // You can remove this plugin if you don't need it
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-statoscope`,
      options: {
        saveReportTo: `${__dirname}/public/.statoscope/_bundle.html`,
        saveStatsTo: `${__dirname}/public/.statoscope/_stats.json`,
        open: false,
      },
    },
  ].filter(Boolean) as Array<PluginRef>,
}

export default config

interface IPostTag {
  name: string
  slug: string
}

interface IPost {
  slug: string
  title: string
  defer: boolean
  date: string
  excerpt: string
  contentFilePath: string
  html: string
  timeToRead: number
  wordCount: number
  tags: Array<IPostTag>
  banner: any
  description: string
  canonicalUrl: string
}

interface IAllPost {
  nodes: Array<IPost>
}

interface ISiteMetadata {
  siteTitle: string
  siteTitleAlt: string
  siteHeadline: string
  siteUrl: string
  siteDescription: string
  siteImage: string
  author: string
}
