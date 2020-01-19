import Youch from 'youch';

export async function errorHandler(err, req, res) {
  const { ERROR_HANDLER } = process.env;

  if (ERROR_HANDLER === 'HTML') {
    const errors = await new Youch(err, req).toHTML();
    res.writeHead(400, { 'content-type': 'text/html' });
    res.write(errors);
    return res.end();
  }

  const errors = await new Youch(err, req).toJSON();
  return res.status(500).json(errors);
}
