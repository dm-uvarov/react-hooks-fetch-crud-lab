import React from "react";

function QuestionItem({ question, deleteAndDisposeQ , patchCorrectIndex}) {
  const { id, prompt, answers, correctIndex } = question;
  console.log("answer", answers)
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const deleteQ = () =>{
    deleteAndDisposeQ(question)
  }

  const patchA = (e) =>{
    patchCorrectIndex(question, e.target.value)
   
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={patchA} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={deleteQ}>Delete Question</button>
    </li>
  );
  }

  export default QuestionItem;
