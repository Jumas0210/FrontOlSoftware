# Frontend - OLSoftware (Angular)

## Descripcion

Este es el frontend de la aplicacion OLSoftware, desarrollado en Angular 16. Su objetivo es gestionar comerciantes y establecimientos, permitiendo autenticacion, administracion y generacion de reportes.

## Como ejecutar el proyecto 

### 1.Instalar dependencias
```bash
npm install
```
### 2.Configuracion de entorno

Modifica el archivo environment.ts o enviroment.development.ts para apuntar al backend correcto:

```bash
export const environment = {
    API_URL: 'http://localhost:5182/api'
};
```
### 3.iniciar el servidor de desarrollo
```bash
npm start
```

## Estructura del proyecto



```bash
FrontOlSoftware/
 ├── src/
 │    ├── app/                           
 │    │    ├── core/                    // Servicios globales
 │    │    │    ├── services/          // Servicios generales de la aplicacion
 │    │    ├── models/                // Definicion de modelos de datos
 │    │    ├── pages/                // Vistas principales de la aplicacion
 │    │    │    ├── dashboard/      // Panel de control
 │    │    │    ├── login/         // Modulo de autenticacion
 │    │    ├── shared/            // Componentes reutilizables
 │    │    │    ├── footer/      // Pie de pagina
 │    │    │    ├── header/     // Encabezado
 ├── assets/                   
 ├── index.html               
 ├── main.ts                 
 ├── angular.json           
 ├── package.json          
 ├── tsconfig.json        
```

## Caracteristicas Implementadas
- Pagina de autenticacion con validacion.
- Gestion de comerciantes con paginacion y filtros.
- Acciones de crear, editar y eliminar comerciantes.
- Descarga de reporte en .csv.
- Seguridad basada en roles con JWT.
