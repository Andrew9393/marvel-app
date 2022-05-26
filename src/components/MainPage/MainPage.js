import React from "react";
import SearchP from "../SearchHeroes/SearchP";
import HeroesList from "../HeroesList/HeroesList";
import MarvelService from "../../service/MarvelService";
import { Spinner } from "../Spinner/Spinner";

class MainPage extends React.Component {

  state = {
    mainChar: [],
    loadingList: true,
    inputValue: '',
    noList: false
  }

  marvelServ = new MarvelService();

  updateList = () => {
    this.marvelServ
      .getAllCharacters()
      .then(this.onCharLoaded)
  }

  updateListSearch = () => {
    const filterParametrs = (new URL(document.location)).searchParams;
    this.marvelServ
      .getSearchCharacters(filterParametrs.get("name"))
      .then(this.onCharLoaded)
      
  }

  componentDidMount() {
    let params = (new URL(document.location)).searchParams; 
    if(window.location.search){
      this.setState({
        inputValue:params.get("name")
      })
      this.updateListSearch()
    } else {
      this.updateList()
    }
    console.log(this.state.mainChar.length)
    if(this.state.mainChar.length === 0){
      this.setState({
        noList: true
      })
    } else {
      this.setState({
        noList: false
      })
    }
   
  }

  onCharLoading = () => {
    this.setState({
      loadingList: true
    })
  }
  
  onCharLoaded = (char) => {
    this.setState({
      mainChar: char,
      loadingList: false
    })
  }

  setLocation = (curLoc) => {
    try {
      window.history.pushState(null, null, curLoc);
      return;
    } catch(e) {}
      window.location.hash = '#' + curLoc;
  }

  onChangeInput = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }


  click = (e) => {
    e.preventDefault()
    if(e.target[0].value === ''){
      window.history.pushState(null, null, '/');
      this.updateList()
      return;
    }
    this.setLocation(`?name=${e.target[0].value}`)
    this.updateListSearch()
  }

 render(){
      const {loadingList} = this.state
      const spinner = loadingList ? <Spinner/> : null
    return(
      <div className="mainList">
        <SearchP inputeValue={this.state.inputValue} onChange={this.onChangeInput} click={this.click}/>
        <h1>Heroes List</h1>
        {spinner}
        <HeroesList char={this.state.mainChar}/>
      </div>
    )
  }

}

export default MainPage;