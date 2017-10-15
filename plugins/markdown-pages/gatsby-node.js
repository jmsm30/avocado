const path = require("path")
exports.createPages = ({graphql, boundActionCreators:{createPage}}, {template}) => 
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
                    const component = path.resolve(template)
                    console.log(component)
                    edges.forEach(({node: {frontmatter: {slug}}}) => {
                        createPage({
                            path: slug, 
                            component,
                            context: {slug}
                        })
                    })
                })
        