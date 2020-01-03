import React from "react"
import Tags from "../components/Tags"
import styles from "../css/postTemplate.module.css"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
const postTemplate = ({ data, pageContext }) => {
  const { title, date, author, image, tags } = data.mdx.frontmatter
  const { body } = data.mdx
  const { previous, next } = pageContext;
  const img = image.childImageSharp.fluid;
  console.log(pageContext)
  return (
    <Layout>
      <section className={styles.template}>
        <Link to="/" className={styles.link}>
          back to all posts
        </Link>
        <div className={styles.info}>
          <h1>{title}</h1>
          <h4>
            <span>by {author}</span> / <span>{date}</span>
          </h4>
          <h4>{/*In the&nbsp;*/}
            <Tags list={tags || []} />
            {/*&nbsp;Category{tags.length === 1 ? '' : 's'}*/}
          </h4>
        </div>
        <Image fluid={img} />
        <div className={styles.content}>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
        <div className={styles.info}>
          <h4><ul className={styles.links}>
            {previous === false ? null : (
              <li>
                {previous && (
                  <Link to={`/${previous.frontmatter.slug}`}>
                    <span role="img" aria-label="arrow-down">⬇️</span> {previous.frontmatter.title}
                    <li>{previous.frontmatter.date}</li>
                  </Link>
                )}
              </li>
            )}
            {next === false ? null : (
              <li>
                {next && (
                  <Link to={`/${next.frontmatter.slug}`}>
                    {next.frontmatter.title} <span role="img" aria-label="arrow-up">⬆️</span>
                    <li>{next.frontmatter.date}</li>
                  </Link>
                )}
              </li>
            )}
          </ul></h4>
        </div>
        <hr />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query getPost($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        slug
        date(formatString: "MMMM Do, YYYY")
        author
        tags
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
body
    }
  }
`

export default postTemplate
