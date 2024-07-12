import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const config = {
    mongo: { dbURI: process.env.DB_URL },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };

  return config;
});
