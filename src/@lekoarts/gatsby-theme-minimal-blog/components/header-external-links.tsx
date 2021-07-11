/** @jsx jsx */
import * as React from "react"
import { jsx, Link as TLink } from "theme-ui"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"
import Icon from "../../../components/Icon/Icon"
import getIcon from "../../../utils/get-icon"

const HeaderExternalLinks = () => {
  const { externalLinks } = useMinimalBlogConfig()
  const fill = "#999";

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
              <div sx={{ width: `25px`, height: `25px` }}>
                <Icon name={link.name}
                  icon={getIcon(link.name)}
                  fill={fill} />
              </div>
            </TLink>
          ))}
        </div>
      )}
    </React.Fragment>
  )
}

export default HeaderExternalLinks