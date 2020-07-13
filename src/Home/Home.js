import React,{useState} from 'react';
import './Home.scss';
import Swal from 'sweetalert2'


//Se cambio el class por function, me siento más comodo armando componentes con funciones

function Home(){

 const API_KEY= '9d4c9018'

 const [movies, setMovies]= useState([])  //Acá se guardan los valores del fetch, son todas las peliculas.
 const [userInput, setUserInput] = useState('')
 
 const [thereIsResult, setThereIsResult] = useState(false) //flag que limpiará la búsqueda o mostrará los resultados
 

//Evento por el cual el usuario ingresará los datos de la pelicula

const handleChange = event => {
  setUserInput(event.target.value)
  
}

//Función que disparará el evento para generar el fetch a la url con su respectiva API_KEY y el dato de la película que ingresó el usuario
const handleSubmit = event => {
  event.preventDefault()
  
  
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${userInput}`).then(
    resp => {
      // Se convierte la respuesta a json para que se pueda manipular las keys con sus respectivas values.
      resp.json().then(data => {
      
        try{
          
          if(data.Search){ //si el fetch fue exitoso, coloca todas las movies en una variable que estara definida por el useState
          setMovies(data.Search)
          setThereIsResult(true) //Flag para mostrar los resultados
          }else{ // EN el caso de que conteste, pero no existan movies. no muestra el article y se disparará una sweet alert con el mensaje de error
            setThereIsResult(false)
            Swal.fire({
              text: 'No se encuentra esta pelicula en el Catálogo',
              icon: 'error'
             })
          }
        }catch(e){ // 
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
      
        {thereIsResult == true && movies != null ? ( //validación en la cual se utiliza el flag, si valida a true y movies contiene informacion. mostrará cada pelicula con su respectivas caracteristicas

        movies.map( movie =>{ //por cada movie que se renderiza, se le asigna su titulo, su poster, su año y su link para ver en linea. Es un Renderizado Condicional
          return(
                <article>
                <h3>{movie.Title}</h3>
                <img src={movie.Poster} alt='Card image cap'/>
                <p>{movie.Year} - <a href={`https://www.imdb.com/title/${movie.imdbID}`}>VIEW ON IMDB</a></p>
               </article>
                  )
            }
        )
      ) : (//al ser un renderizado condicional, en el caso que movies este vacío no muestra nada
       null
      )}
       
      </div> 
      </main>
    </div>
  </>
  );

}


export default Home;

 