module.exports = {
  // 设置代码每行的最大字符数
  printWidth: 256,

  // 使用单引号而不是双引号
  singleQuote: true,

  // 在jsx中使用单引号而不是双引号
  jsxSingleQuote: true,

  // 行尾分号
  semi: true,

  // 使用tab而不是空格缩进
  useTabs: false,

  // 缩进大小
  tabWidth: 4,

  // 在语句末尾添加逗号
  trailingComma: 'all',

  // 在对象和数组的最后一个元素后面加上逗号
  bracketSpacing: true,

  // 箭头函数参数加括号
  arrowParens: 'always',
  endOfLine: 'lf', // 文件换行格式 LF/CRLF
  quoteProps: 'as-needed', // 对象的key仅在必要时用引号
  jsxBracketSameLine: false, // jsx标签的反尖括号需要换行
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  rangeEnd: Infinity, // 结尾
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  proseWrap: 'preserve', // 使用默认的折行标准
  htmlWhitespaceSensitivity: 'css', // 根据显示样式决定html要不要折行
};
