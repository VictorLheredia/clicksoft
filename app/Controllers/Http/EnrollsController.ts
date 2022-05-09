import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Room from 'App/Models/Room'
import Student from 'App/Models/Student'

export default class EnrollsController {
  public async store({ params, request, response }: HttpContextContract) {
    const room = await Room.find(params.id)
    const { teacher, student } = request.only(['teacher', 'student'])

    //Check Room exists
    if (!room) {
      return {
        message: 'Sala não cadastrada no sistema.',
      }
    }

    //Check Teacher is admin room
    if (teacher !== room.teacherId) {
      return {
        message: 'O professor não é o responsável da sala.',
      }
    }

    //Check Student exists
    const studentExists = await Student.find(student)
    if (!studentExists) {
      return {
        message: 'Aluno não cadastrado no sistema.',
      }
    }

    //Check Student exists in Room
    const students = await room.related('students').query()
    const ArrayStudents = students.map((student) => student.id)
    const studentInRoom = ArrayStudents.includes(student)
    if (studentInRoom) {
      return {
        message: 'O aluno Já está matriculado na sala.',
      }
    }

    await room.related('students').attach([student])
    await room.load('students')

    return {
      message: `O aluno ${studentExists.name} foi matriculado na sala ${room.id} com sucesso!`,
      data: room,
    }
  }
}
