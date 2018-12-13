const YnabDataUtility = {
    format(value) {
        return `${value < 0 ? '-': ''}$${(Math.abs(value) / 1000).toFixed(2)}`
    }
};

export default YnabDataUtility;