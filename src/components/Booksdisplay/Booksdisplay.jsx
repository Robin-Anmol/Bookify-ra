import React, { useEffect, useState, useContext, useRef } from "react";
import { db } from "../../Fire";
import Book from "../Routes/Book/Book";
import "./Booksdisplay.css";
import Label from "./Label";
import { AnimatePresence, motion } from "framer-motion";
import Motiondiv from "../Routes/Motiondiv";
import Filtericons from "../Routes/Filtericons";
import { ContextApp } from "../../ContextAPI";
import firebase from "firebase";
import { Link } from "react-router-dom";
import Defaultmsg from "./Defaultmsg";
import Loadingel from "../Loadingelement/Loadingel";
import { CSSTransition } from "react-transition-group";
import Morefilters from "./Morefilters";
import Banner from "../Banner/Banner";
import Limitbtn from "../Limitbtn/Limitbtn";
function Booksdisplay(props) {
  const { loader } = useContext(ContextApp);
  const [nobooksmsg, setNobooksmsg] = useState(false);
  const {
    favorites,
    setFavorites,
    keyword,
    setKeyword,
    books,
    saved,
    editable,
    hidelike,
    userimgbool,
    banner,
    allbooks,
    carousel,
  } = props;
  const pattern = new RegExp(
    "\\b" + keyword.replace(/[^a-zA-Z0-9 ]/g, ""),
    "i"
  );
  const { favoritesbool, setFavoritesbool, setMorefilters } =
    useContext(ContextApp);
  const [gridview, setGridview] = useState(false);
  const [limit, setLimit] = useState(40);
  const user = firebase.auth().currentUser;
  // const booksrow = books && books.map(book=>{
  //   if(pattern.test('all')||pattern.test(book.genre.toLowerCase())||pattern.test(book.title.toLowerCase())||pattern.test(book.author.toLowerCase())){
  //     return <Book  book={book} books={books}/>
  //   }
  // })
  // const favoritesrow = favorites && favorites.map(book=>{
  //   if(pattern.test(book.genre.toLowerCase())||pattern.test(book.title.toLowerCase())||pattern.test(book.author.toLowerCase())|| keyword==='saved'){
  //   return <Book hidelike={hidelike} editable={editable} book={book} books={books}/>
  //   }
  // })
  const filteredfavs = favorites
    ?.filter(
      (book) =>
        pattern.test(book?.title) ||
        pattern.test(book?.author) ||
        keyword.toLowerCase() === "all" ||
        pattern.test(book?.genre) ||
        pattern.test(book?.isbn)
    )
    .map((book) => (
      <Book book={book} allbooks={allbooks} books={books} hidelike={hidelike} />
    ));
  const favsRow = filteredfavs?.length ? (
    filteredfavs.splice(0, limit)
  ) : (
    <Defaultmsg
      link="/create"
      text="Nothing here, create your book here!"
      icon="fal fa-layer-plus"
    />
  );
  const filtered = books
    ?.filter(
      (book) =>
        pattern.test(book.title) ||
        pattern.test(book.author) ||
        keyword.toLowerCase() === "all" ||
        pattern.test(book.genre) ||
        pattern.test(book.isbn)
    )
    .map((book) => (
      <Book allbooks={allbooks} book={book} books={books} editable={editable} />
    ));
  const booksRow = filtered?.length ? (
    filtered?.splice(0, limit)
  ) : (
    <Defaultmsg
      link="/create"
      text="Nothing here, create your book here!"
      icon="fal fa-layer-plus"
    />
  );

  function updateGrid() {
    db.collection("users").doc(user.uid).update({
      grid: !gridview,
    });
  }
  function determineBtns() {
    if (favoritesbool) {
      if (limit < filteredfavs?.length) {
        return <Limitbtn text="View More" setLimit={setLimit} limit={limit} />;
      }
    } else {
      if (limit < filtered?.length) {
        return <Limitbtn text="View More" setLimit={setLimit} limit={limit} />;
      }
    }
  }
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        setGridview(snap.data()?.grid);
      });
  }, []);

  useEffect(() => {
    if (keyword === "") {
      setFavoritesbool(false);
    }
  }, [keyword]);
  return (
    <>
      <Banner
        carousel={carousel}
        banner={banner}
        link="/create"
        btn="Create Book"
        text={
          "The magic of the internet is here! Easily manage your favorite books with bookify. You can even create your own collection of books!"
        }
        title={"Build your Library"}
      />
      <div className={gridview ? "booksdisplay gridbooks" : "booksdisplay"}>
        <div className="mediafilters flexrow">
          <Filtericons state2={false} />
          {saved ? (
            <Label
              icon="fal fa-bookmark"
              text="Saved"
              keyword={keyword}
              setKeyword={setKeyword}
              state2={true}
            />
          ) : (
            ""
          )}
          <Label icon="fad fa-th" text="Grid View" fnct={updateGrid} />
          <Label icon="fal fa-plus" text="More" setMore={setMorefilters} />
        </div>
        <Loadingel
          El="div"
          size="100"
          classNames="trendingbooks"
          info={favoritesbool ? favsRow : booksRow}
          loader={loader}
        />
        {determineBtns()}
        <div className="spacer1"></div>
      </div>
    </>
  );
}
export default Booksdisplay;
