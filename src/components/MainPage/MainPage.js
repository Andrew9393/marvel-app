import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router';
import SearchP from "../SearchHeroes/SearchP";
import HeroesList from "../HeroesList/HeroesList";
import HearoesInfo from "../HeroesInfo/HeroesInfo";
import MarvelService from "../../service/MarvelService";
import {Portal} from '../Portal/Portal'
import { Spinner } from "../Spinner/Spinner";
import ComicsList from "../ComicsList/ComicsList";


const MainPage =() => {

  const navigate = useNavigate();
  const location = useLocation();


  const [mainChar, setMainChar] = useState([])
  const [loadingList, setLoadingList] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const [noList, setNoList] = useState(false)
  const [msgOpen, setMsgOpen] = useState(false)
  const [infoHeroes, setInfoHeroes] = useState([])

  const marvelServ = MarvelService();

  const updateList = () => {
    marvelServ
      .getAllCharacters()
      .then(onCharLoaded)
  }

  const updateListSearch = () => {
    const filterParametrs = (new URL(document.location)).searchParams;
    marvelServ
      .getSearchCharacters(filterParametrs.get("name"))
      .then(onCharLoaded)
      
  }

  const getList = () => {
    const characterQueryName = new URLSearchParams(location.search).get('name');
    if(characterQueryName){
      setInputValue(characterQueryName)
      updateListSearch()
    }  else {
          updateList()
    }
  }

  useEffect(() => {
    getList()
    // updateList()
    setMsgOpen(false)
  }, [])


  const onInfo = (info) => {
    setInfoHeroes(infoHeroes => infoHeroes = info)
  }
  
  const onCharLoaded = (char) => {
    if(char.length > 0){
      setMainChar(mainChar => mainChar = char)
      setLoadingList(false)
      setNoList(false)
  } else {
    setNoList(true)
    setLoadingList(false)
    }
  }

  const clickItem = (e) => {
    mainChar.map(item => {
      if(item.id == e.target.id){
        setInfoHeroes(infoHeroes => infoHeroes = item)
        setMsgOpen(true)

      } 
    })
  }

  const onCloseModal = (e) => {
    setMsgOpen(false)
  }
  
  const onChangeInput = (e) => {
    setInputValue(e.target.value)
  }


  const click = (e) => {
    e.preventDefault()

    if(e.target[0].value === ''){
      navigate('/');
      updateList()
      return;
    }
    navigate(`?name=${e.target[0].value}`)
    updateListSearch()
  }


      const spinner = loadingList ? <Spinner/> : null
      const massageNoList = noList ? 'нет такого героя' : <HeroesList onClick={clickItem} char={mainChar}/>
    return(
      <div className="mainList">
        <SearchP inputeValue={inputValue} onChange={onChangeInput} click={click}/>
        <h1>Heroes List</h1>
        {
          msgOpen ? 
          <Portal>
            <HearoesInfo msg={msgOpen} onCloseModal={onCloseModal} infoHeroes={infoHeroes} />
          </Portal> : null
        }
        
        {spinner}
        {massageNoList}
      </div>
    )

}

export default MainPage;