import { createSlice } from "@reduxjs/toolkit";
import { FILES, Pieces, RANKS } from "../../components/Constants";
import { determineWinner, getRawCoordinates } from "../../components/helpers";

import attackerWinsAudio from "../../assets/audio/attacker-wins.mp3";
import bellSingleAudio from "../../assets/audio/bell-single.mp3";
import defenderWinsAudio from "../../assets/audio/defender-wins.mp3";
import drawAudio from "../../assets/audio/draw.mp3";
import moveEmptyAudio from "../../assets/audio/move-empty.mp3";
import swapAudio from "../../assets/audio/swap.mp3";
import winAudio from "../../assets/audio/win.mp3";

const initialRanks = Array.from({ length: RANKS }, () =>
  Array.from({ length: FILES }, () => ({ piece: null }))
);

const audioFiles = {};

// Place the white pieces in a straight line.
Pieces.WHITE.forEach((piece, file) => {
  let rank = 0;
  if (file < 9) {
    rank = 0;
  } else if (file < 18) {
    rank = 1;
    file -= 9;
  } else {
    rank = 2;
    file -= 18;
  }
  initialRanks[rank][file].piece = piece;
});

// Place the black pieces in a straight line.
Pieces.BLACK.forEach((piece, file) => {
  let rank = 7;
  if (file < 9) {
    rank = 7;
  } else if (file < 18) {
    rank = 6;
    file -= 9;
  } else {
    rank = 5;
    file -= 18;
  }
  initialRanks[rank][file].piece = piece;
});

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    showCoordinates: false,
    colorToMove: null,
    colorToSetup: "WHITE",
    winner: null,
    hasFlagInLastRank: null,
    lastMoveSrc: null,
    lastMoveDest: null,
    hiddenColor: "BLACK",
    numberMode: false,
    activeTab: "HELP",
    capturedPieces: [],
    board: {
      show: true,
      ranks: initialRanks,
    },
  },
  reducers: {
    setShowCoordinates(state, action) {
      state.showCoordinates = action.payload.showCoordinates;
    },
    toggleColorToMove(state, action) {
      if (state.colorToSetup === null) {
        if (action.payload) {
          state.colorToMove = action.payload.colorToMove;
        }
        state.colorToMove = state.colorToMove === "WHITE" ? "BLACK" : "WHITE";
      }
    },
    movePiece(state, action) {
      const { dest, src, piece } = action.payload;
      const [srcX, srcY] = getRawCoordinates(src);
      const [destX, destY] = getRawCoordinates(dest);

      // Swap pieces when in setup mode.
      if (state.colorToSetup === piece.color) {
        const temp = state.board.ranks[srcX][srcY];
        state.board.ranks[srcX][srcY] = state.board.ranks[destX][destY];
        state.board.ranks[destX][destY] = temp;
        new Audio(swapAudio).play();
      } else {
        // Firstly, the source square is emptied.
        state.board.ranks[srcX][srcY].piece = null;

        // The "winner" is then determined to occupy the destination square.
        const attacker = piece;
        const defender = state.board.ranks[destX][destY].piece;
        const winner = determineWinner(attacker, defender);

        if (winner === null) {
          state.capturedPieces.push({ ...attacker });
          state.capturedPieces.push({ ...defender });
        } else if (winner === attacker && defender !== null) {
          state.capturedPieces.push(defender);
        } else if (winner === defender && attacker !== null) {
          state.capturedPieces.push(attacker);
        }
        state.board.ranks[destX][destY].piece = winner;

        // Highlight the source and destination
        state.lastMoveSrc = src;
        state.lastMoveDest = dest;

        // Check if flag related state can be toggled.
        if (defender !== null) {
          const attackerIsFlag = winner === attacker && defender.rank === 0;
          const defenderIsFlag = winner === defender && attacker.rank === 0;
          if (attackerIsFlag || defenderIsFlag) {
            state.winner = winner.color;
            state.hasFlagInLastRank = null;
          }
        } else if (
          state.hasFlagInLastRank === null &&
          attacker === winner &&
          winner.rank === 0
        ) {
          const blackFlagInLastRank =
            dest[1] === "1" && winner.color === "BLACK";
          const whiteFlagInLastRank =
            dest[1] === "8" && winner.color === "WHITE";
          if (blackFlagInLastRank || whiteFlagInLastRank) {
            state.hasFlagInLastRank = winner.color;
          }
        }

        let audioPath = null;
        if (state.winner) {
          audioPath = winAudio;
        } else if (defender === null) {
          audioPath = moveEmptyAudio;
        } else if (winner === attacker) {
          audioPath = attackerWinsAudio;
        } else if (winner === defender) {
          audioPath = defenderWinsAudio;
        } else if (winner === null) {
          audioPath = drawAudio;
        }
        new Audio(audioPath).play();
      }
    },
    checkIfLastRankFlagWins(state, action) {
      // If it's your turn and you already have the flag in the last rank, you win.
      if (state.colorToMove === state.hasFlagInLastRank) {
        state.winner = state.colorToMove;
      }
    },
    setColorToSetup(state, action) {
      state.colorToSetup = action.payload.color;
      new Audio(bellSingleAudio).play();
    },
    toggleShowBoard(state, action) {
      if (state.winner) {
        return;
      }

      if (action.payload) {
        state.board.show = action.payload.board.show;
      } else {
        state.board.show = !state.board.show;
      }
      new Audio(bellSingleAudio).play();
    },
    setHiddenColor(state, action) {
      state.hiddenColor = action.payload.color;
    },
    setNumberMode(state, action) {
      state.numberMode = action.payload.numberMode;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload.activeTab;
    },
  },
});

export const {
  setShowCoordinates,
  toggleColorToMove,
  movePiece,
  checkIfLastRankFlagWins,
  setColorToSetup,
  toggleShowBoard,
  setHiddenColor,
  setNumberMode,
  setActiveTab,
} = gameSlice.actions;

export default gameSlice.reducer;
