<!-- eslint-disable prettier/prettier -->
<template>
    <div class="hover-container" @mouseover="showIcons" @mouseleave="hideIcons">
        <div class="image-wrapper">
            <slot></slot>
        </div>
        <div v-if="isHovered" class="icon-container">
            <span class="hover-description">{{ description }}</span>
            <div id="hover-divider"></div>
            <!-- Place your clickable icon elements here -->
            <div class="hover-icons-container">
                <span class="icon-span-container">
                    <i class="fa-solid fa-thumbs-up fa-xl" @click="handleIconClick('icon1')">Icon 1</i>
                </span>
                <span class="icon-span-container">
                    <i class="fa-solid fa-circle-exclamation fa-xl" @click="handleIconClick('icon2')">Icon 2</i>
                </span>
                <span class="icon-span-container">
                    <i class="fa-solid fa-share fa-xl" @click="handleIconClick('icon3')">Icon 3</i>
                </span>
                <!-- Add more icons as needed -->
            </div>
        </div>
    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script>
export default {
    props: {
        description: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isHovered: false,
        };
    },
    methods: {
        showIcons() {
            this.isHovered = true;
        },
        hideIcons() {
            this.isHovered = false;
        },
        handleIconClick(iconName) {
            // Handle the click event of the icons
            console.log("Clicked icon:", iconName);
        },
    },
};
</script>
<!-- eslint-disable prettier/prettier -->

<style scoped>
.hover-container {
    position: relative;
}

.image-wrapper {
    /* position: relative; */
    overflow: hidden;
    border-radius: 0px 0px 10px 10px;
}

.image-wrapper::after {
    content: "";
    display: block;
    padding-top: 75%;
    /* Set the desired aspect ratio (e.g., 4:3 = 75%) */
    border-radius: 0px 0px 10px 10px;
}

.icon-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 58.1vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 0px 0px 10px 10px;
    pointer-events: none;
}

.hover-description {
    display: flex;
    font-size: 1.8vw;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    padding-bottom: 10px;
    margin: 7.6rem 3rem 0px 2rem;
    color: #000000;
}

.hover-icons-container {
    display: flex;
    border-top: 1px solid #b3b3b3;
    padding-top: 4rem;
    margin-bottom: 6rem;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}

.icon-span-container {
    margin: 0 5px;
    padding: 0.8rem 5.5rem;
    background-color: transparent;
    border: 1px solid #d3904d;
    border-radius: 8px;
}

.icon-span-container:hover {
    margin: 0 5px;
    padding: 0.8rem 5.5rem;
    background: linear-gradient(90deg,
            rgba(238, 155, 1, 1) 0%,
            rgba(238, 155, 1, 1) 35%,
            rgba(243, 195, 72, 1) 100%);
    border: 1px solid #d3904d;
    border-radius: 8px;

    .fa-xl {
        cursor: pointer;
        color: #FFF;
    }
}

.icon-span-container .fa-xl {
    cursor: pointer;
    color: #d3904d;
}

.hover-container:hover .icon-container {
    opacity: 1;
    pointer-events: auto;
}

.icon {
    cursor: pointer;
    color: white;
}
</style>
