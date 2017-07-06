// External Dependencies
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

// Our Dependencies
import { config } from '../config';
import Route from './route';

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.middleware();
    this.api();
  }

  public static bootstrap(): Server {
    return new Server();
  }

  private config(): void {
    this.app.set('port', config.port);
    this.app.set('origin', config.origin);
  }

  private middleware(): void {
    this.app.use(cors())
    this.app.use(bodyParser.json());
    this.app.use(express.static('dist/public'))
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      const token: string = req.get('Authorization')
      if (token) {
        req.token = token;
        next();
      } else {
        res.status(403).send({
          error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
        });
      }
    });
  }

  private api(): void {
    const route = new Route();
    route.register(this.app);
  }
}