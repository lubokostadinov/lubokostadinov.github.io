import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { makeStyles } from '@material-ui/core/styles';

import './Landing.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { headerData } from '../../data/headerData';
import { socialsData } from '../../data/socialsData';

import { FaLinkedin, FaGithub, FaCodepen } from 'react-icons/fa';

function Landing() {
  const { theme, drawerOpen } = useContext(ThemeContext);

  const useStyles = makeStyles((t) => ({
    contactBtn: {
      color: theme.primary,
      borderRadius: '30px',
      textTransform: 'inherit',
      textDecoration: 'none',
      width: '150px',
      fontSize: '1rem',
      fontWeight: '500',
      height: '50px',
      fontFamily: 'var(--primaryFont)',
      border: `3px solid ${theme.primary}`,
      transition: 'all 300ms ease-in-out',
      '&:hover': {
        color: `#eaeaea`,
        border: `3px solid #eaeaea`,
      },
      // [t.breakpoints.down("sm")]: {
      //   width: "180px",
      // },
    },
    resumeBtn: {
      backgroundColor: theme.primary,
      color: theme.secondary,
      borderRadius: '30px',
      textTransform: 'inherit',
      textDecoration: 'none',
      width: '150px',
      height: '50px',
      fontSize: '1rem',
      fontWeight: '500',
      fontFamily: 'var(--primaryFont)',
      border: `3px solid ${theme.primary}`,
      transition: 'all 300ms ease-in-out',
      '&:hover': {
        backgroundColor: `#eaeaea`,
        border: `3px solid  #eaeaea`,
      },
      // [t.breakpoints.down("sm")]: {
      //   display: "none",
      // },
    },
  }));

  const classes = useStyles();

  return (
    <div className="landing">
      <div className="landing--container">
        <div
          className="landing--container-left"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="lcl--content">
            {socialsData.github && (
              <a href={socialsData.github} target="_blank" rel="noreferrer">
                <FaGithub
                  className="landing--social"
                  style={{ color: theme.secondary }}
                  aria-label="GitHub"
                />
              </a>
            )}
            {socialsData.linkedIn && (
              <a href={socialsData.linkedIn} target="_blank" rel="noreferrer">
                <FaLinkedin
                  className="landing--social"
                  style={{ color: theme.secondary }}
                  aria-label="LinkedIn"
                />
              </a>
            )}
            {socialsData.codepen && (
              <a href={socialsData.codepen} target="_blank" rel="noreferrer">
                <FaCodepen
                  className="landing--social"
                  style={{ color: theme.secondary }}
                  aria-label="GitHub"
                />
              </a>
            )}
          </div>
        </div>
        <img
          src={headerData.image}
          alt=""
          className="landing--img"
          style={{
            opacity: `${drawerOpen ? '0' : '1'}`,
            borderColor: theme.secondary,
          }}
        />
        <div
          className="landing--container-right"
          style={{ backgroundColor: theme.secondary }}
        >
          <div className="lcr--content" style={{ color: theme.tertiary }}>
            <h6>{headerData.title}</h6>
            <h1>{headerData.name}</h1>
            <p>{headerData.description}</p>

            <div className="lcr-buttonContainer">
              {headerData.resumePdf && (
                <a
                  href={headerData.resumePdf}
                  download="Lyubomir_Kostadinov_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className={classes.resumeBtn}>Get My CV</Button>
                </a>
              )}
              <NavLink to="/#contacts" smooth={true} spy="true" duration={2000}>
                <Button className={classes.contactBtn}>Contact</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
