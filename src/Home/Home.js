import React from 'react';

import './Home.scss';

class Home extends React.Component {
  state = {
    movies: []
  }

  render(){
    return (
      <div className="App">
        <header>
          <h1><span>// </span> React challenge</h1>
          <p>Open readme.md</p>
        </header>
        <main>
          <h2>Search OMDB</h2>
          <form className="searchForm">
            <input className="input" 
              type="text" 
              placeholder="Improve my style please"
              name="searchTerm"
            />
            <button type="submit">Search</button>
          </form>

          <div className="results">
            <article>
              <h3>Movie title</h3>
              <img src="https://via.placeholder.com/300x444"/>
              <p>1988 - <a href="http://wwwimdb.com">VIEW ON IMDB</a></p>
            </article>
          </div>
        </main>
      </div>
    );
  }
}

export default Home;