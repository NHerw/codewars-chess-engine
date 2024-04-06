/*
	iterate chessboard
	if piece found -> depending on piece:
		is king on diagonal
		is king on horizontal
		is king on vertical
		is other piece is between two pieces
		is king in range of piece (pawn, knight) 


   REWRITE:
      add all legal positions for all pieces except king
      check if king is in one of them
*/
const chessboard = [
   [" ", " ", " ", " ", " ", " ", " ", " "],
   [" ", " ", " ", " ", " ", " ", " ", " "],
   [" ", " ", " ", " ", " ", " ", " ", " "],
   [" ", " ", " ", " ", " ", " ", " ", " "],
   ["♜", " ", "♝", "♔", " ", " ", " ", " "],
   [" ", " ", " ", " ", " ", " ", " ", " "],
   [" ", " ", " ", " ", " ", " ", " ", " "],
   [" ", " ", " ", " ", " ", " ", " ", " "],
];

const kingPosition = getPiecePosition("♔");

console.log(isDiagonalCheck(getPiecePosition("♝")));

// isHorizontalCheck(getPiecePosition("♜"), getPiecePosition("♔"));

// kingIsInCheck(chessboard);

// ---------------------------------------------------

function kingIsInCheck(chessboard) {
   for (let x of chessboard) {
      for (let y of x) {
         if (y.length > 0) {
            if (isPieceCheckingKing(y) === true) {
               return true;
            }
         }
      }
   }
   return false;
}

function isPieceCheckingKing(piece) {
   switch (piece) {
      case piece === "♛":
         return isHorizontalCheck() || isVerticalCheck() || isDiagonalCheck();
      case piece === "♝":
         return isDiagonalCheck(piece);
      case piece === "♞":
         return;
      case piece === "♜":
         return isHorizontalCheck() || isVerticalCheck();
      case piece === "♟":
         return;
   }
}

function isHorizontalCheck(piece, king) {
   if (piece.y !== king.y) return false;
   // is there another piece between piece and king?
   if (
      chessboard[piece.y]
         .slice(Math.min(piece.x, king.x), Math.max(piece.x, king.x) + 1)
         .filter((e) => e.length > 0).length > 2
   ) {
      return false;
   } else {
      return true;
   }
}

function isVerticalCheck(piece) {
   if (piece.x !== kingPosition.x) return false;
   if (
      chessboard[piece.x]
         .slice(
            Math.min(piece.y, kingPosition.y),
            Math.max(piece.y, kingPosition.y) + 1
         )
         .filter((e) => e.length > 0).length > 2
   ) {
      return false;
   } else {
      return true;
   }
}

function isDiagonalCheck(piece) {
   let mainDiagonalArr = [];
   let antiDiagonalArr = [];

   mainDiagonalArr = getMainDiagonalArrayOfPiece(piece);

   antiDiagonalArr = getAntiDiagonalArrayOfPiece(piece);

   // is king not in diagonal at all?
   if (
      mainDiagonalArr.indexOf("♔") === -1 &&
      antiDiagonalArr.indexOf("♔") === -1
   ) {
      return false;
   }

   // if (
      //    mainDiagonalArr.filter((e) => e !== " ").length > 2 ||
      //    antiDiagonalArr.filter((e) => e !== " ").length > 2
      // ) {
         //    return true;
         // }
         
   // is king in check
   if (mainDiagonalArr.indexOf("♔") !== -1) {
      
   }

   return false;
}

function getMainDiagonalArrayOfPiece(piece) {
   // calculate top leftmost position of diagonal
   let mainDiagonalArr = [];
   let currPos = Object.assign({}, piece);
   while (currPos.x > 0 && currPos.y > 0) {
      currPos.x--;
      currPos.y--;
      // console.log(`currPos:`, currPos);
   }
   // console.log(`currPos:`, currPos);

   // add all elements of diagonal from top left to bottom right
   // of diagonal to array
   while (currPos.x < 8 && currPos.y < 8) {
      mainDiagonalArr.push(chessboard[currPos.y][currPos.x]);
      // console.log(`currPos:`, currPos);
      currPos.x++;
      currPos.y++;
      // console.log(`piece:`, piece);
   }

   //return diagonal elements as array
   console.log(arguments.callee.name, `mainDiagonalArr: `, mainDiagonalArr);
   return mainDiagonalArr;
}

function getAntiDiagonalArrayOfPiece(piece) {
   let antiDiagonalArr = [];
   // console.log(`piece:`, piece);

   let currPos = Object.assign({}, piece);
   while (currPos.x > 0 && currPos.y < 8) {
      currPos.x--;
      currPos.y++;
      // console.log(`currPos:`, currPos);
   }

   while (currPos.x < 8 && currPos.y > -1) {
      antiDiagonalArr.push(chessboard[currPos.y][currPos.x]);
      // console.log(`currPos:`, currPos);
      currPos.x++;
      currPos.y--;
   }
   console.log(arguments.callee.name, `antiDiagonalArr: `, antiDiagonalArr);

   return antiDiagonalArr;
}

// return piece position as {x, y}
function getPiecePosition(piece) {
   let result = {};

   // console.log(chessboard);
   result.y = chessboard.findIndex((e) => {
      return e.find((f) => {
         if (f === piece) {
            result.x = e.indexOf(f);
            return f;
         }
      });
   });

   // console.log(`[${arguments.callee.name}] piece: ${piece}`, result);
   return result;
}
