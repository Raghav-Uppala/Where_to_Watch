<template>
  <dialog style="padding:;" :id="'details_modal_'+ this.imdbID" class="modal swiper-no-swiping">
    <div class="modal-box w-auto max-w-5xl modal-bottom sm:modal-middle">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="flex">
        <figure v-if="windowWidth > 1000" width="300px">
          <img :src=img_link style="width:300px;">
        </figure>
        <div style="margin-left:2vw;">
          <h2 class="text-4xl">{{this.title}}</h2>
          <br>
          <div style="font-weight:bold;"><span>{{this.certification}}</span>Rating: {{this.rating}} • Genre(s):<span v-for="(genre,index) in this.data['genres']" :key="index" style="padding-left:0.4rem;">{{this.genres[genre]}}</span> <span v-if="this.data['type'] == 'movie'"> • {{this.data["year"]}} • Run time: {{this.data["runtime"]}}</span><span v-else> • {{this.data['firstAirYear']}} - {{this.data['lastAirYear']}} </span></div>
          <p style="margin-top:1vw;">{{this.plot}}</p>
          <br>
          <div>
            <!-- <img style="height:50px;" src="../assets/play-button.png"> -->
            <p>Where to Watch:</p>
            <div class="flex justify-center">
              <a style="width:64px; margin-left:1rem;" v-for="(service, index) in this.streamingAvailable(this.countryCode)" :key="index" :href="service['link']"><img :src="this.getServiceLink(service['service'])"><p style="font-size:10px; text-align: center;">{{service["streamingType"]}} {{service["quality"]}}</p></a>
            </div>
            <router-link class="flex justify-center" style="margin-top:1.5rem;" :to="{ path: '/stream', query: { id: this.data['id'], imdb: this.imdbID, type: this.data['type'] }}"><div style="display:flex;align-items: center;"><p style="margin-right:0.5rem;">click to play:</p> <img src="../assets/play-button.png" style="height:50px;"></div></router-link>
          </div>
          <!-- <div v-else>
            <p>Not avialable to stream</p>
          </div> -->
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script>
export default {
  name: 'dialogBox',
  data: () => ({
    img_link: "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
    rating: "unknown",
    plot: "unknown",
    services: [],
    genres: {"1":"Biography","2":"Film Noir","3":"Game Show","4":"Musical","5":"Sport","6":"Short","7":"Adult","12":"Adventure","14":"Fantasy","16":"Animation","18":"Drama","27":"Horror","28":"Action","35":"Comedy","36":"History","37":"Western","53":"Thriller","80":"Crime","99":"Documentary","878":"Science Fiction","9648":"Mystery","10402":"Music","10749":"Romance","10751":"Family","10752":"War","10763":"News","10764":"Reality","10767":"Talk Show"},
    certification: '',
    imdbID: '',
    title: '',
    windowWidth: window.innerWidth
  }),
  props: {
    data: Object,
    countryCode: String
  },
  methods: {
    getServiceLink(service) {
      let links = {"netflix":'netflix.com', "hulu": "hulu.com", "zee5": "zee5.com", "prime": "primevideo.com", "hotstar": "hotstar.com"}
      
      if(service in links) {
        return 'https://api.cufinder.io/logo/'+ links[service]
      } else {
        return 'https://api.cufinder.io/logo/'+ service + ".com"
      }
    
    },
    streamingAvailable(code) {
      let services = {}
      if(this.data['streamingInfo'] != {}) {
        for (let service in this.data['streamingInfo']) {
          // console.log(this.data['streamingInfo'][service])
          if (code in this.data['streamingInfo'][service]) {
            // console.log(services)
            services[service] = this.data['streamingInfo'][service][code]
            services[service]['service'] = service
          }
        }
      }
      if (Object.keys(services).length  === 0) {
        return false
      }
      return services
    }
  },
  beforeMount() {
    if(this.data["posterPath"] != "" && this.data["posterPath"] != undefined) {
      this.img_link = "https://image.tmdb.org/t/p/original/"+this.data["posterPath"];
    } else {
      this.img_link = ""
    }
    this.rating = (this.data["imdbRating"]/10).toString();
    // this.certification = this.data["certification"];
    // console.log(this.certification)
    this.plot = this.data["overview"];
    this.imdbID = this.data['imdbID'];
    if(this.data['title'] !== undefined) {
      this.title = this.data['title'];
    } else if (this.data['primary_title'] !== undefined) {
      this.title = this.data['primary_title'];
    }
  }
}
</script>

<style>
.vidsrc {
  /* background-color:white; */
  background-image:url('../assets/vidapi-logo-svg.png');
  height:64px;
}
</style>