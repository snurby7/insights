const YnabDataUtility = {
    format(value) {
        return `${value < 0 ? '-': ''}$${Math.abs(value) / 1000}`
    }
};

export default YnabDataUtility;