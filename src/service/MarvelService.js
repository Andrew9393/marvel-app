
const MarvelService = () => {

  const _http = 'https://gateway.marvel.com:443/v1/public/'
  const _apikey = 'apikey=e17d8ab7f895204f28a89aeb6a00693a'
  const _baseOffset = '210'

  const getResours = async(url) => {
    const res = await fetch(url)
    
    if(!res.ok){
      throw new Error(`Errors - ${res.ok}`)
    }

    return await res.json();
  }

  const getAllCharacters = async () => {
    const res = await getResours(`${_http}characters?limit=9&offset=210&&${_apikey}`)
    return res.data.results.map(_list)
  }

  const getSearchCharacters = async (inputValue) => {
     const res = await getResours(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${inputValue}&${_apikey}`)
     return res.data.results.map(_list)
  }

  const getInfoHeroes = async (id) => {
    const res = await getResours(`${_http}characters?limit=9&id=${id}&offset=210&${_apikey}`)
    return res.data.results.map(_list)
  }

  const getComicsList = async (offset = _baseOffset) => {
    const result = await getResours(`${_http}comics?limit=9&offset=${offset}&${_apikey}`)
    console.log(result.data.results.map(_listComic))
    return result.data.results.map(_listComic)
  }

  const getComic = async (id) => {
    const result = await getResours(`${_http}comics/${id}?${_apikey}`)
    console.log(result.data.results[0])
    return result.data.results.map(_listComic)
  }
  

  const _list = (list) => {
      return (
        {
          name: list.name,
          description: list.description ,
          imageCharacters: list.thumbnail.path + '.' + list.thumbnail.extension,
          id: list.id
        }
      )
  }

  const _listComic = (listComic) => {
    return (
      {
        title: listComic.title,
        description: listComic.description ? listComic.description : 'no description',
        imageCharacters: listComic.thumbnail.path + '.' + listComic.thumbnail.extension,
        id: listComic.id,
        format: listComic.format,
        price: listComic.prices[0].price ? `${listComic.prices[0].price}$` : 'not available',
        creators: listComic.creators.items
      }
    )
}

  return {getResours, getAllCharacters, getSearchCharacters, getInfoHeroes, getComicsList, getComic}
}

export default MarvelService;