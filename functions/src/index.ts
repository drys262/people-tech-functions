import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { deleteUserData, createUserData, filterData } from './handlers';

try {
  admin.initializeApp();
} catch (e) {}

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const onCreateUser = functions.auth
  .user()
  .onCreate(async (user: admin.auth.UserRecord) => {
    return createUserData(user);
  });

export const onDeleteUser = functions.auth
  .user()
  .onDelete((user: admin.auth.UserRecord) => {
    return deleteUserData(user);
  });

export const httpFilterData = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    const data = await filterData(req);
    console.log('data here 111', data);
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(data);
  }
);
