import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { EnviosView } from 'src/sections/envios/view/'

// ----------------------------------------------------------------------

export default function EnviosPage() {
  return (
    <>
      <Helmet>
        <title> Envios | tabla Envios </title>
      </Helmet>

      <EnviosView />
    </>
  );
}
