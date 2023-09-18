function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // Separate books into non-returned and returned categories
  const nonReturnedBooks = books.filter((book) =>
    book.borrows.some((borrow) => !borrow.returned)
  );
  const returnedBooks = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned)
  );

  // Return the result as an array
  return [nonReturnedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  // Create an array of transactions from the given book
  const transactions = book.borrows;

  // Define a function to find account information by ID
  const findAccountById = (id) => {
    return accounts.find(account => account.id === id);
  };

  // Use map to add the transaction id's account info to the transaction
  const result = transactions.map((transaction) => {
    const accountInfo = findAccountById(transaction.id);

    // Check if accountInfo exists (in case the account was not found)
    if (accountInfo) {
      const newTransaction = {
        ...transaction,
        ...accountInfo,
      };
      return newTransaction;
    } else {
      // Handle the case where accountInfo is not found
      return transaction; // You might want to return the original transaction or handle it differently.
    }
  });

  return result.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
}; 