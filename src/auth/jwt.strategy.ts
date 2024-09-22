import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwtforauth', // Ensure this matches the secret used to sign the JWT
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload);
    // Ensure all required fields are present
    if (!payload.sub || !payload.username || payload.role === undefined) {
      throw new UnauthorizedException(
        'Missing necessary fields in JWT payload',
      );
    }
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
