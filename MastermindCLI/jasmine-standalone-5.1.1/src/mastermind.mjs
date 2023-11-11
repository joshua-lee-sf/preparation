import Code from './code.mjs';
import ReadLine  from 'readline';

const READER = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
})


class Mastermind{
    
    
    constructor(length){
        this.secretCode = Code.random(length);
    };

    askUserForGuess(){
        READER.question('Enter a code: ', (code) => {
            let guessCode = Code.fromString(code);
            this.printMatches(guessCode);
            return this.secretCode.equals(guessCode);
        })
    }

    printMatches(guessCode){
        const nearMatches = this.secretCode.numNearMatches(guessCode);
        const exactMatches = this.secretCode.numExactMatches(guessCode);

        console.log(`Exact Matches: ${exactMatches}`);
        console.log(`Near Matches: ${nearMatches}`)
    }

}

export default Mastermind;