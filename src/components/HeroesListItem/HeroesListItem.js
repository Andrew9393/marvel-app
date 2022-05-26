import React from 'react';

class HeroesListItem extends React.Component {

  render() {
    const {name, description, imageCharacters} = this.props;
    return(
      <div className="heroesListItem">
        {name}
        {description}
        <img src={imageCharacters} alt="" />
      </div>
    )
  }
}

export default HeroesListItem;