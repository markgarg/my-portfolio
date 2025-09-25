import * as React from "react"
import { withPrefix } from "gatsby"
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata"

type SEOProps = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  children?: React.ReactNode
  canonicalUrl?: string
}

const Seo = ({
  title = ``,
  description = ``,
  pathname = ``,
  image = ``,
  children = null,
  canonicalUrl = ``,
}: SEOProps) => {
  const site = useSiteMetadata()

  const {
    siteTitle,
    siteTitleAlt: defaultTitle,
    siteUrl,
    siteDescription: defaultDescription,
    siteImage: defaultImage,
    author,
    siteLanguage,
  } = site

  const seo = {
    title: title ? `${title} | ${siteTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || defaultImage}`,
  }

  // Enhanced structured data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    description: seo.description,
    url: seo.url,
    author: {
      "@type": "Person",
      name: author,
      url: siteUrl,
    },
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author,
    url: siteUrl,
    image: seo.image,
    jobTitle: "Salesforce Developer",
    knowsAbout: [
      "Salesforce Development",
      "Apex Programming", 
      "Lightning Web Components",
      "Prometheus Monitoring",
      "Technical Writing",
    ],
  }

  return (
    <>
      <html lang={siteLanguage} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={seo.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.description} />
      <meta name="twitter:creator" content={author} />
      <meta name="gatsby-theme" content="@lekoarts/gatsby-theme-minimal-blog" />
      
      {/* Enhanced SEO */}
      <meta name="author" content={author} />
      <meta name="keywords" content="Salesforce, Developer, Apex, Lightning, Prometheus, Monitoring, Technical Blog" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      
      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      <link rel="icon" type="image/png" sizes="32x32" href={withPrefix(`/favicon-32x32.png`)} />
      <link rel="icon" type="image/png" sizes="16x16" href={withPrefix(`/favicon-16x16.png`)} />
      <link rel="apple-touch-icon" sizes="180x180" href={withPrefix(`/apple-touch-icon.png`)} />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {children}
    </>
  )
}

export default Seo
