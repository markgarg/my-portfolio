import React from "react"
import { Helmet } from "react-helmet"
import StructuredData, { createPersonSchema, createWebsiteSchema } from "./StructuredData"

interface SEOProps {
  /** Page title (will be appended to site name) */
  title?: string
  /** Meta description for the page */
  description?: string
  /** Page type (website, article, profile, etc.) */
  type?: "website" | "article" | "profile"
  /** Canonical URL for the page */
  url?: string
  /** Open Graph image URL */
  image?: string
  /** Twitter card type */
  twitterCard?: "summary" | "summary_large_image"
  /** Article-specific data */
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    section?: string
    tags?: string[]
  }
  /** Whether to include person schema */
  includePerson?: boolean
  /** Whether to include website schema */
  includeWebsite?: boolean
  /** Additional structured data */
  structuredData?: any
}

const EnhancedSEO = ({
  title = "",
  description = "Rohit Macherla's portfolio and blog about software development, Salesforce, and technology solutions.",
  type = "website",
  url = "https://rohitmacherla.com",
  image = "https://rohitmacherla.com/rohit.jpg",
  twitterCard = "summary_large_image",
  article,
  includePerson = false,
  includeWebsite = false,
  structuredData
}: SEOProps) => {
  const siteTitle = "Rohit Macherla"
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const fullUrl = url
  
  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Rohit Macherla" />
        <link rel="canonical" href={fullUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={`${siteTitle} - Software Developer`} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={`${siteTitle} - Software Developer`} />
        
        {/* Article-specific meta tags */}
        {article && (
          <>
            {article.publishedTime && (
              <meta property="article:published_time" content={article.publishedTime} />
            )}
            {article.modifiedTime && (
              <meta property="article:modified_time" content={article.modifiedTime} />
            )}
            {article.author && (
              <meta property="article:author" content={article.author} />
            )}
            {article.section && (
              <meta property="article:section" content={article.section} />
            )}
            {article.tags && article.tags.map(tag => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
          </>
        )}
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Verification and Analytics (placeholder) */}
        {/* <meta name="google-site-verification" content="your-verification-code" /> */}
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>
      
      {/* Structured Data */}
      <StructuredData
        person={includePerson ? createPersonSchema() : undefined}
        website={includeWebsite ? createWebsiteSchema() : undefined}
        article={structuredData}
      />
    </>
  )
}

export default EnhancedSEO
