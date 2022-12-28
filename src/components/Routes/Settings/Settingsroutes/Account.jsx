import React, { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../../../Fire";
import Settingslabel from "../Settingslabel";
import firebase from "firebase";
import Settingsbtn from "../Settingsbtn";
import Settings from "../Settings";
import { ContextApp } from "../../../../ContextAPI";
import Loadingel from "../../../Loadingelement/Loadingel";
import Motiondiv from "../../Motiondiv";
import { updateAllUsers } from "../../../UpdateAllUsers";
function Account(props) {
  const user = firebase.auth().currentUser;
  const [userdata, setUserdata] = useState("");
  const [hiddenmsgs, setHiddenmsgs] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [cover, setCover] = useState("");
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [defaultcover, setDefaultcover] = useState("");
  const {
    setNotifibool,
    setNotification,
    loader,
    setLoader,
    allusers,
    setAllusers,
  } = useContext(ContextApp);
  const [description, setDescription] = useState("");
  const [aboutcover, setAboutcover] = useState("");

  function setNotiFication(text, icon) {
    setNotifibool(true);
    setNotification({
      text: text,
      icon: icon,
    });
    setTimeout(() => {
      setNotifibool(false);
    }, 3500);
  }
  function updateProfile() {
    let userinfoobj = {
      age,
      city,
      country,
      cover,
      email,
      name,
      phone,
      description,
      aboutcover,
    };
    db.collection("users").doc(user.uid).update({
      userinfo: userinfoobj,
    });
    updateAllUsers(
      allusers,
      user,
      age,
      city,
      country,
      cover,
      email,
      name,
      phone,
      description,
      aboutcover
    );
    setNotiFication("Profile Updated!", "fal fa-check-circle");
    user.updateProfile({
      displayName: name,
    });
  }
  const loadingref = useRef();
  // console.log(cover);
  function uploadImg(e) {
    let file = e.target.files[0];
    const storageRef = firebase.storage().ref(`${user.uid}/${file.name}`);
    // console.log(Storage);
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
        setCover(
          `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${user.uid}%2F${file.name}?alt=media`
        );
        setUpload(!upload);
        setNotification({
          text: "Image Uploaded!",
          icon: "fal fa-check-circle",
        });
      }
    );
  }

  function saveImg() {
    updateProfile();
    setUpload(false);
  }
  function removeImg() {
    setCover(defaultcover);
    setUpload(false);
    setNotiFication("Image Removed!", "fal fa-check-circle");
  }
  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const userdata = snap.data();
        setName(userdata.userinfo.name);
        setEmail(userdata.userinfo.email);
        setPhone(userdata.userinfo.phone);
        setCountry(userdata.userinfo.country);
        setCity(userdata.userinfo.city);
        setAge(userdata.userinfo.age);
        setCover(userdata.userinfo.cover);
        setDefaultcover(userdata.userinfo.cover);
        setDescription(userdata.userinfo.description);
        setAboutcover(userdata.userinfo.aboutcover);
        setLoader(false);
      });
  }, []);

  return (
    <Motiondiv
      html={
        <div className="account">
          <div className="userdiv">
            <section className="first">
              <h2>Account</h2>
              <div className="userimg">
                <p>{name}</p>
                <Loadingel El="img" img={cover} size={30} loader={loader} />
                <p className="email flex">{user.email}</p>
              </div>
            </section>
            <div className="overflow">
              <section className="changeimg flex">
                <h3>Change Image</h3>
                <div className="userimg flexrow ac">
                  {loading ? (
                    <div className="fill">
                      <div className="fillbackground" ref={loadingref}></div>
                    </div>
                  ) : (
                    <Loadingel El="img" img={cover} size={50} loader={loader} />
                  )}
                  <div className="btns flexrow">
                    <div className="upload" style={{ position: "relative" }}>
                      {!upload ? (
                        <label>
                          <input
                            type="file"
                            className="uploadpic"
                            style={{ display: "none" }}
                            onChange={(e) => uploadImg(e)}
                          />
                          <p className="settingsbtn">
                            <span>Upload</span>{" "}
                            <i className="fal fa-upload"></i>
                          </p>
                        </label>
                      ) : (
                        <Settingsbtn
                          text="Remove"
                          icon="fal fa-trash"
                          clickEvnt={removeImg}
                        />
                      )}
                    </div>
                    <div className="savebtn">
                      <Settingsbtn
                        text="Save"
                        icon="fal fa-save"
                        clickEvnt={saveImg}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <h3>Account Details</h3>
              <section className="second">
                <Settingslabel
                  placeholder="Name"
                  value={name}
                  setValue={setName}
                />
                <Settingslabel
                  placeholder="Phone"
                  num={true}
                  value={phone}
                  setValue={setPhone}
                />
                <Settingslabel
                  placeholder="Country"
                  value={country}
                  setValue={setCountry}
                />
                <Settingslabel
                  placeholder="City"
                  value={city}
                  setValue={setCity}
                />
                <Settingslabel
                  placeholder="Age"
                  num={true}
                  value={age}
                  setValue={setAge}
                />
                <Settingslabel
                  placeholder="Description"
                  value={description}
                  setValue={setDescription}
                />
                <Settingslabel
                  placeholder="Secondary Cover"
                  value={aboutcover}
                  setValue={setAboutcover}
                />
                <label className="settingslabel">
                  <div className="image">
                    <img
                      src={aboutcover}
                      onError={(e) =>
                        (e.target.src = "https://i.imgur.com/ZmEcN9a.jpg")
                      }
                      alt=""
                    />
                  </div>
                </label>
                <div className="flex" style={{ justifyContent: "flex-end" }}>
                  <Settingsbtn
                    text="Save"
                    icon="fal fa-save"
                    clickEvnt={updateProfile}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      }
    />
  );
}
export default Account;
