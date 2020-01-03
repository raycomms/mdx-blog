import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
const TagsPage = ({ pageContext, data }) => {
    const { tag } = pageContext
    const { edges, totalCount } = data.allMdx
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
        } tagged with "${tag}"`
    return (
        <Layout>
            <h1>{tagHeader}</h1>
            <ul>
                {edges.map(({ node }) => {
                    const { slug, title } = node.frontmatter
                    return (
                        <li key={slug}>
                            <Link to={slug}>{title}</Link>
                        </li>
                    )
                })}
            </ul>
            <Link to="/tags">All tags</Link>
            <p><Link to="/">All Posts</Link></p>
        </Layout>
    )
}

export default TagsPage

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
              slug
              title
              date(formatString: "MMMM Do, YYYY")
              author
          }
          excerpt
        }
      }
    }
  }
`
