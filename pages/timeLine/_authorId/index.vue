<template>
    <ProfilePage :authorId="$route.params.authorId" :page="timeLine"></ProfilePage>
</template>

<script>
export default {
  data () {
    return {
      timeLine: 'timeLine'
    }
  }
}
</script>