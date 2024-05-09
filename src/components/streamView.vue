<template>
  <div>
    <h1 class="stream_title text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl sm:text-6xl dark:text-white">{{this.dataMoM['title']}} <span v-if="this.type == 'series'">(S{{this.seasonEp['season']}}E{{this.seasonEp['episode']}})</span></h1>
    <br>
    <div v-if="this.type == 'movie'" style="height:80vh; width:95vw; margin:auto;">
      <iframe :src="'https://vidsrc.in/embed/movie?imdb='+ this.imdb" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    </div>
    <div v-if="this.type == 'series'" style="margin:auto;">
      <div style="height:80vh; width:95vw;margin:auto;">
        <iframe :src="'https://vidsrc.in/embed/tv?imdb='+ this.imdb+'&season='+this.seasonEp['season']+'&episode='+this.seasonEp['episode']" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
      </div>
      <!-- <div style="background-color:red; width:90vw; height:90vh">red</div> -->
      <!-- <div>
        <div @click="nextEpisode()">Next</div>
      </div> -->
      <!-- {{this.totalLength}} -->
      <div v-if="this.dataTmdb['result'] == true" style="margin-bottom:5vh; margin-top:5vh;">
        <div class="season-grid-container">
          <input v-for="(object, index) in totalLength" :key="index" class="seasonSelect join-item btn btn-square" :id="`season${index+1}`" type="checkbox" name="options" @click="radioClick(index+1)" :value="index+1" :aria-label="`Season ${index+1}`"/>
        </div>
        <div class="divider"></div> 
        <div v-for="(object, index) in totalLength" :key="index" :id="`S${index+1}`" class="seasonList">
          <div class="grid-container">
            <input type="radio" name="episode" class="episodeBtn btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" v-for="(num, index1) in [...Array(object['episode_count']).keys()]" :key="index1" @click="showEpisode(index+1, num+1)" :aria-label="`Episode:${num+1}`" />
          </div>
        </div>
      </div>
    </div>
    <br>
    <div style="margin-top:10px;" class="flex" v-if="this.dataMoM != {}">
      <div style="margin-left:2vw;">
        <h2 class="text-4xl">{{this.title}}</h2>
        <br>
        <div style="font-weight:bold;"><span>{{this.certification}}</span>Rating: {{this.rating}} • Genre(s):<span v-for="(genre,index) in this.dataMoM['genres']" :key="index" style="padding-left:0.4rem;">{{this.genres[genre]}}</span> <span v-if="this.dataMoM['type'] == 'movie'"> • {{this.dataMoM["year"]}} • Run time: {{this.dataMoM["runtime"]}}</span><span v-else> • {{this.dataMoM['firstAirYear']}} - {{this.dataMoM['lastAirYear']}} </span></div>
        <p style="margin-top:1vw;">{{this.plot}}</p>
        <!-- <div v-else>
          <p>Not avialable to stream</p>
        </div> -->
      </div>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import apicalls from '../apicalls.js'

export default {
  name: "streamView",
  props: {
    id: String,
    type: String,
    imdb: String,
  },
  data:() => ({
    dataImdb: {},
    dataMoM: {},
    dataTmdb: {result:false},
    seasonEp: {season: 1, episode: 1},
    totalLength: {season: 1, episode: 1},
    genres: {"1":"Biography","2":"Film Noir","3":"Game Show","4":"Musical","5":"Sport","6":"Short","7":"Adult","12":"Adventure","14":"Fantasy","16":"Animation","18":"Drama","27":"Horror","28":"Action","35":"Comedy","36":"History","37":"Western","53":"Thriller","80":"Crime","99":"Documentary","878":"Science Fiction","9648":"Mystery","10402":"Music","10749":"Romance","10751":"Family","10752":"War","10763":"News","10764":"Reality","10767":"Talk Show"},
  }),
  methods: {
    radioClick(value) {
      // let value =  document.querySelector('input[name="options"]:checked').value
      for (let i in this.totalLength) {
        let iter = Number(i)
        if(iter+1 === Number(value)) {
          document.getElementById("S"+value).style.display  = "inline" 

        } else {
          document.getElementById(`S${iter+1}`).style.display  = "none" 
          console.log(`season${iter+1}`)
          document.getElementById(`season${iter+1}`).checked = false
        }
      }  
    },
    getData () {
      apicalls.mediaInformationMoN(this.type+this.id)
        .then(res => {
          this.dataMoM = res[this.type]
          let type = this.type
          if(this.dataMoM["posterPath"] != "" && this.dataMoM["posterPath"] != undefined) {
            this.img_link = "https://image.tmdb.org/t/p/original/"+this.dataMoM["posterPath"];
          } else {
            this.img_link = ""
          }
          this.rating = (this.dataMoM["imdbRating"]/10).toString();
          // this.certification = this.dataMoM["certification"];
          // console.log(this.certification)
          this.plot = this.dataMoM["overview"];
          this.imdbID = this.dataMoM['imdbID'];
          if(this.dataMoM['title'] !== undefined) {
            this.title = this.dataMoM['title'];
          } else if (this.dataMoM['primary_title'] !== undefined) {
            this.title = this.dataMoM['primary_title'];
          }
          this.dataMoM['type'] = this.type
          if (this.type === 'series') {
            type = 'tv'
          }
          apicalls.mediaInformationTMDB(this.dataMoM['tmdbID'], type)
            .then(res1 => {
              this.dataTmdb = res1
              if (this.type === 'series') {
                let add = []
                for (let i in this.dataTmdb['seasons']) {
                  if(this.dataTmdb['seasons'][i]['name'] !== 'Specials') {
                    add.push(this.dataTmdb['seasons'][i])
                  }
                }
                this.totalLength = add
              }
              this.dataTmdb['result'] = true
            })
        })
    },
    nextEpisode () {
      // console.log(this.totalLength)
      if (this.seasonEp['episode'] < this.totalLength[this.seasonEp['season'] - 1]['episode_count']) {
        this.seasonEp['episode']++
      } else if(this.seasonEp['season'] < this.totalLength.length){
        this.seasonEp['episode'] = 1
        this.seasonEp['season']++
      }
    },
    showEpisode (season, episode) {
      this.seasonEp = {season: season, episode: episode}
    },
    showSeasonList (season) {
      document.getElementById("S"+season+"List").style.display  = "inline"
      document.getElementById("S"+season+"List").classList.add("tab-active")
    }
  },
  beforeMount() {
    if(this.id !== undefined) {
      this.getData()
    }
  }
}
</script>

<style>
.stream_title {
  text-align:center;
}
.seasonSelect {
  margin-left:1rem;
  padding:0.5rem;
}
.episodeBtn {
  margin-left:1rem;
  width:3rem;
}
.seasonList {
  display:none;
}
.grid-container {
  display: grid;
  grid-gap: 5px;
  row-gap: 1em;
  justify-items:center;
  margin:1rem;
  /* grid-template-columns: auto auto auto; */
  /* grid-template-rows:repeat(5, auto); */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* grid-auto-flow: column */
}
.season-grid-container {
  display: grid;
  grid-gap: 5px;
  row-gap: 1em;
  justify-items:center;
  margin:1rem;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
}
</style>