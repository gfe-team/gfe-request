const {
  truncate
} = require("fs");

module.exports = {
  title: 'axios http',
  description: 'axios http',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }],
  ],
  base: '/',
  markdown: {
    lineNumbers: truncate
  },
  themeConfig: {
    logo: '/logo.jpg',
    sidebarDepth: 2,
    lastUpdated: '最后更新时间',
    activeHeaderLinks: true,
    nextLinks: true,
    prevLinks: true,
    nav: [{
        text: '指南',
        link: '/guide/'
      },
      {
        text: '帮助',
        link: '/help/'
      },
      {
        text: '博客',
        link: 'https://www.yuque.com/sq56fo/vfqwrn/vo88ny',
        
      },
      {
        text: 'Git',
        items: [
          {
            text: 'Github',
            link: 'https://github.com/gfe-team/gfe-request',
            target: '_blank'
          }
        ]
      }
    ],
    sidebar: {
      '/guide/': [{
          title: '指南',
          collapsable: false,
          children: [
            ['', '介绍'],
            ['start.md', '快速上手']
          ]
        },
        {
          title: '深入',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['link.md', '链接']
          ]
        }
      ],
      '/help/': 'auto'
    }
  }
}