import React, { useState, useEffect, useCallback, useContext } from "react";
import ReactTimeAgo from "react-time-ago";
import firebase from "firebase";
import Icon from "../../Icon/Icon";
import { CSSTransition } from "react-transition-group";
import { ContextApp } from "../../../ContextAPI";
import { db } from "../../../Fire";
import { notificationFunc } from "../Notification";
import TextareaAutosize from "react-textarea-autosize";

function Individreply(props) {
  const { reply, msgoptions, comments, book, replies, comment } = props;
  const [editmsgstring, setEditmsgstring] = useState(reply.msg);
  const [disabled, setDisabled] = useState(true);
  const [edited, setEdited] = useState(reply.edited);
  const [dropmenu, setDropmenu] = useState(false);
  const user = firebase.auth().currentUser;
  const [replybool, setReplybool] = useState(false);
  const [likesm, setLikesm] = useState(0);
  const { notifibool, setNotifibool, setNotification } = useContext(ContextApp);
  const [update, setUpdate] = useState(0);
  const [enabled, setEnabled] = useState(true);
  // let replyIndex = replies.indexOf(replym)
  // comments[0].replies[replyIndex].msg = editmsgstring
  // db.collection('comments').doc(book.bookid).update({
  //   replies: comments
  // })
  function saveMsg() {
    if (editmsgstring !== reply.msg) {
      comments &&
        comments.map((commentm) => {
          if (commentm.commentid === comment.commentid) {
            let commentIndex = comments.indexOf(commentm);
            replies?.map((replym) => {
              if (replym.commentid === reply.commentid) {
                let replyIndex = replies.indexOf(replym);
                comments[commentIndex].replies[replyIndex].msg = editmsgstring;
                comments[commentIndex].replies[replyIndex].edited = true;
                setEdited(true);
                db.collection("comments").doc(book.bookid).update({
                  replies: comments,
                });
              }
            });
          }
        });
    }
    setDisabled(true);
  }
  function optionEdit(type) {
    if (type.toLowerCase() === "edit") {
      setDisabled(!disabled);
      setDropmenu(false);
    } else if (type.toLowerCase() === "delete") {
      comments &&
        comments.map((commentm) => {
          if (commentm.commentid === comment.commentid) {
            let commentIndex = comments.indexOf(commentm);
            replies &&
              replies.map((replym) => {
                if (replym.commentid === reply.commentid) {
                  let replyIndex = replies.indexOf(replym);
                  comments[commentIndex].replies.splice(replyIndex, 1);
                  db.collection("comments").doc(book.bookid).update({
                    replies: comments,
                  });
                }
              });
          }
        });
    }
  }

  function likes() {
    comments &&
      comments.map((commentm) => {
        if (commentm.commentid === comment.commentid) {
          let commentIndex = comments.indexOf(commentm);
          replies &&
            replies.map((replym) => {
              if (replym.commentid === reply.commentid) {
                let replyIndex = replies.indexOf(replym);

                if (
                  comments[commentIndex].replies[replyIndex].likedby.includes(
                    user.uid
                  )
                ) {
                  const ind = comments[commentIndex].replies[
                    replyIndex
                  ].likedby.indexOf(user.uid);
                  comments[commentIndex].replies[replyIndex].likedby.splice(
                    ind,
                    1
                  );
                  setReplybool(false);
                  db.collection("comments").doc(book.bookid).update({
                    replies: comments,
                  });
                  setLikesm(
                    comments[commentIndex].replies[replyIndex].likedby.length
                  );
                  notificationFunc(
                    book,
                    user.uid,
                    "unliked your reply.",
                    "likecomment",
                    comment.commentid,
                    replym.senderid,
                    enabled
                  );
                } else {
                  let replyIndex = replies.indexOf(replym);
                  comments[commentIndex].replies[replyIndex].likedby.push(
                    user.uid
                  );
                  setReplybool(true);
                  db.collection("comments").doc(book.bookid).update({
                    replies: comments,
                  });
                  notificationFunc(
                    book,
                    user.uid,
                    "liked your reply.",
                    "likecomment",
                    comment.commentid,
                    replym.senderid,
                    enabled
                  );
                  setLikesm(
                    comments[commentIndex].replies[replyIndex].likedby.length
                  );
                }
              }
            });
        }
      });
    setUpdate((prev) => prev + 1);
    // if(reply.likedby.includes(user.uid)){
    //    reply.likedby.pop(user.uid)
    //   setUpdate(prev=>prev-1)
    // }  else {
    //     reply.likedby.push(user.uid)
    //     setUpdate(prev=>prev+1)
    //   }
    //   db.collection('comments').doc(book.bookid).update({
    //     replies: comments
    //   })
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      setDropmenu(false);
    });
    db.collection("users")
      .doc(reply.replyid)
      .onSnapshot((snap) => {
        setEnabled(snap.data()?.notifis);
      });
    comments &&
      comments.map((commentm) => {
        if (commentm.commentid === comment.commentid) {
          let commentIndex = comments.indexOf(commentm);
          replies &&
            replies.map((replym) => {
              if (replym.commentid === reply.commentid) {
                let replyIndex = replies.indexOf(replym);
                setLikesm(
                  comments[commentIndex].replies[replyIndex].likedby.length
                );
                if (
                  comments[commentIndex].replies[replyIndex].likedby.includes(
                    user.uid
                  )
                ) {
                  setReplybool(true);
                } else {
                  setReplybool(false);
                }
              }
            });
        }
      });
    // replies && replies.map(replym=>{
    //   if(replym.likedby.includes(user.uid)){
    //     if(replym.commentid===comment.commentid){
    //       setReplybool(true)
    //     }
    //   }else {
    //      if(replym.commentid===comment.commentid){
    //       setReplybool(false)
    //      }
    //     }
    // })
  }, []);

  return (
    <div className="comment" data-id={update}>
      <div className="leftcomment">
        <img src={reply.senderimg} alt="" />
      </div>
      <div className="rightcomment">
        <div className="indivicomment">
          <div className="userinfo">
            <div>
              <strong>{reply.sendername}</strong>
            </div>
            <div className="dot"></div>
            {typeof reply.sent.toDate !== "function" ? (
              ""
            ) : (
              <div className="small">
                <ReactTimeAgo date={reply.sent.toDate()} />
              </div>
            )}
            {edited ? (
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
                      className={replybool ? "fas fa-heart" : "fal fa-heart"}
                    ></i>
                    <span className="span">
                      {likesm} {likesm ? " Like" : " Likes"}
                    </span>
                  </button>
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
                {reply.senderid === user.uid ? (
                  msgoptions &&
                  msgoptions.map((opt) => {
                    if (opt.text !== "Hide")
                      return (
                        <div
                          className="menulink flexrow"
                          onClick={() => optionEdit(opt.text)}
                        >
                          <i className={opt.icon}></i>
                          <p>{opt.text}</p>
                        </div>
                      );
                  })
                ) : (
                  <div className="menulink flexrow">
                    <i className="fal fa-flag"></i>
                    <p>Report</p>
                  </div>
                )}
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Individreply;
