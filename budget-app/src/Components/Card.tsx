import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';

interface CardProps {
  iconName: IconProp;
    title: string;
    text: string;
    iconColor: string;
  }

const Cards: React.FC<CardProps> = ({ iconName, title, text, iconColor }) => {
  return (
      <Card variant="outlined" className="card-content">
        <CardContent>
          <FontAwesomeIcon icon={iconName} size="4x" style={{color: iconColor,}}/> 
          <br className="br" /><br className="br" />
          <Typography variant="h5" component="div" style={{ fontSize: '1em' }}>
            {title}
          </Typography>
          <br className="br" />
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </Card>
  );
};

export default Cards;