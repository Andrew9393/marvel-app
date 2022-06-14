import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "../Spinner/Spinner";
import { useNavigate } from 'react-router';
import MarvelService from "../../service/MarvelService";

import './ComicPageInfo.css';

const ComicPageInfo = () => {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const comicId = useParams()
  const marvelService = MarvelService()
  
  useEffect(() => {
    onUpdatePage()
  }, [comicId])
  
  const onUpdatePage = () => {
    marvelService
    .getComic(comicId.id)
    .then(onLoded)
  }
  
  
  const onLoded = (infoComic) => {
    setInfo(infoComic)
    setLoading(false)
  }

  const spinner = loading ? <Spinner/> : <View comicLInfo = {info}/>;
  
  return(
      <>
      {spinner} 
      </> 
    )
  }
  
  
  const View = (comicLInfo) => {    
    const history = useNavigate()
    const {title, imageCharacters, price, description } = comicLInfo.comicLInfo[0]
    
    return (
      <div className="infoComic">
          <div className="infoComic_img"><img src={imageCharacters} alt="" /></div>
          <div className="info_block">
            <div className="infoComic_name">
              <h2>
                {title}
              </h2>
            </div>
            <div className="infoComic_desc">{description}</div>
            <div className="infoComic_price">
              <b>{price}</b>
              <button type="submit" className="btn buy_btn">Buy</button>
            </div>

          <button className="btn" onClick={() => history(-1)}>Go to back</button>
          </div>
        </div>
      )

  }


export default ComicPageInfo;