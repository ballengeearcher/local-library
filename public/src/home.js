function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      total++;
    }
  });

  return total;
}

function getMostCommonGenres(books) {
  // create new array of most common genres with reduce()
  const result = books.reduce((accum, book) => {
    // get the genre of current book
    const genre = book.genre;

    // get the object in accum that has "name === genre"
    const genreInfo = accum.find((element) => element.name === genre);

    // if an object was not found, create a new one and push it into accum
    if (!genreInfo) {
      const newGenreInfo = {
        name: genre,
        count: 1,
      };
      accum.push(newGenreInfo);
    } else {
      // if object was found, then add 1 to count
      genreInfo.count++;
    }

    return accum;
  }, []);

  // sort the array by count from greatest to least
  result.sort((genreA, genreB) => genreB.count - genreA.count);

  // limit array to 5
  result.splice(5);

  return result;
}

function getMostPopularBooks(books) {
  // create an new array of most popular books with map
  const result = books.map((book) => {
    const popularityInfo = {
      name: book.title,
      count: book.borrows.length,
    };

    return popularityInfo;
  });

  // sort the new array by count: greatest to least
  result.sort((titleA, titleB) => titleB.count - titleA.count);

  // limit to 5 elements
  result.splice(5);

  return result;
}

function getMostPopularAuthors(books, authors) {
  // Create an object to store the total borrows for each author
  const authorBorrows = {};

  // Iterate through the books and count the borrows for each author
  books.forEach((book) => {
    const authorId = book.authorId;
    if (!authorBorrows[authorId]) {
      authorBorrows[authorId] = 0;
    }
    authorBorrows[authorId] += book.borrows.length;
  });

  // Map the authors to their total borrows and format the result
  const result = authors.map((author) => {
    const fullName = `${author.name.first} ${author.name.last}`;
    const count = authorBorrows[author.id] || 0; // Use 0 if author has no borrows
    return {
      name: fullName,
      count: count,
    };
  });

  // Sort the result array by popularity (count) in descending order
  result.sort((a, b) => b.count - a.count);

 return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};