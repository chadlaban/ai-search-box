<!-- eslint-disable prettier/prettier -->
<template>
  <div class="body">
    <!-- Header Section -->
    <div class="container-fluid" id="header-section">
      <section>
        <div class="row">
          <div class="col-lg-8 offset-lg-2 section-contents">
            <h1 class="mb-3">AI SearchBox</h1>
            <p class="lead">Get ready to unlock new possibilities with the largest AI tools directory.</p>

            <!-- Search Bar -->
            <form class="search-input">
              <div class="input-group mb-3 header-search-bar">
                <input type="text" class="form-control" v-model="searchKeyword" placeholder="Search AI tool here"
                  @keyup.enter="filterData" />
                <div class="input-group-append">
                  <button class="btn" type="button" @click="filterData">
                    <i class="fa-solid fa-magnifying-glass fa-xl" style="color: #C8D2D1;"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>

    <!-- Featured and Trending Tools section -->
    <div class="container-fluid mt-4" id="featured-trending-section" v-if="hideElements">
      <div class="row">
        <!-- Left Column -->
        <div class="col col-md-5">
          <!-- Featured Card -->
          <h5 class="mb-4">Featured Tool</h5>
          <featured-tool :cards="cards"></featured-tool>
        </div>

        <!-- Right Column -->
        <div class="col col-md-7">
          <div class="row">
            <!-- Left Column Cards -->
            <h5 class="mb-4">Trending Tools</h5>
            <trending-tools :cards="cards"></trending-tools>
          </div>
        </div>
      </div>
    </div>

    <hr class="body-divider" style="margin: auto 10rem; opacity: .1;" />

    <!-- AI Tools filter and cards -->
    <div class="container-fluid mt-4" id="filter-and-tools-section">
      <div class="row">
        <!-- Left Column -->
        <div class="col-md-2">
          <!-- Expandable Checkbox Filters -->
          <!-- Bootstrap card -->
          <div class="card mb-4">
            <!-- Card header with toggle button -->
            <div class="card-header" id="category-headers" @click="toggleCardSortBy">
              <h5 class="mb-0">Sort By</h5>
              <div>
                <i :class="{ 'fa-regular fa-circle-up fa-lg': isExpandedSortBy, 'fa-regular fa-circle-down fa-lg': !isExpandedSortBy }"
                  style="color: #C8D2D1;"></i>
              </div>
            </div>

            <!-- Card body (content) with Vue conditional rendering -->
            <div class="card-body" v-if="isExpandedSortBy">
              <!-- Placeholder for checkbox filters -->
              <div class="form-group">
                <label class="checkbox">
                  <input type="checkbox" /> Newest to Oldest
                </label>
              </div>
              <hr style="margin: 10px 1rem; opacity: .050;" />
              <div class="form-group">
                <label class="checkbox">
                  <input type="checkbox" /> Top Rated
                </label>
              </div>
              <hr style="margin: 10px 1rem; opacity: .050;" />
              <div class="form-group">
                <label class="checkbox">
                  <input type="checkbox" /> Most Favourites
                </label>
              </div>
            </div>
          </div>

          <!-- Bootstrap card -->
          <div class="card mb-4">
            <!-- Card header with toggle button -->
            <div class="card-header" id="category-headers" @click="toggleCardPricing">
              <h5 class="mb-0">Pricing</h5>
              <div>
                <i :class="{ 'fa-regular fa-circle-up fa-lg': isExpandedPricing, 'fa-regular fa-circle-down fa-lg': !isExpandedPricing }"
                  style="color: #C8D2D1;"></i>
              </div>
            </div>

            <!-- Card body (content) with Vue conditional rendering -->
            <div class="card-body" v-if="isExpandedPricing">
              <!-- Placeholder for checkbox filters -->
              <div class="form-group">
                <label class="checkbox">
                  <input type="checkbox" /> Free
                </label>
              </div>
              <hr style="margin: 10px 1rem; opacity: .050;" />
              <div class="form-group">
                <label class="checkbox">
                  <input type="checkbox" /> Trial
                </label>
              </div>
              <hr style="margin: 10px 1rem; opacity: .050;" />
              <div class="form-group">
                <label class="checkbox">
                  <input type="checkbox" /> Paid
                </label>
              </div>
              <hr style="margin: 10px 1rem; opacity: .050;" />
              <div class="form-group">
                <label class="checkbox">
                  <input type="checkbox" /> Premium
                </label>
              </div>
            </div>
          </div>

          <!-- Bootstrap card -->
          <div class="card mb-4">
            <!-- Card header with toggle button -->
            <div class="card-header" id="category-headers" @click="toggleCardCategory">
              <h5 class="mb-0">Categories</h5>
              <div v-if="isExpandedCategory" key="up">
                <i class="fa-regular fa-circle-up fa-lg"
                  style="color: #C8D2D1;"></i>
              </div>
              <div v-else key="down">
                <i class="fa-regular fa-circle-down fa-lg"
                  style="color: #C8D2D1;"></i>
              </div>
            </div>

            <!-- Card body (content) with Vue conditional rendering -->
            <div class="card-body card-filters" v-if="isExpandedCategory">
              <!-- Placeholder for checkbox filters -->
              <div class="category-container" v-for="category in allCategories" :key="category">
                <div class="form-group">
                  <label class="checkbox">
                    <input class="form-check-input" type="checkbox" v-model="selectedCategories" :value="category"
                      @change="filterData" />
                    {{ getCategoryName(category) }}
                  </label>
                  <div class="form-text">
                    ({{ categoryCounts[category] }})
                  </div>
                </div>
                <hr style="margin: 10px 0rem; opacity: .050;" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="col-md-10 ai-tool-list-container">
          <div class="row">
            <!-- Right Column Cards -->
            <div class="col-md-4 mb-5 ai-tool-list" v-for="card in displayedCards" :key="card.tool_id">
              <div class="card">
                <div class="card-header" id="card-header" style="cursor: pointer;">
                  <div class="card-title-container">
                    <div style="display: flex;">
                      <div class="tool-pricing-icon">
                        <i class="fa-solid fa-dollar-sign fa-xl pricing-icon" style="color: #ffffff;"></i>
                      </div>
                      <h5 class="card-title">{{ card.tool_name }}</h5>
                      <tool-star-rating class="star-rating" :selected-star="`${card.star_rating}`"></tool-star-rating>
                      <p hidden>{{ card.tool_description }}</p>
                    </div>
                    <div>
                      <tool-rank-count-display class="like-count"
                        :overall-rating="`${card.sum_likes_rating}`"></tool-rank-count-display>
                    </div>
                  </div>
                  <span class="badge badge-pill badge-light" v-for="useCase in card.use_case_id"
                    :key="useCase.ai_use_case_id" @click.prevent="toggleCategorySelection(useCase)"
                    :class="{ 'selected': isSelectedCategory(useCase) }">
                    {{ getCategoryName(useCase) }}
                  </span>

                  <!-- <span
                    v-for="category in card.categories"
                    :key="category.id"
                    @click="toggleCategorySelection(category.id)"
                  ></span> -->
                </div>
                  <div class="card-body" id="card-body" @click.prevent="handleCardClick(card.tool_id)" 
                    style="cursor: pointer;">
                    <div class="card-image-wrapper">
                      <img class="img-fluid tool-image" :src="getImageUrl(card.screenshot_file_path)" :alt="card.tool_name" />
                    </div>
                    <card-on-hover :description="card.tool_description"></card-on-hover>
                  </div>
              </div>
            </div>

            <div v-if="filteredCards.length !== 0 && searchKeyword !== ''">
              <related-tools-on-search :filteredCards="filteredCards" :cards="cards" :categories="categories"
                v-if="searchKeyword">
              </related-tools-on-search>
            </div>
              

            <div v-if="filteredCards.length === 0 && searchKeyword">
              <div class="container">
                <div class="row">
                  <div class="col">
                    <h4>No Results Found</h4>
                    <p>Sorry, but we couldn't find any results matching your search criteria.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="pagination">
              <button class="btn btn-light" @click="previousPage" :disabled="currentPage === 1"
                style="border-radius: 5px 0px 0px 5px;">
                <i class="fa-solid fa-arrow-left-long"></i>&nbsp;Previous
              </button>
              <button class="btn btn-light page-numbers" v-for="page in totalPages" :key="page" @click="goToPage(page)"
                :class="{ active: currentPage === page }" style="border-radius: 0px;">
                {{ page }}
              </button>
              <button class="btn btn-light" @click="nextPage" :disabled="currentPage === totalPages"
                style="border-radius: 0px 5px 5px 0px;">
                Next&nbsp;<i class="fa-solid fa-arrow-right-long"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ToolStarRating from "@/components/ToolStarRating.vue";
import ToolRankCountDisplay from "@/components/ToolRankCountDisplay.vue";
import TrendingTools from "@/components/TrendingTools.vue";
import FeaturedTool from "@/components/FeaturedTool.vue";
import CardOnHover from "@/components/CardOnHover.vue";
import RelatedToolsOnSearch from "@/components/RelatedToolsOnSearch.vue";

export default {
  components: {
    ToolStarRating,
    ToolRankCountDisplay,
    TrendingTools,
    FeaturedTool,
    CardOnHover,
    RelatedToolsOnSearch,
  },
  data() {
    return {
      cards: [],
      categories: [],
      selectedCategories: [],
      searchKeyword: "",
      imagePath: "",
      isExpandedSortBy: false,
      isExpandedPricing: false,
      isExpandedCategory: false,
      isUp: false,
      currentPage: 1,
      itemsPerPage: 12,
    };
  },
  mounted() {
    this.fetchData();
    this.fetchCategories();
  },
  computed: {
    filteredCards() {
      const keyword = this.searchKeyword.toLowerCase();
      return this.cards.filter((card) => {
        const title = card.tool_name ? card.tool_name.toLowerCase() : "";
        const description = card.tool_description
          ? card.tool_description.toLowerCase()
          : "";
        const hasKeyword =
          title.includes(keyword) || description.includes(keyword);
        const hasCategory =
          this.selectedCategories.length === 0 ||
          this.selectedCategories.every((category_filter) =>
            card.use_case_id.includes(category_filter)
          );
        return hasKeyword && hasCategory;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredCards.length / this.itemsPerPage);
    },
    displayedCards() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredCards.slice(startIndex, endIndex);
    },
    allCategories() {
      const categories = new Set();
      this.cards.forEach((card) => {
        card.use_case_id.forEach((category) => {
          categories.add(category);
        });
      });
      return Array.from(categories);
    },
    categoryCounts() {
      const counts = {};
      this.cards.forEach((card) => {
        card.use_case_id.forEach((category) => {
          if (counts[category]) {
            counts[category]++;
          } else {
            counts[category] = 1;
          }
        });
      });
      return counts;
    },
    hideElements() {
      return this.searchKeyword.length <= 0;
    },
    relatedTools() {
      const relatedCategories = new Set();
      this.filteredCards.forEach((tool) => {
        tool.use_case_id.forEach((categoryId) => {
          relatedCategories.add(categoryId);
        });
      });

      return this.cards.filter((tool) => {
        for (const categoryId of tool.use_case_id) {
          if (relatedCategories.has(categoryId)) {
            return true;
          }
        }
        return false;
      });
    },
  },
  methods: {
    fetchData() {
      axios
        .get("http://localhost:3000/ai_tools")
        .then((response) => {
          this.cards = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    fetchCategories() {
      axios
        .get("http://localhost:3000/ai_use_case") // Replace with your server URL
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error("Error fetching use case", error);
        });
    },
    toggleCategorySelection(categoryId) {
      // console.log(categoryId);
      const index = this.selectedCategories.indexOf(categoryId);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1); // Remove category
      } else {
        this.selectedCategories.push(categoryId); // Add category
      }
    },
    isSelectedCategory(categoryId) {
      return this.selectedCategories.includes(categoryId);
    },
    filterData() {
      this.currentPage = 1;
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
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    handleCardClick(cardId) {
      this.$router.push({ name: "ToolDetails", params: { tool_id: cardId } });
    },
    toggleCardSortBy() {
      this.isExpandedSortBy = !this.isExpandedSortBy;
    },
    toggleCardPricing() {
      this.isExpandedPricing = !this.isExpandedPricing;
    },
    toggleCardCategory() {
      this.isExpandedCategory = !this.isExpandedCategory;
    },
    getCategoryName(useCaseId) {
      const category = this.categories.find(
        (category) => category.ai_use_case_id === useCaseId
      );
      return category ? category.ai_use_case_category : "Category Not Found";
    },
    getImageUrl(filePath) {
      // Assuming your images are stored in the 'public' folder of your Vue project
      return require("@/assets/imgs/webpage_ss/" + filePath);
    },
  },
};
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

#header-section {
  background: rgb(200, 210, 209);
  background: linear-gradient(180deg, rgba(200, 210, 209, 1) 0%, rgba(200, 210, 209, 1) 20%, rgba(200, 210, 209, 0) 100%);
  padding: 4rem auto 4rem auto;

  .row {
    padding: 6rem;

    .search-input {
      margin-top: 3.5rem;
    }
  }

  .section-contents {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;

    >form {
      width: -webkit-fill-available;
    }
  }

  .header-search-bar {
    .form-control {
      background-color: #FFFFFF;
      z-index: 0;
      padding: 12px;
      border-radius: 26px;
      border-color: transparent;
      color: #A2A6A5;
      border: 1px solid #14471E;
    }

    .btn {
      position: absolute;
      z-index: 1;
      top: 6px;
      width: 55px;
      right: 4px;
      border-radius: 8px;
    }
  }
}

#filter-and-tools-section {
  padding: 2rem;
  background: rgb(200, 210, 209);
  background: linear-gradient(0deg, rgba(200, 210, 209, 1) 0%, rgba(200, 210, 209, 1) 5%, rgba(200, 210, 209, 0) 20%);

  #card-header {
    margin-left: 2rem;
    padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
    margin-bottom: 0;
    color: var(--bs-card-cap-color);
    background-color: #FFF;
    border-bottom: none;
    border-radius: 10px 10px 0px 0px;
  }

  #category-headers {
    display: flex;
    justify-content: space-between;
    color: var(--bs-card-cap-color);
    background-color: #FFF;
    border-bottom: none;
    border-radius: 10px;
  }

  .card-filters {
    .form-group {
      display: flex;

      .form-text {
        margin-left: 5px;
      }
    }
  }
}

@keyframes animation {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}

#featured-trending-section {
  padding: 0rem 2rem 5.5rem 2rem;
  height: 100%;

  .row {
    max-height: 68vh;
  }
}

/* Padding adjustment for tools and filter section (Bug: Overlapping elements/components) */
@media (max-width: 768px) {
  #filter-and-tools-section {
    padding: 40rem 2rem 2rem 2rem;
    background: rgb(200, 210, 209);
    background: linear-gradient(0deg, rgba(200, 210, 209, 1) 0%, rgba(200, 210, 209, 1) 5%, rgba(200, 210, 209, 0) 20%);

    #card-header {
      margin-left: 2rem;
      padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
      margin-bottom: 0;
      color: var(--bs-card-cap-color);
      background-color: #FFF;
      border-bottom: none;
      border-radius: 10px 10px 0px 0px;
    }

    #category-headers {
      display: flex;
      justify-content: space-between;
      color: var(--bs-card-cap-color);
      background-color: #FFF;
      border-bottom: none;
      border-radius: 10px;
    }

    .card-filters {
      .form-group {
        display: flex;

        .form-text {
          margin-left: 5px;
        }
      }
    }
  }

  #featured-trending-section {
    padding: 0rem 2rem 5.5rem 2rem;
    height: 100%;

    .row {
      max-height: 68vh;
    
      > h5 {
        margin-top: 2rem;
      }
    }
  }

  .body-divider {
    display: none;
  }
}

.ai-tool-list-container {
  .pagination {
    display: flex;
    justify-content: center;

    .page-numbers {
      border-radius: none;
    }
  }

  .ai-tool-list {
    height: 290px;

    .card {
      overflow-y: hidden;
      overflow: hidden;
      position: relative;
      height: 32.3vh;
      border-radius: 10px;

      .badge {
        border: 1px solid #D9D9D9;
        padding: 4px 12px;
        border-radius: 14px;
        margin: 2px;
        color: #D9D9D9;
      }

      .selected {
        /* Add your desired CSS styles here */
        border: 1px solid #DA6A00;
        color: #DA6A00;
        padding: 4px 12px;
        border-radius: 14px;
      }

      #card-body {
        border-radius: 0px 0px 10px 10px;
        padding: 0px;
        height: 0;
        /* Set initial height to 0 to allow the aspect ratio to be preserved */
        padding-bottom: 65%;
        /* Set the desired aspect ratio (e.g., 4:3 = 75%) */
        position: relative;
        overflow: hidden;

        .tool-image {
          border: 1px solid #D9D9D9;
          border-radius: 0px 0px 10px 10px;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 25px 0px inset;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          overflow: hidden;
          /* Ensure the image covers the entire wrapper */
        }
      }
    }

    .card-title-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;

      .tool-pricing-icon {
        background: linear-gradient(169deg, rgba(238, 155, 1, 1) 0%, rgba(238, 155, 1, 0.8995973389355743) 35%, rgba(238, 155, 1, 0.25253851540616246) 100%);
        position: absolute;
        left: 0;
        top: 12px;
        width: 2.3rem;
        height: 4rem;
        border-radius: 0px 8px 8px 0px;

        .pricing-icon {
          margin: 11px;
          padding-top: 9px;
        }
      }

      .card-title {
        font-size: 1.5rem;
      }

      .star-rating {
        position: relative;
        bottom: 4px;
        margin-bottom: 6px;
        margin-left: 12px;
      }
    }
  }
}
</style>
