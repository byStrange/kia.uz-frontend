export default defineEventHandler(async () => {
  interface Dealer {
    name: string
    address: string
    phone: string
    workingHours: string
    location: {
      lat: number
      lng: number
    }
  }

  const cities = [
    {
      name: 'Ташкент',
    },
    {
      name: 'Яккасарай',
    },
    {
      name: 'Андижан',
    },
  ]
  const dealers: Dealer[] = [
    {
      name: 'Kia Sergeli',
      address: '111503, г. Ташкент, Сергелийский район, массив А.Навоий, ТКАД ',
      workingHours: 'Пн.–Вс.: 9:00–20:00',
      phone: '1333',
      location: {
        lat: 69.216629,
        lng: 41.226213,
      },
    },
    {
      name: 'Kia Yakkasaroy',
      address:
        '10022, г. Ташкент, Яккасарайский район, ул. Кичик Халка Йули (Малая кольцевая), 70А',
      workingHours: 'Пн.–Вс.: 9:00–19:00',
      phone: '1333',
      location: {
        lat: 69.262223,
        lng: 41.268869,
      },
    },
    {
      name: 'Kia Rohat',
      address: '171003, г. Андижан, Жалабек КФЙ, массив С. Ашуров',
      workingHours: 'Пн.–Сб.: 9:00–19:00. Вс.: 09.00–18.00.',
      phone: '1333',
      location: {
        lat: 69.356152,
        lng: 41.251554,
      },
    },
    {
      name: 'Kia Kokcha',
      address: '150100, г. Фергана, ул. Аэропорт 310А',
      workingHours: 'Пн.–Вс.: 9:00–20:00',
      phone: '1333',
      location: {
        lat: 69.356152,
        lng: 41.251554,
      },
    },
    {
      name: 'Kia Andijan',
      address: '190100, Денауский район, махалла «Лочин», улица Хумо',
      workingHours: 'Пн.–Сб.: 9:00–19:00',
      phone: '1333',
      location: {
        lat: 72.295217,
        lng: 40.761905,
      },
    },
  ]

  const data = {
    dealers,
    cities,
    toJSON() {
      return { dealers, cities }
    },
  }

  return data
})
