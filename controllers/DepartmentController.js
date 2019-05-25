const pool = require('../pool');
const DepartmentRepository = require('../Repository/DepartmentRepository');

module.exports = class DepartmentController {
    _repo = new DepartmentRepository(pool)

    /**
     * @description gets all departments
     * @returns {Array}
     */
    async getAll () {
        try {
            return await this._repo.getAllDepartments()
        } catch (error) {
            throw error;
        }
    }
}