# PWA-2025-PARCIAL-2

## Comando para la ejecución:
- npm run dev

## Dependencias instaladas:
- npm install axios joi @hookform/resolvers react-hook-form react-router

## Aclaraciones:
Para poder ingresar, es posible tanto registrar un usuario como continuar sin registrar ninguno. En el caso de no haber registrado un usuario nuevo, no será posible dar likes, ni modificar o crear posts. 

Para poder ser un usuario registrado, es posible habilitando el usuario que queremos en el panel de usuarios. Al hacer esto, podremos desbloquear las funcionalidades exclusivas de usuarios registrados (que mencioné arriba).

Para poder editar un post, es necesario hacer click en el título del mismo (siendo obviamente un usuario registrado). Luego, podremos modificar el título y el contenido del mismo. Al hacer esto, el post se editará y cambiará el autor del mismo quedando marcado como "edited".

El sitio es responsive, ya que hice que el layout se adapte según el tamaño de la pantalla.