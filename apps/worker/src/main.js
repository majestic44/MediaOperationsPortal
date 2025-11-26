require('dotenv').config();
const { Worker, Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL);

// Queues
const publishQueue = new Queue('publish', { connection });
const analyticsQueue = new Queue('analytics', { connection });

new Worker('publish', async job => {
  console.log('Publishing post:', job.data);
}, { connection });

new Worker('analytics', async job => {
  console.log('Fetching analytics for:', job.data);
}, { connection });

console.log("Worker service running...");
