import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { deleteUserData, createUserData } from "./handlers";

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
