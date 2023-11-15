import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { PedidosView } from 'src/sections/pedidos/view'

// ----------------------------------------------------------------------

export default function PedidosPage() {
  return (
    <>
      <Helmet>
        <title> Pedidos | tabla Pedidos </title>
      </Helmet>

      <PedidosView />
    </>
  );
}
