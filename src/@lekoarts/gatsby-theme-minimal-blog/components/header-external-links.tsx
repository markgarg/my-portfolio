/** @jsx jsx */
import * as React from "react"
import { jsx, Link as TLink } from "theme-ui"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"
import Icon from "../../../components/Icon/Icon"
import getIcon from "../../../utils/get-icon"

const HeaderExternalLinks = () => {
  const { externalLinks } = useMinimalBlogConfig()

  return (
    <React.Fragment>
      {externalLinks && externalLinks.length > 0 && (
        <div sx={{ 
          "a:not(:first-of-type)": { ml: 3 },
          display: `flex`,
          flexDirection: `row`,
          alignItems: `center`,
          justifyContent: `space-around`,
          width: `150px`
        }}>
          {externalLinks.map((link) => (
            <TLink key={link.url} href={link.url} >
              <span sx={{ p: `10px` }}>
                <Icon name={link.name} icon={getIcon(link.name)} size="20px" />
              </span>
            </TLink>
          ))}
        </div>
      )}
    </React.Fragment>
  )
}

export default HeaderExternalLinks