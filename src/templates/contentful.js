import React from "react"
import Helmet from 'react-helmet'

export default ({data: {contentfulPost: post}}) => 
    <div>
      <Helmet title={post.title}/>
      <h1>{post.title}</h1>
      <p>{post.title}</p>
    </div>


export const query = graphql`
  query ContentfulPostQuery($slug: String!) {
    contentfulPost(fields: { slug: { eq: $slug } }) {
      title
      content
    }
  }
`