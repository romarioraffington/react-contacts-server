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
    return new Promise<contact[]>((resolve) => { 
      const contacts: contact[] = [];
      _.forIn(snap.val(), (c: contact, id: string) => {
        contacts.push(c);
      });
      resolve(contacts);
    });
  }

  public create(token: string, contact: contact): void {
    if (!contact.id) {
      contact.id = Math.random().toString(36).substr(-8)
    }
    this.firebase.create(this.checkAvatarUrl(contact));
  }

  public update(id: string, contact: contact): void {
    this.firebase.update(id, this.checkAvatarUrl(contact));
  }

  public delete(id: string): void {
    this.firebase.delete(id);
  }

  private checkAvatarUrl(contact: contact): contact {
    const avatars = ['bulbasaur.png', 'charmander.png', 'pikachu.png'];
    const randomNumber = Math.floor(Math.random() * 3)

    if (!contact.avatarUrl) {
      contact.avatarUrl = `${config.origin}/${avatars[randomNumber]}`;
    }
    return contact;
  }
}