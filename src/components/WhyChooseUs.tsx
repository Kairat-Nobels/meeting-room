const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Безупречный опыт бронирования",
      description:
        "Забронируйте конференц-зал без труда с помощью нашего интуитивно понятного интерфейса и информации о доступности в режиме реального времени.",
    },
    {
      id: 2,
      title: "Безопасные транзакции",
      description:
        "Ваши платежи и личная информация защищены первоклассными мерами безопасности.",
    },
    {
      id: 3,
      title: "Круглосуточная поддержка клиентов",
      description:
        "Получайте помощь в любое время, воспользовавшись нашей круглосуточной службой поддержки клиентов.",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Почему стоит выбрать нас?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="p-6 bg-white shadow-md rounded-xl">
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
