const method = (_, res) =>
  res.status(405).send({
    status: 405,
    message: 'HTTP method not allowed',
  });

export default method;
