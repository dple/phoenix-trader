require("dotenv").config();

export const execute = async () => {
    const REFRESH_FREQUENCY_IN_MS = 2000; // 2 seconds
    const MAX_ITERATIONS = 3;

    // Edge of $2
    const EDGE = 1;
    let counter = 0;


    do {
        try {
        // Get current SOL price from Coinbase
        const response = await fetch(
            "https://api.coinbase.com/v2/prices/SOL-USD/spot"
        );
    
        //if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
        const data: any = await response.json();

        if (!data.data || !data.data.amount)
            throw new Error("Invalid response structure");

        const price = parseFloat(data.data.amount);

        let bidPrice = price - EDGE;
        let askPrice = price + EDGE;
    
    
        console.log(`SOL price: ${price}`);
        console.log(`Placing bid (buy) order at: ${bidPrice}`);
        console.log(`Placing ask (sell) order at: ${askPrice}`);

        counter += 1;
        await delay(REFRESH_FREQUENCY_IN_MS);
    
        } catch (error) {
            console.error(error);
        }
    } while (counter < MAX_ITERATIONS);
};
    
export const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
    
execute();