import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Room from 'App/Models/Room'
import Teacher from 'App/Models/Teacher'

export default class RoomsController {
  public async index() {
    const rooms = await Room.all()

    return rooms
  }

  public async show({ params }: HttpContextContract) {
    const room = await Room.query().preload('students').where('id', params.id)

    return room
  }

  public async store({ request, response }: HttpContextContract) {
    const { teacherId, ...data } = request.only(['id', 'teacherId', 'capacity', 'available'])

    await Teacher.find(teacherId)

    data.teacherId = teacherId

    const room = await Room.create(data)

    return room
  }

  public async update({ params, request }: HttpContextContract) {
    const data = request.only(['capacity', 'available'])
    const room = await Room.findOrFail(params.id)

    room.capacity = data.capacity
    room.available = data.available

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
