
exports.handler = function (event, context, callback) {

  const { Pool } = require('pg')

  const pool = new Pool({
    database: 'YOUR DB NAME',
    user: 'DB USER NAME',
    password: 'DB PASSWORD',
    host: 'HOST URL',
    port: 'PORT',
  })

  pool.connect().then(client => {
    const query = {
      name: 'fetch-user', // You can set any name to your query
      text: 'SELECT * FROM Users WHERE userId = $1', // Define SQL query here
      values: [event.userId], // In this array, you can set parameter values for conditional query
      rowMode: 'array',
    }

    client.query(query, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        res.rows.forEach(function (values) {
          console.log(values)
        });
      }
    })
    client.release()
    callback(null, 'Success');
  }).catch(err => {
    client.release()
    console.log(`Error ${err.stack}`);
    callback(null, 'Failed');
  });
}
