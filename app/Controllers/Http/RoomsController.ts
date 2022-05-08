import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Room from 'App/Models/Room'

export default class RoomsController {
  public async index() {
    const rooms = await Room.query().preload('students')

    return rooms
  }

  public async show({ params }: HttpContextContract) {
    const room = await Room.query().preload('students').where('id', params.id)

    return room
  }

  public async store({ request, response }: HttpContextContract) {
    const { students, ...data } = request.only(['id', 'students'])

    const room = await Room.create(data)

    await room.related('students').attach(students)
    await room.load('students')

    return room
  }

  public async update({ params, request }: HttpContextContract) {
    const data = request.only(['id'])
    const room = await Room.findOrFail(params.id)

    room.id = data.id

    await room.save()

    return {
      message: 'Sala atualizada com sucesso!',
      data: room,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)

    await room.delete()

    return {
      message: 'Sala excluida com sucesso!',
      data: room,
    }
  }
}
