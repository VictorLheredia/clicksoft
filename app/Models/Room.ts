import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

import Student from './Student'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @manyToMany(() => Student)
  public students: ManyToMany<typeof Student>
}
