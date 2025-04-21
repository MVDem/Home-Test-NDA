export async function getRateFromServer(
  fromId: number,
  toId: number,
  param: 'fromAmount' | 'toAmount',
  amount: number
) {
  const res = await fetch(
    `https://namig.pro/api/conversion?from=${fromId}&to=${toId}&${param}=${amount}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Ошибка сервера');
  }
  return data;
}
