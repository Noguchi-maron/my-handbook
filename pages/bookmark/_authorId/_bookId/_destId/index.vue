<template>
  <DestPage :authorId="userId" :bookId="bookId" :destId="destId"></DestPage>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.params.authorId,
      bookId: this.$route.params.bookId,
      destId: this.$route.params.destId
    };
  },
};
</script>
