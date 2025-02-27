import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(data[0].id);

  const isFirstStep = data.findIndex(step => step.id === activeIndex) === 0;
  const isLastStep = data.findIndex(step => step.id === activeIndex) === steps.length - 1;

  const handleNext = () => {
    const currentIndex = data.findIndex(step => step.id === activeIndex);
    if (currentIndex < steps.length - 1) {
      setActiveIndex(data[currentIndex + 1].id);
    } else {
        setActiveIndex(data[0].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = data.findIndex(step => step.id === activeIndex);
    if (currentIndex > 0) {
      setActiveIndex(data[currentIndex - 1].id);
    }
  };

  const handleStepClick = (index) => {
    setActiveIndex(data[index].id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles['steps-content']}>
            {steps.find(step => step.id === activeIndex)?.content}
          </div>
          <ul className={styles['steps-list']}>
            {data.map((step, index) => (
              <li
                key={step.id}
                className={`${styles['steps-item']} ${
                  step.id === activeIndex ? styles.active : ''
                } ${index < data.findIndex(step => step.id === activeIndex) ? styles.done : ''}`}
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