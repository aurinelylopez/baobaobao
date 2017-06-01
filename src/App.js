import React, { Component } from 'react';
import QNA from './components/QNA';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink
} from 'react-router-dom';
import './App.css';
import Baoquestion from './components/Baoquestion';
import quiztime from './api/quiztime';
import Baoscore from './components/Baoscore';
import answerChoices from './components/answerchoices';
import Test from './components/Test';
import Post from './components/Post'
import Everything from './components/Everything';
let Create = () => {return <div>Create compoment for axios.post</div>}
let Quiz = () => {return <div><QNA /></div>}
let Home = () => {return <div>Home what ya want the front page to look like</div>}
let About = () => {return <div>About/Result page about can go on home</div>}
let contacts = () => {return <div>Contact</div>}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        User: 0,

      },
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerChoices = quiztime.map((question) => this.shuffleArray(question.answers));
    this.setState({
      question: quiztime[0].question,
      answerChoices: shuffledAnswerChoices[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quiztime.length) {
        setTimeout(() => this.setNextQuestion(), 300);
    } else {
        setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    {/*const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue + 1}
    });

    this.setState({
        answersCount: updatedAnswersCount,
        answer: answer
    });*/}
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
        counter: counter,
        questionId: questionId,
        question: quiztime[counter].question,
        answerOptions: quiztime[counter].answers,
        answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderTest() {
    return (
      <Test
        answer={this.state.answer}
        answerchoices={this.state.answerChoices}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.answerChoices.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return (
      {/*<Result testResult={this.state.result} />*/}
    );
  }

render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
           <h2>BAO BAO BAO</h2>
          </div> {this.renderTest()}
         {/* <QNA />*/}
        {/* <One2 />*/}
        <Post/>
         <ul>
          <li className="home"><Link to="/">Home</Link></li>&nbsp;&nbsp;
          <li className="about"><Link to="/about">About/Result</Link></li>&nbsp;&nbsp;
          <li className="quiz"><Link to="/quiz">Quiz</Link></li>&nbsp;&nbsp;
          <li className="create"><Link to="/create">Create</Link></li>
          <Route path="/" exact component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/quiz" component={Quiz}></Route>
          <Route path="/create" component={Create}></Route>
         </ul>
       </div>
      </Router>
      
    );
  }
}
export default App;