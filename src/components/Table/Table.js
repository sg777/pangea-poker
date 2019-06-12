import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import theme from "../../styles/theme";
import Backgrounds from "./Backgrounds";
import { PlayerGrid9Max } from "../PlayerGrid";
import Player from "../Player";
import Board from "../Board";
import Dealer from "../Dealer";
import TotalPot from "./TotalPot";
import { ChipGrid, Bet } from "../Chips";

const Table = () => {
  const [players, setPlayers] = useState({
    "player-1": {
      isPlaying: true,
      seat: "player-1",
      chips: 783900,
      hasCards: true,
      showCards: false,
      isBetting: true,
      betAmount: 27500
    },
    "player-2": {
      isPlaying: true,
      seat: "player-2",
      chips: 65984,
      hasCards: true,
      showCards: false,
      isBetting: true,
      betAmount: 5249
    },
    "player-3": {
      isPlaying: true,
      seat: "player-3",
      chips: 677854,
      hasCards: true,
      showCards: false,
      isBetting: true,
      betAmount: 13980
    },
    "player-4": {
      isPlaying: true,
      seat: "player-4",
      chips: 900999,
      hasCards: true,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    "player-5": {
      isPlaying: true,
      seat: "player-5",
      chips: 10008942,
      hasCards: true,
      showCards: true,
      isBetting: true,
      betAmount: 1000000
    },
    "player-6": {
      isPlaying: true,
      seat: "player-6",
      chips: 78400,
      hasCards: true,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    "player-7": {
      isPlaying: true,
      seat: "player-7",
      chips: 800800,
      hasCards: true,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    "player-8": {
      isPlaying: true,
      seat: "player-8",
      chips: 12000,
      hasCards: true,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    },
    "player-9": {
      isPlaying: true,
      seat: "player-9",
      chips: 650000,
      hasCards: true,
      showCards: false,
      isBetting: false,
      betAmount: 1000
    }
  });

  const [myCards, setMyCards] = useState(["Ac", "Kc"]);

  const [board, setBoard] = useState({
    flop: ["Kh", "7c", "8c"],
    turn: "Kd",
    river: "8s"
  });

  const [pot, setPot] = useState(5691200);
  const [dealer, setDealer] = useState("player-1");
  const [activePlayer, setActivePlayer] = useState("player-1");

  return (
    <div
      css={css`
        background-color: ${theme.moon.colors.dark};
        height: 37.5rem;
        width: 50rem;
        position: relative;
      `}
    >
      <div
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
        `}
      >
        <TotalPot pot={pot} />
        <Board flop={board.flop} turn={board.turn} river={board.river} />
        <PlayerGrid9Max>
          {Object.values(players).map(
            player =>
              player.isPlaying && (
                <Player
                  seat={player.seat}
                  hasCards={player.hasCards}
                  chips={player.chips}
                  showCards={player.showCards}
                  myCards={myCards}
                  key={player.seat}
                  isActive={activePlayer === player.seat}
                  setPlayers={setPlayers}
                  players={players}
                  setActivePlayer={setActivePlayer}
                />
              )
          )}
        </PlayerGrid9Max>
        <ChipGrid>
          {Object.values(players).map(
            player =>
              player.isBetting && (
                <Bet
                  forPlayer={player.seat}
                  betAmount={player.betAmount}
                  key={player.seat}
                />
              )
          )}
        </ChipGrid>
        <Dealer dealer={dealer} />
      </div>
      <Backgrounds />
    </div>
  );
};

export default Table;
