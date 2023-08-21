<!-- eslint-disable prettier/prettier -->
<template>
    <div class="card" v-for="tool in filteredData" :key="tool.tool_id">
        <div class="card-header" id="card-header" @click.prevent="handleCardClick(tool.tool_id)" style="cursor: pointer;">
            <div class="card-title-container">
                <div style="display: flex;">
                    <div class="tool-pricing-icon">
                        <i class="fa-solid fa-dollar-sign fa-xl pricing-icon" style="color: #ffffff;"></i>
                    </div>
                    <h5 class="card-title">{{ tool.tool_name }}</h5>
                    <tool-star-rating class="star-rating" :selected-star="`${tool.star_rating}`"></tool-star-rating>
                    <p hidden> {{ tool.tool_description }} </p>
                </div>
                <div>
                    <tool-rank-count-display class="like-count"
                        :overall-rating="`${tool.sum_likes_rating}`"></tool-rank-count-display>
                </div>
            </div>
            <span class="badge badge-pill badge-light" v-for="useCase in tool.use_case_id" :key="useCase.ai_use_case_id">{{
                getCategoryName(useCase) }}</span>
        </div>
        <div class="container card-body" id="card-body" @click.prevent="handleCardClick(tool.tool_id)"
            style="cursor: pointer;">
            <card-on-hover-featured-tool :description="tool.tool_description">
                <img class="img-fluid tool-image" :src="getImageUrl(tool.screenshot_file_path)" :alt="tool.tool_name" />
            </card-on-hover-featured-tool>
        </div>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import axios from 'axios';
import ToolRankCountDisplay from './ToolRankCountDisplay.vue';
import ToolStarRating from './ToolStarRating.vue';
import CardOnHoverFeaturedTool from './CardOnHoverFeaturedTool.vue';

export default {
    props: {
        cards: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            categories: [],
        };
    },
    mounted() {
        this.fetchCategories();
    },
    components: {
        ToolRankCountDisplay,
        ToolStarRating,
        CardOnHoverFeaturedTool,
    },
    computed: {
        filteredData() {
            return this.cards.filter(tool => tool.featured_tool);
        }
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
        handleCardClick(cardId) {
            this.$router.push({ name: "ToolDetails", params: { tool_id: cardId } });
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
    }
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.card {
    height: 67vh;
    border: 2px solid #EE9B01;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-shadow: rgb(238, 155, 1) 0px 0px 16px -7px;

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

    #card-body {
        border-radius: 0px 0px 10px 10px;
        padding: 0px;
        height: 0;
        /* Set initial height to 0 to allow the aspect ratio to be preserved */
        padding-bottom: 75%;
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
            height: 58.1vh;
            object-fit: cover;
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
</style>
