import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john.doe@example.com',
      hashedPassword: 'hashedpassword', 
      role: 'USER',
    },
  })


  const exam1 = await prisma.exam.create({
    data: {
      title: 'Mathematics Proficiency Test',
      description:
        'Comprehensive exam covering algebra, geometry, and calculus.',
      price: 2000,
      duration: 120,
      numQuestions: 2, 
    },
  })

  const exam2 = await prisma.exam.create({
    data: {
      title: 'English Language Assessment',
      description: 'Evaluate your English language proficiency.',
      price: 1600,
      duration: 90,
      numQuestions: 2, 
    },
  })


  const question1 = await prisma.question.create({
    data: {
      text: 'What is the value of π (pi) to two decimal places?',
      options: ['3.14', '3.16', '3.12', '3.18'],
      correctAnswer: 0,
    },
  })

  const question2 = await prisma.question.create({
    data: {
      text: 'Solve for x: 2x + 5 = 13',
      options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
      correctAnswer: 1,
    },
  })

  const question3 = await prisma.question.create({
    data: {
      text: 'Which of the following is a correct sentence?',
      options: [
        'The cat is sleeping on the couch.',
        'The cat sleeping on the couch.',
        'The cat be sleeping on the couch.',
        'The cat sleeps on the couch is.',
      ],
      correctAnswer: 0,
    },
  })

  const question4 = await prisma.question.create({
    data: {
      text: 'What is the plural form of "child"?',
      options: ['childs', 'childen', 'children', 'childres'],
      correctAnswer: 2
    }
  })

  await prisma.examSubmission.create({
    data: {
      userId: user.id,
      examId: exam1.id,
      questions: [question1.id, question2.id],
      answers: {
        [question1.id]: 0, 
        [question2.id]: 1, 
      },
      score: 2, 
      timeSpent: 30, 
      warningCount: 0, 
      correctAnswers: [question1.id, question2.id],
      incorrectAnswers: [],
    },
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
