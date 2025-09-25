/** @jsx jsx */
import { jsx, Link as TLink } from "theme-ui"
import { Link } from "gatsby"

interface BreadcrumbItem {
  label: string
  path?: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  /** Whether to include structured data for SEO */
  includeSchema?: boolean
}

const Breadcrumbs = ({ items, includeSchema = true }: BreadcrumbsProps) => {
  // Generate structured data for breadcrumbs
  const structuredData = includeSchema ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.path && { "item": `https://rohitmacherla.com${item.path}` })
    }))
  } : null

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <nav 
        aria-label="Breadcrumb navigation"
        sx={{
          padding: "8px 0",
          borderBottom: "1px solid",
          borderColor: "muted",
          marginBottom: "16px"
        }}
      >
        <ol
          sx={{
            display: "flex",
            alignItems: "center",
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontSize: "14px"
          }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                "&:not(:last-child)::after": {
                  content: '"/"',
                  margin: "0 8px",
                  color: "muted",
                  fontSize: "12px"
                }
              }}
            >
              {item.current || !item.path ? (
                <span
                  aria-current={item.current ? "page" : undefined}
                  sx={{
                    color: item.current ? "text" : "muted",
                    fontWeight: item.current ? "bold" : "normal"
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <TLink
                  as={Link}
                  to={item.path}
                  sx={{
                    color: "primary",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline"
                    },
                    "&:focus": {
                      outline: "2px solid",
                      outlineColor: "primary",
                      outlineOffset: "2px",
                      borderRadius: "2px"
                    }
                  }}
                >
                  {item.label}
                </TLink>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs

// Helper function to generate breadcrumbs from pathname
export const generateBreadcrumbs = (pathname: string, pageTitle?: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", path: "/" }
  ]
  
  const pathSegments = pathname.split("/").filter(segment => segment)
  
  pathSegments.forEach((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/")
    const isLast = index === pathSegments.length - 1
    
    // Format segment for display
    let label = segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    
    // Use page title for the current page if provided
    if (isLast && pageTitle) {
      label = pageTitle
    }
    
    breadcrumbs.push({
      label,
      path: isLast ? undefined : path,
      current: isLast
    })
  })
  
  return breadcrumbs
}
