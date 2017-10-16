require('dotenv').config()

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
        }
        
    ]
}