import https from 'https'
export const searchBook = (req, res) => {
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
                    const { title, authors, publishedDate, imageLinks, infoLink } = item.volumeInfo;
                    return {
                        title,
                        authors,
                        publishedDate,
                        thumbnail: imageLinks?.thumbnail,
                        infoLink
                    };
                });

                res.json(books);
            } catch (error) {
                res.status(500).json({ error: 'Error parsing book data' });
            }
        });
    }).on('error', (error) => {
        res.status(500).json({ error: 'Error searching for books' });
    });
};

