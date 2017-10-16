import React from "react"
import g from 'glamorous'
import Link from "gatsby-link"
import { rhythm } from '../utils/typography'

const Elem = ({ id, slug, title, date, summary }) => {
    return (<div key={id}>
        <Link to={slug} css={{ textDecoration: `none`, color: `inherit` }}>
            <g.H3 marginBottom={rhythm(1 / 4)}>
                {title}{" "}
                <g.Span color="#BBB">- {date}</g.Span>
            </g.H3>
            <p>{summary}</p>
        </Link>
    </div>)
}

export default ({ data }) =>
    <div>
        <g.H1 display={"inline-block"} borderBottom={"1px solid"}>
            Amazing Panda Eating Things
        </g.H1>
        <h4>
            {data.allMarkdownRemark.totalCount + data.allContentfulPost.totalCount} Posts
       </h4>
        {data.allMarkdownRemark.edges.map(({ node }) =>
            <Elem id={node.id}
                slug={node.frontmatter.slug}
                title={node.frontmatter.title}
                date={node.frontmatter.date}
                summary={node.excerpt} />
        )}
        {data.allContentfulPost.edges.map(({ node }) =>
            <Elem id={node.id}
                slug={node.fields.slug}
                title={node.title}
                date={node.updatedAt}
                summary={node.content} />
        )}
    </div>


export const query = graphql`
    query IndexQuery {
        allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                        slug
                    }
                    excerpt
                }
            }
        }
        allContentfulPost(sort: {fields: [updatedAt], order: DESC}) {
            totalCount
            edges {
                node {
                    id
                    title
                    content
                    updatedAt(formatString: "DD MMMM, YYYY")
                    fields{
                        slug
                    }
                }
            }
        }
    }
`