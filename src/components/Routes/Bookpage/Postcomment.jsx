import React from "react";
import TextareaAutosize from "react-textarea-autosize";

function Postcomment(props) {
  const { userimg, sendMsg, msgstring, setMsgstring, reply } = props;

  function onEnter(e) {
    if (e.keyCode === 13) {
      sendMsg();
      e.preventDefault();
    }
  }

  return (
    <div className="comments">
      <div className="controls">
        <div className="flexrow textareaimg">
          <img
            src={userimg ? userimg : <i className="fal fa-user-circle"></i>}
            alt=""
          />
          <div>
            <TextareaAutosize
              name=""
              id=""
              placeholder="Write a comment..."
              value={msgstring}
              onChange={(e) => setMsgstring(e.target.value)}
              onKeyUp={(e) => onEnter(e)}
            />
            <button
              className="btn grayBtn"
              onClick={() => sendMsg()}
              disabled={!msgstring}
            >
              {reply ? "Reply" : "Comment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Postcomment;
