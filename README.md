# Node-Rest-Api-Authorization-JWT
* In a single word, JWT is an ***authorization*** mechanism. It has nothing to do with ***authentication***.
### JWT workflow
* Step 1: User make a request to login to a system prividing username and password.
* Step 2: JWT comes into picture at this point. Once a user is authenticated, server creates a token which is a json object.
Server signs this object by a secrete key which is only known to that server. After this digital signature, the token is sent back to the user.And this token is called ***JSON Web Token(JWT)***
* Step 3: Client saves this token either in local storage or in cookie.
* Step 4: For a subsequent request to the server, client needs to pass this token. And this is done via HTTP Header. Http header is a key-value pair. In this scenario, Key="Authorization" and value="Bearer[space]JWT".
* Step 5: A sample JWT looks like this:
  ` eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c ` 
  Ater receiving the JWT, server splits it into three parts. 
`hhhhhhhhhhh.ppppppppppp.sssssssssss`
Figures out the header and payload using Base64 encoder. Calculates the signature using the secrete key which is stored in server. If the calculated signature is matched with the third part which is signature, then server accepts it a valid JWT and permits the request for further operation on server.

### About the project:
* A user api for performing basic CRUD operation. 
* Password has been hashed using node.bcrypt.js library.
* jsonwebtoken library is used to achieve JWT mechanism.
* To perform every operation for a logged in user, checkToken(a method) has been applied to validate the jwt token of the request.

### How to run
* Clone the repository into your local machine
* Go to that directory and run "npm install" to install all the dependencies of package.json file.
* run npm start

### Postman:
* For login , Authorization is "No Auth". Just provide the payload.

![1](https://user-images.githubusercontent.com/36560845/81981330-f9760480-9651-11ea-8ec8-6581cc83cb88.png)

![2](https://user-images.githubusercontent.com/36560845/81981358-03980300-9652-11ea-8a5d-787a85cb2125.png)

* After successfull login, a token will be generated with response.

![3](https://user-images.githubusercontent.com/36560845/81981369-07c42080-9652-11ea-8d7e-b1f6369a0dd1.png)

* Copy the token.
* To get all the users, Go to Authorization -> Type: Bearer Token -> paste the token in the Token input box.

![4](https://user-images.githubusercontent.com/36560845/81981385-0bf03e00-9652-11ea-8579-efbcd9c9dad9.png)

* This token will have to be provided for every request.
