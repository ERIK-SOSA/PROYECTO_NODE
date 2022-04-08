const express = require('express');

function luhnApi(app) {
    const router = express.Router();
    app.use("/luhn", router);

    router.get("/", async function(req, res, next){
        try {
          res.status(200).json({
              isValid: isValidNumberCreditCard()
          });
        } catch (error) {
            next(error);
        }
    });

    router.get("/", async function(req, res, next){
        const { body: number } = req;
        console.log('req', number);
        try {
         
        } catch (error) {
            next(err);
        }
    });

    function split_numbers(n) {
        return (n + '').split('').map((i) => { return Number(i); });
    }

    function luhn() {
        const numberCreditCard = 79927398713;
        const number_splitted = split_numbers(numberCreditCard);
        const number_reversed = number_splitted.reverse();

        let result;
        let results = [];

        for (let i=0; i<number_reversed.length; i++) {
            const even_number = i%2;
            if (even_number == 0) {
                result = number_reversed[i] * 1;
                if (result > 9) {
                    result = isGraterThanNine(result);
                }
                results.push(result);
            } else {
                result = number_reversed[i] * 2;
                if (result > 9) {
                    result = isGraterThanNine(result);
                }
                results.push(result);
            }

        }
        return results;
    }

    function isGraterThanNine(result) {
        const value = split_numbers(result);
        let plus = 0;
        for (let i=0; i<value.length; i++) {
            plus = plus + parseInt(value[i].toString(),10);
        }
        return plus;
    }

    function isValidNumberCreditCard() {
        const results = luhn();
        let isValid = false;
        let plus = 0;
        results.forEach(element => {
            plus = plus + element;
        });
        base = plus%10;
        if (base == 0) {
            isValid = true;
        } else {
            isValid = false;
        }<
        return isValid;
    }

}



module.exports = luhnApi; 