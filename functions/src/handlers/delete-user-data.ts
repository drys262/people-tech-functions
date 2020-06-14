import * as admin from 'firebase-admin';

export default async function deleteUserData(
  user: admin.auth.UserRecord,
): Promise<void> {
  const db = admin.firestore();
  const uid = user.uid;
  const batch = db.batch();
  const userRef = db.collection('users').doc(uid);
  const techRef = db.collection('tech').doc(uid);
  const peopleRef = db.collection('people').doc(uid);
  batch.delete(userRef);
  batch.delete(techRef);
  batch.delete(peopleRef);
  await batch
    .commit()
    .then(() => {
      console.log('Deleted data of user:', uid);
    })
    .catch(error => {
      console.error('Failed to delete data of user:', uid, 'Error:', error);
    });
}
