import * as admin from 'firebase-admin';
import { config } from '../config';

const key = require('../config/firebaseKey.json'); 

export default class Firebase {
  private db;
  private contactsRef;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(key),
      databaseURL: config.db,
    });

    this.db = admin.database();
    this.contactsRef = this.db.ref('contacts');
  }

  public getAll(): Promise<any> {
    return this.contactsRef.once('value');
  }

  public create(contact) {
    this.db.ref(`contacts/${contact.id}`).set({ ...contact });
  }
  }
}