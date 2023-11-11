// Import necessary modules/classes (assuming they are properly implemented)

describe('Mastermind', () => {
  let mastermind;

  beforeEach(() => {
    mastermind = new Mastermind(4);
    mastermind.secretCode = new Code(['R', 'G', 'R', 'B']);
  });

  describe('PART 3', () => {
    describe('#initialize', () => {
      it('should accept a length (number) as an argument', () => {
        mastermind;
      });

      it('should set @secretCode to a random Code instance of the given length', () => {
        spyOn(Code, 'random').and.returnValue(new Code(['R', 'G', 'R', 'B']));

        expect(Code.random).toHaveBeenCalledWith(4);
        expect(mastermind.secretCode).toBeInstanceOf(Code);

        spyOn(Code, 'random').and.returnValue(new Code(['R', 'G', 'R', 'B', 'Y']));

        expect(Code.random).toHaveBeenCalledWith(5);
        expect(mastermind.secretCode).toBeInstanceOf(Code);
      });
    });

    describe('#printMatches', () => {
      it('should accept a Code instance as an argument', () => {
        mastermind.printMatches(new Code(['R', 'Y', 'G', 'B']));
      });

      it('should print the number of exact matches between @secretCode and the argument', () => {
        const code = new Code(['R', 'Y', 'Y', 'B']);
        spyOn(console, 'log');

        mastermind.printMatches(code);
        expect(console.log).toHaveBeenCalledWith(/2/);
      });

      it('should print the number of near matches between @secretCode and the argument', () => {
        const code = new Code(['Y', 'Y', 'Y', 'G']);
        spyOn(console, 'log');

        mastermind.printMatches(code);
        expect(console.log).toHaveBeenCalledWith(/1/);
      });
    });

    describe('#askUserForGuess', () => {
      it('should print "Enter a code"', () => {
        spyOn(console, 'log');
        spyOn(mastermind, 'gets').and.returnValue('RGRB\n');

        mastermind.askUserForGuess();
        expect(console.log).toHaveBeenCalledWith(/Enter a code/);
      });

      it('should call gets.chomp to get input from the user', () => {
        spyOn(mastermind, 'gets').and.returnValue({ chomp: () => 'RGRB' });
        spyOn(console, 'log');

        mastermind.askUserForGuess();
        expect(console.log).toHaveBeenCalledWith(/Enter a code/);
      });

      it('should call Code.fromString with the user\'s entered string', () => {
        spyOn(mastermind, 'gets').and.returnValue({ chomp: () => 'RGRB' });
        spyOn(console, 'log');
        spyOn(Code, 'fromString').and.returnValue(new Code(['R', 'G', 'R', 'B']));

        mastermind.askUserForGuess();
        expect(Code.fromString).toHaveBeenCalledWith('RGRB');
      });

      it('should print the number of exact and near matches between @secretCode and the user\'s guessed code', () => {
        spyOn(mastermind, 'gets').and.returnValue({ chomp: () => 'RYYB' });
        spyOn(console, 'log');

        mastermind.askUserForGuess();
        expect(console.log).toHaveBeenCalledWith(/2/);
        expect(console.log).toHaveBeenCalledWith(/0/);
      });

      it('should return a boolean indicating whether the user\'s guessed code is equal to @secretCode', () => {
        spyOn(mastermind, 'gets').and.returnValue({ chomp: () => 'RGRB' });
        expect(mastermind.askUserForGuess()).toBe(true);

        spyOn(mastermind, 'gets').and.returnValue({ chomp: () => 'YYYY' });
        expect(mastermind.askUserForGuess()).toBe(false);
      });
    });
  });
});