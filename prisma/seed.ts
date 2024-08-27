import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const mathExam = await prisma.exam.create({
    data: {
      title: 'Mathematics Proficiency Test',
      description:
        'Comprehensive exam covering algebra, geometry, and calculus.',
      price: 2000,
      duration: 120,
      questions: {
        create: [
          {
            text: 'What is the value of π (pi) to two decimal places?',
            options: ['3.14', '3.16', '3.12', '3.18'],
            correctAnswer: 0,
          },
          {
            text: 'Solve for x: 2x + 5 = 13',
            options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
            correctAnswer: 1,
          },
        ],
      },
    },
  })

  const englishExam = await prisma.exam.create({
    data: {
      title: 'English Language Assessment',
      description: 'Evaluate your English language proficiency.',
      price: 1600,
      duration: 90,
      questions: {
        create: [
          {
            text: 'Which of the following is a correct sentence?',
            options: [
              'The cat is sleeping on the couch.',
              'The cat sleeping on the couch.',
              'The cat be sleeping on the couch.',
              'The cat sleeps on the couch is.',
            ],
            correctAnswer: 0,
          },
          {
            text: 'What is the plural form of "child"?',
            options: ['childs', 'childen', 'children', 'childres'],
            correctAnswer: 2,
          },
        ],
      },
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
