/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardMedia } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import roshanPic from '../images/roshan-pic.png';
/*

<CardMedia
          component="img"
          alt="roshan picture"
          height="300"
          image={roshanPic}
        />

*/

const names = [
  'Aaron Smolyar',
  'Roshan Bellary',
  'Ayush Tripathi',
  'Aditi Ghosh',
];

const traits = [
  /* Aaron */
  [
    'Thinks he has style but is actully lame as fuck',
    '"Personality Hire" - Roshan',
    '',
    '',
  ],
  /* Roshan */ [
    'Wishes he went to MIT',
    'Goofy ahh hairline',
    'horsemeet worshiper',
    'Built like a dood',
    'Probably showers sometimes',
  ],

  /* Ayush */ [
    'Slowest flexbox froggy time in H4I',
    "Can't code + GPT'ed through the technical",
    'Is from Texas',
    'Majoring in NETS (npc)',
    '',
  ],

  /* Aditi */ ["Doesn't show up to bootcamp", '', '', '', ''],
];

interface TraitsCardProps {
  name: string;
  traits: string[];
}

const TraitsCards: React.FC = () => (
  <Grid container spacing={2}>
    {names.map((name, index) => (
      <Grid item xs={12} sm={6} key={index}>
        {' '}
        {/* xs=12 for mobile, sm=6 for 2 columns */}
        <Card variant="outlined">
          <CardMedia
            sx={{ height: 140 }}
            image="../images/roshan-pic.png"
            title="ROSHAN"
          />
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Traits:
            </Typography>
            <ul>
              {traits[index].map((trait, traitIndex) => (
                <li key={traitIndex}>
                  <Typography variant="body2">{trait}</Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default TraitsCards;
