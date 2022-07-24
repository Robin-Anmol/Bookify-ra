import { db } from "../Fire"

export function updateAllUsers(allusers, user, age, city, country, cover, email, name, phone, description, aboutcover){
  allusers && allusers.map(userm=>{
    if(userm.uid===user.uid){
      const userindex = allusers.indexOf(userm)
      allusers[userindex].age=age
      allusers[userindex].city=city
      allusers[userindex].country=country
      allusers[userindex].cover=cover
      allusers[userindex].email=email
      allusers[userindex].name=name
      allusers[userindex].phone=phone
      allusers[userindex].description = description
      allusers[userindex].aboutcover = aboutcover
      db.collection('allusers').doc('allusers').update({
        users: allusers
      })
    }
  })
}