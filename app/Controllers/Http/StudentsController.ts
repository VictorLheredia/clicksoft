import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Student from 'App/Models/Student'

export default class StudentsController {
  public async index() {
    const students = await Student.all()

    return students
  }

  public async show({ params }: HttpContextContract) {
    const student = await Student.query().preload('rooms').where('id', params.id)

    return student
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['id', 'name', 'email', 'birthdate'])

    const student = await Student.create(data)

    response.status(201)
    return student
  }

  public async update({ params, request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'birthdate'])
    const student = await Student.findOrFail(params.id)

    student.name = data.name
    student.email = data.email
    student.birthdate = data.birthdate

    await student.save()

    return {
      message: 'Aluno atualizado com sucesso!',
      data: student,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const student = await Student.findOrFail(params.id)

    await student.delete()

    return {
      message: 'Aluno excluido com sucesso!',
      data: student,
    }
  }
}
