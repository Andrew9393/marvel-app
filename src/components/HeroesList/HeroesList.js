import React from 'react';
import './heroesItem.css'

const HeroesList = (props) => {

  const renderChar = (char) => {
      const items = char.map((item, i) => {
        return ( 
        <div 
          className="heroesItem" 
          key={char[i].id}
          id={char[i].id}
          onClick={props.onClick}
        >
          <div className="img"><img src={char[i].imageCharacters} alt={char[i].name} /></div>
          <div className="heroes_name">{char[i].name}</div>
        </div>
        )
    })
    
    return (
      <div className="ddd">
        <div className="l">
          {items}
        </div>
      </div>
    )
  }
  
  return renderChar(props.char)
}
  

export default HeroesList;