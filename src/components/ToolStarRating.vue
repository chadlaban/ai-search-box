<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <div class="rating">
            <span v-for="star in stars" :key="star" class="star" :class="{ filled: star <= selectedStar }"
                @click="selectStar(star)">
                &#9733;
            </span>
            <span> ({{ selectedStar }})</span>
        </div>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->
<script>
export default {
    props: ['selectedStar'], // Declare selectedStar as a prop
    data() {
        return {
            stars: [1, 2, 3, 4, 5],
        };
    },
    methods: {
        selectStar(star) {
            // Emit an event to notify the parent component that the selected star has changed
            this.$emit('star-selected', star);
        },
    },
};
</script>
<!-- eslint-disable prettier/prettier -->
<style scoped>
.rating {
    font-size: 22px;
}

.rating span:last-child {
    font-size: 18px;
    color: #D9D9D9;
}

.star {
    color: #D9D9D9;
    cursor: pointer;
}

.filled {
    color: gold;
}
</style>