
const FashionShowcase = () => {
  return (
    <div className="container fashion my-5">
      <div className="row g-4">
        {/* Left Column */}
        <div className="col-md-6">
          <img
            src="/Images/Fashion.png" // replace with your actual image path
            alt="Gucci Collection"
            className="img-fluid w-100"
          />
          <div className="mt-3">
            <h3 className="description">Gucci’s leading legacy</h3>
            <p className="description">
              The latest collection nods to the house’s most iconic eras,reimagining everything from ’60s glamour to ’80s maximalism
            </p>
            <a href="#" style={{color:"black"}} className=" description text-decoration-underline">
              Shop the collection
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          <video
            src="/video/Fashion.mp4"
            className="img-fluid w-100"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="mt-3">
            <h4 className="description">Chloé’s ‘Paddington’ bag</h4>
            <p className="description">
              The original cult bag is back in every shade you need now, from
              timeless neutrals to our exclusive pink hue
            </p>
            <a href="#" style={{color:"black"}} className=" description text-decoration-underline">
              Shop the collection
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionShowcase;
