# Prueba Bloxtek

Sistema full-stack de autenticación y gestión de usuarios con backend en Node.js/Express y frontend en Next.js.

## Tabla de Contenidos

- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Requerimientos Previos](#requerimientos-previos)
- [Configuración del Entorno](#configuración-del-entorno)
- [Ejecución Local](#ejecución-local)
- [Ejecución con Docker](#ejecución-con-docker)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Arquitectura del Proyecto

El proyecto está dividido en dos aplicaciones principales:

- **Backend** (`back-prueba-bloxtek`): API REST construida con Express.js, TypeScript y Prisma ORM
- **Frontend** (`front-prueba-bloxtek`): Aplicación web construida con Next.js 16 y React 19

## Requerimientos Previos

### Para Ejecución Local

- **Node.js**: v20 o superior
- **pnpm**: v10.22.0 o superior
  ```bash
  npm install -g pnpm@10.22.0
  ```
- **PostgreSQL**: v14 o superior (base de datos)
- **Git**: Para clonar el repositorio

### Para Ejecución con Docker

- **Docker**: v24 o superior
- **Docker Compose**: v2.20 o superior

## Configuración del Entorno

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd prueba-bloxtek
```

### 2. Configurar Variables de Entorno

#### Backend (`back-prueba-bloxtek/.env`)

Crear el archivo `.env` en el directorio `back-prueba-bloxtek/` con las siguientes variables:

```env
# Puerto del servidor
PORT=8080

# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db?schema=public"

# Secretos JWT
JWT_SECRET="tu-secreto-jwt-super-seguro-aqui"
JWT_EXPIRATION="1h"
JWT_REFRESH_SECRET="tu-secreto-jwt-refresh-super-seguro-aqui"
JWT_REFRESH_EXPIRATION="7d"
```

**Nota**: Asegúrate de usar valores seguros para `JWT_SECRET` y `JWT_REFRESH_SECRET` en producción.

#### Frontend (`front-prueba-bloxtek/.env`)

Crear el archivo `.env` en el directorio `front-prueba-bloxtek/` con las siguientes variables:

```env
# URL del API Backend
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

## Ejecución Local

### 1. Configurar PostgreSQL

Asegúrate de tener PostgreSQL instalado y corriendo. Crea una base de datos para el proyecto:

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE prueba_bloxtek;

# Salir de psql
\q
```

### 2. Instalar y Configurar el Backend

```bash
# Navegar al directorio del backend
cd back-prueba-bloxtek

# Instalar dependencias
pnpm install

# Generar cliente de Prisma
pnpm prisma generate

# Ejecutar migraciones de base de datos
pnpm prisma migrate deploy

# O aplicar migraciones en desarrollo
pnpm prisma migrate dev
```

### 3. Instalar y Configurar el Frontend

```bash
# Navegar al directorio del frontend
cd ../front-prueba-bloxtek

# Instalar dependencias
pnpm install
```

### 4. Iniciar los Servidores

#### Opción A: Usando terminales separadas

**Terminal 1 - Backend:**
```bash
cd back-prueba-bloxtek
pnpm run dev
```

El backend estará disponible en `http://localhost:8080`

**Terminal 2 - Frontend:**
```bash
cd front-prueba-bloxtek
pnpm run dev
```

El frontend estará disponible en `http://localhost:3000`

#### Opción B: Usando modo producción

**Backend (producción):**
```bash
cd back-prueba-bloxtek
pnpm run build
pnpm run start
```

**Frontend (producción):**
```bash
cd front-prueba-bloxtek
pnpm run build
pnpm run start
```

### 5. Verificar la Instalación

Abre tu navegador en `http://localhost:3000` y deberías ver la aplicación funcionando.

## Ejecución con Docker

Docker Compose simplifica significativamente el proceso de configuración al manejar automáticamente la contenedorización de ambas aplicaciones.

### 1. Configurar Variables de Entorno

Asegúrate de tener los archivos `.env` configurados en ambos directorios (`back-prueba-bloxtek/.env` y `front-prueba-bloxtek/.env`) como se describió en la [sección de Configuración del Entorno](#2-configurar-variables-de-entorno).

**Importante para Docker**: Si usas PostgreSQL en otro contenedor o servicio externo, asegúrate de que `DATABASE_URL` apunte a la dirección correcta.

### 2. Construir y Ejecutar los Contenedores

```bash
# Desde el directorio raíz del proyecto
docker compose up --build
```

Este comando hará lo siguiente:
- Construirá las imágenes Docker para el backend y frontend
- Instalará todas las dependencias
- Ejecutará las migraciones de Prisma (si está configurado en el Dockerfile)
- Iniciará ambos servicios

### 3. Acceder a la Aplicación

Una vez que los contenedores estén corriendo:

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8080`

### 4. Detener los Contenedores

Para detener los servicios:

```bash
# Detener y eliminar contenedores (mantiene los datos)
docker compose down

# Detener y eliminar contenedores junto con volúmenes
docker compose down -v
```

### 5. Ver Logs

Para ver los logs de los servicios:

```bash
# Logs de todos los servicios
docker compose logs -f

# Logs de un servicio específico
docker compose logs -f back-prueba-bloxtek
docker compose logs -f front-prueba-bloxtek
```

### 6. Reconstruir Contenedores

Si realizas cambios en el código y necesitas reconstruir:

```bash
# Reconstruir y reiniciar
docker compose up --build

# O reconstruir un servicio específico
docker compose up --build back-prueba-bloxtek
```

## Estructura del Proyecto

```
prueba-bloxtek/
├── back-prueba-bloxtek/          # Backend API
│   ├── core/                      # Configuración central y utilidades
│   ├── features/                  # Módulos de funcionalidad
│   │   └── auth/                  # Módulo de autenticación
│   │       ├── controllers/       # Controladores HTTP
│   │       ├── repositories/      # Capa de acceso a datos
│   │       ├── routes/            # Definición de rutas
│   │       ├── schemas/           # Validación con Zod
│   │       └── services/          # Lógica de negocio
│   ├── prisma/                    # Esquema y migraciones de BD
│   ├── .env                       # Variables de entorno (no incluido en git)
│   ├── Dockerfile                 # Configuración Docker del backend
│   └── package.json
│
├── front-prueba-bloxtek/         # Frontend Next.js
│   ├── app/                       # App Router de Next.js
│   │   ├── login/                 # Página de login
│   │   ├── register/              # Página de registro
│   │   └── page.tsx               # Página principal
│   ├── features/                  # Componentes y lógica por feature
│   │   ├── auth/                  # Feature de autenticación
│   │   └── dashboard/             # Feature del dashboard
│   ├── api/                       # Servicios HTTP
│   ├── stores/                    # Estado global (Zustand)
│   ├── config/                    # Configuración de la app
│   ├── .env                       # Variables de entorno (no incluido en git)
│   ├── Dockerfile                 # Configuración Docker del frontend
│   └── package.json
│
└── docker-compose.yml             # Orquestación de contenedores
```

## Funcionalidades Principales

- ✅ **Registro de usuarios** con validación
- ✅ **Inicio de sesión** con JWT
- ✅ **Gestión de sesiones**
- ✅ **Cierre de sesión**
- ✅ **Autenticación persistente**
- ✅ **Protección de rutas**

## Tecnologías Utilizadas

### Backend
- Express.js 5
- TypeScript 5
- Prisma ORM 7
- PostgreSQL
- JWT (Jose)
- Bcrypt
- Zod (validación)

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand (state management)
- React Hook Form
- Axios

## Comandos Útiles

### Backend

```bash
# Desarrollo
pnpm run dev

# Construcción
pnpm run build

# Producción
pnpm run start

# Prisma Studio (GUI de BD)
pnpm prisma studio

# Crear nueva migración
pnpm prisma migrate dev --name nombre_migracion

# Generar cliente Prisma
pnpm prisma generate
```

### Frontend

```bash
# Desarrollo
pnpm run dev

# Construcción
pnpm run build

# Producción
pnpm run start

# Linting
pnpm run lint
```

## Solución de Problemas

### Error: "Cannot connect to database"

- Verifica que PostgreSQL esté corriendo
- Revisa que la URL de conexión en `.env` sea correcta
- Asegúrate de que la base de datos exista

### Error: "JWT_SECRET is not defined"

- Verifica que el archivo `.env` del backend tenga configurado `JWT_SECRET`
- Reinicia el servidor backend después de modificar `.env`

### Error: "Module not found" o dependencias faltantes

```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Puerto ya en uso

```bash
# Verificar procesos usando el puerto
lsof -i :3000  # o :8080

# Matar el proceso
kill -9 <PID>
```

## Licencia

ISC

## Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.
