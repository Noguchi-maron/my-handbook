<template>
  <div>
    <ProfilePage :authorId="$route.params.authorId" :page="bookmark"></ProfilePage>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bookmark: 'bookmark'
    }
  }
}
</script>