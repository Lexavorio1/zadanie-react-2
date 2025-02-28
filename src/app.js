import { useState } from 'react'
import styles from './app.module.css'
import data from './data.json'

export const App = () => {
  const [steps, setSteps] = useState(data)
  const [activeIndex, setActiveIndex] = useState(0)

  const isFirstStep = activeIndex === 0
  const isLastStep = activeIndex === steps.length - 1

  const handleNext = () => {
    if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0)
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  };

  const handleStepClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles['steps-content']}>
            {steps[activeIndex].content}
          </div>
          <ul className={styles['steps-list']}>
            {data.map((step, index) => (
              <li
                key={step.id}
                className={`${styles['steps-item']} ${
                  index === activeIndex ? styles.active : ''
                } ${index < activeIndex ? styles.done : ''}`}
                onClick={() => handleStepClick(index)}
              >
                <button className={styles['steps-item-button']}>{index + 1}</button>
                {step.title}
              </li>
            ))}
          </ul>
          <div className={styles['buttons-container']}>
            <button className={styles.button} onClick={handlePrevious} disabled={isFirstStep}>
              Назад
            </button>
            <button className={styles.button} onClick={handleNext}>
              {isLastStep ? 'Начать сначала' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}