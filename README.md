# AWS-PostgreSQL
This sample demonstrates how to connect and query data from PostgreSQL, using Lambda function.

Dependancies:
- pg

To establish connection from Lambda function, connection pool us a better option. Just import "pg" library and initialise pool with database name, user name, password, host url and port. 
```
const { Pool } = require('pg')
const pool = new Pool({
    database: 'YOUR DB NAME', 
    user: 'DB USER NAME',
    password: 'DB PASSWORD',
    host: 'HOST URL',
    port: 'PORT',
  })
```
Make sure that Database instance name and Database name both are separate thing. Here you have to set the Database name, and not the instance name.
Host & port you can find in AWS RDS database console. Check the "Connectivity & security" section, you will find Endpoint & Post there.

Once connection is established, you can fetch data by creating query object with sql query and parameters. Make sure to release client object once your task is complete. 

Reference:
-
- https://aws.amazon.com/getting-started/tutorials/create-connect-postgresql-db/
- https://node-postgres.com/api/pool
