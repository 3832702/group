const AutoPrefixer = require("autoprefixer");
const px2rem = require("postcss-pxtorem");
  // 判
module.exports = ({ file }) => {
  let remUnit;
  if (file && file.dirname && file.dirname.indexOf("vant")>-1) {
    remUnit = 20;
  } else {
    remUnit = 40;
  }

  return {
    plugins: [
      AutoPrefixer(),
      px2rem({ rootValue: remUnit, propList: ['*'] })
    ]
  };
};
