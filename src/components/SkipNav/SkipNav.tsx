/** @jsx jsx */
import { jsx } from "theme-ui"

interface SkipNavProps {
  /** Target ID to skip to (usually main content) */
  targetId?: string;
  /** Custom skip link text */
  text?: string;
}

const SkipNav = ({ 
  targetId = "main-content", 
  text = "Skip to main content" 
}: SkipNavProps) => {
  return (
    <a
      href={`#${targetId}`}
      sx={{
        position: "absolute",
        top: "-40px",
        left: "6px",
        background: "primary",
        color: "background",
        padding: "8px",
        textDecoration: "none",
        borderRadius: "4px",
        fontSize: "14px",
        fontWeight: "bold",
        zIndex: 1000,
        transition: "top 0.3s",
        "&:focus": {
          top: "6px",
          outline: "2px solid",
          outlineColor: "secondary",
          outlineOffset: "2px",
        },
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      {text}
    </a>
  );
};

export default SkipNav;
