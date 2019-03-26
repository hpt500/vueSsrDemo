<template>
    <div class="lt-title clearFloat" :class="[noPadding?'noPadding':'']">
        <div class="left">
            <span class="fs20">{{title}}</span>
            <slot name="left"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title: String,
            noPadding: {
                type: Boolean,
                default: false
            }
        },
        
    }
</script>

<style scoped>

</style>