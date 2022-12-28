import React, { useEffect, useState } from "react";
import { db } from "../../../Fire";
import Motiondiv from "../Motiondiv";
import firebase from "firebase";
import Book from "../Book/Book";
import Booksrow from "../Booksrow";
function Favorites(props) {
  const { keyword, setKeyword } = props;
  const user = firebase.auth().currentUser;
  const [favorites, setFavorites] = useState([]);

  const favoritesrow =
    favorites &&
    favorites.map((favorite) => {
      return <Book book={favorite} favs={true} />;
    });
  useEffect(() => {
    db.collection("favorites")
      .doc(user.uid)
      .onSnapshot((snap) => {
        const favoritesdata = snap.data();
        setFavorites(favoritesdata?.favorites);
      });
  }, []);
  return (
    <Motiondiv
      html={
        <Booksrow
          title={"Saved"}
          keyword={keyword}
          setKeyword={setKeyword}
          booksrow={favoritesrow}
        />
      }
    />
  );
}
export default Favorites;
