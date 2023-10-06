## Inked - Graphic Novel Management App

The Inked application's data storage is managed by Express.js and MongoDB on the back-end.

Displayed in the render url: https://inked-vsou.onrender.com

## Scripts:

:small_orange_diamond: Starting the application  
&nbsp;&nbsp;<span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">npm start</span>  
:small_orange_diamond: Building the application  
&nbsp;&nbsp;<span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">npm run build</span>  
:small_orange_diamond: Running tests  
&nbsp;&nbsp;<span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">npm run test</span>  
&nbsp;&nbsp;<span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">npm run test:coverage</span>

## API Endpoints

The following API endpoints are available:

:small_orange_diamond: **GET /comics** :arrow_right: Retrieves a list of graphic novels associated with the authenticated user.  
&nbsp;&nbsp;:green_circle: Status Code: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">200</span>  
&nbsp;&nbsp;:red_circle: Status Code: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">404</span> / Message: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">Can't retrieve the comics</span>

:small_orange_diamond: **GET /comics/:id** :arrow_right: Retrieves a graphic novel by id.  
&nbsp;&nbsp;:green_circle: Status Code: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">200</span>  
&nbsp;&nbsp;:red_circle: Status Code: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">500</span> / Message: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">Can't retrieve the comic</span>

:small_orange_diamond: **POST /comics** :arrow_right: Creates a new graphic novel entry with details provided in the request body.  
&nbsp;&nbsp;:green_circle: Status Code: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">201</span>  
&nbsp;&nbsp;:red_circle: Status Code: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">500</span> / Message: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">The comic couldn't be created</span>

:small_orange_diamond: **PATCH /comics/:id** :arrow_right: :arrow_right: Updates the isRead property of an existing graphic novel specified by its id. Through the request body, sends an object with the property isRead set to the value you want it to change to (true | false).  
&nbsp;&nbsp;:green_circle: Status Code: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">200</span>  
&nbsp;&nbsp;:red_circle: Status Code: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">304</span> / Message: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">The comic couldn't be modified</span>

:small_orange_diamond: **DELETE /comics/:id** :arrow_right: Deletes a graphic novel from the user's collection based on its id.  
&nbsp;&nbsp;:green_circle: Status Code: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">200</span>  
&nbsp;&nbsp;:red_circle: Status Code: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">500</span> / Message: <span style="background-color: #FFDDB6; padding: 2px 5px; border-radius: 4px;">The comic couldn't be deleted</span>

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
