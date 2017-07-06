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

  // public update(contact) {
  //   const data = this.get('').contacts;
  //   const isPresent = !!data.find(c => c.id === contact.id)

  //   if(isPresent) {
  //     data.contacts = data.contacts.map(c => {
  //       if (c.id === contact.id) {
  //         return contact;
  //       }
  //       return c
  //     });
  //   }
  //   return data.contacts;
  // }

  // public remove(token, id)  {
  //   const data = this.get(token)
  //   const contact = data.contacts.find(c => c.id === id)

  //   if (contact) {
  //     data.contacts = data.contacts.filter(c => c !== contact)
  //   }
  //   return { 
  //     contact 
  //   }
  // }
}