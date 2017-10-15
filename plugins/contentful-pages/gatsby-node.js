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

exports.createPages = ({graphql, boundActionCreators:{createPage}}) => 
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
                    edges.forEach(({node: {fields: {slug}}}) => {
                        console.log(slug)
                        createPage({
                            path: slug, 
                            component: path.resolve(`./src/templates/contentful.js`),
                            context: {slug}
                        })
                    })
                })
        