import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async index() {
    const teachers = await Teacher.all()

    return teachers
  }

  public async show({ params }: HttpContextContract) {
    const teacher = await Teacher.query().preload('rooms').where('id', params.id)

    return teacher
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['id', 'name', 'email', 'birthdate'])

    const teacher = await Teacher.create(data)

    response.status(201)
    return teacher
  }

  public async update({ params, request }: HttpContextContract) {
    const data = request.only(['name', 'email', 'birthdate'])
    const teacher = await Teacher.findOrFail(params.id)

    teacher.name = data.name
    teacher.email = data.email
    teacher.birthdate = data.birthdate

    await teacher.save()

    return {
      message: 'Professor atualizado com sucesso!',
      data: teacher,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const teacher = await Teacher.findOrFail(params.id)

    await teacher.delete()

    return {
      message: 'Professor excluido com sucesso!',
      data: teacher,
    }
  }
}
