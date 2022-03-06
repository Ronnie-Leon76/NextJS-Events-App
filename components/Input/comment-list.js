import classes from "./comment-list.module.css";
// import { getAllComments } from "../../pages/api/comments";
// import { useState } from "react";

function CommentList(props) {
  const { items } = props;
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((item) => (
        <li>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

// export async function getStaticProps() {
//   const data = getAllComments();
//   return {
//     props: {
//       comments: Object.values(data),
//     },
//   };
// }
export default CommentList;
