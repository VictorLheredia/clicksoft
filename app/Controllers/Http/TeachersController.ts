import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async index() {
    const teachers = await Teacher.all()

    return teachers
  }

  public async show({ params, response }: HttpContextContract) {
    //Check Teacher exists
    const teacherExists = await Teacher.find(params.id)
    if (!teacherExists) {
      return response.status(404).json({ message: 'Professor não encontrado no sistema.' })
    }

    const teacher = await Teacher.query().preload('rooms').where('id', params.id)

    return teacher
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['id', 'name', 'email', 'birthdate'])

    //Checks
    if (!data.id) {
      return response.status(422).json({ message: 'A matrícula é obrigatória' })
    }
    if (!data.name) {
      return response.status(422).json({ message: 'O nome é obrigatório' })
    }
    if (!data.email) {
      return response.status(422).json({ message: 'O email é obrigatório' })
    }
    if (!data.birthdate) {
      return response.status(422).json({ message: 'A data de nascimento é obrigatória' })
    }

    //Check id exists
    const idExists = await Teacher.find(data.id)
    if (idExists) {
      return response
        .status(422)
        .json({ message: `A matrícula ${data.id} já está cadastrada no sitema.` })
    }

    //Check email exists
    const emailExists = await Teacher.findBy('email', data.email)
    if (emailExists) {
      return response
        .status(422)
        .json({ message: `o email ${data.email} já está cadastrado no sitema.` })
    }

    const teacher = await Teacher.create(data)

    return response
      .status(201)
      .json({ message: `Professor ${data.name} cadastrado com sucesso!`, data: teacher })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only(['name', 'email', 'birthdate'])
    const teacher = await Teacher.findOrFail(params.id)

    //Check email exists
    const emailExists = await Teacher.findBy('email', data.email)
    if (emailExists) {
      return response
        .status(422)
        .json({ message: `o email ${data.email} já está cadastrado no sitema.` })
    }

    teacher.name = data.name
    teacher.email = data.email
    teacher.birthdate = data.birthdate

    await teacher.save()

    return response
      .status(200)
      .json({ message: 'Professor atualizado com sucesso!', data: teacher })
  }

  public async destroy({ params, response }: HttpContextContract) {
    //Check student exists
    const teacher = await Teacher.find(params.id)
    if (!teacher) {
      return response.status(404).json({ message: 'Professor não encontrado no sistema.' })
    }

    await teacher.delete()

    return response.status(200).json({ message: 'Professor excluido com sucesso!', data: teacher })
  }
}
