export function ExchangeValueIsValid(value: number) {
    const bottle = 3;
    const top = 8;
    if(value > top || value < bottle) {
        return false;
    }
    return true;
}
