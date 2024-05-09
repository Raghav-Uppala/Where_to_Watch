<template>
  <div class="navbar bg-base-100">
    <div class="flex-initial w-">
      <router-link to="/" class="btn btn-ghost text-xl" @onclick="reset"><logoSVG width="50px" height="40px" viewBox="0 0 90 90"></logoSVG><span v-if="this.windowWidth > 1000">Where to Watch</span></router-link>
    </div>
    <div sytle="justify-self:center;">
      <div class="flex-initial gap-10 ">
        <div class="form-control">
          <input @onClick="OnClick('/results')" @keyup.enter="onEnter(message);OnClick('/results')" v-model="message" id="search_input" type="text" placeholder="Search" class="input input-bordered"/>
        </div>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1" style="width:100%;">
          <select @change="onChange()" id="countrySelector" class="select select-bordered w-full max-w-xs">
            <option :value="code" v-for="(country, code) in this.codes" :key="code['countryCode']" :id="code['countryCode']">{{this.codes[code]['name']}}</option>
          </select>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import logoSVG from './logoSVG.vue'
import countryData from "../assets/countryData.json"
import apicalls from '../apicalls.js'

export default {
  name: 'topHeader',
  components: {
    logoSVG,
  },
  methods: {
    onEnter (message) {
      this.$emit('onEnter', [message, this.country])
    },
    reset() {
      this.$emit('reset', true)
    },
    onChange() {
      this.country = {code: document.getElementById("countrySelector").value, name: this.codes[document.getElementById("countrySelector").value]['name']}
      this.$emit('code', this.country)
    },
    OnClick(path) {
      this.$router.push(path)
    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    showPosition(position) {
      apicalls.getCountry(position)
        .then(res => {
          if (res['address']["country_code"] in countryData){
            document.getElementById("countrySelector").value = res['address']["country_code"]
          }
        })
    }
  },
  data: () => ({
    codes: countryData,
    country: { "code": "us", "name": "United States" },
    windowWidth: window.innerWidth
  }),
  beforeMount () {
    navigator.geolocation.getCurrentPosition(this.showPosition)
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    document.getElementById("countrySelector").value = "us"
  },
  beforeUnmount() { 
    window.removeEventListener('resize', this.onResize); 
  }
}
</script>

<style>
.form-control {
  width:20rem;
}

@media screen and (max-width:1000px){
  .form-control {
    width:10rem;
  }
}
</style>