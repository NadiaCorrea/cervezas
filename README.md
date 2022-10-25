# cervezas

API REST utilizando express cumpliendo los siguientes requisitos:

La API debe constar al menos de dos recursos, cervezas y bares.

Debe tener persistencia a través de diskdb.

Ambos recursos deben tener al menos los siguientes endpoints:

Un recurso GET que devuelve todos los documentos de la colección de ese recurso. Además este recurso permitirá filtrar por cualquiera de los campos del documento a través de query params. Al menos uno de ellos debe tener un valor por defecto si no se manda en la url.

Un recurso GET que recibe un parámetro y devuelve el documento con dicho id.

Un recurso POST para crear nuevos documentos de ese recurso.

Un recurso DELETE para eliminar documentos.

Un recurso PUT para editar documentos.