import React, { useState } from 'react';
import FeedbackForm from '../Components/FeedbackForm/FeedbackForm.js'; 
import FeedbackDisplay from '../Components/FeedbackDisplay/FeedbackDisplay.js';

function About() {
  const [feedbackData, setFeedbackData] = useState([]);

  const handleFeedbackSubmit = (newFeedback) => {
    // Create a new feedback object and add it to the feedbackData array
    const newFeedbackItem = {
      id: feedbackData.length + 1,
      userPhoto: 'user.jpg',//mne5dn mn l database
      userName: 'User',
      feedbackContent: newFeedback,
    };

    setFeedbackData([...feedbackData, newFeedbackItem]);
  };
  return (
    <div>
        <h2>About Us:</h2>
        <p>"Embark with culinary journey with our recipe website, where mouthwatering creations, gourmet secrets, and epicurean inspiration converge to transform your home cooking into a gourmet masterpiece"</p>
        <h2>People's thoughts:</h2>
        <FeedbackForm onFeedbackSubmit={handleFeedbackSubmit} />
        <FeedbackDisplay feedbackData={feedbackData} />
    </div>
  )
}

export default About
