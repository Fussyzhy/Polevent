import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
]

const eslintPluginPrettier = require('eslint-plugin-prettier')

// 如果要对Vue组件进行规则校验，需安装eslint-plugin-vue依赖
const eslintPluginVue = require('eslint-plugin-vue')

module.exports = {
  // 引入Prettier插件，使其规则生效
  plugins: [eslintPluginPrettier, eslintPluginVue],
  rules: {
    // 'prettier/prettier'规则配置
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        semi: false,
        printWidth: 80,
        trailingComma: 'none',
        endOfLine: 'auto',
      },
    ],
    // 'vue/multi-word-component-names'规则配置
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'],
      },
    ],
    // 'vue/no-setup-props-destructure'规则配置
    'vue/no-setup-props-destructure': ['off'],
    // 'no-undef'规则配置
    'no-undef': 'error',
  },
}
