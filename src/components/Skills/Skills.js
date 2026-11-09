/**
 * @Author: Roni Laukkarinen
 * @Date:   2023-11-14 21:45:03
 * @Last Modified by:   Roni Laukkarinen
 * @Last Modified time: 2023-11-15 01:18:55
 */
import React, { useContext, useState } from 'react';
import Marquee from 'react-fast-marquee';

import './Skills.css';

import { ThemeContext } from '../../contexts/ThemeContext';
import { skillsData } from '../../data/skillsData';
import { skillsImage } from '../../utils/skillsImage';

function Skills() {
  const { theme } = useContext(ThemeContext);
  const [paused, setPaused] = useState(false);

  const skillBoxStyle = {
    backgroundColor: theme.secondary,
    boxShadow: `0px 0px 30px ${theme.primary}`,
  };

  return (
    <div
      className="skills"
      id="skills"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="skillsHeader">
        <h2 style={{ color: theme.primary }}>Skills</h2>
      </div>
      <div className="skillsContainer">
        <div className="skill--scroll">
          <Marquee
            gradient={false}
            speed={45}
            pauseOnHover={true}
            delay={0}
            play={!paused}
            direction="left"
          >
            {skillsData.map((skill, id) => (
              <div className="skill--box" key={id} style={skillBoxStyle}>
                <img
                  className={
                    skillsImage(skill).isInverted ? 'skillBoxInvertedStyle' : ''
                  }
                  src={skillsImage(skill).skill}
                  alt={skill}
                />
                <h3 style={{ color: theme.primary }}>{skill}</h3>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
      <button
        type="button"
        className="skillsMotionToggle"
        style={{ color: theme.primary }}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? 'Resume skills' : 'Pause skills'}
      </button>
    </div>
  );
}

export default Skills;
