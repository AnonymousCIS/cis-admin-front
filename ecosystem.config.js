module.exports = {
  apps: [
    {
      name: 'admin-cis-pintech',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 6000',
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
}
