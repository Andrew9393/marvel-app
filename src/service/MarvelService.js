
class MarvelService {

  _http = 'https://gateway.marvel.com:443/v1/public/'
  _apikey = 'apikey=e17d8ab7f895204f28a89aeb6a00693a'

  getResours = async(url) => {
    const res = await fetch(url)
    
    if(!res.ok){
      throw new Error(`Errors - ${res.ok}`)
    }

    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResours(`${this._http}characters?limit=9&offset=210&&${this._apikey}`)
    //  const res = await this.getResours(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=ir&${this._apikey}`)
    return res.data.results.map(this._list)
  }

  getSearchCharacters = async (inputValue) => {
     const res = await this.getResours(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${inputValue}&${this._apikey}`)

     return res.data.results.map(this._list)
      
  }
  

  _list = (list) => {
      return (
        {
          name: list.name,
          description: list.description ,
          imageCharacters: list.thumbnail.path + '.' + list.thumbnail.extension,
          id: list.id
        }
      )
  }
}

export default MarvelService;