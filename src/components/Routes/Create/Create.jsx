import React, { useContext, useEffect, useState } from "react";
import { ContextApp } from "../../../ContextAPI";
import { db } from "../../../Fire";
import Labelinput from "../../Labelinput/Labelinput";
import "./Create.css";
import firebase from "firebase";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Notification from "../../Notification/Notification";
import Icon from "../../Icon/Icon";
import { AnimatePresence, motion } from "framer-motion";
import Motiondiv from "../Motiondiv";
import Switchdiv from "../../Switch/Switchdiv";
import Banner from "../../Banner/Banner";

function Create(props) {
  const { usersbooks } = props;
  const { setAdd, userispro } = useContext(ContextApp);
  const [flipped, setFlipped] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [publisher, setPublisher] = useState("");
  const [award, setAward] = useState("");
  const [cover, setCover] = useState("");
  const [pdf, setPdf] = useState("");
  const [genre, setGenre] = useState("");
  const [pro, setPro] = useState(false);
  const [isbn, setIsbn] = useState("");
  const [aboutauthor, setAboutauthor] = useState("");
  const { notification, setNotification, setNotifibool, notifibool } =
    useContext(ContextApp);
  const user = firebase.auth().currentUser;
  const options = ["Drama", "Fiction", "Mystery", "Romance"];
  const optionsrow =
    options &&
    options.map((option) => {
      return <option value={option}></option>;
    });
  const bookid = db.collection("books").doc().id;
  function createBook() {
    if (title && author) {
      const bookobj = {
        bookid,
        userid: user.uid,
        posted: new Date(),
        title,
        author,
        date,
        publisher,
        award,
        cover,
        pdf,
        genre: genre.toLowerCase(),
        likes: 0,
        creatorname: user.displayName,
        aboutauthor,
        likedby: [],
        pro,
        isbn,
      };
      db.collection("books")
        .doc(user.uid)
        .update({
          books: firebase.firestore.FieldValue.arrayUnion(bookobj),
        });
      db.collection("allbooks")
        .doc("allbooks")
        .update({
          books: firebase.firestore.FieldValue.arrayUnion(bookobj),
        });
      db.collection("comments").doc(bookid).set({
        replies: [],
      });
      setNotifibool(true);
      setNotification({
        text: "Book successefully added!",
        icon: "fal fa-check-circle",
      });
      setTitle("");
      setAuthor("");
      setDate("");
      setPublisher("");
      setAward("");
      setCover("");
      setPro(false);
      setAboutauthor("");
      setGenre("");
      setPdf("");
      setIsbn("");
      setTimeout(() => {
        setNotifibool(false);
      }, 4000);
    } else {
      setNotifibool(true);
      setNotification({
        text: "Fill out the Title and Author fields!",
        icon: "fal fa-exclamation-circle",
      });
      setTimeout(() => {
        setNotifibool(false);
      }, 4000);
    }
  }

  useEffect(() => {
    setAdd(false);
    setTimeout(() => {
      setFlipped(true);
    }, 600);
  }, []);
  return (
    <Motiondiv
      html={
        <>
          {!userispro && usersbooks && usersbooks.length < 50 ? (
            <Banner
              white={true}
              link="/pro#top"
              btn="Get Pro"
              text="Get pro to add more content!"
              title="Get Pro Now"
              banner="https://i.imgur.com/EPGteyo.jpg"
            />
          ) : (
            <>
              <h2 style={{ textAlign: "center" }}>Create Book</h2>
              <div
                className={
                  flipped ? "create box-shadow-br" : "create unflipped"
                }
              >
                <div
                  className={flipped ? "flipped flip-box left-br" : "flip-box"}
                >
                  <div className="flip-box-inner">
                    <div className="flip-box-front box-shadow-br">
                      <Icon
                        icon={"fal fa-arrow-right"}
                        setState={setFlipped}
                        set={true}
                      />
                      <div className="logo">
                        <small>{award ? award : "Book Award"}</small>
                        <h2>{title ? title : "Bookify"}</h2>
                        {cover ? (
                          <img src={cover} alt="" className="cover" />
                        ) : (
                          <img
                            className="mainlogo"
                            src="https://i.imgur.com/y5bNwaF.png"
                            alt=""
                          />
                        )}
                      </div>
                      <div>
                        <hr />
                        <p>{author ? author : "Author: Bookify"}</p>
                        <p>{publisher ? publisher : "Book Publisher"}</p>
                      </div>
                    </div>
                    <div className="flip-box-back left-br">
                      <i
                        className="fal fa-arrow-left"
                        onClick={() => setFlipped(false)}
                      ></i>
                      <h2>Details</h2>
                      <hr />
                      <div className="labels">
                        <Labelinput
                          text="Title"
                          setState={setTitle}
                          state={title}
                        />
                        <Labelinput
                          text="Author"
                          setState={setAuthor}
                          state={author}
                        />
                        <Labelinput
                          text="About Author"
                          setState={setAboutauthor}
                          state={aboutauthor}
                        />
                        <Labelinput
                          text="Publish Date"
                          date={true}
                          setState={setDate}
                          state={date}
                        />
                        <Labelinput
                          text="Publisher"
                          setState={setPublisher}
                          state={publisher}
                        />
                        <Labelinput
                          text="Awards (seperate by commas)"
                          setState={setAward}
                          state={award}
                        />
                        <Labelinput
                          text="Genres"
                          setState={setGenre}
                          state={genre}
                        />
                        <Labelinput
                          text="ISBN"
                          setState={setIsbn}
                          state={isbn}
                        />
                        <Labelinput
                          text="PDF Link"
                          setState={setPdf}
                          state={pdf}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <CSSTransition
                  in={notifibool}
                  timeout={300}
                  classNames="notification"
                  unmountOnExit
                >
                  <Notification
                    notification={notification}
                    setNotifibool={setNotifibool}
                  />
                </CSSTransition>
                <div
                  className={
                    flipped ? "right right-br box-shadow flex" : "right br"
                  }
                >
                  <Labelinput
                    text="Cover Image URL"
                    setState={setCover}
                    state={cover}
                  />
                  <small style={{ marginTop: "10px" }}>
                    {" "}
                    <Switchdiv
                      title={"Requires Pro:"}
                      state={pro}
                      setState={setPro}
                    />
                  </small>
                  <div className="image">
                    <img
                      src={cover}
                      onError={(e) =>
                        (e.target.src = "https://i.imgur.com/eabLbmq.jpg")
                      }
                      alt=""
                    />
                  </div>
                  <div className="buttoncontainer flex">
                    <button className="themeBtn" onClick={() => createBook()}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      }
    />
  );
}
export default Create;
