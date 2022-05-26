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
   
  }

  onCharLoading = () => {
    this.setState({
      loadingList: true
    })
  }
  
  onCharLoaded = (char) => {
    if(char.length > 0){
      this.setState({
        mainChar: char,
        loadingList: false,
        noList: false,
      })} else {
        this.setState({
          noList: true,
          loadingList: false,
      })
    }
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
Ъ
 render(){
      const {loadingList, noList} = this.state
      const spinner = loadingList ? <Spinner/> : null
      const massageNoList = noList ? 'нет такого героя' : <HeroesList char={this.state.mainChar}/>
    return(
      <div className="mainList">
        <SearchP inputeValue={this.state.inputValue} onChange={this.onChangeInput} click={this.click}/>
        <h1>Heroes List</h1>
        {spinner}
        {massageNoList}
      </div>
    )
  }

}

export default MainPage;