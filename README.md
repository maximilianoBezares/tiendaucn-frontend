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
git clone [URL_DEL_REPOSITORIO]
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
NEXT_PUBLIC_API_URL=http://localhost:5147
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

Para verificar el funcionamiento del avance, puedes probar las siguientes rutas y funcionalidades:

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

4. Autenticación (/auth/login y /auth/register)

- Login: http://localhost:3000/auth/login
  Nota: Prueba las validaciones del formulario (campos vacíos, email inválido).

- Registro: http://localhost:3000/auth/register
  Nota: Verifica las validaciones de RUT, contraseña segura y fecha de nacimiento.

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
