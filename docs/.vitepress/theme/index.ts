// https://vitepress.dev/guide/custom-theme
import { h, toRefs } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import googleAnalytics from 'vitepress-plugin-google-analytics'
import { useData, useRoute } from 'vitepress';
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    googleAnalytics({
      id: 'G-4VZSR4647E',
    })
  },
  setup() {
    // Get frontmatter and route
    const { frontmatter } = toRefs(useData());
    const route = useRoute();

    // Obtain configuration from: https://giscus.app/
    giscusTalk({
      repo: 'damoang-users/rhymix-guide',
      repoId: 'R_kgDOOBonDA',
      category: 'General',
      categoryId: 'DIC_kwDOOBonDM4Cnd1L',
      mapping: 'pathname',
      inputPosition: 'top',
      lang: 'ko',
      theme: 'transparent_dark',
      loading: 'lazy',
    }, {
      frontmatter, route
    },
      // Whether to activate the comment area on all pages.
      // The default is true, which means enabled, this parameter can be ignored;
      // If it is false, it means it is not enabled.
      // You can use `comment: true` preface to enable it separately on the page.
      true
    );
  }
} satisfies Theme
