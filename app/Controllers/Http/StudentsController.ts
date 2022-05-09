import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Student from 'App/Models/Student'

export default class StudentsController {
  public async index() {
    const students = await Student.all()

    return students
  }

  public async show({ params, response }: HttpContextContract) {
    //Check student exists
    const studentExists = await Student.find(params.id)
    if (!studentExists) {
      return response.status(404).json({ message: 'Aluno não encontrado no sistema.' })
    }

    const student = await Student.query().preload('rooms').where('id', params.id)

    return student
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
    const idExists = await Student.find(data.id)
    if (idExists) {
      return response
        .status(422)
        .json({ message: `A matrícula ${data.id} já está cadastrada no sitema.` })
    }

    //Check email exists
    const emailExists = await Student.findBy('email', data.email)
    if (emailExists) {
      return response
        .status(422)
        .json({ message: `o email ${data.email} já está cadastrado no sitema.` })
    }

    const student = await Student.create(data)

    return response
      .status(201)
      .json({ message: `Aluno ${data.name} cadastrado com sucesso!`, data: student })
  }

  public async update({ params, request, response }: HttpContextContract) {
    //Check id exists
    const student = await Student.find(params.id)
    if (!student) {
      return response.status(404).json({ message: `Aluno não encontrado no sistema.` })
    }

    const data = request.only(['name', 'email', 'birthdate'])

    //Check email exists
    const emailExists = await Student.findBy('email', data.email)
    if (emailExists) {
      return response
        .status(422)
        .json({ message: `o email ${data.email} já está cadastrado no sitema.` })
    }

    student.name = data.name
    student.email = data.email
    student.birthdate = data.birthdate

    await student.save()

    return response.status(200).json({ message: 'Aluno atualizado com sucesso!', data: student })
  }

  public async destroy({ params, response }: HttpContextContract) {
    //Check student exists
    const student = await Student.find(params.id)
    if (!student) {
      return response.status(404).json({ message: 'Aluno não encontrado no sistema.' })
    }

    await student.delete()

    return response.status(200).json({ message: 'Aluno excluido com sucesso!', data: student })
  }
}
