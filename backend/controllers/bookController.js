import https from 'https'

// This function give best seller books we use to home page
export const topBooks = async (req, res) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:ScienceFiction`;
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            try {
                const result = JSON.parse(data);
                const books = result.items.map(item => {
                    const id = item.id;
                    const { title, description, authors, pageCount, publishedDate, imageLinks, infoLink } = item.volumeInfo;
                    return {
                        id,
                        title,
                        description,
                        authors,
                        pageCount,
                        publishedDate,
                        thumbnail: imageLinks?.thumbnail,
                        infoLink
                    };
                });

                // Select a random book
                const randomIndex = Math.floor(Math.random() * books.length);
                const randomBook = books[randomIndex];

                res.json(randomBook);
            } catch (error) {
                console.log(`error: ${error}`);
                res.status(500).json({ error: `Error parsing book data` });
            }
        });
    });
};


// Book get by id
export const getBook = async (req, res) => {
    const bookId = req.params.id;
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    https.get(url, (response) => {
        let data = '';

        // Collect data in chunks
        response.on('data', (chunk) => {
            data += chunk;
        });

        // When the response is complete
        response.on('end', () => {
            try {
                const result = JSON.parse(data);
                console.log(`Received data: ${result}`);

                // Extract book information
                const book = {
                    id: result.id,
                    title: result.volumeInfo.title,
                    description: result.volumeInfo.description,
                    authors: result.volumeInfo.authors,
                    pageCount: result.volumeInfo.pageCount,
                    publishedDate: result.volumeInfo.publishedDate,
                    thumbnail: result.volumeInfo.imageLinks?.thumbnail,
                    infoLink: result.volumeInfo.infoLink
                };

                res.json(book);
            } catch (error) {
                console.error(`Error parsing data: ${error}`);
                res.status(500).json({ error: 'Error parsing book data' });
            }
        });
    }).on('error', (error) => {
        console.error(`Request error: ${error}`);
        res.status(500).json({ error: 'Error fetching book data' });
    });
};


export const searchBook = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Please provide a search query' });
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

    https.get(url, (response) => {
        let data = '';

        // Accumulate the data as it comes in
        response.on('data', (chunk) => {
            data += chunk;
        });

        // Once all data is received, parse it and send the response
        response.on('end', () => {
            try {
                const result = JSON.parse(data);

                const books = result.items.map(item => {
                    const id = item.id
                    const { title, description, authors, pageCount, publishedDate, imageLinks, infoLink } = item.volumeInfo;
                    return {
                        id,
                        title,
                        description,
                        authors,
                        pageCount,
                        publishedDate,
                        thumbnail: imageLinks?.thumbnail,
                        infoLink
                    };
                });

                res.json(books);
            } catch (error) {
                console.log('Error: ' + error)
                res.status(500).json({ error: 'Error parsing book data' });
            }
        });
    }).on('error', (error) => {
        console.log(error)
        res.status(500).json({ error: 'Error searching for books' });
    });
};

console.log(typeof searchBook);
export default searchBook
