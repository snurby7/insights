# Insights README

## Project Tooling

### Front-end

[react](https://reactjs.org/)<br>
[typescript](https://www.typescriptlang.org/)<br>
[material-ui](https://material-ui.com/)<br>
[dx-react-grid](https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/)<br>
[moment](https://momentjs.com/)<br>

### Up for removal

[Redux React](https://redux.js.org/basics/usage-with-react)<br>

### Backend Tooling

[MongoDB Compass](https://www.mongodb.com/download-center#compass)<br>
[express](https://expressjs.com/)<br>
[overnightjs](https://www.npmjs.com/package/@overnightjs/core)<br>

## How to run

### Running the UI

See `yarn start` down below

### Running the Server

- You will need to create folder called 'data' in the root directory
- Add a file to 'data' called user-config.js which looks something like

```js
exports.userConfigToken = '<YOUR TOKEN HERE>';
```

- You can find how to get a token from [here](https://api.youneedabudget.com/#getting-started)

- You will also need to have a MongoDB instance running somewhere. I used MongoDB Compass to visualize it all.
- I created a database called `ynab` and inside of that database I created the following collections
  - budgets
  - categories
  - accounts
  - payees
  - transactions
- Once you have this created you can go to the `admin page` and using your token it will sync down your data and store it in Mongo

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode and using `concurrently` it will live reload the server/UI.<br>
This will open [localhost:3000](http://localhost:3000) in the browser.<br>
Also spins up the Express Server at [localhost:5000](http://localhost:5000)<br>

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
