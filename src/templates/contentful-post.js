import React from "react"
import Helmet from 'react-helmet'

export default ({data: {contentfulPost: post}}) => {
   return  (<div>
              <Helmet title={post.title}/>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
        </div>)
}


export const query = graphql`
  query ContentfulPostQuery($id: String!) {
    contentfulPost(id: {eq: $id}){
      title
      content
    }
  }
`