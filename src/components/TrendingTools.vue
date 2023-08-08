<!-- eslint-disable prettier/prettier -->
<template>
  <div class="carousel">
    <div class="card-carousel" ref="carousel" @mousedown="startDrag" @touchstart="startDrag" @mousemove="handleDrag"
      @touchmove="handleDrag" @mouseup="endDrag" @touchend="endDrag">
      <div class="card-carousel-inner" :style="{ transform: `translateX(${translateX}px)` }">
        <div class="card-row">
          <div class="card" v-for="card in visibleCards1" :key="card.tool_id">
            <div class="card-header" id="card-header" @click.prevent="handleCardClick(card.tool_id)"
              style="cursor: pointer;">
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
                :key="useCase.ai_use_case_id">
                {{ getCategoryName(useCase) }}
              </span>
            </div>
            <div class="card-body" id="card-body" @click.prevent="handleCardClick(card.tool_id)" style="cursor: pointer;">
              <div class="card-image-wrapper">
                <img class="img-fluid tool-image" :src="getImageUrl(card.screenshot_file_path)" :alt="card.tool_name" />
              </div>
              <card-on-hover :description="card.tool_description"></card-on-hover>
            </div>
          </div>
        </div>
        <div class="card-row mt-4">
          <div v-for="card in visibleCards2" :key="card.tool_id" class="card">
            <div class="card-header" id="card-header" @click.prevent="handleCardClick(card.tool_id)"
              style="cursor: pointer;">
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
                :key="useCase.ai_use_case_id">
                {{ getCategoryName(useCase) }}
              </span>
            </div>
            <div class="card-body" id="card-body" @click.prevent="handleCardClick(card.tool_id)" style="cursor: pointer;">
              <div class="card-image-wrapper">
                <img class="img-fluid tool-image" :src="getImageUrl(card.screenshot_file_path)" :alt="card.tool_name" />
              </div>
              <card-on-hover :description="card.tool_description"></card-on-hover>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/no-dupe-keys -->
<script>
import axios from "axios";
import ToolRankCountDisplay from "./ToolRankCountDisplay.vue";
import ToolStarRating from "./ToolStarRating.vue";
import CardOnHover from "./CardOnHover.vue";

export default {
  props: {
    cards: {
      type: Array,
      required: true,
    }
  },
  components: {
    ToolRankCountDisplay,
    ToolStarRating,
    CardOnHover,
  },
  data() {
    return {
      visibleCards1: [],
      visibleCards2: [],
      categories: [],
      trendingTools: [],
      numCards1: 5, // Specify the number of cards to display for the upper set
      numCards2: 5, // Specify the number of cards to display for the lower set
      translateX: 0,
      startDragX: 0,
      isDragging: false,
    };
  },
  watch: {
    cards: {
      handler: 'updateTrendingTools',
      deep: true
    }
  },
  mounted() {
    // this.fetchData();
    this.fetchCategories();
    this.updateTrendingTools();
  },
  computed: {
    // Compute the visible cards for the upper set based on the specified number of cards
    visibleCards1() {
      return this.trendingTools.slice(0, this.numCards1);
    },
    // Compute the visible cards for the lower set based on the specified number of cards
    visibleCards2() {
      return this.trendingTools.slice(this.numCards1, this.numCards1 + this.numCards2);
    },
  },
  methods: {
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
    startDrag(event) {
      this.isDragging = true;
      this.startDragX = event.pageX || event.touches[0].pageX;
    },
    handleDrag(event) {
      if (this.isDragging) {
        const currentX = event.pageX || event.touches[0].pageX;
        this.translateX += currentX - this.startDragX;
        this.startDragX = currentX;
      }
    },
    endDrag() {
      this.isDragging = false;
    },
    handleCardClick(cardId) {
      this.$router.push({ name: "ToolDetails", params: { tool_id: cardId } });
    },
    updateTrendingTools() {
      this.trendingTools = this.cards
        .slice() // Create a shallow copy of the products array
        .sort((a, b) => b.like_count - a.like_count) // Sort in descending order based on likes
        .slice(0, 10); // Get the top trending products (or adjust the number as needed)
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
.carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
  cursor: grab;
  user-select: none;
  touch-action: pan-y;
}

.card-carousel-inner {
  display: flex;
  flex-wrap: wrap;
  transition: transform 0.3s ease-in-out;
  will-change: transform;
}


.card-row {
  display: flex;
}

.card {
  flex: 0 0 auto;
  /* Disable flex-shrink to maintain card width */
  margin-right: 24px;
  /* Adjust spacing between cards */
  width: 26vw;
  /* Set the desired width for the cards */
  height: 32vh;
  border-radius: 10px;
  height: 32.3vh;
  border-radius: 10px;
  overflow-y: hidden;
  overflow: hidden;
  position: relative;

  .badge {
    border: 1px solid #D9D9D9;
    padding: 4px 12px;
    border-radius: 14px;
    margin: 2px;
    color: #D9D9D9;
  }

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
</style>
