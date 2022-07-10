type AllowedStages = 'development' | 'staging' | 'production';

export class Stages {
  public static get getCurrentStage(): AllowedStages {
    return process.env.NODE_ENV as AllowedStages;
  }

  public static get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  public static get isStaging(): boolean {
    return process.env.NODE_ENV === 'staging';
  }

  public static get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  public static get isProductionOrStaging(): boolean {
    return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
  }

  public static get isDevelopmentOrStaging(): boolean {
    return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging';
  }
}
