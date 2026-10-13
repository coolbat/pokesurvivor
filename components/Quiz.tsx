'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUIZ, scoreQuiz } from '@/lib/quiz'

export function Quiz() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const question = QUIZ[step]

  function choose(index: number) {
    const next = [...answers.slice(0, step), index]
    if (step + 1 < QUIZ.length) {
      setAnswers(next)
      setStep(step + 1)
      return
    }
    const result = scoreQuiz(next)
    if (result) router.push(`/quiz/${result.mon.slug}/`)
  }

  return (
    <section className="box">
      <p className="quiz-progress">Question {step + 1} of {QUIZ.length}</p>
      <h2>{question.q}</h2>
      <div className="quiz-options">
        {question.a.map((answer, index) => (
          <button key={answer.t} type="button" className="btn" onClick={() => choose(index)}>
            {answer.t}
          </button>
        ))}
      </div>
      {step > 0 && (
        <p>
          <button type="button" className="btn small ghost" onClick={() => setStep(step - 1)}>
            Back
          </button>
        </p>
      )}
    </section>
  )
}
