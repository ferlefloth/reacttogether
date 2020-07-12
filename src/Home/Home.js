import React,{useState} from 'react';
import './Home.scss';



/* Se cambio el class por function, me siento más comodo armando componentes con funciones*/

function Home(){

 var API_KEY= '9d4c9018'
 //var url= 'http://img.omdbapi.com/?apikey=[yourkey]&'

 const [searchResults, setSearchResults]= useState([]) 
 const [userInput, setUserInput] = useState('')
 const[title, setTitle]= useState('')
 const [poster, setPoster] = useState(null)
 const [year, setYear] = useState('')
 const [imdbID,setImdbID] =useState('') 

/*Este es el evento que tomará los datos de la pelicula que ingresara el usuario*/

const handleChange = event => {
  setUserInput(event.target.value)
  //alert('Este es el INPUT' + setUserInput(event.target.value))
}

const handleSubmit = event => {
  event.preventDefault()
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${userInput}`).then(
    resp => {
      // resp es la respuesta que obtuvimos del servidor pero asi no nos sirve de mucho, lo que debemos hacer es darle el formato adecuado con el metdo json() el cual devulve otra promesa con la respuesta ya formateada a como la deseamos
      resp.json().then(data => {
        data.Search && setSearchResults(data.Search)
        data.Search[0].Title && setTitle(data.Search[0].Title)
        data.Search[0].Poster && setPoster(data.Search[0].Poster)
        data.Search[0].Year && setYear(data.Search[0].Year)
        data.Search[0].imdbID && setImdbID(data.Search[0].imdbID)
      })
    }
  )
}



  const imdbLink = `https://www.imdb.com/title/${imdbID}`
  return (
    <div className="App">
      <header>
        <h1><span>// </span> React challenge</h1>
        <p>Open readme.md</p>
      </header>
      <main>
        <h2>Search OMDB</h2>
        <form className="searchForm" onSubmit={handleSubmit}>
          <input className="input" 
            type="text" 
            placeholder="Improve my style please"
            name="searchTerm"
            value={userInput}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>

         <div className="results">
          <article>
            <h3>{title}</h3>
            <img src={poster} alt='Card image cap'/>
            <p>{year} - <a href={imdbLink}>VIEW ON IMDB</a></p>
          </article>
        </div> 
      </main>
    </div>
  );

}


export default Home;