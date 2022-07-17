import { HttpStatus } from '@nestjs/common';
import { DateTime } from 'luxon';
import { catchError, map, Observable } from 'rxjs';
import { IImportedUser, IUserInfo } from '../../types';
import { UserInfoService } from '../../abstractions';
import { AUTH_DOMAIN_ENV_VAR } from 'apps/api-gateway/src/constants';
import { ApplicationException } from 'apps/api-gateway/src/exceptions';

export class FusionUserInfoService extends UserInfoService {
  public getUserInfo(accessToken: string): Observable<IImportedUser> {
    const url = `${this.configService.get(AUTH_DOMAIN_ENV_VAR)}/oauth2/userinfo`;
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    return this.http
      .get<IUserInfo>(url, {
        headers
      })
      .pipe(
        map(({ data }) => {
          return this._mapUserInfoToImportedUser(data);
        }),
        catchError(() => {
          throw new ApplicationException({
            message: 'Failed to get user info',
            messageArgs: [],
            messageFormat: 'Failed to get user info',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
          });
        })
      );
  }

  private _mapUserInfoToImportedUser(userInfo: IUserInfo): IImportedUser {
    return {
      authId: userInfo.sub,
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      birthDate: DateTime.fromFormat(userInfo.birthdate, 'yyyy-MM-dd').toJSDate(),
      phoneNumber: userInfo.phone_number,
      roles: userInfo.roles
    };
  }
}
