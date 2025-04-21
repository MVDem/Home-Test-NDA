export async function getCoinsFromServer() {
  const res = await fetch('https://namig.pro/api/coins', {
    cache: 'no-store',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Ошибка сервера');
  }
  return data;
}
