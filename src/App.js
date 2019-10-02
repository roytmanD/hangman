import React from 'react';

//side libs
import uuid from 'uuid';
import KeyboardEventHandler from 'react-keyboard-event-handler';

//redux
import {connect} from 'react-redux';
import FetchWord from './actions/FetchWord';
import RightChoice from './actions/RightChoice';
import WrongChoice from './actions/WrongChoice';
import RestartGame from './actions/RestartGame'

//hangman parts
import bar from './imgs/bar.png';
import corpus from './imgs/corpus.png';
import head from './imgs/head.png';
import left_arm from './imgs/left-arm.png';
import right_arm from './imgs/right-arm.png';
import left_foot from './imgs/left-foot.png';
import left_hand from './imgs/left-hand.png';
import left_leg from './imgs/left-leg.png';
import neck from './imgs/neck.png';

// import right_foot from './imgs/left-foot.png';
// import right_hand from './imgs/right-hand.png';
// import right_leg from './imgs/right-leg.png';

//SASS
import './sass/style.scss';

//components
import LetterContainer from './components/LetterContainer';

//returns img component that takes img and index to build img elements for each hangman's body part
let ImgContainer = (img, indx) => <img alt={img.substring(14, img.indexOf('.'))} key={uuid()} id={`${img.substring(14, img.indexOf('.'))}${indx}`} className="hangman-part-img" src={img}/>;

//array of hangman's body parts imported from src/imgs, map into ImgContainers
let hangmanParts = [
  bar,head,neck,corpus,right_arm,left_arm,left_hand,
  left_hand, left_leg, left_leg, left_foot,left_foot
].map((part, indx)=>ImgContainer(part,indx));

class App extends React.Component {

  //requests for a random word from Words API with min letters 14  and dispatches it to redux store
  fetchWord = () =>{
    fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true&lettersMin=14", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "d100b09489msh478d3b7259e31d0p1b18a8jsn2ef5200c0116"
      }
    })
    .then(response => response.json()).then(res=>{
      let word = res.word.split('');
      word.filter(el=>el!==' '|| el!=='-');
      let unguessed = word.filter(el=>el!==' '&&el!=='-');
      this.props.dispatch(FetchWord([word,unguessed]));
    });
  }
  componentDidMount = () => {
    this.fetchWord();
  }

  //returns as much hangman parts imgs as a current failed attempts number
  drawTheHangman = () =>{
    return hangmanParts.slice(0,this.props.attempts.failed.length);
  }

  //checks if the game is won OR failed
  isOver = () =>{
    return this.isFailed() || this.isWin()
  }

  //checks if failed
  isFailed = () =>{
    return this.props.attempts.failed.length > 11
  }

  //checks if won
  isWin = () => {
    return this.props.word.unguessed.length === 0 && this.props.word.letters.length !==0
  }

  //returns game-over title, new word btn, unguessed letters and shade-div
  handleGameOver = () =>{
    return(
      <div className="game-over-screen">
      <div className="unguessed-container">
      <p className="missed-title">{this.isFailed()? 'You missed:' : null}</p>
      <h1 className="unguessed-letters">{this.isFailed() ? Array.from(new Set(this.props.word.unguessed.filter(el=>el!=='-' ).filter(el=>el!==' '))).join(' ') : null}</h1>
      </div>

      <div className="game-over-container">
      <h1 className="game-over-title">{this.isWin() ? 'You WIN! ' : 'GAME OVER'}</h1>
      <button className="restart-btn" onClick={e=>this.restart(e)}>NEW WORD</button>
      </div>


      <div className='body-shadow'></div>
      </div>
    )}

    //restarts the game by dispatching an action that resets the store to initial value
    restart = (e) =>{
      e.preventDefault();
      // window.location.reload(false);//easy way to restart game
      this.props.dispatch(RestartGame);
      this.fetchWord();
    }

    render(){
      return (
        <div className="App">

        {/*component for handling alpabetic keys*/}
        <KeyboardEventHandler
        handleKeys={['alphabetic']}
        onKeyEvent={(key, e) =>{
          if(this.props.word.letters.includes(key)&&!this.isFailed()){
            this.props.dispatch(RightChoice(key));
          }else{
            this.props.dispatch(WrongChoice(key));
          }
        }} />
        <div className="hangman-container">
        {this.drawTheHangman()}
        <span className="letters-container">
        {this.props.word.letters.map(letter=>{
          return <LetterContainer data={this.props} key={uuid()} content={letter}/>
        })}
        </span>
        </div>

        {/*if game is over invoke handleGameOver func to return game over components*/}
        {this.isOver() ? this.handleGameOver() : null }

        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    word: state.word,
    attempts: state.attempts
  });

  export default connect(mapStateToProps)(App);
