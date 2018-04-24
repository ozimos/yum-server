export default class Controller {
  constructor(model) {
    this.model = model;

    this.getAllRecords = this.getAllRecords.bind(this);
    this.getSingleRecord = this.getSingleRecord.bind(this);
    this.postRecord = this.postRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }



  /**
   *
   * Get All Records
   * @param {any} req
   * @param {any} res
   * @returns {any} all records
   * @memberof Controller
   */
  getAllRecords(req, res) {
    if (this.model) {
      return res.status(200).json(this.model);
    }
    return res.status(400).send('records unavailable');
  }

  /**
   *
   *  Get a single record
   * @param {obj} req
   * @param {any} res
   * @returns {any} A single record
   * @memberof Controller
   */
  getSingleRecord(req, res) {
    for (let i = 0; i < this.model.length; i += 1) {
      if (this.model[i].id === req.params.id) {
        return res.status(200).json(this.model[i]);
      }
    }
    return res.status(404).send('records unavailable');
  }

  /**
   *
   * Creates a new record
   * @param {obj} req
   * @param {any} res
   * @returns {any} success, created record
   * @memberof Controller
   */
  postRecord(req, res) {
    if (this.model) {
      const newId = this.model.length + 1;
      this.model.push({
        id: newId,
        ...req.body
      });
      return res.status(200).json(this.model[this.model.length - 1]);
    }
    return res.status(400).send('records unavailable');
  }

  /**
   *
   *  Update a record
   * @param {obj} req
   * @param {any} res
   * @returns {any} success, updated record
   * @memberof Controller
   */
  updateRecord(req, res) {
    for (let i = 0; i < this.model.length; i += 1) {
      if (this.model[i].id === req.params.id) {
        Object.keys(req.body).forEach((element) => {
          this.model[i][element] = req.body[element];
        });

        return res.status(200).json(this.model[i]);
      }
    }
    return res.status(400).send('records unavailable');
  }
  /**
   *
   *  Delete a record
   * @param {obj} req
   * @param {any} res
   * @returns {any} success, updated record
   * @memberof Controller
   */
  deleteRecord(req, res) {
    for (let i = 0; i < this.model.length; i += 1) {
      if (this.model[i].id === req.params.id) {
        delete this.model[i];
        return res.status(200).send('Record deleted');
      }
    }
    return res.status(400).send('records unavailable');
  }
}