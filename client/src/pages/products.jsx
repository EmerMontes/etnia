import { Helmet } from 'react-helmet-async';

// eslint-disable-next-line import/no-unresolved
import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | ETNIA PRODUCTOS </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
