import { map } from 'ramda';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export default async function filterData(req: functions.Request): Promise<any> {
  console.log(req.query);
  const userId = req.query.userId as string;
  const filter = (req.query.filter as 'desc' | 'asc') || 'asc';
  console.log('userId here 111');
  console.log('filter here', filter);
  const db = admin.firestore();
  const data = await db
    .collection('people')
    .doc(userId)
    .collection('devs')
    .orderBy('name', filter)
    .orderBy('githubHandle', filter)
    .get();

  return map((doc: FirebaseFirestore.DocumentData) => doc.data())(data.docs);
}
