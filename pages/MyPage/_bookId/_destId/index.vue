<template>
  <DestPage :authorId="userId" :bookId="bookId" :destId="destId"></DestPage>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$store.getters.userId,
      bookId: this.$route.params.bookId,
      destId: this.$route.params.destId
    };
  },
};
</script>
