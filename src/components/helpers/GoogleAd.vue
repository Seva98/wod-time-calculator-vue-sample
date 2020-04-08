<template>
    <div v-if="!rephaos && ads" style="margin: 0 auto;">
        <script2
            type="text/javascript"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            async="true" />
        <ins
            v-if="type ==='in-article'" 
            class="adsbygoogle"
            style="display:block; text-align:center;"
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="EMPTY"
            data-ad-slot="EMPTY">
        </ins>
        <ins
            v-else-if="type === 'generic'"
            class="adsbygoogle"
            style="display:block; text-align:center;"
            data-ad-client="EMPTY"
            data-ad-slot="EMPTY"
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
        <ins 
            v-else-if="type ==='relevant-content'" 
            class="adsbygoogle"
            style="display:block; text-align:center;"
            data-ad-format="autorelaxed"
            data-ad-client="EMPTY"
            data-ad-slot="EMPTY"></ins>
        <script2 type="text/javascript">
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script2>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        type: {
            type: String,
            default: 'article'
        }
    },
    data: () => ({
        ads: process.env.NODE_ENV === 'production'
    }),
    computed: {
        ...mapGetters({
            rephaos: 'user/rephaos'
        })
    }
}
</script>