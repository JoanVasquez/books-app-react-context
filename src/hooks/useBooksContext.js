import BooksContext from "../contexts/books";

const { useContext } = require("react");

function useBooksContext() {
  return useContext(BooksContext);
}

export default useBooksContext;
