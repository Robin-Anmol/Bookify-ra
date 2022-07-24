import React, { useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Icon from "../../Icon/Icon";
import ReactTimeAgo from "react-time-ago";
import firebase from "firebase";
import Postcomment from "./Postcomment";
import { db } from "../../../Fire";
import Individreply from "./Individreply";
import optionEdit from "./Optionedit";
import { ContextApp } from "../../../ContextAPI";
import { notificationFunc } from "../Notification";
import TextareaAutosize from "react-textarea-autosize";

function Individcomment(props) {
  const user = firebase.auth().currentUser;
  const {
    comments,
    comment,
    editmsgstring,
    disabled,
    setDisabled,
    likes,
    setEditmsgstring,
    saveMsg,
    liked,
    dropmenu,
    setDropmenu,
    msgoptions,
    userimg,
    book,
  } = props;
  const [reply, setReply] = useState(false);
  const [replies, setReplies] = useState(comment.replies);
  const [replymsgstring, setReplymsgstring] = useState("");
  const id = db.collection("comments").doc().id;
  const { setNotifibool, setNotification } = useContext(ContextApp);
  const [enabled, setEnabled] = useState(true);
  const repliesrow = replies?.map((repl) => {
    return (
      <Individreply
        replies={replies}
        reply={repl}
        msgoptions={msgoptions}
        book={book}
        comments={comments}
        comment={comment}
      />
    );
  });
  const [hidereplies, setHidereplies] = useState(true);
  function sendMsg() {
    comments?.map((commentm) => {
      if (commentm.commentid === comment.commentid) {
        let commentIndex = comments.indexOf(commentm);
        let msgobj = {
          senderid: user.uid,
          senderimg: userimg,
          msg: replymsgstring,
          sent: new Date(),
          likes: 0,
          sendername: user.displayName,
          commentid: id,
          edited: false,
          likedby: [],
          hide: false,
          replyid: comment.senderid,
        };
        comments[commentIndex].replies.push(msgobj);
        db.collection("comments").doc(book.bookid).update({
          replies: comments,
        });
        notificationFunc(
          book,
          user.uid,
          "replied to your comment.",
          "replycomment",
          comment.commentid,
          commentm.senderid,
          enabled
        );

        // setReplies(prev=>[...prev, {msgobj}])
        setReply(false);
        setReplymsgstring("");
      }
    });
  }

  useEffect(() => {
    setReplies(comment.replies);
    db.collection("users")
      .doc(comment.senderid)
      .onSnapshot((snap) => {
        setEnabled(snap.data()?.notifis);
      });
  }, [comment]);
  return (
    <div className="comment" id={comment.commentid}>
      <div className="leftcomment">
        <img src={comment.senderimg} alt="" />
      </div>
      <div className="rightcomment">
        <div className="indivicomment">
          <div className="userinfo">
            <div>
              <strong>{comment.sendername}</strong>
            </div>
            <div className="dot"></div>
            <div className="small">
              <ReactTimeAgo date={comment.sent.toDate()} />
            </div>
            {comment.edited ? (
              <>
                <div className="dot"></div>
                <div className="small">Edited</div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="textarea-btns">
            <TextareaAutosize
              value={editmsgstring}
              onChange={(e) => setEditmsgstring(e.target.value)}
              disabled={disabled}
            />
            <div className="btns">
              {disabled ? (
                <>
                  <button className="grayBtn" onClick={() => likes()}>
                    <i
                      className={
                        comment && comment.likedby.includes(user.uid)
                          ? "fas fa-heart"
                          : "fal fa-heart"
                      }
                    ></i>
                    <span className="span">
                      {comment.likedby.length}{" "}
                      {comment.likedby.length === 1 ? " Like" : " Likes"}
                    </span>
                  </button>
                  <button
                    className="grayBtn"
                    onClick={() => {
                      setHidereplies(!hidereplies);
                      setReply(true);
                    }}
                  >
                    <i className="fal fa-comment-dots"></i>
                    <span className="span">
                      {replies.length}{" "}
                      {replies.length === 1 ? " Reply" : "Replies"}{" "}
                    </span>
                  </button>
                  {hidereplies ? (
                    ""
                  ) : (
                    <button
                      className="grayBtn"
                      onClick={() => setReply(!reply)}
                    >
                      <i
                        className={
                          reply ? "fal fa-comment-slash" : "fal fa-comment"
                        }
                      ></i>
                      <span className="span">
                        {reply ? "Dismiss" : "Reply"}
                      </span>
                    </button>
                  )}
                </>
              ) : (
                <button className="grayBtn" onClick={() => saveMsg()}>
                  <i className="fal fa-save"></i>
                </button>
              )}
            </div>
          </div>
          <div className="commentoptions">
            <Icon
              icon="fal fa-ellipsis-h"
              setState={setDropmenu}
              set={!dropmenu}
              stopprop={true}
            />
            <CSSTransition
              in={dropmenu}
              unmountOnExit
              timeout={300}
              classNames="menu"
            >
              <div
                className="menu box-shadow-br"
                onClick={(e) => e.stopPropagation()}
              >
                <h4>Configure</h4>
                {comment.senderid === user.uid ? (
                  msgoptions &&
                  msgoptions.map((opt) => {
                    return (
                      <div
                        className="menulink flexrow"
                        onClick={() =>
                          optionEdit(
                            opt.text,
                            setDisabled,
                            setDropmenu,
                            comments,
                            disabled,
                            comment,
                            setNotifibool,
                            setNotification,
                            book,
                            user
                          )
                        }
                      >
                        <i className={opt.icon}></i>
                        <p>{opt.text}</p>
                      </div>
                    );
                  })
                ) : (
                  <div
                    className="menulink flexrow"
                    onClick={() =>
                      optionEdit(
                        "report",
                        setDisabled,
                        setDropmenu,
                        comments,
                        disabled,
                        comment,
                        setNotifibool,
                        setNotification,
                        book,
                        user
                      )
                    }
                  >
                    <i className="fal fa-flag"></i>
                    <p>Report</p>
                  </div>
                )}
              </div>
            </CSSTransition>
          </div>
        </div>
        {hidereplies ? (
          ""
        ) : (
          <div className="repliedcomment">
            {repliesrow}
            {reply ? (
              <Postcomment
                userimg={userimg}
                reply={true}
                msgstring={replymsgstring}
                setMsgstring={setReplymsgstring}
                sendMsg={sendMsg}
              />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Individcomment;
