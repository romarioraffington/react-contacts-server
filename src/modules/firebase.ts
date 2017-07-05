import * as firebase from 'firebase';
import { config } from '../config/firebase';
import { contact } from './interface';

export default class Firebase {
  public database;
  
  contructor() {
    firebase.initializeApp(config);
    this.database = firebase.database();
  }

  public saveContact(contact: contact) {
    firebase.database().ref(`contacts/${contact.id}`).set({
      name: contact.name,
      email: contact.email,
      avatarUrl: contact.avatarUrl,
    })
  }
}