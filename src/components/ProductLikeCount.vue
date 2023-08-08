<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <button class="like-button" @click="incrementCount">
      <i class="fa-regular fa-thumbs-up fa-lg" style="color: #D9D9D9;"></i><span style="color: #D9D9D9">&nbsp;{{ likeCount }}</span>
    </button>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  data() {
    return {
      likeCount: 0,
    };
  },
  methods: {
    incrementCount() {
      this.likeCount++;
    },
  },
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
