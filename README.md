# Tienda UCN - E-Commerce Frontend

Este repositorio contiene el código fuente del cliente web (Frontend) para el proyecto de E-Commerce de la asignatura Introducción al Desarrollo Web/Móvil.

## Integrantes del Equipo

- **Maximiliano Bezares**
- **Gabriel Briones**

---

## Instrucciones de Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local.

### 1. Prerrequisitos

- Tener instalado **Node.js** (versión 18 o superior recomendada).
- Tener instalado **npm**.

---

### 2. Clonar el repositorio

```bash
git clone https://github.com/maximilianoBezares/tiendaucn-frontend.git
```

### 3. Instalar dependencias
Ejecuta el siguiente comando en la raíz del proyecto:
```bash
npm install
```

### 4. Configuración de Variables de Entorno

El proyecto requiere un archivo .env en la raíz para conectarse con el Backend.

Crea un archivo llamado .env.local (o .env) en la raíz del proyecto.

Para crearlo ejecute el siguiente comando:

```bash
cp .env.example .env.local
```
Posterior a ello le debe de quedar algo asi el .env.local:
```bash
NEXT_PUBLIC_API_URL=your-api-url-here
NEXTAUTH_SECRET=your-auth-secret-here
```
En este caso ajuste el puerto o URL según corresponda a tu backend desplegado o local
```bash
NEXT_PUBLIC_API_URL=http://localhost:5147/api
```
Y ingrese el siguiente comando y automaticamente se le creara su auth secret:
En este caso ajuste el puerto o URL según corresponda a tu backend desplegado o local
```bash
npx auth secret
```

### 5. Ejecutar el proyecto

Para levantar el entorno de desarrollo:

```bash
npm run dev
# La aplicación estará disponible en: http://localhost:3000
```

## Guía de Pruebas (Flujos Principales)

Para verificar el funcionamiento de la pagina, puedes probar las siguientes rutas y funcionalidades:

1. Catálogo Público (/products)
   Ruta: http://localhost:3000/products
   Qué probar:
   - Visualización del listado de productos obtenidos desde la API.
   - Uso de la barra de búsqueda y filtros.
   - Funcionamiento de la paginación.
   - Visualización de estados de carga (Skeletons) y manejo de errores.

2. Detalle de Producto (/products/[id])
   Acción: Haz clic en cualquier tarjeta de producto desde el catálogo.
   Qué probar:
   - Carga de información detallada (precio, stock, descripción).
   - Botón de "Agregar al carrito" (funcional con validación de stock).

3. Carrito de Compras (/cart)
   Ruta: http://localhost:3000/cart
   Qué probar:
   - Persistencia de productos (usa Zustand): recarga la página y los productos deben seguir ahí.
   - Modificar cantidades y eliminar ítems.

4. Proceso de Pago (Checkout)
   Acción: Desde el carrito, intentar finalizar la compra.
   Qué probar:
   - Validación de Sesión: Intentar comprar sin login (debe pedir autenticación).
   - Restricción de Admin: Intentar comprar como Admin (debe estar bloqueado).
   - Finalización: Completar la compra como usuario Cliente (vacía el carrito y crea la orden).

5. Historial de Pedidos (/orders)
   Ruta: http://localhost:3000/orders
   Qué probar:
   - Listado paginado de órdenes del usuario.
   - Búsqueda por código.
   - Acceso al detalle de una orden.
   - Descarga de comprobante PDF.

6. Autenticación (/auth/login y /auth/register)
   - Login: http://localhost:3000/auth/login
     Nota: Prueba las validaciones del formulario (campos vacíos, email inválido).
   - Registro: http://localhost:3000/auth/register
     Nota: Verifica las validaciones de RUT, contraseña segura y fecha de nacimiento.

### Panel de Administración (/admin)
**Credenciales de prueba:**
- Email: admin@ucn.cl
- Pass: Hola1234!
**Qué probar:**
1. Ingresar a /admin/products.
2. Crear un nuevo producto subiendo una imagen (verificar preview).
3. Editar el stock de un producto existente.

### Flujo de Verificación (Email)
Al registrarse, el sistema envía un código OTP.
- **Modo de prueba:** El código se puede visualizar en la consola del Backend.
- Probar ingresar un código erróneo para ver la validación y luego el correcto.

### Enfoque de Rendimiento
Se aplicaron las siguientes estrategias de optimización:
- **Imágenes:** Uso de `next/image` para conversión automática a WebP y lazy loading.
- **Estado:** Uso de Zustand para evitar "prop drilling" y re-renderizados innecesarios en el carrito.
- **Datos:** Implementación de TanStack Query con `staleTime` para caché de productos.
- **UX:** Implementación de Debounce en la barra de búsqueda para minimizar peticiones al servidor.

## Stack Tecnológico

- Framework: Next.js 15 (App Router)
- Lenguaje: TypeScript
- Estilos: Tailwind CSS
- Componentes UI: Shadcn/ui (basado en Radix UI)
- Estado Global: Zustand (con persistencia)
- Gestión de Datos/API: TanStack Query (React Query) + Axios
- Formularios: React Hook Form + Zod
- Iconos: Lucide React

## Estructura del Proyecto

- src/app: Rutas y páginas (App Router).
- src/components: Componentes reutilizables (UI y Layout).
- src/hooks: Hooks personalizados (API y lógica común).
- src/lib: Utilidades y configuraciones (Axios, Utils).
- src/services: Capa de servicios para peticiones HTTP.
- src/stores: Estado global de la aplicación (Carrito).
- src/views: Componentes específicos de cada vista/página.

## Rama de Entrega
La versión final evaluable del frontend se encuentra en la rama **main** (la unica disponible).

## Backend

Este frontend requiere que el servidor backend esté en ejecución.
Repositorio del Backend: https://github.com/maximilianoBezares/TiendaUCN.git

**Nota:** Asegúrate de que la API esté corriendo en el puerto configurado en tu `.env` (por defecto `http://localhost:5147/api`) antes de iniciar el frontend.
