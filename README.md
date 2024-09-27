# Concert API

This repository serves as a starter for building a Concert API using the Nest framework with TypeScript.

## Using

- #### NestJS
- #### PostgreSQL + typeorm
- #### Swagger UI

### Branch Selection

Ensure you're working on the main branch:

```bash
git checkout main
```

## Installation

1. Install the required dependencies:

```bash
$ npm install
```

2. Create an .env file at the root of the project with the following content to configure the database:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=root
DB_PASSWORD=pass1234
DB_NAME=concert_db
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

## Running Tests

```bash
$ npm run test
```

### PORT

```bash
 Please use port 8080
```

### Open Swagger

Open [http://localhost:8080/api](http://localhost:8080/api) with your browser to see the result.
