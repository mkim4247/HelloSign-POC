import React, { useState } from "react";
import ESigForm from './ESigForm';
import Success from './Success';

const App = () => {
  const [showForm, toggleForm] = useState(true);

  return (
    <div>
      {showForm ? <ESigForm toggleForm={toggleForm} /> : <Success />}
    </div>
  )
};

export default App;
