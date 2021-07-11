require(`dotenv`).config();

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;
const googleAnalyticsTrackingId = process.env.GOOGLE_ANALYTICS_ID;

module.exports = {
  siteMetadata: {
    siteTitle: 'Rohit Macherla',
    siteTitleAlt: `Rohit Macherla - Solves business problems using Salesforce.com`,
    siteUrl: 'https://rohitmacherla.com',
    siteDescription: 'Rohit Macherla\'s portfolio and blog',
    siteImage: '/rohit.jpg',
    author: 'Rohit Macherla',
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
        ],
        externalLinks: [
          {
            name: `GitHub`,
            url: `https://github.com/markgarg`,
          },
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/rohit-macherla-0b89077`,
          },
          {
            name: `StackExchange`,
            url: `https://stackexchange.com/users/183803/markgarg?tab=accounts`,
          },
          {
            name: `RSS`,
            url: `/rss.xml`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        interval: 300,
        timeout: 30000,
        web: [
          {
            name: `IBM Plex Sans`,
            file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap`,
          },
        ],
      },
    },
    googleAnalyticsTrackingId && {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
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
        theme_color: `#6B46C1`,
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
    `gatsby-plugin-offline`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-netlify`,
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
            serialize: ({ query: { site, allPost } }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug;
                const content = `<p>${post.description}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`;

                return {
                  title: post.title,
                  date: post.date,
                  description: post.description,
                  url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': content }],
                };
              }),
            query: `
              {
                allPost(sort: { fields: date, order: DESC }) {
                  nodes {
                    title
                    date(formatString: "MMMM D, YYYY")
                    description
                    slug
                  }
                }
              }
            `,
            output: `rss.xml`,
            title: `Rohit Macherla's blog`,
          },
        ],
      },
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
};
