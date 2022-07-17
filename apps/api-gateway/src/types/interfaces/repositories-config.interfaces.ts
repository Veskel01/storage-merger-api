export type OrmTypes = 'typeorm';

export type Engines = 'postgres';

export interface IRepositoriesModuleOptions {
  engines: Engines[];
}

export interface IRegisterRepositoryOptions<TKeys extends string> {
  withOrm: OrmTypes;
  forRepositories: Array<TKeys> | 'all';
}
