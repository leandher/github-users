<h1 align="center">
    <img alt="Github repos" src="https://i.pinimg.com/originals/dc/1a/1a/dc1a1a4287f57e4a80ea5ecfd912ee96.png" />
    <br>
    React + Node - GitHub repositories
</h1>

<h4 align="center">
  App that should list users and repositories from GitHub, using <a href="https://developer.github.com/v3/">GitHub APIs</a>.
</h4>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#white_check_mark-live-demo">Live Demo</a>
</p>

## :rocket: Technologies

### :fire: Frontend

This project was developed with the following technologies:

-  [ReactJS](https://reactjs.org/)
-  [React Router v5](https://github.com/ReactTraining/react-router)
-  [React Icons](https://react-icons.github.io/react-icons/)
-  [React Table](https://github.com/tannerlinsley/react-table)
-  [React Toastify](https://fkhadra.github.io/react-toastify/)
-  [Typescript](https://www.typescriptlang.org/)
-  [Axios](https://github.com/axios/axios)
-  [Material UI](https://material-ui.com/)
-  [VS Code][vc] with [ESLint][vceslint]

### :zap: Backend

This project was developed with the following technologies:
-  [Node.js][nodejs]
-  [Express](https://expressjs.com/)
-  [nodemon](https://github.com/remy/nodemon)
-  [Sucrase](https://github.com/alangpierce/sucrase)
-  [Typescript](https://www.typescriptlang.org/)
-  [Axios](https://github.com/axios/axios)
-  [Jest](https://jestjs.io/)
-  [parse-link-header](https://github.com/thlorenz/parse-link-header)
-  [VS Code][vc] with [ESLint][vceslint]

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.16][nodejs] or higher + [Yarn v1.13][yarn] or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/leandher/github-users.git

# Go into the repository
$ cd github-users

# Go into Backend
cd Backend

# Install dependencies
$ yarn install

# Run the app 
$ yarn dev

# Run tests
$ yarn test

# On a new terminal window, go into frontend
$ cd frontend

# Install dependencies
$ yarn install

# Run the app
$ yarn start
```

## :white_check_mark: Live Demo

Frontend: https://repositories-git-app.web.app/

Backend: https://github-users-list-repos.herokuapp.com/
  
  - Endpoints:
    - **GET - /api/users?since={number}**

      This endpoint returns a list of GitHub users and the link for the next page.

    - **GET - /api/users/:username/details**

      This endpoint returns the details of a GitHub user.

    - **GET - /api/users/:username/repos**

      This endpoint returns a list with all user repositories
---

Made by Leandher Bessa [Get in touch!](https://www.linkedin.com/in/leandher-bessa-65303b128)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint