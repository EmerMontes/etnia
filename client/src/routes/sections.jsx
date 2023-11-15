/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import Home from '../pages/home/Home';
import ProductDetail from '../pages/productDetail/ProductDetail';
import UserDetail from '../components/userDetail/UserDetail';
import PayForm from '../pages/payForm/PayForm';
import ShoppingCart from '../pages/shoppingCart/ShoppingCart';
import LogIn from '../pages/logIn/LogIn';
import NotFound404 from '../pages/404/notFound';
import Favorites from '../components/favorites/Favorites';
import Form from '../pages/Forms/Form/Form';
import FormEmpresa from '../pages/Forms/FormEmpresa/CreateEmpresa';
import FormMedioPago from '../pages/Forms/FormMedioPago/CreateMedioPago';
import FormTransportadora from '../pages/Forms/FormTransport/CreateTransport';
import EditTransport from '../pages/Forms/FormEditTransport/EditTransport';
import FormCtaBanco from '../pages/Forms/FormCuentaBanco/CreateCtaBanco';
import ConfirmTokenForm from '../pages/logIn/ConfirmTokenForm';
import RegisterForm from '../pages/logIn/registerForm';
import UpdateProducto from '../pages/Forms/FormEditProduct/FormEditProduct'
import CrearUser from '../pages/Forms/FormCreateUsers/CreateUsers'
import EditUser from '../pages/Forms/FormEditUsers/EditUsers'


const IndexPage = lazy(() => import('../pages/app'));
const UserPage = lazy(() => import('../pages/user'));
const LoginPage = lazy(() => import('../pages/login'));
const ProductsPage = lazy(() => import('../pages/products'));
const PedidosPage = lazy(() => import('../pages/pedidos'));
const EnviosPage = lazy(() => import('../pages/envios'));
const VentasPage = lazy(() => import('../pages/ventas'));
const PqrsPage = lazy(() => import('../pages/pqr'));




function Router() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminRoutes />} />
      <Route path="/users-admin/" element={<AdminUser />} />
      <Route path="/products-admin/" element={<AdminProducts />} />
      <Route path="/pedidos-admin/" element={<AdminPedidos />} />
      <Route path="/envios-admin/" element={<AdminEnvios />} />
      <Route path="/ventas-admin/" element={<AdminVentas />} />
      <Route path="/pqrs-admin/" element={<AdminPqrs />} />


      <Route exact path="login-admin" element={<AdminLogin />} />

      <Route path="/" element={<PublicHome />} />
      <Route path="/product/:id" element={<PublicProduct />} />
      <Route exact path="/user" element={<PublicLogIn />} />
      <Route exact path="/user/:id" element={<PublicUserDetail />} />
      <Route exact path="/payform" element={<PublicPayForm />} />
      <Route exact path="/carrito" element={<PublicShoppingCart />} />
      <Route exact path="favorites" element={<PublicFavorites />} />
      <Route exact path="/Form" element={<PublicForm />} />
      <Route exact path="/editproduct/:id" element={<AdminFormUdateProducto />} />
      <Route exact path="/crearuser" element={<AdminFormCrearUser />} />
      <Route exact path="/edituser/:id" element={<AdminFormEditUser />} />
      <Route exact path="/crearempresa" element={<PublicFormEmpresa />} />
      <Route exact path="/mediopago" element={<PublicFormMedioPago />} />
      <Route exact path="/transporte" element={<PublicFormTransportadora />} />
      <Route exact path="/edittransporte/:id" element={<AdminEditTransportadora />} />
      <Route exact path="/cuentabanco" element={<PublicFormCtaBanco />} />
      <Route exact path="/RegisterForm" element={<PublicRegisterForm />} />
      <Route exact path="/ConfirmTokenForm" element={<PublicConfirmTokenForm />} />
      <Route exact path="*" element={<PublicRoutes />} />
    </Routes>
  );
}
function AdminRoutes() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<IndexPage />} />
          <Route exact path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}
function AdminLogin() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}

function AdminProducts() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<ProductsPage />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}
function AdminEnvios() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<EnviosPage />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}
function AdminVentas() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<VentasPage />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}
function AdminPqrs() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<PqrsPage />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}
function AdminPedidos() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<PedidosPage />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}
function AdminUser() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<UserPage />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      <Route exact path="*" element={<NotFound404 />} />
    </Routes>
  );
}
function PublicConfirmTokenForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<ConfirmTokenForm />} />
      </Routes>
    </Suspense>
  );
}
function PublicRegisterForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<RegisterForm />} />
      </Routes>
    </Suspense>
  );
}
function PublicFormCtaBanco() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<FormCtaBanco />} />
      </Routes>
    </Suspense>
  );
}

function PublicFormTransportadora() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<FormTransportadora />} />
      </Routes>
    </Suspense>
  );
}

function AdminEditTransportadora() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<EditTransport />} />
      </Routes>
    </Suspense>
  );
}

function PublicFormMedioPago() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<FormMedioPago />} />
      </Routes>
    </Suspense>
  );
}

function PublicFormEmpresa() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<FormEmpresa />} />
      </Routes>
    </Suspense>
  );
}

function PublicForm() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Form />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}

function AdminFormUdateProducto() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<UpdateProducto />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}

function AdminFormCrearUser() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<CrearUser />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}


function AdminFormEditUser() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<EditUser />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  );
}

function PublicFavorites() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<Favorites />} />
      </Routes>
    </Suspense>
  );
}

function PublicShoppingCart() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<ShoppingCart />} />
      </Routes>
    </Suspense>
  );
}

function PublicHome() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

function PublicProduct() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<ProductDetail />} />
      </Routes>
    </Suspense>
  );
}

function PublicLogIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<LogIn />} />
      </Routes>
    </Suspense>
  );
}
function PublicUserDetail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/users/:id" element={<UserDetail />} />
      </Routes>
    </Suspense>
  );
}

function PublicPayForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<PayForm />} />
      </Routes>
    </Suspense>
  );
}
export default Router;
