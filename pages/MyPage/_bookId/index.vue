<template>
  <BooksPage :authorId="''" :bookId="bookId"></BooksPage>
</template>

<script>
export default {
  data () {
    return {
      bookId: this.$route.params.bookId
    }
  }
}
</script>