

const WinnerService = {
    pickWinner: (clients) => {
        // Select a random client from the array
        const randomIndex = Math.floor(Math.random() * clients.length);
        return clients[randomIndex];
    }
};

export default WinnerService;