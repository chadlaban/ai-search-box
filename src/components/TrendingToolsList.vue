<!-- eslint-disable prettier/prettier -->
<template>
    <div class="card-body">
        <h5 class="card-title">Trending Tools</h5>
        <ol>
            <li class="trending-item" v-for="tool in trendingTools" :key="tool.tool_id">{{ tool.tool_name }}</li>
        </ol>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/no-dupe-keys -->
<script>
import axios from 'axios';

export default {
    props: {
        tool_id: Number,
    },
    data() {
        return {
            cards: [],
        };
    },
    mounted() {
        this.fetchData();
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
    },
    computed: {
        trendingTools() {
            // Sort the products based on the number of likes in descending order
            const sortedProducts = [...this.cards].sort((a, b) => b.likes - a.likes);
            
            // Slice the sorted array to get the top 10 products
            return sortedProducts.slice(0, 10);
        },
    },
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.card-body {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.card-title {
    font-size: 1.5rem;
}

.trending-item {
    margin-bottom: 10px;
}
</style>
