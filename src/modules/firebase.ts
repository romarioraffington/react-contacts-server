import * as admin from 'firebase-admin';
import { config } from '../config';

export default class Firebase {
  private db;
  private contactsRef;

  constructor() {
    if (config.env !== 'development') {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: config.db.projectId,
          clientEmail: config.db.clientEmail,
          privateKey: JSON.parse(config.db.privateKey),
        }),
        databaseURL: config.db.url,
      });
    } else {
      admin.initializeApp({
        credential: admin.credential.cert( require('../config/firebaseKey.json')),
        databaseURL: config.db.url,
      });
    }

    this.db = admin.database();
    this.contactsRef = this.db.ref('contacts');
  }

  public getAll(): Promise<any> {
    return this.contactsRef.once('value');
  }

  public create(contact): Promise<any> {
    return new Promise<any>(resolve => {
      const data = {
        contact: contact,
        error: {},
      }
      this.db.ref(`contacts/${contact.id}`).set({ ...contact }, error => {
        data.error = error;
        resolve(data);
      });
    });
  }

  public update(id, contact): Promise<any> {
    return new Promise<any>(resolve => {
      const data = {
        contact: contact,
        error: {},
      }
      this.db.ref(`contacts/${id}`).update({ ...contact }, error => {
        data.error = error;
        resolve(data);
      });
    })
  }

  public delete(id) {
    return this.db.ref(`contacts/${id}`).remove();
  }
}