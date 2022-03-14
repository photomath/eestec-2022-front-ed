# EESTEC 2022 FrontEd personal-balance-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Disclaimer - this repo is meant to showcase a simple project containing client, server and database code using MERN stack built step-by-step for educational purpose only as a part of a lecture for EESTEC FrontEd 2022. It is in no way meant to be built for production nor is it ready for it.

Presentation slides can be found in [docs/mern_stack_in_action.pdf](docs/mern_stack_in_action.pdf)

## Setup

* `npm i` - installs all the packages listed in `package.json`
* [Install MongoDb Community edition](https://docs.mongodb.com/manual/administration/install-community/) following a guide for your host OS and start it up

## Available Scripts

* `npm run start` - spins up the frontend dev server at [http://localhost:3000](http://localhost:3000) which will auto-reload when source code affecting the client is changed
* `npm run test` - runs frontend tests
* `npm run listen` - spins up the backend server at [http://localhost:3080](http://localhost:3800) which will restart when source code affecting the server is changed

## Development

Preferred IDE for this project is [Visual Studio Code](https://code.visualstudio.com/) but any other IDE which supports TypeScript and React syntax should also suffice.

* Frontend code resides in `src/client` with an entrypoint in `src/index.ts` which `CRA` configured for us
* Backend code resides in `src/server` with an entrypoint in `src/server/index.ts`
* Code shared between client and server resides in `src/shared`

When developing backend in isolation from frontend (frontend side is either not complete for example), it is useful to somehow test developed endpoints. For this purpose tools like PostMan are usually used but in this case, a plain `curl` is more than enough:

For example - in order to sign up a new user, one could send a JSON payload to the signup URL as follows:
```sh
curl \
 -X POST http://localhost:3080/api/signup \
 -H 'Content-Type: application/json' \
 -d '{"email":"demo@demo.com","password":"demo","confirmPassword":"demo"}'
```
