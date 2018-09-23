export default {
  chainWebpack(config, { webpack }) {
      config.module.rule('ts').include.clear();
  }
}