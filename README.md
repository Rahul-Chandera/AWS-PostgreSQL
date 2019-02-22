# AWS-RDS-PostgreSQL
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
```
pool.connect().then(client => {
    const query = {
      name: 'QUERY NAME',
      text: 'SQL QUERY',
      values: [QUERY PARAMETERS IF ANY],
    }

    client.query(query, (err, res) => {
      console.log(res)
    })
    client.release()
  });
```

If you want to test do any manual operations into your database, like creating tables or adding some data, you can use [SQLWorkbench](http://www.sql-workbench.eu/downloads.html). It is a nice tool to test and do basic operations on DB.

To setup SQLWorkbench in Mac machine, first download and copy it into Applications folder, then execute below command in terminal to launch SQLWorkbench,
```
java -jar /Applications/SQLWorkbenchJ.app/Contents/Java/sqlworkbench.jar
```
To connect SQLWorkbench with your Database, follow instruction given in below AWS reference link.

Reference:
-
- https://aws.amazon.com/getting-started/tutorials/create-connect-postgresql-db/
- https://node-postgres.com/api/pool
