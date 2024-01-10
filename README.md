<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the database
```bash
# list all containers
$ docker ps -a

# stop container
$ docker stop "container id"

# remove container
$ docker rm "container id"

# run postgresql in docker
$ docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

### Steps to recreate this project

#### Install npm packages

```
[x] nest --version
```

if nest is not installed then...

```
[x] npm i -g @nestjs/cli
```

If nest is installed...

```
[x] nest new projectname
[x] npm i pg typeorm @nestjs/typeorm @nestjs/config
[x] npm start
```

go to http://localhost:3000 to see "Hello World!" and stop the server

#### Create files & folders
create module, controller and service for users
```
[x] nest g module users
[x] nest g controller users
[x] nest g service users
[x] in powershell type > New-Item ./src/users/user.entity.ts
```

### 1) user.entity.ts >
- [x] create an Entity User class with primary id, name, email columns.

### 2) app.service.ts >
1. [x] import the Injectable decorator from the @nestjs/common module and the InjectRepository decorator from the @nestjs/typeorm module. Import the Repository class from the typeorm module and the User entity from a separate file ( user.entity ).

2. [x] The UsersService class is defined and marked with the @Injectable() decorator, indicating that it can be injected with dependencies.

3. [x] The constructor of the UsersService class is defined, and it takes a single parameter named usersRepository of type Repository<'User'> . The @InjectRepository(User) decorator is applied to this parameter, indicating that it should be injected with the User repository.

4. [x] The UsersService class contains several asynchronous methods:
   - [x] findAll() : This method returns a promise that resolves to an array of User objects. It uses the injected usersRepository to retrieve all users from the database.
   - [x] findOne(id: number) : This method takes an id parameter and returns a promise that resolves to a single User object. It uses the injected usersRepository to find a user with the specified id from the database.
   - [x] create(user: User) : This method takes a user parameter of type User and returns a promise that resolves to a newly created User object. It uses the injected usersRepository to create a new user in the database.
   - [x] update(id: number, user: User) : This method takes an id parameter and a user parameter of type User . It returns a promise that resolves to an updated User object. It uses the injected usersRepository to update the user with the specified id in the database.
   - [x] delete(id: number) : This method takes an id parameter and returns a promise that resolves to void . It uses the injected usersRepository to delete the user with the specified id from the database.

### 3) app.controller.ts >
1. [x] Import decorators and classes from the @nestjs/common module, including Controller , Get , Post , Body , Param , Delete , and Put . Import the UsersService class from a separate file and the User entity.

2. [x] The UsersController class is defined and marked with the @Controller('users') decorator. This decorator sets the base route path for the controller to /users .

3. [x] The constructor of the UsersController class takes a single parameter named usersService of type UsersService . This parameter is automatically injected by NestJS because of the private readonly modifier.

4. [x] The UsersController class contains several methods, each representing a specific API endpoint:

   - [x] findAll() : This method is decorated with @Get() , indicating that it handles HTTP GET requests to the /users route. It returns a promise that resolves to an array of User objects by calling the findall() method of the injected usersService .
   - [x] findOne(id: number) : This method is decorated with @Get(':id') , indicating that it handles HTTP GET requests to the /users/:id route. It takes an id parameter from the request URL using the @Param('id') decorator. It calls the findOne(id) method of the injected usersService to retrieve a single User object. If the user is not found, it throws an error; otherwise, it returns the user.
   - [x] create(user: User) : This method is decorated with @Post() , indicating that it handles HTTP POST requests to the /users route. It takes a user parameter from the request body using the @Body() decorator. It calls the create(user) method of the injected usersService to create a new User object and returns it.
   - [x] update(id: number, user: User) : This method is decorated with @Put(':id') , indicating that it handles HTTP PUT requests to the /users/:id route. It takes an id parameter from the request URL and a user parameter from the request body. It calls the update(id, user) method of the injected usersService to update the user with the specified id and returns the updated user.
   - delete(id: number) : This method is decorated with @Delete(':id') , indicating that it handles HTTP DELETE requests to the /users/:id route. It takes an id parameter from the request URL using the @Param('id') decorator. It first checks if the user exists by calling the findOne(id) method of the injected usersService . If the user is not found, it throws an error; otherwise, it calls the delete(id) method of the injected usersService to delete the User entity.

### 4) users.module.ts >
1. Import the necessary dependencies using the import statement. 
```
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
```
2. Define a module called "UsersModule" using the @Module decorator provided by the NestJS framework. 
3. Inside the module, import the TypeOrmModule using the imports property of the @Module decorator. The TypeOrmModule.forFeature() method is used to include the User entity in the feature set of the TypeOrmModule. 
4. Specify the UsersController and UsersService components as the controllers and providers for this module, respectively, using the controllers and providers properties of the @Module decorator. 
5. Finally, the UsersModule class is exported. This allows other modules or the main application to import and use this module.

### 5) app.module.ts >
1. [x] Define a module using the @Module() decorator. This decorator is imported from @nestjs/common.

2. [x] Inside the imports array, there are two modules being imported:

   - [x] ConfigModule.forRoot() : This module is imported to load and configure environment variables. The forRoot() method is used to initialize the module with default options.
   - [x] UsersModule : This is a custom module that is likely defined elsewhere in the codebase. It is imported to include its functionality within the current module.

3. [x] Inside the TypeOrmModule.forRoot() method, the configuration for the TypeORM module is defined. It specifies the database connection details and settings:

   - [x] type : The type of the database is set based on the value of the DB_TYPE environment variable, which is cast to any . The specific type of the database is not mentioned in the code snippet.
   - [x] host : The host of the PostgreSQL database is set based on the value of the PG_HOST environment variable.
   - [x] port : The port of the PostgreSQL database is set based on the value of the PG_PORT environment variable, which is parsed as an integer.
   - [x] username : The username for the PostgreSQL database is set based on the value of the PG_USER environment variable.
   - [x] password : The password for the PostgreSQL database is set based on the value of the PG_PASSWORD environment variable.
   - [x] database : The name of the PostgreSQL database is set based on the value of the PG_DB environment variable.
   - [x] entities : The entities to be used by TypeORM are specified using a glob pattern. It includes all .entity.ts and .entity.js files in the current directory and its subdirectories [__dirname, + '/**/*.entity{.ts,.js}'].
   - [x] synchronize : The synchronize option is set to true , which means that TypeORM will automatically create database tables and perform schema synchronization based on the entity definitions.

4. [x] The controllers property is an array that includes the AppController . The AppController is likely a custom controller class defined elsewhere in the codebase.

5. [x] The providers property is an array that includes the AppService . The AppService is likely a custom service class defined elsewhere in the codebase.


### 6) create .dockerignore >
```
dist
node_modules
.git
```

### 7) create Dockerfile >
```
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm", "run" , "start:prod" ]
```

### 8) Docker list & remove>
```
[x] docker ps -a
[x] docker rm $(docker ps -aq)
```

### 9) Docker compose>
```
[x] docker compose up -d db
[x] docker compose build
[x] docker compose up
```