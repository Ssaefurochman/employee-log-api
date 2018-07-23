const app = require('./server');

var User = app.models.Users;
var Role = app.models.Role;
var RoleMapping = app.models.RoleMapping;

// Nomor 1 dari kekurangan Loopback, blm support Promise.
User.findOrCreate(
  { where: { email: "direktur@elog.com" } },
  {
    realm: "direktur",
    username: "direktur",
    email: "direktur@elog.com",
    password: "direktur123",
    pid: 0
  },
  (err, userDirector) => {
    if (err) throw err;
    console.log(`User ${userDirector.email} found / created`);

    RoleMapping.findOrCreate(
      {where: {principalId: userDirector.id}},
      {
        principalType: RoleMapping.USER,
        principalId: userDirector.id,
        roleId: 1
      },
      (err, principal) => {
        if (err) throw err;
        console.log(`>> Role director assigned to user ${userDirector.email}`);

        User.findOrCreate(
          { where: { email: "manager@elog.com" } },
          {
            realm: "manager",
            username: "manager",
            email: "manager@elog.com",
            password: "manager123",
            pid: 1
          },
          (err, userManager) => {
            if (err) throw err;
            console.log(`User ${userManager.email} found / created`);

            RoleMapping.findOrCreate(
              {where: {principalId: userManager.id}},
              {
                principalType: RoleMapping.USER,
                principalId: userManager.id,
                roleId: 2
              },
              (err, principal) => {
                if (err) throw err;
                console.log(`>> Role manager assigned to user ${userManager.email}`);

                User.findOrCreate(
                  { where: { email: "pegawai@elog.com" } },
                  {
                    realm: "pegawai",
                    username: "pegawai",
                    email: "pegawai@elog.com",
                    password: "pegawai123",
                    pid: 2
                  },
                  (err, userPegawai) => {
                    if (err) throw err;
                    console.log(`User ${userPegawai.email} found / created`);

                    //Assign Role
                    Role.findOrCreate(
                     {where: {name: 'pegawai'}},
                     {name: 'pegawai'},
                     (err, role) => {
                       if (err) throw err;

                       RoleMapping.findOrCreate(
                         {where: {principalId: userPegawai.id}},
                         {
                           principalType: RoleMapping.USER,
                           principalId: userPegawai.id,
                           roleId: 3
                         },
                         (err, principal) => {
                           if (err) throw err;
                           console.log(`>> Role ${role.name} assigned to user ${userPegawai.email}`);
                           process.exit(0);
                       });

                    });

                });
            });
        });
    });

});
