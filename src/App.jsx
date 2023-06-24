import { useState, useEffect } from "react";
import data from "../data";
import "./App.css";

function FinalDataComp({answers}){
  let finalData = [
    { breed: "Bulldog", score: 0, img:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bulldog_inglese.jpg/220px-Bulldog_inglese.jpg", link:"https://en.wikipedia.org/wiki/Bulldog" },
    { breed: "Basset Hound", score: 0, img:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/BassetHound_profil.jpg/220px-BassetHound_profil.jpg", link:"https://en.wikipedia.org/wiki/Basset_Hound" },
    { breed: "Labrador Retriever", score: 0, img:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/220px-Labrador_on_Quantock_%282175262184%29.jpg", link:"https://en.wikipedia.org/wiki/Labrador_Retriever" },
    { breed: "Golden Retriever", score: 0, img:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_Retriever_Dukedestiny01_drvd.jpg/220px-Golden_Retriever_Dukedestiny01_drvd.jpg", link:"https://en.wikipedia.org/wiki/Golden_Retriever" },
    { breed: "Border Collie", score: 0, img:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Blue_Merle_Border_Collie._Female.jpg/220px-Blue_Merle_Border_Collie._Female.jpg", link:"https://en.wikipedia.org/wiki/Border_Collie" },
    { breed: "Australian Shepherd", score: 0, img:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Australian_Shepherd_red_bi.JPG/220px-Australian_Shepherd_red_bi.JPG", link:"https://en.wikipedia.org/wiki/Australian_Shepherd" },
  ];
  for (const [key, value] of Object.entries(answers)) {
    console.log(`${key}: ` + JSON.stringify(value));
    const data = JSON.parse(JSON.stringify(value));
    data.breeds.forEach((res) => {
      finalData.map((final) => {
        if(final.breed == res.breed){
          return final.score = final.score + res.score
        }
        
      });
    });
  }
  
  finalData = finalData.sort((a,b)=> b.score - a.score)
  console.log('finalDataSorted', finalData);
  return(
  <>
  <div className="d-flex">
    {finalData.map(dog=>(
      <div className="card">
        <div className="border">
          <h3>{dog.breed}</h3>
          <img width={250} src={dog.img} alt="" srcset="" />
          <h4>Percentage of this breed fitting your answers: <br></br> {Math.floor(dog.score / 600 * 100)}%</h4>
          <a href={dog.link}>Read More</a>
        </div>
      </div>
    ))}
  </div>
  </>
  )
}

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    let shuldAllPass = true
    console.log(Array.from(6));
    [0, 1, 2, 3, 4, 5, 6].some((i) => {
      if (!answers[i]) {
        handleNext(i);
        shuldAllPass = false
        return true;
      }
    });
    setShowResult(shuldAllPass)
  };
  const [checked, setChecked] = useState([]);
  const [answers, setAnswer] = useState([]);
  const [showResult, setShowResult] = useState(false)
  const handleAnswer = (e) => {
    setAnswer((prevState) => ({
      ...prevState,
      [e.target.name]: data[e.target.name].answers.find(
        (dog) => dog.ans == e.target.value
      ),
    }));

    setChecked((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };
  const handleNext = (index) => {
    document
      .getElementById(index)
      .scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
  };
  // useEffect(() => {
  //   console.log(answers);
  // }, [answers]);
  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      {data.map((q, index) => (
        <div id={index} className="full">
          <h1 className="title">{index + 1 + ". " + q.question}</h1>

          {q.answers.map((a) => (
            <>
              <label htmlFor={a.ans}>{a.ans}</label>
              <input
                type="checkbox"
                onChange={handleAnswer}
                name={index}
                checked={checked[index] == a.ans}
                value={a.ans}
                id={a.ans}
              />
            </>
          ))}
          <button onClick={() => handleNext(index + 1)}>Next</button>
        </div>
      ))}
      <button onClick={handleSubmit} type="submit">
        Get the answer
      </button>
      {/* </form> */}
      {showResult && <FinalDataComp answers={answers}></FinalDataComp>}
      
    </>
  );
}


export default App;
