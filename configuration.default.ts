export interface IAppConfig {
  port: number;
  apiPrefix: string;
  useOpenApi: boolean;
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
}

export default (): Partial<IAppConfig> => ({
  port: 4100,
  apiPrefix: '/api',
  useOpenApi: true,
  dbHost: 'localhost',
  dbPort: 5432,
  dbName: 'cat-cafe',
});
