import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  
  
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 100,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img
        src="https://etniasportswear.com/wp-content/uploads/2022/02/logo-etnia-web-enero2022-1.png"
        alt="Nuevo Logo"
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
