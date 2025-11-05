// src/hooks/useCurrencyFormatter.ts
export function useCurrencyFormatter() {
  const formatCurrency = (amount: number | string, currency: string = "USD") => {
    if (amount === null || amount === undefined || amount === "") return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  return formatCurrency;
}
