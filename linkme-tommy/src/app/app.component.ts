import { Component, OnInit } from '@angular/core';
import Board, {Square} from './board.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  board!: Board;
  turn: boolean = false
  ngOnInit() {
    let squares:Square[][] = [[Square.none, Square.none, Square.none],
                              [Square.none, Square.none, Square.none],
                              [Square.none, Square.none, Square.none]]  
    this.board = new Board(squares)
  }

  gameOver(){
    let value = this.findWinner(this.board.board,3)
    switch (value) {
      case 0: {
        return "Winner is X"
      }
      case 1: {
        return "Winner is O"
      }
      default: {
        if(this.boardIsFull(this.board.board)) {
          return "You're Both Losers!"
        }
        return " "
      }
    }
  }

  onClick(row:number, column:number) {
    if(this.turn == false) {
      this.markSquare(row,column,Square.o)
    }
    else {
      this.markSquare(row,column,Square.x)
    }
    this.turn = !this.turn
  }

  squareAt(row:number, column:number) {
    let value = this.board.board[row][column];
    switch (value) {
      case 0: {
        return "X"
      }
      case 1: {
        return "O"
      }
      default: {
        return "_"
      }
    }
  }

  markSquare(row:number,column:number, value: Square) {
    this.board.board[row][column] = value
    let winner = this.findWinner(this.board.board, 3)
    return winner
  }

  boardIsFull(board: Square[][]) {
    let isFull = true;

    full: for (let row = 0; row < board.length; ++row) {
        for (let col = 0; col < board.length; ++col) {
            if (board[row][col] == Square.none) {
                isFull = false;
                break full;
            }
        }
    }
    return isFull
  }

  findWinner(board: Square[][],lengthToWin: number) {
    // Check each lengthToWin x lengthToWin board for a winner.    
    for (let top = 0; top <= board.length - lengthToWin; ++top) {
        let bottom = top + lengthToWin - 1;

        for (let left = 0; left <= board.length - lengthToWin; ++left) {
            let right = left + lengthToWin - 1;

            // Check each row.
            nextRow: for (let row = top; row <= bottom; ++row) {
                if (board[row][left] == Square.none) {
                    continue;
                }

                for (let col = left; col <= right; ++col) {
                    if (board[row][col] != board[row][left]) {
                        continue nextRow;
                    }
                }

                return board[row][left];
            }

            // Check each column.
            nextCol: for (let col = left; col <= right; ++col) {
                if (board[top][col] == Square.none) {
                    continue;
                }

                for (let row = top; row <= bottom; ++row) {
                    if (board[row][col] != board[top][col]) {
                        continue nextCol;
                    }
                }

                return board[top][col];
            }

            // Check top-left to bottom-right diagonal.
            diag1: if (board[top][left] != Square.none) {
                for (let i = 1; i < lengthToWin; ++i) {
                    if (board[top+i][left+i] != board[top][left]) {
                        break diag1;
                    }
                }

                return board[top][left];
            }

            // Check top-right to bottom-left diagonal.
            diag2: if (board[top][right] != Square.none) {
                for (let i = 1; i < lengthToWin; ++i) {
                    if (board[top+i][right-i] != board[top][right]) {
                        break diag2;
                    }
                }

                return board[top][right];
            }
        }
    }    

    // The board is full.
    if (this.boardIsFull(board)) {
        return Square.none;
    }
    // The board is not full and we didn't find a solution.
    else {
        return null;
    }
  }
}



