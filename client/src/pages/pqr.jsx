import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { PqrsView } from 'src/sections/pqr/view'

// ----------------------------------------------------------------------

export default function PqrsPage() {
  return (
    <>
      <Helmet>
        <title> Pedidos | tabla Pedidos </title>
      </Helmet>

      <PqrsView />
    </>
  );
}
