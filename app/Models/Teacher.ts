import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Room from './Room'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => Room)
  public rooms: HasMany<typeof Room>
}
