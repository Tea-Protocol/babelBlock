export interface BlockBabelConfig {
  /** babel预设 */
  presets?: any[][]
  /** babel插件 */
  plugins?: any[][]
  /** 其他配置 */
  [key: string]: any
}

/** 构建区块通用babel配置 */
const commonConfig: BlockBabelConfig = {
  presets: [
    ['@babel/preset-env'],
    [
      '@umijs/babel-preset-umi/app',
      {
        env: { targets: { node: 8 } },
        transformRuntime: false,
      },
    ],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '@': ([, name]: any) => (name.includes('globalConfig') ? `@${name}` : `./src${name}`),
        },
      },
    ],
  ],
}

/** 获取构建区块通用babel配置 */
export const getBlockBabelConfig = (config: BlockBabelConfig = {}) => {
  Object.keys(config).forEach(key => {
    const value = config[key]
    const valueType = value.constructor
    const oldValue = commonConfig[key]

    if (valueType === Object) {
      commonConfig[key] = oldValue ? { ...oldValue, ...value } : value
    } else if (valueType === Array) {
      commonConfig[key] = oldValue ? [...oldValue, ...value] : value
    } else {
      commonConfig[key] = value
    }
  })

  return commonConfig
}
