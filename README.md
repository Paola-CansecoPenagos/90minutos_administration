# Microservicio de Administración para 90Minutos

Este proyecto es un microservicio desarrollado en TypeScript, diseñado para integrarse con una base de datos MongoDB. Forma parte de la infraestructura de backend de la aplicación de envíos de paquetes 90Minutos. Su principal función es generar y proporcionar datos necesarios para que los administradores de la empresa puedan monitorear los ingresos totales y mensuales, así como evaluar la satisfacción del público.

## Características

- **Generación de Informes**: Proporciona informes detallados sobre los ingresos totales y mensuales.
- **Evaluación de Satisfacción del Cliente**: Permite a los administradores entender mejor la percepción del público sobre el servicio.
- **Integración con RabbitMQ**: Utiliza RabbitMQ para la comunicación con otros microservicios dentro del ecosistema de la aplicación.

## Tecnologías Utilizadas

- TypeScript
- MongoDB
- RabbitMQ

## Instalación

Para instalar y configurar este microservicio, sigue los pasos a continuación:

1. Clona el repositorio:
   git clone https://github.com/Paola-CansecoPenagos/90minutos_administration.git
   
2. Instala las dependencias:
    npm install

Configura las variables de entorno necesarias para la conexión a la base de datos y RabbitMQ.

Inicia el servicio:
    npm start

##Documentación de API
El enlace a la colección de Postman para probar las API endpoints estará disponible aquí:
   https://documenter.getpostman.com/view/23486069/2sA3dskYx8 
