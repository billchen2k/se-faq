<template>

  <v-list dense rounded>
    <v-list-item color="green">
      <v-list-item-title>索引</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>

    <v-list-item-group class="mt-2">
      <v-list-item color="green">
        <v-list-item-title>宿舍有空调吗？</v-list-item-title>
      </v-list-item>
      <v-list-item color="green">
        <v-list-item-title>宿舍有空调吗？</v-list-item-title>
      </v-list-item>
      <v-list-item color="green">
        <v-list-item-title>宿舍有空调吗？</v-list-item-title>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
    export default {
        name: "SideNavigation",

        props: {
            QA: Object
        }
    }
</script>

<style scoped>

</style>