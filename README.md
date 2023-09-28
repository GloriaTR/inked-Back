## Inked - Graphic Novel Management App

The back-end of the Inked application is built using Express.js and MongoDB to handle data storage.

## Technologies

- Express.js
- MongoDB
- JWT Authentication
- Typescript
- Mongoose
- Jest
- Supertest

:small_orange_diamond: Sonar testing validation metrics:
![sonarMetricsBack.png](https://media.discordapp.net/attachments/1145433728835923978/1154151161209815212/sonarMetricsBack.png?width=1341&height=662)

## Scripts:

- Set up server locally and build npm start: "node ."
- npm run build: "tsc",
- npm build:dev: "tsc -w",
- Test npm run test: "jest"
- npm run test:dev: "jest --watchAll"

## API Endpoints

The following API endpoints are available:

:small_orange_diamond: GET /comics:

- Retrieves a list of graphic novels associated with the authenticated user.

:small_orange_diamond: GET /comics/:id:

- Retrieves a graphic novel by id.

:small_orange_diamond: POST /comics:

- Creates a new graphic novel entry with details provided in the request body.

:small_orange_diamond: PATCH /comics/:id:

- Updates the isRead property of an existing graphic novel specified by its id.
- Through the request body, sends an object with the property isRead set to the value you want it to change to (true | false)

:small_orange_diamond: DELETE /comics/:id::

- Delete a graphic novel from the user's collection based on its id.

Displayed in the render url: https://inked-vsou.onrender.com
