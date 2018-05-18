const env = process.env.ENV ? process.env.ENV : 'local';
const cfg = require(`../config/${env}`);

cfg.auth0.clientSecret = process.env.AUTH0_CLIENT_SECRET;
cfg.sessionSecret = process.env.SESSION_SECRET;
cfg.stripeSecret = process.env.STRIPE_SECRET;

module.exports = cfg;
