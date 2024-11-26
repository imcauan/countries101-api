import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CountryCode = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().params.code;
  },
);
