/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blog-post.tsx');
    resolve(
      graphql(`
        {
          allContentfulBlogPost {
            edges {
              node {
                id
                slug
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allContentfulBlogPost.edges.forEach((edge) => {
          createPage({
            path: edge.node.slug,
            component: blogPostTemplate,
            context: {
              slug: edge.node.slug,
            },
          });
        });
        return;
      })
    );
  });
};
