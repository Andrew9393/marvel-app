import { useState, useEffect } from "react";
import MarvelService from "../../service/MarvelService";
import Slider from "react-slick";
import './ComicsList.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newItemLoading, setNewItemLoading] = useState(false);

  const [loading, setLoading] = useState(true);
  const [errorList, setErrorList] = useState(false)

  const marvelService = MarvelService()

  const settings = {
    dots: true,
    arrow: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrow: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrow: false

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: false

        }
      }
    ]
  };


  useEffect(() => {
    onRequest(offset, true);
  }, [])

const onRequest = (offset, initial) => {
  onComicLoading();
  marvelService
    .getComicsList(offset)
    .then(onLoadedComics)
}

const onComicLoading = () => {
  setNewItemLoading(true)
}

const onLoadedComics = (newComicsList) => {
  setComicsList([...comicsList, ...newComicsList])
  setNewItemLoading(false)
  setLoading(false)
  setOffset((offset) => offset + 5)
}

const getComicOnID = (id) => {
  marvelService
    .getComic(id)
    .then(res => console.log(res))
}


  return(
    
    // <div className="comic_list_wrap" onClick={(e) => getComicOnID((e.target).closest('.comic_item').getAttribute("id"))}>
    <div className="comic_list_wrap" >
      <Slider {...settings}>
        {comicsList.map((el, i) => (
            <Link to={`/comic/${el.id}`} key={i}>
              <div className="comic_item" id={el.id}  >
                <div className="comic_img">
                  <img src={el.imageCharacters} alt="" />
                </div>
                <h2 className="comicTitle">
                  {el.title}
                </h2>
                <p className="format">{el.format}</p>
                <p><b>{el.price}</b></p>
              </div>
            </Link>
          ))}
          <div className="b">
            <button className="btn_load"
              disabled = {newItemLoading}
              onClick =  {() => onRequest(offset)}
              >load more</button>
          </div>
      </Slider>
      </div>
    
  )
  
}

export default ComicsList;