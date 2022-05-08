import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoomStudents extends BaseSchema {
  protected tableName = 'room_student'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('room_id')
        .unsigned()
        .references('rooms.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('student_id')
        .unsigned()
        .references('students.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.unique(['room_id', 'student_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
