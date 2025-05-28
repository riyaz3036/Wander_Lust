import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);
  private initialized = false;

  async onApplicationBootstrap(): Promise<void> {
    try {
      this.logger.log('Starting the application...');

      this.initialized = true;
    } catch (error) {
      this.logger.error('Failed to start application:', error);
      throw error;
    }
  }

  // To check initialization status
  isInitialized(): boolean {
    return this.initialized;
  }
}