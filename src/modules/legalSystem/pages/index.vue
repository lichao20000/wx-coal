<template>
    <div class="legal-index-page">
        <!--基本信息-->
        <div class="base-info-box">

        </div>
        <!--附件-->
        <div class="enclosure"></div>
        <!--流程-->
    </div>
</template>
<script>
    export default {
        data () {
            return {}
        },
        methods: {}
    }
</script>
<style lang="postcss" scoped>
    .legal-index-page {
        width: 100%;
        min-height: 100vh;
        padding-top: 33px;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .base-info-box{
            width: 702px;
            background: #FCFEFF;
            border: 1px solid #E5F1FF;
            box-shadow: 0px 8px 12px 0px rgba(11, 102, 214, 0.1);
            border-radius: 10px;
            padding: 32px;
        }

    }
</style>
