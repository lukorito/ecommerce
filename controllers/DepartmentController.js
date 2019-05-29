const pool = require('../pool');
const DepartmentRepository = require('../Repository/DepartmentRepository.js');
const handler = require('../helpers/handlers');

module.exports = class DepartmentController {
  constructor() {
    this.repo = new DepartmentRepository(pool);
  }

  async getAll(req, res, next) {
    console.log(req.user)
    try {
      const results = await this.repo.getAllDepartments();
      handler.sendResponse(res, 200, results);
    } catch (error) {
      throw error;
    }
  }

  async getOne(req, res, next) {
    try {
      const departmentId = req.params.department_id;
      const results = await this.repo.getOneDepartment(departmentId);
      return results ? handler.sendResponse(res, 200, results)
        : handler.sendError(
          res,
          'DEP_02',
          400,
          'department_id',
          'Department with ID does not exist',
        );
    } catch (error) {
      throw error;
    }
  }
};
