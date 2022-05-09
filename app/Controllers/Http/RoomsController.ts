import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Room from 'App/Models/Room'
import Teacher from 'App/Models/Teacher'

export default class RoomsController {
  public async index() {
    const rooms = await Room.all()

    return rooms
  }

  public async show({ params, response }: HttpContextContract) {
    //Check Room exists
    const roomExists = await Room.find(params.id)
    if (!roomExists) {
      return response.status(404).json({ message: 'Sala não encontrada no sistema.' })
    }

    const room = await Room.query().preload('students').where('id', params.id)

    return room
  }

  public async store({ request, response }: HttpContextContract) {
    const { teacherId, ...data } = request.only(['id', 'teacherId', 'capacity', 'available'])

    //Checks
    if (!data.id) {
      return response.status(422).json({ message: 'o número da sala é obrigatório' })
    }
    if (!teacherId) {
      return response.status(422).json({ message: 'O Professor responsável da sala é obrigatório' })
    }
    if (!data.capacity) {
      return response.status(422).json({ message: 'A capacidade de alunos da sala é obrigatória' })
    }
    if (!data.available) {
      return response
        .status(422)
        .json({ message: 'O campo disponibilidade de matricular novos alunos é obrigatório ' })
    }

    //Check id exists
    const idExists = await Room.find(data.id)
    if (idExists) {
      return response
        .status(422)
        .json({ message: `A sala ${data.id} já está cadastrada no sitema.` })
    }

    //Check teacher ixists
    const teacher = await Teacher.find(teacherId)
    if (!teacher) {
      return response.status(422).json({ message: `Professor não cadastrado no sistema.` })
    }

    data.teacherId = teacher?.id
    data.teacher = teacher?.name

    const room = await Room.create(data)

    return response
      .status(201)
      .json({ message: `Sala ${data.id} cadastrado com sucesso!`, data: room })
  }

  public async update({ params, request, response }: HttpContextContract) {
    //Check id exists
    const room = await Room.find(params.id)
    if (!room) {
      return response.status(404).json({ message: `Sala não encontrada no sistema.` })
    }

    const data = request.only(['capacity', 'available'])

    room.capacity = data.capacity
    room.available = data.available

    await room.save()

    return response.status(200).json({ message: 'Sala atualizada com sucesso!', data: room })
  }

  public async destroy({ params, response }: HttpContextContract) {
    //Check id exists
    const room = await Room.find(params.id)
    if (!room) {
      return response.status(404).json({ message: `Sala não encontrada no sistema.` })
    }

    await room.delete()

    return response.status(200).json({ message: `Sala ${params.id} excluida com sucesso!` })
  }
}
