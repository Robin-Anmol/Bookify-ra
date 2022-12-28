import React, { useContext, useState, useRef, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import Icon from "../../Icon/Icon";
import { addFavorites, removeFavorite } from "../Favorites";
import ReactTimeAgo from "react-time-ago";
import Settingslabel from "../Settings/Settingslabel";
import { db } from "../../../Fire";
import { ContextApp } from "../../../ContextAPI";
import firebase from "firebase";
import Morefilters from "../../Booksdisplay/Morefilters";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
import Switchdiv from "../../Switch/Switchdiv";
function Bookinfo(props) {
  const {
    book,
    books,
    hidelike,
    editable,
    userimg,
    userbookid,
    likes,
    setEdit,
    favorites,
    user,
    favorited,
    edit,
    hidebtns,
    allbooks,
  } = props;
  const [title, setTitle] = useState(book && book.title);
  const [author, setAuthor] = useState(book && book.author);
  const [aboutauthor, setAboutauthor] = useState(book && book.aboutauthor);
  const [award, setAward] = useState(book && book.award);
  const [publisher, setPublisher] = useState(book && book.publisher);
  const [genre, setGenre] = useState(book && book.genre);
  const [pdf, setPdf] = useState(book && book.pdf);
  const [pro, setPro] = useState(book.pro);
  const [cover, setCover] = useState(book && book.cover);
  const { setNotifibool, setNotification, allbooksdoc } =
    useContext(ContextApp);
  const [loading, setLoading] = useState(false);
  const [currentedit, setCurrentedit] = useState("");
  const [userispro, setUserispro] = useState(false);
  const [bookuser, setBookuser] = useState(book.userid);
  const [isbn, setIsbn] = useState(book?.isbn);
  function clearStates() {
    setGenre("");
    setPublisher("");
    setAward("");
    setPdf("");
    setAboutauthor("");
    setAuthor("");
    setCover("");
    setTitle("");
    setIsbn("");
    setPro(false);
  }
  function setStates() {
    setGenre(book?.genre);
    setPublisher(book?.publisher);
    setAward(book?.award);
    setPdf(book?.pdf);
    setAboutauthor(book?.aboutauthor);
    setAuthor(book?.author);
    setCover(book?.cover);
    setTitle(book?.title);
    setPro(book?.pro);
    setIsbn(book?.isbn);
  }
  function saveBook() {
    setEdit(!edit);

    allbooks?.map((bookm) => {
      if (book.bookid === bookm.bookid) {
        const bookindex = allbooks.indexOf(bookm);
        allbooks[bookindex].aboutauthor = aboutauthor;
        allbooks[bookindex].title = title;
        allbooks[bookindex].author = author;
        allbooks[bookindex].award = award;
        allbooks[bookindex].publisher = publisher;
        allbooks[bookindex].genre = genre;
        allbooks[bookindex].pdf = pdf;
        allbooks[bookindex].cover = cover;
        allbooks[bookindex].pro = pro;
        allbooks[bookindex].isbn = isbn;
        db.collection("allbooks").doc(allbooksdoc).update({
          books: allbooks,
        });
      }
    });
  }
  function deleteFunc() {
    let deletevar = window.confirm(
      `Are you sure you would like to delete ${book.title}?`
    );
    if (deletevar) {
      allbooks?.map((bookm) => {
        if (bookm.bookid === book.bookid) {
          let bookIndex = allbooks?.indexOf(bookm);
          allbooks?.splice(bookIndex, 1);
          db.collection("allbooks").doc("allbooks").update({
            books: allbooks,
          });
        }
      });
      removeFavorite(favorites, book, user);
      setEdit(false);
      clearStates();
    }
  }
  const loadingref = useRef();
  const fileref = useRef();
  function uploadImg(e) {
    const file = e.target.files[0];
    // let file = document.querySelector('.bookcover').files[0]
    if (file) {
      const storageRef = firebase.storage().ref(`${book.bookid}/${file.name}`);
      const task = storageRef.put(file);
      task.on(
        "state_changes",
        function progress(snap) {
          setLoading(true);
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          loadingref.current.style.height = percentage + "%";
        },
        function error() {
          setNotifibool(true);
          setNotification({
            text: "Try Again!",
            icon: "fal fa-exclamation-circle",
          });
        },
        function complete() {
          setLoading(false);
          console.log(storageRef.bucket, " hkd-", book.bookid);
          setCover(
            `https://firebasestorage.googleapis.com/v0/b/${storageRef?.bucket}/o/${book?.bookid}%2F${file?.name}?alt=media`
          );
          setNotification({
            text: "Image Uploaded!",
            icon: "fal fa-check-circle",
          });
        }
      );
    }
  }
  const editref = useRef();
  const history = useHistory();
  useEffect(() => {
    history.listen((location, action) => {
      setEdit(false);
    });
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        setUserispro(snap.data()?.pro);
      });
  }, [book]);
  return (
    <>
      <CSSTransition in={edit} classNames="test" unmountOnExit timeout={0}>
        <>
          <div className="screen"></div>
          <div className="book  box-shadow-br editbook" id={book.bookid}>
            <div className="bookLink">
              <label className="img">
                {loading ? (
                  <div className="fill">
                    <div className="fillbackground" ref={loadingref}></div>
                  </div>
                ) : (
                  ""
                )}
                <div className="editimgcover">
                  {loading ? "" : <Icon icon="fal fa-upload gridicondone" />}
                </div>
                <input
                  ref={fileref}
                  type="file"
                  className="bookcover"
                  style={{ display: "none" }}
                  onChange={(e) => uploadImg(e)}
                />
                <img
                  src={cover}
                  onError={(e) =>
                    (e.target.src =
                      "https://edit.org/images/cat/book-covers-big-2019101610.jpg")
                  }
                  alt=""
                />
              </label>
            </div>
            <div className="edit">
              {editable ? (
                <>
                  <Icon
                    icon="fal fa-times gridicondone"
                    setState={setEdit}
                    state={false}
                  />
                  <Icon icon="fal fa-save gridicondone" fnct={saveBook} />
                  <Icon icon="fal fa-trash gridicondone" fnct={deleteFunc} />
                </>
              ) : (
                ""
              )}
            </div>
            <div className="info flex">
              <div className="section1">
                <Settingslabel
                  placeholder="Title"
                  value={title}
                  setValue={setTitle}
                />
                <Settingslabel
                  placeholder="Author"
                  value={author}
                  setValue={setAuthor}
                />
              </div>
              <div className="midsection">
                <div className="inputscontainerbook">
                  <Settingslabel
                    placeholder="About Author"
                    value={aboutauthor}
                    setValue={setAboutauthor}
                  />
                  <Settingslabel
                    placeholder="Awards (Seperate with commas)"
                    value={award}
                    setValue={setAward}
                  />
                  <Settingslabel
                    placeholder="Publisher"
                    value={publisher}
                    setValue={setPublisher}
                  />
                  <Settingslabel
                    placeholder="Genre"
                    value={genre === "all" ? "" : genre}
                    setValue={setGenre}
                  />
                  <Settingslabel
                    placeholder="PDF"
                    value={pdf}
                    setValue={setPdf}
                  />
                  <Settingslabel
                    placeholder="ISBN"
                    value={isbn}
                    setValue={setIsbn}
                  />
                  <Settingslabel
                    placeholder="Cover Image"
                    value={cover}
                    setValue={setCover}
                  />
                  <div className="settingslabel switchpro">
                    <Switchdiv
                      title="Requires pro:"
                      state={pro}
                      setState={setPro}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </CSSTransition>
      <CSSTransition timeout={0} in={!edit} unmountOnExit>
        <div className="book  box-shadow-br" id={book && book.bookid}>
          <Link
            smooth
            to={
              book.pro && user.uid !== bookuser && !userispro
                ? "/premiumpost"
                : `/books/${book && book.bookid}#top`
            }
            className="bookLink"
          >
            {book.pro && <div className="protag">Premium</div>}

            <div className="img">
              <img
                src={book && book.cover}
                onError={(e) =>
                  (e.target.src =
                    "https://edit.org/images/cat/book-covers-big-2019101610.jpg")
                }
                alt=""
              />
            </div>
            <div className="gridtitlebook" style={{ textAlign: "center" }}>
              <strong className="textoverflow">{book && book.title}</strong>
              <span className="textoverflow">
                {"By: " + book && book.author}
              </span>
            </div>
          </Link>
          {props.removebm ? (
            ""
          ) : hidelike ? (
            <Icon
              icon="fa fa-bookmark"
              fnct={() => removeFavorite(favorites, book, user)}
            />
          ) : favorited ? (
            <Icon
              icon="fa fa-bookmark"
              fnct={() => removeFavorite(favorites, book, user)}
            />
          ) : (
            <Icon
              icon="fal fa-bookmark"
              fnct={() => addFavorites(book && book, user)}
            />
          )}
          <div className="edit" ref={editref}>
            {editable ? (
              <Icon
                stopprop={true}
                icon="fal fa-edit"
                setState={setEdit}
                set={!edit}
                setState2={setCurrentedit}
                state2={book?.bookid}
                fnct={setStates}
              />
            ) : (
              ""
            )}
          </div>
          <div className="info flex">
            <div className="section1">
              <h3>{book.title}</h3>
              <p>
                <strong>Author:</strong> <span>{book?.author}</span>
              </p>
              <hr />
            </div>
            <div className="midsection">
              <div>
                {book && book.award !== "" ? (
                  <p>
                    <strong>
                      {book && book.award.split(",").length === 1
                        ? book && book.award.split(",").length + " Award"
                        : book && book.award.split(",").length + " Awards"}{" "}
                    </strong>
                  </p>
                ) : (
                  <p>0 Awards</p>
                )}
                {book && book.award !== "" ? (
                  <div className="awards">
                    {book &&
                      book.award.split(",").map((award) => {
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
              <div className="buttoncont flexrow">
                {!hidebtns && (
                  <Link to={"/" + userbookid + "#top"} className="userlink">
                    <div className="profile">
                      <div className="userimg flex ac">
                        {userimg ? (
                          <img src={userimg} alt="" />
                        ) : (
                          <i className="fal fa-user"></i>
                        )}
                      </div>
                      <div className="infoBook flex">
                        <strong>{book?.creatorname}</strong>
                        <small>
                          <ReactTimeAgo date={book && book.posted.toDate()} />
                        </small>
                      </div>
                    </div>
                  </Link>
                )}
                <div className="flexrow">
                  {hidelike || hidebtns ? (
                    ""
                  ) : (
                    <button
                      className="likeButton bookbtn"
                      onClick={() => likes()}
                    >
                      <i
                        className={
                          book?.likedby.includes(user.uid)
                            ? "fa fa-heart"
                            : "fal fa-heart"
                        }
                      ></i>{" "}
                      {book?.likedby?.length}
                      {book?.likedby?.length === 1 ? " Like" : " Likes"}{" "}
                    </button>
                  )}
                  {!hidebtns && (
                    <Link smooth to={`/books/${book?.bookid}#comments`}>
                      {" "}
                      <button className="chatButton bookbtn">
                        <i className="fal fa-comment"></i> Comments
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
export default Bookinfo;
