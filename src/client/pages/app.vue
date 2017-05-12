<template>
    <div class="wrap ">
        <idle-nav></idle-nav>

        <keep-alive>
            <router-view class="app container"></router-view>
        </keep-alive>

    </div>
</template>
<style src="./app.less" lang="less"></style>