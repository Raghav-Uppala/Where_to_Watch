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
          <ul class="menu menu-horizontal px-1" style="width:40%;">
            <select v-model="country"  @change="onChange()" id="countrySelector" class="select select-bordered w-full max-w-xs">
              <option :value="{ code: code, name: country }" v-for="(country, code) in this.codes" :key="code" :id="code">{{country}}</option>
            </select>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import logoSVG from './logoSVG.vue'

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
      this.$emit('code', this.country)
    },
    getCodes () {
      fetch('https://flagcdn.com/en/codes.json').then(response => response.json()).then(result => this.codes = result)
    },
    OnClick(path) {
      this.$router.push(path)
    },
    onResize() {
      this.windowWidth = window.innerWidth
    }

  },
  data: () => ({
    // codes: {"ar":"Arabic","zh":"Chinese","cs":"Czech","da":"Danish","nl":"Dutch","en":"English","fr":"French","de":"German","el":"Greek","fi":"Finnish","he":"Hebrew","hi":"Hindi","hu":"Hungarian","id":"Indonesian","it":"Italian","is":"Icelandic","ja":"Japanese","ko":"Korean","no":"Norwegian","pl":"Polish","pt":"Portuguese","ro":"Romanian","ru":"Russian","es":"Spanish","sv":"Swedish","sw":"Swahili","th":"Thai","tr":"Turkish","vi":"Vietnamese"},
    codes: {},
    country: { "code": "in", "name": "India" },
    windowWidth: window.innerWidth
  }),
  beforeMount () {
    this.getCodes()
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
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