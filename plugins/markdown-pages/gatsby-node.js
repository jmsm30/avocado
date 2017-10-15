const slash = require("slash")
exports.createPages = ({graphql, boundActionCreators:{createPage}}, {component}) => 
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
                            component: slash(component),
                            context: {slug}
                        })
                    })
                })
        