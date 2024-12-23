import { useEffect, useState } from 'react';
import {
  Puzzle,
  Direction,
  Cell,
  Bot,
  Goal
} from '../../common/types/interfaces';

const wallWidth = 5;
const colorWall = '#ff00ee';
const colorCellBackground = '#fff0f7';

const botColorMap = {
  '0': '#ff0066',
  '1': '#ff4500',
  '2': '#32cd32',
  '3': '#1e90ff'
};

function App() {
  const [cells, setCells] = useState<Record<string, Cell<Direction>>>();
  const [bots, setBots] = useState<Record<string, Bot>>();
  const [goals, setGoals] = useState<Goal[]>();

  useEffect(() => {
    fetch('http://localhost:3000/api/puzzles/daily')
      .then((response) => response.json())
      .then((res: Puzzle<Direction>) => {
        console.log(res);
        setCells(res.cells);
        setGoals(res.goals);

        // waiting on bots from API
        // setBots(res.bots);
        setBots({
          '5,5': {
            cell_id: '5,5',
            id: '2'
          }
        });
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
          gridTemplateRows: 'repeat(16, 50px)',
          gridTemplateColumns: 'repeat(16, 50px)',
          gap: 1,
          width: 'min-content',
          position: 'relative'
        }}
      >
        {goals &&
          goals.map(({ bot_id, cell_id }) => {
            const [col, row] = cell_id.split(',');
            return (
              <div
                key={bot_id}
                style={{
                  position: 'absolute',
                  gridRow: 16 - parseInt(row),
                  gridColumn: parseInt(col) + 1,
                  zIndex: 999,
                  backgroundColor: botColorMap[bot_id],
                  margin: 5,
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 25
                }}
              >
                🦄
              </div>
            );
          })}
        {bots &&
          Object.values(bots).map(({ cell_id, id }) => {
            const [col, row] = cell_id.split(',');
            return (
              <div
                key={id}
                style={{
                  position: 'absolute',
                  gridRow: 16 - parseInt(row),
                  gridColumn: parseInt(col) + 1,
                  zIndex: 999,
                  backgroundColor: botColorMap[id],
                  margin: 5,
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 25
                }}
              >
                🤖
              </div>
            );
          })}
        {cells &&
          Object.values(cells).map(({ id, neighbors }) => {
            const [, row] = id.split(',');
            return (
              <div
                key={id}
                style={{
                  fontSize: 8,
                  fontFamily: 'monospace',
                  color: '#333',
                  backgroundColor: colorCellBackground,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  gridRow: 16 - parseInt(row),
                  borderRight: neighbors.east
                    ? undefined
                    : `${wallWidth}px solid ${colorWall}`,
                  borderBottom: neighbors.south
                    ? undefined
                    : `${wallWidth}px solid ${colorWall}`,
                  borderLeft: neighbors.west
                    ? undefined
                    : `${wallWidth}px solid ${colorWall}`,
                  borderTop: neighbors.north
                    ? undefined
                    : `${wallWidth}px solid ${colorWall}`
                }}
              >
                {id}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
