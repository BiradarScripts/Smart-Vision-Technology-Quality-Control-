const { exec } = require('child_process');
const { PrismaClient } = require('@prisma/client');

const prismaDefault = new PrismaClient();


const prismaMiddleware = async (req, res, next) => {
    console.log(req.body);
    const userDbUrl = req.headers['user-database-url']; // Assume the user provides their database URL
    if (userDbUrl) {
      try {
        // Run migrations for the user's database
        await runMigration(userDbUrl);
  
        // Initialize Prisma client with the user's database
        req.prisma = new PrismaClient({
          datasources: {
            db: {
              url: userDbUrl,
            },
          },
        });
      } catch (error) {
        return res.status(500).json({ message: 'Database migration failed', error: error.message });
      }
    } else {
      req.prisma = prismaDefault;
    }
    next();
  };
  



const runMigration = async (databaseUrl) => {
  return new Promise((resolve, reject) => {
    // Set the DATABASE_URL for the migration process
    process.env.DATABASE_URL = databaseUrl;

    // Run the migration command
    exec('npx prisma migrate deploy', (error, stdout, stderr) => {
      if (error) {
        console.error(`Migration failed: ${stderr}`);
        reject(new Error(`Migration error: ${stderr}`));
      } else {
        console.log(`Migration successful: ${stdout}`);
        resolve(stdout);
      }
    });
  });
};


module.exports = prismaMiddleware;