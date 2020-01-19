class MetasRepository {
  constructor({ models }) {
    this.models = models;
  }

  static with(deps) {
    return new MetasRepository(deps);
  }
}

export default MetasRepository;
