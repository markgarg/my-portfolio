import React from "react"
import { Helmet } from "react-helmet"

interface PersonSchema {
  "@context": "https://schema.org"
  "@type": "Person"
  name: string
  jobTitle?: string
  description?: string
  url?: string
  sameAs?: string[]
  image?: string
  worksFor?: {
    "@type": "Organization"
    name: string
  }
  knowsAbout?: string[]
}

interface ArticleSchema {
  "@context": "https://schema.org"
  "@type": "BlogPosting"
  headline: string
  description?: string
  author: {
    "@type": "Person"
    name: string
    url?: string
  }
  datePublished?: string
  dateModified?: string
  url?: string
  image?: string[]
  mainEntityOfPage?: {
    "@type": "WebPage"
    "@id": string
  }
}

interface WebsiteSchema {
  "@context": "https://schema.org"
  "@type": "Website"
  name: string
  description?: string
  url: string
  author: {
    "@type": "Person"
    name: string
  }
  potentialAction?: {
    "@type": "SearchAction"
    target: string
    "query-input": string
  }
}

interface StructuredDataProps {
  /** Person schema for about pages and author info */
  person?: PersonSchema
  /** Article schema for blog posts */
  article?: ArticleSchema
  /** Website schema for homepage */
  website?: WebsiteSchema
}

const StructuredData = ({ person, article, website }: StructuredDataProps) => {
  const schemas = []
  
  if (person) {
    schemas.push(person)
  }
  
  if (article) {
    schemas.push(article)
  }
  
  if (website) {
    schemas.push(website)
  }

  if (schemas.length === 0) return null

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
    </Helmet>
  )
}

export default StructuredData

// Predefined schemas for common use cases
export const createPersonSchema = (overrides: Partial<PersonSchema> = {}): PersonSchema => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rohit Macherla",
  jobTitle: "Salesforce Developer & Solutions Architect",
  description: "Passionate software developer with expertise in Salesforce.com, Java, Python, React.js, and Scala. Solves business problems with technology.",
  url: "https://rohitmacherla.com",
  sameAs: [
    "https://github.com/markgarg",
    "https://www.linkedin.com/in/rohit-macherla",
    "https://stackexchange.com/users/183803/markgarg",
    "https://trailblazer.me/id/rmacherla1"
  ],
  image: "https://rohitmacherla.com/rohit.jpg",
  knowsAbout: [
    "Salesforce.com",
    "Java",
    "Python", 
    "React.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Software Architecture",
    "Cloud Computing"
  ],
  ...overrides
})

export const createWebsiteSchema = (overrides: Partial<WebsiteSchema> = {}): WebsiteSchema => ({
  "@context": "https://schema.org",
  "@type": "Website",
  name: "Rohit Macherla",
  description: "Rohit Macherla's portfolio and blog about software development, Salesforce, and technology solutions.",
  url: "https://rohitmacherla.com",
  author: {
    "@type": "Person",
    name: "Rohit Macherla"
  },
  ...overrides
})
