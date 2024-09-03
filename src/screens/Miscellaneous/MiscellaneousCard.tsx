import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface Props {
  name: string,
  component: string,
  className?: string;
}

const MiscellaneousCard: React.FC<Props> = ({ name, component, className }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ display: 'flex' }} onClick={() => navigate(component)} className={className}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardContent  >
          <Typography component="div">
            {name}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default MiscellaneousCard;