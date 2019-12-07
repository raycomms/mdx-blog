exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const {
    data: {
      allMdx: { edges: posts },
    },
  } = await graphql(`
  {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "MMMM Do, YYYY")
            author
          }
          excerpt
        }
      }
    }
  }
  
  `)
  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];

    createPage({
      path: node.frontmatter.slug,
      component: require.resolve("./src/templates/post-template.js"),
      context: {
        slug: node.frontmatter.slug,
        previous,
        next,
      },
    })
  })
}
