import { db } from "../../Fire"
import firebase from 'firebase'
  function addFavorites(book, user){
  db.collection('favorites').doc(user.uid).update({
      favorites: firebase.firestore.FieldValue.arrayUnion(book)
  })
}
  function removeFavorite(favorites, book, user){
  favorites && favorites.map(favorite=>{
    if(favorite.bookid===book.bookid){
      let favoriteIndex = favorites.indexOf(favorite)
      favorites.splice(favoriteIndex, 1) 
      db.collection('favorites').doc(user.uid).update({
        favorites: favorites
      })
    }
  })
}

export {
  addFavorites,
  removeFavorite
}