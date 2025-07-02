import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload , TokenType } from '../../libs/types/src/index';

@Injectable()
export class TokenFactory {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  private getSecret(type: TokenType): string {
    let secret: string | undefined;
    switch (type) {
      case TokenType.ACCESS:
        secret = this.config.get<string>('JWT_ACCESS_SECRET');
        break;
      case TokenType.REFRESH:
        secret = this.config.get<string>('JWT_REFRESH_SECRET');
        break;
      default:
        // This case should ideally not be reached with strict typing
        throw new Error('Unknown or unsupported token type');
    }
    if (!secret) throw new Error(`Missing JWT secret for token type: ${type}`);
    return secret;
  }

  private getExpiration(type: TokenType): string {
    switch (type) {
      case TokenType.ACCESS:
        return this.config.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m';
      case TokenType.REFRESH:
        return this.config.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
      default:
        throw new Error('Unknown or unsupported token type');
    }
  }

  async signToken(
    payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'>,
    type: TokenType,
  ): Promise<string> {
    return this.jwtService.signAsync(
      { ...payload, type },
      {
        secret: this.getSecret(type),
        expiresIn: this.getExpiration(type),
      },
    );
  }

  async verifyToken(token: string, type: TokenType): Promise<TokenPayload> {
    const payload = await this.jwtService.verifyAsync<TokenPayload>(token, {
      secret: this.getSecret(type),
    });

    if (payload.type !== type) {
      throw new Error(`Invalid token type. Expected ${type} but got ${payload.type}.`);
    }

    return payload;
  }
} 