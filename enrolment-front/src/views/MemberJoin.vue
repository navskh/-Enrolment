<template>
  <div>Memberjoin</div>
</template>

<script>
export default {
  created() {
    this.$axios
      .get("http://211.204.56.20:8000/Sugang/Memberjoin.jsp")
      .then(function (response) {
        console.log(response);
      });
  },
};
</script>

<style></style>
