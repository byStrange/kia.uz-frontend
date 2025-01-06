export default defineEventHandler(() => {
  const data = {
    'news': [
      {
        id: 1,
        thumbnail: '80b03a80-5f81-4da1-9d90-89e93d0be8a8', title: `Kia EV9 завоевал золотой трофей на конкурсе дизайна IDEA 2024 Kia EV9 завоевал золотой трофей на конкурсе дизайна IDEA 2024`, date: '17 Сентября 2024'
      },
      {
        id: 2,
        thumbnail: '8c3d5119-820f-4cf2-9c0a-c856d7697362',
        title: `Kia Family day - День открытых дверей в сервисных центрах Kia Kia EV9 завоевал золотой трофей на конкурсе дизайна IDEA 2024`,
        date: '8 Сентября 2024'
      }
    ],
    'video_news': [
      { id: 2, thumbnail: 'hih', date: '10 Июня 2024', title: 'Kia SONET компактный кроссовер в Узбекистане | обзор и характеристики' }
    ]
  }

  return data;
})
