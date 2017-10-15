const path = require("path")
// const {createFilePath}  = require("gatsby-source-filesystem") 

// exports.onCreateNode = ({node, getNode, boundActionCreators:{createNodeField}}) => {
//     if(node.internal.type == `MarkdownRemark`){
//         const slug = createFilePath({node, getNode, basePath: `posts`})
//         createNodeField({
//             node, 
//             name: `slug`,
//             value: node.frontmatter.path || slug
//         })
//     }
// }

exports.createPages = ({graphql, boundActionCreators:{createPage}}) => 
                graphql(`
                    {
                        allMarkdownRemark {
                            edges {
                                node {
                                    frontmatter {
                                        slug
                                    }
                                }
                            }
                        }
                    }
                `).then(({data: {allMarkdownRemark: {edges}}}) => {
                    edges.forEach(({node: {frontmatter: {slug}}}) => {
                        createPage({
                            path: slug, 
                            component: path.resolve(`./src/templates/blog-post.js`),
                            context: {slug}
                        })
                    })
                })
        