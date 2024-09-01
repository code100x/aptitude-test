'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { PolygonTexture } from '@/components/global/polygon-texture'
import { cohort_lists, features } from '@/config'
import { Navbar } from '@/components/global/navbar/navbar'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const coursesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    const refs = [heroRef, featuresRef, coursesRef, aboutRef]
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  return (
    
      <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 dark:from-background dark:via-background dark:to-primary/10 text-foreground'>
        <motion.div
          className='fixed top-0 left-0 right-0 h-1 bg-primary transform-origin-0'
          style={{ scaleX }}
        />
        <PolygonTexture
          clipClassName='bg-gradient-to-r from-[hsl(var(--primary))] via-[#9182ff] to-[hsl(var(--primary))]'
          className='z-3'
        />

        <main>
          <motion.div
            ref={heroRef}
            className='relative overflow-hidden py-20 sm:py-32'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
              style={{ y }}
            />
            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='text-center'>
                <h1 className='text-4xl sm:text-6xl font-extrabold tracking-tight'>
                  <span className='block'>100xDev Exams:</span>{' '}
                  <span className='block text-primary mt-2 h-20'>
                    <Typewriter
                      options={{
                        strings: [
                          'Master Your Skills',
                          'Ace Your Interviews',
                          'Boost Your Career',
                        ],
                        autoStart: true,
                        loop: true,
                        wrapperClassName: 'typewriter-wrapper',
                        cursorClassName: 'typewriter-cursor',
                      }}
                    />
                  </span>
                </h1>
                <p className='mt-6 max-w-lg mx-auto text-xl text-muted-foreground'>
                  Take your development skills to the next level with our
                  comprehensive exams. Practice, learn, and grow at your own
                  pace.
                </p>
                <div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'>
                  <div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5'>
                    <Link
                      href='/available-exams'
                      className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-background bg-primary hover:bg-primary/90 sm:px-8'
                    >
                      Start an Exam
                    </Link>
                    <Link
                      target='_blank'
                      href='https://100xdevs.com/'
                      className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-primary/10 hover:bg-primary/20 sm:px-8'
                    >
                      View Cohort
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={featuresRef}
            className='py-24 bg-background'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='lg:text-center'>
                <h2 className='text-base text-primary font-semibold tracking-wide uppercase'>
                  Features
                </h2>
                <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl'>
                  Why Choose 100xDev Exams?
                </p>
                <p className='mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto'>
                  Our platform offers unique features to enhance your learning
                  experience.
                </p>
              </div>

              <div className='mt-20'>
                <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className='relative'
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <dt>
                        <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-background'>
                          <feature.icon
                            className='h-6 w-6'
                            aria-hidden='true'
                          />
                        </div>
                        <p className='ml-16 text-lg leading-6 font-medium'>
                          {feature.title}
                        </p>
                      </dt>
                      <dd className='mt-2 ml-16 text-base text-muted-foreground'>
                        {feature.description}
                      </dd>
                    </motion.div>
                  ))}
                </dl>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={coursesRef}
            className='py-24'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='lg:text-center'>
                <h2 className='text-base text-primary font-semibold tracking-wide uppercase'>
                  Cohort
                </h2>
                <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl'>
                  Explore Our 100xDev Cohort
                </p>
                <p className='mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto'>
                  Dive deep into various development topics with our expertly
                  crafted cohort.
                </p>
              </div>

              <div className='mt-20'>
                <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                  {cohort_lists.map((course, index) => (
                    <motion.div
                      key={course.title}
                      className='flex flex-col rounded-xl shadow-lg overflow-hidden'
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className='flex-shrink-0'>
                        <Image
                          className='h-48 w-full object-cover'
                          src={course.image}
                          alt={course.title}
                          width={400}
                          height={200}
                        />
                      </div>
                      <div className='flex-1 bg-card p-6 flex flex-col justify-between'>
                        <div className='flex-1'>
                          <h3 className='text-xl font-semibold'>
                            {course.title}
                          </h3>
                        </div>
                        <div className='mt-6'>
                          <Link
                            target='_blank'
                            href={course.link}
                            className='text-primary hover:text-primary/80'
                          >
                            Learn more →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={aboutRef}
            className='py-24 bg-background'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='lg:text-center'>
                <h2 className='text-base text-primary font-semibold tracking-wide uppercase'>
                  About 100xDev
                </h2>
                <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl'>
                  Empowering Developers to Excel
                </p>
                <p className='mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto'>
                  100xDev is dedicated to helping developers reach their full
                  potential through comprehensive courses, practical exams, and
                  a supportive community.
                </p>
              </div>

              <div className='mt-20'>
                <div className='text-center text-muted-foreground mx-auto lg:max-w-none'>
                  <p>
                    At 100xDev, we believe that becoming a great developer is
                    about more than just learning to code. It&apos;s about
                    developing problem-solving skills, understanding best
                    practices, and staying up-to-date with the latest
                    technologies.
                  </p>
                  <p>
                    Our platform offers a unique blend of theoretical knowledge
                    and practical application. Through our courses, you&apos;ll
                    gain in-depth understanding of various development concepts.
                    With our exam system, you can put your skills to the test
                    and identify areas for improvement.
                  </p>
                  <p>
                    But we&apos;re more than just a learning platform.
                    We&apos;re a community of passionate developers, all
                    striving to be the best we can be. Join us, and let&apos;s
                    grow together!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <footer className='bg-background border-t border-border'>
          <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8'>
            <div className='flex justify-center space-x-6 md:order-2'>
              <Link
                target='_blank'
                href='https://x.com/100xDevs'
                className='text-muted-foreground hover:text-primary'
              >
                <span className='sr-only'>Twitter</span>
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </Link>
              <Link
                target='_blank'
                href='https://github.com/code100x'
                className='text-muted-foreground hover:text-primary'
              >
                <span className='sr-only'>GitHub</span>
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
            </div>
            <div className='mt-8 md:mt-0 md:order-1'>
              <p className='text-center text-base text-muted-foreground'>
                &copy; {new Date().getFullYear()} 100xDev. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
  )
}
