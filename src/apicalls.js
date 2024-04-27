let TMDBAPIKEY = 'fafd557815b34aad4382bb0d71992694'
let RAPIDAPIKEY = '6b590f2004mshe4d55eecdd4ff03p1d421ejsn083e94b390ff'

let apicalls = {
  queryList(query) {   // returns the code list from query MovieOfNight
    // let results;
    return fetch('https://api.allorigins.win/get?url='+encodeURIComponent('https://www.movieofthenight.com/api/search?query='+query))
      .then(response => response.json())
      .then(data => JSON.parse(data.contents))
  },
  mediaInformationMoN(code) { // returns the information about the media from MovieOfNight
    let type
    if (code[0] == 's') {
      type = 'series'
    } else if (code[0] == 'm') {
      type = 'movie'
    }
    let id = code.replace(/[^\d-]/g, '');
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.movieofthenight.com/api/'+type+'/'+id+'/en')}`)
      .then(respone => respone.json())
      .then(data => JSON.parse(data.contents))
  },
  mediaInformationTMDB (tmdbCode, type) {// returns the information about the media from tmdb
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.themoviedb.org/3/${encodeURIComponent(type)}/${encodeURIComponent(tmdbCode)}?api_key=${encodeURIComponent(TMDBAPIKEY)}&append_to_response=external_ids,watch/providers`)}`)
      .then(respone => respone.json())
      .then(data => data.contents)
      .then(json => JSON.parse(json))
  },
  mediaInformationIMDB (ImdbCode, onlyCerfication=false) {// returns the information about the media from imdb
    let imdbGraphQuery = `
{
  title(id: "${ImdbCode}") {
    id
    type
    is_adult
    primary_title
    original_title
    start_year
    end_year
    runtime_minutes
    plot
    spoken_languages {
      code
      name
    }
    rating {
      aggregate_rating
      votes_count
    }
    genres
    posters {
      url
      width
      height
    }
    certificates {
      country {
        code
        name
      }
      rating
    }
    spoken_languages {
      code
      name
    }
    origin_countries {
      code
      name
    }
    critic_review {
      score
      review_count
    }
    directors: credits(first: 5, categories: ["director"]) {
      name {
        id
        display_name
        avatars {
          url
          width
          height
        }
      }
    }
    writers: credits(first: 5, categories: ["writer"]) {
      name {
        id
        display_name
        avatars {
          url
          width
          height
        }
      }
    }
    casts: credits(first: 5, categories: ["actor", "actress"]) {
      name {
        id
        display_name
        avatars {
          url
          width
          height
        }
      }
      characters
    }
  }
}
`
    if(onlyCerfication == true){
      imdbGraphQuery = `
  {
    title(id: "${ImdbCode}") {
      id
      type
      is_adult
      primary_title
      original_title
      rating {
        aggregate_rating
        votes_count
      }
      certificates {
        country {
          code
          name
        }
        rating
      }
    }
  }
`
    }
    return fetch('https://graph.imdbapi.dev/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: imdbGraphQuery
      }),
    })
      .then(response => response.json())
  },
  popularMoviesMMD () {//reutrns the most popular movies from the movieminidatabase
    const popularMovieUrl = 'https://moviesminidatabase.p.rapidapi.com/movie/order/byPopularity/'
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPIKEY,
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
      }
    };
    return fetch(popularMovieUrl, options)
      .then(response => response.text())
      .then(res => JSON.parse(res).results)
  },
  popularMoviesTMDB(type) {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.themoviedb.org/3/${encodeURIComponent(type)}/popular?api_key=${encodeURIComponent(TMDBAPIKEY)}`)}`)
      .then(response => response.json())
      .then(data => JSON.parse(data.contents))
  },
  popularMoviesMoM(country,genres='', yearLow='2020', yearHigh='2024', movieLanguage='', runtimeLevel=0,keyword='', type='best',userLanguage='en', age='', multiple=true) {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.movieofthenight.com/api/recommend/movie?genres=${genres}&yearLow=${yearLow}&yearHigh=${yearHigh}&movieLanguage=${movieLanguage}&runtimeLevel=${runtimeLevel}&keyword=${keyword}&type=${type}&age=${age}&country=${country}&userLanguage=${userLanguage}&multiple=${multiple}`)}`)
      .then(response => response.json())
      .then(data => JSON.parse(data.contents))
  },
  popularSeriesMoM (country,genres='', yearLow='2020', yearHigh='2024', movieLanguage='', runtimeLevel=0,keyword='', type='best',userLanguage='en', age='', multiple=true) {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.movieofthenight.com/api/recommend/series?genres=${genres}&yearLow=${yearLow}&yearHigh=${yearHigh}&movieLanguage=${movieLanguage}&runtimeLevel=${runtimeLevel}&keyword=${keyword}&type=${type}&age=${age}&country=${country}&userLanguage=${userLanguage}&multiple=${multiple}`)}`)
      .then(response => response.json())
      .then(data => JSON.parse(data.contents))
  },
  IMDbToTMDb (imdbID) {
    return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.themoviedb.org/3/find/${imdbID}?api_key=${encodeURIComponent(TMDBAPIKEY)}&external_source=imdb_id`)}`)
      .then(response => response.json())
      .then(data => JSON.parse(data.contents))
  }
}

export default apicalls