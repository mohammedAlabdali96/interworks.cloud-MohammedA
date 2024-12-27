export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
  }
  