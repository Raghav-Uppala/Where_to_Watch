<template>
  <div>
    <dialogBox :data="this.data" :countryCode="countryCode"></dialogBox>
    <div class="card card-side w-96 bg-neutral shadow-xl flex-initial" >
      <figure v-if="img_link != ''" style="width:40;"><img :src=img_link :alt='this.data["title"]'/></figure>
      <div class="card-body" style="width:60%">
        <h2 class="card-title">{{this.data['title']}}</h2>
        <p>{{this.plotshort}}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-sm btn-primary" :onclick="'details_modal_'+ this.data['imdbID'] + '.showModal()'">More details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dialogBox from './dialogBox.vue'
export default {
  name: 'displayContainer',
  components: {
    dialogBox
  },
  methods: {
    async getDetails (name) {
      let encodedName = encodeURI(name);

      if(this.data["posterPath"] != "") {
        this.img_link = "https://image.tmdb.org/t/p/w154/"+this.data["posterPath"];
      } else {
        this.img_link = ""
      }
      this.rating = (this.data["imdbRating"]/10).toString();
      this.plot = this.data["overview"];
      if(this.plot.length > 10){
        this.plotshort =  this.plot.substring(0,40) + "...";
      } else {
        this.plotshort = this.plot
      }

      // this.details = { "Title": "Spring", "Year": "2014", "Rated": "Not Rated", "Released": "20 Mar 2015", "Runtime": "109 min", "Genre": "Horror, Romance, Sci-Fi", "Director": "Justin Benson, Aaron Moorhead", "Writer": "Justin Benson", "Actors": "Lou Taylor Pucci, Nadia Hilker, Francesco Carnelutti", "Plot": "A young man in a personal tailspin flees from US to Italy, where he sparks up a romance with a woman harboring a dark, primordial secret.", "Language": "English, Italian, French, German", "Country": "United States, Italy", "Awards": "5 wins & 13 nominations", "Poster": "https://m.media-amazon.com/images/M/MV5BMjMwNzM2OTk3OF5BMl5BanBnXkFtZTgwNjExOTU0NDE@._V1_SX300.jpg", "Ratings": [ { "Source": "Internet Movie Database", "Value": "6.7/10" }, { "Source": "Rotten Tomatoes", "Value": "85%" }, { "Source": "Metacritic", "Value": "70/100" } ], "Metascore": "70", "imdbRating": "6.7", "imdbVotes": "31,202", "imdbID": "tt3395184", "Type": "movie", "DVD": "22 Nov 2016", "BoxOffice": "$49,970", "Production": "N/A", "Website": "N/A", "Response": "True" };
      
      // try {
      //   const res = await fetch(url);
      //   const data = await res.json();
      //   this.details = data
      // if("Poster" in this.details) {
      //   this.img_link = this.details["Poster"];
      // }
      // this.rating = this.details["imdbRating"];
      // this.plot = this.details["Plot"];
      // if(this.details["Plot"].length > 10){
      //   this.plotshort =  this.plot.substring(0,60) + "...";
      // } else {
      //   this.plotshort = this.plot
      // }
      // } catch (error) {
      //   console.error(error);
      //   console.log(this.details["Title"])
      // }
    }
  },
  data: () => ({
    img_link: "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
    rating: "unknown",
    plot: "unknown",
    services: [],
    genres: {"1":"Biography","2":"Film Noir","3":"Game Show","4":"Musical","5":"Sport","6":"Short","7":"Adult","12":"Adventure","14":"Fantasy","16":"Animation","18":"Drama","27":"Horror","28":"Action","35":"Comedy","36":"History","37":"Western","53":"Thriller","80":"Crime","99":"Documentary","878":"Science Fiction","9648":"Mystery","10402":"Music","10749":"Romance","10751":"Family","10752":"War","10763":"News","10764":"Reality","10767":"Talk Show"}
  }),
  props: {
    data: Object,
    countryCode: String,
  },
  beforeMount() {
    this.getDetails(this.data.title)
  }
}
</script>