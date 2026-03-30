import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, tenant_id?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultTenantId = '00000000-0000-0000-0000-000000000001';
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      tenant_id: tenant_id || defaultTenantId,
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenant_id: user.tenant_id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}