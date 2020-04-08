<template>
  <v-flex class="pa-1 item" xs12 sm6 md4 lg3 xl2>
    <v-card>
      <v-toolbar dark class="primary">
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <v-layout v-if="loading" align-center justify-center>
        <SyncLoader class="ma-4"/>
      </v-layout>
      <div class="pa-3">
        <template v-for="(stats, key) in data" >
          <div :key="stats.name" class="my-1">
            <div v-if="typeof stats.value === 'object'">
              <div class="subheading gray-text">{{stats.name}}</div>
              <div v-if="key === 0 && stats.value.length > 5">
                <ul>
                  <li 
                    v-for="value in stats.value.slice(0, sliceBy)" 
                    :key="value+'top'"
                    class="subheading">
                    <v-layout row>
                      {{value[1]}}x {{value[0]}}<v-spacer />{{totalPerc(value, stats) + '%'}}
                    </v-layout>
                    </li>
                </ul>
                <v-btn v-if="key === 0 && sliceBy < stats.value.length " @click="showMore" block>More</v-btn>
              </div>
              <ul v-else>
                <li 
                  v-for="value in stats.value" 
                  :key="value+'top'"
                  class="subheading">
                  <v-layout row>
                    {{value[1]}}x {{value[0]}}<v-spacer />{{totalPerc(value, stats) + '%'}}
                  </v-layout>  
                </li>
              </ul>
            </div>
            <div v-else>
              <div class="subheading gray-text">{{stats.name}}</div>
              <div class="subheading">{{stats.value}}</div>
            </div>
          </div>
        </template>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import { to2Dec } from '@/model/helpers/helpers'
import SyncLoader from '@/components/helpers/SyncLoader'

export default {
    props: [
      'data',
      'loading',
      'title'
    ],
    data: () => ({
      sliceBy: 5,
      totals: {}
    }),
    methods: {
      showMore() {
        this.sliceBy += 5
      },
      totalPerc(value, stats) {
        if (this.totals && Object.keys(this.totals).length === 0) {
          this.calculateTotals()
        }
        const v = 100*value[1]/this.totals[stats.name]
        return to2Dec(v)
      },
      calculateTotals() {
        if (!this.data) return
        this.data.forEach(stats => {
          if (typeof stats.value === 'object') {
            if (stats.name in this.totals) return
            const values = stats.value.map(v => v[1]).reduce((p,c) => p+c)
            this.totals[stats.name] = values
          }
        })
      }
    },
    components: {
      SyncLoader
    },
    watch: {
      data: function() {
        this.calculateTotals()
      }
    },
}
</script>