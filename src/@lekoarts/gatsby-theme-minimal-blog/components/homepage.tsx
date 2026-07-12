/** @jsx jsx */
import { jsx } from "theme-ui"
import { HeadFC, Link } from "gatsby"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title"
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing"
import List from "@lekoarts/gatsby-theme-minimal-blog/src/components/list"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"
import { visuallyHidden } from "@lekoarts/gatsby-theme-minimal-blog/src/styles/utils"
import Seo from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"
import Hero from "../texts/hero.mdx"
import Bottom from "@lekoarts/gatsby-theme-minimal-blog/src/texts/bottom.mdx"

export type MBHomepageProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
  }[]
}

const Homepage = ({ posts }: MBHomepageProps) => {
  const { basePath, blogPath } = useMinimalBlogConfig()
  const { siteTitle } = useSiteMetadata()

  return (
    <Layout>
      <h1 sx={visuallyHidden}>{siteTitle}</h1>
      <section
        sx={{
          mb: [5, 6, 7],
          variant: `section_hero`,
          color: `heading`,
          "> p:first-of-type": {
            color: `secondary`,
            fontSize: [1, 2, 2],
            m: 0,
            mb: 2,
          },
          h1: {
            color: `heading`,
            fontSize: [6, 7, 8],
            lineHeight: 1.05,
            m: 0,
            mb: 4,
            letterSpacing: `-0.02em`,
          },
          p: {
            fontSize: [2, 3, 3],
            lineHeight: 1.6,
            mt: 3,
          },
          "p.muted": {
            color: `secondary`,
          },
          "p.tagline": {
            color: `heading`,
            fontWeight: 700,
            fontSize: [1, 2, 2],
            mt: 4,
          },
          "[data-hi]": {
            color: `inherit`,
            fontWeight: 700,
            textDecoration: `underline`,
            textDecorationColor: `#5eead4`,
            textDecorationThickness: `2px`,
            textUnderlineOffset: `4px`,
          },
        }}
      >
        <Hero />
      </section>
      <Title text="Latest Posts">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>Read all posts</Link>
      </Title>
      <Listing posts={posts} showTags={false} />
      <List>
        <Bottom />
      </List>
    </Layout>
  )
}

export default Homepage

export const Head: HeadFC = () => <Seo />
