module.exports = {
  secret: 'mypreciuossecret',
  corsOptions: {
    origin: 'front-url',
    optionsSuccessStatus: 200
  },
  timeToExpireSessionInHours: '1h',
  maxInactivityTimeInMinutes: 5
};
