export const calculateBuy = (shareQuantity, purchasePrice) => {

    const totalAmount = parseFloat(shareQuantity) * parseFloat(purchasePrice);
    let comission = 0;

    if (totalAmount <= 50000) {
        comission = Math.max(10, totalAmount * 0.004);
    } else if (totalAmount <= 500000) {
        comission = totalAmount * 0.0037;
    } else if (totalAmount <= 2000000) {
        comission = totalAmount * 0.0034;
    } else if (totalAmount <= 10000000) {
        comission = totalAmount * 0.003;
    } else {
        comission = totalAmount * 0.0027;
    }

    const sebonFee = totalAmount * 0.00015;
    const dpCharge = 25;
    const totalPayableAmount = totalAmount + comission + sebonFee + dpCharge;
    return totalPayableAmount
};

export const calculateProfit = (shareQuantity, purchasePrice, ltp, type) => {

    const totalAmount = parseFloat(shareQuantity) * parseFloat(purchasePrice);
    if (type === 'secondary') {
        let comission = 0;

        if (totalAmount <= 50000) {
            comission = Math.max(10, totalAmount * 0.004);
        } else if (totalAmount <= 500000) {
            comission = totalAmount * 0.0037;
        } else if (totalAmount <= 2000000) {
            comission = totalAmount * 0.0034;
        } else if (totalAmount <= 10000000) {
            comission = totalAmount * 0.003;
        } else {
            comission = totalAmount * 0.0027;
        }

        const sebonFee = totalAmount * 0.00015;
        const dpCharge = 25;
        const totalPayableAmount = totalAmount + comission + sebonFee + dpCharge;
        return (ltp * shareQuantity) - totalPayableAmount
    } else {
        var investment = totalAmount
        return (ltp * shareQuantity) - investment
    }
};

export const calculateSell = (shareQuantity, purchasePrice, sellingPrice, capitalGainTax) => {

    const totalAmount = shareQuantity * sellingPrice;

    const calculateCommission = (totalAmount) => {
        if (totalAmount <= 50000) {
            return Math.max(totalAmount * 0.004, 10);
        } else if (totalAmount <= 500000) {
            return totalAmount * 0.0037;
        } else if (totalAmount <= 2000000) {
            return totalAmount * 0.0034;
        } else if (totalAmount <= 10000000) {
            return totalAmount * 0.003;
        } else {
            return totalAmount * 0.0027;
        }
    };

    const commission = calculateCommission(totalAmount);
    const sebonFee = totalAmount * 0.00015;
    const dpCharge = 25;

    const calculateBuyAmount = () => {
        const totalAmount = shareQuantity * purchasePrice;
        const commission = calculateCommission(totalAmount);
        const sebonFee = totalAmount * 0.00015;
        const dpCharge = 25;
        return totalAmount + commission + sebonFee + dpCharge;
    };


    const Tbuy = calculateBuyAmount();
    const gain = totalAmount - Tbuy - commission - sebonFee - dpCharge;

    let profit;
    let tax;
    if (Tbuy > totalAmount) {
        profit = gain;
        tax = 0;
    } else {
        profit = gain - (gain * capitalGainTax);
        tax = gain * capitalGainTax;
    }
    const totalReceivableAmount = totalAmount - commission - sebonFee - dpCharge - tax;
    const nepseCommission = commission * 0.2;
    const sebonRegulatoryFee = commission * 0.006;

    return totalReceivableAmount
};

export const calculateNetProfit = (shareQuantity, purchasePrice, sellingPrice, capitalGainTax) => {

    const totalAmount = shareQuantity * sellingPrice;

    const calculateCommission = (totalAmount) => {
        if (totalAmount <= 50000) {
            return Math.max(totalAmount * 0.004, 10);
        } else if (totalAmount <= 500000) {
            return totalAmount * 0.0037;
        } else if (totalAmount <= 2000000) {
            return totalAmount * 0.0034;
        } else if (totalAmount <= 10000000) {
            return totalAmount * 0.003;
        } else {
            return totalAmount * 0.0027;
        }
    };

    const commission = calculateCommission(totalAmount);
    const sebonFee = totalAmount * 0.00015;
    const dpCharge = 25;

    const calculateBuyAmount = () => {
        const totalAmount = shareQuantity * purchasePrice;
        const commission = calculateCommission(totalAmount);
        const sebonFee = totalAmount * 0.00015;
        const dpCharge = 25;
        return totalAmount + commission + sebonFee + dpCharge;
    };


    const Tbuy = calculateBuyAmount();
    const gain = totalAmount - Tbuy - commission - sebonFee - dpCharge;

    let profit;
    let tax;
    if (Tbuy > totalAmount) {
        profit = gain;
        tax = 0;
    } else {
        profit = gain - (gain * capitalGainTax);
        tax = gain * capitalGainTax;
    }
    const totalReceivableAmount = totalAmount - commission - sebonFee - dpCharge - tax;
    const nepseCommission = commission * 0.2;
    const sebonRegulatoryFee = commission * 0.006;

    return profit
};