import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import '../Style/Card.css';

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