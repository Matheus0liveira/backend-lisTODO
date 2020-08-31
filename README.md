<div align='center'>

  <img src='./github/Logo.svg' width='300'/>

---

<br>
<a href='#about'>About</a> |
<a href='#tecnology'>Tecnology</a> |
<a href='#how-to-use'>How to use</a> |
<a href='#functionalities'>Functionalities</a> |
<a href='#author'>Author</a>

<br>
<br>

---

<br>
<br>

</div>

### <p id='about'>📑 About</p>

This project aims to help you organize your activities in your routine, remembering what are the activities of your day, making your day more productive! 😄
<br>
<br>

### <p id='tecnology'>🖥 Tecnology</p>

This project was built 100% on the express and its good practices, follows the list of dependencies used in this project.

> Last update -> 24/08/2020

| Dependency    | Why use                              |
| ------------- | ------------------------------------ |
| express       | Create routes(Main technology)       |
| Bcrypt        | encrypt passwords                    |
| dotenv        | Store environment variables          |
| jsonwebtoken  | Creates tokens for validating routes |
| (pg)postgress | DataBase                             |
| Sequelize     | ORM (Object-Relational Mapper)       |

<br>

| DevDependencies | Why use                                               |
| --------------- | ----------------------------------------------------- |
| eslint          | Standardize project                                   |
| nodemon         | Auto reload when saved                                |
| sequelize-cli   | Execute sequelize commands from the terminal          |
| sucrase         | Transpils code accepting to import and export modules |

<br>
<br>

### <p id='how-to-use'>⚙️ How to use</p>

#### First clone the project

```shell

$ git clone https://github.com/Matheus0liveira/backend-lisTODO.git

```

#### 🔥 Install dependencies

```shell

$ yarn

# or

$ npm install

```

#### Create a file called .env at the root of the project and set the environment variables: database variables(just create the bank, the migrations will create the tables automatically), and variables for jwt.

<br/>

#### Execute migrations

<br/>

```shell
$ yarn sequelize db:migrate
```

or

```shell
$ npm sequelize db:migrate
```

for delete the last migration generate

```shell
$ yarn sequelize db:migrate:undo

# delete all migrations

$ yarn sequelize db:migrate:undo:all
```

#### 🔥 Starter server

```shell
$ yarn start

# or

$ npm run start

```

<br>
<br>

### <p id='functionalities'>🖥 Functionalities</p>

#### lisTODO(back-end) has 4 routes currently and 1 middleware the authentication:

<br/>

Routes

| Routes       |                                                                                         |
| ------------ | --------------------------------------------------------------------------------------- |
| Create User  | Create use                                                                              |
| Login        | login, but for that you need to register, returning a token                             |
| Create Tasks | Create tasks, need to be logged in, to create you need to pass the valid id and token   |
| List Tasks   | List tasks, need to be logged in, to list tasks you need to pass the valid id and token |

<br/>

Middleware

| Middleware |                                                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| auth       | Authenticates users, returning whether they have permission or not, implemented in the routes to create and list tasks |

<br>
<br>

### <p id='author'>👨 Author</p>

#### This project was created by <a href='https://www.github.com/Matheus0liveira'>Matheus Oliveira <a/>
