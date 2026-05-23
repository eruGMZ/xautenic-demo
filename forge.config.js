const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const includeCrossPlatformMakers = process.env.XAUTENIC_CROSS_PLATFORM === '1';
const signedRelease = process.env.XAUTENIC_SIGN === '1';
const winCertFile = process.env.WIN_CERT_FILE;
const winCertPassword = process.env.WIN_CERT_PASSWORD;
const appSlug = 'xautenic-demo';

if (signedRelease && (!winCertFile || !winCertPassword)) {
  throw new Error(
    'Signed release requires WIN_CERT_FILE and WIN_CERT_PASSWORD environment variables.'
  );
}

module.exports = {
  packagerConfig: {
    asar: true,
    prune: true,
    ignore: [
      /^\/BUILD-GUIDE\.md$/,
      /^\/README\.md$/,
      /^\/forge\.config\.js$/,
      /^\/\.gitignore$/,
      /^\/\.vscode($|\/)/,
      /^\/\.idea($|\/)/,
      /^\/\.git($|\/)/,
      /^\/coverage($|\/)/,
      /^\/dist($|\/)/,
      /^\/build($|\/)/,
      /^\/out($|\/)/,
      /^\/npm-debug\.log(\..*)?$/,
      /^\/yarn-error\.log(\..*)?$/,
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: appSlug,
        setupExe: 'XautenicDemoSetup.exe',
        noMsi: true,
        authors: 'Xautenic',
        description: 'Demo operativa Hotel + Eventos',
        ...(signedRelease
          ? {
              certificateFile: winCertFile,
              certificatePassword: winCertPassword,
            }
          : {}),
      },
    },
    ...(includeCrossPlatformMakers
      ? [
          {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
          },
          {
            name: '@electron-forge/maker-deb',
            config: {},
          },
          {
            name: '@electron-forge/maker-rpm',
            config: {},
          },
        ]
      : []),
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
