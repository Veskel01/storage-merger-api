export interface IIdentifiableEntity {
  id: string;
}

export interface IBaseEntity extends IIdentifiableEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
