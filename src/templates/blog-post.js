import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import ReactDisqusComments from 'react-disqus-comments'

import Bio from '../components/Bio'
import { rhythm, scale } from '../utils/typography'

export default ({ data, pathContext }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pathContext
  return (
    <div>
      <Helmet>
        <title>{`${post.frontmatter.title} | ${siteTitle}`}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <h1>{post.frontmatter.title}</h1>
      <Date>
        {post.frontmatter.date}{' '}
        <a
          href={`https://github.com/siwatpru/siwatpru.com/blob/master/blog${
            post.fields.slug
          }index.md`}
          target="_blank"
          rel="noopener"
        >
          [source]
        </a>
      </Date>
      <BlogPost dangerouslySetInnerHTML={{ __html: post.html }} />
      <Hr />
      <Bio />
      <Ul>
        {previous && (
          <li>
            <Link to={`/blog${previous.fields.slug}`} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          </li>
        )}

        {next && (
          <li>
            <Link to={`/blog${next.fields.slug}`} rel="next">
              {next.frontmatter.title} →
            </Link>
          </li>
        )}
      </Ul>
      <ReactDisqusComments
        shortname="siwatpru"
        identifier={post.fields.slug}
        title={post.frontmatter.title}
        url={`https://siwatpru.com/blog${post.fields.slug}`}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

const BlogPost = styled.div`
  code {
    background: #f5f2f0;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
`

const Date = styled.p`
  font-size: ${scale(-1 / 5).fontSize};
  line-height: ${scale(-1 / 5).lineHeight};
  display: block;
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-0.8)};
`

const Hr = styled.hr`
  margin-bottom: ${rhythm(1)};
  background: hsla(0, 0%, 0%, 0.07);
`

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`
