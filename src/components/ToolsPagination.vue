<!-- eslint-disable prettier/prettier -->
<!-- <template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          class="page-link"
          @click="changePage(currentPage - 1)"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span> Previous
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" @click="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a
          class="page-link"
          @click="changePage(currentPage + 1)"
          aria-label="Next"
        >
          Next <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template> -->
<!-- eslint-disable prettier/prettier -->
<!-- <script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("page-change", page);
      }
    },
  },
};
</script> -->
<!-- eslint-disable prettier/prettier -->
<!-- <style scoped>
nav {
  display: flex;
  justify-content: center;
}
</style> -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <div class="mt-3">
      <ul class="list-group">
        <li class="list-group-item" v-for="item in displayedItems" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </div>

    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" @click="previousPage" href="#">Previous</a>
      </li>
      <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
        <a class="page-link" @click="changePage(page)" href="#">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" @click="nextPage" href="#">Next</a>
      </li>
    </ul>


  </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script>
export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5, // Number of items to display per page
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        { id: 4, name: 'Item 4' },
        { id: 5, name: 'Item 5' },
        { id: 6, name: 'Item 6' },
        { id: 7, name: 'Item 7' },
        { id: 8, name: 'Item 8' },
        { id: 9, name: 'Item 9' },
        { id: 10, name: 'Item 10' },
        { id: 11, name: 'Item 11' },
        { id: 12, name: 'Item 12' },
      ],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    },
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.data.slice(startIndex, endIndex);
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>
<!-- eslint-disable prettier/prettier -->
<style>
/* Add Bootstrap styles here if needed */
</style>
