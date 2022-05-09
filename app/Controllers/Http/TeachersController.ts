import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async index() {
    // const teachers = await Teacher.query().preload('rooms')
    const teachers = await Teacher.query().preload('rooms')

    return teachers
  }

  public async show({ params }: HttpContextContract) {
    // const teacher = await Teacher.query().preload('rooms').where('id', params.id)
    const teacher = await Teacher.find(params.id)

    return teacher
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name'])

    const teacher = await Teacher.create(data)

    response.status(201)
    return teacher
  }
}
