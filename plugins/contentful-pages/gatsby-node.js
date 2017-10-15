const path = require("path")
const {createFilePath}  = require("gatsby-source-filesystem") 

exports.onCreateNode = ({node, getNode, boundActionCreators:{createNodeField}}) => {
    if(node.internal.type == `ContentfulPost`){
        createNodeField({
            node, 
            name: `slug`,
            value: node.title.replace(/ +/g, '-').toLowerCase()
        })
    }
}

exports.createPages = ({graphql, boundActionCreators:{createPage}}, {template}) => 
                graphql(`
                    {
                        allContentfulPost {
                            edges {
                                node {
                                    fields {
                                        slug
                                    }
                                }
                            }
                        }
                    }
                `).then(({data: {allContentfulPost: {edges}}}) => {
                    const component = path.resolve(template)
                    edges.forEach(({node: {fields: {slug}}}) => {
                        createPage({
                            path: slug, 
                            component,
                            context: {slug}
                        })
                    })
                })
        