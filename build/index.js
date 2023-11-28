"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.execute = void 0;
require("dotenv").config();
const execute = () => __awaiter(void 0, void 0, void 0, function* () {
    const REFRESH_FREQUENCY_IN_MS = 2000; // 2 seconds
    const MAX_ITERATIONS = 3;
    // Edge of $2
    const EDGE = 1;
    let counter = 0;
    do {
        try {
            // Get current SOL price from Coinbase
            const response = yield fetch("https://api.coinbase.com/v2/prices/SOL-USD/spot");
            //if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = yield response.json();
            if (!data.data || !data.data.amount)
                throw new Error("Invalid response structure");
            const price = parseFloat(data.data.amount);
            let bidPrice = price - EDGE;
            let askPrice = price + EDGE;
            console.log(`SOL price: ${price}`);
            console.log(`Placing bid (buy) order at: ${bidPrice}`);
            console.log(`Placing ask (sell) order at: ${askPrice}`);
            counter += 1;
            yield (0, exports.delay)(REFRESH_FREQUENCY_IN_MS);
        }
        catch (error) {
            console.error(error);
        }
    } while (counter < MAX_ITERATIONS);
});
exports.execute = execute;
const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
exports.delay = delay;
(0, exports.execute)();
