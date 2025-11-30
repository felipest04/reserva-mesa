import "../styles/RestauroList.css";
import React from "react";
import CardsRestauro from "./CardsRestauro";

export default function RestauroList({ restaurantes = [] }) {

    {/** Felipe aqui tá a lista dos restaurante, acredito que povoar um banco e puxar fica melhor
      tentei fazer a lista aqui mas ele pesa demais pro front tlgd/ Variavel no main*/}
  return (
    <div className="restauro-list">
      {restaurantes.map((restaurante) => (
        <CardsRestauro
          key={restaurante.id}
          restaurante={restaurante}
        />
      ))}
    </div>
  );
}
