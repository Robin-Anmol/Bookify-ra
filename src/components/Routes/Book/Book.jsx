import React, { useContext, useEffect, useState } from "react";
import "./Book.css";
import ReactTimeAgo from "react-time-ago";
import Icon from "../../Icon/Icon";
import { db } from "../../../Fire";
import firebase from "firebase";

import { addFavorites, removeFavorite } from "../Favorites";
import { ContextApp } from "../../../ContextAPI";
import { HashLink as Link } from "react-router-hash-link";
import { notificationFunc } from "../Notification";
import Bookinfo from "./Bookinfo";
import Morefilters from "../../Booksdisplay/Morefilters";
import { CSSTransition } from "react-transition-group";

function Book(props) {
  const [noerrorimg, setNoerrorimg] = useState(true);
  const {
    book,
    favs,
    books,
    hidelike,
    userimgbook,
    editable,
    hidebtns,
    allbooks,
  } = props;
  const [userimg, setUserimg] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favorited, setFavorited] = useState(false);
  const user = firebase.auth().currentUser;
  const { scrollto, setScrollto } = useContext(ContextApp);
  const [liked, setLiked] = useState(false);
  const [userbookid, setUserbookid] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [edit, setEdit] = useState(false);

  function likes() {
    books?.map((bookm) => {
      if (bookm.bookid === book.bookid) {
        let bookIndex = books.indexOf(bookm);
        if (book.likedby.includes(user.uid)) {
          books[bookIndex].likedby
            .filter((x) => x === user.uid)
            .forEach((el) => {
              let itemIndex = books[bookIndex].likedby.indexOf(el);
              books[bookIndex].likedby.splice(itemIndex, 1);
            });
          db.collection("allbooks").doc("allbooks").update({
            books: books,
          });
          notificationFunc(
            book,
            user.uid,
            "unliked your post",
            "likepost",
            "",
            "",
            enabled
          );
        } else {
          books[bookIndex].likedby.push(user.uid);
          db.collection("allbooks").doc("allbooks").update({
            books: books,
          });
          notificationFunc(
            book,
            user.uid,
            "liked your post",
            "likepost",
            "",
            "",
            enabled
          );
        }
      }
    });
  }

  console.log(book.genre);
  useEffect(() => {
    db.collection("users")
      .doc(book.userid)
      .onSnapshot((snap) => {
        const userdate = snap.data();
        setUserimg(userdate?.userinfo.cover);
        setUserbookid(userdate?.uid);
        setEnabled(userdate?.notifis);
      });
    db.collection("favorites")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const favoritesdata = snap.data();
        setFavorites(favoritesdata?.favorites);
        if (
          favoritesdata.favorites.some(
            (favorite) => favorite?.bookid === book.bookid
          )
        ) {
          setFavorited(true);
        } else {
          setFavorited(false);
        }
      });
  }, [book]);
  return (
    <>
      {edit ? (
        <Bookinfo
          allbooks={allbooks}
          book={book}
          books={books}
          hidelike={hidelike}
          editable={editable}
          userimg={userimg}
          userbookid={userbookid}
          likes={likes}
          setEdit={setEdit}
          favorites={favorites}
          user={user}
          favorited={favorited}
          edit={true}
        />
      ) : (
        <Bookinfo
          allbooks={allbooks}
          book={book}
          books={books}
          hidelike={hidelike}
          editable={editable}
          userimg={userimg}
          userbookid={userbookid}
          likes={likes}
          setEdit={setEdit}
          favorites={favorites}
          user={user}
          favorited={favorited}
        />
      )}
    </>
  );
}
export default Book;
