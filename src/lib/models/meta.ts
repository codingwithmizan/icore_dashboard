export interface Meta {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
  next_page: number | null;
  prev_page: number | null;
}
