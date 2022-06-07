import React from "react";
import SearchP from "../SearchHeroes/SearchP";
import HeroesList from "../HeroesList/HeroesList";
import HearoesInfo from "../HeroesInfo/HeroesInfo";
import MarvelService from "../../service/MarvelService";
import {Portal} from '../Portal/Portal'
import { Spinner } from "../Spinner/Spinner";

class MainPage extends React.Component {

  state = {
    mainChar: [],
    loadingList: true,
    inputValue: '',
    noList: false,
    infoHeroes: [],
    msgOpen: false,
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

  showInfoHeroes = (id) => {
    this.marvelServ
      .getInfoHeroes(id)
      .then(this.onInfo)
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
  componentWillUnmount(){
    this.setState({
      msgOpen: false
    })
   }

  onCharLoading = (id) => {
    this.setState({
      loadingList: true
    })
  }

  onInfo = (info) => {
    console.log(info)
      this.setState({
        infoHeroes: info,
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

  clickItem = (e) => {
    console.log(e.target)
    this.state.mainChar.map(item => {
      if(item.id == e.target.id){
        this.setState({
          infoHeroes: item,
          msgOpen: true
        })
        document.body.classList.add('modal')
      } 
    })
  }

  onCloseModal = (e) => {
    this.setState({
      msgOpen: false
    })
    document.body.classList.remove('modal')
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
      const {loadingList, noList} = this.state
      const spinner = loadingList ? <Spinner/> : null
      const massageNoList = noList ? 'нет такого героя' : <HeroesList onClick={this.clickItem} char={this.state.mainChar}/>
    return(
      <div className="mainList">
        <SearchP inputeValue={this.state.inputValue} onChange={this.onChangeInput} click={this.click}/>
        <h1>Heroes List</h1>
        {
          this.state.msgOpen ? 
          <Portal>
            <HearoesInfo msg={this.state.msgOpen} onCloseModal={this.onCloseModal} infoHeroes={this.state.infoHeroes} />
          </Portal> : null
        }
        
        {spinner}
        {massageNoList}
      </div>
    )
  }

}

export default MainPage;