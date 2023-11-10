
class Code {

    static PossiblePegs = {
        "R": "red",
        "G": "green",
        "B": "blue",
        "Y": "yellow"
    }
    
    static validPegs(charArray) {
        let count = 0
        charArray.forEach((char) => {
            if (Object.keys(Code.PossiblePegs).includes(char.toUpperCase())) {
                count++;
            }
        })
        return count === charArray.length;
    }

    static random(length) {
        const newArray = new Array(length);
        const keys = Object.keys(Code.PossiblePegs);

        for (let i = 0; i < length; i++){
            const randomIndex = Math.floor(Math.random() * (keys.length));
            newArray[i] = keys[randomIndex];
        }
        const newCode = new Code(newArray);
        return newCode;
    }

    static fromString(charString) {
        const charArray = charString.split('');
        const newCode = new Code(charArray);
        return newCode;
    }

    constructor(charArray){
        if (!Code.validPegs(charArray)) {
            throw new Error('Invalid Pegs');
        }
        this.pegs = charArray.map((char) => char.toUpperCase());
    }

    // pegs(){
    //     return this.pegs;
    // }

    length(){
        return this.pegs.length;
        console.log(this.pegs.length);
    }

    at(index){
        return this.pegs[index];
    }

    equals(guessCode){
        return guessCode.pegs === this.pegs;
    }

    numExactMatches(guessCode){
        const length = guessCode.length();
        let count = 0;

        for (let i = 0; i < length; i++){
            if (guessCode.at(i) === this.pegs.at(i)) {
                count++;
            }
        }
        return count;
    }

    numNearMatches(guessCode){
        let guessCodeDup = guessCode.pegs.slice();
        let correctCodeDup = this.pegs.slice();
        let i = 0;


        while (i < guessCodeDup.length) {
            if (guessCodeDup[i] === correctCodeDup[i]) {
                guessCodeDup[i] = null;
                correctCodeDup[i] = null;
            }
            i++;
        }

        let count = 0;
        for (let j = 0; j < guessCodeDup.length; j++){
            let curr = guessCodeDup[j];
            if (correctCodeDup.includes(curr) && curr !== null) {
                let pegIndex = correctCodeDup.indexOf(curr);
                correctCodeDup[pegIndex] = null;
                count++;
            }
        }

        return count;
    }
}