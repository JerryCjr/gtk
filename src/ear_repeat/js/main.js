require.config({
    baseUrl: './js',
    paths: {
        common: 'https://s0.babyfs.cn/op/arch/48/1c1fecc2a2e54e6daeeffd604e9346fc/common/common',
        map: 'https://s0.babyfs.cn/op/arch/48/75ff3b01638540488ee16b01bcb5333f/map/map',
        request: 'https://s0.babyfs.cn/op/arch/1/b8c93b5a904a4473bec4bc234cf22d3a/request',
        setScreenHoriz: "https://s0.babyfs.cn/m/template/common/setScreenHoriz",
        starts: 'https://s0.babyfs.cn/op/arch/48/1c1fecc2a2e54e6daeeffd604e9346fc/common/starts',
        zepto: 'https://s0.babyfs.cn/op/arch/48/324b7abbe0a84deda88d333008e0c4d8/zepto/zepto.min',
        preload: 'https://s0.babyfs.cn/op/arch/1/c8231265729b43a8b671af4a884e36ac/preload',
        index: 'index',
        myApp: 'app',
    }
})

require(['myApp'])
