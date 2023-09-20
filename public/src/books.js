const findAuthorById = (authors, id) => {
  const author = authors.find((author) => author.id === id);
  return author;
}

const findBookById = (books, id) => {
  const book = books.find((book) => book.id === id);
  return book;

}

const partitionBooksByBorrowedStatus = (books) => {
  const checkedOutBooks = [];
  const returnedBooks = [];

  for (const index in books) {
    const book = books[index];
    const firstTransaction = book.borrows[0];

    firstTransaction.returned ? returnedBooks.push(book) : checkedOutBooks.push(book);
  }

  return [checkedOutBooks, returnedBooks];
}

const getBorrowersForBook = (book, accounts) => {
  const result = [];

  for (const index in book.borrows) {
    const transaction = book.borrows[index];
    const account = accounts.find(account => account.id === transaction.id);

    if (account) {
      const { id, returned } = transaction;
      const { picture, age, name, company, email, registered } = account;
      const accountObject = {
        id,
        returned,
        picture,
        age,
        name,
        company,
        email,
        registered,
      };
      result.push(accountObject);
    }
  }

  return result.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
