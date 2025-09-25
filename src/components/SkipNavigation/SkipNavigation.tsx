import React from "react"
import { css } from "@emotion/react"

const skipNavStyles = css`
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  font-size: 14px;
  font-weight: bold;
  
  &:focus {
    top: 6px;
  }
  
  &:hover {
    background: #333;
  }
`

const SkipNavigation: React.FC = () => {
  return (
    <a href="#main-content" css={skipNavStyles}>
      Skip to main content
    </a>
  )
}

export default SkipNavigation
