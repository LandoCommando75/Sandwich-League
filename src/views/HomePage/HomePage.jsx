const HomePage = () => {
  return (
    <section id="home-content" className="mb-5">
      <h2>Home</h2>
      <p>
        You wanna prove you are the best sandwich maker. You gotta cook it up in
        this league.
      </p>
      <div className="col-md-6">
        <img src="./assets/image1.jpg" alt="image 1" />
        <img src="./assets/image2.jpg" alt="image 2" />
        <iframe
          width={450}
          height={300}
          src="https://www.youtube.com/embed/CRSdpY_vI1s"
          title="How To Make: Easy Grilled Cheese Sandwich | in a pan"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen=""
        />
      </div>
      <aside className="col-md-3">
        <h3>League Schedule</h3>
        <p>To be announced</p>
        </aside>
    </section>
  );
}

export default HomePage;
