import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '《名侦探柯南》电视动画Wiki',
  description: '名侦探柯南电视动画作品资料库',
  lang: 'zh-CN',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3c8772' }]
  ],
  
  themeConfig: {
    nav: [
      { text: '剧集列表', link: '/' },
      { text: '关于', link: '/about.md' }
    ],

    sidebar: {
      '/': [
        {
          text: '导航',
          items: [
            { text: '剧集列表', link: '/' },
            { text: '关于', link: '/about.md' }
          ]
        }
      ]
    },

    footer: {
      message: '基于 VitePress 构建',
      copyright: `© ${new Date().getFullYear()} 名侦探柯南 Wiki`
    },

    editLink: {
      pattern: '',
      text: '编辑此页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})
