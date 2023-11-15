/* eslint-disable import/no-duplicates */
import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// eslint-disable-next-line import/no-unresolved
import Label from 'src/components/label';
// eslint-disable-next-line import/no-unresolved
import Iconify from 'src/components/iconify';

import { deleteProduct } from '../../redux/actions';

export default function ProductTableRow({
  id,
  selected,
  name,
  img,
  gender,
  cantidad,
  precio,
  sale,
  category,
  color,
  handleClick,
}) {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {}, [dispatch]);

  const [open, setOpen] = React.useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditClick = () => {
    console.log('Editar', id);
    navigate('/editproduct');
    handleCloseMenu();
  };

  const handleDeleteClick = () => {
    dispatch(deleteProduct(id));
    console.log('Eliminar', id);
    handleCloseMenu();
  };


  return (
    <>
      <TableRow hover tabIndex={-1} gender="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={img} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{gender}</TableCell>

        <TableCell>{category}</TableCell>
        <TableCell>{color}</TableCell>

        <TableCell align="center">{cantidad}</TableCell>

        <TableCell>
          <Label color="success">{precio}</Label>
        </TableCell>

        <TableCell>
          <Label color="error">{sale}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEditClick}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteClick}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

ProductTableRow.propTypes = {
  img: PropTypes.any,
  handleClick: PropTypes.func,
  cantidad: PropTypes.any,
  name: PropTypes.any,
  gender: PropTypes.any,
  selected: PropTypes.any,
  precio: PropTypes.number,
  sale: PropTypes.number,
  category: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.number,
};
