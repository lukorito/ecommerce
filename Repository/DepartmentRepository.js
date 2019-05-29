module.exports = class DepartmentRepository {
  constructor(pool) {
    this.pool = pool;
  }

  /**
     * gets all departments
   */
  async getAllDepartments() {
    const [row] = await this.pool.query('CALL catalog_get_departments_list()');
    return row[0];
  }

  async getOneDepartment(departmentId) {
    const [row] = await this.pool.query(
      `CALL catalog_get_department_details(${departmentId})`,
    );
    return row[0][0];
  }
};
