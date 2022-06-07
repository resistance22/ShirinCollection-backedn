module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET') || "authSecretjwt",
  },
  apiToken: {
    salt: env('API_TOKEN_SALT') || "testing",
  },
});
