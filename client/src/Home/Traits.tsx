import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const names = ["Aaron Smolyar", "Roshan Bellary", "Ayush Tripathi", "Aditi Ghosh"];

const traits = [
/*Aaron*/    
             [ 
                "Thinks he has style but is actully lame as fuck",
                '"Personality Hire" - Roshan',
                "",
                ""],
/*Roshan*/   [
                "Wishes he went to MIT",
                "Goofy ahh hairline",
                "horsemeet worshiper",
                "Built like a dood",
                "Probably showers sometimes"],
                
/*Ayush*/    [
                "Slowest flexbox froggy time in H4I",
                "Can't code + GPT'ed through the technical",
                "Is from Texas",
                "Majoring in NETS (npc)",
                ""],
                
/*Aditi*/    [
                "Doesn't show up to bootcamp",
                "",
                "",
                "",
                ""]
]

interface TraitsCardProps {
    name: string;
    traits: string[];
  }

const TraitsCards: React.FC = () => (
  <>
    {names.map((name, index) => (
      <Card key={index} variant="outlined" sx={{ minWidth: 275, margin: 2 }}>
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
    ))}
  </>
);
  export default TraitsCards;