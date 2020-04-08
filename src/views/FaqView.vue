<template>
    <v-content>
        <v-container>
            <div class="display-1 my-2">Frequently Asked Questions</div>
            <div v-for="category in categories" :key="category">
                <h2>{{category}}</h2>
                <div v-for="item in faqData[category].items" :key="item.id" :id="item.id">
                    <h3>{{item.title}}</h3>
                    <div v-if="typeof item.body === 'object'">
                        <ol>
                            <li v-for="li in item.body" :key="li" v-html="li" />
                        </ol>
                    </div>
                    <div v-else v-html="item.body"/>
                    <br v-if="typeof item.body === 'object' && typeof item.table === 'object'" />
                    <div v-if="typeof item.table === 'object'">
                        <table class="v-datatable v-table elevation-1 striped" :class="darkMode ? 'theme--dark' : 'theme--light'">
                            <tr v-for="tr in item.table" :key="tr + Math.random()" class="v-border">
                                <td 
                                    v-for="(td, i) in tr" 
                                    :key="td + Math.random()" 
                                    class="pa-2" 
                                    :class="i === 0 ? 'text-xs-right' : 'text-xs-center'"
                                    v-html="td">
                                </td>
                            </tr>
                        </table>
                    </div>
                    <br>    
                </div>
            </div>
        </v-container>
    </v-content>
</template>

<script>
import faqData from '@/data/faq'
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        faqData
    }),
    computed: {
        ...mapGetters({
            darkMode: 'user/darkMode'
        }),
        categories() {
            return Object.keys(this.faqData)
        }
    },
    mounted() {
        if (this.$route.hash) {
            const element = document.getElementById(this.$route.hash.slice(1))
            if (element) {
                const top = element.offsetTop - 100
                window.scrollTo(0,top)
            }
        }
    }
}
</script>

<style>
.v-border {
    border-top: 1px solid;
    border-color: rgba(0,0,0,0.3);
}
.striped > tr:nth-child(even) {
    background-color: rgba(0,0,0,0.08)
}
</style>