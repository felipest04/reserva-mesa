import Navbar from '../components/Navbar';
import HomeSection from '../components/HomeSection';
import ReservaSection from '../components/ReservaSection';
import DesktopFilter from '../components/DesktopFilter';
import RestauroList from '../components/RestauroList';
import Footer from "../components/Footer"

export default function MainPage() {
  return (
    <>
      <Navbar />
      <HomeSection />
      <ReservaSection />
      <DesktopFilter />
           {/** a lista está aqui dai, no caso eu deixei assim só para não quebrar, mas ela ta recebendo uma lista vazia 
        no componente ResatauroList.jsx*/}
      <RestauroList
        restaurantes={[
          { id: 1, name: "Restaurante Exemplo", image: "", rating: 4, category: "Pizza", city: "Cidade" }
        ]}
        
      />


      <Footer/>
    </>
  );
}
