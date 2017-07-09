import Server from './modules/server';
import { Application } from 'express';

const app: Application = Server.bootstrap().app;
app.listen(app.get('port'), () => console.info(`🌎 Running at ${ app.get('origin') }`));
