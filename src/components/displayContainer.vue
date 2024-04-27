<template>
  <div>
    <dialogBox :data="this.data" :countryCode="countryCode"></dialogBox>
    <div class="card lg:card-side  w-96 bg-neutral shadow-xl flex-initial" >
      <figure v-if="img_link != ''" class="card_figure" :onclick="'details_modal_'+ this.imdbID + '.showModal()'">
        <img :src=img_link :alt='this.data["title"]' />
        <span class="rating swiper-no-swiping">{{this.rating}}</span>
      </figure>
      <div class="card-body swiper-no-swiping" style="width:60%;max-height: 231px;">
        <h2 class="card-title">{{this.title}}</h2>
        <p style="font-size:15px;overflow-wrap: normal">Genre(s):<b>{{this.genres}}</b></p>
        <p v-if="this.data['type'] == 'movie'">  Run time: <b>{{this.data["runtime"]}} min</b></p>
        <p style="font-size:15px" v-if="this.data['type'] == 'series'"> Seasons: <b>{{this.data['seasons']}}</b></p>
        <div class="card-actions justify-end" style="margin-top: auto;">
          <button class="btn btn-sm btn-primary" :onclick="'details_modal_'+ this.imdbID + '.showModal()'">More details</button>
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
    getDetails () {
      if(this.data["posterPath"] != "" && this.data["posterPath"] != undefined) {
        this.img_link = "https://image.tmdb.org/t/p/original/"+this.data["posterPath"];
      } else if (this.data['posters'] != undefined) {
        this.img_link = this.data['posters'][0]['url']
      } else {
        this.img_link = this.data['imdbID']
      }
      this.rating = (this.data["imdbRating"]/10).toString();
      if(this.data["overview"] !== undefined) {
        this.plot = this.data["overview"];
      } else {
        this.plot = this.data["plot"]
      }
      if(this.plot.length > 10){
        this.plotshort =  this.plot.substring(0,40) + "...";
      } else {
        this.plotshort = this.plot
      }
      if(this.data['title'] !== undefined) {
        this.title = this.data['title'];
      } else if (this.data['primary_title'] !== undefined) {
        this.title = this.data['primary_title'];
      }
      this.imdbID = this.data['imdbID'];
      for (let i in this.data['genres']) {
        this.genres += ' '
        this.genres += this.genreCodex[this.data['genres'][i]]
      }
    }
  },
  data: () => ({
    img_link: "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
    rating: "unknown",
    plot: "unknown",
    services: [],
    genreCodex: {"1":"Biography","2":"Film Noir","3":"Game Show","4":"Musical","5":"Sport","6":"Short","7":"Adult","12":"Adventure","14":"Fantasy","16":"Animation","18":"Drama","27":"Horror","28":"Action","35":"Comedy","36":"History","37":"Western","53":"Thriller","80":"Crime","99":"Documentary","878":"Science Fiction","9648":"Mystery","10402":"Music","10749":"Romance","10751":"Family","10752":"War","10763":"News","10764":"Reality","10767":"Talk Show"},
    imdbID: '',
    title: '',
    genres: ''
  }),
  props: {
    data: Object,
    countryCode: String,
  },
  beforeMount() {
    this.getDetails()
    // let cutoff = 40
    // if(this.title.length > cutoff) {
    //   this.title = this.title.substring(0,cutoff);
    // }
  }
}
</script>

<style>
.rating {
  background: rgb(42, 50, 60);
  border-radius: 3px;
  color: #fff;
  font-size: 11px;
  height: auto;
  line-height: normal;
  padding: 4px 6px;
  position: absolute;
  left: 8px;
  top: 8px;
  width: auto;
  z-index: 4;
}

.card_figure {
  width: 154px;
}
.card-body {
  padding-left:1rem;
  padding-right:1rem;
  padding-top:1rem;
  padding-bottom: 1rem;
}
.card-body :where(p) {
  flex-grow: 0;
}
@media only screen and (max-width: 1000px) {
  .card_figure {
    width:auto;
  }
}

</style>