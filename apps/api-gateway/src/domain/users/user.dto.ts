import { IUserEntity } from './user.entity';

export class UserDTO implements Omit<IUserEntity, 'authId'> {
  public id: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public birthDate: Date;
  public phoneNumber: string;
  public roles: string[];
  public createdAt: Date;
  public updatedAt: Date;
  public fullName: string;

  public static fromEntity(entity: IUserEntity): UserDTO {
    const dto = new UserDTO();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.birthDate = entity.birthDate;
    dto.phoneNumber = entity.phoneNumber;
    dto.roles = entity.roles;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.fullName = `${entity.firstName} ${entity.lastName}`;
    return dto;
  }
}
