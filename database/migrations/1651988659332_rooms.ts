import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rooms extends BaseSchema {
  protected tableName = 'rooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('teacher_id')
        .unsigned()
        .references('teachers.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.string('teacher')
      table.integer('capacity')
      table.boolean('available')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
