
export const PriceDisplay = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-primary/5 p-4 rounded-xl mb-6">
      <p className="text-2xl md:text-3xl font-bold text-primary mb-2">
        12x de {formatCurrency(16.42)}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-gray-500 line-through">De {formatCurrency(397.00)}</p>
        <p className="text-gray-700">Por {formatCurrency(197.00)} à vista</p>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        ou PIX com 5% de desconto: {formatCurrency(187.15)}
      </p>
    </div>
  );
};
