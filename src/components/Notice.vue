<template>
  <v-card  class="mt-6">
    <v-card-title>
      <v-icon v-if="icon">{{icon}}</v-icon>
      {{title}}</v-card-title>
    <v-card-text class="pt-1" v-for="paragraph in content.split('\n')" :key="paragraph">
      <span v-html="paragraph"></span>
    </v-card-text>
  </v-card>
</template>

<script>
    export default {
        name: "Notice",
        props: {
            icon: String,
            title: String,
            content: String
        }
    }
</script>

<style scoped>

</style>