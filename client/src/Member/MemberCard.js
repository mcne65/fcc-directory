import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Member.css';
import MemberStack from './MemberStack';
import MemberMeetup from './MemberMeetup';

const Xray = require('x-ray');
const x = Xray();
let projects = [];
const re = /^(https:\/\/freecodecamp.org)|(https:\/\/freecodecamp.com)/

const MemberCard = ({ props }) => {
  const name = props.name || "na"
  const surname = props.surname || "na"
  const email = props.email || "na"
  const location = props.location || "na"
  const picture = props.picture || "https://picsum.photos/400/200/?random"
  const bio = props.bio || "na"
  const stack = props.stack || []
  
  let recent = "Loading..."
  const fcc_forum_stats = "Loading..."
  const github = props.contact.github ? props.contact.github : "mrslwiseman";
  const twitter = props.contact.twitter ? props.contact.twitter : "mrslwiseman";
  const fcc_username = props.fcc.fcc_username ? props.fcc.fcc_username : "mrslwiseman";
  
  const scrape = (fcc_username) => {
    return new Promise((yeah, nah) => {
      x(`https://freecodecamp.org/${fcc_username}`, ['a@href'])((err, data) => {
        if (err) console.log(err);
        let links = data.toString().split(',');
        for (let link of links) {
          if (!link.match(re)) {
            projects.push(link);
          }
        }
        (projects.length > 1) ? yeah(projects[projects.length-1]) : nah('Projects not found');
      });

    })

  return (
    <div className="col-sm-4 col-lg-3">
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h2 className="panel-title">{name} {surname}</h2>
          {location}
        </div>
        <img className="img-responsive" alt={name + ' ' + surname + '\'s profile picture'} src={picture} />
        <div className="panel-body">
          <h4>A little about me:</h4>
          <p>{bio}</p>
        </div>
        {stack &&
          <div>

            <MemberStack stack={stack} />

          </div>
        }
        <div>
          <h4>Free Code Camp Details:</h4>
          <h5>Recent Project:</h5> 
          {this.scrape(fcc_username)}
          <h5>FCC Forum Stats:</h5> 
          {fcc_forum_stats}

          {props.meetup &&
            <MemberMeetup props={props.meetup} />
          }
        </div>

        <div>

          {props.contact &&
            <div>
              <h4>Contact:</h4>
              <ul>
                <li><a href={`https://www.freecodecamp.org/${fcc_username}`} target="_blank">Free Code Camp</a></li>
                <li><a href={`mailto:${props.email}`}>Email</a></li>
                <li><a href={`https://github.com/${github}`} target="_blank">Github</a></li>
                <li><a href={`https://twitter.com/${twitter}`} target="_blank">Twitter</a></li>
              </ul>
            </div>
          }

        </div>
      </div>
    </div>
  )
}
}


export default MemberCard;
