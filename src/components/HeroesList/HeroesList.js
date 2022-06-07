import React from 'react';
import './heroesItem.css'

class HeroesList extends React.Component {

  renderChar (char) {
    const items = char.map((item, i) => {
      return (
        <div 
          className="heroesItem" 
          key={char[i].id}
          id={char[i].id}
          onClick={this.props.onClick}
        >
          <div className="img"><img src={char[i].imageCharacters} alt={char[i].name} /></div>
          <div className="heroes_name">{char[i].name}</div>
        </div>
      )
    })
    
    return (
      <div className="l">
        {items}
      </div>
    )
  
  }

  render(){
    const charList = this.renderChar(this.props.char)
    return (
      <div className="ddd">
        {charList}
      </div>
    )
  } 

}

export default HeroesList;