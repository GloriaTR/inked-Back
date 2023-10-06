## Inked - Graphic Novel Management App

The Inked application's data storage is managed by Express.js and MongoDB on the back-end.

Displayed in the render url: https://inked-vsou.onrender.com

## Scripts:

:small_orange_diamond: Starting the application: `npm start`  
:small_orange_diamond: Building the application: `npm run build`  
:small_orange_diamond: Running tests: `npm run test` / `npm run test:coverage`

## API Endpoints

The following API endpoints are available:

**GET /comics** :arrow_right: Retrieves a list of graphic novels associated with the authenticated user.  
&nbsp;&nbsp;:green_circle: Status Code: `200`  
&nbsp;&nbsp;:red_circle: Status Code: `404` / Message: `Can't retrieve the comics`

**GET /comics/:id** :arrow_right: Retrieves a graphic novel by id.  
&nbsp;&nbsp;:green_circle: Status Code: `200`  
&nbsp;&nbsp;:red_circle: Status Code: `500` / Message: `Can't retrieve the comic`

**POST /comics** :arrow_right: Creates a new graphic novel entry with details provided in the request body.  
&nbsp;&nbsp;:green_circle: Status Code: `201`  
&nbsp;&nbsp;:red_circle: Status Code: `500` / Message: `The comic couldn't be created`

**PATCH /comics/:id** :arrow_right: :arrow_right: Updates the isRead property of an existing graphic novel specified by its id. Through the request body, sends an object with the property isRead set to the value you want it to change to (true | false).  
&nbsp;&nbsp;:green_circle: Status Code: `200`  
&nbsp;&nbsp;:red_circle: Status Code: `304` / Message: `The comic couldn't be modified`

**DELETE /comics/:id** :arrow_right: Deletes a graphic novel from the user's collection based on its id.  
&nbsp;&nbsp;:green_circle: Status Code: `200`
&nbsp;&nbsp;:red_circle: Status Code: `500` / Message: `The comic couldn't be deleted`

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
