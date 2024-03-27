import React, { useState } from 'react';

export default function Test() {
  const [currentPath, setCurrentPath] = useState([]);
  const getCurrentQuestion = () => {
    let currentOptions = questions;
    currentPath.forEach((id) => {
      const nextQuestion = currentOptions.find(option => option.id === id);
      if (nextQuestion) {
        currentOptions = nextQuestion.options;
      }
    });
    return currentOptions;
  };
  const questions = [
 
    {
      id: 'Arts',
      question: 'Would you like science or arts',
      options: [
        { id: 'mechanical engineering', question: 'Do you prefer Mechanical Engineering or Electrical Engineering?', options: [] },
        { id: 'electrical engineering', question: '', options: [] }, // No further sub-questions
      ],
    },
    {
      id: 'Science',
      question: 'which filed you want to preffer In science',
      options: [
        { id: 'Natural Science', question: 'Which natural sciences you prefer', options: [
          { id: 'Biology', question: '', options: [] }, 
          { id: 'Chemistry', question: '', options: [] }, 
          { id: 'Physics', question: '', options: [] }, 
        ] }, // Example sub-domain choices for AI
        { id: 'Environmental Science', question: '', options: [] },
        { id: 'Health Science', question: '', options: [] },
        { id: 'Computer Science', question: '', options: [] },

      ],
    },
  ];
  

  const handleOptionSelect = (optionId) => {
    setCurrentPath(currentPath => [...currentPath, optionId]);
  };

  const currentQuestion = getCurrentQuestion();

  return (
    <div>
      {currentQuestion.length > 0 && (
        <div>
          <div>{currentQuestion[0].question}</div>
          {currentQuestion.map((option) => (
            <button key={option.id} onClick={() => handleOptionSelect(option.id)}>
              {option.id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
