import React, { useState } from 'react';
import axios from 'axios';
import './StudyRoadmap.css'; 

const StudyRoadmap = () => {
  const [duration, setDuration] = useState('');
  const [topic, setTopic] = useState('');
  const [roadmap, setRoadmap] = useState('');

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model:"text-davinci-003",
          prompt: `Generate a roadmap for learning ${topic} in ${duration} weeks`,
          max_tokens: 1000,

        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );

      const roadmapText = response.data.choices[0].text.trim();
      setRoadmap(roadmapText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="study-roadmap-container">
      <p className="paraContainer">Enter the Duration and Topic to get your roadmap</p>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={duration} onChange={handleDurationChange} className="input-field" placeholder='Enter duration in weeks'/>
        </label>
        <br />
        <label>
          <input type="text" value={topic} onChange={handleTopicChange} className="input-field" placeholder='Enter the topic'/>
        </label>
        <br />
        <div className="generate-button-container">
        <button type="submit" className="generateButton">Generate Roadmap</button>
        </div>
      </form>
      {roadmap && (
        <div className="output-container">
        <div className="output">
              {roadmap.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default StudyRoadmap;
