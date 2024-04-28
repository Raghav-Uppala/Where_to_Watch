<template>
  <div>
    <topHeader @routeChange="route" @onEnter="value"></topHeader>
    <router-view :key="$route.fullPath" :countryCode="this.countryCode" :data="this.data" :RAPIDAPIKEY="this.RAPIDAPIKEY"></router-view>
  </div>
</template>

<script>
import topHeader from './components/topHeader.vue'
import apicalls from './apicalls.js'
// import displayContainer from './components/displayContainer.vue'


export default {
  name: 'App',
  components: {
    topHeader
    // displayContainer
 ,},
  methods: {
    value (search) {
      // this.data.results = {}

      let msg = encodeURIComponent(search[0]);
      apicalls.queryList(msg)
        .then(res => {
          this.data = {result: false, results: {}}
          for (let i in res['results']) {
            apicalls.mediaInformationMoN(res['results'][i])
              .then(result => {
                if(result['result'] !== 0){
                  let type;
                  if (res['results'][i][0] == 's') {
                    type = 'series'
                  } else if (res['results'][i][0] == 'm') {
                    type = 'movie'
                  }
                  this.data['results'][result[type]['imdbID']] = result[type]
                  this.data['results'][result[type]['imdbID']]['type'] = type
                }
              })
          this.data['result'] = true
          }
        })
      // let countryCode = search[1]["code"];
      // this.countryCode = countryCode
      // console.log(msg);
      // fetch('https://api.allorigins.win/get?url='+encodeURIComponent('https://www.movieofthenight.com/api/search?query='+msg))
      //   .then(response => response.json())
      //   .then(data => JSON.parse(data.contents))
      //   .then(json => this.search = json)
      //   .then( data => {
      //     let counter = 0
      //     for (let i in data["results"]) {
      //       if(counter == 100) {
      //         break;
      //       }
      //       let info = data["results"][i];
      //       // console.log(i, info);
            
      //       let type
      //       if (info[0] == 's') {
      //         type = 'series'
      //       } else if (info[0] == 'm') {
      //         type = 'movie'
      //       }
      //       let id = info.replace(/[^\d-]/g, '');
            
      //       // console.log(type, id, counter)
      //       // console.log(id, type)
      //       fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.movieofthenight.com/api/'+type+'/'+id+'/en')}`)
      //         .then(respone => respone.json())
      //         .then(data => {
      //           counter += 1
      //           let data_json = JSON.parse(data.contents);
      //           if(data_json[type] === undefined) {
      //             console.log("no results", id, type)
      //           } else {
      //             let resp = data_json[type]
      //             resp["type"] = type;
      //             this.data.results[resp["imdbID"]] = resp;
      //             let query = `{ title(id: "`+resp["imdbID"]+`") {
      //                 certificates {
      //                   rating
      //                 }
      //               }
      //             }`
      //             fetch('https://graph.imdbapi.dev/v1', {
      //               method: 'POST',
      //               headers: {
      //                 'Content-Type': 'application/json',
      //               },
      //               body: JSON.stringify({
      //                 query: query
      //               }),
      //             })
      //               .then((res) => res.json())
      //               .then((result) => {
      //                 console.log(result)
      //                 if (result.data.title.certificates != null) {
      //                   this.data['results'][resp["imdbID"]]['certification'] = result.data.title.certificates[0].rating
      //                   console.log(result.data.title.certificates[0].rating)
      //                 }
      //               });
      //           }
      //         });
      //     }
        //   this.data.result = true;
        //   // console.log(this.data.result);
        //   // try {
        //   //   fetch(url, options).then(respone => respone.json()).then(result => this.data = result)
        //   // } catch (error) {
        //   //   console.error(error);
        //   // }
        //   // console.log(this.data["result"]);
        // })
    },
    code (code) {
      this.countryCode = code['code'];
    },
    route (path) {
      this.$router.replace(path)
    }
  },
  data : () => ({
    search: {},
    data: {result: false, results:{}},
    popularMovies: {result: false, results:{}},
    countryCode: 'in',
    name: '',
    capital: ''
  }),
  beforeMount () {
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
</style>