import React from "react";

import './HeroesInfo.css';

class HearoesInfo extends React.Component {
  render() {
    const {name, imageCharacters, description} = this.props.infoHeroes

    return(
      <div className="info_heroe">
        <div className="info_close" onClick={this.props.onCloseModal}>&times;</div>
        <div className="info_logo">
          <img src={imageCharacters} alt="" />
        </div>
        <div className="info_text">
        <div className="info_name">
          <h2>{name}</h2>
        </div>
        <div className="info_descriptoin">
          <p>{description ? description : 'нет описания для этого героя'}</p>
        </div>
        </div>
      </div>
    )
  }
}

export default HearoesInfo;