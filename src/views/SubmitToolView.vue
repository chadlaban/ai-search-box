<!-- eslint-disable prettier/prettier -->
<template>
  <div class="body">
    <div class="upper-section"></div>
    <div class="submit-tool pb-5">
      <div class="form-container">
        <h2>Submit AI Tool</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
              <label for="toolName">AI Tool Name:</label>
              <input v-model="toolName" type="text" class="form-control" id="toolName" name="toolName" required>
          </div>
          <div class="form-group">
              <label for="toolUrl">AI Tool Website URL:</label>
              <input v-model="toolUrl" type="url" class="form-control" id="toolUrl" name="toolUrl" required>
          </div>
          <div class="form-group">
              <label for="categories">Categories:</label>
              <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="categoriesDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Select Categories
                  </button>
                  <div class="dropdown-menu" aria-labelledby="categoriesDropdown">
                      <a v-for="category in categories" :key="category" class="dropdown-item" @click="toggleCategory(category)">
                          <input type="checkbox" :checked="selectedCategories.includes(category)">
                          {{ category }}
                      </a>
                  </div>
              </div>
          </div>
          <div class="form-group">
              <label for="firstName">First Name:</label>
              <input v-model="firstName" type="text" class="form-control" id="firstName" name="firstName" required>
          </div>
          <div class="form-group">
              <label for="lastName">Last Name:</label>
              <input v-model="lastName" type="text" class="form-control" id="lastName" name="lastName" required>
          </div>
          <div class="form-group">
              <label for="email">Email Address:</label>
              <input v-model="email" type="email" class="form-control" id="email" name="email" required>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
  data: function() {
    return {
          toolName: '',
          toolUrl: '',
          categories: ['Category 1', 'Category 2', 'Category 3'],
          selectedCategories: [],
          firstName: '',
          lastName: '',
          email: ''
      };
  },
  methods: {
      toggleCategory(category) {
          if (this.selectedCategories.includes(category)) {
              const index = this.selectedCategories.indexOf(category);
              this.selectedCategories.splice(index, 1);
          } else {
              this.selectedCategories.push(category);
          }
      },
      submitForm() {
          // Handle form submission here
          console.log('Form submitted');
      }
  }
}
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.body {
  animation: myAnim 1s ease 0s 1 normal forwards;
}

@keyframes myAnim {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.upper-section {
  background: rgb(200, 210, 209);
  background: linear-gradient(
    180deg,
    rgba(200, 210, 209, 1) 0%,
    rgba(200, 210, 209, 1) 20%,
    rgba(200, 210, 209, 0) 100%
  );
  padding: 4rem auto 4rem auto;
  height: 20vh;
}

.submit-tool {
  /* background: rgb(200, 210, 209); */
  background: rgb(202, 210, 209);
  background: linear-gradient(
    180deg,
    rgba(202, 210, 209, 0) 0%,
    rgba(202, 210, 209, 0.5522584033613445) 40%,
    rgba(202, 210, 209, 1) 90%
  );
  height: auto;
  display: flex;
  justify-content: center;

  .form-container {
    width: 50%;
    margin: 0;
  }
}
</style>
