import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { IS_PAGINATED_KEY } from 'src/decorators/paginated.decorator';
import { ReadProductPaginatedDto } from 'src/dto/read-product-paginated.dto';
import { PaginatedHandlerResponse } from 'src/interfaces/paginated-handler-response.interface';
import { PaginatedResponse } from 'src/interfaces/paginated-response.interface';

export class PaginatedInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const { offset } = context
      .switchToHttp()
      .getRequest<{ query: ReadProductPaginatedDto }>().query;

    const isPaginated = this.reflector.getAllAndOverride<boolean>(
      IS_PAGINATED_KEY,
      [context.getClass(), context.getHandler()],
    );

    const option = isPaginated
      ? (data: PaginatedHandlerResponse<any>): PaginatedResponse<any> => ({
          data: data.data,
          pagination: {
            offset: +offset,
            total_count: data.total_count,
            count: data.count,
          },
        })
      : (data) => data;

    return next.handle().pipe(map(option));
  }
}
