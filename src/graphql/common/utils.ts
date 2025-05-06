import type { Pagination } from '../../../generated/graphql';

export function getPaginationInfo(pagination: Pagination | undefined | null) {
  return {
    skip: pagination?.offset || 0,
    take: pagination?.limit || 10,
  };
}
