// - Valor em centavos = Valor em reais * 100
// - Valor em reais = Valor em centavos / 100

/**
 * Convert um valor monetário em reais (BRL) para centavos.
 * 
 * @param amount - O valor monetário em reais (BRL) a ser convertido.
 * @returns {number} O valor convertido em centavos.
 * 
 * @example
 * convertRealToCents("1.500,00"); // Retorna: 1500000 cents
 */
export function convertRealToCents(amount: string) {
    const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
    const priceInCents = Math.round(numericPrice * 100);

    return priceInCents;
}