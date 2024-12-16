import { useState } from 'react';
import {
  RobotColor,
  wallsHorizontal,
  wallsVertical,
  cellGrid
} from './make-board';

const wallWidth = 5;
const wallHug = 2;
const colorWall = '#ff00ee';
const colorCellBackground = '#fff0f7';
const colorCenterIsland = '#ff00ee';
const colorRobots = {
  [RobotColor.YELLOW]: '#aa00ff',
  [RobotColor.BLUE]: '#00aaff',
  [RobotColor.RED]: '#ff0066',
  [RobotColor.GREEN]: '#ff6600'
};

function App() {
  const [blueBotCoord] = useState(Math.floor(Math.random() * 255));
  const [yellowBotCoord] = useState(Math.floor(Math.random() * 255));
  const [redBotCoord] = useState(Math.floor(Math.random() * 255));
  const [greenBotCoord] = useState(Math.floor(Math.random() * 255));

  return (
    <body
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
          gap: 2
        }}
      >
        <div
          style={{
            boxShadow: '2px 2px 4px #CBC7D8',
            background: colorCellBackground,
            border: `${wallWidth}px solid ${colorCenterIsland}`,
            gridColumn: '8 / 10',
            gridRow: '8 / 10',
            fontSize: 80,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
          }}
        >
          🦄
        </div>
        {cellGrid.map(({ id, coord: { x, y }, goal }) => (
          <div
            key={id}
            style={{
              background: colorCellBackground,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {goal === null ? (
              <>
                {/* {x},{y} */}
                {id}
              </>
            ) : (
              <div
                style={{
                  textShadow: '2px 2px 4px #CBC7D8',
                  fontSize: 40,
                  color: colorRobots[goal] || 'black'
                }}
              >
                ✰
              </div>
            )}
            {wallsHorizontal[id] && (
              <div
                style={{
                  boxShadow: '4px 0px 3px #CBC7D8',
                  boxSizing: 'border-box',
                  position: 'absolute',
                  height: `calc(100% + ${2 * (wallWidth - wallHug)}px)`,
                  width: 0,
                  right: -(wallWidth - wallHug),
                  borderRight: `${wallWidth}px solid ${colorWall}`,
                  zIndex: 99
                }}
              />
            )}
            {wallsVertical[id] && (
              <div
                style={{
                  boxShadow: '3px 3px 2px #CBC7D8',
                  boxSizing: 'border-box',
                  position: 'absolute',
                  height: 0,
                  width: `calc(100% + ${2 * (wallWidth - wallHug)}px)`,
                  bottom: -(wallWidth - wallHug),
                  borderBottom: `${wallWidth}px solid ${colorWall}`,
                  zIndex: 100
                }}
              />
            )}
            {[
              {
                robot: RobotColor.BLUE,
                coord: blueBotCoord
              },
              {
                robot: RobotColor.YELLOW,
                coord: yellowBotCoord
              },
              {
                robot: RobotColor.RED,
                coord: redBotCoord
              },
              {
                robot: RobotColor.GREEN,
                coord: greenBotCoord
              }
            ].map(({ robot, coord }) =>
              coord === id ? (
                <div
                  style={{
                    boxShadow: '2px 2px 4px #CBC7D8',
                    background: colorRobots[robot],
                    height: 30,
                    width: 30,
                    borderRadius: 30,
                    position: 'absolute',
                    zIndex: 9999
                  }}
                />
              ) : undefined
            )}
          </div>
        ))}
      </div>
    </body>
  );
}

export default App;
