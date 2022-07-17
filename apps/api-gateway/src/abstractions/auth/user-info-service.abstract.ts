import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { IImportedUser } from '../../types';

export abstract class UserInfoService {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly http: HttpService
  ) {}

  public abstract getUserInfo(accessToken: string): Observable<IImportedUser>;
}
