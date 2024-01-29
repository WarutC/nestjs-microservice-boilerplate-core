export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST,
    dbname: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASSWORD,
    kuePrefix: `${process.env.REDIS_PREFIX}-q`,
    scope: `${process.env.REDIS_PREFIX}-scope`,
    ttl: process.env.CACHE_TTL || 3600,
    db: process.env.REDIS_DB,
    url: `redis://default:${process.env.REDIS_PASSWORD}@${
      process.env.REDIS_HOST
    }:${process.env.REDIS_PORT}/${process.env.REDIS_DB || 0}`,
    cachePrefix: `core-service-${process.env.REDIS_PREFIX}`,
  },
  rabbitmq: {
    urls: process.env.RABBITMQ_URLS || 'amqp://rabbitmq:5672',
    queue: process.env.RABBITMQ_QUEUE || 'core_queue',
    queueOptions: {
      durable: false,
    },
  },
});
