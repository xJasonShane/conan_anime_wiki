import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '名侦探柯南 Wiki',
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
      { text: '搜索', link: '/search.md' },
      { text: '关于', link: '/about.md' }
    ],

    sidebar: {
      '/': [
        {
          text: '导航',
          items: [
            { text: '剧集列表', link: '/' },
            { text: '搜索', link: '/search.md' },
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

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})
