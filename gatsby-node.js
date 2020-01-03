const path = require("path")
const slugify = require("slugify")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const postTemplate = path.resolve("src/templates/post-template.js")
  const tagTemplate = path.resolve("src/templates/tag-template.js")
  const result = await graphql(`
  {
    allMdx(sort: {fields: frontmatter___date, order: DESC}, limit: 2000) {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "MMMM Do, YYYY")
            author
            tags
          }
          excerpt
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`)
  // handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  const posts = result.data.allMdx.edges
  // Create blog posts pages.
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `/${post.node.frontmatter.slug}`,
      component: postTemplate,
      context: {
        slug: post.node.frontmatter.slug,
        previous,
        next,
      },
    })
  })
  // Extract tag data from query
  const tags = result.data.allMdx.group
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${slugify(tag.fieldValue)}`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
