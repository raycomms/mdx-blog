import React from "react"
import { Link, graphql } from "gatsby"
import slugify from "slugify"

const TagsPage = ({
    data: {
        allMdx: { group },
    },

}) => (
        <div>
            <h1>Tags</h1>
            <ul>
                {group.map(tag => (
                    <li key={tag.fieldValue}>
                        <Link to={`/tags/${slugify(tag.fieldValue)}`}>
                            {tag.fieldValue} ({tag.totalCount})
            </Link>
                    </li>
                ))}
            </ul>
            <p><Link to="/">All Posts</Link></p>
        </div>
    )

export default TagsPage

export const pageQuery = graphql`
  query {
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`