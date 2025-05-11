const AboutUsPage = () => {
  return (
    <div className="about-us-page pb-12 bg-gray-100">
      {/* Our Mission Section */}
      <section
        style={{
          backgroundImage: `url("/cloudy.svg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="our-mission text-white text-center mb-12 py-44"
      >
        <h2 className="text-4xl font-bold mb-4">Наша миссия</h2>
        <p className="text-gray-100 text-lg max-w-3xl mx-auto">
          В MRBS наша миссия заключается в предоставлении бесперебойных и эффективных услуг по бронированию конференц-залов, гарантируя нашим клиентам доступ к лучшим пространствам для их деловых нужд. Мы стремимся повышать производительность и сотрудничество с помощью инновационных решений и превосходного обслуживания клиентов.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="our-story text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Наша история</h2>
        <p className="text-gray-600 text-lg max-w-3xl px-3 mx-auto">
          Компания MRBS была основана 4 года назад с целью облегчить компаниям поиск и бронирование конференц-залов. За эти годы мы выросли из небольшого стартапа в надежное имя в отрасли, обслуживающее тысячи клиентов по всему миру. Наш путь был обусловлен страстью к инновациям и стремлением к совершенству, и мы продолжаем развиваться и расширяться, чтобы соответствовать меняющимся потребностям наших клиентов.
        </p>
      </section>
    </div>
  );
};

export default AboutUsPage;
