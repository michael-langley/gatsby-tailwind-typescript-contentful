import { graphql } from 'gatsby';
import React from 'react';

interface Props {
  data: any;
}

const BlogPost = (props: Props) => {
  const { content } = props.data.contentfulBlog;
  return (
    <div>
      <h1>Hi</h1>
      <div dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }} />
    </div>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulBlog(id: { eq: $slug }) {
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
