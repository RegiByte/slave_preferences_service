import Controller from '../../../lib/Controller';

class MetasController extends Controller {
  async index(req, res) {
    return res.json({
      message: 'ok',
    });
  }
}

export default new MetasController();
