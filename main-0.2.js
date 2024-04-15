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

let legalPositions = [];

// ---------------------------------------------------


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