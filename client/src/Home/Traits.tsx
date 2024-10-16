/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import axios from 'axios';import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardMedia, Button } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Header: React.FC = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography
        variant="h4"
        component="div"
        sx={{
          paddingTop: 2,
          paddingBottom: 2,
          flexGrow: 1,
          textAlign: 'center',
        }}
      >
        TOXIC TRAITS
      </Typography>
    </Toolbar>
  </AppBar>
);

const images = [
  '/images/aaron-pic.png',
  '/images/aditi-pic.png',
  '/images/ayush-pic.png',
  '/images/roshan-pic.png',
];

interface TraitsCardProps {
  name: string;
  traits: string[];
}

const TraitsCards: React.FC = () => {

  const [people, setPeople] = useState([
    'Aaron Smolyar',
    'Aditi Ghosh',
    'Ayush Tripathi',
    'Roshan Bellary',
  ]);
  const [allTraits, setAllTraits] = useState([
    [
      'Thinks he has style but is actually lame',
      'Personality Hire',
      'Has a mullet',
      'CHATGPT is his only friend',
    ],
    [
      "Doesn't show up to bootcamp",
      'Is from the Bay',
      'Is chronically late',
      'Cannot drink coffee',
    ],
    // eslint-disable-next-line prettier/prettier
    [
      'Slowest flexbox time', 
      "Can't code", 
      'Bets on wars', 
      'Majoring in NETS'
    ],
    [
      'Goofy ahh hairline',
      'Horsemeet worshiper',
      'Budget Matt',
      'Probably showers sometimes',
      "Always late but insists it's 'fashionably.'",
      'Can’t even cook toast without burning it.',
      "Claims he's 'fun-sized' when he’s just short.",
      'Plans to be productive… sleeps instead.',
      "Always 'almost' listens.",
      "Thinks he's Elon Musk.",
      '10% genius, 90% memes.',
      "Not stubborn, just 'always right.'",
      'Workaholic, mostly scrolling Reddit.',
      'Can’t handle caffeine but drinks it anyway.',
      "Has a 'good reason' for being late.",
      "Packs for a weekend like it's an expedition.",
      'Responds to texts… eventually.',
      "Constantly 'resting his eyes.'",
      'Turns everything into an awkward joke.',
      'One more episode always means five.',
      'Talks big, takes baby steps.',
      'Bed = nap black hole.',
      'Plans everything, follows nothing.',
      "Thinks 'vibing' solves all problems.",
      'Believes pizza solves world problems.',
      "Procrastination? He's a black belt.",
      "Makes 'executive decisions'... bad ones.",
      "Always 'just browsing' but buys everything.",
      'Loses everything but his mind.',
      'Says he’ll call but sends memes instead.',
      "Pretends to understand, usually doesn't.",
      'Just one more minute… right.',
      "Totally chill… until he's not.",
      'Overpacks for every outing.',
      'Expert at unintentionally ghosting.',
      'Allergic to mornings.',
      'Awkward but somehow charming.',
      'Master of mispronouncing everything.',
      "Never wrong, just 'less right.'",
      'Laughs at his own jokes.',
      'Has a system for everything that never works.',
      'Social media detective, forgets birthdays.',
      'Talks to himself and claims it’s brainstorming.',
      'Thinks Wi-Fi issues are a personal attack.',
      'Busy… doing absolutely nothing.',
      'Can’t find his phone, while holding it.',
      'Overthinks everything, including breakfast.',
      "Loves being dramatic for 'effect.'",
      'Competes in the Olympics of overthinking.',
      'Insists on driving, complains about traffic.',
      'Expert at asking questions when you’re busy.',
      "Knows something 'you wouldn’t understand.'",
      'Snoozes alarms for sport.',
      'Has more selfies than friends.',
      'Thinks coffee counts as a personality.',
      'Goes to the gym... for Wi-Fi.',
      "Calls himself 'chill,' never is.",
      'Adds ‘manager’ to his dating profile.',
      'Says ‘5 minutes,’ takes 30.',
      'Forgets everything but the Wi-Fi password.',
      'Brags about drinking water.',
      'Talks tough, cries in Pixar movies.',
      'Puts ‘entrepreneur’ in his bio, unemployed.',
      "Thinks he's deep, just watches sci-fi.",
      'Pretends to be broke, orders extra guac.',
      'Overpacks for every vacation.',
      'Can’t cook but critiques every chef.',
      "Is 'too busy' but watches Netflix all day.",
      "Calls himself an 'alpha,' scared of spiders.",
      'Buys plants, kills them immediately.',
      'Forgets everyone’s birthday, remembers his own.',
      'Wears sunglasses indoors.',
      "Texts ‘I'm outside,’ still at home.",
      'Spends more on shoes than rent.',
      'Uses ‘I’m not like other guys’ unironically.',
      "Says he’s 'flexible,' doesn’t bend at all.",
      'Binge-watches a show, forgets it in a day.',
      'Texts you at 2 a.m., ‘You up?’',
      'Uses dry shampoo as a lifestyle choice.',
      'Claims he’s a minimalist, owns 30 hats.',
      'Says ‘I’ll pay you back,’ never does.',
      'Knows everything, except how to do laundry.',
      'Loves being the ‘funny one,’ never serious.',
      "‘I'm fine’ but clearly isn’t.",
      'Believes naps are a right, not a privilege.',
      'Forgets what he was saying mid-sentence.',
      'Thinks he’s mysterious, just doesn’t talk much.',
      'Asks ‘what’s your sign?’ immediately forgets it.',
      'Starts new hobbies, never finishes them.',
      'Wears a beanie in the summer.',
      '‘No drama,’ but is the drama.',
      'Says he’s ‘chill,’ yells at traffic.',
      'Calls himself a ‘spiritual guy,’ skips yoga.',
      'Loses AirPods every other week.',
      'Texts back ‘k,’ writes essays on social media.',
      'Says ‘life is short,’ takes forever to order.',
      '‘Just vibing,’ but is always anxious.',
      'Owns three planners, uses none.',
      'Says he’s broke, spends $50 on snacks.',
      'Can’t remember where he parked.',
      'Says he’ll ‘figure it out,’ doesn’t.',
      'Believes he’s too cool for TikTok, secretly addicted.',
      "Talks about 'the grind,' naps 3 times a day.",
      'Wears suits to Zoom meetings, still in pajamas.',
      "Refers to his bed as 'the sanctuary.'",
      'Goes to the gym, takes mirror selfies only.',
      'Carries a book everywhere, never reads it.',
      "Says he 'read the instructions,' clearly didn't.",
      "Thinks using two spices qualifies as 'gourmet cooking.'",
      "Drives like he's in Fast & Furious... to the grocery store.",
      'Owns a toolset but calls a plumber for everything.',
      'Refuses to ask for directions—thanks Google Maps.',
      "Thinks he 'invented' sarcasm.",
      "Calls himself a 'gym rat,' only flexes in the mirror.",
      'Says he’ll be quick in the shower, takes a 40-minute concert.',
      "Constantly quotes movies no one's seen.",
      'Gives life advice but can’t follow his own.',
      'Thinks watching documentaries makes him a historian.',
      'Has 57 unread emails, refuses to delete them.',
      "Calls every show he watches a 'classic.'",
      "Thinks he's 'low maintenance' but is basically high-maintenance.",
      'Puts ‘personal development’ in his calendar but binge-watches reality TV.',
      'Forgets his wallet every time you eat out.',
      "Thinks he's a philosopher after 3 beers.",
      'Complains about the mess… contributes 90% of it.',
      "Lives by 'work hard, play harder,' but mostly plays harder.",
      'Says he’s a minimalist; just doesn’t own things.',
      "Swears by 'meal prepping,' just preps a pizza delivery number.",
      "Listens to the same song 40 times, says it’s still a 'vibe.'",
      'Can’t make a decision without flipping a coin.',
      "Brags about multitasking, can't handle one task.",
      'Spends 20 minutes picking the right angle for a selfie.',
      "Claims to be a 'dog whisperer,' dog clearly doesn't agree.",
      "Forgets every password but insists on 'high security.'",
      "Declares he's an 'outdoorsman,' has never camped.",
      "Thinks two-day Amazon shipping is 'instant gratification.'",
      'Can’t find the milk in the fridge without a GPS.',
      "Says 'it’s not a phase,' it’s definitely a phase.",
      'Gets hangry, then blames everyone else for it.',
      'Loses keys at least twice a week.',
      'Wants a gaming setup that NASA would envy.',
      "Believes opening a jar makes him 'handy.'",
      "Talks about 'soul searching' but gets distracted by memes.",
      'Won’t admit he’s wrong but changes the subject real quick.',
      "Calls himself 'independent,' asks mom for laundry advice.",
      'Owns 20 pairs of sneakers but wears the same two.',
      'Turns into a sports analyst when the game is on.',
      "Always says 'I'll figure it out'… never does.",
      'Thinks buying plants makes him a gardener, kills them in a week.',
      "Proclaims himself a 'night owl,' falls asleep at 9 PM.",
      'Brags about getting up early, snoozes the alarm 5 times.',
      'Thinks he can pull off hats… can’t.',
      "Calls everything 'a journey,' just looking for his car keys.",
      'Argues over nothing just for the fun of it.',
      "Says 'I love learning'… just not from mistakes.",
      "Claims he's 'chill,' has a meltdown when his Wi-Fi drops.",
      "Always 'in the zone,' the zone is procrastination.",
      "Takes pride in being a 'free spirit,' still texts 'what's the plan?'",
      "Swears he’s 'spontaneous,' has 15 backup plans.",
      'Can’t handle spicy food but insists on ordering it.',
      "Says he’s 'not a people person,' but never shuts up.",
      'Has an opinion on everything but changes it if you ask why.',
      'Thinks watching YouTube tutorials makes him an expert.',
      'Brings up high school achievements… 10 years later.',
      'Says he’s a gamer, rage-quits after losing once.',
      "Loves 'dad jokes,' doesn’t have kids.",
      'Thinks he’s low maintenance, his skincare routine says otherwise.',
      "Takes 'relaxation' to Olympic levels.",
      'Has more gym memberships than gym visits.',
      "Thinks owning one plant makes him a 'plant dad.'",
      'Never finishes a book, but recommends it anyway.',
      'Refuses to admit he’s lost… in every sense.',
      'Spends more time choosing Netflix shows than watching them.',
      "Puts 'working out' in his calendar as a future event.",
      'Owns 12 chargers, loses every single one.',
      'Never throws away leftovers but never eats them either.',
      "Thinks he’s a 'weekend warrior,' mostly naps on the couch.",
      'Keeps ‘emotional support’ snacks everywhere.',
      'Thinks every road trip requires a 4-hour playlist.',
      "Claims he’s an 'old soul,' just hates loud noises.",
      'Wakes up late and blames the alarm clock.',
      "Calls himself an 'extroverted introvert'… still doesn’t know what that means.",
      "Buys books for 'decoration' instead of reading them.",
      "Thinks his 6-month beard is a 'lifestyle choice.'",
      "Constantly losing something, insists it’s 'right where I left it.'",
      "Describes himself as 'adventurous,' hasn’t left the couch in days.",
      "Thinks every movie has 'a deep message,' just likes the explosions.",
      "Blames 'the system' when he gets pulled over.",
      "Thinks folding laundry is an 'accomplishment.'",
      'Has a love/hate relationship with reality TV—he hates that he loves it.',
      'Owns every kind of sauce but only uses ketchup.',
      'Can name every Marvel movie but forgets important dates.',
      "Says he’s 'saving money,' spends it all on delivery fees.",
      "Thinks 'sleep is for the weak,' takes 3 naps a day.",
      'Has more playlists than personality traits.',
      "Claims he’s a 'foodie,' eats chicken nuggets like a 5-year-old.",
      "Plays air guitar like he's on tour, doesn’t know a single chord.",
      "Thinks 'running errands' counts as cardio.",
      "Says he’s 'organized chaos,' just chaos.",
      "Calls every hangout 'legendary,' even if they just watched TV.",
      'Forgets to text back but posts on Instagram 3 times a day.',
      'Thinks having more tabs open = productivity.',
      'Wants a smart home, can’t operate a light switch.',
      "Describes himself as 'complex,' just indecisive.",
      "Says he's good with names, forgets yours after 5 minutes.",
      "Wants to 'find himself,' can’t find his keys.",
      'Posts motivational quotes, takes a nap right after.',
    ],
  ]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [newName, setNewName] = useState('');
  const [newTraitss, setNewTraitss] = useState('');
  const [newTrait, setNewTrait] = useState('');

  const handleExpandClick = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const addPerson = async (name: string, traits: string[]) => {
    setPeople([...people, name]);
    setAllTraits([...allTraits, traits]);
  };


  const deletePerson = (index: number) => {
    const newPeople = people.filter((_, i) => i !== index);
    const newTraits = allTraits.filter((_, i) => i !== index);
    setPeople(newPeople);
    setAllTraits(newTraits);
  };

  const addTrait = (index: number, trait: string) => {
    const updatedTraits = [...allTraits];
    updatedTraits[index] = [...updatedTraits[index], trait];
    setAllTraits(updatedTraits);
  };

  const deleteTrait = (personIndex: number, traitIndex: number) => {
    const updatedTraits = [...allTraits];
    updatedTraits[personIndex] = updatedTraits[personIndex].filter(
      (_, i) => i !== traitIndex,
    );
    setAllTraits(updatedTraits);
  };

  const [hoveredTraitIndex, setHoveredTraitIndex] = useState<number | null>(
    null,
  );

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
      {people.map((name, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: '16px',
              maxwidth: 400,
              objectFit: 'contain',
              border: '3px solid #FAFAFA',
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              {name}
            </Typography>
            <CardMedia
              sx={{ width: '100%', height: 400, objectFit: 'cover' }}
              image={images[index]}
              title={name}
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
                  {allTraits[index].map((trait, traitIndex) => (
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
                          display: 'inline', // Ensures the div stays inline with the bullet
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
};

const MainComponent: React.FC = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Header />
    <TraitsCards />
  </ThemeProvider>
);

export default MainComponent;