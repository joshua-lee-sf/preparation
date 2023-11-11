describe("Code", function () {
    var code;
  
    beforeEach(function () {
      code = new Code(["R", "G", "R", "B"]);
    });
  
    describe("Code.PossiblePegs", function () {
      it("should be an object containing letters as keys and colors as values", function () {
        expect(Code.PossiblePegs).toEqual({
          "R": "red",
          "G": "green",
          "B": "blue",
          "Y": "yellow"
        });
      });
    });
  
    describe("PART 1", function () {
      describe("Code.validPegs", function () {
        it("should accept an array of chars as an argument", function () {
          Code.validPegs(["B", "Y", "G", "G"]);
        });
  
        describe("when all chars of the array are in Code.POSSIBLE_PEGS", function () {
          it("should return true", function () {
            expect(Code.validPegs(["B", "Y", "G", "G"])).toBe(true);
            expect(Code.validPegs(["b", "y", "g", "g"])).toBe(true);
          });
        });
  
        describe("when a char of the array is not in Code.POSSIBLE_PEGS", function () {
          it("should return false", function () {
            expect(Code.validPegs(["B", "Y", "Z", "G"])).toBe(false);
          });
        });
      });
  
      describe("Code.prototype.constructor", function () {
        it("should accept an array of chars representing pegs as an argument", function () {
          code;
        });
  
        it("should call Code.validPegs", function () {
          spyOn(Code, "validPegs").and.returnValue(true);
          code = new Code(["R", "G", "R", "B"]);
          expect(Code.validPegs).toHaveBeenCalled();
        });
  
        describe("when the array does not contain valid pegs", function () {
          it("should throw an error", function () {
            expect(function () {
              new Code(["B", "Y", "Z", "G"]);
            }).toThrow();
          });
        });
  
        describe("when the array contains valid pegs", function () {
          it("should set @pegs to an array of chars from the argument", function () {
            expect(code.pegs).toEqual(["R", "G", "R", "B"]);
          });
  
          it("should convert lowercase chars of the argument to uppercase in @pegs", function () {
            code = new Code(["r", "g", "r", "b"]);
            expect(code.pegs).toEqual(["R", "G", "R", "B"]);
          });
        });
      });
  
      describe("Code.prototype.pegs", function () {
        it("should get (return) @pegs", function () {
          expect(code.pegs).toBe(code.pegs);
        });
      });
  
      describe("Code.random", function () {
        it("should accept a length (number) as an argument", function () {
          Code.random(5);
        });
  
        it("should call new Code() with an array of the given length containing random pegs", function () {
          spyOn(Code, "new");
          Code.random(5);
          expect(Code.new).toHaveBeenCalledWith(jasmine.any(Array));
        });
  
        it("should return a Code instance with a randomized pegs array of the given length", function () {
          var randomCode = Code.random(5);
          expect(randomCode instanceof Code).toBe(true);
          expect(randomCode.pegs.length).toBe(5);
        });
      });
  
      describe("Code.fromString", function () {
        it("should accept a string representing pegs as an argument", function () {
          Code.fromString("GBGB");
        });
  
        it("should call new Code() with an array of chars", function () {
          spyOn(Code, "new");
          Code.fromString("GBGB");
          expect(Code.new).toHaveBeenCalledWith(jasmine.any(Array));
        });
  
        it("should return a Code instance with pegs colors given by the chars of the string", function () {
          var codeFromString = Code.fromString("GBGB");
          expect(codeFromString instanceof Code).toBe(true);
          expect(codeFromString.pegs).toEqual(["G", "B", "G", "B"]);
        });
      });
  
      describe("Code.prototype.at", function () {
        it("should accept an index as an argument", function () {
          code.at(1);
        });
  
        it("should return the element of @pegs at the given index", function () {
          expect(code.at(1)).toEqual("G");
          expect(code.at(2)).toEqual("R");
        });
      });
  
      describe("Code.prototype.length", function () {
        it("should return the length of this.pegs", function () {
          expect(code.length).toEqual(4);
        });
      });
    });
  
    describe("PART 2", function () {
      describe("Code.prototype.numExactMatches", function () {
        it("should accept a Code instance representing a guess", function () {
          code.numExactMatches(new Code(["R", "Y", "Y", "B"]));
        });
  
        it("should return the number of pegs in the guess that are the correct color and position as @pegs", function () {
          expect(code.numExactMatches(new Code(["R", "R", "Y", "B"]))).toEqual(2);
          expect(code.numExactMatches(new Code(["Y", "B", "Y", "B"]))).toEqual(1);
          expect(code.numExactMatches(new Code(["Y", "Y", "Y", "Y"]))).toEqual(0);
        });
      });
  
      describe("Code.prototype.numNearMatches", function () {
        it("should accept a Code instance representing a guess", function () {
          code.numNearMatches(new Code(["B", "R", "Y", "Y"]));
        });
  
        it("should return the number of pegs in the guess that are the correct color but incorrect position compared to @pegs", function () {
          expect(code.numNearMatches(new Code(["B", "R", "Y", "Y"]))).toEqual(2);
        });
  
        it("should not include exact matches", function () {
          expect(code.numNearMatches(new Code(["R", "G", "B", "B"]))).toEqual(0);
          expect(code.numNearMatches(new Code(["R", "R", "B", "B"]))).toEqual(1);
          expect(code.numNearMatches(new Code(["G", "R", "R", "R"]))).toEqual(2);
        });
      });
  
      describe("Code.prototype.equals", function () {
        it("should accept another Code instance as an argument", function () {
          var otherCode = new Code(["R", "G", "R", "B"]);
          code.equals(otherCode);
        });
  
        it("should return a boolean indicating whether the argument exactly matches self", function () {
          var sameCode = new Code(["R", "G", "R", "B"]);
          expect(code.equals(sameCode)).toBe(true);
  
          sameCode = new Code(["R", "G", "Y", "Y"]);
          expect(code.equals(sameCode)).toBe(false);
        });
  
        it("should return false if the argument has a different length from self", function () {
          var otherCode = new Code(["R", "G", "R", "B", "B"]);
          expect(code.equals(otherCode)).toBe(false);
        });
      });
    });
  });