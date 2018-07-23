const app = require('./server');

var User = app.models.users;
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;

Role.findOrCreate(
 {where: {name: 'direktur'}},
 {name: 'direktur'},
 (err, roleDirektur) => {
   if (err) throw err;
   console.log(`Role ${roleDirektur.name} created`);

   Role.findOrCreate(
    {where: {name: 'manager'}},
    {name: 'manager'},
    (err, roleManager) => {
      if (err) throw err;
      console.log(`Role ${roleManager.name} created`);

      Role.findOrCreate(
       {where: {name: 'pegawai'}},
       {name: 'pegawai'},
       (err, rolePegawai) => {
         if (err) throw err;

         console.log(`Role ${rolePegawai.name} created`);
         process.exit(0);
      });
   });
});
