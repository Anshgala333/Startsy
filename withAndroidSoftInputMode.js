// const { withAndroidManifest } = require('@expo/config-plugins');

// module.exports = function (config) {
//   return withAndroidManifest(config, (config) => {
//     const manifest = config.modResults;

//     if (manifest['application']) {
//       const activities = manifest['application']['activity'] || [];
//       activities.forEach(activity => {
//         activity['$']['android:windowSoftInputMode'] = 'adjustResize';
//         activity['$']['android:background'] = '@android:color/black'; // Sets the background color to black
//       });
//     }

//     return config;
//   });
// };
