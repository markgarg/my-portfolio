/** @jsx jsx */
import type { HeadFC, PageProps } from "gatsby"
import { jsx, Heading } from "theme-ui"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import Seo from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"
import StructuredData, { createPersonSchema } from "../../../components/SEO/StructuredData"

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
  const isCareerPage = page.slug === `/career` || page.slug === `career`

  if (isAboutPage) {
    return (
      <Seo
        title="About Rohit Macherla — Lead Developer & Salesforce Architect"
        description="Lead Developer and Salesforce Architect in London with 20+ years of experience building CRM for scalable streaming platforms, enterprise observability, CI/CD, and AI workflows."
        pathname={page.slug}
      >
        <StructuredData person={createPersonSchema()} />
      </Seo>
    )
  }

  if (isCareerPage) {
    return (
      <Seo
        title="Career Timeline — Rohit Macherla"
        description="20+ year software engineering and Salesforce architecture career timeline across Sky, Deloitte, and Tata Consultancy Services."
        pathname={page.slug}
      >
        <StructuredData person={createPersonSchema({ url: "https://rohitmacherla.com/career" })} />
      </Seo>
    )
  }

  return <Seo title={page.title} description={page.excerpt} />
}
