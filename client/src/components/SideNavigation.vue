<template>

    <v-list dense rounded>
        <v-list-item color="green">
            <v-list-item-title>索引</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group class="mt-2" v-model="selectedIndex">
            <v-fade-transition group leave-absolute>
                <v-list-item v-for="item in questions" :key="item._id"
                             color="green"
                             v-on:click="$vuetify.goTo(`#Q${item._id}`, {
                    duration: 500,
                    offset: 20,
                    easing: 'easeInOutCubic',
                  })">
                    <v-list-item-title>{{item.content}}</v-list-item-title>
                </v-list-item>
            </v-fade-transition>

        </v-list-item-group>

    </v-list>
</template>

<script>
    export default {
        name: "SideNavigation",

        data() {
            return {
                selectedIndex: '',
            }
        },

        methods: {
            appender(index) {
                console.log(this.questions.index);
                if (index <= this.stepquestions.length) {
                    this.appender(++index);
                } else {
                    if (index < this.questions.length) {
                        setTimeout(function () {
                            this.stepquestions.push(this.questions(index));
                            this.appender(++index);
                        }, 100)
                    }
                }
            }
        },

        mounted() {

        },

        props: {
            questions: Array
        },

        watch: {}

    }
</script>

<style scoped>

</style>