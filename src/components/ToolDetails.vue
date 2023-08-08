<!-- eslint-disable prettier/prettier -->
<!-- CardDetails.vue -->
<template>
    <div class="container-fluid bg-grey" id="header-section">
        <section>
            <div class="row">
                <div class="col-lg-8 offset-lg-2 section-contents">
                    <h1 class="mb-3">AI ToolBox</h1>
                    <p class="lead">Phasellus scelerisque elementum lorem, id hendrerit dolor dictum nec.</p>

                    <!-- Search Bar -->
                    <form class="search-input">
                        <div class="input-group mb-3 header-search-bar">
                            <input type="text" class="form-control" v-model="searchKeyword"
                                placeholder="Search AI tool here" @keyup.enter="filterData" />
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

    <!-- AI Tools filter and cards -->
    <div class="container-fluid mt-5" id="filter-and-tools-section">
        <div class="row">
            <!-- Left Column -->
            <div class="col-md-2" id="checkbox-filters-container">
                <!-- Expandable Checkbox Filters -->
                <!-- Bootstrap card -->
                <div class="card mb-4">
                    <!-- Card header with toggle button -->
                    <div class="card-header" @click="toggleCardSortBy">
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
                    <div class="card-header" @click="toggleCardPricing">
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
                    <div class="card-header" @click="toggleCardCategory">
                        <h5 class="mb-0">Categories</h5>
                        <div>
                            <i :class="{ 'fa-regular fa-circle-up fa-lg': isExpandedCategory, 'fa-regular fa-circle-down fa-lg': !isExpandedCategory }"
                                style="color: #C8D2D1;"></i>
                        </div>
                    </div>

                    <!-- Card body (content) with Vue conditional rendering -->
                    <div class="card-body card-filters" v-if="isExpandedCategory">
                        <!-- Placeholder for checkbox filters -->
                        <div class="category-container" v-for="category in allCategories" :key="category">
                            <div class="form-group">
                                <label class="checkbox">
                                    <input class="form-check-input" type="checkbox" v-model="selectedCategories"
                                        :value="category" @change="filterData" />
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
            <div class="col-md-10 ai-tool-details-container">
                <div class="row">
                    <h2 class="mb-5">About {{ tool_name }}</h2>
                    <!-- Right Column Cards -->
                    <div class="card">
                        <div class="card-header" id="card-header">
                            <div class="row">
                                <div class="col">
                                    <div style="display: flex;">
                                        <div class="tool-pricing-icon">
                                            <i class="fa-solid fa-dollar-sign fa-xl pricing-icon"
                                                style="color: #ffffff;"></i>
                                        </div>
                                        <h3 class="card-title">{{ tool_name }}</h3>
                                        <tool-star-rating class="star-rating" :selected-star="`${star_rating}`"
                                            style="margin-left: 1rem;"></tool-star-rating>
                                    </div>
                                    <span class="badge badge-pill badge-dark" v-for="columnData in getColumnDataArray()"
                                        :key="columnData">
                                        {{ columnData }}
                                    </span>
                                </div>
                                <div class="col" style="
                                display: flex;
                                flex-direction: column;
                                align-items: flex-end;
                                justify-content: space-evenly;
                                    ">
                                    <tool-rank-count-display
                                        :overall-rating="`${overall_rating}`"></tool-rank-count-display>
                                    <div class="date">
                                        <i class="fa-regular fa-calendar" style="color: #C8D2D1;"></i>&nbsp;<span
                                            style="color: #C8D2D1;">{{ extractDate(tool_date) ? formattedDate :
                                                formattedDate }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body" id="card-body">
                            <slot>
                                <template v-if="file_name">
                                    <img class="tool-image" :src="getImageUrl(file_name)" :alt="file_name" />
                                </template>
                                <template v-else>
                                    <!-- Render a placeholder or loading state until the file_name is available -->
                                    <p>loading...</p>
                                </template>
                            </slot>
                            <tool-details-on-hover :url="tool_url"></tool-details-on-hover>
                        </div>
                    </div>
                </div>

                <!-- Right Column Lower Container -->
                <div class="container-fluid row lower-container-details mt-5">
                    <!-- Left column -->
                    <div class="col-md-9 left-container">
                        <section class="tool-information">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit faucibus suscipit.
                            <br><br>Key Features:
                            <br>
                            <ul>
                                <li>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                                    Etiam ut quam sed sapien ullamcorper viverra non vel magna.</li>
                                <li>Nullam elementum justo augue. Fusce posuere, neque porta congue hendrerit, lacus massa
                                    accumsan augue, id luctus velit quam non arcu. Duis sit amet purus non urna feugiat
                                    tincidunt eget sit amet ipsum.</li>
                                <li>Cras aliquet vulputate urna eu tristique. Nullam in interdum tellus. Curabitur
                                    vestibulum dignissim nisl, rhoncus mollis ante tempor vitae.</li>
                                <li>Suspendisse ac nisi pharetra, congue neque vitae, blandit lectus. Interdum et malesuada
                                    fames ac ante ipsum primis in faucibus. Nullam cursus lacus at turpis ultricies
                                    elementum.</li>
                                <li>Mauris ut luctus ante. Vestibulum dignissim dui nulla, non interdum quam mattis vitae.
                                    Nulla fermentum dapibus lorem a mattis. Fusce nec augue viverra mi condimentum mattis.
                                    In a erat rutrum sapien pretium volutpat.</li>
                            </ul>
                            <br>
                            Social Media: <span><i class="fa-brands fa-square-facebook fa-2xl"></i></span><span><i
                                    class="fa-brands fa-square-instagram fa-2xl"></i></span><span><i
                                    class="fa-brands fa-square-twitter fa-2xl"></i></span>
                        </section>

                        <form action="" class="container-fluid submit-review-container">
                            <div class="form-header">
                                <div class="title">
                                    <label for="">
                                        <h2>Would you recommend {{ tool_name }}?</h2>
                                    </label>
                                    <small id="passwordHelpInline" class="text-muted">
                                        Share your experience with the community.
                                    </small>
                                </div>
                                <div class="">
                                    <star-rating></star-rating>
                                    <button type="button" class="btn btn-light" id="review-button">Leave a Review</button>
                                </div>
                            </div>
                        </form>

                        <!-- <form action="" class="container-fluid submit-review-container">
                            <div class="form-header">
                                <div class="title">
                                    <label for="">
                                        <h4>Would you recommend Lorem Ipsum?</h4>
                                    </label>
                                    <small id="passwordHelpInline" class="text-muted">
                                        Share your experience with the community.
                                    </small>
                                </div>
                                <tool-star-rating></tool-star-rating>
                            </div>

                            <div class="form-group">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div class="action-btns">
                                <button type="button" class="btn btn-light">Cancel</button>
                                <button type="button" class="btn btn-primary">Post</button>
                            </div>
                        </form> -->

                        <div class="tool-reviews">
                            <div class="container review-container">
                                <div class="container header-review">
                                    <label for="">User 1</label><span>&nbsp;<small
                                            class="text-muted">MM/DD/YYYY</small></span>
                                    <star-rating></star-rating>
                                </div>
                                <div class="review">
                                    <small id="passwordHelpInline" class="text-muted">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit faucibus
                                        suscipit.
                                    </small>
                                </div>
                            </div>
                            <hr style="margin: auto; opacity: .1;" />
                            <div class="container review-container">
                                <div class="container header-review">
                                    <label for="">User 2</label><span>&nbsp;<small
                                            class="text-muted">MM/DD/YYYY</small></span>
                                    <star-rating></star-rating>
                                </div>
                                <div class="review">
                                    <small id="passwordHelpInline" class="text-muted">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit faucibus
                                        suscipit.
                                    </small>
                                </div>
                            </div>
                            <hr style="margin: auto; opacity: .1;" />
                            <div class="container review-container">
                                <div class="container header-review">
                                    <label for="">User 3</label><span>&nbsp;<small
                                            class="text-muted">MM/DD/YYYY</small></span>
                                    <star-rating></star-rating>
                                </div>
                                <div class="review">
                                    <small id="passwordHelpInline" class="text-muted">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit faucibus
                                        suscipit.
                                    </small>
                                </div>
                            </div>
                            <hr style="margin: auto; opacity: .1;" />
                            <button type="button" class="btn btn-light btn-lg">View All Reviews</button>
                        </div>
                    </div>

                    <!-- Right column -->
                    <div class="col-md-3">
                        <div class="container-fluid rating-container">
                            <div class="rating-details">
                                <h5>Overall Rating</h5>
                                <div class="rating-number">{{ star_rating }}</div>
                                <tool-star-rating class="star-rating" :selected-star="`${star_rating}`"></tool-star-rating>
                                <small>Based on _ review</small>
                            </div>

                            <div class="progress-container">
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="100"
                                        aria-valuemin="0" aria-valuemax="100">
                                        {{ star_rating }} star
                                    </div>
                                </div>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0"
                                        aria-valuemin="0" aria-valuemax="0"></div>
                                    <!-- <span>5 star</span> -->
                                </div>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0"
                                        aria-valuemin="0" aria-valuemax="0"></div>
                                    <!-- <span>5 star</span> -->
                                </div>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0"
                                        aria-valuemin="0" aria-valuemax="0"></div>
                                    <!-- <span>5 star</span> -->
                                </div>
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0"
                                        aria-valuemin="0" aria-valuemax="0"></div>
                                    <!-- <span>5 star</span> -->
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid card trending-tools-ol">
                            <trending-tools-list :cards="toolsData"></trending-tools-list>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- related tool cards -->
        <h5 id="pop-up-title">Related Tools:</h5>
        <div class="carousel">
            <div class="card-carousel" ref="carousel" @mousedown="startDrag" @touchstart="startDrag" @mousemove="handleDrag"
                @touchmove="handleDrag" @mouseup="endDrag" @touchend="endDrag">
                <div class="card-carousel-inner" :style="{ transform: `translateX(${translateX}px)` }">
                    <div v-for="card in relatedTools" :key="card.tool_id" class="card">
                        <!-- Card Content -->
                        <div class="card-header" id="card-header" @click.prevent="handleCardClick(card.tool_id)"
                            style="cursor: pointer;">
                            <div class="card-title-container">
                                <div style="display: flex;">
                                    <div class="tool-pricing-icon">
                                        <i class="fa-solid fa-dollar-sign fa-xl pricing-icon" style="color: #ffffff;"></i>
                                    </div>
                                    <h5 class="card-title">{{ card.tool_name }}</h5>
                                    <tool-star-rating class="star-rating"
                                        :selected-star="`${card.star_rating}`"></tool-star-rating>
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
                        <div class="card-body" id="card-body" @click.prevent="handleCardClick(card.tool_id)"
                            style="cursor: pointer;">
                            <div class="card-image-wrapper">
                                <img class="img-fluid tool-image" :src="getImageUrl(card.screenshot_file_path)"
                                    :alt="card.tool_name" />
                            </div>
                            <card-on-hover :description="card.tool_description"></card-on-hover>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of related tools -->
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
import axios from 'axios';
// import TrendingTools from "./TrendingTools.vue";
import TrendingToolsList from "./TrendingToolsList.vue";
import ToolRankCountDisplay from "./ToolRankCountDisplay.vue";
import ToolStarRating from "./ToolStarRating.vue";
import StarRating from "./StarRating.vue";
import ToolDetailsOnHover from './ToolDetailsOnHover.vue';

export default {
    name: "ToolDetails",
    components: {
        // TrendingTools,
        TrendingToolsList,
        ToolRankCountDisplay,
        ToolStarRating,
        StarRating,
        ToolDetailsOnHover,
    },
    data() {
        return {
            categoryBadge: [],
            columnDataArray: [],
            toolsData: [],
            categories: [],
            cards: [],
            relatedTools: [],
            relatedCategories: [],
            isExpandedSortBy: false,
            isExpandedPricing: false,
            isExpandedCategory: false,
            tool_name: null,
            tool_description: null,
            tool_url: null,
            tool_date: null,
            overall_rating: null,
            file_name: null,
            star_rating: null,
            formattedDate: "",
            translateX: 0,
            startDragX: 0,
            isDragging: false,
        };
    },
    mounted() {
        // this.fetchData();
        this.fetchCategories();
        this.extractDate();
        // Fetch card details based on the ID from the API or another data source
        let cardId = this.$route.params.tool_id;
        this.card = this.getCardDetails(cardId);
        this.getCardDetails(cardId);
    },
    methods: {
        getCardDetails(cardId) {
            const apiUrl = `http://localhost:3000/ai_tools/tool/${cardId}`;
            axios.get(apiUrl)
                .then(response => {
                    const responseData = response.data;
                    this.card = responseData[0];
                    const values = this.card;
                    this.categoryBadge = values.use_case_id;
                    this.tool_name = responseData[0].tool_name;
                    this.tool_description = responseData[0].tool_description;
                    this.tool_date = responseData[0].date_added;
                    this.tool_url = responseData[0].tool_url;
                    this.overall_rating = responseData[0].sum_likes_rating;
                    this.file_name = responseData[0].screenshot_file_path;
                    // console.log(this.file_name);
                    this.star_rating = responseData[0].star_rating;
                    this.relatedCategories = responseData[0].use_case_id;
                    this.fetchRelatedTools(this.relatedCategories);
                })
                .catch(error => {
                    console.error('Error fetching card details:', error);
                });
        },
        fetchRelatedTools(categoryIds) {
            const apiUrl = 'http://localhost:3000/ai_tools';
            axios
                .get(apiUrl)
                .then(response => {
                    const tools = response.data;
                    // Filter tools based on category IDs
                    this.relatedTools = tools.filter(tool =>
                        tool.use_case_id.some(categoryId => categoryIds.includes(categoryId))
                    );
                })
                .catch(error => {
                    console.error('Error fetching related tools:', error);
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
        goBack() {
            this.$router.go(-1);
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
        getCategoryName(categoryId) {
            const category = this.categories.find(
                (category) => category.ai_use_case_id === categoryId
            );
            return category ? category.ai_use_case_category : "Category Not Found";
        },
        getColumnDataArray() {
            const proxyArray = this.categories;
            const standardArray = Array.from(proxyArray).map(proxy => Object.assign({}, proxy));
            return this.columnDataArray = this.categoryBadge.map(number => {
                const matchedItem = standardArray.find(item => item.ai_use_case_id === number);
                return matchedItem ? matchedItem.ai_use_case_category : null;
            });
        },
        extractDate(dateFormat) {
            const date = new Date(dateFormat);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            this.formattedDate = `${day}/${month}/${year}`;
        },
        getImageUrl(filePath) {
            return require("@/assets/imgs/webpage_ss/" + filePath);
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
    },
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
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

.bg-grey {
    background-color: #D9D9D9;
}

#checkbox-filters-container {
    margin-top: 86px;

    .card-header {
        display: flex;
        justify-content: space-between;
        padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
        margin-bottom: 0;
        background-color: transparent;
        border-bottom: none;
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

#filter-and-tools-section {
    padding: 2rem;
    background: rgb(200, 210, 209);
    background: linear-gradient(0deg, rgba(200, 210, 209, 1) 0%, rgba(200, 210, 209, 1) 5%, rgba(200, 210, 209, 0) 20%);

    #pop-up-title {
        margin: 6rem 0rem 2rem 0rem;
    }
}

.ai-tool-details-container {
    padding-left: 2rem;

    .card {
        padding: 0px;
        width: 95%;
        height: 60vh;
        border-radius: 10px;
        overflow-y: hidden;
        overflow: hidden;
        position: relative;

        #card-header {
            margin-left: 2rem;
            padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
            margin-bottom: 0;
            color: var(--bs-card-cap-color);
            background-color: #FFF;
            border-bottom: none;
            border-radius: 10px 10px 0px 0px;

            .tool-pricing-icon {
                background: linear-gradient(169deg, rgba(238, 155, 1, 1) 0%, rgba(238, 155, 1, 0.8995973389355743) 35%, rgba(238, 155, 1, 0.25253851540616246) 100%);
                position: absolute;
                left: 0;
                top: 12px;
                width: 2.3rem;
                height: 4rem;
                border-radius: 0px 8px 8px 0px;
            }

            .pricing-icon {
                margin: 11px;
                padding-top: 9px;
            }
        }

        #card-body {
            border-radius: 0px 0px 10px 10px;
            padding: 0px;
            height: 0;
            /* Set initial height to 0 to allow the aspect ratio to be preserved */
            padding-bottom: 10%;
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
                height: 50.6vh;
                object-fit: cover;
                overflow: hidden;
                /* Ensure the image covers the entire wrapper */
            }
        }

        .badge {
            border: 1px solid #D9D9D9;
            padding: 6px 12px;
            border-radius: 14px;
            margin: 2px;
            color: #838383;
        }
    }

    .card-body img {
        width: -webkit-fill-available;
        height: 48vh;
    }

    .lower-container-details {

        .left-container {
            .tool-information>span {
                color: #98A2B3;
                margin-right: 1rem;

                :first-child {
                    margin-left: 1rem;
                }
            }


            #review-button {
                margin: 0px 5px;
                padding: 5px 1.5rem;
                background: linear-gradient(169deg, rgba(238, 155, 1, 1) 0%, rgba(238, 155, 1, 0.8995973389355743) 35%, rgba(238, 155, 1, 0.25253851540616246) 100%);
                color: #FFFFFF;
                font-weight: 500;
                border-radius: 8px;
            }
        }

        .submit-review-container {
            margin: 5rem 0px;
            background-color: #F5F5F5;
            padding: 25px;
            width: 96%;
            border-radius: 10px;

            .form-header {
                display: flex;
                justify-content: space-around;
                flex-direction: row;
                align-items: center;

                .title {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                >div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            }

            .form-control {
                margin: 12px 0px;
            }

            .action-btns {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;

                .btn {
                    margin-right: 15px;
                }
            }
        }

        .tool-reviews {
            width: 80%;
            margin: auto;

            .review-container {
                margin-top: 1rem;

                .review {
                    margin: 2rem 1rem;
                }
            }

            .btn {
                margin: 4rem 38% 4rem 38%;
                padding: 0.6rem 3rem;
                font-size: 15px;
            }
        }

        .rating-container {
            margin-bottom: 4rem;

            .rating-details {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 2rem;

                .rating-number {
                    font-size: 80px;
                }

            }

            .progress-container {

                >* {
                    margin: 10px 0px;
                }
            }
        }

        .trending-tools-ol {
            height: auto;

            .card-title {
                margin-bottom: 1rem;
            }

        }
    }
}

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
    transition: transform 0.3s ease-in-out;
    will-change: transform;

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
}
</style>
