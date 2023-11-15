import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoData({ query }) {
  return (
    <TableRow>
    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
      <Paper
        sx={{
          textAlign: 'center',
          backgroundColor: '#f1f1f1', // Cambia el color de fondo según tus preferencias
          padding: '20px', // Ajusta el espacio interno
          borderRadius: '10px', // Agrega bordes redondeados
        }}
      >
        <Typography variant="h6" paragraph style={{ color: '#333' }}>
          No hay resultados
        </Typography>
  
        <Typography variant="body2" style={{ color: '#777' }}>
        No hay resultados para: &nbsp;
          <strong>&quot;{query}&quot;</strong>.
          <br /> Intente comprobar si hay errores tipográficos o utilice otras palabras.
        </Typography>
      </Paper>
    </TableCell>
  </TableRow>
  
  );
}

TableNoData.propTypes = {
  query: PropTypes.string,
};
