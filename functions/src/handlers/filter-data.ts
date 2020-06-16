import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export default async function filterData(
  req: functions.Request,
  res: functions.Response
): Promise<any> {
  const userId = req.query.userId as string;
  const db = admin.firestore();
  const data = await db
    .collection('people')
    .doc(userId)
    .collection('devs')
    .orderBy('name')
    .orderBy('githubHandle')
    .get();
  return res.status(200).send(data);
}
