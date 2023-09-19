function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    const lastNameA = accountA.name.last;
    const lastNameB = accountB.name.last;
    return lastNameA.toLowerCase() < lastNameB.toLowerCase() ? -1 : 1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((totalBorrows, { borrows }) => {
    if (borrows.some((record) => record.id === accountId)) totalBorrows++;
    return totalBorrows;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;

  // Filter books that are currently borrowed by the account and not yet returned
  const result = books
    .filter((book) =>
      book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned)
    )
    .map((book) => {
      // Find the author for the book
      const author = authors.find((author) => author.id === book.authorId);

      // Create a new book object with author information
      const newBook = {
        ...book,
        author,
      };

      return newBook;
    });

  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
}

