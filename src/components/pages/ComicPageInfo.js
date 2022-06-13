import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MarvelService from "../../service/MarvelService";


const ComicPageInfo = () => {
  const [info, setInfo] = useState(null)
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
  }

console.log(info)
    return( 
      <View comicLInfo = {info}/>
    )
  }


  const View = ({comicLInfo}) => {
      // const {title, imageCharacters, price } = comicLInfo.comicLInfo[0]

      return (
        <div className="infoComic">
          <div className="infoComic_img"><img src='' alt="" /></div>
        <div className="infoComic_name">title</div>
         <div className="infoComic_desc"></div>
         <div className="infoComic_price"></div>
        </div>
      )

  }


export default ComicPageInfo;