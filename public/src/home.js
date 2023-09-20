const getTotalBooksCount = (books) => {
  return books.length;
  }
  
  const getTotalAccountsCount = (accounts) => {
    return accounts.length;
  }
  
  const getBooksBorrowedCount = (books) => {
    let borrowed = books.filter((book) => book.borrows[0].returned === false);
    return borrowed.length;
  }
  
  const helper = (books) => {
    let countGen = {};
    books.forEach((bookA) => {
      if (countGen[bookA.genre] != null) {
        countGen[bookA.genre]++;
      } else {
        countGen[bookA.genre] = 1;
      }
    });
    return countGen;
  }
  
  const getMostCommonGenres = (books) => {
    let countGen = helper(books);
    let countCommon = [];
    for (const [key, value] of Object.entries(countGen)) {
      countCommon.push({ name: key, count: value });
    }
    countCommon.sort((a, b) => b.count - a.count);
    return countCommon.slice(0, 5);
  }
  
  
  const getMostPopularBooks = (books, count = 5) => {
    const borrows = books.map((book) => ({
      name: book.title,
      count: book.borrows.length,
    }));
    borrows.sort((a, b) => b.count - a.count);
    return borrows.slice(0, count);
  }
  
  
  const getMostPopularAuthors = (books, authors) => {
    let result = [];
    authors.forEach((author) => {
      let anAuthor = {
        name: `${author.name.first} ${author.name.last}`,
        count: 0,
      };
      books.forEach((book) => {
        if (book.authorId === author.id) {
          anAuthor.count += book.borrows.length;
        }
      });
      result.push(anAuthor);
    });
    return result.sort((a, b) => b.count - a.count).slice(0, 5);
  }
  
  module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
  };
