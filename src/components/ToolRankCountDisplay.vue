<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <button class="like-button">
      <i class="fa-regular fa-thumbs-up fa-lg" style="color: #D9D9D9;"></i><span style="color: #D9D9D9" :key="tool_id">&nbsp;{{ overallRating }}</span>
    </button>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
    props: ['overallRating'],
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.like-button {
    float: right;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.like-button i {
    color: #D9D9D9;
    margin-right: 5px;
}
</style>
