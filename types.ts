//Interface
export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
}
