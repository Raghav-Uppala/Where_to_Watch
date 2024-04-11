<template>
  <div>
    <topHeader @onEnter="value" @code="code"></topHeader>
    <div v-if="this.data.result != false" id="grid" style="justify-items:center;">
      <div v-for="(item, index) in this.data.results" :key="index">  
        <displayContainer :data=item :countryCode=countryCode>/</displayContainer>
      
      </div>
    </div>
  </div>
</template>

<script>
import topHeader from './components/topHeader.vue'
import displayContainer from './components/displayContainer.vue'

export default {
  name: 'App',
  components: {
    topHeader,
    displayContainer
  },
  methods: {
    value (search) {
      this.data.results = {}

      let msg = encodeURI(search[0]);
      let countryCode = search[1]["code"];
      this.countryCode = countryCode

      const url = 'https://streaming-availability.p.rapidapi.com/search/title?country='+countryCode+'&title='+msg+'&output_language=en&show_type=all';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '6b590f2004mshe4d55eecdd4ff03p1d421ejsn083e94b390ff',
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
      };
      console.log(options, url);
      fetch('https://thingproxy.freeboard.io/fetch/https://www.movieofthenight.com/api/search?query='+msg)
        .then(response => response.json())
        .then(json => this.search = json)
        .then( data => {
          // console.log(data);
          let counter = 100
          for (let i in data["results"]) {
            if(counter == 0) {
              break;
            }
            let info = data["results"][i];
            console.log(i, info);
            
            let type
            if (info[0] == 's') {
              type = 'series'
            } else if (info[0] == 'm') {
              type = 'movie'
            }
            let id = info.replace(/[^\d-]/g, '');
            
            console.log(id, type)
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.movieofthenight.com/api/'+type+'/'+id+'/en')}`)
              .then(respone => respone.json())
              .then(data => {
                let resp = JSON.parse(data.contents)[type];
                resp["type"] = type;
                this.data.results[resp["title"]] = resp;
              });
            counter -= 1;
          }
          this.data.result = true;
          console.log(this.data.result);
          // try {
          //   fetch(url, options).then(respone => respone.json()).then(result => this.data = result)
          // } catch (error) {
          //   console.error(error);
          // }
          // console.log(this.data["result"]);
        })
      // this.data = { "result": [ { "type": "movie", "title": "Oppenheimer", "overview": "Christopher Nolan's breathtaking global phenomenon about the father of the atomic bomb stars Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr., and Florence Pugh.", "streamingInfo": { "in": [ { "service": "zee5", "streamingType": "subscription", "link": "https://www.zee5.com/movies/details/watch-oppenheimer-full-hd-movie-on-rent-online-on-zee5/0-0-1z5465540", "audios": [ { "language": "eng", "region": "" }, { "language": "hin", "region": "" } ], "subtitles": [], "availableSince": 1700986036 }, { "service": "prime", "streamingType": "rent", "quality": "hd", "link": "https://www.primevideo.com/region/eu/detail/0FJ3FIK7GRE81SQ9V11LI1WSNY/ref=atv_dp", "audios": [ { "language": "eng", "region": "" }, { "language": "hin", "region": "" } ], "subtitles": [ { "locale": { "language": "eng", "region": "" }, "closedCaptions": true }, { "locale": { "language": "hin", "region": "" }, "closedCaptions": false } ], "price": { "amount": "119", "currency": "INR", "formatted": "119 INR" }, "availableSince": 1701138442 } ] }, "cast": [ "Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh", "Josh Hartnett", "Casey Affleck" ], "year": 2023, "imdbId": "tt15398776", "tmdbId": 872585, "originalTitle": "Oppenheimer", "genres": [ { "id": 18, "name": "Drama" }, { "id": 36, "name": "History" } ], "directors": [ "Christopher Nolan" ] }, { "type": "movie", "title": "Never Open the Door", "overview": "", "streamingInfo": {}, "cast": [ "Jessica Sonneborn", "Deborah Venegas", "Kristina Page", "Matthew Aidan", "Mike Wood", "George Troester", "Steven Richards" ], "year": 2014, "imdbId": "tt1806975", "tmdbId": 428282, "originalTitle": "Never Open the Door", "genres": [ { "id": 27, "name": "Horror" }, { "id": 9648, "name": "Mystery" }, { "id": 878, "name": "Science Fiction" } ], "directors": [ "Vito Trabucco" ] }, { "type": "series", "title": "Natsu no Arashi!", "overview": "", "streamingInfo": {}, "cast": [ "Ryoko Shiraishi", "Yuko Sanpei", "Ai Nonaka", "Chiaki Omigawa", "Hiroki Yasumoto", "Hitomi Nabatame", "Kaori Nazuka" ], "firstAirYear": 2009, "lastAirYear": 2009, "imdbId": "tt1409062", "tmdbId": 44687, "originalTitle": "夏のあらし!", "genres": [ { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" } ], "creators": [], "status": { "statusCode": 4, "statusText": "Ended" }, "seasonCount": 2, "episodeCount": 26, "seasons": [ { "type": "season", "title": "Season 1", "streamingInfo": {}, "firstAirYear": 2009, "lastAirYear": 2009, "episodes": [ { "type": "episode", "title": "Playback Part II", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Girl A", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "I Want to Protect Her", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Outpouring Memories", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "The Secret Garden", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Fall in Love", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Relationship to Others", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Do What You Like", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Now's the Time for You to Become a Hero!", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Foreigner", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "The World Exists for Us Two", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Let Your Body Ride on the Flow of Time", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Playback Part I", "streamingInfo": {}, "year": 2009 } ] }, { "type": "season", "title": "Natsu no Arashi! Akinai-chū", "streamingInfo": {}, "firstAirYear": 2009, "lastAirYear": 2009, "episodes": [ { "type": "episode", "title": "Summer Vacation", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Gal and Do", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "The Time Traveling Girl", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Baby Blue Rain", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Can't Stop the Romance", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Jagged Heart Lullaby", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Amagigoe", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Computer Grandma", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Lonely Tropical Fish", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Showa Blues", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "High School Lullaby", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "Radarman", "streamingInfo": {}, "year": 2009 }, { "type": "episode", "title": "You Guys Are Kiwi, Papaya, and Mango", "streamingInfo": {}, "year": 2009 } ] } ] }, { "type": "movie", "title": "Never Ever Open It", "overview": "", "streamingInfo": {}, "cast": [ "Martin Condon", "Joseph Mc Carthy" ], "year": 2011, "imdbId": "tt2299481", "tmdbId": 1031133, "originalTitle": "Never Ever Open It", "genres": [ { "id": 27, "name": "Horror" } ], "directors": [ "Damian McCarthy" ] }, { "type": "movie", "title": "Do Not Ever Open", "overview": "", "streamingInfo": {}, "cast": [ "Thais Castro", "Deuza de Sá", "Edson Salvioli", "Emanuel Sá", "Rafael Zanesco" ], "year": 2016, "imdbId": "tt6475086", "tmdbId": 1007647, "originalTitle": "Não Abra Jamais", "genres": [ { "id": 14, "name": "Fantasy" }, { "id": 27, "name": "Horror" } ], "directors": [ "Rafael Zanesco" ] }, { "type": "movie", "title": "Never Open That Door", "overview": "", "streamingInfo": {}, "cast": [ "Ángel Magaña", "Renée Dumas", "Diana de Córdoba", "Pedro Fiorito", "Orestes Soriani", "Percival Murray", "Rosa Martín" ], "year": 1952, "imdbId": "tt0184782", "tmdbId": 252695, "originalTitle": "No abras nunca esa puerta", "genres": [ { "id": 9648, "name": "Mystery" }, { "id": 53, "name": "Thriller" } ], "directors": [ "Carlos Hugo Christensen" ] }, { "type": "movie", "title": "Spring", "overview": "", "streamingInfo": {}, "cast": [], "year": 2019, "imdbId": "tt9249278", "tmdbId": 593048, "originalTitle": "Spring", "genres": [ { "id": 16, "name": "Animation" }, { "id": 12, "name": "Adventure" } ], "directors": [ "Andreas Goralczyk" ] }, { "type": "movie", "title": "Refrigerate After Opening", "overview": "", "streamingInfo": {}, "cast": [ "Tony Suriano", "Nicola Vann" ], "year": 2021, "imdbId": "tt12092700", "tmdbId": 978178, "originalTitle": "Refrigerate After Opening", "genres": [], "directors": [ "Kevin Ung" ] }, { "type": "movie", "title": "The Pope and Hitler - Opening the Secret Files on Pius XII", "overview": "", "streamingInfo": {}, "cast": [ "Nicola Seaton-Clark" ], "year": 2020, "imdbId": "tt16985220", "tmdbId": 925262, "originalTitle": "The Pope and Hitler - Opening the Secret Files on Pius XII", "genres": [ { "id": 99, "name": "Documentary" } ], "directors": [ "Lucio Mollica" ] } ] }
    },
    code (code) {
      this.countryCode = code['code'];
    }
  },
  data : () => ({
    search: {},
    data: {result: false, results:{}},
    countryCode: 'in'
  })
}
</script>

<style>
#grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 5px;
  row-gap: 1em;
}
</style>