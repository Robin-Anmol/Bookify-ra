import React from "react";
import Bookinfo from "../Book/Bookinfo";
import Book from "../Book/Book";
import Defaultmsg from "../../Booksdisplay/Defaultmsg";
function Allposts(props) {
  const { usersbooks, usersinfo } = props;
  const booksrow = usersbooks?.map((book) => {
    return <Book book={book} hidebtns={true} />;
  });
  return (
    <div className="allposts">
      {booksrow?.length === 0 ? (
        <Defaultmsg icon="fal fa-exclamation-circle" text="No recent posts!" />
      ) : (
        booksrow
      )}
      <h2>
        {usersinfo?.name}'s Posts{" "}
        {`(${usersbooks?.length ? usersbooks.length : 0})`}
      </h2>
    </div>
  );
}
export default Allposts;
