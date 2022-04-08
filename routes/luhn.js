const express = require('express');
const LuhnService = require('../Services/luhn');

function luhnApi(app) {
    const router = express.Router();
    app.use("/luhn", router);
    const luhnService = new LuhnService();

    router.get("/", async function(req, res, next){
        try {
          res.status(200).json({
              isValid: isValidNumberCreditCard(n)
          });
        } catch (err) {
            next(err);
        }
    });

    router.put("/", async function(req, res, next){
        const { body: number } = req;
        try {
            const isValid = await isValidNumberCreditCard(number);
            if (isValid){
                const luhnCreated = await luhnService.createLuhn(number);
                res.status(200).json({
                    data: luhnCreated,
                    message: 'luhn created succesfully'
                });
            }
            else {
                res.status(200).json({
                    message: 'the credit card is invalid'
                });
            }
        } catch (err) {
            next(err);
        }
    });

    router.post("/", async function(req, res, next){
        const { body: number } = req;
        console.log('req', number);
        try {
            res.status(200).json({
                isValid: await isValidNumberCreditCard(number)
            })
        } catch (err) {
            next(err);
        }
    });

    function split_numbers(n) {
        return new Promise((resolve)=> {
            if(n.number){
                resolve((n.number + '').split('').map((i) => { return Number(i); }));
            } else {
                resolve((n + '').split('').map((i) => { return Number(i); }));
            }
        });
    }

    async function luhn(n) {
        //const numberCreditCard = 79927398713;
        const number_splitted = await split_numbers(n);
        console.log('number_splitted     ',number_splitted);
        const number_reversed = number_splitted.reverse();

        let result;
        let results = [];

        for (let i=0; i<number_reversed.length; i++) {
            const even_number = i%2;
            if (even_number == 0) {
                result = number_reversed[i] * 1;
                results.push(result);
            } else {
                result = number_reversed[i] * 2;
                if (result > 9) {
                    result = await isGraterThanNine(result);
                }
                results.push(result);
            }

        }
        return results;
    }

    async function isGraterThanNine(result) {
        const value = await split_numbers(result);
        console.log('value', value);
        let plus = 0;
        for (let i=0; i<value.length; i++) {
            plus = plus + parseInt(value[i].toString(),10);
        }
        return plus;
    }

    async function isValidNumberCreditCard(n) {
        const results = await luhn(n);
        let isValid = false;
        let plus = 0;
        console.log(results)
        results.forEach(element => {
            plus = plus + element;
        });
        console.log('plus    ',plus);
        base = plus%10;
        console.log('base ',base);
        if (base == 0) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid;
    }

}


module.exports = luhnApi; 