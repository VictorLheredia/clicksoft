import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Students extends BaseSchema {
  protected tableName = 'students'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('email')
      table.string('birthdate')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
