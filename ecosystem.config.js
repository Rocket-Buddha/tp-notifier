module.exports = {
  apps: [{
    name: 'TAP-NOTIFIER-API',
    script: './bin/www/ServerManager.js',
    merge_logs: true,
    instances: 'max',
    exec_mode: 'cluster',
    watch: false,
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
