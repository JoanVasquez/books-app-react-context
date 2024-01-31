import axiosUtil from "../utils/axiosUtil";

const { createContext, useState, useCallback } = require("react");
const bookEndPoint = "http://localhost:3001";

const BooksContext = createContext();

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const response = await axiosUtil(
      `${bookEndPoint}/books`,
      "GET",
      null,
      {},
      {}
    );
    setBooks(response);
  }, []);

  const editBookById = async (id, newTitle) => {
    await axiosUtil(
      `${bookEndPoint}/books/${id}`,
      "PUT",
      {
        title: newTitle,
      },
      {},
      {}
    );

    const updatedBooks = books.filter((item) => {
      if (item.id === id) {
        return (item.title = newTitle);
      }
      return item;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axiosUtil(`${bookEndPoint}/books/${id}`, "DELETE", {}, {});
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    const response = axiosUtil(
      `${bookEndPoint}/books`,
      "POST",
      {
        title,
      },
      {},
      {}
    );
    const updatedBooks = [...books, response];
    setBooks(updatedBooks);
  };

  const valueToShare = {
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
};

export { Provider };
export default BooksContext;
