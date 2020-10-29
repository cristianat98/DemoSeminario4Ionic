Installar Ionic (Se necesita node y npm)

- npm install -g ionic

Crear Proyecto (En la carpeta donde queramos poner el proyecto)

- ionic start

Cuando se descarga u Proyecto hay que instalar las dependencias

- npm install

Comandos en el Proyecto

- ionic serve (Ejecutar el proyecto y verlo en la web)
- ionic generate (Crear nuevas páginas, nuevas clases, nuevos servicios...)

Exportar a Android

- npm i @capacitor/core @capacitor/cli
- npx cap init
- ionic build
- npx cap add android / npx cap add ios
- npx cap open android (Para abrirlo en el Android Studio, no es obligatorio)