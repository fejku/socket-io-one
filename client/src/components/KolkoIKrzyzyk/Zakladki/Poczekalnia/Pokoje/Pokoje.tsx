import React, { useContext, useEffect, useState } from "react";
import Pokoj from "./Pokoj/Pokoj";

import { KikSocketContext } from "./../../../KolkoIKrzyzyk";

import { IPokoj } from "../../../../../model/IPokoj";

import "./Pokoje.css";

const Pokoje: React.FC = () => {
  const socket = useContext(KikSocketContext);

  const [pokoje, setPokoje] = useState<IPokoj[]>([]);

  useEffect(() => {
    if (socket) {
      socket.emit("get rooms", (response: IPokoj[]) => {
        setPokoje(response);
      });

      socket.on("refresh rooms", (response: IPokoj[]) => {
        setPokoje(response);
      });
    }

    // Unmount
    return () => {
      if (socket) {
        socket.off("refresh rooms");
      }
    };
  }, [socket]);

  const listPokoi = pokoje.map((pokoj) => <Pokoj key={pokoj.id} pokoj={pokoj} />);

  return (
    <div className="pokoje">
      <h3>Lista pokoi</h3>
      {listPokoi}
    </div>
  );
};

export default Pokoje;
