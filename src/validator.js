class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  getBoard(sudoku) { // function that splits sudoku board into 2D array
    const split = sudoku.split('\n').filter(item => item !== '') // splits sudoku string into array of its rows and filters out empty rows

    const board = [] // array that will store rows

    split.forEach((row, rowIndex) => { // forEach loop that goes through split variable
      if (rowIndex === 3 || rowIndex === 7) { // the 4th and 7th lines don't store numbers, so we skip them
        return
      }

      let rowFiltered = [] // array that will store current row (split[i]) filtered values

      for (let valueIndex = 0; valueIndex < row.length; valueIndex++) { // for loop that goes through row (split[i]) values
        if (row[valueIndex] !== ' ' && row[valueIndex] !== '|') { // if row value is not a number than it will be added to rowFiltered array
          rowFiltered.push(row[valueIndex])
        }
      }

      board.push(rowFiltered) // pushing rowFiltered into board array
    })

    return board // return board
  }

  isNumeric(value) { // function that checks if the value is the Integer
    return /^-?\d+$/.test(value);
  }

  validateUniqueNumbers(array) { // function that checks if all numbers in the row are unique
    const digits = array.filter(value => value !== '0') // filter out all '0' in the row
    // if all values are unique, then length of the original and filtered ([...new Set(digits)]) arrays should be equal
    return digits.length === [...new Set(digits)].length
  }

  validateNumbersRange(value) { // function that checks if only integers in range from 0 to 9 are used
    if (!this.isNumeric(value) || parseInt(value) < 0 || parseInt(value) > 9) {
      return false // if value is not an integer or is not in range from 0 to 9, then return false
    }

    return true
  }

  isValid(board) { // function that checks if sudoku is valid
    const validated = [] // array that will store bool values of all validations
    const squares = new Array(board.length) // 2D array that will store arrays of sudoku 3x3 squares

    for (let i = 0; i < squares.length; i++) { // populate squares array with arrays
      squares[i] = []
    }

    board.forEach((row) => { // validate if only integers in range from 0 to 9 are used to fill out the game board
      row.forEach((value) => {
        validated.push(this.validateNumbersRange(value))
      })
    })

    board.forEach((row, rowIndex) => {
      validated.push(this.validateUniqueNumbers(row)) // validate if all values in row are unique

      const column = [] // array that will store column values
      for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
        column.push(board[columnIndex][rowIndex])
      }

      validated.push(this.validateUniqueNumbers(column)) // validate if all values in column are unique
    })

    board.forEach((row, rowIndex) => { // forEach loop that goes through rows
      row.forEach((value, valueIndex) => { // forEach loop tha goes through row values
        let squareRow = 0 // if row index is 0-2 and value index is 0-2 then values will be stored in 1st square

        if (rowIndex >= 3 && rowIndex <= 5) {
          squareRow = 1 // if row index is 3-5 and value index is 0-2 then values will be stored in 2nd square
        } else if (rowIndex >= 6) {
          squareRow = 2 // if row index is 6-8 and value index is 0-2 then values will be stored in 3rd square
        }

        if (valueIndex >= 3 && valueIndex <= 5) {
          squareRow += 3 // if value index is 3-5 then values will be stored in 4th - 6th squares
        } else if (valueIndex >= 6) {
          squareRow += 6 // if value index is 6-8 then values will be stored in 7th - 9th squares
        }

        squares[squareRow].push(value) // adding value to the certain square
      })
    })

    squares.forEach((square) => {
      validated.push(this.validateUniqueNumbers(square)) // validate if all values in square are unique
    })

    return validated.every(value => value === true) // return true if all validations are passed, and false if not
  }

  validate(sudoku) {
    const board = this.getBoard(sudoku) // getting the game board as a 2D array

    if (!this.isValid(board)) { // validating the game board
      return 'Sudoku is invalid.'
    }

    if (sudoku.includes('0')) { // check if the game board is valid bun incomplete
      return 'Sudoku is valid but incomplete.'
    }

    return 'Sudoku is valid.' // return if the game board is valid
  }
}

module.exports = Validator
