import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

import Room from './Room'

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public birthdate: string

  @hasMany(() => Room)
  public rooms: HasMany<typeof Room>
}
