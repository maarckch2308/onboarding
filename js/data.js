/*
  Datos del prototipo. Edita aquí sin tocar el código:
  - roles, start: roles y su pantalla inicial
  - screens: qué pantallas pertenecen a cada rol (archivos en screens/)
  - names: nombre visible de cada pantalla
  - tabs / side: destino de las pestañas inferiores y del menú del administrador
  - routes: qué hace cada botón ("Texto del botón": "PantallaDestino" o ["Destino","mensaje"] o "solo mensaje")
  - hot: tarjetas que se pueden tocar para abrir otra pantalla
  - silent: botones que no hacen nada (chips de selección)
  - tours: recorridos guiados
*/
window.PROTO = {
  "roles": [
    [
      "nuevo",
      "Nuevo ingreso"
    ],
    [
      "jefe",
      "Jefe inmediato"
    ],
    [
      "buddy",
      "Buddy"
    ],
    [
      "hrbp",
      "HRBP"
    ],
    [
      "inst",
      "Instructor"
    ],
    [
      "ts",
      "Trabajadora social"
    ],
    [
      "admin",
      "Administrador"
    ]
  ],
  "screens": {
    "nuevo": [
      "Login",
      "Bienvenida",
      "Rutas",
      "Perfil",
      "TuEquipo",
      "NuevoIngreso",
      "Guia",
      "Cuestionario",
      "Cultura",
      "NuevoBeneficios",
      "Actividades",
      "Detalle",
      "Escanear",
      "Evaluacion",
      "Completada",
      "Calificar30",
      "Logro30",
      "Puntaje",
      "Premios",
      "PremioEntrega",
      "NotifNuevo",
      "Reprogramado",
      "SoporteHub",
      "SoporteNueva",
      "SoporteSeguimiento",
      "Dia90",
      "Encuesta",
      "LogroFinal"
    ],
    "jefe": [
      "Main",
      "NotifJefe",
      "Confirmar30",
      "Cerrado30",
      "Vencido"
    ],
    "buddy": [
      "Buddy",
      "NotifBuddy"
    ],
    "hrbp": [
      "HRBP"
    ],
    "inst": [
      "Instructor"
    ],
    "ts": [
      "TrabajadoraSocial",
      "UniformeDetalle"
    ],
    "admin": [
      "Admin",
      "AdminVencido",
      "AdminExcepcion",
      "AdminRutas",
      "AdminPremios",
      "AdminRoles",
      "AdminExcepciones",
      "AdminCierre"
    ]
  },
  "names": {
    "Login": "Inicio de sesión",
    "Bienvenida": "Bienvenida",
    "Rutas": "Mapa de la ruta",
    "Perfil": "Completa tu perfil",
    "TuEquipo": "Tu equipo de acompañamiento",
    "NuevoIngreso": "Mi ruta",
    "Guia": "Guía para el éxito",
    "Cuestionario": "Cuestionario",
    "Cultura": "Cultura & Personas",
    "NuevoBeneficios": "Beneficios y uniforme",
    "Actividades": "Mis actividades",
    "Detalle": "Detalle de la actividad",
    "Escanear": "Escanear QR",
    "Evaluacion": "Evaluación",
    "Completada": "Actividad completada",
    "Calificar30": "Confirma y califica el hito",
    "Logro30": "Hito completado",
    "Puntaje": "Mi puntaje",
    "Premios": "Mis premios",
    "PremioEntrega": "Entrega del premio",
    "NotifNuevo": "Mis avisos",
    "Reprogramado": "Hito reprogramado",
    "SoporteHub": "Soporte",
    "SoporteNueva": "Nueva consulta",
    "SoporteSeguimiento": "Seguimiento de la consulta",
    "Dia90": "Día 90",
    "Encuesta": "Encuesta de experiencia",
    "LogroFinal": "Inducción completada",
    "Main": "Mi equipo",
    "NotifJefe": "Avisos del jefe",
    "Confirmar30": "Confirma el hito del día 30",
    "Cerrado30": "Hito cerrado",
    "Vencido": "Hito vencido",
    "Buddy": "Mi acompañado",
    "NotifBuddy": "Avisos del Buddy",
    "HRBP": "Mis nuevos ingresos",
    "Instructor": "Mis sesiones",
    "TrabajadoraSocial": "Pendientes",
    "UniformeDetalle": "Detalle de uniforme y beneficios",
    "Admin": "Nuevos ingresos",
    "AdminVencido": "Detalle del hito vencido",
    "AdminExcepcion": "Registrar excepción",
    "AdminRutas": "Rutas y actividades",
    "AdminPremios": "Trofeos y premios",
    "AdminRoles": "Asignación de roles",
    "AdminExcepciones": "Excepciones",
    "AdminCierre": "Reportes"
  },
  "start": {
    "nuevo": "NuevoIngreso",
    "jefe": "Main",
    "buddy": "Buddy",
    "hrbp": "HRBP",
    "inst": "Instructor",
    "ts": "TrabajadoraSocial",
    "admin": "Admin"
  },
  "tabs": {
    "nuevo": {
      "Mi ruta": "NuevoIngreso",
      "Actividades": "Actividades",
      "Premios": "Premios",
      "Mi equipo": "TuEquipo",
      "Soporte": "SoporteHub"
    },
    "jefe": {
      "Mi equipo": "Main",
      "Hitos": "Confirmar30",
      "Avisos": "NotifJefe"
    },
    "buddy": {
      "Acompañado": "Buddy",
      "Avisos": "NotifBuddy"
    },
    "hrbp": {
      "Ingresos": "HRBP"
    },
    "inst": {
      "Sesiones": "Instructor"
    },
    "ts": {
      "Pendientes": "TrabajadoraSocial",
      "Entregas": "UniformeDetalle"
    }
  },
  "side": {
    "Nuevos ingresos": "Admin",
    "Rutas y actividades": "AdminRutas",
    "Trofeos y premios": "AdminPremios",
    "Asignación de roles": "AdminRoles",
    "Excepciones": "AdminExcepciones",
    "Reportes": "AdminCierre"
  },
  "routes": {
    "Login": {
      "Ingresar": "Bienvenida"
    },
    "Bienvenida": {
      
      "Comenzar": "Rutas",
      "Perfil": "Perfil",
      "Mi ruta": "NuevoIngreso",
      "Soporte": "SoporteHub",
      "Buddy": "TuEquipo",
      "Puntaje": "Puntaje"
    },
    "Rutas": {
      "Comenzar": "Perfil",
      "Mi ruta": "NuevoIngreso",
      "Soporte": "SoporteHub",
      "Buddy": "TuEquipo",
      "Puntaje": "Puntaje"
    },
    "Perfil": {
      "Guardar": "TuEquipo"
    },
    "TuEquipo": {
      "Continuar": "NuevoIngreso"
    },
    "NuevoIngreso": {
      "Confirmar y ganar 150 trofeos": "Calificar30"
    },
    "Guia": {
      "Continuar": "Cuestionario"
    },
    "Cuestionario": {
      "Siguiente pregunta": "Cultura"
    },
    "Cultura": {
      "Continuar": "NuevoBeneficios"
    },
    "NuevoBeneficios": {
      "Confirmar mi talla": [
        "NuevoIngreso",
        "Talla confirmada. La trabajadora social recibe el aviso."
      ]
    },
    "Detalle": {
      "Registrar asistencia": "Escanear"
    },
    "Escanear": {
      "Ingresar código manualmente": "Evaluacion"
    },
    "Evaluacion": {
      "Siguiente": "Completada"
    },
    "Completada": {
      "Volver a mi inducción": "NuevoIngreso"
    },
    "Calificar30": {
      "Confirmar y ganar 150 trofeos": "Logro30"
    },
    "Logro30": {
      "Volver a mi progreso": "NuevoIngreso"
    },
    "Puntaje": {
      "Ver mis premios": "Premios"
    },
    "Premios": {
      "Ver cómo recibir mi mochila": "PremioEntrega"
    },
    "PremioEntrega": {
      "Escribir a mi HRBP": "SoporteNueva",
      "Tengo un problema con mi premio": "SoporteNueva"
    },
    "NotifNuevo": {
      "Confirmar ahora": "Calificar30"
    },
    "Reprogramado": {
      "Entendido": "NuevoIngreso"
    },
    "SoporteHub": {
      "Nueva consulta": "SoporteNueva"
    },
    "SoporteNueva": {
      "Enviar consulta": [
        "SoporteSeguimiento",
        "Consulta enviada a Soporte Tecnología."
      ]
    },
    "SoporteSeguimiento": {
      "Sí, resuelta": [
        "SoporteHub",
        "Consulta cerrada."
      ],
      "Aún no": [
        "SoporteHub",
        "La consulta pasa a Gestión Humana y a tu HRBP."
      ]
    },
    "Dia90": {
      "Responder la encuesta": "Encuesta"
    },
    "Encuesta": {
      "Enviar y completar mi inducción": "LogroFinal"
    },
    "LogroFinal": {
      "Volver al inicio": "NuevoIngreso"
    },
    "Main": {
      "Confirmar desayuno": "Confirmar30",
      "Confirmar reunión": "Vencido"
    },
    "NotifJefe": {
      "Confirmar": "Confirmar30",
      "Ver opciones": "Vencido"
    },
    "Confirmar30": {
      "Confirmar desayuno": "Cerrado30"
    },
    "Cerrado30": {
      "Volver a mi equipo": "Main"
    },
    "Vencido": {
      "Confirmar reunión realizada": "Cerrado30",
      "No pude realizarla · avisar a DO": [
        "AdminVencido",
        "Desarrollo Organizacional recibe el aviso."
      ]
    },
    "NotifBuddy": {
      "Ver checklist": "Buddy"
    },
    "UniformeDetalle": {
      "Registrar entrega": "Entrega registrada. El nuevo ingreso recibe un aviso para confirmar."
    },
    "Admin": {
      "Asignar Buddy": "AdminRoles",
      "Registrar excepción": "AdminExcepcion",
      "Ver premios pendientes": "AdminPremios"
    },
    "AdminVencido": {
      "Registrar excepción": "AdminExcepcion"
    },
    "AdminExcepcion": {
      "Guardar excepción": [
        "AdminExcepciones",
        "Excepción registrada. El nuevo ingreso verá el hito reprogramado."
      ],
      "Cancelar": "AdminVencido"
    },
    "AdminExcepciones": {
      "Registrar excepción": "AdminExcepcion"
    }
  },
  "hot": {
    "Actividades": [
      [
        "Reinducción de Seguridad",
        "Detalle"
      ]
    ],
    "TrabajadoraSocial": [
      [
        "Elena Nito",
        "UniformeDetalle"
      ]
    ]
  },
  "silent": [
    "Hoy",
    "Ayer",
    "Otra fecha",
    "Sí, se realizó",
    "No se realizó",
    "Subir foto",
    "Tomar foto",
    "Mi inducción",
    "Todos",
    "Uniformes",
    "Beneficios",
    "Semana 1",
    "Semana 2",
    "Semana 3"
  ],
  "tours": [
    {
      "title": "Primer día del nuevo ingreso",
      "steps": [
        {
          "screen": "Login",
          "text": "Entra con su correo corporativo."
        },
        {
          "screen": "Bienvenida",
          "text": "Recibe la bienvenida a UNACEM Ecuador."
        },
        {
          "screen": "Perfil",
          "text": "Completa su perfil con foto."
        },
        {
          "screen": "TuEquipo",
          "text": "Conoce a su jefe, Buddy y HRBP."
        },
        {
          "screen": "NuevoIngreso",
          "text": "Ve su progreso y su próximo hito."
        }
      ]
    },
    {
      "title": "Capacitación con registro por QR",
      "steps": [
        {
          "screen": "Instructor",
          "text": "El instructor muestra el código de su sesión."
        },
        {
          "screen": "Actividades",
          "text": "El nuevo ingreso abre sus actividades."
        },
        {
          "screen": "Detalle",
          "text": "Revisa la sesión de hoy."
        },
        {
          "screen": "Escanear",
          "text": "Escanea el QR del instructor."
        },
        {
          "screen": "Evaluacion",
          "text": "Evalúa la sesión."
        },
        {
          "screen": "Completada",
          "text": "Su asistencia queda registrada."
        }
      ]
    },
    {
      "title": "Hito del día 30, de dos lados",
      "steps": [
        {
          "screen": "NotifJefe",
          "text": "El jefe recibe el aviso."
        },
        {
          "screen": "Confirmar30",
          "text": "Confirma que hizo el desayuno."
        },
        {
          "screen": "NotifNuevo",
          "text": "El nuevo ingreso recibe el aviso."
        },
        {
          "screen": "Calificar30",
          "text": "Confirma y califica la experiencia."
        },
        {
          "screen": "Logro30",
          "text": "Gana 150 trofeos."
        },
        {
          "screen": "Cerrado30",
          "text": "El jefe ve el hito cerrado."
        }
      ]
    },
    {
      "title": "Hito vencido y excepción",
      "steps": [
        {
          "screen": "Vencido",
          "text": "Pasan los días y el hito sigue sin confirmar."
        },
        {
          "screen": "AdminVencido",
          "text": "Desarrollo Organizacional recibe la escalación."
        },
        {
          "screen": "AdminExcepcion",
          "text": "Registra la excepción con motivo y nueva fecha."
        },
        {
          "screen": "AdminExcepciones",
          "text": "Queda en el historial de excepciones."
        },
        {
          "screen": "Reprogramado",
          "text": "El nuevo ingreso ve la nueva fecha."
        }
      ]
    },
    {
      "title": "Puntaje, premios y entrega",
      "steps": [
        {
          "screen": "Puntaje",
          "text": "Ve sus trofeos y el próximo hito."
        },
        {
          "screen": "Premios",
          "text": "Ve un premio por cada hito."
        },
        {
          "screen": "PremioEntrega",
          "text": "Sabe cómo y dónde retirar su premio."
        },
        {
          "screen": "AdminPremios",
          "text": "Desarrollo Organizacional confirma la entrega."
        }
      ]
    },
    {
      "title": "Beneficios y uniforme",
      "steps": [
        {
          "screen": "TrabajadoraSocial",
          "text": "La trabajadora social ve qué falta por persona."
        },
        {
          "screen": "UniformeDetalle",
          "text": "Entra al detalle y pide la talla."
        },
        {
          "screen": "NuevoBeneficios",
          "text": "El nuevo ingreso confirma su talla."
        }
      ]
    },
    {
      "title": "Soporte",
      "steps": [
        {
          "screen": "SoporteHub",
          "text": "Abre la pestaña de soporte."
        },
        {
          "screen": "SoporteNueva",
          "text": "Escribe su consulta."
        },
        {
          "screen": "SoporteSeguimiento",
          "text": "Sigue el estado y la cierra."
        }
      ]
    },
    {
      "title": "Cierre del día 90",
      "steps": [
        {
          "screen": "Dia90",
          "text": "Último hito: deja tu huella."
        },
        {
          "screen": "Encuesta",
          "text": "Responde la encuesta de experiencia."
        },
        {
          "screen": "LogroFinal",
          "text": "Completa la inducción con 750 trofeos."
        },
        {
          "screen": "AdminCierre",
          "text": "Desarrollo Organizacional ve el reporte de la cohorte."
        }
      ]
    }
  ]
};
