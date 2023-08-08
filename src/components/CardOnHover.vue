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
                    <i class="fa-solid fa-thumbs-up fa-lg" @click="handleIconClick('icon1')">Icon 1</i>
                </span>
                <span class="icon-span-container">
                    <i class="fa-solid fa-circle-exclamation fa-lg" @click="handleIconClick('icon2')">Icon 2</i>
                </span>
                <span class="icon-span-container">
                    <i class="fa-solid fa-share fa-lg" @click="handleIconClick('icon3')">Icon 3</i>
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
            required: true
        }
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
    height: auto;
    /* Remove the fixed height */

    /* Add the following properties */
    padding: 3rem 1rem 5rem 1rem;
    /* Add some padding for spacing */
    max-height: 80vh;
    /* Set a maximum height for the container */
    overflow-y: auto;
    /* Enable vertical scrolling if needed */

    .hover-description {
        display: flex;
        font-size: .9vw;
        width: -webkit-fill-available;
        height: -webkit-fill-available;
        padding-bottom: 20px;
        margin: .5rem 3rem 0px 2rem;
        color: #000000;
    }

    .hover-icons-container {
        display: flex;
        border-top: 1px solid #B3B3B3;
        padding-top: 10px;
        margin-bottom: 1rem;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;

        .icon-span-container {
            margin: 0px 5px;
            padding: .5rem 3.5rem;
            background-color: transparent;
            border: 1px solid #D3904D;
            border-radius: 8px;

            .fa-lg {
                cursor: pointer;
                color: #D3904D;
            }
        }

        .icon-span-container:hover {
            margin: 0 5px;
            padding: .5rem 3.5rem;
            background: linear-gradient(90deg, rgba(238, 155, 1, 1) 0%, rgba(238, 155, 1, 1) 35%, rgba(243, 195, 72, 1) 100%);
            border: 1px solid #D3904D;
            border-radius: 8px;

            .fa-lg {
                cursor: pointer;
                color: #FFFFFF;
            }
        }

        @media only screen and (max-width: 1080px) {
            .icon-span-container {
                margin: 0px 5px;
                padding: .2rem 1.5rem;
                background-color: transparent;
                border: 1px solid #D3904D;
                border-radius: 8px;

                .fa-lg {
                    cursor: pointer;
                    color: #D3904D;
                }
            }

            .icon-span-container:hover {
                margin: 0px 5px;
                padding: .2rem 1.5rem;
                background: linear-gradient(90deg, rgba(238, 155, 1, 1) 0%, rgba(238, 155, 1, 1) 35%, rgba(243, 195, 72, 1) 100%);
                border: 1px solid #D3904D;
                border-radius: 8px;

                .fa-lg {
                    cursor: pointer;
                    color: #FFFFFF;
                }
            }
        }
    }
}

.hover-container:hover .icon-container {
    opacity: 1;
    pointer-events: auto;
    /* Enable icons to capture mouse events when visible */
}

.icon {
    /* Add your desired styles for the icons */
    cursor: pointer;
    color: white;
    /* Example icon color */
}
</style>
