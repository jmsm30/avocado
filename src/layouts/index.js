import React from "react"
import Link from "gatsby-link"
import Helmet from 'react-helmet'

import g from "glamorous"
import { css } from "glamor"
import {rhythm} from '../utils/typography'

const linkStyle = css({display: `inline-block`, marginRight: rhythm(1)})
const headerLinkStyle = css({textShadow: `none`, backgroundImage: `none`})
const ListLink = props => 
    <li className={linkStyle}>
        <Link to={props.to}>
            {props.children}
        </Link>
    </li>

export default ({ children, data: {site: {siteMetadata: {title}}} }) =>
  <g.Div margin={`0 auto`}
        maxWidth={750}
        padding={rhythm(0.5)}
        paddingTop={rhythm(1.5)}
        textAlign={`center`}
  >
    <Helmet title={title}/>
    <g.Header marginBottom={rhythm(1)}>
        <Link to="/" className={headerLinkStyle}>
            <g.H3  marginBottom={rhythm(1)}
                display={`inline-block`}
                fontStyle={`normal`}
            >{title}</g.H3>
        </Link>
        <g.Ul listStyle={`none`}>
            <ListLink to="/">Home</ListLink>
            <ListLink to="/pandas/">Pandas</ListLink>
            <ListLink to="/about/">About</ListLink>
            <ListLink to="/about-pandas/">About Pandas</ListLink>
            <ListLink to="/contact/">Contact</ListLink>
            <ListLink to="/my-posts/">My Posts</ListLink>
        </g.Ul>
    </g.Header>
    {children()}
  </g.Div>


 export const query = graphql`
  query LayoutQuery{
    site {
        siteMetadata {
          title
        }
    }
  }
`