<template>
  <div class="navbar bg-base-100">
      <div class="flex-initial w-">
        <a class="btn btn-ghost text-xl">Where to Watch</a>
      </div>
      <div sytle="justify-self:center;">
        <div class="flex-initial gap-10 ">
          <div class="form-control" style="width:20rem;">
            <input @keyup.enter="onEnter(message)" v-model="message" id="search_input" type="text" placeholder="Search" class="input input-bordered"/>
          </div>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1" style="width:50%;">
            <select v-model="country"  @change="onChange()" id="countrySelector" class="select select-bordered w-full max-w-xs">
              <option :value="{ code: code, name: country }" v-for="(country, code) in this.codes" :key="code" :id="code">{{country}}</option>
            </select>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'topHeader',
  methods: {
    onEnter (message) {
        this.$emit('onEnter', [message, this.country])
    },
    onChange() {
      this.$emit('code', this.country)
    },
    getCodes () {
      fetch('https://flagcdn.com/en/codes.json').then(response => response.json()).then(result => this.codes = result)
    }

  },
  data: () => ({
    // codes: {"ar":"Arabic","zh":"Chinese","cs":"Czech","da":"Danish","nl":"Dutch","en":"English","fr":"French","de":"German","el":"Greek","fi":"Finnish","he":"Hebrew","hi":"Hindi","hu":"Hungarian","id":"Indonesian","it":"Italian","is":"Icelandic","ja":"Japanese","ko":"Korean","no":"Norwegian","pl":"Polish","pt":"Portuguese","ro":"Romanian","ru":"Russian","es":"Spanish","sv":"Swedish","sw":"Swahili","th":"Thai","tr":"Turkish","vi":"Vietnamese"},
    codes: {},
    country: { "code": "in", "name": "India" }
  }),
  beforeMount () {
    this.getCodes()
  }
}
</script>