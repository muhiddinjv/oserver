import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  getAllRegion() {
    return 'All Region';
  }
}
