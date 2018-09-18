<!-- App.vue -->
<template>
    <div>
        <h2>老张的哲学</h2>

        <router-link to="/">Home</router-link> |
        <router-link to="/about">Form</router-link> |
        <router-link to="/like">Vuex</router-link> |

        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        mounted() {

        }
    }
</script>

