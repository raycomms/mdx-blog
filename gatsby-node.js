exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const {
    data: {
      allMdx: { edges: posts },
    },
  } = await graphql(`
    {
      allMdx {
        edges {
          node {
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `)
  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];
    const { slug } = node.frontmatter
    createPage({
      path: slug,
      component: require.resolve("./src/templates/post-template.js"),
      context: {
        slug: slug,
        previous,
        next,
      },
    })
  })
}
