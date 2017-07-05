import * as clone from 'clone'
import { contacts } from '../data/contacts';

export default class Controller {

  public get(token: string) {
    let data = contacts[token];
    if (data === null) {
      data = contacts[token] = clone(contacts)
    }

    return data;
  }

  public add(token: string, contact: contact) {
    if (!contact.id) {
      contact.id = Math.random().toString(36).substr(-8)
    }
    this.get(token).contacts.push(contact)
    return contact
  }

  public update(contact) {
    const data = this.get('').contacts;
    const isPresent = !!data.find(c => c.id === contact.id)

    if(isPresent) {
      data.contacts = data.contacts.map(c => {
        if (c.id === contact.id) {
          return contact;
        }
        return c
      });
    }
    return data.contacts;
  }

  public remove(token, id)  {
    const data = this.get(token)
    const contact = data.contacts.find(c => c.id === id)

    if (contact) {
      data.contacts = data.contacts.filter(c => c !== contact)
    }
    return { 
      contact 
    }
  }
}