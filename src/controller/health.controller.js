const {
  createSuccessResponse: _Success,
} = require('../constant/response.constant')

// Function to convert bytes to MB or GB
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizes[i]}`
}

// Function to format uptime (convert seconds to a readable format)
const formatUptime = (uptimeInSeconds) => {
  const hours = Math.floor(uptimeInSeconds / 3600)
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60)
  const seconds = Math.floor(uptimeInSeconds % 60)
  return `${hours}h ${minutes}m ${seconds}s`
}

exports.healthCheck = async (req, res, next) => {
  const uptimeInSeconds = process.uptime()

  const healthcheck = {
    uptime: formatUptime(uptimeInSeconds),
    message: 'OK',
    timestamp: Date.now(),
    node: {
      status: 'OK',
      version: process.version,
      memoryUsage: {
        rss: formatBytes(process.memoryUsage().rss),
        heapTotal: formatBytes(process.memoryUsage().heapTotal),
        heapUsed: formatBytes(process.memoryUsage().heapUsed),
        external: formatBytes(process.memoryUsage().external),
        arrayBuffers: formatBytes(process.memoryUsage().arrayBuffers),
      },
      cpuUsage: {
        user: `${(process.cpuUsage().user / 1000000).toFixed(2)} ms`, // Convert microseconds to milliseconds
        system: `${(process.cpuUsage().system / 1000000).toFixed(2)} ms`, // Convert microseconds to milliseconds
      },
    },
    services: {
      redis: 'Pending', // For example, you can add logic to check if Redis is available
    },
  }

  try {
    // You can add other service checks here (e.g., Redis, etc.)
    res.status(200).json(_Success('Health check successful', healthcheck))
  } catch (error) {
    healthcheck.message = 'FAILED'
    healthcheck.node.status = 'ERROR'
    healthcheck.error = error.message

    res.status(500).json(_Success('Health check failed', healthcheck))
  }
}
