# React Contact List Server 

[![Build Status](https://travis-ci.org/romarioraffington/react-contacts-server.svg?branch=master)](https://travis-ci.org/romarioraffington/react-contacts-server)

This is a backend server for the [React Contact List](https://github.com/romarioraffington/react-contact-list)  project. The backend is written in [TypeScript](https://www.typescriptlang.org/) and the data is persisted with [Firebase](https://firebase.google.com/). 

View the live demo [here](#).

## Getting Set Up
1. Clone this repository
```shell
$ git clone https://github.com/romarioraffington/react-contacts-server.git
``` 

2. Add Firebase to the app. You can find the instructions [here](https://firebase.google.com/docs/admin/setup).

3. Create a `JSON` file ( call it `firebaseKey` ) and place it in `./src/config`. 

4. Paste the key generated in `step 2` in the `firebaseKey.json` file.

5. (Optional) Import the dataset provided in `./src/data` into the database.

## Running the App 
```shell
# npm start
$ yarn start 
```

## Running the App in Production
The `PROJECT_ID`, `CLIENT_EMAIL` and `PRIVATE_KEY` environment variables should be set. You can find this in the `firebaseKey.json` 

```shell
# npm run start:prod
$ yarn start:prod
```

This command will compile the typescript files and output the to the `dist` folder. The `config` and `public` folder will be copied over to the `dist` folder as well.
 
## Example of Data Structure
```javascript
{
  "contacts": {
    "khaled": {
      "id": "khaled",
      "avatarURL": "http://localhost:5001/images/khaled.jpg",
      "email": "khaled@wethebestmusic.com",
      "name": "DJ Khaled"
    },
    "mark": {
      "avatarURL": "http://localhost:5001/images/mark.jpg",
      "email": "thezucks@facebook.com",
      "id": "mark",
      "name": "Mark Zuckerberg"
    }
  }
}
```
## Contributing

I :heart: receiving pull requests! For specifics on how to contribute to this project, check out the [contributing file](CONTRIBUTING.md).
