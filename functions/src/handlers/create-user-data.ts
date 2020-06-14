import * as admin from "firebase-admin";

export default async function createUserData(
  user: admin.auth.UserRecord
): Promise<void> {
  console.log("on create user here", user);
  const db = admin.firestore();
  const batch = db.batch();
  const { uid, displayName, email, photoURL } = user;
  const userRef = db.collection("users").doc(uid);
  const techRef = db.collection("tech").doc(uid);
  const peopleRef = db.collection("people").doc(uid);

  batch.set(userRef, {
    userId: uid,
    displayName: displayName,
    email: email,
    photoUrl: photoURL,
    jsonString: JSON.stringify(user.toJSON()),
  });
  batch.set(techRef, {
    userId: uid,
  });
  batch.set(peopleRef, {
    userId: uid,
  });
  await batch
    .commit()
    .then(() => {
      console.log("Done adding data of user:", uid);
    })
    .catch((error) => {
      console.error("Failed to add data of user:", uid, "Error:", error);
    });
}
