module.exports = {
  HOST: '172.16.20.200',
  USER: 'SMS1018',
  PASSWORD: 'T98WULvxxVfn1wteetjf',
  DB: 'Honohr_Uat',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
