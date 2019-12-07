import React from "react"
import styles from "../css/postTemplate.module.css"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
const postTemplate = ({ data, pageContext }) => {
  const { title, date, author, image } = data.mdx.frontmatter
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
        </div>
        <Image fluid={img} />
        <div className={styles.content}>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
        <ul className={styles.links}>
          {previous === false ? null : (
            <li>
              {previous && (
                <Link to={previous.node.frontmatter.slug} className={styles.link}>
                  <span role="img" aria-label="arrow-down">⬇️</span> {previous.node.frontmatter.title}
                </Link>
              )}
            </li>
          )}
          {next === false ? null : (
            <li>
              {next && (
                <Link to={next.node.frontmatter.slug} className={styles.link}>
                  {next.node.frontmatter.title} <span role="img" aria-label="arrow-up">⬆️</span>
                </Link>
              )}
            </li>
          )}
        </ul>
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
