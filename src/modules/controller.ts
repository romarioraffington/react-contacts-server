import * as clone from 'clone'
import Firebase from './firebase';
import { contact } from './interface';

export default class Controller {
  private firebase;

  constructor() {
    this.firebase = new Firebase();
  }

  public getAll(): Promise<any> {
    return this.firebase.getAll();
  }

  public create(token, contact) {
    if (!contact.id) {
      contact.id = Math.random().toString(36).substr(-8)
    }
    this.firebase.create(contact);
  }

  public update(id, contact) {
    this.firebase.update(id, contact);
  }

  public delete(id) {
    this.firebase.delete(id);
  }
}