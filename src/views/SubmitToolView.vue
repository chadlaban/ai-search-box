<!-- eslint-disable prettier/prettier -->
<template>
  <div class="body">
    <div class="upper-section"></div>
    <div class="submit-tool pb-5">
      <div class="form-container">
        <div class="form-title-description">
          <h2>Let your AI Tool be known...</h2>
          <article>By submitting your AI Tool information to our platform, you'll benefit from increased visibility within the tech community, networking opportunities, valuable feedback, potential user growth, and a chance to contribute to the AI field's advancement. Join us in showcasing your innovation and connecting with fellow enthusiasts!</article>
        </div>
        <form @submit.prevent="submitForm" class="submit-form mt-4">
          <div class="form-group">
            <label for="toolName">AI Tool Name:</label>
            <input v-model="toolName" type="text" class="form-control" id="toolName" name="toolName" placeholder="What's your AI Tool or Product?" required>
          </div>
          <div class="form-group">
            <label for="toolUrl">AI Tool Website URL:</label>
            <input v-model="toolUrl" type="url" class="form-control" id="toolUrl" name="toolUrl" placeholder="How can we visit you?" required>
          </div>
          <div class="form-group">
            <label for="categories">Categories:</label>
            <div>
              <input
                class="form-control"
                type="text"
                :value="selectedCategoriesText"
                @click="toggleDropdown"
                placeholder="Select the categories associated with the AI Tool..."
                ref="inputField"
                readonly
              />
              <div v-if="isDropdownOpen" class="dropdown-menu fixed-height-dropdown" :style="{ width: inputFieldWidth + 'px' }">
                <label v-for="category in categories" :key="category.ai_use_case_id" class="dropdown-item">
                  <input type="checkbox" v-model="selectedCategories" :value="category.ai_use_case_id">
                  {{ category.ai_use_case_category }}
                </label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="firstName">Your Full Name:</label>
            <input v-model="firstName" type="text" class="form-control" id="fullName" name="fullName" placeholder="We would like to know you..." required>
          </div>
          <div class="form-group">
            <label for="email">Email Address:</label>
            <input v-model="email" type="email" class="form-control" id="email" name="email" placeholder="How can we reach out to you?" required>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      toolName: '',
      toolUrl: '',
      isDropdownOpen: false,
      categories: [],
      selectedCategories: [],
      selectedOptions: [],
      firstName: '',
      lastName: '',
      email: '',
      inputFieldWidth: 0
    };
  },
  computed: {
    selectedCategoriesText() {
      return this.selectedCategories
        .map(id => {
          const category = this.categories.find(cat => cat.ai_use_case_id === id);
          return category ? category.ai_use_case_category : '';
        })
        .join(', ');
    }
  },
  methods: {
    fetchCategories() {
      axios
        .get("http://localhost:3000/ai_use_case") // Replace with your server URL
        .then((response) => {
          this.categories = response.data;
          console.log(this.categories);
        })
        .catch((error) => {
          console.error("Error fetching use case", error);
        });
    },
    submitForm() {
      // Handle form submission here
      console.log('Form submitted');
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    getInputFieldWidth() {
      this.inputFieldWidth = this.$refs.inputField.offsetWidth;
    },
  },
  mounted() {
    this.fetchCategories();
    this.getInputFieldWidth();
  },
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
  background: linear-gradient(180deg,
      rgba(200, 210, 209, 1) 0%,
      rgba(200, 210, 209, 1) 20%,
      rgba(200, 210, 209, 0) 100%);
  padding: 4rem auto 4rem auto;
  height: 20vh;
}

.dropdown-menu {
  display: block; /* Ensure the menu is displayed when open */
}

.fixed-height-dropdown {
  max-height: 200px; /* Adjust the height as needed */
  overflow-y: auto;
}

.submit-tool {
  /* background: rgb(200, 210, 209); */
  background: rgb(202, 210, 209);
  background: linear-gradient(180deg,
      rgba(202, 210, 209, 0) 0%,
      rgba(202, 210, 209, 0.5522584033613445) 40%,
      rgba(202, 210, 209, 1) 90%);
  height: auto;
  display: flex;
  justify-content: center;

  .form-container {
    width: 50%;
    margin: 0;

    .form-title-description > article {
      font-size: 18px;
    }

    .submit-form .form-group {
      margin-bottom: 1.2rem;
    }

    .submit-form .btn {
      background-color: #e29f37;
      color: #FFFFFF;
      border-color: #e29f37;
      float: right;
    }
  }
}
</style>
