require('dotenv').config()
const path = require("path")


module.exports = {
    siteMetadata: {
        title: `Xavier Serrano - Blog`,
        author: `Xavier Serrano`
    },
    plugins: [{
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography.js`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/post`,
                name: `posts`
            }
        },
        `gatsby-plugin-glamor`,
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: []
            }
        },
        'gatsby-plugin-catch-links',
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
              },
        },
        {
            resolve: `markdown-pages`,
            options: {
                component: path.resolve(`./src/templates/blog-post.js`)
            }
        },
        {
            resolve: `contentful-pages`,
            options:  {
                component: path.resolve(`./src/templates/contentful.js`)
            }
        }
        
    ]
}