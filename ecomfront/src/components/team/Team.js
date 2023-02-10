import React from "react";
import "./team.css";

import {Teamdata} from "./Teamdata";

const Team = () => {
  return (
    <div className="team">
      <div className="heading">
        <h1>
          Without bonding and coordination, every project is a failure. Look at
          who makes KICKSUP great. ;)
        </h1>
        <div className="members">
          {Teamdata.map((e) => {
            return (
              <div className="card">
                <div className="cardimage">
                  <img src={`${e.url}`} alt=""></img>
                </div>
                <div className="carddetails">
                  <h2>{e.name}</h2>
                  <p>{e.role}</p>
                  <div className="linkicons">
                    <img src={e.urllinka} className="imageicon" alt=""></img>
                    <img src={e.urllinka} className="imageicon" alt=""></img>
                    <img src={e.urllinc} className="imageicon" alt=""></img>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="finaltext">
          <h1>and You! :)</h1>
        </div>
      </div>
    </div>
  );
};

export default Team;
