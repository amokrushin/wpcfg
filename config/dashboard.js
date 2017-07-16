const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    plugins: [
        new DashboardPlugin({ port: 9838 }),
    ],
};
