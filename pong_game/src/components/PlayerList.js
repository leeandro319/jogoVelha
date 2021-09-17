import React from 'react';


export const PlayerList = ({ players }) => {

  return (
    <div>
      {Object.keys(players).map(key => (
        <div key={key}>
          {players[key].name}
        </div>
      ))}
    </div>
  );
}