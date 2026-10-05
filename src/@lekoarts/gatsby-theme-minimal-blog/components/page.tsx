/** @jsx jsx */
import type { HeadFC, PageProps } from "gatsby"
import { jsx, Heading } from "theme-ui"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import Seo from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"

export type MBPageProps = {
  page: {
    title: string
    slug: string
    excerpt: string
  }
}

const Page: React.FC<React.PropsWithChildren<PageProps<MBPageProps>>> = ({ data: { page }, children }) => {
  const isAboutPage = page.slug === `/about` || page.slug === `about`
  const displayTitle = isAboutPage ? `About Me` : page.title

  return (
    <Layout>
      <Heading as="h1" variant="styles.h1">
        {displayTitle}
      </Heading>
      <section sx={{ my: 5, variant: `layout.content` }}>{children}</section>
    </Layout>
  )
}

export default Page

export const Head: HeadFC<MBPageProps> = ({ data: { page } }) => {
  const isAboutPage = page.slug === `/about` || page.slug === `about`

  if (isAboutPage) {
    return (
      <Seo
        title="About Rohit Macherla | Salesforce Architect"
        description="Salesforce architect and engineering leader specialising in scalable platforms, observability, CI/CD, and AI adoption."
        pathname={page.slug}
      />
    )
  }

  return <Seo title={page.title} description={page.excerpt} />
}
