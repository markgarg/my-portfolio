import React from "react"

export interface PersonSchema {
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
  alumniOf?: {
    "@type": "CollegeOrUniversity"
    name: string
  }
  hasCredential?: {
    "@type": "EducationalOccupationalCredential"
    name: string
    credentialCategory?: string
  }[]
  knowsAbout?: string[]
}

export interface ArticleSchema {
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

export interface WebsiteSchema {
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
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  )
}

export default StructuredData

// Predefined schemas for common use cases
export const createPersonSchema = (overrides: Partial<PersonSchema> = {}): PersonSchema => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rohit Macherla",
  jobTitle: "Lead Developer & Salesforce Architect",
  description:
    "Lead Developer and Salesforce Architect with 20+ years of software engineering experience in high-volume enterprise platforms, observability, CI/CD, and AI adoption.",
  url: "https://rohitmacherla.com/about",
  sameAs: [
    "https://github.com/markgarg",
    "https://www.linkedin.com/in/rohit-macherla",
    "https://stackexchange.com/users/183803/markgarg",
    "https://trailblazer.me/id/rmacherla1",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Sky",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Osmania University",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Salesforce Certified Application Architect",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Salesforce Certified Platform Data Architect",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Salesforce Certified Platform Sharing and Visibility Architect",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Salesforce Certified Platform Developer II",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Salesforce Certified Platform Developer",
      credentialCategory: "certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Salesforce Certified Platform App Builder",
      credentialCategory: "certification",
    },
  ],
  knowsAbout: [
    "Salesforce Architecture",
    "Enterprise Software Engineering",
    "Observability",
    "Prometheus",
    "Datadog",
    "CI/CD",
    "GitHub Actions",
    "Java",
    "Python",
    "Node.js",
    "React",
    "Scala",
  ],
  ...overrides,
})

export const createWebsiteSchema = (overrides: Partial<WebsiteSchema> = {}): WebsiteSchema => ({
  "@context": "https://schema.org",
  "@type": "Website",
  name: "Rohit Macherla",
  description: "Rohit Macherla's portfolio and blog about software development, Salesforce, and technology solutions.",
  url: "https://rohitmacherla.com",
  author: {
    "@type": "Person",
    name: "Rohit Macherla",
  },
  ...overrides,
})
