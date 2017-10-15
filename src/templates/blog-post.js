import React from "react"
import Helmet from 'react-helmet'

export default ({data: {markdownRemark: post}}) => 
    <div>
      <Helmet title={post.frontmatter.title}/>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.html}}/>
    </div>


export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`