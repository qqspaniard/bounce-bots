import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Puzzle, Cell, Bot, Goal } from '@bounce-bots/common';

const botColorMap = {
  '0': '#ff0066',
  '1': '#ff4500',
  '2': '#32cd32',
  '3': '#1e90ff'
};
const defaultBotColor = '#eeeeee';

function App() {
  const [cells, setCells] = useState<Record<string, Cell>>();
  const [bots, setBots] = useState<Record<string, Bot>>();
  const [goals, setGoals] = useState<Goal[]>();

  useEffect(() => {
    fetch('http://localhost:3000/api/puzzles/daily')
      .then((response) => response.json())
      .then((res: Puzzle) => {
        console.log(res);
        setCells(res.cells);
        setGoals(res.goals);
        setBots(res.bots);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div
      style={{
        padding: 20,
        minWidth: 'min-content',
        minHeight: 'min-content'
      }}
    >
      <h1>BounceBots ✰</h1>
      <div
        className="grid"
        style={{
          gridTemplateRows: 'repeat(16, 6.25%)',
          gridTemplateColumns: 'repeat(16, 6.25%)'
        }}
      >
        {cells &&
          Object.values(cells).map(({ id, neighbors }) => {
            const [, row] = id.split(',');
            const goal = goals?.find((g) => g.cell_id === id);
            const bot =
              bots && Object.values(bots).find((b) => b.cell_id === id);
            const hasWall = Object.values(neighbors).find((v) => !!v);

            return (
              <div
                key={id}
                className="cell"
                style={{
                  gridRow: 16 - parseInt(row)
                }}
              >
                {hasWall && (
                  <div
                    className={classnames('wall', {
                      north: !neighbors.north,
                      east: !neighbors.east,
                      south: !neighbors.south,
                      west: !neighbors.west
                    })}
                  />
                )}
                {goal && (
                  <div
                    key={id}
                    className="goal"
                    style={{
                      backgroundColor:
                        botColorMap[goal.bot_id as keyof typeof botColorMap] ||
                        defaultBotColor
                    }}
                  >
                    <span>✰</span>
                  </div>
                )}
                {bot && (
                  <div
                    key={id}
                    className="bot"
                    style={{
                      backgroundColor:
                        botColorMap[bot.id as keyof typeof botColorMap] ||
                        defaultBotColor
                    }}
                  >
                    <span>®</span>
                  </div>
                )}
                {id}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
