<template>
    <headernav class="headernav">
        <div class="header-nav-container">
            <div class="nav-type-left"><div @click="showNav()" class="tit">商品分类</div>
                <el-col :span="8" :class="{show: !isIndex}">
                    <el-menu class="el-menu-left" >
                        <template v-for="(nav,index1) in leftnav">
                            <template v-if="nav.children.length">
                                <el-submenu :index="nav.id">
                                    <template slot="title">{{nav.name}}</template>
                                    <el-menu-item v-for="(secnav,index2) in nav.children" :index="secnav.id" @click="goCategory(secnav.id, 2)">
                                        {{secnav.name}}
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="nav.id" @click="goCategory(nav.id, 1)">{{nav.name}}</el-menu-item>
                            </template>
                        </template>
                    </el-menu>
                </el-col>
            </div>
            <div class="nav-type-top">
                <el-menu class="el-menu-all" mode="horizontal" @select="handleSelect">
                    <template v-for="(nav,index1) in topnav">
                        <template v-if="nav.children">
                            <el-submenu :index="nav.id">
                                <template slot="title">{{nav.name}}</template>
                                <el-menu-item  v-for="(secnav,index2) in nav.children" :index="secnav.id">
                                    {{secnav.name}}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item :index="nav.id">{{nav.name}}</el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </div>
        </div>
    </headernav>
</template>

<script>
export default{
    head: {
        link: [
          {rel: 'stylesheet', href: '/common/css/headernav.css'}
        ]
    },
    data () {
        return {
            isIndex: true
        }
    },
    computed: {
        topnav() {
            return this.$store.state.topnav
        },
        leftnav() {
            return this.$store.state.leftnav
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            let $this = this
            if(process.BROWSER_BUILD){
                let param = ''
                keyPath.forEach(function(i){
                    param = param + '/' + i
                })
                if(key == '0'){
                    location.href = '/'
                }
                else{
                    location.href = '/category' + param
                    // $this.$store.commit('SET_CURRENT_CATEGORY', 'dads')
                }
            }
        },
        goCategory (param, type) {
            if(process.BROWSER_BUILD){
                if(type == 1){
                    location.href = '/classify/' + param
                }
                else if(type == 2){
                    location.href = '/classify/sec/' + param
                }
            }
        },
        showNav () {
            let $this = this
            if(process.BROWSER_BUILD){
                if(location.href != ''){
                    $this.isIndex = !$this.isIndex
                }
            }
        }
    }
}
</script>
