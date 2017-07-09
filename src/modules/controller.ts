import * as clone from 'clone'
import Firebase from './firebase';
import { config } from '../config';
import { contact } from './interface';

export default class Controller {
  private firebase;

  constructor() {
    this.firebase = new Firebase();
  }

  public getAll(): Promise<any> {
    return this.firebase.getAll();
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