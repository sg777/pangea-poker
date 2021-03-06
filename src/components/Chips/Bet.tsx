import { css } from "@emotion/core";
import numberWithCommas from "../../lib/numberWithCommas";
import Stack from "./Stack";

// This component shows a stack of chips and the corresponding amount next to it. Used to show player bets and the main pot.

interface IProps {
  betAmount: number;
  chipsCollected?: boolean;
  forPlayer?: string;
  playerBet?: boolean;
}

const Bet: React.FunctionComponent<IProps> = ({
  betAmount,
  chipsCollected,
  forPlayer,
  playerBet
}) => {
  return (
    <span
      css={css`
        align-items: center;
        display: grid;
        grid-area: ${forPlayer};
        position: relative;
        opacity: ${playerBet && chipsCollected ? 0 : 1};
        ${forPlayer === "player2" || forPlayer === "player3"
          ? "grid-template-columns: 4rem 1.25rem; left: -3.5rem;"
          : "grid-template-columns: 1.25rem 4rem;"}

        transition-delay: 0.4s;
      `}
      data-test={"bet"}
    >
      <span
        css={css`
          ${forPlayer === "player2" || forPlayer === "player3"
            ? "order: 2;"
            : "order: 1;"}
        `}
      >
        <Stack chips={betAmount} />
      </span>
      {/* Bet amount in numbers */}
      <span
        css={css`
          color: var(--color-text);
          font-size: var(--font-size-xxs);
          padding: 0 0 0.5rem 0.3rem;
          position: relative;
          order: 1;
          opacity: ${playerBet && chipsCollected ? 0 : 1};
          ${forPlayer === "player2" || forPlayer === "player3"
            ? "padding-right: 0.3rem; text-align: right; order: 1;"
            : ""};
        `}
      >
        {numberWithCommas(betAmount)}
      </span>
    </span>
  );
};

export default Bet;
