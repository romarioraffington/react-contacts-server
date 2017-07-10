import { Application, Request, Response } from 'express';
import Controller from './controller';

export default class Route {
  private controller; 

  constructor() {
   this.controller = new Controller();
  }

  public register(app: Application): void { 
    app.get('/', (req: Request, res: Response) => {
      const help = `
        <pre>
          Welcome to the Address Book API!

          Use an Authorization header to work with your own data:

          fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

          The following endpoints are available:

          GET /contacts
          PUT /contacts/:id { name, email, avatarURL }
          POST /contacts { name, email, avatarURL }
          DELETE /contacts/:id
        </pre>`

      res.send(help)
    });

    app.get('/contacts', (req: Request, res: Response) => {
      this.controller
        .getAll()
        .then(contacts => res.send(contacts));
    });

    app.put('/contacts/:id', (req: Request, res: Response) => {
      res.send(this.controller.update(req.params.id, req.body));
    });

    app.post('/contacts', (req: Request, res: Response) => {
      const { name, email } = req['body'];
      
      if (name && email) {
        this.controller.create(req['token'], req['body']).then(data => {
          const status = data.error ? 400 : 200;
          res.status(status).send(data);
        });
      } else {
        res.status(403).send({
          error: 'Please provide both a name and email address'
        })
      }
    });

    app.delete('/contacts/:id', (req: Request, res: Response) => {
      res.send(this.controller.delete(req.params.id))
    })
  }
} 