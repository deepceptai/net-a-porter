import ClothesPage from "../Components/ClothesPage";
import CTA from "../Components/CTA";
import Footer from "../Components/Footer";
import './Clothes.css'

function Clothes() {
  return (
    <>
    <div className="margin-custom">
      <ClothesPage/>
    </div>
    <CTA/>
    <Footer/>
    </>
  );
}

export default Clothes;
