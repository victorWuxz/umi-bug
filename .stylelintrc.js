module.exports = {
  "plugins": ["stylelint-mew"],
  "rules": {
      "mew/white-space-between-values": [true, {"severity": "warning"}],
      "mew/strict-values": [true, {"ignoreUnits": ["rpx", "upx"]}],
      "mew/stylus-colon": true,
      "mew/stylus-trailing-semicolon": true,
      "mew/use-hex-color": [true, {"severity": "warning"}],
      "linebreaks": false
  }
};
