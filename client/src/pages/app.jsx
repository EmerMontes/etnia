import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | ETNIA </title>
      </Helmet>

      <AppView />
    </>
  );
}
