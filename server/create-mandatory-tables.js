const server = require('./server');
const ds = server.dataSources.mysql;

const tables = [
  'Users',
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role'
];

tables.forEach((model)=>{
  ds.isActual(model, (err, actual) => {
    if (err) throw err;
    if (!actual) {
      ds.autoupdate(model, (err, result) => {
        if (err) throw err;
        console.log(`Loopback tables '${model}' updated in ${ds.adapter.name}`);
      });
    }
  });
});
