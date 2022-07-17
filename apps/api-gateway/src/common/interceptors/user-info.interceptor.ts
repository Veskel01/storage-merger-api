import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { UserInfoService } from '../../abstractions';
import { UsersFacade } from '../../application/users';
import {
  CreateNewUserCommand,
  GetSingleUserQuery,
  IUserEntity,
  UpdateUserCommand,
  User
} from '../../domain/users';
import { detectPublicRoute, extractBearerToken } from '../../helpers';
import { IImportedUser } from '../../types';
import { diff } from 'deep-object-diff';

type Params = {
  importedUser: IImportedUser;
  user: User | null;
};

@Injectable()
export class UserInfoInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly userInfoService: UserInfoService,
    private readonly usersFacade: UsersFacade
  ) {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublicRoute = detectPublicRoute({ reflector: this.reflector, context });
    const accessToken = extractBearerToken(request);
    if (isPublicRoute || !accessToken) {
      return next.handle();
    }
    return this.userInfoService.getUserInfo(accessToken).pipe(
      switchMap((importedUser) => {
        const params: Params = {
          importedUser,
          user: null
        };
        return this._fetchUserByAuthId(params);
      }),
      switchMap((params) => this._createUserIfNotExist(params)),
      switchMap((params) => this._updateUserIfThereAreChanges(params)),
      switchMap((params) => {
        if (params.user) {
          request.user = params.user;
        }
        return next.handle();
      })
    );
  }

  private _fetchUserByAuthId(params: Params): Observable<Params> {
    return this.usersFacade
      .getSingle(new GetSingleUserQuery(params.importedUser.authId, 'auth'))
      .pipe(
        map((user) => {
          params.user = user;
          return params;
        })
      );
  }

  private _createUserIfNotExist(params: Params): Observable<Params> {
    if (!params.user) {
      const { importedUser } = params;
      return this.usersFacade.createNewUser(new CreateNewUserCommand(importedUser)).pipe(
        map((user) => {
          params.user = user;
          return params;
        })
      );
    }
    return of(params);
  }

  private _updateUserIfThereAreChanges(params: Params): Observable<Params> {
    if (params.user) {
      const { importedUser, user } = params;

      const userState = user.getState();
      const difference = diff(userState, importedUser);

      const dataToUpdate = {} as Record<string, unknown>;

      Object.entries(difference).forEach(([key, value]) => {
        const typedKey = key as keyof IUserEntity;
        if (userState[typedKey] && value) {
          const isArray = Array.isArray(userState[typedKey]);
          if (isArray) {
            dataToUpdate[key] = importedUser[key as keyof IImportedUser];
          } else {
            dataToUpdate[key] = value;
          }
        }
      });

      user.setState(dataToUpdate);

      if (Object.keys(dataToUpdate).length > 0) {
        return from(
          this.usersFacade.updateUser(new UpdateUserCommand(userState.id, dataToUpdate))
        ).pipe(
          map((user) => {
            params.user = user;
            return params;
          })
        );
      }
    }

    return of(params);
  }
}
