import React, { useRef, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import { useOnScreen } from "../../hooks/"
import Context from "../../context/"
import ContentWrapper from "../../styles/contentWrapper"
import Underlining from "../../styles/underlining"
import Social from "../social"
import SplashScreen from "../splashScreen"
import { lightTheme, darkTheme } from "../../styles/theme"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 6rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-bottom: 4rem;
    }
    .greetings {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .emoji {
      margin-left: 0.75rem;
      width: 2.2rem;
      height: 2.2rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-left: 1rem;
        width: 3rem;
        height: 3rem;
      }
    }
    .title {
      margin-bottom: 1.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-bottom: 0;
        margin-top: 0;
      }
    }
    .subtitle {
      margin-top: -0.75rem;
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
    .description {
      font-size: 1.125rem;
      margin-bottom: 2rem;
      width: 100%;
      max-width: 31.25rem;
    }
    .image-content {
      width: 100%;
      max-width: 18rem;
      margin-left: 0;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        max-width: 22rem;
      }
    }
    .about-author {
      border-radius: ${({ theme }) => theme.borderRadius};
      box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
      filter: grayscale(20%) contrast(1) brightness(90%);
      transition: all 0.3s ease-out;
      &:hover {
        filter: grayscale(50%) contrast(1) brightness(90%);
        transform: translate3d(0px, -0.125rem, 0px);
        box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.32);
      }
    }
    .social-wrapper {
      margin-top: 2rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-top: 0;
      }
    }
  }
`

const AnimatedUnderlining = motion.custom(Underlining)

const Hero = ({ content }) => {
  const { frontmatter, body } = content[0].node
  const { isIntroDone, darkMode } = useContext(Context).state

  // Controls to orchestrate animations of greetings, emoji, social profiles, underlining,
  // profile pic
  const gControls = useAnimation()
  const eControls = useAnimation()
  const sControls = useAnimation()
  const uControls = useAnimation()
  const tControls = useAnimation()
  const iControls = useAnimation()
  // Required for animating the description
  const tRef = useRef()
  const tOnScreen = useOnScreen(tRef)

  // Required for animating the profile pic image
  const iRef = useRef()
  const iOnScreen = useOnScreen(iRef)

  // Start Animations after the splashScreen sequence is done
  useEffect(() => {
    const pageLoadSequence = async () => {
      if (isIntroDone) {
        eControls.start({
          rotate: [0, -10, 12, -10, 9, 0, 0, 0, 0, 0, 0],
          transition: {
            duration: 2.5,
            loop: 3,
            repeatDelay: 1,
          },
        })
        if (tOnScreen) tControls.start({ opacity: 1, y: 0 })
        await gControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 0.4 },
        })
        await sControls.start({
          opacity: 1,
          x: 0,
        })
        // Animate underlining to hover state
        await uControls.start({
          boxShadow: `inset 0 -2rem 0 ${
            darkMode ? darkTheme.colors.secondary : lightTheme.colors.secondary
          }`,
          transition: {
            delay: 0.4,
            ease: "circOut",
          },
        })
      }
    }
    pageLoadSequence()
  }, [
    isIntroDone,
    darkMode,
    eControls,
    gControls,
    sControls,
    uControls,
    tControls,
    tOnScreen,
  ])

  return (
    <StyledSection id="hero">
      {!isIntroDone && <SplashScreen />}
      <StyledContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gControls}
          data-testid="animated-heading"
        >
          <h1 className="title">
            <div className="greetings">
              {frontmatter.greetings}
              <motion.div
                animate={eControls}
                style={{
                  originX: 0.7,
                  originY: 0.7,
                }}
              >
                <Img
                  className="emoji"
                  fluid={frontmatter.icon.childImageSharp.fluid}
                />
              </motion.div>
            </div>
            {frontmatter.title}
          </h1>
          <h2 className="subtitle">
            {frontmatter.subtitlePrefix}{" "}
            <AnimatedUnderlining animate={uControls} big>
              {frontmatter.subtitle}
            </AnimatedUnderlining>
          </h2>
          <div className="wrapper">
            <motion.div
              className="inner-wrapper"
              ref={tRef}
              initial={{ opacity: 1, y: 20 }}
              animate={tControls}
            >
              <div className="description">
                <MDXRenderer>{body}</MDXRenderer>
              </div>
            </motion.div>
            <motion.div
              className="image-content"
              ref={iRef}
              initial={{ opacity: 1, x: 0 }}
              animate={iControls}
            >
              <Img
                className="about-author"
                fluid={frontmatter.profilePic.childImageSharp.fluid}
              />
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="social-wrapper"
          initial={{ opacity: 0, x: 20 }}
          animate={sControls}
        >
          <Social fontSize=".95rem" padding=".3rem 1.25rem" width="auto" />
        </motion.div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

Hero.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default Hero
