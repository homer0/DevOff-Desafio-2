const newFastify = require('fastify');
const fastifyCors = require('fastify-cors');
const { encrypt, decrypt } = require('./utils');

const PORT = 2509;
const DEFAULT_STRENGTH = 4;

const fastify = newFastify();

fastify.register(fastifyCors);

fastify.post('/encrypt', async (req) => {
  const {
    mensaje: phrase,
    vueltas: strength = DEFAULT_STRENGTH,
  } = req.body;

  return { mensaje: encrypt(phrase, strength) };
});

fastify.post('/decrypt', async (req) => {
  const {
    mensaje: phrase,
    vueltas: strength = DEFAULT_STRENGTH,
  } = req.body;

  return { mensaje: decrypt(phrase, strength) };
});

const start = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// eslint-disable-next-line no-process-env
if (typeof process.env.SERVERLESS === 'undefined') {
  start();
}

module.exports = fastify;
