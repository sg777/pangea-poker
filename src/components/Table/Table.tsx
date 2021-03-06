import { css } from "@emotion/core";
import { useReducer, useEffect, useState } from "react";
import diff from "deep-diff";
import reducer from "../../store/reducer";
import { StateContext, DispatchContext } from "../../store/context";
import initialState, { IPlayer, IState } from "../../store/initialState";
import Backgrounds from "./Backgrounds";
import { PlayerGrid9Max } from "../PlayerGrid";
import Player from "../Player";
import Board from "../Board";
import Dealer from "../Dealer";
import TotalPot from "./TotalPot";
import { ChipGrid, Bet } from "../Chips";
import Controls from "../Controls";
import MainPot from "./MainPot";
import Game from "../Game";
import Connections from "./Connections";
import { StartupModal } from "../Modal";
import DeveloperMode from "../DeveloperMode";
import LogBox from "../LogBox";
import Cashier from "../Cashier";

// This is the current Main component

const Table: React.FunctionComponent = () => {
  const [previousState, setPreviousState] = useState();
  const [state, dispatch]: [IState, Function] = useReducer(
    reducer,
    initialState
  );
  const {
    activePlayer,
    boardCards,
    chipsCollected,
    controls,
    dealer,
    gameType,
    gameTurn,
    handHistory,
    isDeveloperMode,
    isLogBox,
    nodeType,
    players,
    pot,
    options,
    showMainPot,
    showDealer,
    winner
  } = state;

  // For debugging purposes log the difference betweeen the last and current state
  useEffect(() => {
    const difference = diff(previousState, state);
    difference && difference.push(state);
    console.log(difference);
    setPreviousState(state);
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Game />
        {isDeveloperMode && <DeveloperMode />}
        <div
          css={css`
            background-color: var(--dark);
            height: 37.5rem;
            width: 50rem;
            position: relative;
          `}
        >
          <Connections />
          <div
            css={css`
              color: white;
              position: absolute;
              top: 0.25rem;
              left: 0.25rem;
              z-index: 4;
              font-size: var(--font-size-xs);
            `}
          >
            {gameType}
          </div>
          <div
            css={css`
              position: absolute;
              width: 100%;
              height: 100%;
              z-index: 1;
            `}
          >
            <div
              css={css`
                position: absolute;
              `}
            />
            {options.showPotCounter && (
              <TotalPot state={state} dispatch={dispatch} />
            )}
            <Board boardCards={boardCards} gameTurn={gameTurn} />
            <PlayerGrid9Max>
              {nodeType === "player" &&
                Object.values(players).map(
                  (player: IPlayer) =>
                    player.isPlaying && (
                      <Player
                        chips={player.chips}
                        connected={player.connected}
                        hasCards={player.hasCards}
                        isActive={activePlayer && activePlayer == player.seat}
                        playerCards={player.playerCards}
                        players={players}
                        seat={player.seat}
                        showCards={player.showCards}
                        key={player.seat}
                        winner={winner}
                      />
                    )
                )}
            </PlayerGrid9Max>
            <ChipGrid chipsCollected={chipsCollected}>
              {Object.values(players).map(
                (player: IPlayer) =>
                  player.isBetting && (
                    <Bet
                      betAmount={player.betAmount}
                      forPlayer={player.seat}
                      chipsCollected={chipsCollected}
                      playerBet
                      key={player.seat}
                    />
                  )
              )}
            </ChipGrid>
            {showMainPot && pot[0] !== 0 && (
              <MainPot
                pot={pot}
                gameTurn={state.gameTurn}
                winners={state.winners}
              />
            )}
            {showDealer && <Dealer dealer={`player${dealer + 1}`} />}
            {isLogBox && <LogBox handHistory={handHistory} />}
            {controls.showControls && (
              <div>
                <Controls />
              </div>
            )}
          </div>

          <Cashier dispatch={dispatch} isOpen={true} state={state} />
          <Backgrounds />
        </div>
        <StartupModal
          dispatch={dispatch}
          isOpen={state.isStartupModal}
          state={state}
        />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
export default Table;
export { DispatchContext, StateContext };
