import * as clone from 'clone'
import * as _ from 'lodash';
import Firebase from './firebase';
import { config } from '../config';
import { contact } from './interface';

export default class Controller {
  private firebase;

  constructor() {
    this.firebase = new Firebase();
  }

  public async getAll(): Promise<contact[]> {
    const snap = await this.firebase.getAll();

    // Convert Object(s) returned from Firebase
    // into an Array
    return new Promise<contact[]>(resolve => { 
      const contacts: contact[] = [];
      _.forIn(snap.val(), (c: contact) => {
        contacts.push(c);
      });
      resolve(contacts);
    });
  }

  public create(token: string, contact: contact): Promise<any> {
    if (!contact.id) {
      contact.id = Math.random().toString(36).substr(-8);
    }
   return this.firebase.create(this.checkAvatarURL(contact));
  }

  public update(id: string, contact: contact): void {
    this.firebase.update(id, this.checkAvatarURL(contact));
  }

  public delete(id: string): void {
    this.firebase.delete(id);
  }

  private checkAvatarURL(contact: contact): contact {
    const avatars = ['bulbasaur.png', 'charmander.png', 'pikachu.png'];
    const randomNumber = Math.floor(Math.random() * 3);

    if (!contact.avatarURL) {
      contact.avatarURL = `${config.origin}/images/${avatars[randomNumber]}`;
    }
    return contact;
  }
}