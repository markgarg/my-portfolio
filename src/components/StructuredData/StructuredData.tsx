import React from "react"
import { Helmet } from "react-helmet"

interface StructuredDataProps {
  type?: "website" | "article" | "person"
  title?: string
  description?: string
  url?: string
  image?: string
  author?: string
  datePublished?: string
  dateModified?: string
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type = "website",
  title,
  description,
  url,
  image,
  author,
  datePublished,
  dateModified,
}) => {
  const siteUrl = "https://rohitmacherla.com"
  const defaultImage = `${siteUrl}/media/banner.png`

  // Website structured data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title || "Rohit Macherla's Portfolio",
    description: description || "Salesforce Developer, Technical Writer, and Monitoring Specialist",
    url: url || siteUrl,
    author: {
      "@type": "Person",
      name: "Rohit Macherla",
      url: siteUrl,
      sameAs: [
        "https://github.com/rohitmacherla",
        "https://linkedin.com/in/rohitmacherla",
      ],
    },
  }

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: url,
    image: image || defaultImage,
    author: {
      "@type": "Person",
      name: author || "Rohit Macherla",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Rohit Macherla",
      url: siteUrl,
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
  }

  // Person structured data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rohit Macherla",
    url: siteUrl,
    image: defaultImage,
    jobTitle: "Salesforce Developer",
    worksFor: {
      "@type": "Organization",
      name: "Salesforce Ecosystem",
    },
    knowsAbout: [
      "Salesforce Development",
      "Apex Programming",
      "Lightning Web Components",
      "Prometheus Monitoring",
      "Technical Writing",
    ],
    sameAs: [
      "https://github.com/rohitmacherla",
      "https://linkedin.com/in/rohitmacherla",
    ],
  }

  let schema
  switch (type) {
    case "article":
      schema = articleSchema
      break
    case "person":
      schema = personSchema
      break
    default:
      schema = websiteSchema
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type === "article" ? "article" : "website"} />
      <meta property="og:title" content={title || "Rohit Macherla's Portfolio"} />
      <meta property="og:description" content={description || "Salesforce Developer, Technical Writer, and Monitoring Specialist"} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content="Rohit Macherla's Portfolio" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "Rohit Macherla's Portfolio"} />
      <meta name="twitter:description" content={description || "Salesforce Developer, Technical Writer, and Monitoring Specialist"} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content={author || "Rohit Macherla"} />
      {url && <link rel="canonical" href={url} />}
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  )
}

export default StructuredData
