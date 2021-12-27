<template>
  <BooksPage :authorId="''" :bookId="bookId" :pageName="'mypage'"></BooksPage>
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