import { Application, Request, Response } from 'express';
import Controller from './controller';

export default class Route {
  private controller; 

  constructor() {
   this.controller = new Controller();
  }

  public register(app: Application) { 
    app.get('/', (req, res) => {
      const help = `
        <pre>
          Welcome to the Address Book API!

          Use an Authorization header to work with your own data:

          fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

          The following endpoints are available:

          GET /contacts
          DELETE /contacts/:id
          PUT /contacts/:id { name, email, avatarURL }
          POST /contacts { name, email, avatarURL }
        </pre>`

      res.send(help)
    });

    app.get('/contacts', (req, res) => {
      this.controller
        .getAll()
        .then(snap => res.send(snap.val()));
    });

    app.put('/contacts/:id', (req, res) => {
      res.send(this.controller.update(req.params.id, req.body));
    });

    app.post('/contacts', (req: any, res) => {
      const { name, email } = req.body;
      
      if (name && email) {
        res.send(this.controller.create(req.token, req.body))
      } else {
        res.status(403).send({
          error: 'Please provide both a name and email address'
        })
      }
    });

    app.delete('/contacts/:id', (req, res) => {
      res.send(this.controller.delete(req.params.id))
    })
  }
} 