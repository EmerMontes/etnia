import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { VentasView } from 'src/sections/ventas/view'

// ----------------------------------------------------------------------

export default function VentasPage() {
  return (
    <>
      <Helmet>
        <title> Ventas | tabla Ventas </title>
      </Helmet>

      <VentasView />
    </>
  );
}
