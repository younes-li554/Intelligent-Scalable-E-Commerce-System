import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const tenantId = req.headers['x-tenant-id'];

    if (!tenantId) {
      req.tenant_id = 'default';
    } else {
      req.tenant_id = tenantId;
    }

    next();
  }
}