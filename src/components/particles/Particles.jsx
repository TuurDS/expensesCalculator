import React, { useCallback } from 'react'
import ReactParticles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesOptions from "../../particles.json";
import "./particles.scss";

export default function Particles() {

    const particlesInit = useCallback(main => {
        loadFull(main);
      }, [])

  return <ReactParticles options={particlesOptions} init={particlesInit} />
}
