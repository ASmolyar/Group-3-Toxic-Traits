import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardMedia, Button } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface Person {
  name: string;
  traits: string[];
  photo?: string;
}

function TraitsCards(): JSX.Element {
  const [people, setPeople] = useState<Person[]>([]);
  const [newName, setNewName] = useState('');
  const [newTraitss, setNewTraitss] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hoveredTraitIndex, setHoveredTraitIndex] = useState<number | null>(
    null,
  );
  const [newTrait, setNewTrait] = useState('');

  const fetchPeople = async () => {
    try {
      const res = await axios.get('http://localhost:4000/getAll');
      setPeople(res.data);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const addPerson = async (name: string, traits: string[]) => {
    try {
      await axios.post('http://localhost:4000/newPerson', { name, traits });
      fetchPeople();
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const deletePerson = async (index: number) => {
    try {
      const person = people[index];
      await axios.post('http://localhost:4000/removePerson', {
        name: person.name,
      });
      fetchPeople();
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const addTrait = async (index: number, newestTrait: string) => {
    try {
      const person = people[index];
      await axios.post('http://localhost:4000/newTrait', {
        name: person.name,
        trait: newestTrait,
      });
      fetchPeople();
    } catch (error) {
      console.error('Error adding trait:', error);
    }
  };

  const deleteTrait = async (personIndex: number, traitIndex: number) => {
    try {
      const person = people[personIndex];
      const trait = person.traits[traitIndex];
      await axios.post('http://localhost:4000/removeTrait', {
        name: person.name,
        trait,
      });
      fetchPeople();
    } catch (error) {
      console.error('Error deleting trait:', error);
    }
  };

  const handleExpandClick = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <Grid
      container
      columnSpacing={4}
      rowSpacing={4}
      justifyContent="center"
      sx={{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      {people.map((person, index) => (
        <Grid item xs={12} sm={3} key={person.name}>
          {' '}
          {/* Use person.name as the key */}
          <Card
            variant="outlined"
            sx={{
              borderRadius: '16px',
              maxWidth: 400,
              objectFit: 'contain',
              border: '3px solid #FAFAFA',
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              {person.name}
            </Typography>
            <CardMedia
              sx={{ width: '100%', height: 400, objectFit: 'cover' }}
              image={person.photo || '/default-image.png'}
              title={person.name}
            />
            <CardActions>
              <Button onClick={() => handleExpandClick(index)}>
                {expanded === index ? 'Hide Traits' : 'Show Traits'}
              </Button>
              <Button onClick={() => deletePerson(index)}>Delete Person</Button>
            </CardActions>
            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="h5" color="white">
                  <b>Traits:</b>
                </Typography>
                <ul>
                  {person.traits.map((trait, traitIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={traitIndex} style={{ listStyleType: 'disc' }}>
                      <div
                        role="button"
                        tabIndex={0}
                        onMouseEnter={() => setHoveredTraitIndex(traitIndex)}
                        onMouseLeave={() => setHoveredTraitIndex(null)}
                        onClick={() => deleteTrait(index, traitIndex)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && deleteTrait(index, traitIndex)
                        }
                        style={{
                          textDecoration:
                            hoveredTraitIndex === traitIndex
                              ? 'line-through'
                              : 'none',
                          cursor: 'pointer',
                          display: 'inline',
                        }}
                      >
                        <Typography variant="body2">{trait}</Typography>
                      </div>
                    </li>
                  ))}
                </ul>
                <input
                  type="text"
                  placeholder="New Trait"
                  value={newTrait}
                  onChange={(e) => setNewTrait(e.target.value)}
                />
                <Button onClick={() => addTrait(index, newTrait)}>
                  Add Trait
                </Button>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ))}
      {/* Add Person Form */}
      <Grid item xs={12} sm={6}>
        <input
          type="text"
          placeholder="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Traits (comma-separated)"
          value={newTraitss}
          onChange={(e) => setNewTraitss(e.target.value)}
        />
        <Button onClick={() => addPerson(newName, newTraitss.split(','))}>
          Add Person
        </Button>
      </Grid>
    </Grid>
  );
}

function MainComponent(): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TraitsCards />
    </ThemeProvider>
  );
}

export default MainComponent;
