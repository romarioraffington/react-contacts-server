import { Application, Request, Response } from 'express';
import Controller from './controller';

export default class Route {

  public register(app: Application) {

    const controller = new Controller();

    app.get('/', (req: Request, res: Response) => {
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

    app.get('/contacts', (req: any, res: Response) => {
      res.send(controller.get(req.token));
    });

    app.delete('/contacts/:id', (req: any, res: Response) => {
      res.send(controller.remove(req.token, req.params.id))
    })

    app.put('/contacts/:id',  (req: any, res: Response) => {
      res.send(controller.update(req.body))
    })

    app.post('/contacts', (req: any, res: Response) => {
      const { name, email } = req.body

      if (name && email) {
        res.send(controller.add(req.token, req.body))
      } else {
        res.status(403).send({
          error: 'Please provide both a name and email address'
        })
      }
    })

  }
} 