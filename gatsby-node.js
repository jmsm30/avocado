const path = require("path")
exports.onCreateNode = ({node, getNode, boundActionCreators:{createNodeField}}) => {
    if(node.internal.type == `ContentfulPost`){
        createNodeField({
            node, 
            name: `slug`,
            value: `/${node.title.replace(/ +/g, '-').toLowerCase()}`
        })
    }
}


const createContentfulPages = ({graphql, createPage}) => 
                graphql(`
                    {
                        allContentfulPost {
                            edges {
                                node {
                                    id
                                    fields {
                                        slug
                                    }
                                }
                            }
                        }
                    }
                `).then(({data: {allContentfulPost: {edges}}}) => {
                    console.dir(JSON.stringify(edges))
                    edges.forEach(({node: {id, fields: {slug}}}) => {
                        createPage({
                            path: slug, 
                            component: path.resolve(`./src/templates/contentful-post.js`),
                            context: {slug, id}
                        })
                    })
                })


const createMarkdownPages = ({graphql, createPage}) => 
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

exports.createPages = ({graphql, boundActionCreators:{createPage}}) => {
    const creators =  [createMarkdownPages, createContentfulPages].map(fn => fn({graphql, createPage}))
    return Promise.all(creators)
}
