import Server from './modules/server';

const app = Server.bootstrap().app;
app.listen(app.get('port'), () => console.info(`🌎 Running at ${ app.get('origin') }`));
