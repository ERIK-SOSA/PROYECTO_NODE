const express = require('express');
const LuhnService = require('../Services/luhn');

function luhnApi(app) {
    const router = express.Router();
    app.use("/luhn", router);
    const luhnService = new LuhnService();

    router.get("/", async function(req, res, next){
        try {
          res.status(200).json({
              isValid: isValidNumberCreditCard()
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
        //console.log('req-body',  req);
        try {
            res.status(200).json({
                isValid: await isValidNumberCreditCard(number)
            });
        } catch (err) {
            next(err);
        }
    });

    function split_numbers(n) {
        console.log('split_numbers', n);
        return new Promise((resolve) => {
            if (n.number) {
                resolve((n.number + '').split('').map((i) => { return Number(i); }));
            } else {
                resolve((n + '').split('').map((i) => { return Number(i); }));
            }
        });
    }

    async function luhn(n) {
       
        return new Promise( function (resolve) {
                resolve( 
                    split_numbers(n).then((resp) => {
                        console.log('resp', resp);


                        const number_reversed = resp.reverse();
                        console.log('number_reversed', number_reversed);
                        let result;
                        let results = [];

                        for (let i = 0; i < number_reversed.length; i++) {
                            const even_number = i % 2;
                            if (even_number == 0) {
                                result = number_reversed[i] * 1;
                                results.push(result);
                            } else {
                                result = number_reversed[i] * 2;
                                if (result > 9) {
                                    result = isGraterThanNine(result).then((entry) => {
                                        console.log('entry', entry);
                                        results.push(result);
                                        console.log('RESULTS', results);                                        
                                    });
                                }
                            }

            
                        }
                        return results;
                    })
                );
            } );
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
        console.log('isValidNumberCreditCard', n);
        //const results = []; 
        // results = luhn(n).then( (luhn) => {
        //     console.log('luhn::::', luhn);
        // }); 
        const results = await luhn(n)
        console.log("Lunh list_:", results)
        let isValid = false;
        let plus = 0;
        results.forEach(element => {
            plus = plus + element;
        });
        console.log("-----", plus);
        base = plus%10;
        if (base == 0) {
            isValid = true;
        } else {
            isValid = false;
        }
        return isValid;
    }

}

module.exports = luhnApi;