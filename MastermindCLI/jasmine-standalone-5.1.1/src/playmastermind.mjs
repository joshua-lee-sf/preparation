import Mastermind from "./mastermind.mjs";
import Readline from 'readline';

const reader = Readline.Interface({
    input: process.stdin,
    output: process.stdout
});

const length = reader.question('Please enter code length: ', (codeLength) => {
    const newGame = new Mastermind(codeLength)
    while(!newGame.askUserForGuess()){
        if (newGame.askUserForGuess()){
            reader.close();
        } else {
            console.log("--------------------");
            newGame.askUserForGuess();
        }
    }
    console.log('You win');
})


