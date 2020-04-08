<template>
    <v-layout row wrap justify-center>
        <v-card class="ma-5" xs12 sm6 md4 lg3 xl2>
            <v-toolbar dark class="primary">
                <v-toolbar-title>{{sender}} requires login</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="subheading">
                <p>
                    Please <router-link to="/login">log in</router-link> to get access to {{sender}}
                </p>
                <div>
                    <b>Logging in unlocks:</b>
                    <ul>
                        <li>Profile View</li>
                        <li>More accurate workout results</li>
                        <li>More accurate strength level results</li>
                        <li>Smart feedback</li>
                    </ul>
                </div>
            </v-card-text>
        </v-card>
    </v-layout>
</template>

<script>
export default {
    props: {
        sender: {
            type: String,
            default: ''
        }
    }

}
</script>