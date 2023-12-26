### Fazt Code - REST API with JWT and roles (auth & autho) & Mongodb

_the following project is based on a [tutorial video by Fazt Code about how to make a REST API with JWT and roles (auth & autho) & Mongodb](https://www.youtube.com/watch?v=lV7mxivGX_I&t=1042s&ab_channel=FaztCode)_

_the video is in spanish, notes written by me are in english_

**Keep in mind:** The project I've uploaded isn't 100% faithful to
that uploaded by [Fazt Code](https://www.youtube.com/@FaztCode). 
I didn't installed some of the modules suggested by them, and I've
translated some ES6 code they've used in the original project to
ES5 code, just to make things simpler for me. The files 
arrangement I've choosen isn't the same as that of the original;
some files and directories are omitted, and some files have been
merged together. Again, just for the sake of my commodity.

modules installed: 
    * Express
    * Bcryptjs ---> to encrypt information
    * Cors ---> to comunicate this backend with other servers 
    * dotenv ---> environment variables 
    * jsonwebtoken ---> to generate tokens
    * mongoose ---> to connect with a database
    * morgan ---> see requests and responses that come and go
    * helmet ---> additional security characteristics (for example, so 
the server does not give away that much information)

inside src 
    * libs ---> re-usable code
    * middlewares ---> express middleware  
    * models ---> data models
    * routes ---> some of our server routes