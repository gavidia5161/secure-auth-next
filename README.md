# Secure Auth Next

Sistema de autenticación web desarrollado con **Next.js 16, TypeScript y Supabase**, enfocado en la gestión segura de sesiones, el uso de cookies `HttpOnly` y la protección de rutas privadas.

## Descripción del proyecto

Este proyecto implementa un sistema de autenticación que permite a los usuarios crear una cuenta, iniciar sesión y acceder a un dashboard protegido. También incluye confirmación de correo electrónico y recuperación y actualización de contraseña.

La autenticación se integra con Supabase Auth y utiliza `@supabase/ssr` para gestionar la sesión entre el servidor y el navegador.

## Tecnologías utilizadas

- **Next.js 16:** framework de React con App Router.
- **React:** construcción de la interfaz de usuario.
- **TypeScript:** tipado estático.
- **Tailwind CSS:** estilos de la aplicación.
- **Supabase Auth:** autenticación y gestión de usuarios.
- **@supabase/ssr:** integración de Supabase con el renderizado del lado del servidor.
- **Vercel:** despliegue de la aplicación.

## Funcionalidades

- Registro de usuarios.
- Inicio y cierre de sesión.
- Confirmación de correo electrónico.
- Recuperación y actualización de contraseña.
- Dashboard protegido para usuarios autenticados.
- Redirección de usuarios no autenticados hacia la página de inicio de sesión.
- Gestión de sesiones mediante cookies.
- Configuración de cookies con atributos de seguridad, incluyendo `HttpOnly`, `SameSite=Lax` y `Secure` en producción.
- Actualización de sesión mediante el proxy de Next.js.

## Requisitos previos

Antes de ejecutar el proyecto, es necesario contar con:

- Node.js y npm instalados.
- Una cuenta y un proyecto de Supabase.
- Las credenciales públicas de conexión de Supabase.

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/gavidia5161/secure-auth-next.git
   ```

2. Entrar en el directorio del proyecto:

   ```bash
   cd secure-auth-next
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Crear un archivo `.env.local` en la raíz del proyecto y configurar las variables de entorno indicadas a continuación.

5. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Variables de entorno

El proyecto requiere las siguientes variables en el archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=TU_CLAVE_PUBLICABLE
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Reemplazar los valores de ejemplo por los correspondientes al proyecto de Supabase.

La URL y la clave publicable se obtienen desde la configuración del proyecto en Supabase. La variable `NEXT_PUBLIC_SITE_URL` debe apuntar al dominio de la aplicación: en desarrollo, `http://localhost:3000`; en producción, al dominio desplegado en Vercel.

**Importante:** no incluir claves secretas de Supabase, contraseñas ni otros secretos en el repositorio. El archivo `.env.local` debe permanecer fuera del control de versiones.

## Configuración de Supabase

En la configuración de autenticación de Supabase, dentro de **URL Configuration**:

- Configurar `Site URL` con el dominio principal de la aplicación.
- Añadir `http://localhost:3000/**` para las pruebas locales.
- Añadir el dominio de producción de Vercel con el patrón `/**` para los flujos de confirmación y recuperación de contraseña.

Las URL de redirección deben coincidir con las utilizadas por la aplicación.

## Seguridad implementada

El proyecto incorpora varias medidas para proteger la autenticación:

- **Cookies `HttpOnly`:** impiden que JavaScript del navegador lea directamente las cookies de sesión configuradas con este atributo.
- **`Secure`:** habilita el envío de cookies únicamente mediante HTTPS en producción.
- **`SameSite=Lax`:** ayuda a reducir ciertos riesgos asociados con solicitudes entre sitios.
- **Protección de rutas:** el dashboard requiere una sesión autenticada.
- **Validación de sesión en el servidor:** se utilizan las herramientas de Supabase para verificar los datos de autenticación.
- **Actualización de sesión:** el proxy permite actualizar las cookies de sesión cuando corresponde.

Estas medidas forman parte de la estrategia de seguridad de la aplicación; la protección completa frente a XSS y CSRF también depende de la validación de entradas, el manejo de datos y las demás decisiones de implementación.

## Ejecución y compilación

Para iniciar el entorno de desarrollo:

```bash
npm run dev
```

Para generar una compilación de producción:

```bash
npm run build
```

Para ejecutar la aplicación compilada localmente:

```bash
npm run start
```

## Despliegue

La aplicación está desplegada en Vercel.

**Aplicación en producción:**  
https://secure-auth-next-ghxgn9p9y-gavidia5161.vercel.app

**Repositorio de GitHub:**  
https://github.com/gavidia5161/secure-auth-next

Las variables de entorno correspondientes a producción deben configurarse también en Vercel antes de desplegar la aplicación.

## Autor

Proyecto académico desarrollado como práctica de autenticación segura en aplicaciones web con Next.js y Supabase.
