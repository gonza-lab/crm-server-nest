import { SetMetadata } from '@nestjs/common';

export const IS_PAGINATED_KEY = 'isPaginated';
export const Paginated = () => SetMetadata(IS_PAGINATED_KEY, true);
