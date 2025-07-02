
export interface PaginationMeta {
    currentPage: number;
    itemPerPage: number;  
    totalPages : number; 
    hasNext:  boolean ; 
    hasPrev:boolean ; 
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
} 