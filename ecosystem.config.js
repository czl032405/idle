module.exports = {
  apps: [
    {
      name: 'idle',
      cwd: "./",
      script: 'index.js',
      env: {
        PORT: 9001
      },
      post_update: ["npm install"]
    },
  ],
  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
