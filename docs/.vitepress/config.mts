import { defineConfig, mergeConfig } from 'vitepress'

const customConfig = {};

if (process.env.NODE_ENV === 'production') {
} else {
  customConfig.markdown = {
    lineNumbers: true,
  }
}

// https://vitepress.dev/reference/site-config
export default mergeConfig(customConfig, defineConfig({
  lang: 'ko-KR',
  title: 'Rhymix Guide',
  titleTemplate: ':title - 라이믹스 가이드',
  description: "라이믹스 가이드",
  base: '/rhymix-guide/',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 4],
    logo: 'https://github.com/damoang-users.png',
    nav: [
      {
        text: '디자인',
        items: [
          { text: '시작하기', link: '/design/template/about' },
          { text: '레이아웃', link: '/design/layout/about' },
          // { text: '스킨' },
          // { text: '위젯' },
        ]
      },
      {
        text: '확장기능',
        items: [
          { text: '시작하기', link: '/extend/basic' },
          // { text: '애드온' },
          { text: '모듈', link: '/extend/module/about' },
          // { text: '위젯' },
        ]
      },
      { text: '레퍼런스', link: '/reference/debug' },
      { text: 'Awesome', link: 'https://github.com/damoang-users/awesome-rhymix' },
    ],

    sidebar: {
      '/design/': [
        {
          text: '템플릿',
          items: [
            { text: '개요', link: '/design/template/about' },
            { text: '템플릿 문법', link: '/design/template/blade' },
            // { text: '템플릿 문법 (v1)', link: '/design/template/old-syntax' },
          ]
        },
        {
          text: '레이아웃 만들기',
          items: [
            { text: '개요', link: '/design/layout/about' },
            { text: '설정 파일', link: '/design/layout/conf' },
          ]
        },
        {
          text: '스킨 만들기',
          items: [
            { text: '게시판 (board)' },
            { text: '커뮤니케이션 (communication)' },
            { text: '에디터 (editor)' },
            { text: '통합검색 (integration_search)' },
            { text: '회원 (member)' },
            { text: '오류 표시 (message)' },
            { text: '알림센터 (ncenterlite)' },
            { text: '페이지 (page)' },
            { text: '설문 (poll)' },
            {
              text: '위젯',
              items: [
                { text: 'Content (content)' },
                { text: '모바일 Content (mcontent)' },
                { text: '카운터 (counter_status)' },
                { text: '언어 선택 (language_select)' },
                { text: '로그인 정보 (login_info)' },
                { text: '설문 (pollWidget)' },
              ],
            },
          ]
        },
        {
          text: '위젯 스타일 만들기',
          items: [
            { text: '개요' },
          ]
        },
        {
          text: '확장하기',
          items: [
            { text: '애드온 만들기' },
            { text: '모듈 만들기', link: '/extend/module/about' },
            { text: '위젯 만들기', link: '/extend/widget/about' },
          ]
        },
      ],

      '/extend/': [
        {
          text: '확장 기능',
          items: [
            { text: '시작하기', link: '/extend/basic' },
            { text: '설정 파일', link: '/extend/basic/manifest-info' },
            { text: '정적분석도구 사용하기', link: '/extend/basic/static-analysis' },
          ]
        },
        {
          text: '애드온 만들기',
          items: [
            { text: '개요', link: '/extend/addon' },
          ]
        },
        {
          text: '모듈 만들기',
          items: [
            { text: '시작하기', link: '/extend/module/about' },
            { text: '모듈 정보 및 설정', link: '/extend/module/manifest' },
            { text: '액션 정의', link: '/extend/module/action' },
            { text: '이벤트 (트리거)', link: '/extend/module/event' },
            { text: '스키마', link: '/extend/module/schema' },
            { text: '룰셋' },
          ]
        },
        {
          text: '위젯 만들기',
          items: [
            { text: '개요', link: '/extend/widget/about' },
          ]
        },
        {
          text: '디자인',
          items: [
            { text: '템플릿', link: '/design/template/about' },
            { text: '레이아웃 만들기', link: '/design/layout/about' },
            { text: '스킨 만들기' },
            { text: '위젯 스타일 만들기' },
          ]
        },
        {
          text: '기타',
          items: [
            { text: 'Composer 사용하기', link: '/extend/module/composer' },
          ]
        },
      ],

      '/reference/': [
        {
          text: '레퍼런스',
          items: [
            // { text: '라이프 사이클', link: '/reference/lifecycle' },
            { text: '네임스페이스/autoload', link: '/reference/namespace-and-autoload' },
            {
              text: '템플릿',
              link: '/reference/template',
              items: [
                { text: 'Modifier', link: '/reference/template/modifier' },
              ]
            },
            {
              text: '데이터베이스', link: '/reference/database',
              items: [
                { text: '쿼리 빌더', link: '/reference/database/query-builder' },
                { text: 'DB 헬퍼', link: '/reference/database/db-helper' },
              ]
            },
            {
              text: '이벤트 (트리거)',
              link: '/reference/trigger',
              items: [
                { text: '개요', link: '/reference/trigger' },
                { text: '이벤트 목록', link: '/reference/trigger-list' },
              ],
            },
            { text: '라우터', link: '/reference/router' },
          ]
        },
        {
          text: '분류',
          items: [
            { text: 'Context' },
            {
              text: '주요 객체', link: '/reference/objects',
              items: [
                // { text: 'BaseObject', link: '/reference/objects/base-object' },
                { text: '문서 DocumentItem', link: '/reference/objects/document-item' },
                { text: '댓글 CommentItem', link: '/reference/objects/comment-item' },
              ]
            },
          ]
        },
        {
          text: 'Manifest',
          items: [
            {
              text: '모듈',
              items: [
                { text: '액션', link: '/reference/module-manifest-actions' },
              ]
            },
          ]
        },
        {
          text: 'Framework',
          items: [
            { text: 'Cache' },
            // { text: 'Calendar' },
            { text: 'Config' },
            { text: 'Cookie' },
            { text: 'DateTime' },
            // { text: 'DB' },
            // { text: 'Debug' },
            { text: 'Exception' },
            { text: 'Formatter' },
            // { text: 'HTTP' },
            // { text: 'i18n' },
            // { text: 'Image' },
            // { text: 'Korea' },
            // { text: 'Lang' },
            // { text: 'Mail' },
            // { text: 'MIME' },
            // { text: 'Pagination' },
            { text: 'Password' },
            // { text: 'Push' },
            // { text: 'Request' },
            // { text: 'Router' },
            { text: 'Security' },
            { text: 'Session' },
            // { text: 'SMS' },
            { text: 'Storage' },
            // { text: 'Template' },
            // { text: 'Timer' },
            // { text: 'UA' },
            { text: 'URL' },
          ]
        },
        {
          text: 'Modules',
          items: [
            // { text: 'addon' },
            // { text: 'admin' },
            // { text: 'adminlogging' },
            // { text: 'advanced_mailer' },
            // { text: 'autoinstall' },
            { text: 'board' },
            { text: 'comment' },
            { text: 'communication' },
            // { text: 'counter' },
            { text: 'document' },
            // { text: 'editor' },
            { text: 'file' },
            // { text: 'importer' },
            // { text: 'install' },
            // { text: 'integration_search' },
            // { text: 'krzip' },
            { text: 'layout' },
            { text: 'member' },
            { text: 'menu' },
            // { text: 'message' },
            { text: 'module' },
            // { text: 'ncenterlite' },
            { text: 'page' },
            { text: 'point' },
            // { text: 'poll' },
            // { text: 'rss' },
            // { text: 'session' },
            // { text: 'spamfilter' },
            // { text: 'tag' },
            // { text: 'trash' },
            // { text: 'widget' },
          ]
        },
        {
          text: '분류',
          items: [

          ]
        },
        {
          text: '기타',
          items: [
            { text: '디버그', link: '/reference/debug' },
            { text: 'changelog', link: '/reference/changelog' },
          ]
        }
      ],
    },

    lastUpdated: {
      formatOptions: {
        dateStyle: 'long',
        timeStyle: undefined,
      }
    },

    externalLinkIcon: true,

    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/damoang-users/rhymix-guide/edit/main/docs/:path',
      text: '이 페이지 수정하기'
    },
    docFooter: {
      prev: '이전',
      next: '다음'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/damoang-users/rhymix-guide/' }
    ]
  },
  markdown: {
    config: (md) => {
    },
  },
  sitemap: {
    hostname: 'https://damoang-users.github.io/rhymix-guide/',
  },
}))
