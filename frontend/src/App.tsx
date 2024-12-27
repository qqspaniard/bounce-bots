import { useEffect, useState } from 'react';
import { Puzzle, Cell, Goal } from '@bounce-bots/common';

const wallWidth = 3;
const cellPadding = 4;
const colorWall = '#ff00ee';
const colorCellBackground = '#fff0f7';

const botColorMap = {
  '0': '#ff0066',
  '1': '#ff4500',
  '2': '#32cd32',
  '3': '#1e90ff'
};
const defaultBotColor = '#eeeeee';

function App() {
  const [cells, setCells] = useState<Record<string, Cell>>();
  const [goals, setGoals] = useState<Goal[]>();

  useEffect(() => {
    fetch('http://localhost:3000/api/puzzles/daily')
      .then((response) => response.json())
      .then((res: Puzzle) => {
        console.log(res);
        setCells(res.cells);
        setGoals(res.goals);
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
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(16, 6.25%)',
          gridTemplateColumns: 'repeat(16, 6.25%)',
          width: '100%',
          maxWidth: 800,
          aspectRatio: '1 / 1',
          // gap: 1,
          position: 'relative',
          outline: `${wallWidth}px solid ${colorWall}`
        }}
      >
        {cells &&
          Object.values(cells).map(({ id, neighbors }) => {
            const [, row] = id.split(',');
            const goal = goals?.find((g) => g.cell_id === id);

            return (
              <div
                key={id}
                style={{
                  position: 'relative',
                  fontSize: 8,
                  fontFamily: 'monospace',
                  color: '#333',
                  backgroundColor: colorCellBackground,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gridRow: 16 - parseInt(row),
                  borderRight: `${wallWidth}px solid ${
                    neighbors.east ? 'transparent' : colorWall
                  }`,
                  borderBottom: `${wallWidth}px solid ${
                    neighbors.south ? 'transparent' : colorWall
                  }`,
                  borderLeft: `${wallWidth}px solid ${
                    neighbors.west ? 'transparent' : colorWall
                  }`,
                  borderTop: `${wallWidth}px solid ${
                    neighbors.north ? 'transparent' : colorWall
                  }`
                }}
              >
                {goal ? (
                  <div
                    key={id}
                    style={{
                      position: 'absolute',
                      zIndex: 999,
                      backgroundColor:
                        botColorMap[goal.bot_id as keyof typeof botColorMap] ||
                        defaultBotColor,
                      borderRadius: '100%',
                      fontSize: 40,
                      inset: cellPadding,
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <span
                      style={{
                        position: 'relative',
                        top: -3
                      }}
                    >
                      ✰
                    </span>
                  </div>
                ) : (
                  id
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
