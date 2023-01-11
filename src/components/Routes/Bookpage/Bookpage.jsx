import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Icon from "../../Icon/Icon";
import Motiondiv from "../Motiondiv";
import "./Bookpage.css";
import firebase from "firebase";
import { db } from "../../../Fire";
import Comment from "./Comment";
import { CSSTransition } from "react-transition-group";
import Notification from "../../Notification/Notification";
import { ContextApp } from "../../../ContextAPI";
import Postcomment from "./Postcomment";
import { addFavorites, removeFavorite } from "../Favorites";
import { HashLink as Link } from "react-router-hash-link";
import { notificationFunc } from "../Notification";
import TextareaAutosize from "react-textarea-autosize";
import { Redirect } from "react-router-dom";

function Bookpage(props) {
  const { book, books, favorites } = props;
  const { notification, setNotifibool, notifibool, scrollto, setScrollto } =
    useContext(ContextApp);
  const [comments, setComments] = useState([]);
  const [userimg, setUserimg] = useState("");
  const [msgstring, setMsgstring] = useState("");
  const user = firebase.auth().currentUser;
  const update = require("immutability-helper");
  const id = db.collection("comments").doc().id;
  const chatref = useRef();
  const [favorited, setFavorited] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [userispro, setUserispro] = useState(true);

  function sendMsg() {
    let msgobj = {
      senderid: user.uid,
      senderimg: userimg,
      msg: msgstring,
      sent: new Date(),
      likes: 0,
      sendername: user.displayName,
      replies: [],
      commentid: id,
      edited: false,
      likedby: [],
      hide: false,
      bookid: book.bookid,
    };
    db.collection("comments")
      .doc(book.bookid)
      .update({
        replies: firebase.firestore.FieldValue.arrayUnion(msgobj),
      });

    notificationFunc(
      book,
      user.uid,
      "commented on your post.",
      "sendcomment",
      id,
      user.uid,
      enabled
    );

    setMsgstring("");
  }
  function likes() {
    books &&
      books.map((bookm) => {
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
  function scrollTo() {
    chatref.current.scrollIntoView();
  }
  const commentsrow = comments?.map((comment) => {
    return (
      <>
        <Comment
          comment={comment}
          book={book}
          comments={comments}
          userimg={userimg}
        />
      </>
    );
  });

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const userdata = snap.data();
        setUserimg(userdata?.userinfo.cover);
        setUserispro(userdata?.pro);
      });
    db.collection("comments")
      .doc(book.bookid)
      .onSnapshot((snap) => {
        const commentsdata = snap.data();
        setComments(commentsdata?.replies);
      });
    db.collection("favorites")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const favoritesdata = snap.data();
        if (
          favoritesdata?.favorites.some(
            (favorite) => favorite?.bookid === book.bookid
          )
        ) {
          setFavorited(true);
        } else {
          setFavorited(false);
        }
      });
    db.collection("users")
      .doc(book.userid)
      .onSnapshot((snap) => {
        setEnabled(snap.data().notifis);
      });
    if (scrollto === "comments") {
      chatref.current.scrollIntoView();
      setScrollto("");
    }
  }, [book]);
  return (
    <Motiondiv
      html={
        <div className="bookpage">
          <div className="navigations">
            <Link smooth to={`/home#${book?.bookid}`} style={{ width: "100%" }}>
              <div className="previous">
                <i className="fal fa-long-arrow-alt-left"></i>
              </div>
            </Link>
            <div className="othericons">
              <div className="heart">
                <Icon
                  icon={
                    book?.likedby.includes(user.uid)
                      ? "fas fa-heart"
                      : "fal fa-heart"
                  }
                  fnct={likes}
                />
                <small>{book?.likedby.length}</small>
              </div>
              <div className="bookmark">
                {favorited ? (
                  <Icon
                    icon="fa fa-bookmark"
                    fnct={() => removeFavorite(favorites, book, user)}
                  />
                ) : (
                  <Icon
                    icon="fal fa-bookmark"
                    fnct={() => addFavorites(book, user)}
                  />
                )}
              </div>
              <div className="chat">
                <Icon icon="fal fa-comment" fnct={scrollTo} />
                <small>{comments?.length}</small>
              </div>
              <div className="dots">
                <Icon icon="fal fa-ellipsis-h" />
              </div>
            </div>
          </div>
          <div className="rightside">
            <div className="contimg">
              <div className="img">
                {book.cover ? (
                  <img
                    src={book?.cover}
                    alt=""
                    onError={(e) =>
                      (e.target.src =
                        "https://edit.org/images/cat/book-covers-big-2019101610.jpg")
                    }
                  />
                ) : (
                  <img
                    src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
                    alt=""
                  />
                )}
              </div>
              <div className="booktitle">
                <h2>{book.title}</h2>
                <span>
                  <strong>Author </strong>
                  {book?.author}
                </span>
                {book.award !== "" ? (
                  <p>
                    <strong>
                      {book.award.split(",").length === 1
                        ? book.award.split(",").length + " Award"
                        : book.award.split(",").length + " Awards"}{" "}
                    </strong>
                  </p>
                ) : (
                  <p>0 Awards</p>
                )}
                {book.award !== "" ? (
                  <div className="awards">
                    {book.award.split(",").map((award) => {
                      return (
                        <>
                          <div className="award">{award}</div>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="content">
              <h2 style={{ color: "#000", padding: 0, margin: "10px 0" }}>
                Book Description
              </h2>
              <p>
                {book?.title} genres includes {book?.genre}. It was published by{" "}
                {book?.publisher ? book?.publisher : "Not Provided"} in{" "}
                {book.date ? book.data : "Not Provided"}. Currently, it has
                obtained{" "}
                {book.award !== "" ? (
                  <span>
                    {book?.award.split(",").length === 1
                      ? book.award.split(",").length + " Award."
                      : book.award.split(",").length + " Awards."}{" "}
                  </span>
                ) : (
                  <span>0 Awards.</span>
                )}
              </p>
              <div style={{ margin: "1rem 0" }}></div>
              <p>{book?.bookDescription}</p>
              <h3 style={{ color: "#000" }}>About Author</h3>
              <p className="capitalize">
                {book?.aboutauthor ? book?.aboutauthor : "Nothing Available"}
              </p>
              <h3>ISBN #</h3>
              {book.isbn ? book.isbn : "Not Provided"}
              <h3>{book.pdf ? "Download PDF Here" : "No PDF Available"}</h3>
              {book.pdf ? (
                <a href={book?.pdf} target="__blank">
                  PDF Download Here
                </a>
              ) : (
                ""
              )}
            </div>
            <div className="chat br" id="comments" ref={chatref}>
              <h3>
                <i className="fal fa-comment" style={{ color: "black" }}></i>{" "}
                Discussion ({comments?.length})
              </h3>
              <Postcomment
                userimg={userimg}
                sendMsg={sendMsg}
                msgstring={msgstring}
                setMsgstring={setMsgstring}
              />
              <div className="colreverse">{commentsrow}</div>
            </div>
          </div>

          <div className="spacer1"></div>
          <CSSTransition
            in={notifibool}
            timeout={300}
            unmountOnExit
            classNames="notification"
          >
            <Notification
              notification={notification}
              setNotifibool={setNotifibool}
              fixed={true}
            />
          </CSSTransition>
        </div>
      }
    />
  );
}
export default Bookpage;
