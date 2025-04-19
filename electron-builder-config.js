

module.exports = {
  appId: "com.example.myvue2electronrsbuildapp",
  productName: "yyyWork",
  directories: {
    output: "release",
    app: "."
  },
  files: [
    "dist/main/**/*",
    "dist/renderer/**/*",
    "package.json"
  ],
  mac: {
    target: "dmg"
  },
  win: {
    target: "nsis"
  },
  linux: {
    target: "AppImage"
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true
  }
};