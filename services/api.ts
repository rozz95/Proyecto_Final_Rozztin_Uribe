//Axios biblioteca JavaScript
import axios from 'axios';

const BASE_URL = 'https://reactnd-books-api.udacity.com' ;


export const fetchBooks = async () => {
  const response = await axios.get(
    `${BASE_URL}/books`,
    {
      headers: {
        Authorization: 'llave_global'  
      }
    }
  );
  return response.data.books; 
};

////////////////////////////////////////////////////////////

export const searchBooks = async (query: string,page = 1) => {
    const response = await axios.get(
        `${BASE_URL}/books`,
    {
      headers: {
        Authorization: 'llave_global', 
        language: 'es-ES',
                query,
                page
      }
    }
    );
    return response.data.results; //array de películas
}