import React from 'react';
import { Link } from "gatsby";
import ConcatWords from "../utils/ConcatWords"
import slugify from "slugify"

const Tags = ({ list = [] }) => {
  return (
    <>
      {list.map((tag, index, arr) => (
        <ConcatWords arrCount={arr.length} index={index} key={tag}>
          <Link to={`/tags/${slugify(tag)}`}>{tag}</Link>
        </ConcatWords>
      ))}
    </>
  );
}
export default Tags

