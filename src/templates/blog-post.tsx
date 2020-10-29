import { graphql } from 'gatsby';
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from 'gatsby-image';

interface Props {
  data: any;
}

const BlogPost = (props: Props) => {
  const { content, photos } = props.data.contentfulBlogPost;
  const { edges } = props.data.allContentfulNeed;
  console.log({ edges });
  return (
    <div className="flex flex-col">
      <h1>Hi</h1>
      {documentToReactComponents(content.json)}
      <div className="h-64 w-64 overflow-hidden">
        <Img fluid={photos[0].fluid} key={photos[0].fluid.src} alt={photos[0].title} />
      </div>

      <div>
        {edges.map((edge: any) => {
          return (
            <>
              <h4>{edge.node.whatIsNeeded}</h4>
              <p>{documentToReactComponents(edge.node.descriptionOfWhyItIsNeeded.json)}</p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      content {
        json
      }
      photos {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
    allContentfulNeed {
      edges {
        node {
          whatIsNeeded
          descriptionOfWhyItIsNeeded {
            json
          }
        }
      }
    }
  }
`;
