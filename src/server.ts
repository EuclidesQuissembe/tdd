import "reflect-metadata";

import connection from "./database";

import app from './app';

connection.create()

app.listen(3000, () => console.log('Server running'));
