export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5001,
  origin: process.env.ORIGIN || 'http://localhost:5001',
  db: {
    url: process.env.DB_URL || 'https://react-contact-list-aca62.firebaseio.com',

    // Only needed when running the app from the ./dist folder (e.g production)
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
  }
}