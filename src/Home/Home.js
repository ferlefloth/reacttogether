import React,{useState} from 'react';
import './Home.scss';
import Swal from 'sweetalert2'


/* Se cambio el class por function, me siento más comodo armando componentes con funciones*/

function Home(){

 const API_KEY= '9d4c9018'

 const [movies, setMovies]= useState([]) 
 const [userInput, setUserInput] = useState('')
 const [imdbID,setImdbID] =useState('') 
 const [thereIsResult, setThereIsResult] = useState(false)
 

/*Este es el evento que tomará los datos de la pelicula que ingresara el usuario*/

const handleChange = event => {
  setUserInput(event.target.value)
  
}

const handleSubmit = event => {
  event.preventDefault()
  
  
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${userInput}`).then(
    resp => {
      // Se convierte la respuesta a json para que sea maleable la info. Se podrá mostrar.
      resp.json().then(data => {
      
        try{
          
          if(data.Search){
          setMovies(data.Search)
          setThereIsResult(true)
          }else{ // EN el caso de que conteste, pero no existan pelis. limpia
            setThereIsResult(false)
            Swal.fire({
              text: 'No se encuentra esta pelicula en el Catálogo',
              icon: 'error'
             })
          }
        }catch(e){ //responde un 500 
          Swal.fire({
           text: 'No se encuentra esta pelicula en el Catálogo',
           icon: 'error'
          })
          setThereIsResult(false)
        }



      })
    }
  )
}


  const imdbLink = `https://www.imdb.com/title/${imdbID}`
  return (
  <>
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
          {/* <articleComponent title={title}
                            poster={poster}
                            year={year}
                            imdbLink={imdbLink}
        /> */}
        {thereIsResult == true && movies != null ? (

        movies.map( movie =>{
          return(
                <article>
                <h3>{movie.Title}</h3>
                <img src={movie.Poster} alt='Card image cap'/>
                <p>{movie.Year} - <a href={`https://www.imdb.com/title/${movie.imdbID}`}>VIEW ON IMDB</a></p>
               </article>
                  )
            }
        )
      ) : (
       null
      )}
       
      </div> 
      </main>
    </div>
  </>
  );

}


export default Home;

 