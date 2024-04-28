<template>
  <div>
    <div style="width:90%; margin:auto; margin-left:10px;">
      <h2 class="mb-0 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl sm:text-6xl dark:text-white">Popular Movies</h2>
      <br>
    </div>
    <div v-if="this.popMovieData.result != false" style="align-items:center;">
      <swiper
        class="swiper"
        style="align-items:center;"
        :modules="modules"
        :width="400"
        :slides-per-view="auto"
        navigation
      >
        <swiper-slide class="swiper_slide" v-for="(item, index) in this.popMovieData.results.items" :key="index">
          <displayContainer :data=item :countryCode=countryCode>/</displayContainer>
        </swiper-slide>
      </swiper>
    </div>
    <div class="divider"></div>
    <div style="width:90%; margin:auto; margin-left:10px;">
      <h2 class="mb-0 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl sm:text-6xl dark:text-white">Popular TV-Series</h2>
      <br>
    </div>
    <div v-if="this.popSeriesData.result != false" style="align-items:center;">
      <swiper
        class="swiper"
        style="align-items:center;"
        :modules="modules"
        :width="400"
        :slides-per-view="auto"
        navigation
      >
        <swiper-slide class="swiper_slide" v-for="(item, index) in this.popSeriesData.results.items" :key="index">
          <displayContainer :data=item :countryCode=countryCode>/</displayContainer>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import displayContainer from './displayContainer.vue'
import apicalls from '../apicalls.js'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default {
  name: 'homeView',
  components: {
    displayContainer,
    Swiper,
    SwiperSlide,
  },
  props: {
    countryCode: Object,
    RAPIDAPIKEY: String
  },
  setup() {
      return {
        modules: [Navigation, Pagination, Scrollbar, A11y],
      };
  },
  methods: {
    async getData() {
      const url = 'https://api.allorigins.win/get?url=https://api.themoviedb.org/3/movie/popular?api_key=fafd557815b34aad4382bb0d71992694';
      try {
        const res = await fetch(url);
        const results = await res.json();
        const data = JSON.parse(results.contents)
        this.data['result'] = true
        let counter = 0 
        for (let i in data['results']) {
          if (counter >= 100) {
            break;
          }
          this.data['results'][data['results'][i]['id']] = data['results'][i]
          this.data['results'][data['results'][i]['id']]['certification'] = ''

          try {
            fetch("https://api.allorigins.win/get?url=https://api.themoviedb.org/3/movie/"+data['results'][i]['id']+"/external_ids?api_key=fafd557815b34aad4382bb0d71992694").then(response => response.json()).then(result => {
              let imdbID = JSON.parse(result.contents)['imdb_id']
              let query = `{
                title(id: "`+imdbID+`") {
                  certificates {
                    rating
                  }
                }
              }`
              fetch('https://graph.imdbapi.dev/v1', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  query: query
                }),
              })
                .then((res) => res.json())
                .then((result) => {
                  if (result.data.title.certificates != null) {
                    this.data['results'][data['results'][i]['id']]['certification'] = result.data.title.certificates[0].rating
                  }
                });
              });
          } catch(error) {
            console.log(error, "homeVue tmdb")
          }
          // try {
          //   fetch("http://api.themoviedb.org/3/movie/"+data['results'][i]['id']+"?api_key=fafd557815b34aad4382bb0d71992694&append_to_response=release_dates").then(response => response.json()).then(result => {
          //     this.specific_data[result] = true;
          //     this.specific_data[data["results"][i]['id']] = result;
          //     this.specific_data[data["results"][i]['id']]['type'] = 'movie';
          //     for (let x in this.specific_data[data["results"][i]['id']]['release_dates']['results']) {
          //       if (this.specific_data[data["results"][i]['id']]['release_dates']['results'][x]['iso_3166_1'] == "US") {
          //         let row = this.specific_data[data["results"][i]['id']]['release_dates']['results'][x]
          //         // console.log(row, row['release_dates'][0]['certification'], this.data['results'][data['results'][i]['id']]['title'])
          //         if (row['release_dates'][0]['certification'] !== undefined) {
          //           this.data['results'][data['results'][i]['id']]['certification'] = row['release_dates'][0]['certification']
          //         }
          //       }
          //     }
          //   })
          // } catch (error) {
          //   console.log(error)
          // }
          counter += 1;
        }
      } catch (error) {
        console.log(error, "homeVue")
      }
      // console.log(this.data)
    },
    getPopularMovies() {
      apicalls.popularMoviesMoM('us')
        .then(res => {
          this.popMovieData['results'] = res
          for (let i in this.popMovieData['results']['items']) {
            this.popMovieData['results']['items'][i]['type'] = 'movie'
          }
          this.popMovieData['result'] = true
          // for (let i in this.popMovieData['results']['items']) {
          //   apicalls.mediaInformationIMDB(this.popMovieData['results']['items'][i]['imdbID'])
          //     .then(res1 => {
          //       if(res1['data']['title']['certificates'] == null) {
          //         this.popMovieData['results']['items'][i]['certification'] = null
          //       } else {
          //         this.popMovieData['results']['items'][i]['certification'] = res1['data']['title']['certificates']['rating']
          //       }
          //     }) 
          // }
        })

      // apicalls.popularMoviesTMDB('movie')
      //   .then(res1 => {
      //     for (let i in res1['results']) {
      //       if(i >10) {
      //         break;
      //       }
      //       apicalls.mediaInformationTMDB(res1['results'][i]['id'], 'movie')
      //         .then(res2 => {
      //           console.log(res2)
      //           apicalls.mediaInformationIMDB(res2['imdb_id'])
      //             .then(res3 => {
      //               this.popMoviedata['result'] = true
      //               this.popMoviedata['results'] = {
      //                 "posterPath": res2["poster_path"],
      //                 "streamingInfo": res2["streaming_info"],
      //                 'res3': res3
      //               }
      //             })
      //         })
      //     }
      //   })
    },
    getPopularSeries() {
      apicalls.popularSeriesMoM('us')
        .then(res => {
          this.popSeriesData['results'] = res
          for (let i in this.popSeriesData['results']['items']) {
            this.popSeriesData['results']['items'][i]['type'] = 'series'
          }
          this.popSeriesData['result'] = true
      })
    },
  },
  data : () => ({
    popSeriesData: {result: false, results:{}},
    popMovieData: { "result": true, "results": {}}
  }),
  beforeMount() {
    this.getPopularMovies()
    this.getPopularSeries()
  } 
}
</script>

<style>
#grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 5px;
  row-gap: 1em;
}
.swiper-button-prev{
    color: rgb(100, 26, 230); 
}
.swiper-button-next{
    color: rgb(100, 26, 230); 
}
.swiper {
  height:270px;
}

@media only screen and (max-width: 1000px) {
  .swiper {
    height:795px;
    margin-left:5px;
    left:5px;
  }
}
</style>