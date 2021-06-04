import React, { Component } from 'react'
import './App.css';

const Letter = ({ chr, index, onClick ,alreadyUsed}) => (
  <div className>
    <span className={`letter ${alreadyUsed && "alreadyUsed"}`} onClick={() => onClick(chr)}>
      {String.fromCharCode(chr)}
      {index}
    </span>
  </div>

)

const Unknown = ({ string, index, revealed }) => (
  <div>
    <span className="unknown">
      {revealed ? string : "_"}
      {index}
    </span>
  </div>

)

//LE STATE DOIT CONTENIR QUE DES VALEURS LIEE A LAFFICHAGE (DE PREFERENCE)

const wordToGuess = "reactjs";

const initalState = {
  wrong: 5,
  letters: [], //lettres a afficher en bas
  //wordToGuess: "rreactjs",
  wordTab: [], //lettre du mot a deviner en tableau, une par une
  unknownLetters: [], //composants unknown letters en masse
  usedLetters: []
}

class App extends Component {
  state = {
    ...initalState
  }

  getWordTab(word) {
    let result = word
      .split('');
    this.setState({ wordTab: result })

    let result2 = [];
    this.setState({ unknownLetters: result2 })
    for (let add in word) {
      result2.push(
        <Unknown
          string={word[add]}
          key={add}
          revealed={false}
        />)
    }
  }

  generateLetters() {
    let result = []
    for (let i = 97; i < 123; i++) {
      result.push(i)
    }
    this.setState({ letters: result })
    // return result;
  }

  checkVictory() {
    let victory = true;
    this.state.wordTab.forEach(elem => {
      if (!this.state.usedLetters.includes(elem)) { victory = false; }
    });
    return victory;

  }

  componentDidMount() {
    this.generateLetters()
    this.getWordTab(wordToGuess);
  }

  handleLetterClick = index => {
  //  const { letters } = this.state
//    const { wordTab } = this.state
 //   const { unknownLetters } = this.state
    let w = this.state.wrong
    this.alreadyUsed=true;
    let testLetter = String.fromCharCode(index);
    if (!this.state.wordTab.includes(testLetter)) {
      w--;
      this.setState({ wrong: w }, () => { if (this.state.wrong === 0) { alert("perdu !"); } });

    }

    console.log(testLetter)

    this.setState((prevState) => {
      return {
        ...prevState, usedLetters: [...prevState.usedLetters, testLetter] // <<< Push pour react
      }
    }, () => {
      if (this.checkVictory()) {
        alert("victoire ! Voici une nouvelle partie");
        this.setState(initalState,() => {
          this.generateLetters()
          this.getWordTab(wordToGuess)
        });
  
      }
    });

  }
  render() {
    const { letters } = this.state
    const { wordTab } = this.state
  //  const { unknownLetters } = this.state
    return (
      <div className="pendu">
        <div className="top">
          {wordTab.map((letter, index) => (
            <Unknown
              string={letter}
              key={index}
              revealed={this.state.usedLetters.includes(letter) ? true : false}//  pas obligé ca marche sponanement sans le ?:
            />
          ))}
        </div>

        <div className="bottom">

          {letters.map((letter, index) => (
            <Letter
              chr={letter}
              key={index}
              onClick={() => this.handleLetterClick(letter)}
              alreadyUsed={this.state.usedLetters.includes(String.fromCharCode(letter))}
            />
          ))}

        </div>
      </div>
    );
  }
}

export default App;
