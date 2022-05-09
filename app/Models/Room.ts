import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

import Student from './Student'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public teacherId: number

  @column()
  public teacher: string

  @column()
  public capacity: number

  @column({
    serialize: (value?: Number) => {
      return Boolean(value)
    },
  })
  public available: boolean

  @manyToMany(() => Student)
  public students: ManyToMany<typeof Student>
}
